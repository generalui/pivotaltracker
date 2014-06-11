/*
    Source, Activity resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#activity_resource
*/

var ptutil = require('./utils'),
    util = require('util');

function Activity(data) {
    
    if (!(this instanceof Activity)){
        return new Activity(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _guid = null,
        _projectId = null,
        _project = null,
        _projectVersion = null,
        _message = null,
        _highlight = null,
        _occurredAt = null,
        _performedById = null,
        _performedBy = null,
        _primaryResources = null,
        _changes = null;
    
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
        "guid": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _guid;
            },
            set: function(val) {
                _guid = ptutil.stringOrNull(val);
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
        "project": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _project;
            },
            set: function(val) {
                if (ptutil.objOrNull(val)) {
                    var Project = require('./project').Project;
                    _project = new Project(val);
                }
            }
        },
        "projectVersion": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _projectVersion;
            },
            set: function(val) {
                _projectVersion = ptutil.intOrNull(val);
            }
        },
        "message": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _message;
            },
            set: function(val) {
                _message = ptutil.stringOrNull(val);
            }
        },
        "highlight": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _highlight;
            },
            set: function(val) {
                _highlight = ptutil.stringOrNull(val);
            }
        },
        "occurredAt": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _occurredAt;
            },
            set: function(val) {
                _occurredAt = ptutil.dateOrNull(val);
            }
        },
        "performedById": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _performedById;
            },
            set: function(val) {
                _performedById = ptutil.intOrNull(val);
            }
        },
        "performedBy": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _performedBy;
            },
            set: function(val) {
                if (ptutil.objOrNull(val)) {
                    var Person = require('./person').Person;
                    _performedBy = new Person(val);
                }
            }
        },
        "primaryResources": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _primaryResources;
            },
            set: function(val) {
                _primaryResources = ptutil.arrayOrNull(val);
            }
        },
        "changes": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _changes;
            },
            set: function(val) {
                _changes = ptutil.arrayOrNull(val);
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

Activity.prototype.inspect = function() {
    return ptutil.inspect(this);
};

function Service(config, activityType, projectId, parentId) {
    
    if (!(this instanceof Service)){
        return new Service(config, projectId, parentId);
    }
    
    config = config || {};

    Object.defineProperties(this, {
        
        "config": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: config
        },
        "activityType": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: activityType
        },
        "projectId": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: ptutil.intOrNull(projectId)
        },
        "parentId": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: ptutil.intOrNull(parentId)
        }
    });
    
    Object.seal(this);
}

Service.prototype.inspect = function() {
    return ptutil.inspect(this);
};

Service.prototype.all = function(cb) { // cb(err, activity[])
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
                _callbackWithActivity(error, res, cb);
            });
    }
};

Service.prototype.configError = function() {

    if (typeof this.projectId !== 'number') {
        return new Error('Invalid project ID');
    }
    else if (this.activityType !== 'project' && 
    this.activityType !== 'story' && 
    this.activityType !== 'epic') {
    
        return new Error('Invalid activity type');
    }
    else if (this.activityType === 'story' && 
    typeof this.parentId !== 'number') {
    
        return new Error('Invalid story ID');
    }
    else if (this.activityType === 'epic' && 
    typeof this.parentId !== 'number') {
    
        return new Error('Invalid epic ID');
    }
    else {
        return null;
    }
};

Service.prototype.pathSegments = function() {
    /*
    
    /projects/{project_id}/activity
    /projects/{project_id}/epics/{epic_id}/activity
    /projects/{project_id}/stories/{story_id}/activity
    
    */
    var segs = ['projects',this.projectId];
    if (this.activityType === 'epic') {
        segs.push('epics',this.parentId);
    }
    else if (this.activityType === 'story') {
        segs.push('stories',this.parentId);
    }
    segs.push('activity');
    return segs;
};

function _callbackWithActivity(error, res, cb) {

    var arr = [];

    if (!error && res && Array.isArray(res.data) && res.data.length) {

        res.data.forEach(function(ele) {

            arr.push(new Activity(ele));
        });
    }

    cb(error, arr);
}

module.exports = {
    Service : Service,
    Activity : Activity
};
