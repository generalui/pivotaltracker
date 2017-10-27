/*
    Source, Project resource structure:
    https://www.pivotaltracker.com/help/api/rest/v5#project
*/

var activity = require('./activity'),
    membership = require('./projectmembership'),
    epic = require('./epic'),
    story = require('./story'),
    label = require('./label'),
    integration = require('./integration'),
    iteration = require('./iteration'),
    override = require('./iterationoverride'),
    attachment = require('./fileattachment'),
    ptutil = require('./utils'),
    util = require('util');

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
        "accountId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _accountId;
            },
            set: function(val) {
                _accountId = ptutil.intOrNull(val);
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
        "startDate": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _startDate;
            },
            set: function(val) {
                _startDate = ptutil.dateOrNull(val);
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
        "startTime": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _startTime;
            },
            set: function(val) {
                _startTime = ptutil.dateOrNull(val);
            }
        },
        "profileContent": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _profileContent;
            },
            set: function(val) {
                _profileContent = ptutil.stringOrNull(val);
            }
        },
        "initialVelocity": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _initialVelocity;
            },
            set: function(val) {
                _initialVelocity = ptutil.intOrNull(val);
            }
        },
        "version": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _version;
            },
            set: function(val) {
                _version = ptutil.intOrNull(val);
            }
        },
        "weekStartDay": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _weekStartDay;
            },
            set: function(val) {
                _weekStartDay = ptutil.stringOrNull(val);
            }
        },
        "currentVelocity": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _currentVelocity;
            },
            set: function(val) {
                _currentVelocity = ptutil.intOrNull(val);
            }
        },
        "currentIterationNumber": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _currentIterationNumber;
            },
            set: function(val) {
                _currentIterationNumber = ptutil.intOrNull(val);
            }
        },
        "pointScale": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _pointScale;
            },
            set: function(val) {
                _pointScale = ptutil.stringOrNull(val);
            }
        },
        "iterationLength": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _iterationLength;
            },
            set: function(val) {
                _iterationLength = ptutil.intOrNull(val);
            }
        },
        "velocityAveragedOver": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _velocityAveragedOver;
            },
            set: function(val) {
                _velocityAveragedOver = ptutil.intOrNull(val);
            }
        },
        "numberOfDoneIterationsToShow": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _numberOfDoneIterationsToShow;
            },
            set: function(val) {
                _numberOfDoneIterationsToShow = ptutil.intOrNull(val);
            }
        },
        "public": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _public;
            },
            set: function(val) {
                _public = ptutil.booleanOrNull(val);
            }
        },
        "enableTasks": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _enableTasks;
            },
            set: function(val) {
                _enableTasks = ptutil.booleanOrNull(val);
            }
        },
        "pointScaleIsCustom": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _pointScaleIsCustom;
            },
            set: function(val) {
                _pointScaleIsCustom = ptutil.booleanOrNull(val);
            }
        },
        "enableIncomingEmails": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _enableIncomingEmails;
            },
            set: function(val) {
                _enableIncomingEmails = ptutil.booleanOrNull(val);
            }
        },
        "atomEnabled": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _atomEnabled;
            },
            set: function(val) {
                _atomEnabled = ptutil.booleanOrNull(val);
            }
        },
        "showIterationsStartTime": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _showIterationsStartTime;
            },
            set: function(val) {
                _showIterationsStartTime = ptutil.booleanOrNull(val);
            }
        },
        "bugsAndChoresAreEstimatable": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _bugsAndChoresAreEstimatable;
            },
            set: function(val) {
                _bugsAndChoresAreEstimatable = ptutil.booleanOrNull(val);
            }
        },
        "enablePlannedMode": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _enablePlannedMode;
            },
            set: function(val) {
                _enablePlannedMode = ptutil.booleanOrNull(val);
            }
        },
        "hasGoogleDomain": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _hasGoogleDomain;
            },
            set: function(val) {
                _hasGoogleDomain = ptutil.booleanOrNull(val);
            }
        },
        "timeZone": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _timeZone;
            },
            set: function(val) {
                _timeZone = ptutil.objOrNull(val);
            }
        },
        "integrationIds": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _integrationIds;
            },
            set: function(val) {
                _integrationIds = ptutil.arrayOrNull(val);
            }
        },
        "integrations": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _integrations;
            },
            set: function(val) {
                if (Array.isArray(val)) {
                    _integrations = [];
                    for (var i = 0, len = val.length; i < len; i++) {
                        _integrations.push(new integration.Integration(val[i]));
                    }
                }
            }
        },
        "iterationOverrideNumbers": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _iterationOverrideNumbers;
            },
            set: function(val) {
                _iterationOverrideNumbers = ptutil.arrayOrNull(val);
            }
        },
        "iterationOverrides": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _iterationOverrides;
            },
            set: function(val) {
                if (Array.isArray(val)) {
                    _iterationOverrides = [];
                    for (var i = 0, len = val.length; i < len; i++) {
                        _iterationOverrides.push(new override.IterationOverride(val[i]));
                    }
                }
            }
        },
        "membershipIds": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _membershipIds;
            },
            set: function(val) {
                _membershipIds = ptutil.arrayOrNull(val);
            }
        },
        "memberships": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _memberships;
            },
            set: function(val) {
                if (Array.isArray(val)) {
                    _memberships = [];
                    for (var i = 0, len = val.length; i < len; i++) {
                        _memberships.push(new membership.ProjectMembership(val[i]));
                    }
                }
            }
        },
        "epicIds": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _epicIds;
            },
            set: function(val) {
                _epicIds = ptutil.arrayOrNull(val);
            }
        },
        "epics": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _epics;
            },
            set: function(val) {
                if (Array.isArray(val)) {
                    _epics = [];
                    for (var i = 0, len = val.length; i < len; i++) {
                        _epics.push(new epic.Epic(val[i]));
                    }
                }
            }
        },
        "storyIds": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _storyIds;
            },
            set: function(val) {
                _storyIds = ptutil.arrayOrNull(val);
            }
        },
        "stories": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _stories;
            },
            set: function(val) {
                if (Array.isArray(val)) {
                    _stories = [];
                    for (var i = 0, len = val.length; i < len; i++) {
                        _stories.push(new story.Story(val[i]));
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

Project.prototype.inspect = function() {
    return ptutil.inspect(this);
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
        "activity": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new activity.Service(config, 'project', projectId);
            }
        },
        "labels": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new label.Service(config, 'project', projectId);
            }
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
        "memberships": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new membership.Service(config, projectId);
            }
        },
        "uploads": {
            enumerable: true,
            set: function(){},
            get: function(){
                var parentIds = {
                    projectId : this.projectId
                };
                return new attachment.Service(this.config, null, parentIds);
            }
        },
        "iterations": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new iteration.Service(this.config, projectId);
            }
        }
    });

    Object.seal(this);
}

Service.prototype.inspect = function() {
    return ptutil.inspect(this);
};

Service.prototype.membership = function(membershipId) {
    return new membership.Service(this.config, this.projectId, membershipId);
};

Service.prototype.label = function(labelId) {
    return new label.Service(this.config, 'project', this.projectId, labelId);
};

Service.prototype.epic = function(epicId) {
    return new epic.Service(this.config, this.projectId, epicId);
};

Service.prototype.story = function(storyId) {
    return new story.Service(this.config, this.projectId, storyId);
};

Service.prototype.iteration = function(iterationId) {
    return new iteration.Service(this.config, this.projectId, iterationId);
};

Service.prototype.search = function(filters, cb) { // cb(err, projects)
    if (!this.projectId) {
        cb(new Error('Invalid project ID'), null);
    }
    else {
        ptutil.api.search(
            this.config.trackerToken,
            this.pathSegments(),
            filters,
            this.config, //options
            function(error, res) {
                _callbackWithSearchResults(error, res, cb);
            });
    }
};

// Usage: projects.all([filters,] cb)
Service.prototype.all = function() { // cb(err, projects)
    var filters,
        cb;

    if (typeof arguments[1] === 'function') {
        filters = arguments[0];
        cb = arguments[1];
    }
    else if (typeof arguments[0] === 'function') {
        cb = arguments[0];
    }

    if (cb) {
        ptutil.api.get(
            this.config.trackerToken,
            this.pathSegments(),
            filters,
            this.config, //options
            function(error, res) {
                _callbackWithProjects(error, res, cb);
            });
    }
    else {
        console.log('Invalid arguments for projects.all()');
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
            this.config, //options
            function(error, res) {
                _callbackWithProject(error, res, cb);
            });
    }
};

Service.prototype.create = function(data, cb) { // cb(err, project)
    ptutil.api.post(
        this.config.trackerToken,
        this.pathSegments(),
        null, //query
        data,
        this.config, //options
        function(error, res) {
            _callbackWithProject(error, res, cb);
        });
};

Service.prototype.update = function(data, cb) { // cb(err, project)
    if (!this.projectId) {
        cb(new Error('Invalid project ID'), null);
    }
    else {
        ptutil.api.put(
            this.config.trackerToken,
            this.pathSegments(),
            null, //query
            data,
            this.config, //options
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
            this.config, //options
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

    var result = null;

    if (!error && res && res.data) {
        result = new Project(res.data);
    }

    cb(error, result);
}

function _callbackWithProjects(error, res, cb) { // cb(error, projects[])

    var arr = [];

    if (!error && res && Array.isArray(res.data) && res.data.length) {

        res.data.forEach(function(ele) {
            arr.push(new Project(ele));
        });
    }

    cb(error, arr);
}

function _callbackWithSearchResults(error, res, cb) { // cb(error, results)

    var results = {
        epics: [],
        stories: []
    };

    if (!error && res && res.data) {

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

        if (epics) {
            epics.forEach(function(e) {
                if (e) {
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
    }

    cb(error, results);
}

function _serviceToString() {
    var str = '\n';
        str += 'token: '+this.config.trackerToken+'\n';
        str += 'projectId: '+this.projectId+'\n';
    return str;
}

Service.prototype.toString = _serviceToString;
Service.prototype.inspect = _serviceToString;

module.exports = {
    Service : Service,
    Project : Project
};
