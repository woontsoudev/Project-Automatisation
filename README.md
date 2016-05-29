# Project Automatisation
This guide is based on [John Papa tutorial](https://app.pluralsight.com/library/courses/javascript-build-automation-gulpjs/table-of-contents).

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

# Notes

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
var $ = require('gulp-load-plugins')({lazy: true}); // All the gulp plugins was replaced with this line

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

#### Rusable configuration module

Create a new file called `gulp.config.js`, them create a module to return a config with the source of all files needed in your task.

```javascript
module.exports = function() {
  var config = {
    alljs: [
      './src/**/*.js',
      './*.js'
    ]
  };
  return config;
};
```

Modify your gulp.js file to use a config file.

> Change the 'src' of your task to `.src(config.alljs)`... and import your config module to your task `var config = require('./gulp.config')();`

Your task should look as follows:

```javascript
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')(); // this task need to be execute immediately with '()'

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function(){
	log('tomela');
	return gulp
					.src(config.alljs) // now you only need to call the config array to use it 
					.pipe($.if(args.verbose, $.print()))
					.pipe($.jscs())
					.pipe($.jshint()) 
					.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
					.pipe($.jshint.reporter('fail'));
});
```

## CSS compilation

#### Creating a Less and AutoPrefixer gulp task

First install the plugins needed to your task.

> Run `npm install --save-dev gulp-less gulp-autoprefixer`

NOTE: actually you don't need to use `var less = require('gulp-less')`, because we was installed the gulp load plugins

Create a task called 'styles'.

```javascript
gulp.task('styles' function() {
	log('Compiling Less --> CSS');
	return gulp 
					.src(config.less) // remember add the path in your 'gulp.config.js' file
					.pipe($.less()) // pipe the less plugin in your task
					.pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']})) // this add the browser prefixes to make our app cross browsing
					.pipe(gulp.dest(config.temp));
});
```

Add the path for your less files in the `gulp.config.js` file.

```javascript
module.exports = function() {
  var client = './src/client/'; // Set a default path for our client directory
  var config = {
    temp: './.tmp/', // Make a temp folder to our temporally files its a good practice.
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    less: client + 'styles/styles.less' // you can use '[]' to add multiple paths
  };

  return config;
};
```

#### Deleating files in a dependency task

First install the gulp package DEL.

> Run `npm install del --save-dev`

NOTE: This module its not a gulp plugin, for this reason we need to require the module.

```javscript
var del = require('del');
``` 

Define a reusable function called 'clean'

```javascript
function clean(path, done) { // Use a calback function called 'done' to ensure when the task start first clean the temp directory
	log('Cleaning: ' + $.util.colors.blue(path));
	del(path).then(function() {
		done(); // In this case use a promise. https://github.com/johnpapa/pluralsight-gulp/issues/24
	});
}
```

NOTE: The del module was updated and now use a promise instead of callback. `https://github.com/johnpapa/pluralsight-gulp/issues/24`

Create a task for cleaning all the styles.

```javascript
gulp.task('clean-styles', function(done) {
	var files = config.temp + '**/*.css';
	clean(files, done);
});
```

Now add the cleaning task as a subtask for styles task

```javascript
gulp.task('styles', ['clean-styles'], function() { // Remember all the subtask run first
	log('Compiling Less --> CSS');
	return gulp 
					.src(config.less)
					.pipe($.plumber())
					.pipe($.less())
					.pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
					.pipe(gulp.dest(config.temp));
});
```

#### Creating a watch task

Create a new task called 'less-watcher', this task its going to watch all the changes on our less files.

```javascript
gulp.task('less-watcher', function() {
	gulp.watch([config.less], ['styles']);
});
```
#### Handling errors using gulp-plumber

Install the gulp-plumber plugin

> run `npm install --save-dev gulp-plumber`

Now add gulp-plumber plugin to your styles task.

```javascript
gulp.task('styles', ['clean-styles'], function() {
	log('Compiling Less --> CSS');
	return gulp 
					.src(config.less)
					.pipe($.plumber()) // Here the plumber plugins check for errors
					.pipe($.less())
					.pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
					.pipe(gulp.dest(config.temp));
});
```

## HTML Injection

#### Exploring wiredep and gulp-inject

Install wiredep and gulp-inject
> Run `npm install --save-dev wiredep gulp-inject`

Use these tools to include all our bower files and custom js and css

<html>
	<head>
		<!-- bower:css -->
		<!-- endbower -->
		<!-- inject:css -->
		<!-- endinject -->
	</head>
	<body>
		<!-- bower:js -->
		<!-- endbower -->
		<!-- inject:js -->
		<!-- endinject -->
	</body>
</html>

Use wiredep to include all the bower files, bower js or css
> Wiredep `<!-- bower:type -->`

Use gulp-inject to include all the custom js and css code
> gulp-inject `<!-- inject:type -->`

#### Adding bower files and your javascript to the HTML

Create a task called 'wiredep'

```javascript
gulp.task('wiredep', function() {
	var options = config.getWiredepDefaultOptions();
	var wiredep = require('wiredep').stream;
	return gulp
		.src(config.index)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client));
});
```

Modify the gulp.config.js file to:

```javascript
module.exports = function() {
  var client = './src/client/';
  var clientApp = client + 'app/'; // set the app directory
  var config = {
    temp: './.tmp/',
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    client: client, 
    index: client + 'index.html',
    js : [
      clientApp + '**/*.module.js',
      clientApp + '**/*.js',
      '!' + clientApp + '**/*.spec.js'
    ],
    less: client + 'styles/styles.less',
    /**
      * Bower and NPM locations
    **/
    bower: {
      json: require('./bower.json'),
      directory: './bower_components/',
      ignorePath: '../..'
    }
  };
  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };
  return config;
};
```

#### Remove the scrips and styles from your main HTML

Go to your index.html and replace the bower.css files to this:

> <!-- bower:css -->
> <!-- endbower -->

Replace the bower.js files to this:

> <!-- bower:js -->
> <!-- endbower -->

Make the same with the custom files but you need to use gulp-inject instead of wiredep

> <!-- inject:js -->
> <!-- endinject -->

#### Adding bower files automatically on install

In your .bowerrc file add a `postinstall script` something like this:

```javascript
{
  "directory": "bower_components",
  "scripts": {
    "postinstall": "gulp wiredep" // this run every time you install a bower package
  }
}
```
#### Injecting the custom css

Create a new task called `inject`
```javascript
gulp.task('inject', ['wiredep', 'styles'], function() {
	log('Wire up the app css into the html, and call wiredep');
	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css)))
		.pipe(gulp.dest(config.client));
});
```
Modify the gulp.config.js file:

```javascript
module.exports = function() {
  var client = './src/client/';
  var clientApp = client + 'app/';
  var temp = './.tmp/'; // expose a temp folder in a variable to use in our config object
  var config = {
    temp: temp,
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    client: client,
    css: temp + 'styles.css', // add the css path to our gulp config
    index: client + 'index.html',
    js : [
      clientApp + '**/*.module.js',
      clientApp + '**/*.js',
      '!' + clientApp + '**/*.spec.js'
    ],
    less: client + 'styles/styles.less',
    /**
      * Bower and NPM locations
    **/
    bower: {
      json: require('./bower.json'),
      directory: './bower_components/',
      ignorePath: '../..'
    }
  };
  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };
  return config;
};
```
