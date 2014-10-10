'use strict';
var chellIam = angular.module('chell-iam');
var host = 'undefined';
chellIam.factory('IamAdapter',
    function ($http, $q, _) {
        return {
            getUserList: function () {
                var deferred = $q.defer();
                $http.get('http://' + host + '/iam/Users').success(function (users) {
                    deferred.resolve(_.map(users, externalToIamUser));
                }).error(function () {
                    deferred.reject('An error occured while fetching user list');
                });
                return deferred.promise;
            },
            getUser: function (id) {
                var deferred = $q.defer();
                $http.get('http://' + host + '/iam/Users/' + id).success(function (user) {
                    deferred.resolve(externalToIamUser(user));
                }).error(function () {
                    deferred.reject('An error occured while fetching user');
                });
                return deferred.promise;
            },
            getAuthenticatedUser: function () {
                var deferred = $q.defer();
                $http.get('http://' + host + '/iam/Users/self').success(function (user) {
                    deferred.resolve(externalToIamUser(user));
                }).error(function () {
                    deferred.reject('An error occured while fetching authenticated user');
                });
                return deferred.promise;
            },
            createUser: function (user) {
                var deferred = $q.defer();
                $http.post('http://' + host + '/iam/Users', iamToExternalUser(user)).success(function (user) {
                    deferred.resolve(externalToIamUser(user));
                }).error(function () {
                    deferred.reject('An error occured while updating group');
                });
                return deferred.promise;
            },
            updateUser: function (user) {
                var deferred = $q.defer();
                $http.put('http://' + host + '/iam/Users/' + user.id, iamToExternalUser(user)).success(function (user) {
                    deferred.resolve(externalToIamUser(user));
                }).error(function () {
                    deferred.reject('An error occured while updating user');
                });
                return deferred.promise;
            },
            removeUser: function (user) {
                var deferred = $q.defer();
                $http({
                    method: 'DELETE',
                    url: 'http://' + host + '/iam/Users/' + user.id
                }).success(function () {
                    deferred.resolve();
                }).error(function () {
                    deferred.reject('An error occured while updating user');
                });
                return deferred.promise;
            },
            getGroupList: function () {
                var deferred = $q.defer();
                $http.get('http://' + host + '/iam/Groups').success(function (groups) {
                    deferred.resolve(_.map(groups, externalToIamGroup));
                }).error(function () {
                    deferred.reject('An error occured while fetching group list');
                });
                return deferred.promise;
            },
            getGroup: function (id) {
                var deferred = $q.defer();
                $http.get('http://' + host + '/iam/Groups/' + id).success(function (group) {
                    deferred.resolve(externalToIamGroup(group));
                }).error(function () {
                    deferred.reject('An error occured while fetching group');
                });
                return deferred.promise;
            },
            createGroup: function (group) {
                var deferred = $q.defer();
                $http.post('http://' + host + '/iam/Groups', iamToExternalGroup(group)).success(function (group) {
                    deferred.resolve(externalToIamGroup(group));
                }).error(function () {
                    deferred.reject('An error occured while updating group');
                });
                return deferred.promise;
            },
            updateGroup: function (group) {
                var deferred = $q.defer();
                $http.put('http://' + host + '/iam/Groups/' + group.id, iamToExternalGroup(group)).success(function (group) {
                    deferred.resolve(externalToIamGroup(group));
                }).error(function () {
                    deferred.reject('An error occured while updating group');
                });
                return deferred.promise;
            },
            removeGroup: function (group) {
                var deferred = $q.defer();
                $http({
                    method: 'DELETE',
                    url: 'http://' + host + '/iam/Groups/' + group.id
                }).success(function () {
                    deferred.resolve();
                }).error(function () {
                    deferred.reject('An error occured while updating group');
                });
                return deferred.promise;
            }
        };
    }
);
var externalToIamUser = function (externalUser) {
    var iamUser = {};
    iamUser.id = externalUser.id;
    iamUser.externalId = externalUser.externalId;
    iamUser.login = externalUser.userName;
    iamUser.password = externalUser.password;
    iamUser.fullname = externalUser.displayName;
    iamUser.firstname = externalUser.name.givenName;
    iamUser.lastname = externalUser.name.familyName;
    iamUser.title = externalUser.title;
    iamUser.emails = externalUser.emails;
    iamUser.addresses = externalUser.addresses;
    iamUser.phones = externalUser.phoneNumbers;
    iamUser.ims = externalUser.ims;
    iamUser.gravatarMail = !_.isUndefined(_.findWhere(externalUser.emails, { type: 'Gravatar' }))?_.findWhere(externalUser.emails, { type: 'Gravatar' }).value:null;
    iamUser.active = externalUser.active;
    iamUser.status = externalUser.active ? 'activated' : 'inactive';
    iamUser.language = externalUser.preferredLanguage;
    iamUser.creationDate = externalUser.meta.created;
    iamUser.groups = externalUser.groups;
    iamUser.photo = !_.isUndefined(_.findWhere(externalUser.photos, { type: 'photo' }))?_.findWhere(externalUser.photos, { type: 'photo' }).value:null;
    return iamUser;
};
var iamToExternalUser = function (iamUser) {
    var externalUser = {};
    externalUser.schemas = ['urn:ietf:params:scim:schemas:core:2.0:User'];
    externalUser.id = iamUser.id;
    externalUser.externalId = iamUser.externalId;
    externalUser.userName = iamUser.login;
    externalUser.displayName = iamUser.fullname;
    if (!externalUser.name){externalUser.name = {};}
    externalUser.name.givenName = iamUser.firstname;
    externalUser.name.familyName = iamUser.lastname;
    externalUser.title = iamUser.title;
    externalUser.emails = iamUser.emails;
    externalUser.addresses = iamUser.addresses;
    externalUser.phoneNumbers = iamUser.phones;
    externalUser.ims = iamUser.ims;
    externalUser.active = iamUser.active;
    externalUser.preferredLanguage = iamUser.language;
    if (!externalUser.meta){externalUser.meta = {};}
    externalUser.meta.created = iamUser.creationDate;
    externalUser.groups = iamUser.groups;
    return externalUser;
};
var externalToIamGroup = function (externalGroup) {
    var iamGroup = {};
    iamGroup.schemas = externalGroup.schemas;
    iamGroup.id = externalGroup.id;
    iamGroup.name = externalGroup.displayName;
    iamGroup.members = externalGroup.members;
    iamGroup.meta = externalGroup.meta;
    return iamGroup;
};
var iamToExternalGroup = function (iamGroup) {
    var externalGroup = {};
    externalGroup.schemas = ['urn:ietf:params:scim:schemas:core:2.0:Group'];
    externalGroup.id = iamGroup.id;
    externalGroup.displayName = iamGroup.name;
    externalGroup.members = iamGroup.members;
    externalGroup.meta = iamGroup.meta;
    return externalGroup;
};