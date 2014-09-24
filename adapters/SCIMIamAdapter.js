'use strict';
var chellIam = angular.module('chell-iam');
var host = 'undefined';
chellIam.factory('IamAdapter', [
  '$http',
  '$q',
  '_',
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
]);
var externalToIamUser = function (externalUser) {
  var iamUser = externalUser;
  return iamUser;
};
var iamToExternalUser = function (iamUser) {
  var externalUser = iamUser;
  return externalUser;
};
var externalToIamGroup = function (externalGroup) {
  var iamGroup = externalGroup;
  return iamGroup;
};
var iamToExternalGroup = function (iamGroup) {
  var externalGroup = iamGroup;
  return externalGroup;
};