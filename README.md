# A Certifier Process for BrowserID

[![Build Status](https://secure.travis-ci.org/lloyd/browserid-keysigner.png)](http://travis-ci.org/lloyd/browserid-keysigner)

This repository aims to build a process capable of signing certificates for
BrowserID.  If you wanted to build a Primary Identity Authority with
BrowserID support, this is something you can run in your environment,
and talk to over HTTP to implement certificate generation.

A Work In Progress.

Installation
------------

    npm install git@github.com:mozilla/browserid-bigtent.git

You must create a config file. Example ``config/local.json``

    {
      "ip": "0.0.0.0",
      "hostname": "dev.bigtent.mozilla.org",
      "port": 8080,
      "pub_key_path": "var/key.publickey",
      "priv_key_path": "var/key.secretkey"
    }

Running Certifier
-----------------

    CONFIG_FILES=config/local.json npm start