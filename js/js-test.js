/**
 * Javascript Constructor
 * @author Shi Bai
 */
var Person = function(name, age, gender) {
	"use strict"; // under strict mode, 'this' is default -undefined- instead of -global object-
	/** 
	 * Private ----------------------------------------
	 */
	var PersonException = function(message) {
		// 'this' is PersonException
		this.message = message;
		this.name = 'PersonException';
	}
	var ValidAge = function(age) {
		return typeof age === 'number' && 0 < age && age < 100;
	}
	var ValidGender = function(gender) {
		return typeof gender === 'string' && /^(?:male|female|m|f)$/i.test(gender);
	}

	/** 
	 * Public -----------------------------------------
	 */
	/* Public Attributes (run only on initializing constructor) */
	// warning: public attributes should be avoid, use public setter and getter instead.
	// note: there's no validation later for public attribute, once they are initialized.
	this.name = name || 'Mr. Nobody'; 		
	this.age = ValidAge(age) ? age : 0;
	this.gender = gender || 'Male';

	/* Public Methods */
	this.getName = function() {
		// 'this' is Person
		return this.name;
	}

	this.getAge = function() {
		if (!ValidAge(this.age))
			throw new PersonException('Age is not valid');
		else
			return this.age;
	}

	this.getGender = function() {
		if (!ValidGender(this.gender))
			throw new PersonException('Gender is not correct');
		else
			return this.gender;
	}

	// note: if no return statemnet, (return undefined;) by default
};

/**
 * Note on use of RegExp
 */
/*---------------------------------

6 JS methods use RegExp:
	1. RegExp.exec(string)
	2. RegExp.test(string)
	3. String.match(regexp)
	4. String.find(regexp)
	5. String.replace(regexp, string)
	6. String.split(regexp)

Relation between OR|, Capture(), Non-Capture(?:), Follow(?=) and Not-Follow(?!)
	/a|bc/				-->		a or bc
	/(a|b)c/			-->		ac or bc (remembered -> exec().length === 2)
	/(?:a|b)c/			-->		ac or bc (not remembered -> exec().length === 1)
	/(?:a|b)(?=c)/		-->		a or b (but ac or bc must be present in string)
	/(?:a|b)(?!c)/		-->		a or b (but bc or ac must be present in string)

OR| serve automatically as expression seperator	=> package sampling
	/^c|a|t[ch]$/		==>		match 3 expression conditions
						-->		1. 'c' for catch; 
						-->		2. 'a' for batch; 
						-->		3. null for bitch; 'th' for bith; 'tc' for bitc

Capture() or Non-Capture(?:) is a must, which serves as grouping => package wrapping
	/a|bc/			VS		/(a|b)c/
	/^a|b|c$/		VS*		/^(a|b|c)$/		==>		/^[abc]$/ is better
	/^aa|bb|cc$/	VS		/^(aa|bb|cc)$/
	/ab*c/			VS		/(ab)*c/

----------------------------------*/