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

chellIam.factory('uuid', function() {
    return {
        create: function() {
            function _p8(s) {
                var p = (Math.random().toString(16)+'000000000').substr(2,8);
                return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        },
        empty: function() {
            return '00000000-0000-0000-0000-000000000000';
        }
    };
});