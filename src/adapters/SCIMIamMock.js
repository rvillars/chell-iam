'use strict';
var chellIam = angular.module('chell-iam');
chellIam.run(
    function ($httpBackend, $base64, uuid) {
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
            members: [
                {
                    'value': '2819c223-7f76-453a-919d-413861904646',
                    'display': 'Chell Admin',
                    type: 'User'
                }
            ],
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
                familyName: 'Admin',
                givenName: 'Chell'
            },
            displayName: 'Chell Admin',
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
            addresses: [
                {
                    type: 'Work',
                    streetAddress: 'Galgenfeldweg 16',
                    locality: 'Bern',
                    region: 'Bern',
                    postalCode: '3006',
                    country: 'CH',
                    primary: true
                },
                {
                    type: 'Private',
                    streetAddress: 'Dreikönigstrasse 31 A',
                    locality: 'Zurich',
                    region: 'Zurich',
                    postalCode: '8002',
                    country: 'CH'
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
            ims: [
                {
                    value: 'chell.mimacom',
                    type: 'Skype'
                }
            ],
            photos: [
                {
                    'value': 'assets/member_admin.png',
                    'type': 'photo'
                }
            ],
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
                familyName: 'User',
                givenName: 'Chell'
            },
            displayName: 'Chell User',
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
            photos: [
                {
                    'value': '../assets/member_user.png',
                    'type': 'photo'
                }
            ],
            preferredLanguage: 'en_US',
            active: false,
            password: 'chellUser',
            groups: [
                {
                    display: 'Users',
                    value: 'e9e304ba-f08f-4409-8486-d5c6a43166ee'
                }
            ],
            meta: { created: '2012-06-12T04:56:22Z' }
        };
        var mockUsers = [
            mockAdmin,
            mockUser
        ];
        var authenticated = function (headers) {
            if (headers.Authorization == null) return false;
            var userName = $base64.decode(headers.Authorization.split(' ')[1]).split(':')[0];
            var currentUser = _.findWhere(mockUsers, {userName: userName});
            var validUserCredentials = 'Basic ' + $base64.encode(currentUser.userName + ':' + currentUser.password);
            return headers.Authorization == validUserCredentials;
        };
        $httpBackend.whenGET(/iam\/Users\/self/).respond(function (method, url, data, headers) {
            if (headers.Authorization == null) return [401];
            var userName = $base64.decode(headers.Authorization.split(' ')[1]).split(':')[0];
            var currentUser = _.findWhere(mockUsers, {userName: userName});

            return authenticated(headers) ? [
                200,
                currentUser
            ] : [401];
        });
        $httpBackend.whenGET(/iam\/Users\/[a-z0-9\-]+/).respond(function (method, url, data, headers) {
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
        $httpBackend.whenGET(/iam\/Users/).respond(function (method, url, data, headers) {
            return authenticated(headers) ? [
                200,
                mockUsers
            ] : [401];
        });
        $httpBackend.whenPOST(/iam\/Users/).respond(function (method, url, data, headers) {
            if (authenticated(headers)) {
                var user = JSON.parse(data);
                user.id = uuid.create();
                if (!user.meta) {
                    user.meta = {};
                }
                user.meta.created = new Date();
                if (!user.displayName) {
                    if (!user.name || _.isEmpty(user.name)) {
                        user.displayName = user.userName;
                    } else if (user.name.givenName && user.name.familyName) {
                        user.displayName = user.givenName + ' ' + user.familyName;
                    } else if (user.name.familyName) {
                        user.displayName = user.familyName;
                    } else if (user.name.givenName) {
                        user.displayName = user.givenName;
                    }
                }
                mockUsers.push(user);
                return [
                    200,
                    user
                ];
            } else {
                return [401];
            }
        });
        $httpBackend.whenPUT(/iam\/Users\/[a-z0-9\-]+/).respond(function (method, url, data, headers) {
            if (authenticated(headers)) {
                var id = url.split('/').pop();
                var user = JSON.parse(data);
                var existingUser = _.findWhere(mockUsers, { id: id });
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
        $httpBackend.whenDELETE(/iam\/Users\/[a-z0-9\-]+/).respond(function (method, url, data, headers) {
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
        $httpBackend.whenGET(/iam\/Groups\/[a-z0-9\-]+/).respond(function (method, url, data, headers) {
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
                group.id = uuid.create();
                if (!group.meta) {
                    group.meta = {};
                }
                group.meta.created = new Date();
                mockGroups.push(group);
                return [
                    200,
                    group
                ];
            } else {
                return [401];
            }
        });
        $httpBackend.whenPUT(/iam\/Groups\/[a-z0-9\-]+/).respond(function (method, url, data, headers) {
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
        $httpBackend.whenDELETE(/iam\/Groups\/[a-z0-9\-]+/).respond(function (method, url, data, headers) {
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
);