'use strict';
// Source: build/interceptors.js
var httpAuthInterceptor = angular.module('http-auth-interceptor', ['http-auth-interceptor-buffer']);
httpAuthInterceptor.factory('authService', [
  '$rootScope',
  'httpBuffer',
  function ($rootScope, httpBuffer) {
    return {
      wrongCredentials: false,
      loginConfirmed: function (data, configUpdater) {
        var updater = configUpdater || function (config) {
            return config;
          };
        $rootScope.$broadcast('event:auth-loginConfirmed', data);
        httpBuffer.retryAll(updater);
      },
      loginCancelled: function (data, reason) {
        httpBuffer.rejectAll(reason);
        $rootScope.$broadcast('event:auth-loginCancelled', data);
      }
    };
  }
]);
httpAuthInterceptor.factory('authInterceptor', [
  '$rootScope',
  '$q',
  'httpBuffer',
  '$window',
  function ($rootScope, $q, httpBuffer, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = $window.sessionStorage.token;
        }
        return config;
      },
      responseError: function (rejection) {
        if (rejection.status === 401 && !rejection.config.ignoreAuthModule) {
          var deferred = $q.defer();
          httpBuffer.append(rejection.config, deferred);
          $rootScope.$broadcast('event:auth-loginRequired', rejection);
          return deferred.promise;
        }
        return $q.reject(rejection);
      }
    };
  }
]);
httpAuthInterceptor.config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }
]);
var httpAuthInterceptorBuffer = angular.module('http-auth-interceptor-buffer', []);
httpAuthInterceptorBuffer.factory('httpBuffer', [
  '$injector',
  function ($injector) {
    var buffer = [];
    var $http;
    function retryHttpRequest(config, deferred) {
      function successCallback(response) {
        deferred.resolve(response);
      }
      function errorCallback(response) {
        deferred.reject(response);
      }
      $http = $http || $injector.get('$http');
      $http(config).then(successCallback, errorCallback);
    }
    return {
      append: function (config, deferred) {
        buffer.push({
          config: config,
          deferred: deferred
        });
      },
      rejectAll: function (reason) {
        if (reason) {
          for (var i = 0; i < buffer.length; ++i) {
            buffer[i].deferred.reject(reason);
          }
        }
        buffer = [];
      },
      retryAll: function (updater) {
        for (var i = 0; i < buffer.length; ++i) {
          retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
        }
        buffer = [];
      }
    };
  }
]);;// Source: build/module.js
var chellIam = angular.module('chell-iam', [
    'templates-chell-iam',
    'ngTable',
    'underscore',
    'angular-underscore',
    'http-auth-interceptor',
    'ui.bootstrap',
    'angular-md5',
    'base64',
    'ngMockE2E'
  ]);
chellIam.config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);
chellIam.run([
  'CurrentUserService',
  'IamUser',
  function (CurrentUserService, IamUser) {
    CurrentUserService.authPromise = IamUser.self().then(function (user) {
      CurrentUserService.setCurrentUser(user);
      return user;
    });
  }
]);
chellIam.filter('md5', [
  'md5',
  function (md5) {
    return function (input) {
      return md5.createHash(input);
    };
  }
]);;// Source: build/services.js
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
    hasRoleId: function (roleId) {
      if (this.currentUser == null) {
        return false;
      }
      return this.currentUser.primaryRole.id == roleId;
    }
  };
});;// Source: build/models.js
var chellIam = angular.module('chell-iam');
chellIam.factory('IamUser', [
  'IamAdapter',
  function (IamAdapter) {
    return {
      query: function () {
        return IamAdapter.getUserList();
      },
      get: function (id) {
        return IamAdapter.getUser(id);
      },
      self: function () {
        return IamAdapter.getAuthenticatedUser();
      },
      create: function (user) {
        return IamAdapter.createUser(user);
      },
      update: function (user) {
        return IamAdapter.updateUser(user);
      },
      remove: function (user) {
        return IamAdapter.removeUser(user);
      }
    };
  }
]);
chellIam.factory('IamRole', [
  'IamAdapter',
  function (IamAdapter) {
    return {
      query: function () {
        return IamAdapter.getRoleList();
      },
      get: function (id) {
        return IamAdapter.getRole(id);
      },
      create: function (role) {
        return IamAdapter.createRole(role);
      },
      update: function (role) {
        return IamAdapter.updateRole(role);
      },
      remove: function (role) {
        return IamAdapter.removeRole(role);
      }
    };
  }
]);;// Source: build/directives.js
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
chellIam.directive('chellLoginRequired', [
  '$modal',
  function ($modal) {
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
  }
]);
chellIam.directive('chellLoginDialog', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/login-dialog.html'
  };
});
chellIam.directive('visibilityRoleId', [
  'CurrentUserService',
  'IamUser',
  function (CurrentUserService, IamUser) {
    return {
      restrict: 'A',
      controller: [
        '$scope',
        '$element',
        function ($scope, $element) {
          $element.hide();
        }
      ],
      link: function ($scope, element, attrs) {
        IamUser.self().then(function (user) {
          if (!CurrentUserService.hasRoleId(attrs.visibilityRoleId)) {
            element.hide();
          } else {
            element.show();
          }
        });
        $scope.$on('event:auth-loginConfirmed', function () {
          IamUser.self().then(function (user) {
            if (!CurrentUserService.hasRoleId(attrs.visibilityRoleId)) {
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
  }
]);
chellIam.directive('moveableRoleId', [
  'CurrentUserService',
  'IamUser',
  function (CurrentUserService, IamUser) {
    return {
      restrict: 'A',
      controller: [
        '$scope',
        '$element',
        function ($scope, $element) {
          $($element).addClass('box-locked');
        }
      ],
      link: function ($scope, element, attrs) {
        IamUser.self().then(function (user) {
          if (!CurrentUserService.hasRoleId(attrs.moveableRoleId)) {
            $(element).addClass('box-locked');
          } else {
            $(element).removeClass('box-locked');
          }
        });
        $scope.$on('event:auth-loginConfirmed', function () {
          IamUser.self().then(function (user) {
            if (!CurrentUserService.hasRoleId(attrs.moveableRoleId)) {
              $(element).addClass('box-locked');
            } else {
              $(element).removeClass('box-locked');
            }
          });
        });
        $scope.$on('event:auth-logoutConfirmed', function () {
          $(element).addClass('box-locked');
        });
      }
    };
  }
]);
angular.module('ui.bootstrap.modal').directive('modalWindow', [
  '$timeout',
  function ($timeout) {
    return {
      priority: 1,
      link: function (scope, element, attrs) {
        $timeout(function () {
          element.find('[autofocus]').focus();
        });
      }
    };
  }
]);;// Source: build/controllers.js
var chellIam = angular.module('chell-iam');
chellIam.controller('UserListController', [
  '$scope',
  '$modal',
  'IamUser',
  'IamRole',
  'ngTableParams',
  function ($scope, $modal, IamUser, IamRole, ngTableParams) {
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
        page: 1,
        count: 10
      }, {
        total: $scope.users.length,
        getData: function ($defer, params) {
          $defer.resolve($scope.users.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        },
        $scope: {
          $data: {},
          $emit: function () {
          }
        }
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
      if (!confirm('Are you sure?'))
        return;
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
  }
]);
chellIam.controller('RoleListController', [
  '$scope',
  '$timeout',
  '$modal',
  'IamRole',
  'ngTableParams',
  function ($scope, $timeout, $modal, IamRole, ngTableParams) {
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
        page: 1,
        count: 10
      }, {
        total: $scope.roles.length,
        getData: function ($defer, params) {
          $defer.resolve($scope.roles.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        },
        $scope: {
          $data: {},
          $emit: function () {
          }
        }
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
      if (!confirm('Are you sure?'))
        return;
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
        IamRole.update($scope.editRole).then(function (role) {
        });
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
  }
]);
chellIam.controller('RoleViewModalController', [
  '$scope',
  '$modalInstance',
  'role',
  function ($scope, $modalInstance, role) {
    $scope.role = role;
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);
chellIam.controller('UserViewModalController', [
  '$scope',
  '$modalInstance',
  'user',
  function ($scope, $modalInstance, user) {
    $scope.user = user;
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);
chellIam.controller('AuthenticationController', [
  '$scope',
  'IamAdapter',
  'authService',
  '$base64',
  '$http',
  '$window',
  function ($scope, IamAdapter, authService, $base64, $http, $window) {
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
  }
]);
chellIam.controller('CurrentUserController', [
  '$scope',
  'IamUser',
  '$http',
  '$rootScope',
  '$window',
  'CurrentUserService',
  function ($scope, IamUser, $http, $rootScope, $window, CurrentUserService) {
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
  }
]);;// Source: build/templates.js
angular.module('templates-chell-iam', ['templates/login-dialog.tpl.html', 'templates/role-list.tpl.html', 'templates/role-view-dialog.tpl.html', 'templates/user-list.tpl.html', 'templates/user-profile.tpl.html', 'templates/user-view-dialog.tpl.html']);

angular.module("templates/login-dialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/login-dialog.tpl.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <span class=\"glyphicon glyphicon-lock\"></span> Login\n" +
    "        <div style=\"float:right; font-size: 80%; position: relative; top:4px\"><a href=\"#\">Forgot password?</a></div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <form role=\"form\">\n" +
    "            <div class=\"alert alert-danger\" ng-show=\"wrongCredentials\">\n" +
    "                <a class=\"close\" data-dismiss=\"alert\" href=\"#\">×</a>Incorrect Username or Password!\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error has-feedback':wrongCredentials}\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div style=\"margin-bottom: 25px\" class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                        <input class=\"form-control\" id=\"inputLogin\" placeholder=\"Login\" required ng-model=\"$parent.login\" autofocus>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error has-feedback':wrongCredentials}\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div style=\"margin-bottom: 25px\" class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                        <input type=\"password\" class=\"form-control\" id=\"inputPassword\" placeholder=\"Password\" required\n" +
    "                               ng-model=\"$parent.password\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div class=\"checkbox\">\n" +
    "                        <label>\n" +
    "                            <input type=\"checkbox\"/>\n" +
    "                            Remember me\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group last\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-success btn-sm\" ng-click=\"signin()\">\n" +
    "                        Log in\n" +
    "                    </button>\n" +
    "                    <button type=\"reset\" class=\"btn btn-default btn-sm\">\n" +
    "                        Reset\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"panel-footer\">\n" +
    "        Not Registred? <a href=\"http://www.jquery2dotnet.com\">Register here</a></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/role-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/role-list.tpl.html",
    "<div ng-controller=\"RoleListController\">\n" +
    "    <div ng-show=\"list\">\n" +
    "        <button class=\"btn btn-primary btn-xs\" ng-click=\"create()\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-lock\"></i>Create Role</button>\n" +
    "        <table ng-table=\"tableParams\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered\" id=\"datatable\">\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"role in $data\">\n" +
    "                <td data-title=\"'Name'\">{{role.name}}</td>\n" +
    "                <td data-title=\"'Role ID'\">{{role.id}}</td>\n" +
    "                <td data-title=\"'Parent ID'\">{{role.parentId}}</td>\n" +
    "                <td data-title=\"'Actions'\" class=\"center\">\n" +
    "                    <div class=\"btn-group btn-group-sm\">\n" +
    "                        <a class=\"btn btn-default\" rel=\"tooltip\" title=\"View\" ng-click=\"view(role)\">\n" +
    "                            <i class=\"glyphicon glyphicon-zoom-in icon-white\"></i>\n" +
    "                        </a>\n" +
    "                        <a class=\"btn btn-default\" rel=\"tooltip\" title=\"Edit\" ng-click=\"edit(role)\">\n" +
    "                            <i class=\"glyphicon glyphicon-edit icon-white\"></i>\n" +
    "                        </a>\n" +
    "                        <a class=\"btn btn-default\" rel=\"tooltip\" title=\"Delete\" ng-click=\"remove(role)\">\n" +
    "                            <i class=\"glyphicon glyphicon-trash icon-white\"></i>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div ng-show=\"detail\">\n" +
    "        <form id=\"roleDetail\">\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputRoleId\">Role ID</label>\n" +
    "                    <input class=\"form-control\" id=\"inputRoleId\" placeholder=\"Generated\" readonly=\"true\" ng-model=\"editRole.id\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputRolename\">Name</label>\n" +
    "                    <input class=\"form-control\" id=\"inputRolename\" placeholder=\"Name\" required=\"true\" ng-model=\"editRole.name\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputParentRole\">Parent Role</label>\n" +
    "                    <select class=\"form-control\" id=\"inputParentRole\" ng-model=\"editRole.parentId\" ng-options=\"role.id as (role.name) for role in possibleParentRoles\">\n" +
    "                        <option value=\"\">-- choose role --</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </fieldset>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"save()\">Save</button>\n" +
    "            <button class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/role-view-dialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/role-view-dialog.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <button class=\"close\" ng-click=\"cancel()\">×</button>\n" +
    "    <h3>Role: {{role.name}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <form id=\"roleDetail\">\n" +
    "        <fieldset>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputRoleId\">Role ID</label>\n" +
    "                <input class=\"form-control\" id=\"inputRoleId\" placeholder=\"Generated\" readonly=\"true\" ng-model=\"role.id\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputRolename\">Name</label>\n" +
    "                <input class=\"form-control\" id=\"inputRolename\" placeholder=\"Name\" readonly=\"true\" ng-model=\"role.name\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputParentRole\">Parent Role</label>\n" +
    "                <input class=\"form-control\" id=\"inputParentRole\" placeholder=\"None\" readonly=\"true\" ng-model=\"role.parentId\">\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"cancel()\">Close</button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("templates/user-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-list.tpl.html",
    "<div ng-controller=\"UserListController\">\n" +
    "    <div ng-show=\"list\">\n" +
    "        <button class=\"btn btn-primary btn-xs\" ng-click=\"create()\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-user\"></i>Create User</button>\n" +
    "        <table ng-table=\"tableParams\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered\" id=\"datatable\">\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"user in $data\">\n" +
    "                <td data-title=\"'Name'\">{{user.fullname}}</td>\n" +
    "                <td data-title=\"'Login'\">{{user.login}}</td>\n" +
    "                <td data-title=\"'Date registered'\" class=\"center\">{{user.creationDate | date:'dd.MM.yyyy'}}</td>\n" +
    "                <td data-title=\"'E-Mail'\">{{user.email}}</td>\n" +
    "                <td data-title=\"'User ID'\" class=\"center\">{{user.id}}</td>\n" +
    "                <td data-title=\"'Primary Role'\" class=\"center\">{{user.primaryRole.name}}</td>\n" +
    "                <td data-title=\"'State'\" class=\"center\">\n" +
    "                    <span class=\"badge\">{{user.status}}</span>\n" +
    "                </td>\n" +
    "                <td data-title=\"'Actions'\" class=\"center\">\n" +
    "                    <div class=\"btn-group btn-group-sm\">\n" +
    "                        <button class=\"btn btn-default\" title=\"View\">\n" +
    "                            <i class=\"glyphicon glyphicon-zoom-in icon-white\" ng-click=\"view(user)\"></i>\n" +
    "                        </button>\n" +
    "                        <button class=\"btn btn-default\" title=\"Edit\" ng-click=\"edit(user)\">\n" +
    "                            <i class=\"glyphicon glyphicon-edit icon-white\"></i>\n" +
    "                        </button>\n" +
    "                        <button class=\"btn btn-default\" title=\"Delete\" ng-click=\"remove(user)\">\n" +
    "                            <i class=\"glyphicon glyphicon-trash icon-white\"></i>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div ng-show=\"detail\">\n" +
    "        <chell-user-profile user=\"editUser\" roles=\"roles\">\n" +
    "            <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"save()\">Save</button>\n" +
    "            <button class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "        </chell-user-profile>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/user-profile.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-profile.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-8\">\n" +
    "        <form id=\"userProfile\">\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputLogin\">Login</label>\n" +
    "                    <input class=\"form-control\" id=\"inputLogin\" placeholder=\"Login\" readonly=\"true\" ng-model=\"user.login\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputUserId\">User ID</label>\n" +
    "                    <input class=\"form-control\" id=\"inputUserId\" placeholder=\"Generated\" readonly=\"true\" ng-model=\"user.id\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputFirstname\">Firstname</label>\n" +
    "                    <input class=\"form-control\" id=\"inputFirstname\" placeholder=\"Name\" required=\"true\" ng-model=\"user.firstname\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputLastname\">Lastname</label>\n" +
    "                    <input class=\"form-control\" id=\"inputLastname\" placeholder=\"Lastname\" required=\"true\" ng-model=\"user.lastname\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputEMail\">E-Mail</label>\n" +
    "                    <input class=\"form-control\" id=\"inputEMail\" placeholder=\"E-Mail\" type=\"email\" ng-model=\"user.email\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputEMail\">Gravatar E-Mail</label>\n" +
    "                    <input class=\"form-control\" id=\"inputGravatarMail\" placeholder=\"Gravatar E-Mail\" type=\"email\" ng-model=\"user.gravatarMail\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputPrimaryRole\">Primary Role</label>\n" +
    "                    <select class=\"form-control\" id=\"inputPrimaryRole\" ng-model=\"user.primaryRole\" ng-options=\"role as (role.name) for role in roles\">\n" +
    "                        <option value=\"\">-- choose role --</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputStatus\">Status</label>\n" +
    "                    <select class=\"form-control\" id=\"inputStatus\" ng-model=\"user.status\">\n" +
    "                        <option>active</option>\n" +
    "                        <option>inactive</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </fieldset>\n" +
    "            <div ng-transclude></div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4\">\n" +
    "        <div style=\"max-width: 220px; margin: 15px 5px\">\n" +
    "            <label>Profile Preview</label>\n" +
    "            <img height=\"220\" width=\"220\" ng-src=\"{{user.gravatarMail ? ('http://www.gravatar.com/avatar/'+(user.gravatarMail | md5)+'?s=220') : user.photo}}\">\n" +
    "            <h1>\n" +
    "                <span style=\"color: #333; font-size: 26px; line-height: 30px;\">{{currentUser.fullname}}</span>\n" +
    "                        <span style=\"display: block; overflow: hidden; width: 100%; font-size: 20px; font-style: normal; font-weight: 300;\n" +
    "                        line-height: 24px; color: #666; text-overflow: ellipsis;\">{{currentUser.login}}</span>\n" +
    "            </h1>\n" +
    "            <ul style=\"list-style: none; padding-left: 0px; padding-top: 15px; padding-bottom: 15px; border-top: 1px solid #428bca; border-bottom: 1px solid #428bca\">\n" +
    "                <li style=\"color: #428bca;\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-lock\"></i>  {{user.primaryRole.name}}</li>\n" +
    "                <li style=\"color: #428bca;\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-envelope\"></i>  {{user.email}}</li>\n" +
    "                <li style=\"color: #428bca;\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-time\"></i>  {{user.creationDate | date:'dd.MM.yyyy'}}</li>\n" +
    "                <li style=\"color: #428bca;\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-flag\"></i>  {{user.status}}</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/user-view-dialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-view-dialog.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <button class=\"close\" ng-click=\"cancel()\">×</button>\n" +
    "    <h3>User: {{user.fullname}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <chell-user-profile user=\"user\"/>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"cancel()\">Close</button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
