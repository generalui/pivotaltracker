/*
    Source, Project resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#project
*/

var membership = require('./projectmembership'),
    epic = require('./epic'),
    story = require('./story'),
    label = require('./label'),
    iteration = require('./iteration'),
    activity = require('./activity'),
    ptutil = require('./utils');

function Project(data) {
    
    if (!(this instanceof Project)){
        return new Project(data);
    }
    
    data = data || {};
    
    var _kind = null,
        _id = null,
        _accountId = null,
        _name = null,
        _description = null,
        _startDate = null,
        _createdAt = null,
        _updatedAt = null,
        _startTime = null,
        _profileContent = null,
        _initialVelocity = null,
        _version = null,
        _weekStartDay = null,
        _currentVelocity = null,
        _currentIterationNumber = null,
        _pointScale = null,
        _iterationLength = null,
        _velocityAveragedOver = null,
        _numberOfDoneIterationsToShow = null,
        _public = null,
        _enableTasks = null,
        _pointScaleIsCustom = null,
        _enableIncomingEmails = null,
        _atomEnabled = null,
        _showIterationsStartTime = null,
        _bugsAndChoresAreEstimatable = null,
        _enablePlannedMode = null,
        _hasGoogleDomain = null,
        _timeZone = null,
        _integrationIds = null,
        _integrations = null,
        _iterationOverrideNumbers = null,
        _iterationOverrides = null,
        _membershipIds = null,
        _memberships = null,
        _epicIds = null,
        _epics = null,
        _storyIds = null,
        _stories = null;
    
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
        "accountId": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _accountId;
            },
            set: function(val) {
                _accountId = ptutil.intOrNull(val);
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
        "description": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _description;
            },
            set: function(val) {
                _description = ptutil.stringOrNull(val);
            }
        },
        "startDate": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _startDate;
            },
            set: function(val) {
                _startDate = ptutil.dateOrNull(val);
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
        "startTime": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _startTime;
            },
            set: function(val) {
                _startTime = ptutil.dateOrNull(val);
            }
        },
        "profileContent": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _profileContent;
            },
            set: function(val) {
                _profileContent = ptutil.stringOrNull(val);
            }
        },
        "initialVelocity": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _initialVelocity;
            },
            set: function(val) {
                _initialVelocity = ptutil.intOrNull(val);
            }
        },
        "version": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _version;
            },
            set: function(val) {
                _version = ptutil.intOrNull(val);
            }
        },
        "weekStartDay": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _weekStartDay;
            },
            set: function(val) {
                _weekStartDay = ptutil.stringOrNull(val);
            }
        },
        "currentVelocity": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _currentVelocity;
            },
            set: function(val) {
                _currentVelocity = ptutil.intOrNull(val);
            }
        },
        "currentIterationNumber": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _currentIterationNumber;
            },
            set: function(val) {
                _currentIterationNumber = ptutil.intOrNull(val);
            }
        },
        "pointScale": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _pointScale;
            },
            set: function(val) {
                _pointScale = ptutil.stringOrNull(val);
            }
        },
        "iterationLength": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _iterationLength;
            },
            set: function(val) {
                _iterationLength = ptutil.intOrNull(val);
            }
        },
        "velocityAveragedOver": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _velocityAveragedOver;
            },
            set: function(val) {
                _velocityAveragedOver = ptutil.intOrNull(val);
            }
        },
        "numberOfDoneIterationsToShow": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _numberOfDoneIterationsToShow;
            },
            set: function(val) {
                _numberOfDoneIterationsToShow = ptutil.intOrNull(val);
            }
        },
        "public": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _public;
            },
            set: function(val) {
                _public = ptutil.booleanOrNull(val);
            }
        },
        "enableTasks": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _enableTasks;
            },
            set: function(val) {
                _enableTasks = ptutil.booleanOrNull(val);
            }
        },
        "pointScaleIsCustom": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _pointScaleIsCustom;
            },
            set: function(val) {
                _pointScaleIsCustom = ptutil.booleanOrNull(val);
            }
        },
        "enableIncomingEmails": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _enableIncomingEmails;
            },
            set: function(val) {
                _enableIncomingEmails = ptutil.booleanOrNull(val);
            }
        },
        "atomEnabled": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _atomEnabled;
            },
            set: function(val) {
                _atomEnabled = ptutil.booleanOrNull(val);
            }
        },
        "showIterationsStartTime": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _showIterationsStartTime;
            },
            set: function(val) {
                _showIterationsStartTime = ptutil.booleanOrNull(val);
            }
        },
        "bugsAndChoresAreEstimatable": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _bugsAndChoresAreEstimatable;
            },
            set: function(val) {
                _bugsAndChoresAreEstimatable = ptutil.booleanOrNull(val);
            }
        },
        "enablePlannedMode": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _enablePlannedMode;
            },
            set: function(val) {
                _enablePlannedMode = ptutil.booleanOrNull(val);
            }
        },
        "hasGoogleDomain": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _hasGoogleDomain;
            },
            set: function(val) {
                _hasGoogleDomain = ptutil.booleanOrNull(val);
            }
        },
        "timeZone": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _timeZone;
            },
            set: function(val) {
                _timeZone = ptutil.objOrNull(val);
            }
        },
        "integrationIds": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _integrationIds;
            },
            set: function(val) {
                _integrationIds = ptutil.arrayOrNull(val);
            }
        },
        "integrations": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _integrations;
            },
            set: function(val) {
                _integrations = ptutil.arrayOrNull(val);
            }
        },
        "iterationOverrideNumbers": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _iterationOverrideNumbers;
            },
            set: function(val) {
                _iterationOverrideNumbers = ptutil.arrayOrNull(val);
            }
        },
        "iterationOverrides": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _iterationOverrides;
            },
            set: function(val) {
                _iterationOverrides = ptutil.arrayOrNull(val);
            }
        },
        "membershipIds": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _membershipIds;
            },
            set: function(val) {
                _membershipIds = ptutil.arrayOrNull(val);
            }
        },
        "memberships": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _memberships;
            },
            set: function(val) {
                _memberships = ptutil.arrayOrNull(val);
            }
        },
        "epicIds": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _epicIds;
            },
            set: function(val) {
                _epicIds = ptutil.arrayOrNull(val);
            }
        },
        "epics": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _epics;
            },
            set: function(val) {
                _epics = ptutil.arrayOrNull(val);
            }
        },
        "storyIds": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _storyIds;
            },
            set: function(val) {
                _storyIds = ptutil.arrayOrNull(val);
            }
        },
        "stories": {
            enumerable: true,
            configurable: false,
            get: function(val) {
                return _stories;
            },
            set: function(val) {
                _stories = ptutil.arrayOrNull(val);
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

Project.prototype.toString = function() {
    return '[Object Project (ID: '+(this.id || 'None')+')]';
};

function Service(config, projectId) {
    
    if (!(this instanceof Service)){
        return new Service(config, projectId);
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
            writable: true,
            value: ptutil.intOrNull(projectId)
        },
        "epics": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new epic.Service(config, projectId);
            }
        },
        "stories": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new story.Service(config, projectId);
            }
        },
        "labels": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new label.Service(config, projectId);
            }
        },
        "memberships": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new membership.Service(config, projectId);
            }
        }
    });
    
    Object.seal(this);
}

Service.prototype.membership = function(membershipId) {
    return new membership.Service(this.config, this.projectId, membershipId);
};

Service.prototype.label = function(labelId) {
    return new label.Service(this.config, this.projectId, labelId);
};

Service.prototype.epic = function(epicId) {
    return new epic.Service(this.config, this.projectId, epicId);
};

Service.prototype.story = function(storyId) {
    return new story.Service(this.config, this.projectId, storyId);
};

Service.prototype.toString = function() {
    return '[Object Service (Type: Project Service, ID: '+(this.projectId || 'no ID')+')]';
};

Service.prototype.search = function(filters, cb) { // cb(err, projects[])
    if (!this.projectId) {
        cb(new Error('Invalid project ID'), null);
    }
    else {
        ptutil.api.search(
            this.config.trackerToken,
            this.pathSegments(),
            filters,
            null, //options
            function(error, res) {
                _callbackWithSearchResults(error, res, cb);
            });
    }
};

Service.prototype.all = function(cb) { // cb(err, projects[])
    if (!this.projectId) {
        cb(new Error('Invalid project ID'), null);
    }
    else {
        ptutil.api.get(
            this.config.trackerToken,
            this.pathSegments(),
            null, //query
            null, //options
            function(error, res) {
                _callbackWithProjects(error, res, cb);
            });
    }
};

Service.prototype.get = function(cb) { // cb(err, project)
    if (!this.projectId) {
        cb(new Error('Invalid project ID'), null);
    }
    else {
        ptutil.api.get(
            this.config.trackerToken,
            this.pathSegments(),
            null, //query
            null, //options
            function(error, res) {
                _callbackWithProject(error, res, cb);
            });
    }
};

Service.prototype.create = function(cb) { // cb(err, project)
    if (!this.projectId) {
        cb(new Error('Invalid project ID'), null);
    }
    else {
        ptutil.api.post(
            this.config.trackerToken,
            this.pathSegments(),
            null, //query
            data,
            null, //options
            function(error, res) {
                _callbackWithProject(error, res, cb);
            });
    }
};

Service.prototype.update = function(cb) { // cb(err, project)
    if (!this.projectId) {
        cb(new Error('Invalid project ID'), null);
    }
    else {
        ptutil.api.put(
            this.config.trackerToken,
            this.pathSegments(),
            null, //query
            data,
            null, //options
            function(error, res) {
                _callbackWithProject(error, res, cb);
            });
    }
};

Service.prototype.delete = function(cb) { // cb(err, project)
    if (!this.projectId) {
        cb(new Error('Invalid project ID'), null);
    }
    else {
        ptutil.api.delete(
            this.config.trackerToken,
            this.pathSegments(),
            null, //query
            null, //options
            function(error) {
                cb(error);
            });
    }
};

Service.prototype.pathSegments = function() {
    /*
    
    /projects[/{project_id}]
    
    */
    if (typeof this.projectId === 'number') {
        return ['projects',this.projectId];
    }
    else {
        return ['projects'];
    }
};

function _callbackWithProject(error, res, cb) { // cb(error, project)
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
        cb(null, new Project(res.data));
    }
}

function _callbackWithProjects(error, res, cb) { // cb(error, projects[])
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
            arr.push(new Project(ele));
        });
        cb(null, arr);
    }
}

function _callbackWithSearchResults(error, res, cb) { // cb(error, results)
    if (error) {
        cb(error, null);
    }
    else if (!res || !res.data) {
        cb(error, null);
    }
    else if (!Array.isArray(res.data) || !res.data) {
        cb(null, []);
    }
    else {
        var epics = null;
        var stories = null;
        var keys = Object.keys(res.data);
        
        keys.forEach(function(key) {
        
            // Yes, this is awkward. The value of the key 'epics' 
            // is expected to be an object with another key called 'epics'
            // Likewise for stories.stories.
            
            if (key === 'epics' && 
            Array.isArray(res.data.epics.epics) && 
            res.data.epics.epics.length) {
                epics = res.data.epics.epics;
            }
            else if (key === 'stories' && 
            Array.isArray(res.data.stories.stories) && 
            res.data.stories.stories.length) { 
                stories = res.data.stories.stories;
            }
        });
        
        var results = {
            epics: [],
            stories: []
        };
        if (epics) {
            epics.forEach(function(e) {
                if (s) {
                    results.epics.push(new epic.Epic(e));
                }
            });
        }
        if (stories) {
            stories.forEach(function(s) {
                if (s) {
                    results.stories.push(new story.Story(s));
                }
            });
        }
        cb(null, results);
    }
}

module.exports = {
    Service : Service,
    Project : Project
};
