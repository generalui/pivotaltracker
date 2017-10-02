/*
    Source, Story resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#story_resource
*/
var merge = require('lodash.merge'),
    activity = require('./activity'),
    comment = require('./comment'),
    label = require('./label'),
    task = require('./task'),
    integration = require('./integration'),
    person = require('./person'),
    ptutil = require('./utils'),
    util = require('util');

function Story(data) {
    
    if (!(this instanceof Story)){
        return new Story(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _id = null,
        _externalId = null,
        _projectId = null,
        _name = null,
        _description = null,
        _url = null,
        _createdAt = null,
        _updatedAt = null,
        _storyType = null,
        _currentState = null,
        _deadline = null,
        _estimate = null,
        _acceptedAt = null,
        _plannedIterationNumber = null,
        _integrationId = null,
        _integration = null,
        _requestedById = null,
        _requestedBy = null,
        _ownedById = null,
        _ownedBy = null,
        _labelIds = null,
        _labels = null,
        _commentIds = null,
        _comments = null,
        _ownerIds = null,
        _taskIds = null,
        _tasks = null;
    
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
        "externalId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _externalId;
            },
            set: function(val) {
                _externalId = ptutil.intOrNull(val);
            }
        },
        "url": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _url;
            },
            set: function(val) {
                _url = ptutil.stringOrNull(val);
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
        "updatedAt": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _updatedAt;
            },
            set: function(val) {
                _updatedAt = ptutil.dateOrNull(val);
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
        "storyType": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _storyType;
            },
            set: function(val) {
                _storyType = ptutil.stringOrNull(val);
            }
        },
        "description": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _description;
            },
            set: function(val) {
                _description = ptutil.stringOrNull(val);
            }
        },
        "currentState": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _currentState;
            },
            set: function(val) {
                _currentState = ptutil.stringOrNull(val);
            }
        },
        "deadline": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _deadline;
            },
            set: function(val) {
                _deadline = ptutil.dateOrNull(val);
            }
        },
        "estimate": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _estimate;
            },
            set: function(val) {
                _estimate = ptutil.floatOrNull(val);
            }
        },
        "acceptedAt": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _acceptedAt;
            },
            set: function(val) {
                _acceptedAt = ptutil.dateOrNull(val);
            }
        },
        "plannedIterationNumber": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _plannedIterationNumber;
            },
            set: function(val) {
                _plannedIterationNumber = ptutil.intOrNull(val);
            }
        },
        "integrationId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _integrationId;
            },
            set: function(val) {
                _integrationId = ptutil.intOrNull(val);
            }
        },
        "integration": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _integration;
            },
            set: function(val) {
                if (ptutil.objOrNull(val)) {
                    _integration = new integration.Integration(val);
                }
            }
        },
        "requestedById": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _requestedById;
            },
            set: function(val) {
                _requestedById = ptutil.intOrNull(val);
            }
        },
        "requestedBy": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _requestedBy;
            },
            set: function(val) {
                if (ptutil.objOrNull(val)) {
                    _requestedBy = new person.Person(val);
                }
            }
        },
        "ownedById": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _ownedById;
            },
            set: function(val) {
                _ownedById = ptutil.intOrNull(val);
            }
        },
        "ownedBy": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _ownedBy;
            },
            set: function(val) {
                if (ptutil.objOrNull(val)) {
                    _ownedBy = new person.Person(val);
                }
            }
        },
        "labelIds": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _labelIds;
            },
            set: function(val) {
                _labelIds = ptutil.arrayOrNull(val);
            }
        },
        "labels": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _labels;
            },
            set: function(val) {
                if (Array.isArray(val)) {
                    _labels = [];
                    for (var i = 0, len = val.length; i < len; i++) {
                        _labels.push(new label.Label(val[i]));
                    }
                }
            }
        },
        "commentIds": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _commentIds;
            },
            set: function(val) {
                _commentIds = ptutil.arrayOrNull(val);
            }
        },
        "comments": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _comments;
            },
            set: function(val) {
                if (Array.isArray(val)) {
                    _comments = [];
                    for (var i = 0, len = val.length; i < len; i++) {
                        _comments.push(new comment.Comment(val[i]));
                    }
                }
            }
        },
        "ownerIds": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _ownerIds;
            },
            set: function(val) {
                _ownerIds = ptutil.arrayOrNull(val);
            }
        },
        "taskIds": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _taskIds;
            },
            set: function(val) {
                _taskIds = ptutil.arrayOrNull(val);
            }
        },
        "tasks": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _tasks;
            },
            set: function(val) {
                if (Array.isArray(val)) {
                    _tasks = [];
                    for (var i = 0, len = val.length; i < len; i++) {
                        _tasks.push(new task.Task(val[i]));
                    }
                }
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

Story.prototype.inspect = function() {
    return ptutil.inspect(this);
};

function Service(config, projectId, storyId) {
    
    if (!(this instanceof Service)){
        return new Service(config, projectId, storyId);
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
            writable: true,
            value: ptutil.intOrNull(storyId)
        },
        "activity": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new activity.Service(config, 'story', projectId, storyId);
            }
        },
        "comments": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new comment.Service(config, 'story', projectId, storyId);
            }
        },
        "labels": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new label.Service(config, 'story', projectId, storyId);
            }
        },
        "tasks": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new task.Service(config, 'story', projectId, storyId);
            }
        }
    });
    
    Object.seal(this);
}

Service.prototype.inspect = function() {
    return ptutil.inspect(this);
};

Service.prototype.comment = function(commentId) {
       return new comment.Service(this.config, 'story', this.projectId, this.storyId, commentId);
};

Service.prototype.label = function(labelId) {
       return new label.Service(this.config, 'story', this.projectId, this.storyId, labelId);
};

Service.prototype.task = function(taskId) {
       return new task.Service(this.config, 'story', this.projectId, this.storyId, taskId);
};

Service.prototype.all = function(options, cb) { // cb(err, stories[])
    var defaultOptions = {  
        limit: 500, 
        offset: 0 
    };
    if (typeof options === 'function' && typeof cb === 'undefined') {
        cb = options;
        options = {}; // options is an optional param
    }

    options = merge(defaultOptions, options);
    var allStories = []
    
    function getStories (allStories) {
        var _this = this;

        return ptutil.api.get(
            this.config.trackerToken,
            this.pathSegments(),
            options, // query
            this.config, // options
            function(error, res) {
                if(error) {
                    return cb(error);
                 }

                if (!error && res && Array.isArray(res.data) && res.data.length) {
                    res.data.forEach(function(ele) {
                        allStories.push(new Story(ele));
                    });
                }

                if(res.data.length <= 0) {
                   return cb(null, allStories);
                }

                // recursion in 500 batches, currently there's no way to tell how many piv stories in total
                options.limit+=500;
                options.offset+=500;
                getStories.call(_this, allStories);
            });
    };

   
    if (!this.projectId) {
        cb(new Error('Invalid project ID'), null);
    } else {
        return getStories.call(this, allStories);
    }

    
};

Service.prototype.get = function(cb) { // cb(err, story)
    if (!this.storyId) {
        cb(new Error('Invalid story ID'), null);
    }
    else {
        ptutil.api.get(
            this.config.trackerToken,
            this.pathSegments(),
            null, // query
            this.config, // options
            function(error, res) {
                _callbackWithStory(error, res, cb);
            });
    }
};

Service.prototype.create = function(data, cb) { // cb(err, story)
    if (!this.projectId) {
        cb(new Error('Invalid project ID'), null);
    }
    else {
        ptutil.api.post(
            this.config.trackerToken,
            this.pathSegments(),
            null, //query
            data,
            this.config, //options
            function(error, res) {
                _callbackWithStory(error, res, cb);
            });
    }
};

Service.prototype.update = function(data, cb) { // cb(err, story)
    if (!this.storyId) {
        cb(new Error('Invalid story ID'), null);
    }
    else {
        ptutil.api.put(
            this.config.trackerToken,
            this.pathSegments(), 
            null, //query
            data,
            this.config, //options
            function(error, res) {
                _callbackWithStory(error, res, cb);
            });
    }
};

Service.prototype.delete = function(cb) { // cb(err)
    if (!this.storyId) {
        cb(new Error('Invalid story ID'), null);
    }
    else {
        ptutil.api.delete(
            this.config.trackerToken,
            this.pathSegments(),
            null, //query
            this.config, //options
            function(error) {
                cb(error);
            });
    }
};

Service.prototype.pathSegments = function() {
    /*
    
    /projects/{project_id}/stories[/{story_id}]
    
    */
    var segs = [];
    if (typeof this.projectId === 'number') {
        segs.push('projects');
        segs.push(this.projectId);
    }
    segs.push('stories');
    if (typeof this.storyId === 'number') {
        segs.push(this.storyId);
    }
    return segs;
};

function _callbackWithStory(error, res, cb) {

    var result = null;

    if (!error && res && res.data) {
        result = new Story(res.data);
    }

    cb(error, result);
}

function _serviceToString() {
    var str = 'token: '+this.config.trackerToken+'\n';
        str += 'projectId'+this.projectId+'\n';
        str += 'storyId'+this.storyId+'\n';
    return str;
}

Service.prototype.toString = _serviceToString;
Service.prototype.inspect = _serviceToString;

module.exports = {
    Service : Service,
    Story : Story
};
