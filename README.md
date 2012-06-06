# A Certifier Process for BrowserID

[![Build Status](https://secure.travis-ci.org/lloyd/browserid-keysigner.png)](http://travis-ci.org/lloyd/browserid-keysigner)

This repository aims to build a process capable of signing certificates for
BrowserID.  If you wanted to build a Primary Identity Authority with
BrowserID support, this is something you can run in your environment,
and talk to over HTTP to implement certificate generation.

A Work In Progress.

Installation
------------

Either npm or git should work:

    npm install git@github.com:mozilla/browserid-bigtent.git

or

    git clone git://github.com/mozilla/browserid-certifier.git

You must install the dependencies:

    cd browserid-certifier
    npm install

You must create a config file. Example ``config/local.json``

    {
      "ip": "0.0.0.0",
      "hostname": "dev.bigtent.mozilla.org",
      "port": 8080,
      "pub_key_path": "var/key.publickey",
      "priv_key_path": "var/key.secretkey"
    }

Generating the Keypar
---------------------
Both your IdP service and the Certifier must share a public key.
The Certifier, requires both a private and public keypair.

Do the following:

    cd var/
    ../node_modules/.bin/generate-keypair
    ls
    cd var/

You should now see a ``key.publickey`` and ``key.secretkey``
in the directory. This matches your local.json config.

You'll also want to import or re-use this ``key.publickey`` in
your IdP's ``/.well-known/browserid`` file.

Running Certifier
-----------------

    CONFIG_FILES=config/local.json npm start