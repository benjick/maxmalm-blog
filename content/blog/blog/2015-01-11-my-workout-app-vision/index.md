---
title: "My workout app vision"
date: "2015-01-11"
tags: [dev, app, featured]
---

Since I've started trying out Meteor for development I've been thinking a lot of what kind of application I want to make.
Maybe Meteor isn't the right platform to use for this project at all, but I want to try it out to really dive into the language.

The idea came from me using Stronglifts 5x5 app. It's very limiting until recently and the free version only let's you do the absolute program they've decided. Fair enough, they can set boundaries within their own apps as they like. The thing that go me mad is that I bought the "power up"-package which included "everything". They later on added another category of addons which... yes, wasn't unlocked bu the package I bought.

Anyways, what I want to make is an open repository for workout, or just for yourself.

## Scenario 1

Start the app, add days (A, B, C), add workouts to days, set weight gain and how many sets (for example, 5x5, 3x12 etc) per routine. First time you go to the gym it serves you day A and you check off the lifts as your workout progresses, next day B etc, the starts over at A when it's done. That's it, you don't have to use any other feature and it's kinda like any workout app there.

## Scenario 2

You hear about this **Sailor Lifting Routine** and you want to try it for a couple of weeks. You start the app and search for _sailor_. Here you can find routines published by other (registered) users, you can browse them, see revisions (version 1, 2, 3), author comments (on rest day do some light power walking).

You find the one you like and you choose to use it. Just like that you have a routine in your app ready to go.

You could also search for routines that includes various workouts you want to miss, say you want squats and deaflift; you choose these and get search results which includes these workouts.

## Scenario 3

You want to share your knowledge about training with other users and you are the Sailor we talked about in the last scenario. You want people to use your workout because you believe in it. So you make the routine and you publish it to the open repository under your username and a nifty title (thesailor:workout). People can now give you feedback, ask questions and discuss your workout inside the app or from the web. Others can even use it outside this application in other applications from the open API.

If you're not happy with your routine or want to change something you can always publish a new version of it. You will be able to find the old revisions but the latest one will be the default one. Users using your routine will get a notification that's it's been updated but can choose not to change it.

---

The reason I want to build this in Meteor is because I can use the same codebase in the mobile app, the webapp, and the server side. It's also real time which means when you check off a lift it's already synced in the database, no need to schedule syncs and backups from the client. Of course something to sync later would have to be implemented to allow the user to use the app without internet.
