/* global module */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['.jekyll', '_site', 'build'],
    jshint: {
      files: ['Gruntfile.js', '_scripts/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9', 'Opera 12.1']
      },
      no_dest: {
        src: 'public/css/*.css'
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['_scripts/**/*.js'],
        // the location of the resulting JS file
        dest: 'public/scripts/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/scripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['_scripts/app/partials/**'], dest: 'public/scripts/app/partials/'},
          {expand: true, flatten: true, src: ['build/*'], dest: 'public/scripts/', filter: 'isFile'}
        ]
      }
    },
    bower_concat: {
      all: {
        dest: 'build/_bower.js',
        cssDest: 'build/_bower.css',
        bowerOptions: {
          relative: false
        }
      }
    },
    wiredep: {
      task: {
        src: ['_layouts/default.html'],
        options: {
          directory: '_bower',
          dependencies: true,
          devDependencies: true
        }
      }
    },
    exec: {
      bump_version: {
        cmd: function(){ return "GitVersion > .\\build.version";}
      }
    },
    jekyll: {                             // Task
      options: {                          // Universal options
        bundleExec: true,
        src : '<%= app %>'
      },
      dist: {                             // Target
        options: {                        // Target options
          dest: '<%= dist %>',
          config: '_config.yml,_config.build.yml'
        }
      },
      serve: {                            // Another target
        options: {
          dest: '.jekyll',
          drafts: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('default', ['jshint', 'jekyll', 'autoprefixer', 'concat', 'bower_concat', 'copy:main', 'exec:bump_version']);
  grunt.registerTask('dev', ['jshint', 'autoprefixer', 'wiredep', 'exec:bump_version']);
  grunt.registerTask('test-task', []);
};
