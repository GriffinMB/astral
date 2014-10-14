#!/usr/bin/env node

var program = require('commander');
var fs = require('fs-extra');
var path = require('path');
var touch = require('touch');
var exec = require('child_process').exec;

program
  .version('0.0.8')
  .usage('project <projectName>')
  .option('-r, --routes', 'enable iron-router')
  .option('-f, --full', 'include all packages')
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
      } else if (program.full) {
        addAllPackages(p, callback);
      } else {
        callback(p);
      }
    } else {
      console.log('exec error: ' + error);
    }
  });
}

var createScaffold = function(p) {
  // var scaffoldPath = path.resolve("#{__dirname}/../scaffold" + "/")
  var scaffoldPath = path.resolve(__dirname + "/scaffold/")

  fs.remove(p + "/" + p + ".html");
  fs.remove(p + "/" + p + ".css");
  fs.remove(p + "/" + p + ".js")

  fs.copy(scaffoldPath, p + '/', function(err) {
    if (err) {
      return console.error(err);
    }
  });
}

var addAllPackages = function(p, callback) {
  fs.appendFile(p + "/.meteor/packages", "iron:router\n", function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Iron Router added to packages");
    }
  });

  fs.appendFile(p + "/.meteor/packages", "mrt:iron-router-progress\n", function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Iron Router Progress Bar added to packages");
    }
  });

  fs.appendFile(p + "/.meteor/packages", "accounts-base\n", function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Accounts-Base added to packages");
    }
  });

  fs.appendFile(p + "/.meteor/packages", "accounts-password\n", function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Accounts-Password added to packages");
    }
  });

  fs.appendFile(p + "/.meteor/packages", "less\n", function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Less added to packages");
    }
  });

  fs.appendFile(p + "/.meteor/packages", "jquery\n", function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("JQuery added to packages");
    }
  });

  fs.appendFile(p + "/.meteor/packages", "underscore\n", function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Underscore added to packages");
    }
  });

  fs.appendFile(p + "/.meteor/packages", "cfs:standard-packages\n", function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Collection File System added to packages");
    }
  });

  fs.appendFile(p + "/.meteor/packages", "cfs:filesystem\n", function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("CFS temp storage system added to packages");
    }

    callback(p);
  });

}

var addIronRouter = function(p, callback) {
  fs.appendFile(p + "/.meteor/packages", "iron:router\n", function(err) {
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
