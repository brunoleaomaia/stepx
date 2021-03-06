# Stepx
Steps manager for JavaScript.

## Example

```javascript
var fs = require('fs'),
	path = require('path'),
	Stepx = require('stepx'),
	content = '';

//Create a Steps Manager
var stepx = new Stepx({
	onStart: function() {
		console.log('Stepx was started.');
	},
	onFinish: function() {
		console.log('Congratulations!');
	}
});

//Add Named Step (id: read_file)
stepx.add(function(){
	fs.readFile(path.join(__dirname, 'package.json'), 'utf8', function(err, data){
		if (err) {
			throw err;
		}
		content = data;
		stepx.next();
	});
}, 'read_file');

//Add Named Step (id: second_step)
stepx.add(function(){
	//this step is only for ilustrate and program will skip next step calling a named step.
	stepx.goto('print_content');
}, 'second_step');

//Add Named Step (id: never_will)
stepx.add(function(){
	console.log('This text will not be printed.');
	stepx.next();
}, 'never_will');

//Add Named Step (id: print_content)
stepx.add(function(){
	console.log(content);
	stepx.next();
}, 'print_content');

//Starts the Steps Execution
stepx.start();
```

## Methods

- `add(fn [, id])`
	- Add a function to the Manager;
- `next()`
	- Run the next step;
- `goto(index)`
	- Go to the step at the index (number/id) and run;
- `start()`
	- Starts the execution of the steps;
	- Fire `onStart` event;
- `finish()`
	- Ends the execution of the steps;
	- Fire `onFinish` event;
	- The method `next()` on last step fires onFinish event too;
