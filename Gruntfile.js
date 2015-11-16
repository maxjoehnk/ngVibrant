module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-ng-annotate');

	grunt.registerTask('default', ['jshint', 'concat', 'clean:coverage', 'karma:dist']);
	grunt.registerTask('dist', ['jshint', 'eslint', 'jscs', 'clean:coverage', 'karma:dist', 'concat', 'ngAnnotate:dist', 'uglify:dist', 'clean:build']);
	grunt.registerTask('test', ['jshint', 'eslint', 'jscs', 'clean:coverage', 'karma:dev']);

	grunt.initConfig({
		concat: {
			default: {
				files: {
					'tmp/angular-vibrant.js':['src/**/*.module.js', 'src/**/*.js']
				}
			}
		},
		jshint: {
			options: {
				jshintrc: true
			},
			default: ['src/**/*.js']
		},
		eslint: {
			options: {
				configFile: '.eslintrc'
			},
			default: ['src/**/*.js']
		},
		jscs: {
			options: {
				config: true
			},
			default: ['src/**/*.js']
		},
		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			dist: {
				files: {
					'dist/angular-vibrant.js': ['tmp/angular-vibrant.js']
				}
			}
		},
		uglify: {
			dist: {
				compress: true,
				files: {
					'dist/angular-vibrant.min.js': ['dist/angular-vibrant.js']
				}
			}
		},
		karma: {
			options: {
				frameworks: ['jasmine'],
				files: [
					'bower_components/angular/angular.min.js',
					'bower_components/angular-mocks/angular-mocks.js',
					'src/**/*.module.js',
					'src/**/*.js',
					'test/unit/**/*.js'
				],
				singleRun: true,
				preprocessors: {
					'src/**/*.js': 'coverage'
				},
				reporters: ['progress', 'coverage'],
				coverageReporter: {
					type : 'lcov',
					subdir : '.'
				}
			},
			dev: {
				browsers: ['Chrome']
			},
			dist: {
				browsers: ['PhantomJS']
			}
		},
		clean: {
			build: [
				'tmp/'
			],
			coverage: [
				'coverage/'
			]
		}
	});
};
