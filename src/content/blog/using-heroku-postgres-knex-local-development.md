---
title: How to Use Heroku PostgreSQL for Local Development with Knex.js
description: A short guide on how to set up Heroku Postgres for use in local development
pubDate: 2019-12-01
---

## Local vs. Hosted Databases

Generally, folks tend to develop apps using a local database on their own machine. It can then be swapped out for a real
one in production. This is usually done via the use of environment variables. But, sometimes you may want to have access
to a database hosted online that you can access from many places. Or you just want a hosted database that you can use
without having to worry about all the things that come with maintaining your own database.

Managed databases are great for this, but they can be costly. Most providers such
as [Digital Ocean](https://www.digitalocean.com/pricing/#Databases)
and [Amazon RDS](https://aws.amazon.com/rds/postgresql/pricing/) will run you about $15 (USD) per month to keep a
database going. This can be fairly pricey for someone wanting to just get their feet wet with Postgres.

## Heroku Postgres

Heroku to the rescue! For every app hosted on Heroku, you have access to a free tier Postgres instance. You can read
more about the [limitations of the free tier](https://devcenter.heroku.com/articles/heroku-postgres-plans#hobby-tier),
but it will be more than enough to get started with developing your app.

When I was working on a personal project, I wanted to be have my database accessible regardless of which machine I was
working on. This post aims to document the various steps I needed to get this to work, and hopefully it can be of some
help to a few of you!

### Prerequisites

You will need to have the Postgres client installed on your machine to connect to a database from your application.

The installation method differs between each OS so I won't go into too much detail here, but it is well documented.
Personally, I use Mac at home and Fedora at work.

For Mac, I've found that [Postgres.app](https://postgresapp.com/) was the least hassle to get everything running.

For Fedora, you can follow the [official docs from Fedora](https://fedoraproject.org/wiki/PostgreSQL).

### Getting Started

Here are the basic steps to get started with using the free Heroku Postgres for local development. In the later parts of
this post, I will be using Node.js and the [Knex.js](https://knexjs.org) query builder library for working with the
database. The steps up to getting the connection URL should be applicable to any other kind of environment.

#### 1. Create a Heroku App

First, create a Heroku account if you don't already have one.

Then, you can create a new Heroku app (or use an existing one). You can do this by logging
into [the dashboard](https://dashboard.heroku.com/apps) then at the top right, click `New > Create new app`. Enter an
app name and select the region closest to your location.

Once created, click into it. Under the "Overview" tab, you should see the "Installed add-ons" section. Click
`Configure add-ons` and search for "Postgres" in the search bar, then click the "Heroku Postgres" result that comes up.
A modal should come up. Make sure the "Hobby Dev - Free" option is selected and click the "Provision" button.

You should now have a Heroku app created with a free Postgres instance attached to it.

#### 2. Install the Heroku CLI

For the next step, install the Heroku CLI. You can use this to get the database credentials and interact with the
database via the terminal. You can find instructions on how to install it in
their [official documentation](https://devcenter.heroku.com/articles/heroku-cli#download-and-install).

Once installed run the following to log in to your account via the CLI:

```
$ heroku login
```

Follow the on-screen prompts to log in with your account.

#### 3. Getting the database credentials

There are various ways to connect to a database from the app you are developing, depending on the language and
library/framework. A common one is to use the connection string, which looks kind of like a URL that starts with
`postgres://`

First verify you have access to the app you created in the previous steps by running this command:

```
$ heroku apps
```

You should see a list of all the apps on your account. Note down the name of the one you created in the previous step.

You can then check to make sure Postgres is attached correctly to the app. To do this, run this command, where
`<app-name>` is the name of the app created in the first step:

```
$ heroku pg:info -a <app-name>

=== DATABASE_URL
Plan:                  Hobby-dev
Status:                Available
Connections:           0/20
PG Version:            11.6
Created:               2019-11-20 16:58 UTC
Data Size:             8.4 MB
Tables:                2
Rows:                  1/10000 (In compliance)
Fork/Follow:           Unsupported
Rollback:              Unsupported
Continuous Protection: Off
Add-on:                postgresql-cubed-73038
```

You should see some output like what is shown above. Now that we've verified Postgres is accessible on this app, we can
now get the database connection information with this command:

```
$ heroku pg:credentials:url -a <app-name>
```

You should see a `Connection URL` in the output that starts with `postgres://`. That is what I will be using for the
rest of this article. For other use cases, the connection info string should have the required info.

### Connecting via Knex.js

I won't be going into the details on how to set up Knex.js. You can view it at
their [official documentation](http://knexjs.org/#Installation-node).

If you try to use the connection URL as is via the exported `connection` property and attempt to run a migration, you
should see an error along these lines:

```
error: no pg_hba.conf entry for host "<ip address>", user "<username>", database "<database name>", SSL off
```

There are a couple of steps to be done:

Open the pg_hba.conf file for your local Postgres installation, and add this line to it to allow postgres to make the
connection this database:

```
host    all             all             <ip-address>/32        trust
```

Second, you will need to add this line to your `knexfile.js` where the `pg` module is required:

```js
pg.defaults.ssl = true
```

Finally, set this environment variable so that Node.js will not check for a certificate:

```js
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
```

This can be done in the code as shown above, via setting it before running your app, or using a dotenv file.

> **Note that this is not secure for use in production, and to only use for local development.**

Give your migration another try, and it should now succeed.

---

Hopefully this post was able to help you get started with using Postgres on Heroku's free tier. Let me know in the
comments if you have any questions or need clarifications.
