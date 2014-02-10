/*
    Source, Account Membership resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#account_membership_resource
*/

var ptutil = require('./utils'),
    util = require('util');

function AccountMembership(data) {
    
    if (!(this instanceof AccountMembership)){
        return new AccountMembership(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _id = null,
        _accountId = null,
        _personId = null,
        _person = null,
        _createdAt = null,
        _updatedAt = null,
        _owner = null,
        _admin = null,
        _projectCreator = null,
        _timeEnterer = null,
        _timekeeper = null;
    
    Object.defineProperties(this, {
        
        "kind": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _kind;
            },
            set: function(val) {
                _kind = ptutil.stringOrNull(val);
            }
        },
        "id": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _id;
            },
            set: function(val) {
                _id = ptutil.intOrNull(val);
            }
        },
        "accountId": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _accountId;
            },
            set: function(val) {
                _accountId = ptutil.intOrNull(val);
            }
        },
        "personId": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _personId;
            },
            set: function(val) {
                _personId = ptutil.intOrNull(val);
            }
        },
        "person": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _person;
            },
            set: function(val) {
                _person = ptutil.objOrNull(val);
            }
        },
        "createdAt": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _createdAt;
            },
            set: function(val) {
                _createdAt = ptutil.dateOrNull(val);
            }
        },
        "updatedAt": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _updatedAt;
            },
            set: function(val) {
                _updatedAt = ptutil.dateOrNull(val);
            }
        },
        "owner": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _owner;
            },
            set: function(val) {
                _owner = ptutil.booleanOrNull(val);
            }
        },
        "admin": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _admin;
            },
            set: function(val) {
                _admin = ptutil.booleanOrNull(val);
            }
        },
        "projectCreator": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _projectCreator;
            },
            set: function(val) {
                _projectCreator = ptutil.booleanOrNull(val);
            }
        },
        "timeEnterer": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _timeEnterer;
            },
            set: function(val) {
                _timeEnterer = ptutil.booleanOrNull(val);
            }
        },
        "timekeeper": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _timekeeper;
            },
            set: function(val) {
                _timekeeper = ptutil.booleanOrNull(val);
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

AccountMembership.prototype.inspect = function() {
    return ptutil.inspect(this);
};

function Service(config, accountId, personId) {
    
    if (!(this instanceof Service)){
        return new Service(config, accountId, personId);
    }
    
    config = config || {};

    Object.defineProperties(this, {
        
        "config": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: config
        },
        "accountId": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: ptutil.intOrNull(accountId)
        },
        "personId": {
            enumerable: true,
            configurable: false,
            writable: true,
            value: ptutil.intOrNull(personId)
        }
    });
    
    Object.seal(this);
}

Service.prototype.inspect = function() {
    return ptutil.inspect(this);
};

Service.prototype.all = function(cb) { // cb(err, memberships[])
    var configErr = this.configError();
    if (configErr) {
        cb(configErr, null);
    }
    else {
       ptutil.api.get(
        this.config.trackerToken,
        this.pathSegments(),
        null, // query
        null, // options
            function(error, res) {
                _callbackWithMemberships(error, res, cb);
            });
    }
};

Service.prototype.get = function(cb) { // cb(err, membership)
    var configErr = this.configError();
    if (configErr) {
        cb(configErr, null);
    }
    else {
        ptutil.api.get(
            this.config.trackerToken,
            this.pathSegments(),
            null, // query
            null, // options
            function(error, res) {
                _callbackWithMembership(error, res, cb);
            });
    }
};

Service.prototype.create = function(data, cb) { // cb(err, membership)
    var configErr = this.configError();
    if (configErr) {
        cb(configErr, null);
    }
    else {
        ptutil.api.post(
            this.config.trackerToken,
            this.pathSegments(),
            null, // query
            data,
            null, // options
            function(error, res) {
                _callbackWithMembership(error, res, cb);
            });
    }
};

Service.prototype.update = function(data, cb) { // cb(err, membership)
    var configErr = this.configError();
    if (configErr) {
        cb(configErr, null);
    }
    else {
        ptutil.api.put(
            this.config.trackerToken,
            this.pathSegments(), 
            null, 
            data,
            null,
            function(error, res) {
                _callbackWithMembership(error, res, cb);
            });
    }
};

Service.prototype.delete = function(cb) { // cb(err)
    var configErr = this.configError();
    if (configErr) {
        cb(configErr, null);
    }
    else {
        ptutil.api.delete(
            this.config.trackerToken,
            this.pathSegments(),
            null,
            null,
            function(error) {
                cb(error);
            });
    }
};

Service.prototype.pathSegments = function() {
    /*
    
    /accounts/{account_id}/memberships[/{person_id}]
    
    */
    var segs = ['accounts',this.accountId,'memberships'];
    if (typeof this.personId === 'number') {
        segs.push(this.personId);
    }
    return segs;
};

Service.prototype.configError = function() {
    if (typeof this.accountId !== 'number') {
        return new Error('Invalid account ID');
    }
    else {
        return null;
    }
};

function _callbackWithMembership(error, res, cb) {
    if (error) {
        cb(error, null);
    }
    else if (!res || !res.data) {
        cb(error, null);
    }
    else if (!res.data) {
        cb(null, null);
    }
    else {
        cb(null, new AccountMembership(res.data));
    }
}

function _callbackWithMemberships(error, res, cb) {
    if (error) {
        cb(error, null);
    }
    else if (!res || !res.data) {
        cb(error, null);
    }
    else if (!Array.isArray(res.data) || !res.data.length) {
        cb(null, []);
    }
    else {
        var arr = [];
        res.data.forEach(function(ele) {
            arr.push(new AccountMembership(ele));
        });
        cb(null, arr);
    }
}

module.exports = {
    Service : Service,
    AccountMembership : AccountMembership
};
