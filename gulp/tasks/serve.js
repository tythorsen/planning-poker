var gulp  = require('gulp'),
    argv  = require('yargs').argv,
    spawn = require('child_process').spawn;

gulp.task('serve', [], function(cb) {

  var spawnArgs = [
    'app.yaml',
    '--port=8081',
    '--admin_port=8002',
    '--datastore_path=/tmp/tythorsen_datastore',
    '--require_indexes=yes',
    '--support_datastore_emulator=True'
  ];

  if (argv.clean) {
    spawnArgs.push('--clear_datastore=yes');
  }

  server = spawn('dev_appserver.py', spawnArgs);

  server.stdout.on('data', function (data) {
    console.log(data.toString().trim());
  });

  server.stderr.on('data', function (data) {
    console.log(data.toString().trim());
  });

  server.on('uncaughtException', function(err) {
    server.kill();
  });

  server.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
  });
});
