#!/usr/bin/env node

var program = require('commander');
var fs = require('fs-extra');
var path = require('path');
var touch = require('touch');
var exec = require('child_process').exec;

program
  .version('0.0.1')
  .usage('[options] <keywords>')
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
      callback(p);
    } else {
      console.log('exec error: ' + error);
    }
  });
}

var setupClient = function(p) {
  // Main client
  fs.mkdirs(p + "/client", function(err) {
    if (err) {
      return console.error(err);
    }

  });

  fs.copy(p + "/" + p + ".html", p + "/client/main.html", function(err) {
    if (err) {
      return console.error(err);
    }

    fs.remove(p + "/" + p + ".html");
    fs.remove(p + "/" + p + ".css");
  });
  fs.copy(p + "/" + p + ".js", p + "/client/main.js", function(err) {
    if (err) {
      return console.error(err);
    }

    fs.remove(p + "/" + p + ".js")
  });

  // Client helpers
  fs.outputFile(p + "/client/helpers/config.js");

  // Stylesheets
  fs.mkdirs(p + "/client/stylesheets");

  // Client views
  fs.outputFile(p + "/client/views/application/layout.html.example");

}

var setupServer = function(p) {
  // Main server
  fs.mkdirs(p + '/server');
  fs.outputFile(p + "/server/fixtures.js");
  fs.outputFile(p + "/server/publications.js");
}

var setupPublic = function(p) {
  // Main public
  fs.mkdirs(p + '/public');
}

var setupLib = function(p) {
  // Main Lib
  fs.mkdirs(p + '/lib');
  fs.outputFile(p + "/lib/router.js");
}

var setupCollections = function(p) {
  // Main collections
  fs.mkdirs(p + '/collections');
}

// Functions
var createProject = function(projectName) {
  setupMeteor(projectName, createScaffold);
}

var createScaffold = function(projectName) {
  setupClient(projectName);
  setupServer(projectName);
  setupPublic(projectName);
  setupLib(projectName);
  setupCollections(projectName);
}

program.command('project <projectName>')
  .description('create basic scaffolding')
  .action(createProject(keywords[1]))

program.command('help')
  .description('give help')
