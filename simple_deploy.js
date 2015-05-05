#!/usr/bin/env node

var exec = require('child_process').exec;
var http = require('http');

var config = require('./config');

config.branch = config.branch || 'master';

var gitPull = 'git pull origin ' + config.branch;
var foreverRestart = 'forever restartall --plain';

var server = http.createServer(function(req, res) {
  if (config.secret === req.url) {
    res.write(gitPull);

    var opts = {
      cwd: config.deployDir
    };
    exec(gitPull, opts, function(err, stdout, stderr) {
      if (stdout) res.write(stdout);
      if (stderr) res.write(stderr);
      if (err) {
        res.write(err.toString());
        res.statusCode = 500;
        return res.end('Unable to do git pull');
      }
      res.write(foreverRestart);
      exec(foreverRestart, opts, function(err, stdout, stderr) {
        if (stdout) res.write(stdout);
        if (stderr) res.write(stderr);
        if (err) {
          res.write(err.toString());
          res.statusCode = 500;
          return res.end('Unable to do forever restart');
        }
        res.statusCode = 200;
        res.end('Finished');
      });
    });
  } else {
    setTimeout(function() {
      res.statusCode = 403;
      res.end('Access Denied');
    }, 3000);
  }
});

server.listen(config.port, config.bindAddress, function() {
  console.log('Listening for redeployments on port', config.port);
});
