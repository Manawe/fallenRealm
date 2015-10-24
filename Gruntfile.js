module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      js: {
        src: ['game/javascripts/*.js'],
        dest: 'public/javascripts/release.js',
      },
      // css: {
      //   src: ['game/stylesheets/*.css'],
      //   dest: 'public/css/*.css',
      // }
    },
    watch : {
      js: {
        files: ['game/javascripts/*.js'],
        tasks: 'build/release.js',
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['game/stylesheets/*.css'],
        tasks: 'css/style.css',
        options: {
          spawn: false,
        },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat'], ['watch'])
};
