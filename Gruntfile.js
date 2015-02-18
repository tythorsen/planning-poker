module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    connect: {
      server: {
        options: {
          port: 4000,
          hostname: "localhost",
          keepalive: true
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      all: ['scripts/*.js']
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: "styles",
          src: "*.scss",
          dest: "styles/dist",
          ext: ".css"
        }],
        options: {
          style: "expanded"
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: "styles",
          src: "*.scss",
          dest: "styles/dist",
          ext: ".css"
        }],
        options: {
          style: "compressed"
        }
      }
    },
    
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: "scripts",
          src: "*.js",
          dest: "scripts/dist",
          ext: ".min.js"
        }]
      }
    },

    watch: {
      css: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: ['scripts/*.js', 'scripts/data/*.js', 'scripts/tests/*.js'],
        tasks: [ 'jshint', 'karma', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint', 'karma', 'uglify', 'sass:dev', 'watch']);
  grunt.registerTask('prod', ['jshint', 'karma', 'uglify', 'sass:dist']);
  grunt.registerTask('serve', ['connect']);
};