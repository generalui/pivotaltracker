/*
 Source, Person resource structure:
 https://www.pivotaltracker.com/help/api/rest/v5#person_resource
 */

var ptutil = require('./utils'),
    util = require('util');

function Person(data) {

    if (!(this instanceof Person)){
        return new Person(data);
    }

    data = data || {};

    var _kind = null,
        _id = null,
        _username = null,
        _name = null,
        _initials = null,
        _email = null;

    Object.defineProperties(this, {

        "kind": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _kind;
            },
            set: function(val) {
                _kind = ptutil.stringOrNull(val);
            }
        },
        "id": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _id;
            },
            set: function(val) {
                _id = ptutil.intOrNull(val);
            }
        },
        "username": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _username;
            },
            set: function(val) {
                _username = ptutil.stringOrNull(val);
            }
        },
        "name": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _name;
            },
            set: function(val) {
                _name = ptutil.stringOrNull(val);
            }
        },
        "initials": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _initials;
            },
            set: function(val) {
                _initials = ptutil.stringOrNull(val);
            }
        },
        "email": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _email;
            },
            set: function(val) {
                _email = ptutil.stringOrNull(val);
            }
        }
    });

    Object.seal(this);

    for (var key in data) {
        if (data.hasOwnProperty(key) && this.hasOwnProperty(key)) {
            this[key] = data[key];
        }
    }
}

Person.prototype.inspect = function() {
    return ptutil.inspect(this);
};

module.exports = {
    Person : Person
};
