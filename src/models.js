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
        }
    };
});

chellIam.factory('IamRole', function(IamAdapter) {
    return {
        query: function() {
            return IamAdapter.getRoleList();
        },
        get: function(id) {
            return IamAdapter.getRole(id);
        },
        create: function(role) {
            return IamAdapter.createRole(role);
        },
        update: function(role) {
            return IamAdapter.updateRole(role);
        },
        remove: function(role) {
            return IamAdapter.removeRole(role);
        }
    };
});