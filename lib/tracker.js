
var account = require('./resources/account'),
    project = require('./resources/project'),
    ptutil = require('./resources/utils');

function Client(opt) {
    
    if (!(this instanceof Client)){
        return new Client(opt);
    }

    var _config = {
        trackerToken : null
    };
    
    if (typeof opt === 'string') {
        _config.trackerToken = opt;
    }
    else if (opt && typeof opt.trackerToken === 'string') {
        _config.trackerToken = opt.trackerToken;
    }

    Object.defineProperties(this, {
        
        "config": {
            enumerable: true,
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

Client.prototype.toString = function() {
    return '[Object Client]';
};

// cb(err, token)
function getToken(user, pass, cb) {
    
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
                cb(null, res.data.apiToken || null);
            }
        });
}

exports.Client = Client;
exports.getToken = getToken;
