'use strict';

var chellIam = angular.module('chell-iam');

chellIam.directive('chellUserList', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/user-list.tpl.html'
    };
});

chellIam.directive('chellRoleList', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/role-list.tpl.html'
    };
});

chellIam.directive('chellUserProfile', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            user: '=',
            roles: '='
        },
        templateUrl: 'templates/user-profile.tpl.html'
    };
});

chellIam.directive('chellLoginRequired', function ($modal) {
    return {
        restrict: 'C',
        link: function (scope) {
            var loginModal;
            scope.$on('event:auth-loginRequired', function () {
                if (!loginModal) {
                    loginModal = $modal.open({
                        templateUrl: 'templates/login-dialog.tpl.html',
                        backdrop: 'static',
                        keyboard: false,
                        windowClass: 'login-dialog',
                        controller: 'AuthenticationController'
                    });
                }
            });
            scope.$on('event:auth-logoutConfirmed', function () {
                loginModal = $modal.open({
                    templateUrl: 'templates/login-dialog.tpl.html',
                    backdrop: 'static',
                    keyboard: false,
                    windowClass: 'login-dialog',
                    controller: 'AuthenticationController'
                });
            });
            scope.$on('event:auth-loginConfirmed', function () {
                loginModal.close();
                loginModal = null;
            });
        }
    };
});

chellIam.directive('chellLoginDialog', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/login-dialog.html'
    };
});

chellIam.directive('visibilityRoleId', function (CurrentUserService, IamUser) {
    return {
        restrict: 'A',
        controller: function ($scope, $element) {
            $element.hide();
        },
        link: function ($scope, element, attrs) {
            IamUser.self().then(function(user) {
                if (!CurrentUserService.hasRoleId(attrs.visibilityRoleId)) {
                    element.hide();
                } else {
                    element.show();
                }
            });
            $scope.$on('event:auth-loginConfirmed', function() {
                IamUser.self().then(function(user) {
                    if (!CurrentUserService.hasRoleId(attrs.visibilityRoleId)) {
                        element.hide();
                    } else {
                        element.show();
                    }
                });
            });
            $scope.$on('event:auth-logoutConfirmed', function() {
                element.hide();
            });
        }
    };
});

chellIam.directive('moveableRoleId', function (CurrentUserService, IamUser) {
    return {
        restrict: 'A',
        controller: function ($scope, $element) {
            $($element).addClass('box-locked');
        },
        link: function ($scope, element, attrs) {
            IamUser.self().then(function(user) {
                if (!CurrentUserService.hasRoleId(attrs.moveableRoleId)) {
                    $(element).addClass('box-locked');
                } else {
                    $(element).removeClass('box-locked');
                }
            });
            $scope.$on('event:auth-loginConfirmed', function() {
                IamUser.self().then(function(user) {
                    if (!CurrentUserService.hasRoleId(attrs.moveableRoleId)) {
                        $(element).addClass('box-locked');
                    } else {
                        $(element).removeClass('box-locked');
                    }
                });
            });
            $scope.$on('event:auth-logoutConfirmed', function() {
                $(element).addClass('box-locked');
            });
        }
    };
});

angular.module('ui.bootstrap.modal').directive('modalWindow', function ($timeout) {
    return {
        priority: 1,
        link: function (scope, element, attrs) {
            $timeout(function () {
                element.find('[autofocus]').focus();
            });
        }
    };
});