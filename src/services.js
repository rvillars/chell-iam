'use strict';

var chellIam = angular.module('chell-iam');

chellIam.factory('CurrentUserService', function () {
    return {
        authPromise: {},
        setCurrentUser: function (user) {
            this.currentUser = user;
        },
        getCurrentUser: function () {
            return this.currentUser;
        },
        hasGroupId: function(groupId) {
            if (this.currentUser == null) {
                return false;
            }
            return this.currentUser.primaryGroup.id == groupId;
        }
    };
});