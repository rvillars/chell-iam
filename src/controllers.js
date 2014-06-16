'use strict';

var chellIam = angular.module('chell-iam');

chellIam.controller('UserListController', function ($scope, $modal, IamUser, IamRole, ngTableParams) {

    $scope.list = true;
    $scope.detail = false;

    $scope.users = [];
    $scope.editUser = {};

    IamRole.query().then(function (roles) {
        $scope.roles = roles;
    });

    $scope.$watchCollection('users', function () {
        if ($scope.tableParams) {
            $scope.tableParams.reload();
        }
    });

    IamUser.query().then(function (users) {
        $scope.users = users;
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: $scope.users.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve($scope.users.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            },
            $scope: { $data: {}, $emit: function(){} }
        });
    });

    $scope.view = function (user) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'templates/user-view-dialog.tpl.html',
            backdrop: false,
            controller: 'UserViewModalController',
            windowClass: 'modal-wide',
            resolve: {
                user: function () {
                    return user;
                }
            }
        });
    };

    $scope.create = function () {
        $scope.editUser = {};
        $scope.showDetail();
    };

    $scope.edit = function (user) {
        $scope.editUser = user;
        $scope.showDetail();
    };

    $scope.remove = function (user) {
        if (!confirm('Are you sure?')) return;
        IamUser.remove(user).then(function () {
            $scope.users.splice($scope.users.indexOf(user), 1);
        });
    };

    $scope.save = function () {
        var isNew = $scope.editUser.id == null;
        if (isNew) {
            IamUser.create($scope.editUser).then(function (user) {
                $scope.users.push(user);
            });
        } else {
            IamUser.update($scope.editUser).then(function (user) {});
        }
        $scope.cancel();
    };

    $scope.cancel = function () {
        $scope.editUser = {};
        $scope.showList();
    };

    $scope.showList = function () {
        $scope.list = true;
        $scope.detail = false;
    };

    $scope.showDetail = function () {
        $scope.list = false;
        $scope.detail = true;
    };
});

chellIam.controller('RoleListController', function ($scope, $timeout, $modal, IamRole, ngTableParams) {

    $scope.list = true;
    $scope.detail = false;

    $scope.roles = [];
    $scope.editRole = {};

    $scope.$watchCollection('roles', function () {
        if ($scope.tableParams) {
            $scope.tableParams.reload();
        }
    });

    IamRole.query().then(function (roles) {
        $scope.roles = roles;
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: $scope.roles.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve($scope.roles.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            },
            $scope: { $data: {}, $emit: function(){} }
        });

    });

    $scope.view = function (role) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'templates/role-view-dialog.tpl.html',
            backdrop: false,
            controller: 'RoleViewModalController',
            windowClass: 'modal-wide',
            resolve: {
                role: function () {
                    return role;
                }
            }
        });
    };

    $scope.create = function () {
        $scope.editRole = {};
        $scope.possibleParentRoles = $scope.roles.slice(0);
        $scope.showDetail();
    };

    $scope.edit = function (role) {
        $scope.editRole = role;
        $scope.possibleParentRoles = $scope.roles.filter(function (role) {
            return role != $scope.editRole;
        });
        $scope.showDetail();
    };

    $scope.remove = function (role) {
        if (!confirm('Are you sure?')) return;
        IamRole.remove(role).then(function () {
            $scope.roles.splice($scope.roles.indexOf(role), 1);
        });
    };

    $scope.save = function () {
        var isNew = $scope.editRole.id == null;
        if (isNew) {
            IamRole.create($scope.editRole).then(function (role) {
                $scope.roles.push(role);
            });
        } else {
            IamRole.update($scope.editRole).then(function (role) {});
        }
        $scope.cancel();
    };

    $scope.cancel = function () {
        $scope.editRole = {};
        $scope.showList();
    };

    $scope.showList = function () {
        $scope.list = true;
        $scope.detail = false;
    };

    $scope.showDetail = function () {
        $scope.list = false;
        $scope.detail = true;
    };
});

chellIam.controller('RoleViewModalController', function ($scope, $modalInstance, role) {

    $scope.role = role;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

chellIam.controller('UserViewModalController', function ($scope, $modalInstance, user) {

    $scope.user = user;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

chellIam.controller('AuthenticationController', function ($scope, IamAdapter, authService, $base64, $http, $window) {

    $scope.wrongCredentials = authService.wrongCredentials;

    $scope.signin = function () {
        var base64Credential = 'Basic ' + $base64.encode($scope.login + ':' + $scope.password);
        $window.sessionStorage.token = base64Credential;

        authService.wrongCredentials = true;

        var configUpdater = function (config) {
            config.headers.Authorization = base64Credential;
            return config;
        };
        authService.loginConfirmed(null, configUpdater);
    };

    $scope.$on('event:auth-logoutConfirmed', function () {
        authService.wrongCredentials = false;
    });
});

chellIam.controller('CurrentUserController', function ($scope, IamUser, $http, $rootScope, $window, CurrentUserService) {

    CurrentUserService.authPromise.then(function (user) {
        $scope.currentUser = user;
    });

    IamUser.self().then(function (user) {
        $scope.currentUser = user;
        CurrentUserService.setCurrentUser(user);
    });

    $scope.$on('event:auth-loginConfirmed', function () {
        IamUser.self().then(function (user) {
            $scope.currentUser = user;
            CurrentUserService.setCurrentUser(user);
        });
    });

    $scope.$on('event:auth-logoutConfirmed', function () {
        $window.sessionStorage.token = null;
        $scope.currentUser = null;
        CurrentUserService.setCurrentUser(null);
    });

    $scope.logout = function () {
        $rootScope.$broadcast('event:auth-logoutConfirmed');
    };
});