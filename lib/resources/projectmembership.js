/*
    Source, Project Membership resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#project_membership_resource
*/

var ptutil = require('./utils'),
    util = require('util');

function ProjectMembership(data) {
    
    if (!(this instanceof ProjectMembership)) {
        return new ProjectMembership(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _id = null,
        _projectId = null,
        _personId = null,
        _person = null,
        _createdAt = null,
        _role = null,
        _projectColor = null,
        _lastViewedAt = null,
        _wantsCommentNotificationEmails = null;
    
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
        "personId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _personId;
            },
            set: function(val) {
                _personId = ptutil.intOrNull(val);
            }
        },
        "person": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _person;
            },
            set: function(val) {
                if (ptutil.objOrNull(val)) {
                    var Person = require('./person').Person;
                    _person = new Person(val);
                }
            }
        },
        "createdAt": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _createdAt;
            },
            set: function(val) {
                _createdAt = ptutil.dateOrNull(val);
            }
        },
        "role": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _role;
            },
            set: function(val) {
                _role = ptutil.stringOrNull(val);
            }
        },
        "wantsCommentNotificationEmails": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _wantsCommentNotificationEmails;
            },
            set: function(val) {
                _wantsCommentNotificationEmails = ptutil.booleanOrNull(val);
            }
        },
        "projectColor": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _projectColor;
            },
            set: function(val) {
                _projectColor = ptutil.stringOrNull(val);
            }
        },
        "lastViewedAt": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _lastViewedAt;
            },
            set: function(val) {
                _lastViewedAt = ptutil.dateOrNull(val);
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

ProjectMembership.prototype.inspect = function() {
    return ptutil.inspect(this);
};

function Service(config, projectId, membershipId) {
    
    if (!(this instanceof Service)){
        return new Service(config, projectId, membershipId);
    }
    
    config = config || {};

    Object.defineProperties(this, {
        
        "config": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: config
        },
        "projectId": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: ptutil.intOrNull(projectId)
        },
        "membershipId": {
            enumerable: true,
            configurable: false,
            writable: true,
            value: ptutil.intOrNull(membershipId)
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
            this.config, // options
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
            this.config, // options
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
            this.config, // options
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
            this.config,
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
            this.config,
            function(error) {
                cb(error);
            });
    }
};

Service.prototype.pathSegments = function() {
    /*
    
    /projects/{project_id}/memberships[/{membership_id}]
    
    */
    var segs = ['projects',this.projectId,'memberships'];
    if (typeof this.membershipId === 'number') {
        segs.push(this.membershipId);
    }
    return segs;
};

Service.prototype.configError = function() {
    if (typeof this.projectId !== 'number') {
        return new Error('Invalid project ID');
    }
    else {
        return null;
    }
};

function _callbackWithMembership(error, res, cb) {

    var result = null;

    if (!error && res && res.data) {
        result = new ProjectMembership(res.data);
    }

    cb(error, result);
}

function _callbackWithMemberships(error, res, cb) {

    var arr = [];

    if (!error && res && Array.isArray(res.data) && res.data.length) {

        res.data.forEach(function(ele) {

            arr.push(new ProjectMembership(ele));
        });
    }

    cb(error, arr);
}

module.exports = {
    Service : Service,
    ProjectMembership : ProjectMembership
};
