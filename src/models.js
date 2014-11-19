'use strict';

var chellIam = angular.module('chell-iam');

chellIam.factory('IamUser', function(IamAdapter) {
    return {
        query: function() {
            return IamAdapter.getUserList();
        },
        get: function(id) {
            return IamAdapter.getUser(id);
        },
        self: function() {
            return IamAdapter.getAuthenticatedUser();
        },
        create: function(user) {
            return IamAdapter.createUser(user);
        },
        update: function(user) {
            return IamAdapter.updateUser(user);
        },
        remove: function(user) {
            return IamAdapter.removeUser(user);
        },
        changePassword: function(user, newBase64Credential) {
            return IamAdapter.changePassword(user, newBase64Credential);
        }
    };
});

chellIam.factory('IamGroup', function(IamAdapter) {
    return {
        query: function() {
            return IamAdapter.getGroupList();
        },
        get: function(id) {
            return IamAdapter.getGroup(id);
        },
        create: function(role) {
            return IamAdapter.createGroup(role);
        },
        update: function(role) {
            return IamAdapter.updateGroup(role);
        },
        remove: function(role) {
            return IamAdapter.removeGroup(role);
        }
    };
});