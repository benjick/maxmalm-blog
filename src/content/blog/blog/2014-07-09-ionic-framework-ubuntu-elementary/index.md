---
title: "Ionic Framework quick setup (Ubuntu 12.04, Elementary Luna)"
date: "2014-07-09"
lang: "en"
tags: [dev, ionic, vagrant]
---

The "Getting Started" page for Ionic looks like it's really simple! But it's not really and I've struggled with this for the whole day, but I finally got it to work. I hope someone finds this useful.

This is for Android development, I don't have a Mac so I can't test this for iOS

Download Android SDK  
https://developer.android.com/sdk/index.html#download

Add Android SDK to path (adjust this to your actual paths)  
`export PATH=$PATH:/home/max/development/adt-bundle/sdk/platform-tools:/home/max/development/adt-bundle/sdk/tools`

Install JDK  
`sudo apt-get install openjdk-7-jdk`

MORE PATHS (JDK)  
`export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64`

Install node.js  
`sudo apt-get install python-software-properties`  
`sudo add-apt-repository ppa:chris-lea/node.js`  
`sudo apt-get update`  
`sudo apt-get install nodejs`

Install ant and git  
`sudo apt-get install ant ant-contrib ant-optional ant-gcj git`

Run `android` and install Android 19

Run `android avd` to create an Android emulator

Create a project  
`ionic start myapp tabs`  
`cd myapp`  
`ionic platform add android`  
`ionic emulate android`
