---
title: "Have you met Flynn?"
date: "2015-05-08"
tags: [dev, paas]
---

Yesterday Heroku announced the good bye to free tier as we know it. The short story is, free tier was abused by people pinging their dynos to stay alive 24/7 (they went to sleep after an hour of inactivity before), and now they introduced a hobby tier which is basically the same as the old free tier (without the sleep) for $7 a month. Pretty good deal, but I already have so much server power on premise that I feel I can't justify paying another provider to host my stuff.

I started thinking about how I could set up my own cluster, looking at talk on Docker, Kubernetes and Mesos. It all seemed a bit over my head. It all looked great but I couldn't really find any resources where to begin, where to put down the shovel and dig. The talks went in-depth and over my head, so many terms I haven't heard of before. Then in a comment someone mentioned it.

Today I met Flynn.

> Throw away the duct tape. Say hello to Flynn.

> Flynn fixes everything that's wrong with the process of deploying, scaling, and managing your applications. So they run the way they're supposed to – with ease. And you can do more of what you want to do and less of what you have to do.

This is what Flynn promises when you reach https://flynn.io/

I guess you could say Flynn is your own Heroku hosted by you. Your own PaaS on premise or in the cloud. Why I make the Heroku comparsion is because I come from Heroku to Flynn, but that's not all:

- You can use Heroku buildpacks `BUILDPACK_URL=https://github.com/AdmitHub/meteor-buildpack-horse.git`
- Deploying with git is a thing with Flynn - `git push flynn master`
- Pull repositories from your Github account with a read only token (see screenshot further down below)

## Deploy a Meteor application to Flynn

```
meteor create --example todos
cd todos
git init
git add .
git commit -m "partytime"
flynn create todos
flynn env set BUILDPACK_URL=https://github.com/AdmitHub/meteor-buildpack-horse.git
flynn env set MONGO_URL=mongodb://xxx:yyy@ds039078.mongolab.com:39078/heroku_app000000
flynn env set ROOT_URL=http://todos.your.cluster.domain
git push flynn master
```

And like that it's done, your app is running on Flynn. It even supports sticky sessions if you want to run it on multiple containers.

```
flynn route add http -s todos-web --sticky mydomain.com
flynn scale web=3
```

From the docs (https://flynn.io/docs/cli#route):  
`--sticky` enable cookie-based sticky routing (http only)

I will try this with https://github.com/meteorhacks/cluster when I have the time

## Screenshots

![Dashboard](dashboard.png)

> The dashboard

![Deploy from Github](github.png)

> Deploy from Github

![DSadmin](infoscreen.png)

> Digital Signage admin, a Meteor application running on Flynn

I moved one of my less business critical application to Flynn, a Meteor app for controlling our digital signage screens, and it works really well. A few kinks had to be sorted out, but most problems was due to me not reading the docs good enough. Flynn doesn't have a MongoDB component yet (there's only a postgres for now) so I took the moment to try out MongoDB MMS and deploy a cluster on promise. All in all it took a few hours from starting reading about Flynn to deploying an app.
