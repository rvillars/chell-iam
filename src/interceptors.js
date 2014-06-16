'use strict';

var httpAuthInterceptor = angular.module('http-auth-interceptor', ['http-auth-interceptor-buffer']);

httpAuthInterceptor.factory('authService', function ($rootScope, httpBuffer) {
    return {
        wrongCredentials: false,
        /**
         * Call this function to indicate that authentication was successfull and trigger a
         * retry of all deferred requests.
         * @param data an optional argument to pass on to $broadcast which may be useful for
         * example if you need to pass through details of the user that was logged in
         */
        loginConfirmed: function (data, configUpdater) {
            var updater = configUpdater || function (config) {
                return config;
            };
            $rootScope.$broadcast('event:auth-loginConfirmed', data);
            httpBuffer.retryAll(updater);
        },

        /**
         * Call this function to indicate that authentication should not proceed.
         * All deferred requests will be abandoned or rejected (if reason is provided).
         * @param data an optional argument to pass on to $broadcast.
         * @param reason if provided, the requests are rejected; abandoned otherwise.
         */
        loginCancelled: function (data, reason) {
            httpBuffer.rejectAll(reason);
            $rootScope.$broadcast('event:auth-loginCancelled', data);
        }
    };
});

/**
 * $http interceptor.
 * On 401 response (without 'ignoreAuthModule' option) stores the request
 * and broadcasts 'event:angular-auth-loginRequired'.
 */
httpAuthInterceptor.factory('authInterceptor', function ($rootScope, $q, httpBuffer, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401 && !rejection.config.ignoreAuthModule) {
                var deferred = $q.defer();
                httpBuffer.append(rejection.config, deferred);
                $rootScope.$broadcast('event:auth-loginRequired', rejection);
                return deferred.promise;
            }
            // otherwise, default behaviour
            return $q.reject(rejection);
        }
    };
});

/**
 * Interceptor registration
 */
httpAuthInterceptor.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

/**
 * Private module, a utility, required internally by 'http-auth-interceptor'.
 */
var httpAuthInterceptorBuffer = angular.module('http-auth-interceptor-buffer', []);

httpAuthInterceptorBuffer.factory('httpBuffer', function ($injector) {
    /** Holds all the requests, so they can be re-requested in future. */
    var buffer = [];

    /** Service initialized later because of circular dependency problem. */
    var $http;

    function retryHttpRequest(config, deferred) {
        function successCallback(response) {
            deferred.resolve(response);
        }

        function errorCallback(response) {
            deferred.reject(response);
        }

        $http = $http || $injector.get('$http');
        $http(config).then(successCallback, errorCallback);
    }

    return {
        /**
         * Appends HTTP request configuration object with deferred response attached to buffer.
         */
        append: function (config, deferred) {
            buffer.push({
                config: config,
                deferred: deferred
            });
        },

        /**
         * Abandon or reject (if reason provided) all the buffered requests.
         */
        rejectAll: function (reason) {
            if (reason) {
                for (var i = 0; i < buffer.length; ++i) {
                    buffer[i].deferred.reject(reason);
                }
            }
            buffer = [];
        },

        /**
         * Retries all the buffered requests clears the buffer.
         */
        retryAll: function (updater) {
            for (var i = 0; i < buffer.length; ++i) {
                retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
            }
            buffer = [];
        }
    };
});