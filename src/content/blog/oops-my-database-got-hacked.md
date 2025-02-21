---
title: Oops, My Database Got Hacked
published_at: 2025-02-17T03:20:29.000-06:00
reading_time: 5
excerpt: Security is a journey, not a destination. What I learned the hard way.
social_image: https://cdn.christse.dev/oops-db-og.jpg
---

I recently started self-hosting personal apps on my Unraid server, with a configured Postgres database for storage. I woke up one morning discovering that I could no longer connect to the subdomains I had reverse proxied to one of my self-hosted apps, so I log in to the VPN to connect to my server and check the logs. Immediately, I noticed that it was throwing some errors about not being able to find the specific database I had created for it.

That's weird, I literally just created it last night and had it up and running. What could have happened?

I fire up pgAdmin to take a look at my databases, of which I should have several... wait, what? Where did they all go?

![](https://ghost.ctse.dev/content/images/2025/02/image-1.png)

What is this database? Where did the rest go?

I Googled the name of the database, looked through the Postgres container logs, and checked the contents of that unfamiliar database. Sure enough, I was compromised - I could see commands that dropped all my databases and added this one. Inside was a ransom note demanding cryptocurrency payment in exchange for restoring my data.

## How did this happen?

Needless to say, database security is important. And here, I learned a lesson that it's equally important even for a self-hosted container meant for fun. As someone still relatively green to self-hosting, having only had my Unraid server up for about a year and a half, I didn't quite have my bases covered. While I didn't lose much valuable data, it did give me a good lesson on what I did wrong.

### Exposing the database to the public internet

I had port forwarded the Postgres IP so that I could connect to it anywhere, even while I was out so that I could mess with it while sitting at a coffee shop without having to go through the VPN. My database now sat unprotected on the public internet, guarded only by a username and password. That was my first mistake.

Now I admit, this is advice I've very commonly seen. If this were a proper production app, I of course would never have done this. I figured my small toy database wouldn't attract any attention. No one really knew my IP, nor that I would have Postgres running, right?

![](https://ghost.ctse.dev/content/images/2025/02/image-2.png)

Search results as of February 2025

Turns out, my experience wasn't unique. According to a [threat research report](https://unit42.paloaltonetworks.com/pgminer-postgresql-cryptocurrency-mining-botnet/?ref=ghost.ctse.dev) from Palo Alto Networks, automated bots have been targeting exposed Postgres and MySQL databases since at least 2019. With over 600,000 databases exposed on Shodan alone as of writing this, attackers have plenty of targets - and they're constantly scanning for more.

I've linked to other articles that talk about this issue more in-depth, such as the exact method and queries that ran on the database for the exact attack that I was a victim of at the end of this post if you are interested.

### Not securing the root user

Going off the same assumption as above, since no one should know or care that I have a database up, surely having the root `postgres` user with a simple password shouldn't be that big of a deal, right?

Obvious as it seems in hindsight, this was something I overlooked. I had the password set to something simple in the case that I wanted to log in and play around with it more easily. Of course, I've since recreated the container with a much more secure root user password.

### Not having backups

While I didn't have mission-critical data in there, the loss still hurt. I had a [linkding](https://linkding.link/?ref=ghost.ctse.dev) instance, a self-hosted bookmark manager, where I had stored a couple dozen interesting articles to read later. All gone.

I knew about security best practices for production databases, but I had never bothered with proper backups for my personal projects. It just hadn't seemed necessary - until now. Luckily, it's actually pretty simple to get started. Both Postgres and MySQL have dump commands that will create a big SQL file containing all the commands required to recreate the thing you just dumped.

To mitigate losing any more data in the future, I whipped up a quick bash script to run an hourly [`pg_dumpall`](https://www.postgresql.org/docs/current/app-pg-dumpall.html?ref=ghost.ctse.dev) , copy the dump out of the container, gzip it, and put it in a backup folder on the user shares. I also have the script delete the oldest one each time once I have 30 days worth of hourly backups, giving me plenty of leeway for restoring data should I need it in the future.

## A lesson on security, paid up front

The main takeaways here were:

1. Don't expose your database to the open internet if you can help it
2. If you must, at least make sure your root user is secured with a strong password
3. Make backups in the case of catastrophe

These things likely would just be common sense for a seasoned database administrator or backend developer. But with the prevalence of the crypto ransom attacks on exposed databases, it might just not be common enough.

Certainly wasn't for a hobby self-hoster like myself.

## Additional Reading

[Help! My database was compromised!
\
A detailed look at an active PostgreSQL and MySQL Ransomware bot
\
![](https://ghost.ctse.dev/content/images/icon/10fd5c419ac61637245384e7099e131627900034828f4f386bdaa47a74eae156)MediumBorder0
\
![](https://ghost.ctse.dev/content/images/thumbnail/0-0r7pUgzwnZTKA9fY.png)](https://medium.com/@border0/help-my-database-was-compromised-ec68ef15df65?ref=ghost.ctse.dev)

[Protecting Postgres: Key Security Takeaways from a Postgres Honeypot
\
Team Axon shares key security takeaways from running a Postgres database honeypot that attracted several malicious actors.
\
![](https://ghost.ctse.dev/content/images/icon/Youtube-20Profile-20Picture-2.png)Cyber Hunters Ltd.Team Axon
\
![](https://ghost.ctse.dev/content/images/thumbnail/Featured-20images-20-9-.png)](https://www.hunters.security/en/blog/protecting-postgres?ref=ghost.ctse.dev)

[Poorly secured PostgreSQL, MySQL servers targeted by ransomware bot - Help Net Security
\
Users exposing poorly secured PostgreSQL and MySQL servers online are in danger of getting their databases wiped by a ransomware bot.
\
![](https://ghost.ctse.dev/content/images/icon/icon.svg)Help Net SecurityZeljka Zorz
\
![](https://ghost.ctse.dev/content/images/thumbnail/postgresql.jpg)](https://www.helpnetsecurity.com/2024/01/18/postgresql-mysql-ransomware-bot/?ref=ghost.ctse.dev)
