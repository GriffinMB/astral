#!/usr/bin/env node

var program = require('commander');
var fs = require('fs-extra');
var path = require('path');
var touch = require('touch');
var exec = require('child_process').exec;
var scaffoldPath = path.resolve("#{__dirname}/../scaffold" + "/");

program
  .version('0.0.3')
  .usage('project <projectName>')
  .option('-r, --routes', 'enable iron-router')
  .parse(process.argv);

if(!program.args.length) {
  program.help();
} else {
  var keywords = program.args;

}

// Scaffolding

var setupMeteor = function(p, callback) {
  exec('meteor create ' + p, function(error, stdout, stderr) {
    if (error == null) {
      console.log(stdout);
      if (program.routes) {
        addIronRouter(p, callback);
      } else {
        callback(p);
      }
    } else {
      console.log('exec error: ' + error);
    }
  });
}

var createScaffold = function(p) {
  fs.remove(p + "/" + p + ".html");
  fs.remove(p + "/" + p + ".css");
  fs.remove(p + "/" + p + ".js")

  fs.copy(scaffoldPath, p + '/', function(err) {
    if (err) {
      return console.error(err);
    }
  });
}

var addIronRouter = function(p, callback) {
  fs.appendFile(p + "/.meteor/packages", "iron:router", function(err) {
    if (err) {
      return console.error(err);
    } else {
      callback(p);
    }
  });
}
// Functions
var createProject = function(projectName) {
  setupMeteor(projectName, createScaffold);
}

program.command('project <projectName>')
  .description('create basic scaffolding')
  .action(createProject(keywords[1]))
