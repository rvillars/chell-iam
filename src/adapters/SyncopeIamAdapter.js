'use strict';

var chellIam = angular.module('chell-iam');

chellIam.host = 'syncope-cf.cfapps.io';

chellIam.factory('IamAdapter', function ($http, $q, _) {
    return {
        getUserList: function(){
            var deferred = $q.defer();
            $http.get('http://'+chellIam.host+'/cxf/users').success(function(users){
                deferred.resolve(_.map(users, externalToIamUser));
            }).error(function(){
                deferred.reject('An error occured while fetching user list');
            });
            return deferred.promise;
        },
        getGroupList: function(){
            var deferred = $q.defer();
            $http.get('http://'+chellIam.host+'/cxf/roles').success(function(roles){
                deferred.resolve(_.map(roles, externalToIamGroup));
            }).error(function(){
                deferred.reject('An error occured while fetching role list');
            });
            return deferred.promise;
        },
        getAuthenticatedUser: function(){
            var deferred = $q.defer();
            $http.get('http://'+chellIam.host+'/cxf/users/self').success(function(user){
                deferred.resolve(externalToIamUser(user));
            }).error(function(){
                deferred.reject('An error occured while fetching authenticated user');
            });
            return deferred.promise;
        }
    };
});

// *** Mappings ***
// --- User ---
var externalToIamUser = function(externalUser) {
    var iamUser = {};
    iamUser.id = externalUser.id;
    iamUser.login = externalUser.username;
    iamUser.firstname = _.findWhere(externalUser.attributes, {schema: 'firstname'}).values[0];
    iamUser.lastname = _.findWhere(externalUser.attributes, {schema: 'lastname'}).values[0];
    iamUser.fullname = _.findWhere(externalUser.derivedAttributes, {schema: 'fullname'}).values[0];
    iamUser.primaryGroup = externalToIamMembership(externalUser.memberships[0]);
    iamUser.email = _.findWhere(externalUser.attributes, {schema: 'email'}).values[0];
    iamUser.gravatarMail = _.findWhere(externalUser.attributes, {schema: 'gravatarMail'}).values[0];
    iamUser.status = externalUser.status;
    iamUser.creationDate = externalUser.creationDate;
    return iamUser;
};
var iamToExternalUser = function(iamUser) {
    var externalUser = iamUser;
    return externalUser;
};

// --- Group ---
var externalToIamGroup = function(externalGroup) {
    var iamGroup = {};
    iamGroup.id = externalGroup.id;
    iamGroup.name = externalGroup.name;
    iamGroup.parentId = externalGroup.parent;
    return iamGroup;
};
var iamToExternalGroup = function(iamGroup) {
    var externalGroup = iamGroup;
    return externalGroup;
};

// --- Membership ---
var externalToIamMembership = function(externalMembership) {
    var iamGroup = {};
    iamGroup.id = externalMembership.groupId;
    iamGroup.name = externalMembership.groupName;
    return iamGroup;
};
