---
title: 'My NAS Migration: From Ubuntu to NixOS'
date: 2026-10-07
modified: 
tags: [ 'Selfhost', 'Linux','NixOS' ]
---

Ever since I switched to NixOS as my daily driver, I've been meaning to convert all my systems over.

When I first started learning NixOS, the first victim was my laptop.
Then, once I got more comfortable, I converted my OctoPrint server.
After even more time, I converted my main desktop over from Fedora Workstation KDE.

Each time I switched, I became more familiar with Nix, and this attempt was no different.

But first...

### What does my NAS do?

With a *whopping* **3 TB** or raw storage, my NAS (Network Attached Storage) hosted:

- Samba shares
- Syncthing
- Restic REST
- qBittorrent

My actual homelab is in a Proxmox VM on another machine, so my NAS is very minimal.
Therefore, replicating my Ubuntu setup in NixOS services was easy.

```
# Syncthing and qBittorrent
{
    networking.firewall.allowedTCPPorts = [ 8384 ];
    services = {
        syncthing = {
            enable = true;
            user = "${user.userName}";
            group = "${user.userName}";
            dataDir = "/home/${user.userName}";
            openDefaultPorts = true;
            guiAddress = "0.0.0.0:8384";
        };
        qbittorrent = {
            enable = true;
            user = "${user.userName}";
            group = "${user.userName}";
            webuiPort = 8081;
            extraArgs = [ "--confirm-legal-notice" ];
            openFirewall = true;
        };
    };
}

```

```
# Restic Nix service
{
    sops.secrets."restic_server" = {
        sopsFile = ../../secrets/secrets.yaml;
        key = "restic_server";
        owner = "restic";
        group = "restic";
    };
    services.restic.server = {
        enable = true;
        htpasswd-file = config.sops.secrets."restic_server".path;
    };
}

```

```

# Samba Server
{
    services.samba = {
        package = pkgs.sambaFull;
        # package = pkgs.samba4Full.override {
        #   enableCephFS = false;
        # };
        enable = true;
        openFirewall = true;
        settings = {
            global = {
                "usershare max shares" = 100;
                "create mask" = "0755";
                "directory mask" = "2755";
                "force create mode" = "0755";
                "force directory mode" = "2755";
            };

            emi = {
                path = "/epool/data";
                browseable = true;
                writable = true;
            };

            kai = {
                path = "/kpool/media";
                browseable = true;
                writable = true;
            };

            mari = {
                path = "/kpool/data";
                browseable = true;
                writable = true;
            };
        };
    };

    # To be discoverable with windows
    services.samba-wsdd = {
        enable = true;
        openFirewall = true;
    };
}

```
Translating my `smb.conf`to the Nix language was pretty straightforward, mostly because the config itself was very simple.
No one but me in our house is using SMB shares.

The only problem I ran into was with `pkgs.sambaFull`.
Due to an upgrade in `gcc`, `ceph`, which is a build input for the full Samba server, was [failing to build](https://github.com/NixOS/nixpkgs/issues/569044).
Hence the commented out package `override`.

I had to wait a day or two before the [PR](https://github.com/NixOS/nixpkgs/pull/569264) was merged into `nixos-unstable`.

### What about muh data?

The biggest reason why this migration took as long as it did was because I was worried about losing data.
I basically forgot everything I knew about ZFS, so I thought I had to use manually mount them using `fileSystems`.

Even worse, I thought I had to use `disko` to manage them since the rest of my machines don't have a `fileSystems` declaration.

Luckily, I didn't, and I asked AI to assuage my worries.

Apparently, ZFS is a lot smarter and powerful than I thought.
As long as I exported my pools (`zpool export tank`) before installing Nix, NixOS would automatically import them if specified:
```
{
    boot = {
        supportedFilesystems = {
            btrfs = true;
            zfs = true;
        };
        zfs = {
            forceImportRoot = false;
            extraPools = [
                "emi"
                kai"
            ];
        };
    };

    networking.hostId = "aba04682";

    services.zfs.autoScrub.enable = true;
}

```

So all of my mount points would be the same as it was on Ubuntu.

### The Last Hurdle: Understanding sops-nix

In my [`nixos-config`](https://github.com/nielmin/nixos-config), I'm using `sops-nix` to encrypt passwords before committing to Github.
The only issue is that I didn't really understand how it worked.

Initially, my intuition was to store the host ssh keys with `sops-nix` so that I didn't have to worry about losing them.
But I ran into a "chicken-and-egg" problem when I tried installing it using `nixos-anywhere` and `disko`.

I wanted `sops-nix` to decrypt the key and put it in the proper location (`/etc/ssh/ssh_ed25519_host_key`).
But `sops` couldn't decrypt the secret because it was missing `ssh_ed25519_host_key`.
And the `ssh_ed25519_host_key` didn't exist because `sops-nix` hadn't decrypt yet.

Ultimately, I realized that using `sops` to manage a host's key pair wasn't a good idea, and that I should just make host keys ephemeral and generate them when needed.

In order to get the host keys to the bootstrapped machine, I needed to use the `--extra-files` flag in `nixos-anywhere` and pass in a directory.

```
# Boostrapping a new NixOS host

ssh-keygen -t 25519 -f /path/to/tmp/directory

# The directory structure needs to emulate / (root)
# 'ssh_ed25519_host_key' goes in /etc/ssh
# So the folder would be /extra-files/etc/ssh/ssh_ed25519_host_key

nixos-anywhere --extra-files /path/to/tmp/directory \
    --flake .#foo \
    --target-host nixos@192.168.1.144
```

Once I understood how to work with `sops-nix`, everything fell into place.
`nixos-anywhere` finished installing, and I could ssh into my NAS and access my SMB shares.

Before migrating, I shutdown my homelab VM just case, and when I booted it back up, none of my services complained about missing volume mounts.
Surprisingly, everything worked as exactly as it did before.

I would call that a successful migration.

### Conclusion

There is a certain joy I feel knowing that all of my computers are managed with a single Nix configuration.
The fact that the state of all of my machines are exactly the same and come from a single `flake.lock` file is really freaking cool.

I should've have done this sooner.
