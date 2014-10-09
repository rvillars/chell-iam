'use strict';

var chellIam = angular.module('chell-iam');

chellIam.controller('UserListController', function ($scope, $modal, IamUser, IamGroup, ngTableParams) {

    $scope.list = true;
    $scope.detail = false;

    $scope.users = [];
    $scope.groups = [];
    $scope.editUser = {};

    IamGroup.query().then(function (groups) {
        $scope.groups = groups;
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
            $scope: { $data: {}, $emit: function () {
            } }
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
        $scope.possibleGroups = $scope.calculatePossibleGroups($scope.editUser, $scope.groups);
        $scope.showDetail();
    };

    $scope.edit = function (user) {
        $scope.editUser = user;
        $scope.possibleGroups = $scope.calculatePossibleGroups($scope.editUser, $scope.groups);
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
            IamUser.update($scope.editUser).then(function (user) {
            });
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

    $scope.calculatePossibleGroups = function (editUser, groups) {
        var possibleGroups = [];
        possibleGroups = possibleGroups
            .concat({name: 'Groups', isGroup: true})
            .concat(groups.slice(0)
                .map(function (group) {
                    var ticked = false;
                    for (var groupIndex in editUser.groups) {
                        if (groupIndex != null) {
                            var memberGroup = editUser.groups[groupIndex];
                            if (memberGroup.value == group.id) {
                                ticked = true;
                            }
                        }
                    }
                    return {icon: '<i class="glyphicon glyphicon-folder-open"></i>', name: group.name, ticked: ticked};
                }))
            .concat({isGroup: false});
        return possibleGroups;
    };
});

chellIam.controller('GroupListController', function ($scope, $timeout, $modal, IamGroup, IamUser, ngTableParams) {

    $scope.list = true;
    $scope.detail = false;

    $scope.users = {};
    $scope.groups = [];
    $scope.editGroup = {};

    IamUser.query().then(function (users) {
        $scope.users = users;
    });

    $scope.$watchCollection('groups', function () {
        if ($scope.tableParams) {
            $scope.tableParams.reload();
        }
    });

    IamGroup.query().then(function (groups) {
        $scope.groups = groups;
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: $scope.groups.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve($scope.groups.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            },
            $scope: { $data: {}, $emit: function () {
            } }
        });

    });

    $scope.view = function (group) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'templates/group-view-dialog.tpl.html',
            backdrop: false,
            controller: 'GroupViewModalController',
            windowClass: 'modal-wide',
            resolve: {
                group: function () {
                    return group;
                }
            }
        });
    };

    $scope.create = function () {
        $scope.editGroup = {};
        $scope.possibleMembers = $scope.calculatePossibleMembers($scope.editGroup, $scope.groups, $scope.users);
        $scope.showDetail();
    };

    $scope.edit = function (group) {
        $scope.editGroup = group;
        $scope.possibleMembers = $scope.calculatePossibleMembers($scope.editGroup, $scope.groups, $scope.users);
        $scope.showDetail();
    };

    $scope.remove = function (group) {
        if (!confirm('Are you sure?')) return;
        IamGroup.remove(group).then(function () {
            $scope.groups.splice($scope.groups.indexOf(group), 1);
        });
    };

    $scope.save = function () {

        //add members
        $scope.editGroup.members = [];
        angular.forEach( $scope.possibleMembers, function( possibleMember, key ) {
            if ( possibleMember.ticked === true ) {
                $scope.editGroup.members.push(
                    {
                        value: possibleMember.id,
                        display: possibleMember.name,
                        type: possibleMember.type
                    }
                );
            }
        });

        var isNew = $scope.editGroup.id == null;
        if (isNew) {
            IamGroup.create($scope.editGroup).then(function (group) {
                $scope.groups.push(group);
            });
        } else {
            IamGroup.update($scope.editGroup).then(function (group) {
            });
        }
        $scope.cancel();
    };

    $scope.cancel = function () {
        $scope.editGroup = {};
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

    $scope.calculatePossibleMembers = function (editGroup, groups, users) {
        var possibleMembers = [];
        possibleMembers = possibleMembers
            .concat({name: 'Users', isGroup: true})
            .concat(users.slice(0)
                .map(function (user) {
                    var ticked = false;
                    var memberType = 'User';
                    angular.forEach(editGroup.members, function(groupMember, key) {
                        if (groupMember.type == 'User' && groupMember.value == user.id) {
                            ticked = true;
                        }
                    });
                    return {icon: '<i class="glyphicon glyphicon-user"></i>', name: user.fullname, ticked: ticked, id: user.id, type: memberType};
                }))
            .concat({isGroup: false})
            .concat({name: 'Groups', isGroup: true})
            .concat(groups.slice(0)
                .map(function (group) {
                    var ticked = false;
                    var memberType = 'Group';
                    angular.forEach(editGroup.members, function(groupMember, key) {
                        if (groupMember.type == 'Group' && groupMember.value == group.id) {
                            ticked = true;
                        }
                    });
                    return {icon: '<i class="glyphicon glyphicon-folder-open"></i>', name: group.name, ticked: ticked, id: group.id, type: memberType};
                }))
            .concat({isGroup: false});
        return possibleMembers;
    };
});

chellIam.controller('GroupViewModalController', function ($scope, $modalInstance, group) {

    $scope.group = group;

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