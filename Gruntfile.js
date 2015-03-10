module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      dist: {
        src: [
          'src/js/polyfill/window.namespace.js',
          'src/js/App.js',
          'src/js/PlanningPoker.js',
          'src/js/data/PlanningPoker.Decks.js',
          'src/js/config/Theme.js',
          'src/js/config/Routes.js',
          'src/js/factory/RoomHelper.js',
          'src/js/controller/LandingCtrl.js',
          'src/js/controller/RoomCtrl.js'
        ],
        dest: 'src/temp/<%= pkg.name %>.js'
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
      all: ['src/js/**/*.js']
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
        files: {
          'dist/<%= pkg.name %>.min.js': 'src/temp/<%= pkg.name %>.js'
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
        files: ['src/js/**/*.js'],
        tasks: [ 'jshint', 'karma', 'concat', 'uglify']
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

  grunt.registerTask('default', ['jshint', 'karma', 'concat', 'uglify', 'sass:dev', 'watch']);
  grunt.registerTask('prod', ['jshint', 'karma', 'concat', 'uglify', 'sass:dist']);
  grunt.registerTask('serve', ['connect']);
};