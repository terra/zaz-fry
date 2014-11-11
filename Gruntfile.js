'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		clean: ['dist'],
		'6to5': {
			options: {
			},
			src: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.js'],
					dest: 'dist/',
				}],
			},
		},

		copy: {
			src: {
				expand: true,
				cwd: 'src',
				src: ['**', '!**/*.js', 'bin/skeleton/**/*.js'],
				dest: 'dist',
			},
		},

		mochaTest: {
			options: {
				timeout: 5000,
				bail: true,
				clearRequireCache: true, // necessary for `watch` task
			},
			src: 'dist/tests/*.js',
		}
	});

	grunt.registerTask('build', ['clean', '6to5','test']);
	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('default', ['build']);
};
