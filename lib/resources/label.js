/*
    Source, Label resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#label_resource
*/

var ptutil = require('./utils'),
    util = require('util');

function Label(data) {
    
    if (!(this instanceof Label)){
        return new Label(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _id = null,
        _projectId = null,
        _name = null,
        _createdAt = null,
        _updatedAt = null;
    
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
        }
    });
    
    Object.seal(this);
    
    for (var key in data) {
        if (data.hasOwnProperty(key) && this.hasOwnProperty(key)) {
            this[key] = data[key];
        }
    }
}

Label.prototype.inspect = function() {
    return ptutil.inspect(this);
};

function Service(config, labelType, projectId, storyId, labelId) {
    
    if (!(this instanceof Service)){
        return new Service(config, labelType, projectId, storyId, labelId);
    }
    
    config = config || {};

    Object.defineProperties(this, {
        
        "config": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: config
        },
        "labelType": {
            enumerable: false,
            configurable: false,
            writable: false,
            value: labelType
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
        "labelId": {
            enumerable: true,
            configurable: false,
            writable: true,
            value: ptutil.intOrNull(labelId)
        }
    });
    
    Object.seal(this);
}

Service.prototype.inspect = function() {
    return ptutil.inspect(this);
};

Service.prototype.all = function(cb) { // cb(err, labels[])
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
                _callbackWithLabels(error, res, cb);
            });
    }
};

Service.prototype.get = function(cb) { // cb(err, label)
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
                _callbackWithLabel(error, res, cb);
            });
    }
};

Service.prototype.create = function(data, cb) { // cb(err, label)
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
                _callbackWithLabel(error, res, cb);
            });
    }
};

Service.prototype.update = function(data, cb) { // cb(err, label)
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
                _callbackWithLabel(error, res, cb);
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
    
    /projects/{project_id}/labels[/{label_id}]
    /projects/{project_id}/stories/{story_id}/labels[/{label_id}]
    
    */
    var segs = ['projects',this.projectId];
    if (this.labelType === 'story') {
        segs.push('stories',this.storyId);
    }
    segs.push('labels');
    if (typeof this.labelId === 'number') {
        segs.push(this.labelId);
    }
    return segs;
};

Service.prototype.configError = function() {
    if (typeof this.projectId !== 'number') {
        return new Error('Invalid project ID');
    }
    else if (this.labelType !== 'story' && this.labelType !== 'project') {
        return new Error('Invalid label type');
    }
    else if (this.labelType === 'story' && typeof this.storyId !== 'number') {
        return new Error('Invalid story ID');
    }
    else {
        return null;
    }
};

function _callbackWithLabel(error, res, cb) {
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
        cb(null, new Label(res.data));
    }
}

function _callbackWithLabels(error, res, cb) {
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
            arr.push(new Label(ele));
        });
        cb(null, arr);
    }
}

module.exports = {
    Service : Service,
    Label : Label
};
