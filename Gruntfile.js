grunt.initConfig({
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

grunt.loadNpmTasks('grunt-jekyll');

grunt.registerTask('default', ['jshint', 'jekyll']);
