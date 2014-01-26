
var request = require('request'),
    validator = require('validator'),
    fs = require('fs'),
    path = require('path'),
    util = require('util');

function get(token, pathSegments, query, options, cb) {
    apiCall('GET', token, pathSegments, query, null, options, cb);
}

function post(token, pathSegments, query, data, options, cb) {
    apiCall('POST', token, pathSegments, query, options, cb);
}

function put(token, pathSegments, query, data, options, cb) {
    apiCall('PUT', token, pathSegments, query, data, options, cb);
}

function del(token, pathSegments, query, options, cb) {
    apiCall('DELETE', token, pathSegments, null, null, options, cb);
}

function search(search, pathSegments, query, options, cb) {
    var q;
    if (typeof query === 'object' && query !== null) {
        q = query;
    }
    else if (typeof query === 'string') {
        q = {
            query: _queryObjToStr(query)
        };
    }
    apiCall('GET', token, pathSegments, q, null, options, cb);
}

function upload(path, comment, cb) {
    cb(null, null);
}

function download(url, comment, cb) {
    cb(null, null);
}

function ApiError(status, data) {
    data = data || {};
    this.status = status || null;
    this.kind = data.kind || '';
    this.code = data.code || '';
    this.error = data.error || '';
    this.requirement = data.requirement || '';
    this.generalProblem = data.generalProblem || '';
    this.possibleFix = data.possibleFix || '';
    this.validationErrors = data.validationErrors || '';
    this.message = data.message || '';
}
ApiError.prototype = new Error();
ApiError.prototype.constructor = ApiError;

function apiCall(method, token, pathSegments, query, data, opts, cb) {

    var path = Array.isArray(pathSegments) ? pathSegments.join('/') : '';
    
    var options = {
        method  : method,
        host    : 'www.pivotaltracker.com',
        url     : 'https://www.pivotaltracker.com/services/v5/' + path,
        headers : {
            "Host"           : "www.pivotaltracker.com",
            "Content-Type"   : "application/json"
        }
    };
    
    if (token) {
        options.headers['X-TrackerToken'] = token;
    }
    
    var q;
    if (typeof query === 'object' && 
    !Array.isArray(query) && query !== null) {
        q = _cleanOutbound(query);
    }
    else {
        q = {};
    }
    q.envelope = true;
    options.qs = q;
    
    if (opts) {
        if (opts.auth) {
            options.auth = {
                user: opts.auth.user,
                pass: opts.auth.pass
            };
        }
    }
    
    if (data) {
        options.json = _cleanOutbound(data);
    }
    
    request(options, function(error, res, data) {
        
        var body = null;
        if (data) {
            if (typeof data === 'string') {
                try {
                    body = JSON.parse(data);
                }
                catch(e) {}
            }
            if (!body) {
                body = data;
            }
        }
        
        if (error) {
            cb(error, null);
        }
        else if (res.statusCode >= 400 && body.data) {
            cb(new ApiError(res.statusCode, _cleanInbound(body.data)), null);
        }
        else if (body && body.data && body.data.error) {
            cb(new ApiError(res.statusCode, _cleanInbound(body.data)), null);
        }
        else {
            cb(null, _cleanInbound(body));
        }
    });
}

function _cleanInbound(obj) {
    if (Array.isArray(obj)) {
        if (!obj.length) {
            return obj;
        }
        else {
            var arr = [];
            obj.forEach(function(ele, index) {
                arr[index] = _cleanInbound(ele);
            });
            return arr;
        }
    }
    else if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    else {
        var cameled = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Array.isArray(obj[key])) {
                    cameled[_toCamelCase(key)] = _cleanInbound(obj[key]);
                }
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    cameled[_toCamelCase(key)] = _cleanInbound(obj[key]);
                }
                else {
                    cameled[_toCamelCase(key)] = obj[key];
                }
            }
        }
        return cameled;
    }
}

function _cleanOutbound(obj) {
    if (Array.isArray(obj)) {
        if (!obj.length) {
            return obj;
        }
        else {
            var arr = [];
            obj.forEach(function(ele, index) {
                arr[index] = _cleanOutbound(ele);
            });
            return arr;
        }
    }
    else if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    else {
        var underscored = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Array.isArray(obj[key])) {
                    underscored[_toUnderscore(key)] = _cleanOutbound(obj[key]);
                }
                else if (_dateOrNull(obj[key])) {
                    underscored[_toUnderscore(key)] = obj[key].toISOString();
                }
                else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    underscored[_toUnderscore(key)] = _cleanOutbound(obj[key]);
                }
                else if (obj[key] !== null && typeof obj[key] !== 'function') {
                    underscored[_toUnderscore(key)] = obj[key];
                }
            }
        }
        return underscored;
    }
}

function _toCamelCase(str) {
    return str.trim(str).replace(/[-_\s]+(.)?/g, function(match, s) { 
        return s ? s.toUpperCase() : '';
    });
}

function _toUnderscore(str) {
    return str.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
}

function _toError(status, data) {
    return new ApiError(status, data);
}

function _stringOrNull(val) {
    return validator.toString(val) || null;
}

function _intOrNull(val) {
    var i;
    if (typeof val === 'number' || typeof val === 'string') {
        i = validator.toInt(val, 10);
    }
    if (!isNaN(i)) {
        return i;
    }
    else {
        return null;
    }
}

function _floatOrNull(val) {
    var f;
    if (typeof val === 'number' || typeof val === 'string') {
        return validator.toFloat(val);
    }
    if (!isNaN(f)) {
        return f;
    }
    else {
        return null;
    }
}

function _booleanOrNull(val) {
    if (typeof val === 'boolean') {
        return val;
    }
    else if (val == 1 || val === '1' || val === 'true') {
        return true;
    }
    else if (val === 0 || val === '0' || val === 'false') {
        return false;
    }
    else {
        return null;
    }
}

function _dateOrNull(val) {
    if (!val) {
        return null;
    }
    else {
        if (util.isDate(val)) {
            return val;
        }
        else if (typeof val === 'number') {
            return new Date(val);
        }
        else if (typeof val === 'string' && val.trim() !== '') {
            return validator.toDate(val);
        }
        else {
            return null;
        }
    }
}

function _arrayOrNull(val) {
    if (Array.isArray(val)) {
        return val;
    }
    else {
        return null;
    }
}

function _objOrNull(val) {
    if (typeof val === 'object' && val !== null) {
        return val;
    }
    else {
        return null;
    }
}

function _queryObjToStr(obj) {
    var str = '';
    // TODO: stuff & things
    return str;
}

exports.api = {
    get      : get,
    post     : post,
    put      : put,
    delete   : del,
    upload   : upload,
    download : download
};

exports.toError = _toError;
exports.stringOrNull = _stringOrNull;
exports.intOrNull = _intOrNull;
exports.floatOrNull = _floatOrNull;
exports.booleanOrNull = _booleanOrNull;
exports.dateOrNull = _dateOrNull;
exports.arrayOrNull = _arrayOrNull;
exports.objOrNull = _objOrNull;
