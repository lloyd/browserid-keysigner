process.env['NODE_ENV'] = 'test'; // set env to testing so we can skip logging, etc.
process.env['PORT'] = '0'; // for testing bind ephemeral ports

const
should = require('should'),
http = require('http'),
server = require('./bin/keysigner'),
jwcrypto = require('jwcrypto');

// cause RSA and DSA algorithms to be loaded
// (Dear @benadida.  This API sucks.  Thanks, @lloyd)
require("jwcrypto/lib/algs/rs");
require("jwcrypto/lib/algs/ds");

// a little helper function to perform cert_key requests
function doRequest(args, cb) {
  var body = JSON.stringify(args);

  var req = http.request({
    host: '127.0.0.1',
    port: serverPort,
    path: '/cert_key',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length
    }
  }, cb);

  req.write(body);
  req.end();
}

var serverPort = -1;

describe('the server', function() {
  it('should start up', function(done) {
    server(function(err, port) {
      should.not.exist(err);
      (port).should.be.ok
      serverPort = port;
      done();
    });
  });
});

var keyPair;

describe('key generation', function() {
  it('should work', function(done) {
    jwcrypto.generateKeypair({
      algorithm: 'DS',
      keysize: 256
    }, function(err, kp) {
      should.not.exist(err);
      kp.should.be.a('object');
      keyPair = kp;
      done();
    });
  });
});

describe('key certification', function() {
  it('should work', function(done) {
    doRequest({
      duration: (6 * 60 * 60 * 1000), // 6 hours
      pubkey: keyPair.publicKey.serialize(),
      email: 'lloyd@example.com'
    }, function(res) {
      (res.statusCode).should.equal(200);
      // XXX: more thorough testing of response required
      done();
    });
  });

  it('should fail when duration is not a number', function(done) {
    doRequest({
      duration: (6 * 60 * 60 * 1000).toString(), // 6 hours
      pubkey: keyPair.publicKey.serialize(),
      email: 'lloyd@example.com'
    }, function(res) {
      (res.statusCode).should.equal(400);
      done();
    });
  });

  it('should fail when email is not provided', function(done) {
    doRequest({
      duration: (6 * 60 * 60 * 1000).toString(), // 6 hours
      pubkey: keyPair.publicKey.serialize()
    }, function(res) {
      (res.statusCode).should.equal(400);
      done();
    });
  });

  it('should fail when email is not a string', function(done) {
    doRequest({
      duration: (6 * 60 * 60 * 1000).toString(), // 6 hours
      pubkey: keyPair.publicKey.serialize(),
      email: 42
    }, function(res) {
      (res.statusCode).should.equal(400);
      done();
    });
  });
});
