'use strict';

var chellIam = angular.module('chell-iam');

chellIam.directive('chellUserList', function () {
    return {
        restrict: 'E',
        scope: {
            showCreateButton: '=?',
            createButtonHook: '&?',
            editButtonHook: '&?',
            viewButtonHook: '&?',
            deleteButtonHook: '&?',
            readOnly: '&?'
        },
        controller: 'UserListController',
        templateUrl: 'templates/user-list.tpl.html'
    };
});

chellIam.directive('chellUserForm', function () {
    return {
        restrict: 'E',
        scope: {
            saveButtonHook: '&?',
            cancelButtonHook: '&?'
        },
        controller: 'UserFormController',
        templateUrl: 'templates/user-form.tpl.html'
    };
});

chellIam.directive('chellGroupList', function () {
    return {
        restrict: 'E',
        scope: {
            showCreateButton: '=?',
            createButtonHook: '&?',
            editButtonHook: '&?',
            viewButtonHook: '&?',
            deleteButtonHook: '&?',
            readOnly: '&?'
        },
        controller: 'GroupListController',
        templateUrl: 'templates/group-list.tpl.html'
    };
});

chellIam.directive('chellGroupForm', function () {
    return {
        restrict: 'E',
        scope: {
            saveButtonHook: '&?',
            cancelButtonHook: '&?'
        },
        controller: 'GroupFormController',
        templateUrl: 'templates/group-form.tpl.html'
    };
});

chellIam.directive('chellUserProfile', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            user: '=',
            groups: '=',
            possibleGroups: '=',
            readOnly: '='
        },
        controller: 'UserProfileController',
        templateUrl: 'templates/user-profile.tpl.html'
    };
});

chellIam.directive('chellUserButton', function () {
    return {
        restrict: 'E',
        transclude: true,
        link: function(scope,element,attrs,ctrl, transclude) {
            element.find('#transclude').replaceWith(transclude());
        },
        templateUrl: 'templates/user-button.tpl.html'
    };
});

chellIam.directive('chellLoginRequired', function ($modal) {
    return {
        restrict: 'EAC',
        scope: {
            loginRequiredFunction: '&?'
        },
        link: function (scope, element, attrs) {
            var loginModal;
            scope.$on('event:auth-loginRequired', function () {
                if (attrs.loginRequiredFunction) {
                    scope.loginRequiredFunction();
                    return;
                }
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
                if (attrs.loginRequiredFunction) {
                    scope.loginRequiredFunction();
                    return;
                }
                loginModal = $modal.open({
                    templateUrl: 'templates/login-dialog.tpl.html',
                    backdrop: 'static',
                    keyboard: false,
                    windowClass: 'login-dialog',
                    controller: 'AuthenticationController'
                });
            });
            scope.$on('event:auth-loginConfirmed', function () {
                if (loginModal) {
                    loginModal.close();
                    loginModal = null;
                }
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

chellIam.directive('visibleByGroup', function (CurrentUserService, IamUser) {
    return {
        restrict: 'A',
        controller: function ($scope, $element) {
            $element.hide();
        },
        link: function ($scope, element, attrs) {
            IamUser.self().then(function (user) {
                if (!CurrentUserService.hasGroupId(attrs.visibleByGroup, user) && !CurrentUserService.hasGroupName(attrs.visibleByGroup, user)) {
                    element.hide();
                } else {
                    element.show();
                }
            });
            $scope.$on('event:auth-loginConfirmed', function () {
                IamUser.self().then(function (user) {
                    if (!CurrentUserService.hasGroupId(attrs.visibleByGroup, user) && !CurrentUserService.hasGroupName(attrs.visibleByGroup, user)) {
                        element.hide();
                    } else {
                        element.show();
                    }
                });
            });
            $scope.$on('event:auth-logoutConfirmed', function () {
                element.hide();
            });
        }
    };
});

chellIam.directive('hasGroup', function (CurrentUserService, IamUser) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            IamUser.self().then(function (user) {
                if (!CurrentUserService.hasGroupId(attrs.visibilityGroup) && !CurrentUserService.hasGroupName(attrs.visibilityGroup)) {
                    return false;
                } else {
                    return true;
                }
            });
            $scope.$on('event:auth-loginConfirmed', function () {
                IamUser.self().then(function (user) {
                    if (!CurrentUserService.hasGroupId(attrs.visibilityGroup) && !CurrentUserService.hasGroupName(attrs.visibilityGroup)) {
                        return false;
                    } else {
                        return true;
                    }
                });
            });
            $scope.$on('event:auth-logoutConfirmed', function () {
                return false;
            });
        }
    };
});

chellIam.directive('visibleByLogin', function () {
    return {
        restrict: 'A',
        controller: function ($scope, $element) {
            $element.hide();
        },
        link: function ($scope, element, attrs) {
            $scope.$on('event:auth-loginConfirmed', function () {
                element.show();
            });
            $scope.$on('event:auth-logoutConfirmed', function () {
                element.hide();
            });
        }
    };
});

chellIam.directive('multiValue', function () {
    return {
        restrict: 'EA',
        transclude: true,
        scope: {
            valueList: '=',
            labelProperty: '@', // not used yet
            valueProperty: '@', // not used yet
            readOnly: '=',
            panel: '=',
            possibleTypes: '@'
        },
        controller: function ($scope, $element) {
            $scope.possibleTypeList = $scope.possibleTypes.split(',');
            $scope.addValue = function () {
                if ($scope.valueList == null) {
                    $scope.valueList = [];
                }
                $scope.valueList[$scope.valueList.length] = {type: $scope.possibleTypeList[0], value: ''};
            };

            $scope.removeValue = function (value) {
                $scope.valueList.splice($scope.valueList.indexOf(value), 1);
            };

            $scope.selectType = function (type, value) {
                if (value) {
                    $scope.valueList[$scope.valueList.indexOf(value)].type = type;
                } else {
                    $scope.newType = type;
                }
            };
        },
        templateUrl: 'templates/multi-value.tpl.html'
    };
});

chellIam.directive('inject', function () {
    return {
        link: function ($scope, $element, $attrs, controller, $transclude) {
            if (!$transclude) {
                console.log('No Transclude!');
            }
            var innerScope = $scope.$new();
            $transclude(innerScope, function (clone) {
                $element.empty();
                $element.append(clone);
                $element.on('$destroy', function () {
                    innerScope.$destroy();
                });
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