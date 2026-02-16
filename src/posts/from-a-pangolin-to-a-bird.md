---
title: 'Moving on from Pangolin Tunnels'
summary: 'Onto better heights with NetBird'
modified: ''
tags: [ 'Selfhost', 'Linux' ]
---

For quite a while now I've been using [Pangolin Tunnels](https://github.com/fosrl/pangolin) on a VPS to access my homelab services.
It's been pretty solid for some months now, and it is a great FOSS alternative to Cloudflare Tunnels.
But me being me, I wanted to try out something else.

That something else being [Netbird](https://netbird.io/).

Simply put, Netbird is a more open-source and non-VC-backed version of [Tailscale](https://tailscale.com/).

Before Pangolin Tunnels, I was using Tailscale with a [Caddy reverse proxy](https://caddyserver.com/) to redirect a custom domain to my homelab.
But when I saw that [Tailscale raised $160M](https://tailscale.com/blog/series-c) earlier this year, I started to look for some alternatives.
It's not because Tailscale got worse or anything, but because VC-backed stuff has a tendency to enshitify over time.

### NetBird any good?

Honestly I couldn't tell you.
I thought latency would improve because of the mesh feature, but it's about the same as Tailscale from what I can remember.

But latency isn't really that important to me since all I really need from my homelab is access to my [calendar & contacts](https://github.com/tomsquest/docker-radicale), [RSS reader](https://github.com/miniflux/v2), and [music server](https://github.com/sentriz/gonic).

I will say that I've been having some trouble getting the NetBird container to work with [Podman quadlet](https://www.redhat.com/en/blog/quadlet-podman).
I prefer using quadlets whenever I can in place of Docker.
I recently learned about [podman secrets](https://www.redhat.com/en/blog/podman-kubernetes-secrets), which has made me like Podman even more.
But for whatever reason I can't get it to work.

This is non-working quadlet:
~~~
[Unit]
Description=NetBird container
Wants=network-online.target
After=network-online.target

[Container]
ContainerName=netbird
Image=docker.io/netbirdio/netbird:latest
AddCapability=NET_ADMIN SYS_ADMIN SYS_RESOURCE
Network=host
Volume=%h/containers/netbird-client:/var/lib/netbird:z
Secret=nb-sk-fedora,type=env,target=NB_SETUP_KEY
AutoUpdate=registry

[Service]
Restart=always

[Install]
WantedBy=multi-user.target default.target
~~~

Maybe I'm not understanding Podman Secrets fully.
Or maybe this is another case where the container has to run with root privileges.

I'll fiddle with this later.

In the meantime, the NetBird client is running using Docker Compose:

~~~
services:
  netbird:
      container_name: netbird
      hostname: fedora
      cap_add:
          - NET_ADMIN
          - SYS_ADMIN
          - SYS_RESOURCE
      network_mode: host
      environment:
          - NB_SETUP_KEY=<SETUP-KEY>
      volumes:
          - /path/to/containers/folder/netbird-client:/var/lib/netbird
      image: netbirdio/netbird:latest
      restart: always
~~~

### TL;DR

Nothing wrong with Pangolin Tunnels, just wanted to try out Netbird + Caddy again.
