# Gulp tutorial by John Papa
You've built your JavaScript application but how do you automate testing, code analysis, running it locally or deploying it? These redundant tasks can consume valuable time and resources. Stop working so hard and take advantage of JavaScript task automation using Gulp to streamline these tasks and give you back more time in the day. Studying this repo can help clarify how Gulp works, jump-start task automation with Gulp, find and resolve issues faster, and be a more productive.

## Requirements

- Install Node
	- on OSX install [home brew](http://brew.sh/) and type `brew install node`
	- on Windows install [chocolatey](https://chocolatey.org/) 
    - Read here for some [tips on Windows](http://jpapa.me/winnode)
    - open command prompt as administrator
        - type `choco install nodejs`
        - type `choco install nodejs.install`
- On OSX you can alleviate the need to run as sudo by [following these instructions](http://jpapa.me/nomoresudo). I highly recommend this step on OSX
- Open terminal
- Type `npm install -g node-inspector bower gulp`

## Quick Start
Prior to taking the course, clone this repo and run the content locally
```bash
$ npm install
$ bower install
$ npm start
```

# NOTES
======
## 4 Things you need to know about gulp
We have four API's in gulp "gulp.task, gulp.src, gulp.dest, gulp.watch"

### gulp.task
> gulp.task(name, [dep], fn)

1. Registers a task name with a function
2. Optionally declare dependecies

```javascript
gulp.task('js', function() {
	return gulp
		.src('./src/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/'))
})
```
The dependencies in "gulp.task" are other tasks, but you need to know some things:

```javascript
gulp.task('js', ['jscs', 'jshint'], function() {
	return gulp
		.src('./src/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/'))
})
```

1. The tasks jshint and jscs both run first, then task js runs
2. Dependency tasks run in parallel, not in sequence