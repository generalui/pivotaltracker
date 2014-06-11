
var account = require('./resources/account'),
    project = require('./resources/project'),
    attachment = require('./resources/fileattachment'),
    ptutil = require('./resources/utils');

function Client(opt) {
    
    if (!(this instanceof Client)){
        return new Client(opt);
    }

    var _config = {
        trackerToken : null,
        pivotalHost : "www.pivotaltracker.com"
    };
    
    if (typeof opt === 'string') {
        _config.trackerToken = opt;
    }
    else if (opt) {
      if (typeof opt.trackerToken === 'string') {
        _config.trackerToken = opt.trackerToken;
      }
      if (typeof opt.pivotalHost === 'string') {
        _config.pivotalHost = opt.pivotalHost;
      }
    }

    Object.defineProperties(this, {
        
        "config": {
            enumerable: false,
            configurable: false,
            writable: false,
            value: _config
        },
        "useToken": {
            enumerable: true,
            value: function(token) {
                _config.trackerToken = token;
            }
        },
        "accounts": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new account.Service(_config);
            }
        },
        "projects": {
            enumerable: true,
            set: function(){},
            get: function(){
                return new project.Service(_config);
            }
        }
    });
    
    Object.seal(this);
}

Client.prototype.account = function(accountId) {
    return new account.Service(this.config, accountId);
};

Client.prototype.project = function(projectId) {
    return new project.Service(this.config, projectId);
};

Client.prototype.attachment = function(attachmentId) {
    return new attachment.Service(this.config, null, null, attachmentId);
};

Client.prototype.getToken = getToken;

Client.prototype.toString = function() {
    return '[Object Client]';
};

function getToken(user, pass, cb) { // cb(err, token)
    
    var opts = {
        auth: {
            user: user,
            pass: pass,
            sendImmediately: false
        }
    };
    
    ptutil.api.get(
        null,   // token 
        ['me'], // path segments
        null,   // query
        opts,
        function(error, res) {
            if (error) {
                cb(error, null);
            }
            else if (!res || !res.data) {
                cb(error, null);
            }
            else if (res.data.error) {
                cb(ptutil.toError(res.data), null);
            }
            else {
                if (this.hasOwnProperty('config')) {
                    this.useToken(res.data.apiToken);
                }
                cb(null, res.data.apiToken || null);
            }
        });
}

exports.getToken = getToken;
exports.Client = Client;
