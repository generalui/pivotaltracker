/*
    Source, Iteration resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#iteration_resource
*/

var ptutil = require('./utils'),
    util = require('util');

function IterationOverride(data) {
    
    if (!(this instanceof IterationOverride)){
        return new IterationOverride(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _number = null,
        _projectId = null,
        _length = null,
        _planned = null,
        _teamStrength = null;
    
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
        "number": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _number;
            },
            set: function(val) {
                _number = ptutil.intOrNull(val);
            }
        },
        "projectId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _projectId;
            },
            set: function(val) {
                _projectId = ptutil.intOrNull(val);
            }
        },
        "teamStrength": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _teamStrength;
            },
            set: function(val) {
                _teamStrength = ptutil.floatOrNull(val);
            }
        },
        "length": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _length;
            },
            set: function(val) {
                _length = ptutil.intOrNull(val);
            }
        },
        "planned": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _planned;
            },
            set: function(val) {
                _planned = ptutil.booleanOrNull(val);
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

IterationOverride.prototype.inspect = function() {
    return ptutil.inspect(this);
};

module.exports = {
    IterationOverride : IterationOverride
};
