---
title: "Installing WSO2 Enterprise Mobility Manager 1.1.0"
date: "2014-06-17"
lang: "en"
tags: [wso2, linux, sysadmin]
---

> WSO2 Enterprise Mobility Manager (WSO2 EMM) is a comprehensive platform that helps solve mobile computing challenges enterprises face today when dealing with both corporate owned, personally enabled (COPE) devices and employee owned devices as part of a bring your own device (BYOD) program.

> Whether it is device provisioning, device configuration management, policy enforcement, mobile application management, device data security, or compliance monitoring, WSO2 EMM offers a single enterprise-grade platform.

Ubuntu 14.04 LTS

Install all the prerequisites:

`apt-get install default-jdk default-jre mysql-server-5.6 libmysql-java git eclipse ant maven`

Download Android SDK:

`wget http://dl.google.com/android/adt/22.6.2/adt-bundle-linux-x86_64-20140321.zip`

Unzip the SDK

`unzip adt-bundle-linux-x86_64-20140321.zip`

Download wso2emm from http://wso2.com/products/enterprise-mobility-manager/ and unpack it

Move it to a directory we want to use

`mkdir /usr/local/bin/wso2emm && mv wso2emm-1.1.0/* /usr/local/bin/wso2emm/ && cd /usr/local/bin/wso2emm/`

Set JAVA_HOME and export it to PATH

`export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64`  
`export PATH=${JAVA_HOME}/bin:${PATH}`

Start the server

`sh /usr/local/bin/wso2emm/bin/wso2server.sh`

You can now reach your server at https://172.16.1.123:9443/ (the IP of your server) and log in with admin:admin
