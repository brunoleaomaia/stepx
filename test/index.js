var should = require('should'),
	stepx = new require('../')(),
	name = '';

require('mocha');

describe('stepx', function() {
    describe('Adding Steps and Running', function() {
        it('Name should be Bruno Maia.', function(done) {
        	
        	stepx.add(function(){
        		name += 'Bruno';
        		stepx.next();
        	}).add(function(){
        		name += ' ';
        		stepx.next();
        	}).add(function(){
        		name += 'Maia';
        		stepx.next();
        	}).add(function(){
        		name.should.equal('Bruno Maia');
        		done();	
        	});

        	stepx.start();
        });
    });
});