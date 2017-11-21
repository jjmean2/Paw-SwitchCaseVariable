// Extensions are implemented as JavaScript classes
var CaseVariable = function () {

	this.title = function (context) {
		return "caseVariable";
	};

	this.text = function (context) {
		return this.name + "(" + this._calculateValue(context) + ")";
	};

	// implement the evaluate() method to generate the dynamic value
	this.evaluate = function (context) {
		var caseReturnValue = this._calculateValue(context); // generate some dynamic value

		return caseReturnValue;
	};

	this._calculateValue = function (context) {
		if (!this.testValue) return this.defaultValue;

		var selectedReturn = this.caseReturn.filter(e => this.testValue == e[0]).filter(e => e[2])[0];

		if (!selectedReturn) return this.defaultValue;

		return selectedReturn[1];
	}
};
// set the Extension Identifier (must be same as the directory name)
CaseVariable.identifier = "com.vovioskorea.PawExtensions.CaseVariable";

// give a display name to your Dynamic Value
CaseVariable.title = "Case Variable";

// link to the Dynamic Value documentation
// LocalVariable.help = "https://luckymarmot.com/paw/doc/";

// set input fields
CaseVariable.inputs = [
	InputField("name", "Name", "String"),
	InputField("testValue", "Test", "String"),
	InputField("caseReturn", "Case-Return", "KeyValueList", { "keyName": "Case", "valueName": "Return", "persist": true }),
	InputField("defaultValue", "Default", "String")
];

// call to register function is required
registerDynamicValueClass(CaseVariable);

