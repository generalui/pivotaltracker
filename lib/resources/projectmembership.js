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
        "projectId": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _projectId;
            },
            set: function(val) {
                _projectId = ptutil.intOrNull(val);
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
        "role": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _role;
            },
            set: function(val) {
                _role = ptutil.stringOrNull(val);
            }
        },
        "wantsCommentNotificationEmails": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _wantsCommentNotificationEmails;
            },
            set: function(val) {
                _wantsCommentNotificationEmails = ptutil.booleanOrNull(val);
            }
        },
        "projectColor": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _projectColor;
            },
            set: function(val) {
                _projectColor = ptutil.stringOrNull(val);
            }
        },
        "lastViewedAt": {
            enumerable: true,
            configurable: false,
            get: function(val) {
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
    var str = '\n';
        str += 'kind: '+this.kind+'\n';
        str += 'id: '+this.id+'\n';
        str += 'projectId: '+this.projectId+'\n';
        str += 'personId: '+this.personId+'\n';
        str += 'person: '+util.inspect(this.person)+'\n';
        str += 'createdAt: '+this.createdAt+'\n';
        str += 'role: '+this.role+'\n';
        str += 'projectColor: '+this.projectColor+'\n';
        str += 'lastViewedAt: '+this.lastViewedAt+'\n';
        str += 'wantsCommentNotificationEmails: '+this.wantsCommentNotificationEmails+'\n';
    return str;
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
        cb(null, new ProjectMembership(res.data));
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
            arr.push(new ProjectMembership(ele));
        });
        cb(null, arr);
    }
}

module.exports = {
    Service : Service,
    ProjectMembership : ProjectMembership
};
