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
        $http.get('http://' + host + '/iam/users').success(function (users) {
          deferred.resolve(_.map(users, externalToIamUser));
        }).error(function () {
          deferred.reject('An error occured while fetching user list');
        });
        return deferred.promise;
      },
      getUser: function (id) {
        var deferred = $q.defer();
        $http.get('http://' + host + '/iam/users/' + id).success(function (user) {
          deferred.resolve(externalToIamUser(user));
        }).error(function () {
          deferred.reject('An error occured while fetching user');
        });
        return deferred.promise;
      },
      getAuthenticatedUser: function () {
        var deferred = $q.defer();
        $http.get('http://' + host + '/iam/users/self').success(function (user) {
          deferred.resolve(externalToIamUser(user));
        }).error(function () {
          deferred.reject('An error occured while fetching authenticated user');
        });
        return deferred.promise;
      },
      createUser: function (user) {
        var deferred = $q.defer();
        $http.post('http://' + host + '/iam/users', iamToExternalUser(user)).success(function (user) {
          deferred.resolve(externalToIamUser(user));
        }).error(function () {
          deferred.reject('An error occured while updating group');
        });
        return deferred.promise;
      },
      updateUser: function (user) {
        var deferred = $q.defer();
        $http.put('http://' + host + '/iam/users/' + user.id, iamToExternalUser(user)).success(function (user) {
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
          url: 'http://' + host + '/iam/users/' + user.id
        }).success(function () {
          deferred.resolve();
        }).error(function () {
          deferred.reject('An error occured while updating user');
        });
        return deferred.promise;
      },
      getGroupList: function () {
        var deferred = $q.defer();
        $http.get('http://' + host + '/iam/groups').success(function (groups) {
          deferred.resolve(_.map(groups, externalToIamGroup));
        }).error(function () {
          deferred.reject('An error occured while fetching group list');
        });
        return deferred.promise;
      },
      getGroup: function (id) {
        var deferred = $q.defer();
        $http.get('http://' + host + '/iam/groups/' + id).success(function (group) {
          deferred.resolve(externalToIamGroup(group));
        }).error(function () {
          deferred.reject('An error occured while fetching group');
        });
        return deferred.promise;
      },
      createGroup: function (group) {
        var deferred = $q.defer();
        $http.post('http://' + host + '/iam/groups', iamToExternalGroup(group)).success(function (group) {
          deferred.resolve(externalToIamGroup(group));
        }).error(function () {
          deferred.reject('An error occured while updating group');
        });
        return deferred.promise;
      },
      updateGroup: function (group) {
        var deferred = $q.defer();
        $http.put('http://' + host + '/iam/groups/' + group.id, iamToExternalGroup(group)).success(function (group) {
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
          url: 'http://' + host + '/iam/groups/' + group.id
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
chellIam.run([
  '$httpBackend',
  '$base64',
  function ($httpBackend, $base64) {
    var mockUserGroup = {
        id: 100,
        name: 'User'
      };
    var mockAdminGroup = {
        id: 101,
        name: 'Administrator',
        parentId: 100
      };
    var mockGroups = [
        mockUserGroup,
        mockAdminGroup
      ];
    var mockAdmin = {
        id: 1,
        login: 'chellAdmin',
        password: 'chellAdmin',
        firstname: 'Chell',
        lastname: 'Admin',
        fullname: 'Chell Admin',
        primaryGroup: externalToIamGroup(mockAdminGroup),
        email: 'chell.admin@mimacom.com',
        status: 'active',
        creationDate: new Date(),
        photo: 'assets/member_admin.png'
      };
    var mockUser = {
        id: 2,
        login: 'chellUser',
        password: 'chellUser',
        firstname: 'Chell',
        lastname: 'User',
        fullname: 'Chell User',
        primaryGroup: externalToIamGroup(mockUserGroup),
        email: 'chell.user@mimacom.com',
        gravatarMail: 'roger.villars@bluewin.ch',
        status: 'active',
        creationDate: new Date(),
        photo: 'assets/member_user.png'
      };
    var mockUsers = [
        mockAdmin,
        mockUser
      ];
    var authenticated = function (headers) {
      if (headers.Authorization == 'Basic ' + $base64.encode(mockAdmin.login + ':' + mockAdmin.password) || headers.Authorization == 'Basic ' + $base64.encode(mockUser.login + ':' + mockUser.password)) {
        return true;
      }
      return false;
    };
    $httpBackend.whenGET(/iam\/users\/[\d]/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var id = url.split('/').pop();
        var existingUser = _.find(mockUsers, function (aUser) {
            return aUser.id == id;
          });
        if (!existingUser) {
          return [404];
        }
        return [
          200,
          existingUser
        ];
      } else {
        return [401];
      }
    });
    $httpBackend.whenGET(/iam\/users\/self/).respond(function (method, url, data, headers) {
      var currentUser = {};
      if (headers.Authorization == 'Basic ' + $base64.encode(mockAdmin.login + ':' + mockAdmin.password)) {
        currentUser = mockAdmin;
      } else {
        currentUser = mockUser;
      }
      return authenticated(headers) ? [
        200,
        currentUser
      ] : [401];
    });
    $httpBackend.whenGET(/iam\/users/).respond(function (method, url, data, headers) {
      return authenticated(headers) ? [
        200,
        mockUsers
      ] : [401];
    });
    $httpBackend.whenPOST(/iam\/users/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var user = JSON.parse(data);
        var currentMaxId = _.max(mockUsers, function (aUser) {
            return aUser.id;
          }).id;
        user.id = ++currentMaxId;
        user.creationDate = new Date();
        user.fullname = user.firstname + ' ' + user.lastname;
        mockUsers.push(user);
        return [
          200,
          user
        ];
      } else {
        return [401];
      }
    });
    $httpBackend.whenPUT(/iam\/users\/[\d]/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var id = url.split('/').pop();
        var user = JSON.parse(data);
        var existingUser = _.find(mockUsers, function (aUser) {
            return aUser.id == id;
          });
        if (!existingUser) {
          return [404];
        }
        var index = mockUsers.indexOf(existingUser);
        mockUsers[index] = user;
        return [
          200,
          user
        ];
      } else {
        return [401];
      }
    });
    $httpBackend.whenDELETE(/iam\/users\/[\d]/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var id = url.split('/').pop();
        var existingUser = _.find(mockUsers, function (aUser) {
            return aUser.id == id;
          });
        if (!existingUser) {
          return [404];
        }
        var index = mockUsers.indexOf(existingUser);
        mockUsers.splice(index, 1);
        return [200];
      } else {
        return [401];
      }
    });
    $httpBackend.whenGET(/iam\/groups\/[\d]/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var id = url.split('/').pop();
        var existingGroup = _.find(mockGroups, function (aGroup) {
            return aGroup.id == id;
          });
        if (!existingGroup) {
          return [404];
        }
        return [
          200,
          existingGroup
        ];
      } else {
        return [401];
      }
    });
    $httpBackend.whenGET(/iam\/groups/).respond(function (method, url, data, headers) {
      return authenticated(headers) ? [
        200,
        mockGroups
      ] : [401];
    });
    $httpBackend.whenPOST(/iam\/groups/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var group = JSON.parse(data);
        var currentMaxId = _.max(mockGroups, function (aGroup) {
            return aGroup.id;
          }).id;
        group.id = ++currentMaxId;
        mockGroups.push(group);
        return [
          200,
          group
        ];
      } else {
        return [401];
      }
    });
    $httpBackend.whenPUT(/iam\/groups\/[\d]/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var id = url.split('/').pop();
        var group = JSON.parse(data);
        var existingGroup = _.find(mockGroups, function (aGroup) {
            return aGroup.id == id;
          });
        if (!existingGroup) {
          return [404];
        }
        var index = mockGroups.indexOf(existingGroup);
        mockGroups[index] = group;
        return [
          200,
          group
        ];
      } else {
        return [401];
      }
    });
    $httpBackend.whenDELETE(/iam\/groups\/[\d]/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var id = url.split('/').pop();
        var existingGroup = _.find(mockGroups, function (aGroup) {
            return aGroup.id == id;
          });
        if (!existingGroup) {
          return [404];
        }
        var index = mockGroups.indexOf(existingGroup);
        mockGroups.splice(index, 1);
        return [200];
      } else {
        return [401];
      }
    });
  }
]);