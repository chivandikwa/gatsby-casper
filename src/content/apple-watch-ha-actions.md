---
layout: post
title: Control Home Assistant With Apple Watch
image: img/llama.jpg
author: [Thulani S. Chivandikwa]
date: 2021-03-04T10:00:00.000Z
tags: [home-assistant]
draft: false
excerpt: control your smart home on your wrist
---

It's pretty cool and also suprisingly very useful to be able to control your smart home from your wrist. What you control really depends on your use cases, I get to show you how to control it. We will work based on the following use cases I had in mind

- Get Dustbin Bieber busy
- Set lounge lights to a relax mode
- Set lounge lights to max brightness
- Turn off all lights in the house

> Dustbin Bieber is our trusty Roborock robot vacuum.

First you will need to setup actions from the Home Assistant iOS app. Open the app settings -> Actions where you will be able to add actions. You will need to specify a name fro your action, which will be used as tag, a text description, which will be displayed on the watch and optionally an icon and color for both the text and icon. An example of my action below.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/1.jpg)

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/2.jpg)

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/3.jpg)

You should then see something like the following when opening the Home Assistant app on your Apple Watch.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/4.jpg)

### Executing Actions

So now we have actions showing up on our Apple Watch, but they obviosly do not do anything, well not much at least. Clicking on these actions will currently trigger an event in Home Assistant but because that event has no listener and action attached to it that is all it does. I personally prefer to use Node Red to execute custom actions in Home Assistant and that is how I have setup my actions.

I have setup a flow as show in the screenshto below executing the following steps.

1. Capture all ios events
2. Branch on the event name
3. On clean action trigger vacuum to clean
4. On relax action toggle lounge scene between a cool dim mode and a warm dim mode
5. On bright action set lights in the lounge to full brightness and reset light color
6. On all off switch off all lights

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/4.jpg)

To capture all ios events I use the events: all node with the event type filtering on `ios.actions_fired`.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/6.jpg)

To branch on the event name I use a switch node with an exit for each action name as defined in the Home Assistant app.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/7.jpg)

To trigger the cleaning I use the xiaomi_miio service specific to Roborock and specify the rooms to clean as segments.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/8.jpg)

To set the light scene first I use a switch to determine the current scene by checking a global variable I control,`lounge.scene`, then toggle by calling the Home Assistant `light.turn_on` service with a call service node for the desired light/light group. I set the `color_name` and `brightness_pct` as desired. On setting each scene I then set the `lounge.scene` value accordingly between `relax.warm` and `relax.cool`.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/9.jpg)

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/10.jpg)

To set the full brightnes I use the Home Assistant `light.turn_on` service with a call service node for the desired light/light group. I set the `color_name` to white `brightness_pct` to 100.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/12.jpg)

To turn off all the lights I use the Home Assistant `light.turn_off` service with a call service node for the desired light/light group.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/apple-watch-actions/13.jpg)

> I use of the Conbee II Zigbee stick and have deCONZ setup. There I have defined light groups, for instance I have multiple lights in the lounge set under one group so that from automation I only call the group name and not individual light names. Light groups can also be setup in Home Assistant.

> While I prefer Node Red, this entire setup is achievable using Home Assistant automations and capturing the events from there and creating actions.
