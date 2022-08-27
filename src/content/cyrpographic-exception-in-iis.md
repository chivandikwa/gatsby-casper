---
layout: post
title: Resolve CyrpographicException in IIS
image: img/clean/used/white-house.JPG
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [IIS]
draft: false
excerpt: joys of working with IIS
---

# Resolve CyrpographicException in IIS

## Situation

An IIS deployed application is throwing a `CryptographicException` with message `System cannot find the specified file`. Not a very useful message now is it?!

## Remedy

This is most likely because the Windows Cryptographic Service Provider was trying to store or load a key for a certificate in the user store, and since a profile was not available, a cryptographic context was not available. This means the Process model has the `Load User Profile` set to false.

> ⚠️ The Load User Profile setting only applies to user accounts. Service Accounts like NETWORK SERVICE and ApplicationPoolIdentity have special handling.

### What exactly happens when I set LoadUserProfile in IIS pool?

The user profile is loaded. This includes their cryptographic store, environment variables such as %TEMP%, and other ones.

### To enable the setting

1. Go to IIS Manager

1. Go to the application pool instance

1. Click advanced settings

1. Under Process model, set Load User Profile to true

1. Recycle the application pool and restart linked web application for changes to reflect
