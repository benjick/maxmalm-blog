---
title: "Ionic Framework - with vagrant"
date: "2014-09-15"
lang: "en"
tags: [dev, ionic, vagrant]
---

My last post was about how to get Ionic up and running manually. It's not a good method to get started with Ionic and it just takes time and unnecessary troubleshooting. This solution works with Windows, OS X and Linux.

Now I'm using my own fork of the official vagrant box: ionix-box

It's easy to get started with:

Install Virtualbox, Vagrant and Git Bash (for Windows) then run

`$ git clone https://github.com/benjick/ionic-box`

`$ cd ionic-box`

`$ vagrant up`

And boom, you can now develop Ionic apps in a Linux environment (currently based on Ubuntu 14.04).

See full docs at https://github.com/benjick/ionic-box/
