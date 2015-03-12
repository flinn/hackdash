module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
        nodemon: {
          command: 'npm run local'
        },
        watchify: {
          command: 'npm run watch'
        },
        build: {
          command: 'npm install cloud/ & npm run build'
        }
    },
    concurrent: {
        runandwatch: ['shell:build','shell:nodemon', 'shell:watchify'],
        options: {
          logConcurrentOutput: true
        }
    }
  });

  // Load the plugins FTW
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default tasks
  grunt.registerTask('default', ['concurrent:runandwatch']);
  grunt.registerTask('deploy', function() {
    console.log("Not implemented...");
  });


};