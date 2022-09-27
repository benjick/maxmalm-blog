---
title: "Configuring tenants for WSO2 Enterprise Mobility Manager 1.1.0"
date: "2014-06-17"
tags: [wso2, linux, sysadmin]
---

Log into your carbon server. https://172.16.1.123:9443/carbon/

Default user:password is **admin:admin**.

Go to Multitenancy > Add new tenant and fill in all fields.

![Alt text](http://i.imgur.com/kWBkxEL.png)

Save and go to https://172.16.1.123:9443/emm and login with your new credentials. In my case admin@maxmalm.se and the password I picked.

---

I got an error here when the site redirected me to localhost instead of the IP-address, I solved this in a manner not found in the documentation so it might be ugly and non-recommended. Anyways:

`nano repository/conf/sso-idp-config.xml`

and change

`<AssertionConsumerService>https://localhost:9443/emm/acs</AssertionConsumerService>`

to

`<AssertionConsumerService>https://172.16.1.123:9443/emm/acs</AssertionConsumerService>`
