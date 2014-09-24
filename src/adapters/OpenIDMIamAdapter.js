'use strict';

var chellIam = angular.module('chell-iam');

var host = 'localhost:8888';

chellIam.factory('IamAdapter', function ($http, $q, _) {
    return {
        getUserList: function(){
            var deferred = $q.defer();
            $http.get('http://'+host+'/openidm/managed/user?_queryId=query-all&fields=*').success(function(users){
                deferred.resolve(_.map(users, externalToIamUser));
            }).error(function(){
                deferred.reject('An error occured while fetching user list');
            });
            return deferred.promise;
        },
        getGroupList: function(){
            //implement
        },
        getAuthenticatedUser: function(){
            //implement
        }
    };
});

// *** Mappings ***
// --- User ---
var externalToIamUser = function(externalUser) {
    var iamUser = externalUser; //replace with mapping
    return iamUser;
};
var iamToExternalUser = function(iamUser) {
    var externalUser = iamUser; //replace with mapping
    return externalUser;
};

// --- Group ---
var externalToIamGroup = function(externalGroup) {
    var iamGroup = externalGroup; //replace with mapping
    return iamGroup;
};
var iamToExternalGroup = function(iamGroup) {
    var externalGroup = iamGroup; //replace with mapping
    return externalGroup;
};
