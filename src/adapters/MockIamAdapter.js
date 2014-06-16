'use strict';

var chellIam = angular.module('chell-iam');

var host = 'undefined';

// *** Adapter ***
chellIam.factory('IamAdapter', function ($http, $q, _) {
    return {
        // --- User ---
        getUserList: function(){
            var deferred = $q.defer();
            $http.get('http://'+host+'/iam/users').success(function(users){
                deferred.resolve(_.map(users, externalToIamUser));
            }).error(function(){
                deferred.reject('An error occured while fetching user list');
            });
            return deferred.promise;
        },
        getUser: function(id){
            var deferred = $q.defer();
            $http.get('http://'+host+'/iam/users/'+id).success(function(user){
                deferred.resolve(externalToIamUser(user));
            }).error(function(){
                deferred.reject('An error occured while fetching user');
            });
            return deferred.promise;
        },
        getAuthenticatedUser: function(){
            var deferred = $q.defer();
            $http.get('http://'+host+'/iam/users/self').success(function(user){
                deferred.resolve(externalToIamUser(user));
            }).error(function(){
                deferred.reject('An error occured while fetching authenticated user');
            });
            return deferred.promise;
        },
        createUser: function(user){
            var deferred = $q.defer();
            $http.post('http://'+host+'/iam/users', iamToExternalUser(user)).success(function(user){
                deferred.resolve(externalToIamUser(user));
            }).error(function(){
                deferred.reject('An error occured while updating role');
            });
            return deferred.promise;
        },
        updateUser: function(user){
            var deferred = $q.defer();
            $http.put('http://'+host+'/iam/users/'+user.id, iamToExternalUser(user)).success(function(user){
                deferred.resolve(externalToIamUser(user));
            }).error(function(){
                deferred.reject('An error occured while updating user');
            });
            return deferred.promise;
        },
        removeUser: function(user){
            var deferred = $q.defer();
            $http({method: 'DELETE', url: 'http://'+host+'/iam/users/'+user.id}).success(function(){
                deferred.resolve();
            }).error(function(){
                deferred.reject('An error occured while updating user');
            });
            return deferred.promise;
        },

        // --- Role ---
        getRoleList: function(){
            var deferred = $q.defer();
            $http.get('http://'+host+'/iam/roles').success(function(roles){
                deferred.resolve(_.map(roles, externalToIamRole));
            }).error(function(){
                deferred.reject('An error occured while fetching role list');
            });
            return deferred.promise;
        },
        getRole: function(id){
            var deferred = $q.defer();
            $http.get('http://'+host+'/iam/roles/'+id).success(function(role){
                deferred.resolve(externalToIamRole(role));
            }).error(function(){
                deferred.reject('An error occured while fetching role');
            });
            return deferred.promise;
        },
        createRole: function(role){
            var deferred = $q.defer();
            $http.post('http://'+host+'/iam/roles', iamToExternalRole(role)).success(function(role){
                deferred.resolve(externalToIamRole(role));
            }).error(function(){
                deferred.reject('An error occured while updating role');
            });
            return deferred.promise;
        },
        updateRole: function(role){
            var deferred = $q.defer();
            $http.put('http://'+host+'/iam/roles/'+role.id, iamToExternalRole(role)).success(function(role){
                deferred.resolve(externalToIamRole(role));
            }).error(function(){
                deferred.reject('An error occured while updating role');
            });
            return deferred.promise;
        },
        removeRole: function(role){
            var deferred = $q.defer();
            $http({method: 'DELETE', url: 'http://'+host+'/iam/roles/'+role.id}).success(function(){
                deferred.resolve();
            }).error(function(){
                deferred.reject('An error occured while updating role');
            });
            return deferred.promise;
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

// --- Role ---
var externalToIamRole = function(externalRole) {
    var iamRole = externalRole; //replace with mapping
    return iamRole;
};
var iamToExternalRole = function(iamRole) {
    var externalRole = iamRole; //replace with mapping
    return externalRole;
};


chellIam.run(function($httpBackend, $base64) {

    // *** Mock Data ***
    var mockUserRole = {
        id: 100,
        name: 'User'
    };
    var mockAdminRole = {
        id: 101,
        name: 'Administrator',
        parentId: 100
    };
    var mockRoles = [mockUserRole, mockAdminRole];
    var mockAdmin = {
        id: 1,
        login: 'chellAdmin',
        password: 'chellAdmin',
        firstname: 'Chell',
        lastname: 'Admin',
        fullname: 'Chell Admin',
        primaryRole: externalToIamRole(mockAdminRole),
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
        primaryRole: externalToIamRole(mockUserRole),
        email: 'chell.user@mimacom.com',
        gravatarMail: 'roger.villars@bluewin.ch',
        status: 'active',
        creationDate: new Date(),
        photo: 'assets/member_user.png'
    };
    var mockUsers = [mockAdmin, mockUser];

    // *** Mock Backend ***
    var authenticated = function(headers) {
        if (headers.Authorization == 'Basic '+$base64.encode(mockAdmin.login+':'+mockAdmin.password) ||
            headers.Authorization == 'Basic '+$base64.encode(mockUser.login+':'+mockUser.password)) {
            return true;
        }
        return false;
    };

    // --- User ---
    $httpBackend.whenGET(/iam\/users\/[\d]/).respond(function(method, url, data, headers) {
        if (authenticated(headers)) {
            var id = url.split('\/').pop();
            var existingUser = _.find(mockUsers, function(aUser) {return aUser.id == id;});
            if (!existingUser) {
                return [404];
            }
            return [200, existingUser];
        } else {
            return [401];
        }
    });

    $httpBackend.whenGET(/iam\/users\/self/).respond(function(method, url, data, headers) {
        var currentUser = {};
        if (headers.Authorization == 'Basic '+$base64.encode(mockAdmin.login+':'+mockAdmin.password)) {
            currentUser = mockAdmin;
        }
        else {
            currentUser = mockUser;
        }
        return authenticated(headers) ? [200, currentUser] : [401];
    });

    //has to be after more specific whenGETs
    $httpBackend.whenGET(/iam\/users/).respond(function(method, url, data, headers) {
        return authenticated(headers) ? [200, mockUsers] : [401];
    });

    $httpBackend.whenPOST(/iam\/users/).respond(function(method, url, data, headers) {
        if (authenticated(headers)) {
            var user = JSON.parse(data);
            var currentMaxId = _.max(mockUsers, function(aUser) {return aUser.id;}).id;
            user.id = ++currentMaxId;
            user.creationDate = new Date();
            user.fullname = user.firstname + ' ' + user.lastname;
            mockUsers.push(user);
            return [200, user];
        } else {
            return [401];
        }
    });

    $httpBackend.whenPUT(/iam\/users\/[\d]/).respond(function(method, url, data, headers) {
        if (authenticated(headers)) {
            var id = url.split('\/').pop();
            var user = JSON.parse(data);
            var existingUser = _.find(mockUsers, function(aUser) {return aUser.id == id;});
            if (!existingUser) {
                return [404];
            }
            var index = mockUsers.indexOf(existingUser);
            mockUsers[index] = user;
            return [200, user];
        } else {
            return [401];
        }
    });

    $httpBackend.whenDELETE(/iam\/users\/[\d]/).respond(function(method, url, data, headers) {
        if (authenticated(headers)) {
            var id = url.split('\/').pop();
            var existingUser = _.find(mockUsers, function(aUser) {return aUser.id == id;});
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

    // --- Role ---
    $httpBackend.whenGET(/iam\/roles\/[\d]/).respond(function(method, url, data, headers) {
        if (authenticated(headers)) {
            var id = url.split('\/').pop();
            var existingRole = _.find(mockRoles, function(aRole) {return aRole.id == id;});
            if (!existingRole) {
                return [404];
            }
            return [200, existingRole];
        } else {
            return [401];
        }
    });

    //has to be after more specific whenGETs
    $httpBackend.whenGET(/iam\/roles/).respond(function(method, url, data, headers) {
        return authenticated(headers) ? [200, mockRoles] : [401];
    });

    $httpBackend.whenPOST(/iam\/roles/).respond(function(method, url, data, headers) {
        if (authenticated(headers)) {
            var role = JSON.parse(data);
            var currentMaxId = _.max(mockRoles, function(aRole) {return aRole.id;}).id;
            role.id = ++currentMaxId;
            mockRoles.push(role);
            return [200, role];
        } else {
            return [401];
        }
    });

    $httpBackend.whenPUT(/iam\/roles\/[\d]/).respond(function(method, url, data, headers) {
        if (authenticated(headers)) {
            var id = url.split('\/').pop();
            var role = JSON.parse(data);
            var existingRole = _.find(mockRoles, function(aRole) {return aRole.id == id;});
            if (!existingRole) {
                return [404];
            }
            var index = mockRoles.indexOf(existingRole);
            mockRoles[index] = role;
            return [200, role];
        } else {
            return [401];
        }
    });

    $httpBackend.whenDELETE(/iam\/roles\/[\d]/).respond(function(method, url, data, headers) {
        if (authenticated(headers)) {
            var id = url.split('\/').pop();
            var existingRole = _.find(mockRoles, function(aRole) {return aRole.id == id;});
            if (!existingRole) {
                return [404];
            }
            var index = mockRoles.indexOf(existingRole);
            mockRoles.splice(index, 1);
            return [200];
        } else {
            return [401];
        }
    });
});


