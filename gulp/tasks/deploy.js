var gulp  = require('gulp'),
    moment = require('moment-timezone'),
    spawn = require('child_process').spawn;

gulp.task('deploy', [], function(cb) {

  var version = moment().format('YYYYMMDD-HHmm');
  var spawnArgs = [
    'app',
    'deploy',
    'app.yaml',
    '--project',
    'ty-thorsen',
    '--version',
    version,
    '--quiet',
    '--no-promote'
  ];

  deployer = spawn('gcloud', spawnArgs);

  deployer.stdout.on('data', function (data) {
    console.log(data.toString().trim());
  });

  deployer.stderr.on('data', function (data) {
    console.log(data.toString().trim());
  });

  deployer.on('uncaughtException', function(err) {
    server.kill();
  });

  deployer.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
  });

});
