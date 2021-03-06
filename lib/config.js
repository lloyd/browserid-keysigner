var convict = require('convict'),
    winston = require('winston');

var argv = require('optimist')
.usage('A keysigning process for the BrowserID protocol.\nUsage: $0')
.alias('h', 'help')
.describe('h', 'display this usage message')
.alias('s', 'show')
.describe('s', 'show server configuration');

var args = argv.argv;

if (args.h) {
  argv.showHelp();
  process.exit(0);
}

module.exports = convict({
  ip: {
    doc: "The ip address the server should bind",
    format: 'string = "127.0.0.1"',
    env: 'IP_ADDRESS'
  },
  hostname: {
    doc: "The public facing hostname, with which certificates will be signed",
    format: 'string',
    env: 'HOSTNAME'
  },
  port: {
    doc: "The port the server should bind",
    format: 'integer{0,65535} = 8080',
    env: 'PORT'
  },
  pub_key_path: {
    doc: "Path to public key",
    format: "string",
    env: "PUB_KEY_PATH"
  },
  priv_key_path: {
    doc: "Path to public key",
    format: "string",
    env: "PRIV_KEY_PATH"
  },
  log_path: {
    doc: "Where logs output will be written",
    format: "string?",
    env: "LOG_PATH"
  },
  certificate_validity_ms: {
    doc: "Default certificate validity in milliseconds",
    format: 'integer = 86400000'
  },
  max_compute_processes: {
    doc: "How many computation processes will be spun.  Default is based on the number of CPU cores on the machine.",
    format: 'union { number{1, 256}; null; } = null',
    env: 'MAX_COMPUTE_PROCESSES'
  },
  max_compute_duration: {
    doc: "The longest (in seconds) we'll work on a request before failing.",
    format: 'integer = 10'
  }
});

// handle configuration files.  you can specify a CSV list of configuration
// files to process in the CONFIG_FILES environment variable
if (process.env['CONFIG_FILES']) {
  var files = process.env['CONFIG_FILES'].split(',');
  files.forEach(function(file) {
    var c = cjson.load(file);
    conf.load(c);
  });
}

if (args.h) {
  argv.showHelp();
  process.exit(0);
}

if (args.s) {
  process.exit(1);
}

try {
  module.exports.validate();
} catch(e) {
  winston.error("invalid configuration:");
  e.split('\n').forEach(function(err) { winston.error(err) });
  process.exit(1);
}