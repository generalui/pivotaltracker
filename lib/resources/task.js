/*
    Source, Task resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#task_resource
*/

var ptutil = require('./utils'),
    util = require('util');

function Task(data) {
    
    if (!(this instanceof Task)){
        return new Task(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _id = null,
        _storyId = null,
        _complete = null,
        _position = null,
        _createdAt = null,
        _updatedAt = null,
        _description = null;
    
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
        "storyId": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _storyId;
            },
            set: function(val) {
                _storyId = ptutil.intOrNull(val);
            }
        },
        "complete": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _complete;
            },
            set: function(val) {
                _complete = ptutil.booleanOrNull(val);
            }
        },
        "position": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _position;
            },
            set: function(val) {
                _position = ptutil.intOrNull(val);
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
        "description": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _description;
            },
            set: function(val) {
                _description = ptutil.stringOrNull(val);
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
        
Task.prototype.inspect = function() {
    return ptutil.inspect(this);
};

function Service(config, projectId, storyId, taskId) {
    
    if (!(this instanceof Service)){
        return new Service(config, projectId, storyId, taskId);
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
        "storyId": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: ptutil.intOrNull(storyId)
        },
        "taskId": {
            enumerable: true,
            configurable: false,
            writable: true,
            value: ptutil.intOrNull(taskId)
        }
    });
    
    Object.seal(this);
}

Service.prototype.inspect = function() {
    return ptutil.inspect(this);
};

Service.prototype.all = function(cb) { // cb(err, tasks[])
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
                _callbackWithTasks(error, res, cb);
            });
    }
};

Service.prototype.get = function(cb) { // cb(err, task)
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
                _callbackWithTask(error, res, cb);
            });
    }
};

Service.prototype.create = function(data, cb) { // cb(err, task)
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
                _callbackWithTask(error, res, cb);
            });
    }
};

Service.prototype.update = function(data, cb) { // cb(err, task)
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
                _callbackWithTask(error, res, cb);
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
    
    /projects/{project_id}/story/{story_id}/tasks[/{task_id}]
    
    */
    var segs = ['projects',this.projectId,'stories',this.storyId,'tasks'];
    if (typeof this.taskId === 'number') {
        segs.push(this.taskId);
    }
    return segs;
};

Service.prototype.configError = function() {
    if (typeof this.projectId !== 'number') {
        return new Error('Invalid project ID');
    }
    else if (typeof this.storyId !== 'number') {
        return new Error('Invalid story ID');
    }
    else {
        return null;
    }
};

function _callbackWithTask(error, res, cb) {
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
        cb(null, new Task(res.data));
    }
}

function _callbackWithTasks(error, res, cb) {
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
            arr.push(new Task(ele));
        });
        cb(null, arr);
    }
}

module.exports = {
    Service : Service,
    Task : Task
};
