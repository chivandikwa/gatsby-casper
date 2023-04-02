---
layout: post
title: Resolve Cyrptographic Exception in IIS
image: img/unsplash/etienne-girardet-DOKXRZPyQk0-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [IIS]
draft: false
excerpt: joys of working with IIS
---

Photo by <a href="https://unsplash.com/fr/@etiennegirardet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Etienne Girardet</a> on <a href="https://unsplash.com/photos/DOKXRZPyQk0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Resolve Cryptographic Exception in IIS

## Situation

An IIS deployed application is throwing a `CryptographicException` with the message `System cannot find the specified file`. Not a very useful message now is it?!

## Remedy

This is most likely because the Windows Cryptographic Service Provider was trying to store or load a key for a certificate in the user store, and since a profile was not available, a cryptographic context was not available. This means the Process model has the `Load User Profile` set to false.

> ⚠️ The Load User Profile setting only applies to user accounts. Service Accounts like NETWORK SERVICE and ApplicationPoolIdentity have special handling.

### What exactly happens when I set Load User Profile in the IIS pool?

The user profile is loaded. This includes their cryptographic store, environment variables such as %TEMP%, and other ones.

### To enable the setting

1. Go to the IIS Manager

1. Go to the application pool instance

1. Click advanced settings

1. Under the Process model, set Load User Profile to true

1. Recycle the application pool and restart the linked web application for changes to reflect
