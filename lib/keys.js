var logger = require('winston'),
  jwcrypto = require('jwcrypto'),
      cert = jwcrypto.cert;

require("jwcrypto/lib/algs/rs");
require("jwcrypto/lib/algs/ds");

// XXX: keypairs shouldn't be always generated, but read from the file system or
// something.  hack here.

var kp;

module.exports.pubkey = function(cb) {
  if (!kp) {
    jwcrypto.generateKeypair({algorithm: "DS", keysize: 256}, function(err, keyPair) {
      if (err) cb(err);
      else {
        kp = keyPair;
        cb(null, keyPair.publicKey);
      }
    });
  } else {
    process.nextTick(function() {
      cb(null, kp.publicKey);
    });
  }
};

module.exports.privkey = function(cb) {
  if (!kp) {
    jwcrypto.generateKeypair({algorithm: "DS", keysize: 256}, function(err, keyPair) {
      if (err) cb(err);
      else {
        kp = keyPair;
        cb(null, keyPair.secretKey);
      }
    });
  } else {
    process.nextTick(function() {
      cb(null, kp.secretKey);
    });
  }
};