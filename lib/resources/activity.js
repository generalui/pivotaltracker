/*
    Source, Activity resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#activity_resource
*/

var ptutil = require('./utils');

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
            get: function(val) {
                return _kind;
            },
            set: function(val) {
                _kind = ptutil.stringOrNull(val);
            }
        },
        "guid": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _guid;
            },
            set: function(val) {
                _guid = ptutil.stringOrNull(val);
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
        "project": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _project;
            },
            set: function(val) {
                _project = ptutil.objOrNull(val);
            }
        },
        "projectVersion": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _projectVersion;
            },
            set: function(val) {
                _projectVersion = ptutil.intOrNull(val);
            }
        },
        "message": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _message;
            },
            set: function(val) {
                _message = ptutil.stringOrNull(val);
            }
        },
        "highlight": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _highlight;
            },
            set: function(val) {
                _highlight = ptutil.stringOrNull(val);
            }
        },
        "occurredAt": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _occurredAt;
            },
            set: function(val) {
                _occurredAt = ptutil.dateOrNull(val);
            }
        },
        "performedById": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _performedById;
            },
            set: function(val) {
                _performedById = ptutil.intOrNull(val);
            }
        },
        "performedBy": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _performedBy;
            },
            set: function(val) {
                _performedBy = ptutil.objOrNull(val);
            }
        },
        "primaryResources": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _primaryResources;
            },
            set: function(val) {
                _primaryResources = ptutil.arrayOrNull(val);
            }
        },
        "changes": {
            enumerable: true,
            configurable: false,
            get: function(val) {
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

Activity.prototype.toString = function() {
    return '[Object Activity (ID: '+(this.id || 'None')+')]';
};

function Service(config, projectId, parentId) {
    
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
            null, // options
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
    
        return new Error('Invalid comment type');
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
            arr.push(new Activity(ele));
        });
        cb(null, arr);
    }
}

module.exports = {
    Service : Service,
    Activity : Activity
};
