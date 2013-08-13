#!/usr/bin/env python

"""Usage: gen_well_known_browserid.py key.publickey > www/.well-known/browserid

Generates the /.well-known/browserid file based on your public key.

You can run this script on every build or deployment. To "rotate"
your public/private keypair, you generate new keys and run this script
to update the well known file.
"""

""" This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/. """

import json
import sys
import getopt

def gen_well_known(pubkey):
    """ Output a BrowserID compatible well-known file. """
    rawkey = ''
    with open(pubkey) as pubkey_file:
        rawkey = pubkey_file.read()

    # TODO: split on 999 is ugly
    temp = json.dumps({
        'public-key': 999,
        'authentication': '/browserid/sign_in.html',
        'provisioning': '/browserid/provision.html'
    }, sort_keys=True, indent=4).split('999')

    print(''.join([temp[0], rawkey, temp[1]]))

def main():
    """ This is a CLI app. """
    # parse command line options
    try:
        opts, args = getopt.getopt(sys.argv[1:], "h", ["help"])
    except getopt.error, msg:
        print msg
        print "for help use --help"
        sys.exit(2)

    # process options
    for key, _ in opts:
        if key in ("-h", "--help"):
            print __doc__
            sys.exit(0)

    # process arguments
    if not (len(args) == 1):
        print __doc__
        sys.exit(1)

    gen_well_known(args[0])

if __name__ == "__main__":
    main()
