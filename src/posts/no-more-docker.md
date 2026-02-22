---
title: 'No more Docker in my Homelab'
summary: 'Running Immich with Podman Quadlets'
date: '2026-02-14' 
modified: '' 
tags: [ 'Selfhost', 'Linux' ]
---

For 2 years now, I've been using and running all my containers with [Podman Quadlets](https://www.redhat.com/en/blog/quadlet-podman).

It it my preferred way of runnig containers, and has replaced Docker and Docker Compose in my homelab.

Personally, Podman Quadlets just jive with the way I like to do things:
- Each container is its own rootless, systemd service (vs. Docker's rootful daemon).
- Each container is declared using systemd syntax (vs. Docker Compose YAML).
- Each container can be managed and viewed with SystemD `systemctl` and `journalctl` commands.
- Volumes, Networks, and Pods can be created and declared text files.
- Containers in a pod can be re/started all at once using `systemctl --user re/start`.

But the one thing that kept me back (and Docker installed) was [Immich](https://immich.app/), a self-hosted Google Photos replacement.

## Not my first rodeo

A couple of months ago I tried to move Immich to Podman quadlets.

Converting Immich's `docker-compose.yml` and `example.env` to the `podman quadlet` equivalent wasn't hard, just tedious.
Factoring out each individual app into its own `.container` quadlet was pretty straightforward, albeit a might messy.

A `.container` quadlet can only have one container declared in it, and SystemD does not support string interpolation (no `${UPLOAD_LOCATION}` allowed).

So the 2 Docker files (`docker-compose.yml` and `example.env`) became 5 podman quadlets, the fifth being an `immich.pod` to group all Immich containers together:

1. `immich-server.container` for the Immich server
2. `immich-db.container` for the Postgres database
3. `immich-redis.container` for the Redis container
4. `immich-ml.container` for the machine learning container
5. `immich.pod` to create a Pod for the containers above

(The environment variables are hard-coded in their respective `.container` files.)

And *almost* everything worked.

## What happened to my thumbnails?

For whatever reason, I could not get thumbnail generation to work, even though both OCI runtimes were runnig on the same host.

I spent a couple of hours trying to troubleshoot the issue, from basic Samba permissions to archaic SELinux flags, and still could not find the solution.

What I thought would be a relatively simple transition turned out to be a very frustrating reality.

So I admitted defeat and reconciled that Docker was going to have to stay if I wanted to use Immich (until I eventually move to NixOS).

## Second time's the charm

After having a frustrating time with my NixOS config, I decided to try again with Immich and Podman Quadlet.

And I'm happy to report that I finally got rid of Docker from my homelab.

I'm not entirely sure what changed between then and now.
Maybe it was because Immich released V2, or maybe `podman` fixed something in one of their updates.

Regardless, thumbnails generate as they should on my Samba share, and I am Docker free.

