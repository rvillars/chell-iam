'use strict';
// Source: build/locale-en.js
try {
  angular.module('translations');
} catch (e) {
  angular.module('translations', ['pascalprecht.translate']);
}

angular.module('translations').config(function ($translateProvider) {
  $translateProvider.translations('en', {
    'CHELL_IAM': {
      'GROUP_LIST': {
        'CREATE_GROUP_BUTTON': 'Create Group',
        'COLUMN_TITLE': {
          'NAME': 'Name',
          'GROUP_ID': 'Group ID',
          'PARENT': 'Parent',
          'ACTIONS': 'Actions'
        },
        'VIEW_BUTTON': 'View',
        'EDIT_BUTTON': 'Edit',
        'DELETE_BUTTON': 'Delete',
        'GROUP_ID': 'Group ID',
        'PH_GENERATED': 'Generated',
        'NAME': 'Name',
        'PH_NAME': 'Name',
        'PARENT_GROUP': 'Parent Group',
        'COOSE_GROUP': '-- choose group --',
        'SAVE_BUTTON': 'Save',
        'CANCEL_BUTTON': 'Cancel'
      },
      'GROUP_VIEW_DIALOG': {
        'X_BUTTON': 'x',
        'GROUP_TITLE': 'Group',
        'GROUP_ID': 'Group ID',
        'PH_GROUP_ID': 'Generated',
        'NAME': 'Name',
        'PH_NAME': 'Name',
        'PARENT_GROUP': 'Parent group',
        'PH_GROUP': 'None',
        'CLOSE_BUTTON': 'Close'
      },
      'LOGIN_DIALOG': {
        'TITLE': 'Login',
        'FORGOT_PASSWORD': 'Forgot password?',
        'INCORRECT_LOGIN_PW': 'Incorrect Username or password!',
        'PH_LOGIN': 'Login',
        'PH_PASSWORD': 'Password',
        'REMEMBER_ME': 'Remember me',
        'LOGIN_BUTTON': 'Log in',
        'RESET_BUTTON': 'Reset'
      },
      'USER_LIST': {
        'CREATE_USER_BUTTON': 'Create User',
        'COLUMN_TITLE': {
          'NAME': 'Name',
          'LOGIN': 'Login',
          'DATE_REGISTERED': 'Date registered',
          'EMAIL': 'E-Mail',
          'USER_ID': 'User ID',
          'GROUPS': 'Groups',
          'STATE': 'State',
          'ACTIONS': 'Actions'
        },
        'VIEW_BUTTON': 'View',
        'EDIT_BUTTON': 'Edit',
        'DELETE_BUTTON': 'Delete',
        'SAVE_BUTTON': 'Save',
        'CANCEL_BUTTON': 'Cancel'
      },
      'USER_PROFILE': {
        'LOGIN': 'Login',
        'PH_LOGIN': 'Login',
        'USER_ID': 'User ID',
        'PH_USER_ID': 'Generated',
        'FIRSTNAME': 'Firstname',
        'PH_FIRSTNAME': 'Firstname',
        'LASTNAME': 'Lastname',
        'PH_LASTNAME': 'Lastname',
        'EMAIL': 'E-Mail',
        'PH_EMAIL': 'E-Mail',
        'GRAVATAR_EMAIL': 'Gravatar E-Mail',
        'PH_GRAVATAR_EMAIL': 'Gravatar E-Mail',
        'GROUPS': 'Groups',
        'CHOOSE_GROUP': '-- choose group --',
        'STATUS': 'Status',
        'ACTIVE': 'active',
        'INACTIVE': 'inactive',
        'PROFILE_PREVIEW': 'Profile preview'
      },
      'USER_VIEW_DIALOG': {
        'X_BUTTON': 'x',
        'USER_TITLE': 'User',
        'CLOSE_BUTTON': 'Close'
      }
    }
  });
  $translateProvider.preferredLanguage('en');
});
;// Source: build/interceptors.js
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
    'pascalprecht.translate',
    'translations',
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
    hasGroupId: function (groupId) {
      if (this.currentUser == null) {
        return false;
      }
      return this.currentUser.primaryGroup.id == groupId;
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
chellIam.factory('IamGroup', [
  'IamAdapter',
  function (IamAdapter) {
    return {
      query: function () {
        return IamAdapter.getGroupList();
      },
      get: function (id) {
        return IamAdapter.getGroup(id);
      },
      create: function (role) {
        return IamAdapter.createGroup(role);
      },
      update: function (role) {
        return IamAdapter.updateGroup(role);
      },
      remove: function (role) {
        return IamAdapter.removeGroup(role);
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
chellIam.directive('chellGroupList', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/group-list.tpl.html'
  };
});
chellIam.directive('chellUserProfile', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      user: '=',
      groups: '='
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
chellIam.directive('visibilityGroupId', [
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
          if (!CurrentUserService.hasGroupId(attrs.visibilityGroupId)) {
            element.hide();
          } else {
            element.show();
          }
        });
        $scope.$on('event:auth-loginConfirmed', function () {
          IamUser.self().then(function (user) {
            if (!CurrentUserService.hasGroupId(attrs.visibilityGroupId)) {
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
chellIam.directive('moveableGroupId', [
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
          if (!CurrentUserService.hasGroupId(attrs.moveableGroupId)) {
            $(element).addClass('box-locked');
          } else {
            $(element).removeClass('box-locked');
          }
        });
        $scope.$on('event:auth-loginConfirmed', function () {
          IamUser.self().then(function (user) {
            if (!CurrentUserService.hasGroupId(attrs.moveableGroupId)) {
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
  'IamGroup',
  'ngTableParams',
  function ($scope, $modal, IamUser, IamGroup, ngTableParams) {
    $scope.list = true;
    $scope.detail = false;
    $scope.users = [];
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
chellIam.controller('GroupListController', [
  '$scope',
  '$timeout',
  '$modal',
  'IamGroup',
  'ngTableParams',
  function ($scope, $timeout, $modal, IamGroup, ngTableParams) {
    $scope.list = true;
    $scope.detail = false;
    $scope.groups = [];
    $scope.editGroup = {};
    $scope.$watchCollection('groups', function () {
      if ($scope.tableParams) {
        $scope.tableParams.reload();
      }
    });
    IamGroup.query().then(function (groups) {
      $scope.groups = groups;
      $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10
      }, {
        total: $scope.groups.length,
        getData: function ($defer, params) {
          $defer.resolve($scope.groups.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        },
        $scope: {
          $data: {},
          $emit: function () {
          }
        }
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
      $scope.possibleParentGroups = $scope.groups.slice(0);
      $scope.showDetail();
    };
    $scope.edit = function (group) {
      $scope.editGroup = group;
      $scope.possibleParentGroups = $scope.groups.filter(function (group) {
        return group != $scope.editGroup;
      });
      $scope.showDetail();
    };
    $scope.remove = function (group) {
      if (!confirm('Are you sure?'))
        return;
      IamGroup.remove(group).then(function () {
        $scope.groups.splice($scope.groups.indexOf(group), 1);
      });
    };
    $scope.save = function () {
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
  }
]);
chellIam.controller('GroupViewModalController', [
  '$scope',
  '$modalInstance',
  'group',
  function ($scope, $modalInstance, group) {
    $scope.group = group;
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
angular.module('templates-chell-iam', ['templates/group-list.tpl.html', 'templates/group-view-dialog.tpl.html', 'templates/login-dialog.tpl.html', 'templates/user-list.tpl.html', 'templates/user-profile.tpl.html', 'templates/user-view-dialog.tpl.html']);

angular.module("templates/group-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/group-list.tpl.html",
    "<div ng-controller=\"GroupListController\">\n" +
    "    <div ng-show=\"list\">\n" +
    "        <button class=\"btn btn-primary btn-xs\" ng-click=\"create()\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-lock\"></i>{{'CHELL_IAM.GROUP_LIST.CREATE_GROUP_BUTTON'\n" +
    "            | translate}}\n" +
    "        </button>\n" +
    "        <table ng-table=\"tableParams\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered\" id=\"datatable\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th>{{'CHELL_IAM.GROUP_LIST.COLUMN_TITLE.NAME' | translate}}</th>\n" +
    "                <th>{{'CHELL_IAM.GROUP_LIST.COLUMN_TITLE.GROUP_ID' | translate}}</th>\n" +
    "                <th>{{'CHELL_IAM.GROUP_LIST.COLUMN_TITLE.PARENT' | translate}}</th>\n" +
    "                <th>{{'CHELL_IAM.GROUP_LIST.COLUMN_TITLE.ACTIONS' | translate}}</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"group in $data\">\n" +
    "                <td>{{group.name}}</td>\n" +
    "                <td>{{group.id}}</td>\n" +
    "                <td>{{group.parentId}}</td>\n" +
    "                <td class=\"center\">\n" +
    "                    <div class=\"btn-group btn-group-sm\">\n" +
    "                        <a class=\"btn btn-default\" rel=\"tooltip\" title=\"{{'CHELL_IAM.GROUP_LIST.VIEW_BUTTON' | translate}}\" ng-click=\"view(group)\">\n" +
    "                            <i class=\"glyphicon glyphicon-zoom-in icon-white\"></i>\n" +
    "                        </a>\n" +
    "                        <a class=\"btn btn-default\" rel=\"tooltip\" title=\"{{'CHELL_IAM.GROUP_LIST.EDIT_BUTTON' | translate}}\" ng-click=\"edit(group)\">\n" +
    "                            <i class=\"glyphicon glyphicon-edit icon-white\"></i>\n" +
    "                        </a>\n" +
    "                        <a class=\"btn btn-default\" rel=\"tooltip\" title=\"{{'CHELL_IAM.GROUP_LIST.DELETE_BUTTON' | translate}}\" ng-click=\"remove(group)\">\n" +
    "                            <i class=\"glyphicon glyphicon-trash icon-white\"></i>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div ng-show=\"detail\">\n" +
    "        <form id=\"groupDetail\">\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputGroupId\">{{'CHELL_IAM.GROUP_LIST.GROUP_ID' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputGroupId\" placeholder=\"{{'CHELL_IAM.GROUP_LIST.PH_GENERATED' | translate}}\" readonly=\"true\"\n" +
    "                           ng-model=\"editGroup.id\"/>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputGroupname\">{{'CHELL_IAM.GROUP_LIST.NAME' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputGroupname\" placeholder=\"{{'CHELL_IAM.GROUP_LIST.PH_NAME' | translate}}\" required=\"true\"\n" +
    "                           ng-model=\"editGroup.name\"/>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputParentGroup\">{{'CHELL_IAM.GROUP_LIST.PARENT_GROUP' | translate}}</label>\n" +
    "                    <select class=\"form-control\" id=\"inputParentGroup\" ng-model=\"editGroup.parentId\"\n" +
    "                            ng-options=\"group.id as (group.name) for group in possibleParentGroups\">\n" +
    "                        <option value=\"\">{{'CHELL_IAM.GROUP_LIST.COOSE_GROUP' | translate}}</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </fieldset>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"save()\">{{'CHELL_IAM.GROUP_LIST.SAVE_BUTTON' | translate}}</button>\n" +
    "            <button class=\"btn btn-default\" ng-click=\"cancel()\">{{'CHELL_IAM.GROUP_LIST.CANCEL_BUTTON' | translate}}</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/group-view-dialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/group-view-dialog.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <button class=\"close\" ng-click=\"cancel()\">{{'CHELL_IAM.GROUP_VIEW_DIALOG.X_BUTTON' | translate}}</button>\n" +
    "    <h3>{{'CHELL_IAM.GROUP_VIEW_DIALOG.GROUP_TITLE' | translate}}: {{group.name}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <form id=\"groupDetail\">\n" +
    "        <fieldset>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputGroupId\">{{'CHELL_IAM.GROUP_VIEW_DIALOG.GROUP_ID' | translate}}</label>\n" +
    "                <input class=\"form-control\" id=\"inputGroupId\" placeholder=\"{{'CHELL_IAM.GROUP_VIEW_DIALOG.PH_GROUP_ID' | translate}}\" readonly=\"true\" ng-model=\"group.id\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputGroupName\">{{'CHELL_IAM.GROUP_VIEW_DIALOG.NAME' | translate}}</label>\n" +
    "                <input class=\"form-control\" id=\"inputGroupName\" placeholder=\"{{'CHELL_IAM.GROUP_VIEW_DIALOG.PH_NAME' | translate}}\" readonly=\"true\" ng-model=\"group.name\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputParentGroup\">{{'CHELL_IAM.GROUP_VIEW_DIALOG.PARENT_GROUP' | translate}}</label>\n" +
    "                <input class=\"form-control\" id=\"inputParentGroup\" placeholder=\"{{'CHELL_IAM.GROUP_VIEW_DIALOG.PH_GROUP' | translate}}\" readonly=\"true\" ng-model=\"group.parentId\">\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"cancel()\">{{'CHELL_IAM.GROUP_VIEW_DIALOG.CLOSE_BUTTON' | translate}}</button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("templates/login-dialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/login-dialog.tpl.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <span class=\"glyphicon glyphicon-lock\"></span> {{'CHELL_IAM.LOGIN_DIALOG.TITLE' | translate}}\n" +
    "        <div style=\"float:right; font-size: 80%; position: relative; top:4px\"><a href=\"#\">{{'CHELL_IAM.LOGIN_DIALOG.FORGOT_PASSWORD' | translate}}</a></div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <form role=\"form\">\n" +
    "            <div class=\"alert alert-danger\" ng-show=\"wrongCredentials\">\n" +
    "                <a class=\"close\" data-dismiss=\"alert\" href=\"#\">×</a>{{'CHELL_IAM.LOGIN_DIALOG.INCORRECT_LOGIN_PW' | translate}}\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error has-feedback':wrongCredentials}\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div style=\"margin-bottom: 25px\" class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                        <input class=\"form-control\" id=\"inputLogin\" placeholder=\"{{'CHELL_IAM.LOGIN_DIALOG.PH_LOGIN' | translate}}\" required ng-model=\"$parent.login\" autofocus>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error has-feedback':wrongCredentials}\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div style=\"margin-bottom: 25px\" class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                        <input type=\"password\" class=\"form-control\" id=\"inputPassword\" placeholder=\"{{'CHELL_IAM.LOGIN_DIALOG.PH_PASSWORD' | translate}}\" required\n" +
    "                               ng-model=\"$parent.password\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div class=\"checkbox\">\n" +
    "                        <label>\n" +
    "                            <input type=\"checkbox\"/>\n" +
    "                            {{'CHELL_IAM.LOGIN_DIALOG.REMEMBER_ME' | translate}}\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group last\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-success btn-sm\" ng-click=\"signin()\">\n" +
    "                        {{'CHELL_IAM.LOGIN_DIALOG.LOGIN_BUTTON' | translate}}\n" +
    "                    </button>\n" +
    "                    <button type=\"reset\" class=\"btn btn-default btn-sm\">\n" +
    "                        {{'CHELL_IAM.LOGIN_DIALOG.RESET_BUTTON' | translate}}\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"panel-footer\">\n" +
    "        Not Registred? <a href=\"http://www.jquery2dotnet.com\">Register here</a>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/user-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-list.tpl.html",
    "<div ng-controller=\"UserListController\">\n" +
    "    <div ng-show=\"list\">\n" +
    "        <button class=\"btn btn-primary btn-xs\" ng-click=\"create()\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-user\"></i>{{'CHELL_IAM.USER_LIST.CREATE_USER_BUTTON' | translate}}</button>\n" +
    "        <table ng-table=\"tableParams\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered\" id=\"datatable\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th>{{'CHELL_IAM.USER_LIST.COLUMN_TITLE.NAME' | translate}}</th>\n" +
    "                <th>{{'CHELL_IAM.USER_LIST.COLUMN_TITLE.LOGIN' | translate}}</th>\n" +
    "                <th>{{'CHELL_IAM.USER_LIST.COLUMN_TITLE.DATE_REGISTERED' | translate}}</th>\n" +
    "                <th>{{'CHELL_IAM.USER_LIST.COLUMN_TITLE.EMAIL' | translate}}</th>\n" +
    "                <th>{{'CHELL_IAM.USER_LIST.COLUMN_TITLE.USER_ID' | translate}}</th>\n" +
    "                <th>{{'CHELL_IAM.USER_LIST.COLUMN_TITLE.GROUPS' | translate}}</th>\n" +
    "                <th>{{'CHELL_IAM.USER_LIST.COLUMN_TITLE.STATE' | translate}}</th>\n" +
    "                <th>{{'CHELL_IAM.USER_LIST.COLUMN_TITLE.ACTIONS' | translate}}</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-repeat=\"user in $data\">\n" +
    "                <td data-title=\"'Name'\">{{user.fullname}}</td>\n" +
    "                <td data-title=\"'Login'\">{{user.login}}</td>\n" +
    "                <td data-title=\"'Date registered'\" class=\"center\">{{user.creationDate | date:'dd.MM.yyyy'}}</td>\n" +
    "                <td data-title=\"'E-Mail'\">{{user.email}}</td>\n" +
    "                <td data-title=\"'User ID'\" class=\"center\">{{user.id}}</td>\n" +
    "                <td data-title=\"'Primary Group'\" class=\"center\">{{user.primaryGroup.name}}</td>\n" +
    "                <td data-title=\"'State'\" class=\"center\">\n" +
    "                    <span class=\"badge\">{{user.status}}</span>\n" +
    "                </td>\n" +
    "                <td data-title=\"'Actions'\" class=\"center\">\n" +
    "                    <div class=\"btn-group btn-group-sm\">\n" +
    "                        <button class=\"btn btn-default\" title=\"{{'CHELL_IAM.USER_LIST.VIEW_BUTTON' | translate}}\">\n" +
    "                            <i class=\"glyphicon glyphicon-zoom-in icon-white\" ng-click=\"view(user)\"></i>\n" +
    "                        </button>\n" +
    "                        <button class=\"btn btn-default\" title=\"{{'CHELL_IAM.USER_LIST.EDIT_BUTTON' | translate}}\" ng-click=\"edit(user)\">\n" +
    "                            <i class=\"glyphicon glyphicon-edit icon-white\"></i>\n" +
    "                        </button>\n" +
    "                        <button class=\"btn btn-default\" title=\"{{'CHELL_IAM.USER_LIST.DELETE_BUTTON' | translate}}\" ng-click=\"remove(user)\">\n" +
    "                            <i class=\"glyphicon glyphicon-trash icon-white\"></i>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div ng-show=\"detail\">\n" +
    "        <chell-user-profile user=\"editUser\" groups=\"groups\">\n" +
    "            <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"save()\">{{'CHELL_IAM.USER_LIST.SAVE_BUTTON' | translate}}</button>\n" +
    "            <button class=\"btn btn-default\" ng-click=\"cancel()\">{{'CHELL_IAM.USER_LIST.CANCEL_BUTTON' | translate}}</button>\n" +
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
    "                    <label for=\"inputLogin\">{{'CHELL_IAM.USER_PROFILE.LOGIN' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputLogin\" placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_LOGIN' | translate}}\" readonly=\"true\" ng-model=\"user.login\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputUserId\">{{'CHELL_IAM.USER_PROFILE.USER_ID' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputUserId\" placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_USER_ID' | translate}}\" readonly=\"true\" ng-model=\"user.id\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputFirstname\">{{'CHELL_IAM.USER_PROFILE.FIRSTNAME' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputFirstname\" placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_FIRSTNAME' | translate}}\" required=\"true\" ng-model=\"user.firstname\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputLastname\">{{'CHELL_IAM.USER_PROFILE.LASTNAME' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputLastname\" placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_LASTNAME' | translate}}\" required=\"true\" ng-model=\"user.lastname\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputEMail\">{{'CHELL_IAM.USER_PROFILE.EMAIL' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputEMail\" placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_EMAIL' | translate}}\" type=\"email\" ng-model=\"user.email\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputEMail\">{{'CHELL_IAM.USER_PROFILE.GRAVATAR_EMAIL' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputGravatarMail\" placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_GRAVATAR_EMAIL' | translate}}\" type=\"email\" ng-model=\"user.gravatarMail\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputPrimaryGroup\">{{'CHELL_IAM.USER_PROFILE.GROUPS' | translate}}</label>\n" +
    "                    <select class=\"form-control\" id=\"inputPrimaryGroup\" ng-model=\"user.primaryGroup\" ng-options=\"group as (group.name) for group in groups\">\n" +
    "                        <option value=\"\">{{'CHELL_IAM.USER_PROFILE.CHOOSE_GROUP' | translate}}</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputStatus\">{{'CHELL_IAM.USER_PROFILE.STATUS' | translate}}</label>\n" +
    "                    <select class=\"form-control\" id=\"inputStatus\" ng-model=\"user.status\">\n" +
    "                        <option>{{'CHELL_IAM.USER_PROFILE.ACTIVE' | translate}}</option>\n" +
    "                        <option>{{'CHELL_IAM.USER_PROFILE.INACTIVE' | translate}}</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </fieldset>\n" +
    "            <div ng-transclude></div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4\">\n" +
    "        <div style=\"max-width: 220px; margin: 15px 5px\">\n" +
    "            <label>{{'CHELL_IAM.USER_PROFILE.PROFILE_PREVIEW' | translate}}</label>\n" +
    "            <img height=\"220\" width=\"220\" ng-src=\"{{user.gravatarMail ? ('http://www.gravatar.com/avatar/'+(user.gravatarMail | md5)+'?s=220') : user.photo}}\">\n" +
    "            <h1>\n" +
    "                <span style=\"color: #333; font-size: 26px; line-height: 30px;\">{{currentUser.fullname}}</span>\n" +
    "                        <span style=\"display: block; overflow: hidden; width: 100%; font-size: 20px; font-style: normal; font-weight: 300;\n" +
    "                        line-height: 24px; color: #666; text-overflow: ellipsis;\">{{currentUser.login}}</span>\n" +
    "            </h1>\n" +
    "            <ul style=\"list-style: none; padding-left: 0px; padding-top: 15px; padding-bottom: 15px; border-top: 1px solid #428bca; border-bottom: 1px solid #428bca\">\n" +
    "                <li style=\"color: #428bca;\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-lock\"></i>  {{user.primaryGroup.name}}</li>\n" +
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
    "    <button class=\"close\" ng-click=\"cancel()\">{{'CHELL_IAM.USER_VIEW_DIALOG.X_BUTTON' | translate}}</button>\n" +
    "    <h3>{{'CHELL_IAM.USER_VIEW_DIALOG.USER_TITLE' | translate}}: {{user.fullname}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <chell-user-profile user=\"user\"/>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"cancel()\">{{'CHELL_IAM.USER_VIEW_DIALOG.CLOSE_BUTTON' | translate}}</button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
