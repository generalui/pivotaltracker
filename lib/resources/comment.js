/*
    Source, Comment resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#comment_resource
*/

var fattachment = require('./fileattachment'),
    ptutil = require('./utils'),
    util = require('util');

function Comment(data) {
    
    if (!(this instanceof Comment)){
        return new Comment(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _id = null,
        _epicId = null,
        _storyId = null,
        _createdAt = null,
        _updatedAt = null,
        _text = null,
        _personId = null,
        _person = null,
        _commitIdentifier = null,
        _commitType = null,
        _fileAttachmentIds = null,
        _fileAttachments = null;
    
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
        "epicId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _epicId;
            },
            set: function(val) {
                _epicId = ptutil.intOrNull(val);
            }
        },
        "storyId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _storyId;
            },
            set: function(val) {
                _storyId = ptutil.intOrNull(val);
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
        "fileAttachmentIds": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _fileAttachmentIds;
            },
            set: function(val) {
                _fileAttachmentIds = ptutil.arrayOrNull(val);
            }
        },
        "fileAttachments": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _fileAttachments;
            },
            set: function(val) {
                _fileAttachments = ptutil.arrayOrNull(val);
            }
        },
        "text": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _text;
            },
            set: function(val) {
                _text = ptutil.stringOrNull(val);
            }
        },
        "commitIdentifier": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _commitIdentifier;
            },
            set: function(val) {
                _commitIdentifier = ptutil.stringOrNull(val);
            }
        },
        "commitType": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _commitType;
            },
            set: function(val) {
                _commitType = ptutil.stringOrNull(val);
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
        
Comment.prototype.inspect = function() {

    return ptutil.inspect(this);
};

function Service(config, commentType, projectId, parentId, commentId) {
    
    if (!(this instanceof Service)){
        return new Service(config, commentType, projectId, parentId, commentId);
    }
    
    config = config || {};

    Object.defineProperties(this, {
        
        "config": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: config
        },
        "commentType": {
            enumerable: false,
            configurable: false,
            writable: false,
            value: commentType
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
            writable: true,
            value: ptutil.intOrNull(parentId)
        },
        "commentId": {
            enumerable: true,
            configurable: false,
            writable: true,
            value: ptutil.intOrNull(commentId)
        },
        "fileAttachments": {
            enumerable: true,
            set: function(){},
            get: function(){
                var parentIds = {
                    projectId: this.projectId,
                    storyId: this.parentId,
                    epicId: this.parentId,
                    commentId: this.commentId
                };
                return new fattachment.Service(this.config, this.commentType, parentIds);
            }
        },
    });
    
    Object.seal(this);
}

Service.prototype.inspect = function() {
    return ptutil.inspect(this);
};

Service.prototype.fileAttachment = function(attachmentId) {

    var parentIds = {
        projectId: this.projectId,
        storyId: this.parentId,
        epicId: this.parentId,
        commentId: this.commentId
    };
    return new fattachment.Service(this.config, this.commentType, parentIds, attachmentId);
};

Service.prototype.all = function(cb) { // cb(err, comments[])

    var configErr = this.configError();
    if (configErr) {
        cb(configErr, null);
    }
    else {
        var query = {
            fields: ':default,file_attachments'
        };
        ptutil.api.get(
            this.config.trackerToken,
            this.pathSegments(),
            query,
            this.config, // options
            function(error, res) {
                _callbackWithComments(error, res, cb);
            });
    }
};

Service.prototype.get = function(cb) { // cb(err, comment)

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
                _callbackWithComment(error, res, cb);
            });
    }
};

Service.prototype.create = function(data, cb) { // cb(err, comment)

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
                _callbackWithComment(error, res, cb);
            });
    }
};

Service.prototype.update = function(data, cb) { // cb(err, comment)

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
                _callbackWithComment(error, res, cb);
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
    
    /projects/{project_id}/epics/{epic_id}/comments[/{comment_id}]
    /projects/{project_id}/stories/{story_id}/comments[/{comment_id}]
    
    */
    var segs = ['projects',this.projectId];
    if (this.commentType === 'story') {
        segs.push('stories');
    }
    else { // epic
        segs.push('epics');
    }
    segs.push(this.parentId, 'comments');
    if (typeof this.commentId === 'number') {
        segs.push(this.commentId);
    }
    return segs;
};

Service.prototype.configError = function() {

    if (typeof this.projectId !== 'number') {
        return new Error('Invalid project ID');
    }
    else if (this.commentType !== 'story' && this.commentType !== 'epic') {
        return new Error('Invalid comment type');
    }
    else if (this.commentType === 'story' && typeof this.parentId !== 'number') {
        return new Error('Invalid story ID');
    }
    else if (this.commentType === 'epic' && typeof this.parentId !== 'number') {
        return new Error('Invalid epic ID');
    }
    else {
        return null;
    }
};

function _callbackWithComment(error, res, cb) {

    var result = null;

    if (!error && res && res.data) {
        result = new Comment(res.data);
    }

    cb(error, result);
}

function _callbackWithComments(error, res, cb) {

    var arr = [];

    if (!error && res && Array.isArray(res.data) && res.data.length) {

        res.data.forEach(function(ele) {

            arr.push(new Comment(ele));
        });
    }

    cb(error, arr);
}

module.exports = {
    Service : Service,
    Comment : Comment
};
