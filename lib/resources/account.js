/*
    Source, Account resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#account
*/

var membership = require('./accountmembership'),
    ptutil = require('./utils'),
    util = require('util');

function Account(data) {
    
    if (!(this instanceof Account)){
        return new Account(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _id = null,
        _name = null,
        _plan = null,
        _overTheLimit = null,
        _createdAt = null,
        _updatedAt = null,
        _projectIds = null,
        _projects = null;
    
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
        "name": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _name;
            },
            set: function(val) {
                _name = ptutil.stringOrNull(val);
            }
        },
        "plan": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _plan;
            },
            set: function(val) {
                _plan = ptutil.stringOrNull(val);
            }
        },
        "overTheLimit": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _overTheLimit;
            },
            set: function(val) {
                _overTheLimit = ptutil.booleanOrNull(val);
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
        "projectIds": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _projectIds;
            },
            set: function(val) {
                _projectIds = ptutil.arrayOrNull(val);
            }
        },
        "projects": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _projects;
            },
            set: function(val) {
                _projects = ptutil.arrayOrNull(val);
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

Account.prototype.inspect = function() {
    var str = '\n';
        str += 'kind: '+this.kind+'\n';
        str += 'id: '+this.id+'\n';
        str += 'plan: '+this.plan+'\n';
        str += 'overTheLimit: '+this.overTheLimit+'\n';
        str += 'createdAt: '+this.createdAt+'\n';
        str += 'updatedAt: '+this.updatedAt+'\n';
        str += 'projects: '+util.inspect(this.projects)+'\n';
    return str;
};

function Service(config, accountId) {
    
    if (!(this instanceof Service)){
        return new Service(config, accountId);
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
            writable: true,
            value: ptutil.intOrNull(accountId)
        },
        "memberships": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new membership.Service(config, accountId);
            }
        }
    });
    
    Object.seal(this);
}

Service.prototype.membership = function(membershipId) {
    return new membership.Service(this.config, this.accountId, membershipId);
};

Service.prototype.toString = function() {
    var str = 'token: '+this.config.trackerToken+'\n';
        str += 'accountId: '+this.accountId+'\n';
    return str;
};

Service.prototype.all = function(cb) { // cb(err, accounts[])
    if (!this.accountId) {
        cb(new Error('Invalid account ID'), null);
    }
    else {
        ptutil.api.get(
            this.config.trackerToken,
            this.pathSegments(),
            null,
            null,
            function(error, res) {
                _callbackWithAccounts(error, res, cb);
            });
    }
};

Service.prototype.get = function(cb) { // cb(err, account)
    if (!this.accountId) {
        cb(new Error('Invalid account ID'), null);
    }
    else {
        ptutil.api.get(
            this.config.trackerToken,
            this.pathSegments(),
            null,
            null,
            function(error, res) {
                _callbackWithAccount(error, res, cb);
            });
    }
};

Service.prototype.pathSegments = function() {
    /*
    
    /accounts[/{account_id}]
    
    */
    if (typeof this.accountId === 'number') {
        return ['accounts',this.accountId];
    }
    else {
        return ['accounts'];
    }
};

function _callbackWithAccount(error, res, cb) {
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
        cb(null, new Account(res.data));
    }
}

function _callbackWithAccounts(error, res, cb) {
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
            arr.push(new Account(ele));
        });
        cb(null, arr);
    }
}

module.exports = {
    Service : Service,
    Account : Account
};
