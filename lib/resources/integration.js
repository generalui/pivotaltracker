/*
 Source, Integration resource structure:
 https://www.pivotaltracker.com/help/api/rest/v5#integration_resource
 */

var ptutil = require('./utils'),
    util = require('util');

function Integration(data) {

    if (!(this instanceof Integration)){
        return new Integration(data);
    }

    data = data || {};

    var _kind = null,
        _id = null,
        _externalProjectId = null,
        _externalApiToken = null,
        _apiUsername = null,
        _apiPassword = null,
        _basicAuthUsername = null,
        _basicAuthPassword = null,
        _zendeskUserPassword = null,
        _zendeskUserEmail = null,
        _statusesToExclude = null,
        _filterId = null,
        _component = null,
        _binId = null,
        _product = null,
        _viewId = null,
        _name = null,
        _storyName = null,
        _projectId = null,
        _importApiUrl = null,
        _account = null,
        _company = null,
        _baseUrl = null,
        _canImport = null,
        _commentsPrivate = null,
        _updateComments = null,
        _updateState = null,
        _isOther = null,
        _active = null,
        _createdAt = null,
        _updatedAt = null;

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
        "externalProjectId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _externalProjectId;
            },
            set: function(val) {
                _externalProjectId = ptutil.intOrNull(val);
            }
        },
        "externalApiToken": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _externalApiToken;
            },
            set: function(val) {
                _externalApiToken = ptutil.stringOrNull(val);
            }
        },
        "apiUsername": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _apiUsername;
            },
            set: function(val) {
                _apiUsername = ptutil.stringOrNull(val);
            }
        },
        "apiPassword": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _apiPassword;
            },
            set: function(val) {
                _apiPassword = ptutil.stringOrNull(val);
            }
        },
        "basicAuthUsername": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _basicAuthUsername;
            },
            set: function(val) {
                _basicAuthUsername = ptutil.stringOrNull(val);
            }
        },
        "basicAuthPassword": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _basicAuthPassword;
            },
            set: function(val) {
                _basicAuthPassword = ptutil.stringOrNull(val);
            }
        },
        "zendeskUserPassword": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _zendeskUserPassword;
            },
            set: function(val) {
                _zendeskUserPassword = ptutil.stringOrNull(val);
            }
        },
        "zendeskUserEmail": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _zendeskUserEmail;
            },
            set: function(val) {
                _zendeskUserEmail = ptutil.stringOrNull(val);
            }
        },
        "statusesToExclude": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _statusesToExclude;
            },
            set: function(val) {
                _statusesToExclude = ptutil.stringOrNull(val);
            }
        },
        "filterId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _filterId;
            },
            set: function(val) {
                _filterId = ptutil.stringOrNull(val);
            }
        },
        "component": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _component;
            },
            set: function(val) {
                _component = ptutil.stringOrNull(val);
            }
        },
        "binId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _binId;
            },
            set: function(val) {
                _binId = ptutil.intOrNull(val);
            }
        },
        "product": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _product;
            },
            set: function(val) {
                _product = ptutil.stringOrNull(val);
            }
        },
        "viewId": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _viewId;
            },
            set: function(val) {
                _viewId = ptutil.stringOrNull(val);
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
        "storyName": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _storyName;
            },
            set: function(val) {
                _storyName = ptutil.stringOrNull(val);
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
        "importApiUrl": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _importApiUrl;
            },
            set: function(val) {
                _importApiUrl = ptutil.stringOrNull(val);
            }
        },
        "account": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _account;
            },
            set: function(val) {
                _account = ptutil.stringOrNull(val);
            }
        },
        "company": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _company;
            },
            set: function(val) {
                _company = ptutil.stringOrNull(val);
            }
        },
        "baseUrl": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _baseUrl;
            },
            set: function(val) {
                _baseUrl = ptutil.stringOrNull(val);
            }
        },
        "canImport": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _canImport;
            },
            set: function(val) {
                _canImport = ptutil.booleanOrNull(val);
            }
        },
        "commentsPrivate": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _commentsPrivate;
            },
            set: function(val) {
                _commentsPrivate = ptutil.booleanOrNull(val);
            }
        },
        "updateComments": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _updateComments;
            },
            set: function(val) {
                _updateComments = ptutil.booleanOrNull(val);
            }
        },
        "updateState": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _updateState;
            },
            set: function(val) {
                _updateState = ptutil.booleanOrNull(val);
            }
        },
        "isOther": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _isOther;
            },
            set: function(val) {
                _isOther = ptutil.booleanOrNull(val);
            }
        },
        "active": {
            enumerable: true,
            configurable: false,
            get: function() {
                return _active;
            },
            set: function(val) {
                _active = ptutil.booleanOrNull(val);
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
        "updateState": {
            enumerable: true,
            configurable: false,
            get: function() {
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

Integration.prototype.inspect = function() {
    return ptutil.inspect(this);
};

module.exports = {
    Integration : Integration
};
