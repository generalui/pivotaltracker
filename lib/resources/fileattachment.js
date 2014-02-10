/*
    Source, File Attachment resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#file_attachment_resource
*/

var ptutil = require('./utils'),
    util = require('util');

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

FileAttachment.prototype.inspect = function() {
    var str = '\n';
        str += 'kind: '+this.kind+'\n';
        str += 'id: '+this.id+'\n';
        str += 'filename: '+this.filename+'\n';
        str += 'contentType: '+this.contentType+'\n';
        str += 'size: '+this.size+'\n';
        str += 'width: '+this.width+'\n';
        str += 'height: '+this.height+'\n';
        str += 'thumbnailable: '+this.thumbnailable+'\n';
        str += 'thumbnailUrl: '+this.thumbnailUrl+'\n';
        str += 'downloadUrl: '+this.downloadUrl+'\n';
        str += 'bigUrl: '+this.bigUrl+'\n';
        str += 'uploaded: '+this.uploaded+'\n';
        str += 'uploaderId: '+this.uploaderId+'\n';
        str += 'uploader: '+util.inspect(this.uploader)+'\n';
        str += 'createdAt: '+this.createdAt+'\n';
    return str;
};

function Service(config, attachmentType, parentIds, attachmentId) {
    
    if (!(this instanceof Service)){
        return new Service(config, attachmentType, parentIds, attachmentId);
    }
    
    config = config || {};
    parentIds = parentIds || {};

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
            value: ptutil.intOrNull(parentIds.projectId)
        },
        "epicId": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: ptutil.intOrNull(parentIds.epicId)
        },
        "storyId": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: ptutil.intOrNull(parentIds.storyId)
        },
        "commentId": {
            enumerable: true,
            configurable: false,
            writable: false,
            value: ptutil.intOrNull(parentIds.commentId)
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

Service.prototype.delete = function(cb) { // cb(err)
    utils.api.delete(
        this.config.trackerToken,
        this.pathSegments(),
        null,
        null,
        function(error) {
            cb(error);
        });
};

Service.prototype.upload = function(data, cb) { // cb(err, attachment)
    utils.api.upload(
        this.config.trackerToken,
        this.pathSegments(),
        null,
        null,
        function(error, res) {
            _callbackWithAttachment(error, res, cb);
        });
};

Service.prototype.download = function(data, cb) { // cb(err, fileInfo)
    utils.api.download(
        this.config.trackerToken,
        this.pathSegments(),
        null,
        null,
        function(error, res) {
            _callbackWithFileInfo(error, res, cb);
        });
};

Service.prototype.pathSegments = function() {
    /*
    
    POST    /projects/{project_id}/uploads
    GET     /file_attachments/{file_attachment_id}/download
    DELETE  /projects/{project_id}/epics/{epic_id}/comments/{comment_id}/file_attachments/{file_attachment_id}
    DELETE  /projects/{project_id}/stories/{story_id}/comments/{comment_id}/file_attachments/{file_attachment_id}
    
    */
    var segs = [];
    if (this.attachmentType === 'upload') {
        segs.push('projects',this.projectId,'uploads');
    }
    else if (this.attachmentType === 'download') {
        segs.push('file_attachments',this.attachmentId,'download');
    }
    else if (this.attachmentType === 'story') {
        segs.push('projects',this.projectId,'stories',this.storyId,'comments',this.commentId,'file_attachments');
    }
    else if (this.attachmentType === 'epic') {
        segs.push('projects',this.projectId,'epics',this.epicId,'comments',this.commentId,'file_attachments');
    }
    return segs;
};

function _callbackWithAttachment(error, res, cb) {
    cb(new Error('I haven\'t been implemented yet! Yikes!'),null);
}

function _callbackWithFileInfo(error, res, cb) {
    cb(new Error('I haven\'t been implemented yet! Yikes!'),null);
}

module.exports = {
    Service : Service,
    FileAttachment : FileAttachment
};
