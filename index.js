var Stepx = function(options) {
	var stepx = this;
	options = options || {};
	stepx.onStart = options.onStart || function(){};
	stepx.onFinish = options.onFinish || function(){};
	stepx.index = -1;
	stepx.steps = [];
	stepx.getById = function(id) {
		for (var i = 0; i < stepx.steps.length; i++) {
			if (stepx.steps[i].id == id) {
				return stepx.steps[i];
			}
		}
		return false;
	};
	stepx.getAt = function(index) {
		if (index < stepx.steps.length) {
			return stepx.steps[index];
		}
		return false;
	};
	stepx.add = function(fn, id) {
		var step;
		if (id && (step = stepx.getById(id))) {
			step.fn = fn;
		} else {
			step = {
				id: id || 'step_'+stepx.steps.length,
				index: stepx.steps.length,
				fn: fn,
				run: function() {
					stepx.index = this.index;
					if (typeof this.fn === 'function') {
						this.fn.apply(this, arguments);
					}
				}
			};
			stepx.steps.push(step);
		}
		return this;
	};
	stepx.goto = function(index) {
		if (typeof index == 'string') {
			return stepx.gotoId(index);
		}
		var step;
		if (step = stepx.getAt(index)) {
			step.run();
		}
		return this;
	};
	stepx.gotoId = function(id) {
		var step;
		if (step = stepx.getById(id)) {
			step.run();
		}
		return this;	
	};
	stepx.next = function() {
		if (stepx.index < stepx.steps.length-1){
			var step = stepx.getAt(stepx.index+1);
			step.run.apply(step, arguments);
		} else {
			stepx.finish.apply(stepx, arguments);
		}
		return this;
	};
	stepx.finish = function() {
		if (typeof stepx.onFinish === 'function') {
			stepx.onFinish.apply(stepx, arguments);
		}
		return;
	};
	stepx.start = function() {
		if (typeof stepx.onStart === 'function') {
			stepx.onStart.apply(stepx, arguments);
		}
		stepx.index = -1;
		stepx.next.apply(stepx, arguments);
	};
	return stepx;
};

module.exports = Stepx;