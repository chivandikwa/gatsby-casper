---
layout: post
title: Control Home Assistant with an Apple Watch
image: img/unsplash/luke-chesser-vCF5sB7QecM-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2021-03-04T10:00:00.000Z
tags: [home-assistant]
draft: false
excerpt: smart home on your wrist
---

Photo by <a href="https://unsplash.com/@lukechesser?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Luke Chesser</a> on <a href="https://unsplash.com/wallpapers/iphone/apple-watch?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

It's pretty nifty and also surprisingly useful to be able to control your smart home from your wrist. What you control depends on your use cases but I get to show you how to control it and maybe inspire you with how I use it. We will work based on the following use cases

- Get Dustbin Bieber busy
- Set lounge lights to a relax mode
- Set lounge lights to max brightness
- Turn off all the lights

> Dustbin Bieber is our trusty [Roborock S6 Pure](https://www.xiaomiproducts.nl/nl/xiaomi-roborock-s6-pure.html) robot vacuum.

First, you will need to set up actions from the Home Assistant [iOS app](https://apps.apple.com/us/app/home-assistant/id1099568401). Open the app, navigate to settings -> Actions, and there you will be able to add actions. You will need to specify a name for your action, which will be used as a tag, and a text description, which will be displayed on the watch, and optionally you can specify an icon and a color for both the text and icon.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/1.png)

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/2.png)

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/3.png)

You should then see something like the following when opening the Home Assistant app on your Apple Watch.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/4.jpg)

### Executing Actions

So now we have actions showing up on our Apple Watch, but they do not do anything, well not much at least. Clicking on these actions will currently trigger an event in Home Assistant but because that event has no listener and action attached to it that is all it does. I prefer to use [Node Red](https://nodered.org/) to execute custom actions in Home Assistant and that is how I have set up my actions.

I have set up a flow as shown in the screenshots below to execute the following.

1. Capture all ios events
2. Branch on the event name
3. On the clean action trigger the vacuum to start a clean session
4. On the relax action toggle the lounge scene between a cool dim mode and a warm dim mode
5. On the bright action set the lights in the lounge to full brightness and reset the color
6. On the all-off action switch off all the lights

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/5.jpg)

To capture all ios events I use the events: all nodes with the event type filtering on `ios.actions_fired`.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/6.jpg)

To branch on the event name, I use a `switch` node with an exit for each action name as defined in the Home Assistant app.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/7.jpg)

To trigger the cleaning I use the `xiaomi_miio` service specific to Roborock and specify the rooms to clean as segments.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/8.jpg)

To set the light scene first I use a switch to determine the current scene by checking a global variable I control, `lounge.scene`, then toggle the scene by calling the Home Assistant `light.turn_on` service with a `call service` node for the desired light/light group. I set the `color_name` and `brightness_pct` as desired. After setting each scene I then set the `lounge.scene` value accordingly between `relax.warm` and `relax.cool`.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/9.jpg)

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/10.jpg)

To set the full brightness I use the Home Assistant `light.turn_on` service with a `call service` node for the desired light/light group. I set the `color_name` to white `brightness_pct` to 100.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/12.jpg)

To turn off all the lights I use the Home Assistant `light.turn_off` service with a `call service node` for the desired light/light group.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/13.jpg)

> I use the [Conbee II](https://phoscon.de/en/conbee2) Zigbee stick and have deCONZ setup. There I have defined light groups, for instance, I have multiple lights in the lounge set under one group so that from automation I only call the group name and not individual light names. Light groups can also be set up in Home Assistant.

> While I prefer [Node Red](https://nodered.org/), this entire setup is achievable using [Home Assistant automations](https://www.home-assistant.io/docs/automation/) and capturing the events from there and creating actions.
