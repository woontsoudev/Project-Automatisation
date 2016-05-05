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

When we have to define a new task? Well, we have three cases:

1. Writing tests and linting code
2. Files optimization(minifycation and concadenating files)
3. Serving the app

Write your own task:

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

1. The tasks jshint and jscs both run first, then task js runs
2. Dependency tasks run in parallel, not in sequence

```javascript
gulp.task('js', ['jscs', 'jshint'], function() {
	return gulp
		.src('./src/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/'))
})
```

# Projects automation

## 1. Installing packages globally for your project

Run `npm install -g gulp bower` to install gulp and bower globally.

> Tip: run `npm list -g --depth=0` to see all the packages installed globally.

## 2. Installing packages locally, for a project

Run `npm install gulp --save-dev package-name` to save a local package as a devdependency for your projects.

> NOTE: The commnand `--save-dev` saves the package as a devDependencies in the package.json file. And  `--save` saves it as a dependendecie in the package.json file.

### Diferences between packages dependencies

##### Dependencies
1. Needed at run-time
2. Examples: -Express, -Angular, -Bootstrap, etc...
3. Code `npm install --save` and `bower install --save`

##### DevDependencies
1. Needed during development
2. Examples: -concat, -jshint, -uglify, -jasmin
3. Code `npm install --save-dev` and `bower install --save-dev`

## 2.1 Installing gulp locally
Run `npm install gulp --save-dev`.

Rigth now you have gulp installed in your project, go to your package.json file and check this:
```javascript
"devDependencies": {
    "gulp": "^3.9.1"
  }
```

## 3. Create the gulpfile

Create a file called gulpfile.js and write `var gulp = require('gulp');` to import the gulp module to our file.

##### Creating your first task

```javascript
var gulp = require('gulp');

gulp.task('hello-world', function(){
    console.log('Our first task!!!!!!!!');
});
```
> You can see the log in your terminal running `gulp hello-world`

## 4. Create your first task
In our first task, we want to use two popular tool "JSHint and JScs"
##### JSHint
1. Javascript code analysis
2. Detect errors and potencial problems

##### JScs
1. Javascript code style checker
2. Enforcing your style guide

## 4.1. Install JSHint and JSCS locally
Run `npm install gulp-jshint gulp-jscs --save-dev` to install locally.
Add the jshint and jscs plugins to your gulpfile:
```javascript
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
```
> Use `require` to reference the gulp plugins `var variable = require(module);`

##### Add JSHint and JScs to your task
```javascript
gulp.task('vet', function(){
	log('Hi from my task');
	return gulp
		.src(['./src/**/*.js',
			'./*.js'
		])
		.pipe(jscs())
		.pipe(jshint()) 
		.pipe(jshint.reporter('jshint-stylish', {verbose: true})); // create a report more user friendly
});
```
> Run `npm install --save-dev jshint-stylish` to install the jshint plugin

##### Create a reusable functions.

Create a reusable function called 'log'.

```javascript
function log(msg){
	if(typeof(msg) === 'object'){
		for(var item in msg){
			if(msg.hasOwnProperty(item)){
				util.log(util.color.blue(msg[item])); // Util property is a gulp plugin, this plugin print all the messages with the color seted
			}
		}
	} else {
		util.log(util.colors.blue(msg));
	}
}
```

Now call this function from your task.

```javascript
gulp.task('vet', function(){
	log('welcome to your reusable function'); // This log was show every time we run the vet task
	return
		gulp
			.src(['./src/**/*.js',
				'./*.js'
			])
			.pipe(jscs())
			.pipe(jshint()) 
			.pipe(jshint.reporter('jshint-stylish', {verbose: true}))
			.pipe(jshint.reporter('fail'));
});
```
> Run `npm install --save-dev gulp-util` to install the util plugin to your project. Remember, you need to require the plugin in the gulpfile using `require()`

```javascript
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var util = require('gulp-util'); // here its the new plugin added
```

> Add a fail reporter to your task `.pipe(jshint.reporter('fail'));`

```javascript
gulp.task('vet', function(){
	log('tomela');
	return gulp
						.src(['./src/**/*.js',
							'./*.js'
						])
						.pipe(jscs())
						.pipe(jshint()) 
						.pipe(jshint.reporter('jshint-stylish', {verbose: true}))
						.pipe(jshint.reporter('fail')); // the task will be fail if jshint have an error
});
```

##### Conditionally displayin the source files

Install gulp print `npm install --save-dev gulp-print` and pipe in your task after src

> Require the plugin in your gulp file `var gulpprint = require('gulp-print')` and add in your task `.pipe(gulpprint())`

You need to control when the files are printed, install `npm install --save-dev gulp-if yargs`

> Require the plugin `var gulpif = require(gulp-if);` and `var args = require('yargs').argv;`. Them add the conditional to your task `.pipe(gulpif(args.verbose, gulpprint()))`

Now you can run `gulp ver --verbose` to see the files. Now your gulp file look like this:

```javascript
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var util = require('gulp-util');
var gulpprint = require('gulp-print'); // this print the working files task 
var gulpif = require('gulp-if'); // conditional plugin
var args = require('yargs').argv; // this plugin help us to pass args in the commmand line

gulp.task('vet', function(){
	log('tomela');
	return gulp
						.src(['./src/**/*.js',
							'./*.js'
						])
						.pipe(gulpif(args.verbose, gulpprint())) // the task show the files only if you use --verbose
						.pipe(jscs())
						.pipe(jshint()) 
						.pipe(jshint.reporter('jshint-stylish', {verbose: true}))
						.pipe(jshint.reporter('fail'));
});

///////////////

function log(msg){
	if(typeof(msg) === 'object'){
		for(var item in msg){
			if(msg.hasOwnProperty(item)){
				util.log(util.color.blue(msg[item]));
			}
		}
	} else {
		util.log(util.colors.blue(msg));
	}
}
```

##### Lazy loading gulp plugins

Clean your task using gulp-load-plugins, install `npm install --save-dev gulp-load-plugins`.

> Add `var $ = require('gulp-load-plugins')({lazy: true})` and replace all the plugin names with '$'

```javascript
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
```
