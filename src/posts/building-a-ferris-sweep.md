---
title: 'Building a Ferris Sweep MX'
date: 2026-06-11
modified: 2026-06-13
tags: [ 'Keyboard', 'DIY' ]
---

After using the Forager for a couple of months, I've decided that the Choc form factor is not for me.

Keyboards like the Forager and the TOTEM are desirable due to their compactness and thinness.
They are so tiny that you can chuck them into your jacket pocket and take them anywhere without having to worry about burden of "carrying your favorite keyboard to the cafe".
The thinness also forgoes the need for wrist rests and helps keep the wrists in a flat, neutral position.

But the biggest problem with choc boards is that the typing experience sucks compared to MX switches.
Your options for switches are either linear or clicky (there is one *good* [tactile choc v1 switch](https://lowprokb.ca/products/sunset-tactile-choc-switches) on the market), and the switches themselves aren't *fun* to type on.
I've tried out Choc Whites, Red Pros, and Cherry Blossoms from MoErgo, and all of them can't compare to the [budget MX switches](https://www.amazon.com/EPOMAKER-Nude-Pre-Lubed-Compatible-Mechanical/dp/B0CV43SJM1?th=1) I'm typing on now.
They also cost more compared their MX couterparts.

That is why I built my endgame (TBD) keyboard: the [Ferris Sweep Bling MX](https://github.com/davidphilipbarr/Sweep/tree/main/Sweep%20Bling%20MX).

### Building a Sweep is pretty simple

Because there are enough GPIO pins on the [microcontroller](https://www.amazon.com/Teyleten-Robot-Development-Bluetooth-Management/dp/B0CYLNZ6V4?s=electronics), the Sweep does not require you to solder on diodes.
That alone saves a lot of time.
The only things you need to solder are the MX hotswap sockets and pin (male/female) headers for your MCU.

Don't forget to bridge pads underneath the microcontroller for each side.

Compared to the Forager, the Sweep was such a breeze to build.

### Hardware Difficulties

Even though the build was easy, I did run into a couple of problems, most of which were my fault.

While trying to desolder using the hot air station, I knocked off some components from one microcontroller.
The components were small enough that I didn't want to go through the hassle of soldering them back on again.
So I just ordered another set.

I also destroyed two pins on the other MCU while trimming the excess male headers.
Maybe cutting multiple headers at once added uneccessary strain to the PCB and ripped the copper.
I honestly do not know.

So MCU kill count for this build is a ~2~**3** (-$20).

### FYI: Battery Size

I bought and use [150mAh batteries](https://www.amazon.com/dp/B09WVWSTTJ?ref=ppx_yo2ov_dt_b_fed_asin_title), which fit underneath nicely.
They are a little longer than the typical batteries people recommend (301230), but I had no issues with fitment, even with [my custom 3D printed case](https://www.printables.com/model/1748597-sweep-bling-mx-w-heat-inserts-thicker-plate).

### Firmware Issue

The last hurdle of issues I ran into was the actual firmware.

First, I copied an existing config from GitHub, but forgot to remove stuff related to a [ZMK dongle](https://zmk.dev/docs/hardware-integration/dongle).
So when it was time to connect my keyboard to the computer, I could not get the main half to connect to my Linux machine.
It took me way too long to figure out that the keyboard was looking for a bluetooth dongle that did not exist.

The other thing to fix was is weak BLE signal strength.
Whenever I tried to pair the Sweep, it would take a bit for it to show up in the devices list.
So I had to set `CONFIG_BT_CTLR_TX_PWR_PLUS_8=y` in my config in order to increase the BT strength, and things seem to work fine (for now).

~~Lastly, there seems to be a bug with the nice nano that [prevents it from waking up from deep sleep](https://github.com/zmkfirmware/zmk/issues/3207).~~
~~The temporary fix is to use `v0.3` instead of `main`, at least until the next stable release ([I think this fixes my issue](https://github.com/BigWhale/zmk/commit/f1862b7cc726226f81e7309bf22f23b16c24297a)).~~

**UPDATE**

So I broke the main microcontroller *again* (-$7) while replacing the reset button (it was mushy), and now the issues I mentioned above, especially the wake-from-sleep, are **completely gone**.
I just tested it now, and the Sweep automatically connects to my computer without any issues or having to power cycle the left/central half.

This is what my `bling.conf` currently has:

```
CONFIG_ZMK_USB_LOGGING=n
CONFIG_ZMK_SLEEP=y
CONFIG_ZMK_IDLE_SLEEP_TIMEOUT=3600000
CONFIG_ZMK_USB_BOOT=y
CONFIG_BT_CTLR_TX_PWR_PLUS_8=y
```

I guess the morale of the story is to replace your MCU if something isn't working.

### Using the Sweep

So with all the hardware and firmware issuse out of the way, how is the Sweep Bling MX?

Honestly, I really like typing on this board.

Because I've tried [different ergo split keyboards](/splits) with different numbers of keys and switch types. I've come to know what I want from my endgame:

- 34 keys.
- Wireless.
- Aggressive pinky stagger.
- Thumb keys that don't require me to tuck my thumb into my palm.

And the Sweep fits all of these perfectly, and I would say it is effectively my endgame keyboard.

The only thing I do not like about the Sweep is the exposed microcontroller.
Compared to the forager and TOTEM, it is not as minimal as I would like a keyboard to be.
So I think my true endgame would have to be a custom one that I design myself using [KiCad](https://www.kicad.org/) and [ergogen](https://ergogen.xyz/new).

But that's for another day.

### Conclusion

I think I'm done with buiding keyboards.
I've learned all that I could about soldering and electronics from this hobby, and I no longer want to spend the time or money building other people's designs.
I know what I want from a keyboard, and the only way to get it is to design one myself.

So, unless something changes, the Ferris Sweep is the last keyboard that I build.
