'use strict';

var chellIam = angular.module('chell-iam');

chellIam.controller('UserListController', function ($scope, $rootScope, $filter, $modal, $translate, IamUser, IamGroup, ngTableParams) {

    $scope.users = [];

    IamUser.query().then(function (users) {
        $scope.users = users;
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                fullname: 'asc'
            }
        }, {
            total: $scope.users.length, // length of data
            getData: function ($defer, params) {
                var filteredData = params.filter() ? $filter('filter')($scope.users, params.filter()) : $scope.users;
                var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                params.total(orderedData.length); // used to update paginator
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            },
            $scope: { $data: {}, $emit: function () {
            } }
        });
    });

    $scope.$on('chellIam.userCreated', function(event) {
        IamUser.query().then(function (users) {
            $scope.users = users;
        });
    });

    $scope.$watchCollection('users', function () {
        if ($scope.tableParams) {
            $scope.tableParams.reload();
        }
    });

    $scope.create = function () {
        $scope.createButtonHook();
    };

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
        $scope.viewButtonHook();
    };

    $scope.edit = function (user) {
        $rootScope.$broadcast('chellIam.editUser', user);
        $scope.editButtonHook();
    };

    $scope.remove = function (user) {
        $translate('CHELL_IAM.USER_LIST.REMOVE_QUESTION').then(function (removeQuestion) {
            if (!confirm(removeQuestion)) return;
            IamUser.remove(user).then(function () {
                $scope.users.splice($scope.users.indexOf(user), 1);
            });
            $scope.deleteButtonHook();
        });
    };

    $scope.changePassword = function (user) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'templates/change-password-dialog.tpl.html',
            backdrop: false,
            controller: 'ChangePasswordModalController',
            resolve: {
                user: function () {
                    return user;
                },
                requestOldPassword: function () {
                    return false;
                }
            }
        });

        $scope.modalInstance.result.then(function (newBase64Credential) {
            IamUser.changePassword(user, newBase64Credential);
        });
    };
});

chellIam.controller('UserFormController', function ($scope, $rootScope, $modal, IamUser, IamGroup) {

    $scope.editUser = {};

    IamGroup.query().then(function (possibleGroups) {
        $scope.possibleGroups = $scope.calculatePossibleGroups($scope.editUser, possibleGroups);
    });

    $scope.$on('chellIam.editUser', function(event, user) {
        $scope.editUser = user;
        IamGroup.query().then(function (possibleGroups) {
            $scope.possibleGroups = $scope.calculatePossibleGroups($scope.editUser, possibleGroups);
        });
    });

    $scope.$on('chellIam.groupCreated', function(event) {
        IamGroup.query().then(function (possibleGroups) {
            $scope.possibleGroups = $scope.calculatePossibleGroups($scope.editUser, possibleGroups);
        });
    });

    $scope.save = function () {

        //add groups
        $scope.editUser.groups = [];
        angular.forEach($scope.possibleGroups, function (possibleGroup, key) {
            if (possibleGroup.ticked === true) {
                $scope.editUser.groups.push(
                    {
                        value: possibleGroup.id,
                        display: possibleGroup.name,
                        type: possibleGroup.type
                    }
                );
            }
        });

        var isNew = $scope.editUser.id == null;
        if (isNew) {
            IamUser.create($scope.editUser).then(function(createdUser) {
                $scope.modalInstance = $modal.open({
                    templateUrl: 'templates/change-password-dialog.tpl.html',
                    backdrop: false,
                    controller: 'ChangePasswordModalController',
                    resolve: {
                        user: function () {
                            return createdUser;
                        },
                        requestOldPassword: function () {
                            return false;
                        }
                    }
                });

                $scope.modalInstance.result.then(function (newBase64Credential) {
                    IamUser.changePassword(createdUser, newBase64Credential);
                });
            });
        } else {
            IamUser.update($scope.editUser);
        }
        $scope.cancel();
        $rootScope.$broadcast('chellIam.userCreated');
        $scope.saveButtonHook();
    };

    $scope.cancel = function () {
        $scope.editUser = {};

        IamGroup.query().then(function (possibleGroups) {
            $scope.possibleGroups = $scope.calculatePossibleGroups($scope.editUser, possibleGroups);
        });

        if ($scope.userForm) {
            $scope.userForm.$setPristine();
        }

        $scope.cancelButtonHook();
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
                    return {icon: '<i class="glyphicon glyphicon-lock"></i>', name: group.name, ticked: ticked, id: group.id, type: 'Group'};
                }))
            .concat({isGroup: false});
        return possibleGroups;
    };
});

chellIam.controller('UserProfileController', function($scope, IamUser) {
    $scope.save = function (user) {
        IamUser.update(user);
    };
});

chellIam.controller('GroupListController', function ($scope, $rootScope, $filter, $modal, $translate, IamGroup, IamUser, ngTableParams) {

    $scope.groups = [];

    IamGroup.query().then(function (groups) {
        $scope.groups = groups;
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                name: 'asc'
            }
        }, {
            total: $scope.groups.length, // length of data
            getData: function ($defer, params) {
                var filteredData = params.filter() ? $filter('filter')($scope.groups, params.filter()) : $scope.groups;
                var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                params.total(orderedData.length); // used to update paginator
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            },
            $scope: { $data: {}, $emit: function () {
            } }
        });
    });

    $scope.$on('chellIam.groupCreated', function(event) {
        IamGroup.query().then(function (groups) {
            $scope.groups = groups;
        });
    });

    $scope.$watchCollection('groups', function () {
        if ($scope.tableParams) {
            $scope.tableParams.reload();
        }
    });

    $scope.create = function() {
        $scope.createButtonHook();
    };

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
        $scope.viewButtonHook();
    };

    $scope.edit = function (group) {
        $rootScope.$broadcast('chellIam.editGroup', group);
        $scope.editButtonHook();
    };

    $scope.remove = function (group) {
        $translate('CHELL_IAM.GROUP_LIST.REMOVE_QUESTION').then(function (removeQuestion) {
            if (!confirm(removeQuestion)) return;
            IamGroup.remove(group).then(function () {
                $scope.groups.splice($scope.groups.indexOf(group), 1);
            });
            $scope.deleteButtonHook();
        });
    };
});

chellIam.controller('GroupFormController', function ($scope, $rootScope, IamGroup, IamUser) {

    $scope.editGroup = {};

    IamUser.query().then(function (possibleUsers) {
        IamGroup.query().then(function (possibleGroups) {
            $scope.possibleMembers = $scope.calculatePossibleMembers($scope.editGroup, possibleGroups, possibleUsers);
        });
    });

    $scope.$on('chellIam.editGroup', function(event, group) {
        $scope.editGroup = group;
        IamUser.query().then(function (possibleUsers) {
            IamGroup.query().then(function (possibleGroups) {
                $scope.possibleMembers = $scope.calculatePossibleMembers($scope.editGroup, possibleGroups, possibleUsers);
            });
        });
    });

    $scope.$on('chellIam.userCreated', function(event) {
        IamUser.query().then(function (possibleUsers) {
            IamGroup.query().then(function (possibleGroups) {
                $scope.possibleMembers = $scope.calculatePossibleMembers($scope.editGroup, possibleGroups, possibleUsers);
            });
        });
    });

    $scope.save = function () {

        //add members
        $scope.editGroup.members = [];
        angular.forEach($scope.possibleMembers, function (possibleMember, key) {
            if (possibleMember.ticked === true) {
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
            IamGroup.create($scope.editGroup);
        } else {
            IamGroup.update($scope.editGroup);
        }

        $scope.cancel();
        $rootScope.$broadcast('chellIam.groupCreated');
        $scope.saveButtonHook();
    };

    $scope.cancel = function () {
        $scope.editGroup = {};

        IamUser.query().then(function (possibleUsers) {
            IamGroup.query().then(function (possibleGroups) {
                $scope.possibleMembers = $scope.calculatePossibleMembers($scope.editGroup, possibleGroups, possibleUsers);
            });
        });

        if ($scope.groupForm) {
            $scope.groupForm.$setPristine();
        }

        $scope.cancelButtonHook();
    };

    $scope.calculatePossibleMembers = function (editGroup, groups, users) {
        var possibleMembers = [];
        possibleMembers = possibleMembers
            .concat({name: 'Users', isGroup: true})
            .concat(users.slice(0)
                .map(function (user) {
                    var ticked = false;
                    angular.forEach(editGroup.members, function (groupMember, key) {
                        if (groupMember.type == 'User' && groupMember.value == user.id) {
                            ticked = true;
                        }
                    });
                    return {icon: '<i class="glyphicon glyphicon-user"></i>', name: user.fullname, ticked: ticked, id: user.id, type: 'User'};
                }))
            .concat({isGroup: false})
            .concat({name: 'Groups', isGroup: true})
            .concat(groups.slice(0)
                .map(function (group) {
                    var ticked = false;
                    angular.forEach(editGroup.members, function (groupMember, key) {
                        if (groupMember.type == 'Group' && groupMember.value == group.id) {
                            ticked = true;
                        }
                    });
                    return {icon: '<i class="glyphicon glyphicon-lock"></i>', name: group.name, ticked: ticked, id: group.id, type: 'Group'};
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

chellIam.controller('ChangePasswordModalController', function ($scope, $modalInstance, user, requestOldPassword, $base64, $window, $preferences) {

    $scope.user = user;
    $scope.requestOldPassword = requestOldPassword;
    $scope.wrongCredentials = false;
    $scope.notMatching = false;
    $scope.passwordPattern = $preferences.CHELL_IAM.SECURITY.PASSWORD_PATTERN;
    $scope.infoCollapsed = true;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.changePassword = function () {
        if ($scope.requestOldPassword) {
            var base64Credential = 'Basic ' + $base64.encode(user.login + ':' + $scope.oldPassword);
            $scope.wrongCredentials = $window.sessionStorage.token != base64Credential;
        } else {
            $scope.wrongCredentials = false;
        }
        $scope.notMatching = $scope.newPassword != $scope.repeatPassword;

        if (!$scope.wrongCredentials && !$scope.notMatching) {
            var newBase64Credential = 'Basic ' + $base64.encode(user.login + ':' + $scope.newPassword);
            $modalInstance.close(newBase64Credential);
        }
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


});

chellIam.controller('CurrentUserController', function ($scope, IamUser, $http, $rootScope, $window, CurrentUserService, $modal, authService) {

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
        authService.wrongCredentials = false;
    });

    $scope.logout = function () {
        $rootScope.$broadcast('event:auth-logoutConfirmed');
    };

    $scope.changePassword = function () {
        $scope.modalInstance = $modal.open({
            templateUrl: 'templates/change-password-dialog.tpl.html',
            backdrop: false,
            controller: 'ChangePasswordModalController',
            resolve: {
                user: function () {
                    return $scope.currentUser;
                },
                requestOldPassword: function () {
                    return true;
                }
            }
        });

        $scope.modalInstance.result.then(function (newBase64Credential) {
            IamUser.changePassword($scope.currentUser, newBase64Credential).then(function() {
                $window.sessionStorage.token = newBase64Credential;
            });
        });
    };
});