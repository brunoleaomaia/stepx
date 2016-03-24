var fs = require('fs'),
	path = require('path'),
	Stepx = require('./index'),
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