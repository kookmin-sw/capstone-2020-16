/*jshint esversion: 6 */
/*global fetch, btoa */
import Q from 'q';
/**
 * algorithm battle service API 문서화
 * @class ApiFuncs
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
let ApiFuncs = (function() {
    // 'use strict';
    this.domain = '';
    function ApiFuncs(options) {
        let domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'http://203.246.113.176:8000';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.basic = (typeof options === 'object') ? (options.basic ? options.basic : {}) : {};
    }

    function serializeQueryParams(parameters) {
        let str = [];
        for (let p in parameters) {
            if (parameters.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(parameters[p]));
            }
        }
        return str.join('&');
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    let parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name ApiFuncs#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    ApiFuncs.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred) {
        const queryParams = queryParameters && Object.keys(queryParameters).length ? serializeQueryParams(queryParameters) : null;
        const urlWithParams = url + (queryParams ? '?' + queryParams : '');

        if (body && !Object.keys(body).length) {
            body = undefined;
        }

        fetch(urlWithParams, {
            method,
            headers,
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json();
        }).then((body) => {
            deferred.resolve(body);
        }).catch((error) => {
            deferred.reject(error);
        });
    };

    /**
     * Set Basic Auth
     * @method
     * @name ApiFuncs#setBasicAuth
     * @param {string} username
     * @param {string} password
     */
    ApiFuncs.prototype.setBasicAuth = function(username, password) {
        this.basic.username = username;
        this.basic.password = password;
    };
    /**
     * Set Auth headers
     * @method
     * @name ApiFuncs#setAuthHeaders
     * @param {object} headerParams - headers object
     */
    ApiFuncs.prototype.setAuthHeaders = function(headerParams) {
        let headers = headerParams ? headerParams : {};
        if (this.basic.username && this.basic.password) {
            headers['Authorization'] = 'Basic ' + btoa(this.basic.username + ':' + this.basic.password);
        }
        return headers;
    };

    /**
     * 
     * @method
     * @name ApiFuncs#api_article_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.tag - 
     * @param {string} parameters.search - A search term.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_article_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/article/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['tag'] !== undefined) {
            queryParameters['tag'] = parameters['tag'];
        }

        if (parameters['search'] !== undefined) {
            queryParameters['search'] = parameters['search'];
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_article_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_article_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/article/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_article_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 게시글정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_article_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/article/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_article_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 게시글정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_article_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/article/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_article_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 게시글정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_article_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/article/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_article_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 게시글정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_article_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/article/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_articlefull_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.tag - 
     * @param {string} parameters.search - A search term.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_articlefull_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/articlefull/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['tag'] !== undefined) {
            queryParameters['tag'] = parameters['tag'];
        }

        if (parameters['search'] !== undefined) {
            queryParameters['search'] = parameters['search'];
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_articlefull_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_articlefull_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/articlefull/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_articlefull_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 게시글정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_articlefull_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/articlefull/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_articlefull_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 게시글정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_articlefull_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/articlefull/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_articlefull_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 게시글정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_articlefull_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/articlefull/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_articlefull_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 게시글정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_articlefull_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/articlefull/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_code_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.author - 
     * @param {string} parameters.problem - 
     * @param {string} parameters.availableGame - 
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_code_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/code/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['author'] !== undefined) {
            queryParameters['author'] = parameters['author'];
        }

        if (parameters['problem'] !== undefined) {
            queryParameters['problem'] = parameters['problem'];
        }

        if (parameters['availableGame'] !== undefined) {
            queryParameters['available_game'] = parameters['availableGame'];
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_code_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_code_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/code/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_code_my_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_code_my_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/code/my';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_code_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 코드정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_code_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/code/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_code_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 코드정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_code_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/code/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_code_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 코드정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_code_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/code/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_code_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 코드정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_code_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/code/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_comment_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_comment_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/comment/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_comment_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_comment_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/comment/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_comment_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 댓글 정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_comment_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/comment/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_comment_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 댓글 정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_comment_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/comment/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_comment_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 댓글 정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_comment_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/comment/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_comment_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 댓글 정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_comment_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/comment/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_friend_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_friend_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/friend/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_friend_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_friend_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/friend/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_friend_read
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_friend_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/friend/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_friend_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_friend_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/friend/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_friend_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_friend_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/friend/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_friend_delete
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_friend_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/friend/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_game_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.problem - 
     * @param {string} parameters.challenger - 
     * @param {string} parameters.opposite - 
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_game_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/game/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['problem'] !== undefined) {
            queryParameters['problem'] = parameters['problem'];
        }

        if (parameters['challenger'] !== undefined) {
            queryParameters['challenger'] = parameters['challenger'];
        }

        if (parameters['opposite'] !== undefined) {
            queryParameters['opposite'] = parameters['opposite'];
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_game_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_game_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/game/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_game_my_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_game_my_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/game/my';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_game_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 게임정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_game_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/game/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_game_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 게임정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_game_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/game/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_game_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 게임정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_game_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/game/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_game_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 게임정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_game_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/game/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_group_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_group_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/group/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_group_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_group_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/group/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_group_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 그룹.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_group_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/group/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_group_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 그룹.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_group_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/group/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_group_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 그룹.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_group_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/group/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_group_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 그룹.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_group_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/group/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupInfo_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupInfo_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupInfo/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupInfo_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupInfo_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupInfo/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupInfo_read
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.group - A unique value identifying this 그룹정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupInfo_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupInfo/{group}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{group}', parameters['group']);

        if (parameters['group'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: group'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupInfo_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.group - A unique value identifying this 그룹정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupInfo_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupInfo/{group}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{group}', parameters['group']);

        if (parameters['group'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: group'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupInfo_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.group - A unique value identifying this 그룹정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupInfo_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupInfo/{group}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{group}', parameters['group']);

        if (parameters['group'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: group'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupInfo_delete
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.group - A unique value identifying this 그룹정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupInfo_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupInfo/{group}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{group}', parameters['group']);

        if (parameters['group'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: group'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupfullInfo_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupfullInfo_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupfullInfo/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupfullInfo_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupfullInfo_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupfullInfo/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupfullInfo_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 그룹.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupfullInfo_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupfullInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupfullInfo_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 그룹.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupfullInfo_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupfullInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupfullInfo_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 그룹.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupfullInfo_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupfullInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_groupfullInfo_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 그룹.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_groupfullInfo_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/groupfullInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_language_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_language_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/language/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_language_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_language_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/language/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_language_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 언어.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_language_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/language/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_language_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 언어.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_language_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/language/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_language_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 언어.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_language_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/language/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_language_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 언어.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_language_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/language/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_notice_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_notice_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/notice/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_notice_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_notice_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/notice/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_notice_read
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_notice_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/notice/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_notice_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_notice_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/notice/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_notice_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_notice_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/notice/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_notice_delete
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_notice_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/notice/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_problem_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_problem_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/problem/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_problem_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_problem_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/problem/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_problem_read
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_problem_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/problem/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_problem_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_problem_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/problem/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_problem_delete
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_problem_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/problem/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check the credentials and return the REST Token
    if the credentials are valid and authenticated.
    Calls Django Auth login method to register User ID
    in Django session framework

    Accept the following POST parameters: username, password
    Return the REST Framework Token Object's key.
     * @method
     * @name ApiFuncs#api_rest_auth_login_create
     * @param {object} parameters - method options and parameters
         * @param {} parameters.data - ONEPANMAN API 문서화
         * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_rest_auth_login_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/rest-auth/login/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Accepts/Returns nothing.
     * @method
     * @name ApiFuncs#api_rest_auth_logout_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_rest_auth_logout_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/rest-auth/logout/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Accepts/Returns nothing.
     * @method
     * @name ApiFuncs#api_rest_auth_logout_create
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_rest_auth_logout_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/rest-auth/logout/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Accepts the following POST parameters: email
    Returns the success/fail message.
     * @method
     * @name ApiFuncs#api_rest_auth_password_reset_create
     * @param {object} parameters - method options and parameters
         * @param {} parameters.data - ONEPANMAN API 문서화
         * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_rest_auth_password_reset_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/rest-auth/password/reset/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Accepts the following POST parameters: token, uid,
        new_password1, new_password2
    Returns the success/fail message.
     * @method
     * @name ApiFuncs#api_rest_auth_password_reset_confirm_create
     * @param {object} parameters - method options and parameters
         * @param {} parameters.data - ONEPANMAN API 문서화
         * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_rest_auth_password_reset_confirm_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/rest-auth/password/reset/confirm/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_rest_auth_registration_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_rest_auth_registration_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/rest-auth/registration/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_rest_auth_registration_verify_email_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_rest_auth_registration_verify_email_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/rest-auth/registration/verify-email/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_ruleInfo_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_ruleInfo_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/ruleInfo/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_ruleInfo_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_ruleInfo_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/ruleInfo/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_ruleInfo_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 규칙정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_ruleInfo_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/ruleInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_ruleInfo_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 규칙정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_ruleInfo_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/ruleInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_ruleInfo_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 규칙정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_ruleInfo_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/ruleInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_ruleInfo_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 규칙정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_ruleInfo_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/ruleInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_testcase_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.problem - 
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_testcase_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/testcase/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['problem'] !== undefined) {
            queryParameters['problem'] = parameters['problem'];
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_testcase_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_testcase_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/testcase/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_testcase_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 테스트케이스.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_testcase_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/testcase/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_testcase_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 테스트케이스.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_testcase_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/testcase/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_testcase_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 테스트케이스.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_testcase_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/testcase/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_testcase_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 테스트케이스.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_testcase_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/testcase/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_user_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_user_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/user/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_user_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_user_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/user/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_user_my_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_user_my_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/user/my';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_user_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 사용자.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_user_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/user/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_user_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 사용자.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_user_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/user/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_user_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 사용자.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_user_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/user/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_user_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 사용자.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_user_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/user/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInfo_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInfo_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInfo/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInfo_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInfo_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInfo/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInfo_my_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInfo_my_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInfo/my';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInfo_read
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.user - A unique value identifying this 유저 정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInfo_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInfo/{user}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{user}', parameters['user']);

        if (parameters['user'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: user'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInfo_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.user - A unique value identifying this 유저 정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInfo_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInfo/{user}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{user}', parameters['user']);

        if (parameters['user'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: user'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInfo_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.user - A unique value identifying this 유저 정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInfo_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInfo/{user}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{user}', parameters['user']);

        if (parameters['user'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: user'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInfo_delete
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.user - A unique value identifying this 유저 정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInfo_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInfo/{user}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{user}', parameters['user']);

        if (parameters['user'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: user'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInformationInProblem_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.user - 
     * @param {string} parameters.problem - 
     * @param {string} parameters.tier - 
     * @param {number} parameters.score - 
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInformationInProblem_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInformationInProblem/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['user'] !== undefined) {
            queryParameters['user'] = parameters['user'];
        }

        if (parameters['problem'] !== undefined) {
            queryParameters['problem'] = parameters['problem'];
        }

        if (parameters['tier'] !== undefined) {
            queryParameters['tier'] = parameters['tier'];
        }

        if (parameters['score'] !== undefined) {
            queryParameters['score'] = parameters['score'];
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInformationInProblem_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInformationInProblem_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInformationInProblem/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInformationInProblem_my_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInformationInProblem_my_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInformationInProblem/my';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInformationInProblem_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 문제:유저점수정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInformationInProblem_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInformationInProblem/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInformationInProblem_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 문제:유저점수정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInformationInProblem_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInformationInProblem/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInformationInProblem_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 문제:유저점수정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInformationInProblem_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInformationInProblem/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userInformationInProblem_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 문제:유저점수정보.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userInformationInProblem_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userInformationInProblem/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userfullInfo_list
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userfullInfo_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userfullInfo/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userfullInfo_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userfullInfo_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userfullInfo/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userfullInfo_read
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 사용자.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userfullInfo_read = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userfullInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userfullInfo_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 사용자.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userfullInfo_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userfullInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userfullInfo_partial_update
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     * @param {integer} parameters.id - A unique integer value identifying this 사용자.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userfullInfo_partial_update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userfullInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#api_userfullInfo_delete
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - A unique integer value identifying this 사용자.
     * @param {string} parameters.version - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.api_userfullInfo_delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/api/{version}/userfullInfo/{id}/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        path = path.replace('{version}', parameters['version']);

        if (parameters['version'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: version'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Check the credentials and return the REST Token
    if the credentials are valid and authenticated.
    Calls Django Auth login method to register User ID
    in Django session framework

    Accept the following POST parameters: username, password
    Return the REST Framework Token Object's key.
     * @method
     * @name ApiFuncs#rest_auth_login_create
     * @param {object} parameters - method options and parameters
         * @param {} parameters.data - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.rest_auth_login_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/rest-auth/login/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Accepts/Returns nothing.
     * @method
     * @name ApiFuncs#rest_auth_logout_list
     * @param {object} parameters - method options and parameters
     */
    ApiFuncs.prototype.rest_auth_logout_list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/rest-auth/logout/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Accepts/Returns nothing.
     * @method
     * @name ApiFuncs#rest_auth_logout_create
     * @param {object} parameters - method options and parameters
     */
    ApiFuncs.prototype.rest_auth_logout_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/rest-auth/logout/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Accepts the following POST parameters: email
    Returns the success/fail message.
     * @method
     * @name ApiFuncs#rest_auth_password_reset_create
     * @param {object} parameters - method options and parameters
         * @param {} parameters.data - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.rest_auth_password_reset_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/rest-auth/password/reset/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Accepts the following POST parameters: token, uid,
        new_password1, new_password2
    Returns the success/fail message.
     * @method
     * @name ApiFuncs#rest_auth_password_reset_confirm_create
     * @param {object} parameters - method options and parameters
         * @param {} parameters.data - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.rest_auth_password_reset_confirm_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/rest-auth/password/reset/confirm/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#rest_auth_registration_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.rest_auth_registration_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/rest-auth/registration/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name ApiFuncs#rest_auth_registration_verify_email_create
     * @param {object} parameters - method options and parameters
     * @param {} parameters.data - ONEPANMAN API 문서화
     */
    ApiFuncs.prototype.rest_auth_registration_verify_email_create = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/rest-auth/registration/verify-email/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['data'] !== undefined) {
            body = parameters['data'];
        }

        if (parameters['data'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };

    return ApiFuncs;
})();

export default ApiFuncs;