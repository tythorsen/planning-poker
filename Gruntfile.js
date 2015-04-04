module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'modules/sharedServices/SharedServices.js',
          'modules/sharedServices/FirebaseService.js',
          'modules/landing/Landing.js',
          'modules/landing/LandingController.js',
          'modules/room/Room.js',
          'modules/room/ResultsService.js',
          'modules/room/DeckFactory.js',
          'modules/room/DeckController.js',
          'modules/room/RoomController.js',
          'modules/contributor/Contributor.js',
          'modules/contributor/ContributorController.js',
          'modules/contributor/ContributorFactory.js',
          'modules/App.js'
        ],
        dest: 'temp/<%= pkg.name %>.js'
      },
      vendor: {
        src: [
          'vendor/js/hammer-2.0.4.min.js',
          'vendor/js/angular-1.3.14.min.js',
          'vendor/js/angular-resource-1.3.14.min.js',
          'vendor/js/angular-route-1.3.14.min.js',
          'vendor/js/angular-animate-1.3.14.min.js',
          'vendor/js/angular-aria-1.3.14.min.js',
          'vendor/js/angular-mocks-1.3.14.js',
          'vendor/js/angular-material-0.8.3.min.js',
          'vendor/js/firebase-2.2.3.min.js',
          'vendor/js/angularfire-1.0.0.min.js'
        ],
        dest: 'dist/vendor.min.js'
      }
    },

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
      all: ['modules/**/*.js']
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
          dest: "dist",
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
          dest: "dist",
          ext: ".css"
        }],
        options: {
          style: "compressed"
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'temp/<%= pkg.name %>.js'
        },
        screwIE8: true
      }
    },

    watch: {
      css: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: ['modules/**/*.js'],
        tasks: [ 'jshint', 'concat', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'karma', 'sass:dev', 'watch']);
  grunt.registerTask('prod', ['jshint', 'concat', 'uglify', 'karma', 'sass:dist']);
  grunt.registerTask('serve', ['connect']);
};
