'use strict';
var chellIam = angular.module('chell-iam');
chellIam.run([
  '$httpBackend',
  '$base64',
  function ($httpBackend, $base64) {
    var mockUserGroup = {
        schemas: ['urn:ietf:params:scim:schemas:core:2.0:Group'],
        id: 'e9e304ba-f08f-4409-8486-d5c6a43166ee',
        displayName: 'Users',
        members: [
          {
            value: '2832c223-7f76-453a-8d9d-413331904629',
            display: 'Chell User',
            type: 'User'
          },
          {
            value: '2819c223-7f76-453a-919d-413861904646',
            display: 'Chell Admin',
            type: 'User'
          },
          {
            value: 'e9e30dba-f08f-4109-8486-d5c6a331660a',
            display: 'Administrators',
            type: 'Group'
          }
        ],
        meta: { created: '2010-01-23T04:56:22Z' }
      };
    var mockAdminGroup = {
        schemas: ['urn:ietf:params:scim:schemas:core:2.0:Group'],
        id: 'e9e30dba-f08f-4109-8486-d5c6a331660a',
        displayName: 'Administrators',
        members: [{
            'value': '2819c223-7f76-453a-919d-413861904646',
            'display': 'Chell Admin',
            type: 'User'
          }],
        meta: { created: '2010-01-23T04:56:22Z' }
      };
    var mockGroups = [
        mockUserGroup,
        mockAdminGroup
      ];
    var mockAdmin = {
        schemas: ['urn:ietf:params:scim:schemas:core:2.0:User'],
        id: '2819c223-7f76-453a-919d-413861904646',
        externalId: '42',
        userName: 'chellAdmin',
        name: {
          formatted: 'Chell Admin',
          familyName: 'Admin',
          givenName: 'Chell'
        },
        emails: [
          {
            value: 'chell.admin@mimacom.com',
            type: 'Work',
            primery: true
          },
          {
            value: 'chell.admin.gravatar@mimacom.com',
            type: 'Gravatar'
          }
        ],
        phoneNumbers: [
          {
            value: '+41 12 345 67 89',
            type: 'Work'
          },
          {
            value: '+49 98 765 43 21',
            type: 'Private'
          }
        ],
        ims: [{
            value: 'chell.mimacom',
            type: 'Skype'
          }],
        photos: [{
            'value': 'assets/member_admin.png',
            'type': 'photo'
          }],
        title: 'Dipl. Ing. FH',
        preferredLanguage: 'en_US',
        active: true,
        password: 'chellAdmin',
        groups: [
          {
            value: 'e9e30dba-f08f-4109-8486-d5c6a331660a',
            display: 'Administrators'
          },
          {
            value: 'e9e304ba-f08f-4409-8486-d5c6a43166ee',
            display: 'Users'
          }
        ],
        meta: { created: '2010-01-23T04:56:22Z' }
      };
    var mockUser = {
        schemas: ['urn:ietf:params:scim:schemas:core:2.0:User'],
        id: '2832c223-7f76-453a-8d9d-413331904629',
        userName: 'chellUser',
        name: {
          formatted: 'Chell User',
          familyName: 'User',
          givenName: 'Chell'
        },
        emails: [
          {
            value: 'chell.user.work@mimacom.com',
            type: 'Work',
            primery: true
          },
          {
            value: 'chell.user.home@mimacom.com',
            type: 'Private'
          }
        ],
        photos: [{
            'value': '../assets/member_user.png',
            'type': 'photo'
          }],
        preferredLanguage: 'en_US',
        active: false,
        password: 'chellUser',
        groups: [{
            display: 'Users',
            value: 'e9e304ba-f08f-4409-8486-d5c6a43166ee'
          }],
        meta: { created: '2012-06-12T04:56:22Z' }
      };
    var mockUsers = [
        mockAdmin,
        mockUser
      ];
    var authenticated = function (headers) {
      if (headers.Authorization == 'Basic ' + $base64.encode(mockAdmin.userName + ':' + mockAdmin.password) || headers.Authorization == 'Basic ' + $base64.encode(mockUser.userName + ':' + mockUser.password)) {
        return true;
      }
      return false;
    };
    $httpBackend.whenGET(/iam\/Users\/[\d]/).respond(function (method, url, data, headers) {
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
    $httpBackend.whenGET(/iam\/Users\/self/).respond(function (method, url, data, headers) {
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
    $httpBackend.whenGET(/iam\/Users/).respond(function (method, url, data, headers) {
      return authenticated(headers) ? [
        200,
        mockUsers
      ] : [401];
    });
    $httpBackend.whenPOST(/iam\/Users/).respond(function (method, url, data, headers) {
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
    $httpBackend.whenPUT(/iam\/Users\/[\d]/).respond(function (method, url, data, headers) {
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
    $httpBackend.whenDELETE(/iam\/Users\/[\d]/).respond(function (method, url, data, headers) {
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
    $httpBackend.whenGET(/iam\/Groups\/[\d]/).respond(function (method, url, data, headers) {
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
    $httpBackend.whenGET(/iam\/Groups/).respond(function (method, url, data, headers) {
      return authenticated(headers) ? [
        200,
        mockGroups
      ] : [401];
    });
    $httpBackend.whenPOST(/iam\/Groups/).respond(function (method, url, data, headers) {
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
    $httpBackend.whenPUT(/iam\/Groups\/[\d]/).respond(function (method, url, data, headers) {
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
    $httpBackend.whenDELETE(/iam\/Groups\/[\d]/).respond(function (method, url, data, headers) {
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