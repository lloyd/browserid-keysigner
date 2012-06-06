Heartbeat
---------

`/__heartbeat__` is available for monitoring the serivce.

Cryptographic Keys
------------------

This server does cryptographic operations as part of the Persona Primary
protocol.

It must have public/secret keys. There are several ways to achieve this:

-  Config options: ``pub_key_path`` and ``priv_key_path``
-  Example:

    {
      ..
      "pub_key_path": "var/key.publickey",
      "priv_key_path": "var/key.secretkey"
    }

The private key (`var/key.secretkey`) is *extremely sensative*, protect it!

Only the public key (`var/key.publickey`) can be shared via HTTP.

`/public-key` is available for checking to see which keypair is currently deployed.