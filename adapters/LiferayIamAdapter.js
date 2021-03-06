'use strict';
var chellIam = angular.module('chell-iam');
var host = 'localhost:8080';
var companyId = '10157';
chellIam.factory('IamAdapter', [
  '$http',
  '$q',
  '_',
  function ($http, $q, _) {
    return {
      getUserList: function () {
        var deferred = $q.defer();
        $http.get('http://' + host + '/api/jsonws/user/get-company-users/company-id/' + companyId + '/start/1/end/1000').success(function (users) {
          deferred.resolve(_.map(users, externalToIamUser));
        }).error(function () {
          deferred.reject('An error occured while fetching user list');
        });
        return deferred.promise;
      },
      getGroupList: function () {
      },
      getAuthenticatedUser: function () {
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