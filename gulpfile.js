var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function(){
	log('tomela');
	return gulp
						.src(['./src/**/*.js',
							'./*.js'
						])
						.pipe($.if(args.verbose, $.print()))
						.pipe($.jscs())
						.pipe($.jshint()) 
						.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
						.pipe($.jshint.reporter('fail'));
});

///////////////

function log(msg){
	if(typeof(msg) === 'object'){
		for(var item in msg){
			if(msg.hasOwnProperty(item)){
				$.util.log($.util.color.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}