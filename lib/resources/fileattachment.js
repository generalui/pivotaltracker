/*
    Source, File Attachment resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#file_attachment_resource
*/

var ptutil = require('./utils');

function FileAttachment(data) {
    
    if (!(this instanceof FileAttachment)){
        return new FileAttachment(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _id = null,
        _filename = null,
        _contentType = null,
        _size = null,
        _width = null,
        _height = null,
        _thumbnailable = null,
        _thumbnailUrl = null,
        _downloadUrl = null,
        _bigUrl = null,
        _uploaded = null,
        _uploaderId = null,
        _uploader = null,
        _createdAt = null;
    
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
        "filename": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _filename;
            },
            set: function(val) {
                _filename = ptutil.stringOrNull(val);
            }
        },
        "contentType": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _contentType;
            },
            set: function(val) {
                _contentType = ptutil.stringOrNull(val);
            }
        },
        "size": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _size;
            },
            set: function(val) {
                _size = ptutil.intOrNull(val);
            }
        },
        "width": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _width;
            },
            set: function(val) {
                _width = ptutil.intOrNull(val);
            }
        },
        "height": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _height;
            },
            set: function(val) {
                _height = ptutil.intOrNull(val);
            }
        },
        "thumbnailable": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _thumbnailable;
            },
            set: function(val) {
                _thumbnailable = ptutil.booleanOrNull(val);
            }
        },
        "thumbnailUrl": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _thumbnailUrl;
            },
            set: function(val) {
                _thumbnailUrl = ptutil.stringOrNull(val);
            }
        },
        "downloadUrl": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _downloadUrl;
            },
            set: function(val) {
                _downloadUrl = ptutil.stringOrNull(val);
            }
        },
        "bigUrl": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _bigUrl;
            },
            set: function(val) {
                _bigUrl = ptutil.stringOrNull(val);
            }
        },
        "uploaded": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _uploaded;
            },
            set: function(val) {
                _uploaded = ptutil.booleanOrNull(val);
            }
        },
        "uploaderId": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _uploaderId;
            },
            set: function(val) {
                _uploaderId = ptutil.intOrNull(val);
            }
        },
        "uploader": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _uploader;
            },
            set: function(val) {
                _uploader = ptutil.objOrNull(val);
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
    });
    
    Object.seal(this);
    
    for (var key in data) {
        if (data.hasOwnProperty(key) && this.hasOwnProperty(key)) {
            this[key] = data[key];
        }
    }
}

FileAttachment.prototype.toString = function() {
    return '[Object FileAttachment (ID: '+(this.id || 'None')+')]';
};

function Service(config, attachmentType, projectId, parentId, attachmentId) {
    
    if (!(this instanceof Service)){
        return new Service(config, attachmentType, projectId, parentId, attachmentId);
    }
    
    config = config || {};

    Object.defineProperties(this, {
        
        "config": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: config
        },
        "attachmentType": {
            enumerable: false,
            configurable: false,
            writable: false,
            value: attachmentType
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
        },
        "attachmentId": {
            enumerable: true,
            configurable: false,
            writable: true,
            value: ptutil.intOrNull(attachmentId)
        }
    });
    
    Object.seal(this);
}

Service.prototype.delete = function(data, cb) { // cb(err)
    var configErr = this.configError();
    if (configErr) {
        cb(configErr, null);
    }
    else {
        utils.api.delete(
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
    
    /projects/{project_id}/epics/{epic_id}/file_attachments[/{file_attachment_id}]
    /projects/{project_id}/stories/{story_id}/file_attachments[/{file_attachment_id}]
    
    */
    var segs = ['projects',this.projectId];
    if (this.attachmentType === 'story') {
        segs.push('stories');
    }
    else if (this.attachmentType === 'epic') {
        segs.push('epics');
    }
    segs.push(this.parentId, 'file_attachments');
    if (typeof this.attachmentId === 'number') {
        segs.push(this.attachmentId);
    }
    return segs;
};

Service.prototype.configError = function() {
    if (typeof this.projectId !== 'number') {
        return new Error('Invalid project ID');
    }
    else if (this.attachmentType !== 'story' && this.attachmentType !== 'epic') {
        return new Error('Invalid attachment type');
    }
    else if (this.attachmentType === 'story' && typeof this.parentId !== 'number') {
        return new Error('Invalid story ID');
    }
    else if (this.attachmentType === 'epic' && typeof this.parentId !== 'number') {
        return new Error('Invalid epic ID');
    }
    else {
        return null;
    }
};

module.exports = {
    Service : Service,
    FileAttachment : FileAttachment
};
