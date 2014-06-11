
var FormData = require('form-data'),
    request = require('request'),
    fs = require('fs'),
    util = require('util');

function get(token, pathSegments, query, options, cb) {
    apiCall('GET', token, pathSegments, query, null, options, cb);
}

function post(token, pathSegments, query, data, options, cb) {
    apiCall('POST', token, pathSegments, query, data, options, cb);
}

function put(token, pathSegments, query, data, options, cb) {
    apiCall('PUT', token, pathSegments, query, data, options, cb);
}

function del(token, pathSegments, query, options, cb) {
    apiCall('DELETE', token, pathSegments, query, null, options, cb);
}

function search(token, pathSegments, query, options, cb) {

    var q;
    if (typeof query === 'object' && query !== null && !Array.isArray(query)) {
        q = query;
    }
    else if (typeof query === 'string') {
        q = {
            query: _queryObjToStr(query)
        };
    }
    apiCall('GET', token, pathSegments, q, null, options, cb);
}

function upload(token, pathSegments, filepath, options, cb) { //cb(error)

    var path = Array.isArray(pathSegments) ? pathSegments.join('/') : '';
    var url = 'https://' + options.pivotalHost + '/services/v5/' + path;

    var form = new FormData();
    form.append('file', fs.createReadStream(filepath));

    form.getLength(function(err,length) {
        var opts = {
            headers: {
                'Content-Length': length,
                'X-TrackerToken': token
            }
        };
        var r = request.post(url, opts, function(error, res, body) {

            if (typeof body === 'string') {
                try {
                    body = JSON.parse(body);
                }
                catch(e) {
                    error = error || e;
                }
            }
            cb(error, _cleanInbound(body));
        });
        r._form = form;
    });
}

function download(token, pathSegments, filepath, options, cb) { //cb(error)

    var path = Array.isArray(pathSegments) ? pathSegments.join('/') : '';
    var opts = {
        url: 'https://' + options.pivotalHost + '/' + path,
        headers: {
            'X-TrackerToken': token
        }
    };

    var calledBack = false;
    var finished = function (error) {
        if (!calledBack) {
            calledBack = true;
            cb(error);
        }
    };
    request.get(opts, finished).pipe(fs.createWriteStream(filepath));
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
        host    : opts.pivotalHost,
        url     : 'https://' + opts.pivotalHost + '/services/v5/' + path,
        headers : {
            "Host"           : opts.pivotalHost,
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
                catch(e) {
                    error = error || e;
                }
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
                else if (typeof obj[key] === 'object' && obj[key] !== null) {
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
                else if (util.isDate(obj[key])) {
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

    return val != null ? val.toString() : null;
}

function _intOrNull(val) {

    if (typeof val === 'number' || typeof val === 'string') {
        val = parseInt(val, 10);
        return !isNaN(val) ? val : null;
    }
    else {
        return null;
    }
}

function _floatOrNull(val) {

    if (typeof val === 'number' || typeof val === 'string') {
        val = parseFloat(val);
    }
    return !isNaN(val) ? val : null;
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
    else if (util.isDate(val)) {
        return val;
    }
    else if (typeof val === 'number') {
        val = new Date(val);
        return util.isDate(val) ? val : null;
    }
    else {
        val = Date.parse(val);
        return !isNaN(val) ? new Date(val) : null;
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

    if (typeof val === 'object' && !Array.isArray(val)) {
        return val;
    }
    else {
        return null;
    }
}

function _queryObjToStr(obj) {

    var str = '';

    if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {

        for (var key in obj) {

            if (obj.hasOwnProperty(key)) {

                str += key + ':';

                if (typeof obj[key] === 'string' || typeof obj[key] === 'number' || typeof obj[key] === 'boolean') {
                    str += obj[key];
                }
                else if (util.isDate(obj[key])) {
                    str += obj[key].toISOString();
                }
                else if (Array.isArray(obj[key]) && obj[key].length) {
                    for (var i = 0, len = obj[key].length; i < len; i++) {
                        if (i) {
                            str += ',';
                        }
                        str += obj[key][i];
                    }
                }

                str += ' ';
            }
        }
    }
    return str.trim();
}

function _inspect(obj, indent) {

    var str = '';
    if (obj === null) {
        str = 'null';
    }
    else if (typeof obj === 'undefined') {
        str += 'undefined';
    }
    else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
        str += obj;
    }
    else if (util.isDate(obj)) {
        str += obj.toISOString();
    }
    else if (Array.isArray(obj)) {
        if (obj.length === 0) {
            str += '[]';
        }
        else {
            str += '[';
            for (var i = 0, len = obj.length; i < len; i++) {
                str += _inspect(obj[i]);
            }
            str += ']';
        }
    }
    else if (typeof obj !== 'function') {
        indent = (indent || '');
        str += '{\n';
        var first = true;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!first) {
                    str += ',\n';
                }
                str += indent + '  ' + key + ': ' + _inspect(obj[key], indent + '  ');
                first = false;
            }
        }
        str +=  '\n' + indent + '}';
    }
    return str;
}

exports.api = {
    get      : get,
    post     : post,
    put      : put,
    delete   : del,
    search   : search,
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
exports.inspect = _inspect;
