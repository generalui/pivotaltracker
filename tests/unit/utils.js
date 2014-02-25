var nodeunit = require('nodeunit');

function ConstructorTest(name, data) {
    
    Object.defineProperties(this, {
    
        "testConstructorPropertyType": {
            enumerable: true,
            value: function(test) {
                test.expect(1);
                test.ok((typeof data.fn === 'function'), 'Typeof ' + name + ' should be "function"');
                test.done();
            }
        },

        "testNewInstanceCreationForceNew": {
            enumerable: true,
            value: function(test) {
                test.expect(1 + _testCountForInitializationData(data.args));
                
                var args = data.args;
                var obj1 = data.fn.apply(null, args);

                test.ok((obj1 instanceof data.fn), name + '() should return an object that is an instance of ' + name + ' (force new).');
                                
                for (var i = 0, len = args.length; i < len; i++) {

                    if (typeof args[i] === 'object' && args[i] !== null) {

                        for (var key in args[i]) {

                            if (args[i].hasOwnProperty(key)) {

                                console.log('testNewInstanceCreationForceNew - ' + name + ' - ' + key);
                                var msg = 'Obj init failed; new obj ' + key + ' value ' + obj1[key] + ' != to expected init value ' + args[i][key];
                                test.deepEqual(obj1[key], args[i][key], msg);
                            }
                        }
                    }
                }

                test.done();
            }
        }
    });
}

// Currently only supports dynamic testing of object constructor 
// initialization arguments in the form of objects; will
// iterate through keys and check that values match
// those of the corresponding property for the newly
// created object
function _testCountForInitializationData(args) {

    var count = 0;
    if (Array.isArray(args) && args.length) {

        var argCount = args.length;
        var argPropertyCount;

        for (var i = 0; i < argCount; i++) {

            if (typeof args[i] === 'object' && args[i] !== null) {

                for (var key in args[i]) {

                    if (args[i].hasOwnProperty(key)) {

                        count++;
                    }
                }
            }
        }
    }
    return count;
}

function standardPropertyTestFunction(constructor, propertyName, happyTestValue) {

     return function(test) {
         
        test.expect(4);
        var newObj = new constructor();
        
        /* Happy path test, set to non-null value */
        newObj[propertyName] = happyTestValue;
        test.ok(newObj[propertyName] === happyTestValue, propertyName + ' should be equal to value passed into '+
            'setter if a string or null value. Current value: ' + newObj[propertyName]);
        
        /* Happy path test, set to null */
        newObj[propertyName] = null;
        test.ok(newObj[propertyName] === null, propertyName + ' should be able to be set to '+
            'null. Current value: ' + newObj[propertyName]);
        
        /* Negative test, assign a function value to non-function property */
        var functionVal = function(){};
        newObj[propertyName] = functionVal;
        test.ok(typeof newObj[propertyName] !== 'function', propertyName + ' should not be '+
            'able to be set to a function. Current value: ' + newObj[propertyName]);
        
        /* Negative test, assign undefined */
        delete(newObj[propertyName]);
        test.ok(typeof newObj[propertyName] !== 'undefined', 'it should not be possible to delete the property ' + propertyName);
        
        test.done();
    };
};

function standardDatePropertyTestFunction(constructor, propertyName, happyTestValue) {

     return function(test) {

        test.expect(4);
        var newObj = new constructor();
        var date = new Date(happyTestValue);
        
        /* Happy path test, set to non-null value */
        newObj[propertyName] = date;
        test.ok(date && newObj[propertyName] && date.getTime() === newObj[propertyName].getTime(), propertyName + '.getTime() should '+
            'be equal to testValue.getTime() passed into setter if not null. Current value: ' + newObj[propertyName]);
        
        /* Happy path test, set to null */
        newObj[propertyName] = null;
        test.ok(newObj[propertyName] === null, propertyName + ' should be able to be set '+
            'to null. Current value: ' + newObj[propertyName]);
        
        /* Negative test, assign a function value to non-function property */
        var functionVal = function(){};
        newObj[propertyName] = functionVal;
        test.ok(typeof newObj[propertyName] !== 'function', propertyName + ' should not be able '+
            'to be set to a function. Current value: ' + newObj[propertyName]);
        
        /* Negative test, delete property */
        delete(newObj[propertyName]);
        test.ok(typeof newObj[propertyName] !== 'undefined', 'it should not be possible to delete the property ' + propertyName);
        
        test.done();
    };
};

exports.ConstructorTest = ConstructorTest;
exports.standardPropertyTestFunction = standardPropertyTestFunction;
exports.standardDatePropertyTestFunction = standardDatePropertyTestFunction;
