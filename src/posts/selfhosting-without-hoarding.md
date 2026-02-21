---
title: 'Self-hosting is simpler without hoarding'
modified: ''
tags: [ 'Selfhost', 'Linux' ]
---

I recently noticed there's a lot of [effort](https://github.com/Ravencentric/awesome-arr) put in a specific area in self-hosting: **media**.

And I think it's a bit unecessary.

Fhe value of self-hosting is becoming independent and having control of your data and privacy.
It is, first and foremost, about having access to tools you control that augment your digital experience without violating your rights.
Whether that's having an adblocker on your home network or a Frigate-based CCTV setup, your hosted services should add some convenience to your life.
Otherwise, what's the point (besides learning).

However, the community ([r/selfhosted](https://reddit.com/r/selfhosted)) seems to over emphasize the "utility" of having your own Netflix.
I don't use any `-arr` program in my own homelab, but it does seem a little excessive when a good chunk of someone's homelab is dedicated to media collection, organization, and consumption.

I'm also in the minority when I say this, but I don't rewatch/replay a lot of media.
I also don't do the whole 'passively watching a TV show or movie in the background on the 2nd monitor while I do X' (cause multi-tasking is a myth).

When I decide to spend time to watch something, I like to be very intentional.
It is my way of showing respect to the creators' of said TV show/movie and their creation.
If I'm going to spend 2 hours watching a film or episodes, I might as well pay attention, get immersed, and have a good time.
Otherwise I'm wasting time and "disrespecting" the film/show.

> To clarify, when I say something is a "waste of time", I'm not saying that the time you spent watching something could've been spent doing something more "productive".
> At least in this context, the use is a bit more literal and akin to "unecessary excess".
> For example, if I'm on my phone reading something and not focusing on the film, both actions are being done without *intention* (therefore being wasteful).

As a result, I don't tend to keep/hoard a lot of media stored on my NAS.
Once I've finished watching a film or show, I'll seed until the ratio reaches `2.0` and delete it from my drives.
For me, any subsequent (re)watch of is a waste (of time, hard drive space, attention, etc) because I should've paid attention and gotten the most out of it the first time.

Even the stuff I do save on my NAS (i.e. favorites) I haven't watched in a long time.
Simply put, why would I want to rewatch a favorite of mine if I don't have the time to give it the same attention and focus as before?

I know my "relationship" with media is a weird one, but as a consequence my homelab is very lean and utilitarean.
It is not built around media consumption, but focused on independent tools that will help in my daily life.

For example, I recently found out about [2fauth](https://github.com/Bubka/2FAuth), a self-hosted 2FA web app.
It is a very simple app wrtten in PHP with SQLite as a database, but it is incredibly useful.
By hosting your own 2FA, it mitigates the fear of losing your phone and by extension your TOTP codes.
You can access them anywhere from any device with a browser, and aren't tethered to your smartphone.

In conclusion, I don't understand the need to have a massive media library, and I find all the effort someone puts into media consumption and storage a bit excessive.
