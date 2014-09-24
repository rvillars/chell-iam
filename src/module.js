'use strict';

var chellIam = angular.module('chell-iam', [
    'templates-chell-iam',
    'ngTable',
    'underscore',
    'angular-underscore',
    'http-auth-interceptor',
    'ui.bootstrap',
    'angular-md5',
    'pascalprecht.translate',
    'translations',
    'base64',
    'ngMockE2E'
]);

chellIam.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

chellIam.run(function(CurrentUserService, IamUser) {
    CurrentUserService.authPromise = IamUser.self().then(function(user){
        CurrentUserService.setCurrentUser(user);
        return user;
    });
});

chellIam.filter('md5', function(md5) {
    return function(input) {
        return md5.createHash(input);
    };
});