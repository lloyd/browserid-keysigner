var winston = require('winston'),
     config = require('./config.js');

// for test environments, remove the Console logging
if (process.env.NODE_ENV === 'test') {
  winston.remove(winston.transports.Console);
}

if (config.has('log_path')) {
  winston.add(winston.transports.File, { filename: config.get('log_path')});
} 
