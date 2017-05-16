// Extensions are implemented as JavaScript classes
var SwitchCaseDynamicValue = function () {

    this.title = function (context) {
        return "SwitchCase";
    };

    this.text = function (context) {
        switch (this.display) {
            case "both":
                return this.name + "(" + this._calculateValue(context) + ")";
            case "name":
                return this.name || null;
            case "value":
            default:
                return this._calculateValue(context) || null;
        }
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
SwitchCaseDynamicValue.identifier = "kr.co.jjmean2.PawExtensions.SwitchCaseDynamicValue";

// give a display name to your Dynamic Value
SwitchCaseDynamicValue.title = "Switch Case Dynamic Value";

// set input fields
SwitchCaseDynamicValue.inputs = [
    InputField("name", "Name", "String"),
    InputField("testValue", "Switch-Test", "String"),
    InputField("caseReturn", "Case-Return", "KeyValueList", {
        "keyName": "Case",
        "valueName": "Return",
        "persist": true
    }),
    InputField("defaultValue", "Default-Return", "String"),
    InputField("display", "Display", "Radio", {
        "choices": {
            "both": "Name+Value",
            "name": "Name",
            "value": "Value"
        },
        defaultValue: "both"
    })
];

// call to register function is required
registerDynamicValueClass(SwitchCaseDynamicValue);