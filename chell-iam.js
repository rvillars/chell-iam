'use strict';
// Source: build/locale-en.js
try {
  angular.module('translations');
} catch (e) {
  angular.module('translations', ['pascalprecht.translate']);
}

angular.module('translations').config(['$translateProvider',
  function ($translateProvider) {
    $translateProvider.translations('en', {
      'CHELL_IAM': {
        'USER_LIST': {
          'REMOVE_QUESTION': 'Are you sure?',
          'VIEW_BUTTON': 'View',
          'EDIT_BUTTON': 'Edit',
          'DELETE_BUTTON': 'Delete',
          'PASSWORD_CHANGE_BUTTON': 'Change Password',
          'CREATE_USER_BUTTON': 'New User',
          'FILTER_ACTIVE': 'Activated',
          'FILTER_INACTIVE': 'Inactive',
          'SAVE_BUTTON': 'Save',
          'CANCEL_BUTTON': 'Cancel',
          'COLUMN_TITLE': {
            'NAME': 'Name',
            'LOGIN': 'Login',
            'DATE_REGISTERED': 'Creation Date',
            'GROUPS': 'Groups',
            'STATUS': 'Status',
            'ACTIONS': 'Actions'
          }
        },
        'GROUP_LIST': {
          'REMOVE_QUESTION': 'Are you sure?',
          'VIEW_BUTTON': 'View',
          'EDIT_BUTTON': 'Edit',
          'DELETE_BUTTON': 'Delete',
          'CREATE_GROUP_BUTTON': 'New Group',
          'COLUMN_TITLE': {
            'NAME': 'Name',
            'MEMBERS': 'Members',
            'ACTIONS': 'Actions'
          }
        },
        'CHANGE_PASSWORD_DIALOG': {
          'X_BUTTON': 'x',
          'TITLE': 'Change Password',
          'INCORRECT_OLD_PW': 'Incorrect old Password',
          'PASSWORDS_NOT_MATCHING': 'Password do not match',
          'PH_NEW_PASSWORD': 'New Password',
          'PH_REPEAT_PASSWORD': 'Repeat Password',
          'PH_OLD_PASSWORD': 'Old Password',
          'PASSWORD_INFO_LINK': 'Password Info',
          'PASSWORD_INFO': 'Password must be between 4 and 15 characters and must consist at least one capitel character.',
          'PASSWORD_PATTERN_INFO': 'Password Pattern Regex',
          'CANCEL_BUTTON': 'Cancel',
          'CLOSE_BUTTON': 'Set Password'
        },
        'GROUP_FORM': {
          'GROUP_ID': 'Group ID',
          'PH_GENERATED': 'Generated',
          'CREATION_DATE': 'Creation Date',
          'PH_CREATION_DATE': 'Generated',
          'NAME': 'Name',
          'PH_NAME': 'Name',
          'ERROR_NAME': 'A group name is required',
          'MEMBERS': 'Members',
          'SAVE_BUTTON': 'Save',
          'CANCEL_BUTTON': 'Cancel'
        },
        'GROUP_VIEW_DIALOG': {
          'X_BUTTON': 'x',
          'GROUP_TITLE': 'Group',
          'GROUP_ID': 'Group ID',
          'PH_GROUP_ID': 'Generated',
          'CREATION_DATE': 'Creation Date',
          'PH_CREATION_DATE': 'Generated',
          'NAME': 'Name',
          'PH_NAME': 'Name',
          'USERS': 'Member users',
          'GROUPS': 'Member groups',
          'CLOSE_BUTTON': 'Close'
        },
        'LOGIN_DIALOG': {
          'TITLE': 'Login',
          'FORGOT_PASSWORD': 'Forgot password?',
          'INCORRECT_LOGIN_PW': 'Incorrect Username or password!',
          'PH_LOGIN': 'Login (Use login \'chellAdmin\')',
          'PH_PASSWORD': 'Password (Use password \'chellAdmin\')',
          'REMEMBER_ME': 'Remember me',
          'RESET_BUTTON': 'Reset',
          'LOGIN_BUTTON': 'Log in'
        },
        'USER_FORM': {
          'USER_ID': 'User ID',
          'PH_USER_ID': 'Generated',
          'EXTERNAL_ID': 'External ID',
          'PH_EXTERNAL_ID': 'External ID',
          'LOGIN': 'Login',
          'PH_LOGIN': 'Login',
          'ERROR_LOGIN': 'A login name is required',
          'DISPLAY': 'Display Name',
          'PH_DISPLAY': 'Display Name',
          'FIRSTNAME': 'Firstname',
          'PH_FIRSTNAME': 'Firstname',
          'LASTNAME': 'Lastname',
          'PH_LASTNAME': 'Lastname',
          'TITLE': 'Title',
          'PH_TITLE': 'Title',
          'EMAIL': 'E-Mail',
          'PHONE': 'Phone',
          'IMS': 'Instant Messaging',
          'LANGUAGE': 'Language',
          'ADRESSES': 'Addresses',
          'STREET': 'Street',
          'PH_STREET': 'Street',
          'ZIP': 'Zip',
          'PH_ZIP': 'Zip',
          'CITY': 'City',
          'PH_CITY': 'City',
          'REGION': 'Region',
          'PH_REGION': 'Region',
          'COUNTRY': 'Country',
          'PH_COUNTRY': 'Country',
          'STATUS': 'Status',
          'ACTIVE': 'Active',
          'GROUPS': 'Groups'
        },
        'USER_PROFILE': {
          'USER_ID': 'User ID',
          'PH_USER_ID': 'Generated',
          'EXTERNAL_ID': 'External ID',
          'PH_EXTERNAL_ID': 'External ID',
          'LOGIN': 'Login',
          'PH_LOGIN': 'Login',
          'DISPLAY': 'Display Name',
          'PH_DISPLAY': 'Display Name',
          'FIRSTNAME': 'Firstname',
          'PH_FIRSTNAME': 'Firstname',
          'LASTNAME': 'Lastname',
          'PH_LASTNAME': 'Lastname',
          'TITLE': 'Title',
          'PH_TITLE': 'Title',
          'EMAIL': 'E-Mail',
          'PHONE': 'Phone',
          'IMS': 'Instant Messaging',
          'LANGUAGE': 'Language',
          'ADRESSES': 'Addresses',
          'STREET': 'Street',
          'PH_STREET': 'Street',
          'ZIP': 'Zip',
          'PH_ZIP': 'Zip',
          'CITY': 'City',
          'PH_CITY': 'City',
          'REGION': 'Region',
          'PH_REGION': 'Region',
          'COUNTRY': 'Country',
          'PH_COUNTRY': 'Country',
          'GROUPS': 'Groups',
          'SAVE_BUTTON': 'Save',
          'PROFILE_PREVIEW': 'Profile preview',
          'CANCEL_BUTTON': 'Cancel',
          'STATUS': 'Status',
          'ACTIVE': 'Active',
          'LOGIN_REQUIRED_ERROR': 'Login required'
        },
        'USER_VIEW_DIALOG': {
          'X_BUTTON': 'x',
          'USER_TITLE': 'User',
          'CLOSE_BUTTON': 'Close'
        }
      }
    });
    $translateProvider.preferredLanguage('en');
  }
]);
;// Source: build/preferences.js
var preferences = angular.module('preferences', []);
preferences.constant('$preferences', { 'CHELL_IAM': { 'SECURITY': { 'PASSWORD_PATTERN': /^(?=.*[a-z])(?=.*[A-Z]).{4,15}$/ } } });;// Source: build/interceptors.js
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
    'multi-select',
    'translations',
    'preferences',
    'base64'
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
    hasGroupId: function (groupId, user) {
      if (this.currentUser == null && user == null) {
        return false;
      }
      if (user != null) {
        return user.groups.some(function (group) {
          return group.value == groupId;
        });
      } else {
        return this.currentUser.groups.some(function (group) {
          return group.value == groupId;
        });
      }
    },
    hasGroupName: function (groupName, user) {
      if (this.currentUser == null && user == null) {
        return false;
      }
      if (user != null) {
        return user.groups.some(function (group) {
          return group.display == groupName;
        });
      } else {
        return this.currentUser.groups.some(function (group) {
          return group.display == groupName;
        });
      }
    }
  };
});
chellIam.factory('uuid', function () {
  return {
    create: function () {
      function _p8(s) {
        var p = (Math.random().toString(16) + '000000000').substr(2, 8);
        return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
      }
      return _p8() + _p8(true) + _p8(true) + _p8();
    },
    empty: function () {
      return '00000000-0000-0000-0000-000000000000';
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
      },
      changePassword: function (user, newBase64Credential) {
        return IamAdapter.changePassword(user, newBase64Credential);
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
    link: function (scope, element, attrs, ctrl, transclude) {
      element.find('#transclude').replaceWith(transclude());
    },
    templateUrl: 'templates/user-button.tpl.html'
  };
});
chellIam.directive('chellLoginRequired', [
  '$modal',
  function ($modal) {
    return {
      restrict: 'EAC',
      scope: {
        preLoginHook: '&?',
        postLoginHook: '&?'
      },
      link: function (scope, element, attrs) {
        var loginModal;
        scope.$on('event:auth-loginRequired', function () {
          if (attrs.preLoginHook) {
            scope.preLoginHook();
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
          if (attrs.preLoginHook) {
            scope.preLoginHook();
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
          if (attrs.postLoginHook) {
            scope.postLoginHook();
            return;
          }
          if (loginModal) {
            loginModal.close();
            loginModal = null;
          }
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
chellIam.directive('visibleByGroup', [
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
  }
]);
chellIam.directive('hasGroup', [
  'CurrentUserService',
  'IamUser',
  function (CurrentUserService, IamUser) {
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
  }
]);
chellIam.directive('visibleByLogin', [
  'CurrentUserService',
  'IamUser',
  function (CurrentUserService, IamUser) {
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        IamUser.self().then(function (user) {
          if (!CurrentUserService.getCurrentUser()) {
            element.hide();
          } else {
            element.show();
          }
        });
        $scope.$on('event:auth-loginConfirmed', function () {
          element.show();
        });
        $scope.$on('event:auth-logoutConfirmed', function () {
          element.hide();
        });
      }
    };
  }
]);
chellIam.directive('multiValue', function () {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      valueList: '=',
      labelProperty: '@',
      valueProperty: '@',
      readOnly: '=',
      panel: '=',
      possibleTypes: '@'
    },
    controller: [
      '$scope',
      '$element',
      function ($scope, $element) {
        $scope.possibleTypeList = $scope.possibleTypes.split(',');
        $scope.addValue = function () {
          if ($scope.valueList == null) {
            $scope.valueList = [];
          }
          $scope.valueList[$scope.valueList.length] = {
            type: $scope.possibleTypeList[0],
            value: ''
          };
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
      }
    ],
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
  '$rootScope',
  '$filter',
  '$modal',
  '$translate',
  'IamUser',
  'IamGroup',
  'ngTableParams',
  function ($scope, $rootScope, $filter, $modal, $translate, IamUser, IamGroup, ngTableParams) {
    $scope.users = [];
    IamUser.query().then(function (users) {
      $scope.users = users;
      $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        sorting: { fullname: 'asc' }
      }, {
        total: $scope.users.length,
        getData: function ($defer, params) {
          var filteredData = params.filter() ? $filter('filter')($scope.users, params.filter()) : $scope.users;
          var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
          params.total(orderedData.length);
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        },
        $scope: {
          $data: {},
          $emit: function () {
          }
        }
      });
    });
    $scope.$on('chellIam.userCreated', function (event) {
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
        if (!confirm(removeQuestion))
          return;
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
  }
]);
chellIam.controller('UserFormController', [
  '$scope',
  '$rootScope',
  '$modal',
  'IamUser',
  'IamGroup',
  function ($scope, $rootScope, $modal, IamUser, IamGroup) {
    $scope.editUser = {};
    IamGroup.query().then(function (possibleGroups) {
      $scope.possibleGroups = $scope.calculatePossibleGroups($scope.editUser, possibleGroups);
    });
    $scope.$on('chellIam.editUser', function (event, user) {
      $scope.editUser = user;
      IamGroup.query().then(function (possibleGroups) {
        $scope.possibleGroups = $scope.calculatePossibleGroups($scope.editUser, possibleGroups);
      });
    });
    $scope.$on('chellIam.groupCreated', function (event) {
      IamGroup.query().then(function (possibleGroups) {
        $scope.possibleGroups = $scope.calculatePossibleGroups($scope.editUser, possibleGroups);
      });
    });
    $scope.save = function () {
      $scope.editUser.groups = [];
      angular.forEach($scope.possibleGroups, function (possibleGroup, key) {
        if (possibleGroup.ticked === true) {
          $scope.editUser.groups.push({
            value: possibleGroup.id,
            display: possibleGroup.name,
            type: possibleGroup.type
          });
        }
      });
      var isNew = $scope.editUser.id == null;
      if (isNew) {
        IamUser.create($scope.editUser).then(function (createdUser) {
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
          $scope.cancel();
          $rootScope.$broadcast('chellIam.userCreated');
          $scope.saveButtonHook();
        });
      } else {
        IamUser.update($scope.editUser).then(function () {
          $scope.cancel();
          $rootScope.$broadcast('chellIam.userCreated');
          $scope.saveButtonHook();
        });
      }
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
      possibleGroups = possibleGroups.concat({
        name: 'Groups',
        isGroup: true
      }).concat(groups.slice(0).map(function (group) {
        var ticked = false;
        for (var groupIndex in editUser.groups) {
          if (groupIndex != null) {
            var memberGroup = editUser.groups[groupIndex];
            if (memberGroup.value == group.id) {
              ticked = true;
            }
          }
        }
        return {
          icon: '<i class="glyphicon glyphicon-lock"></i>',
          name: group.name,
          ticked: ticked,
          id: group.id,
          type: 'Group'
        };
      })).concat({ isGroup: false });
      return possibleGroups;
    };
  }
]);
chellIam.controller('UserProfileController', [
  '$scope',
  'IamUser',
  function ($scope, IamUser) {
    $scope.save = function (user) {
      IamUser.update(user);
    };
  }
]);
chellIam.controller('GroupListController', [
  '$scope',
  '$rootScope',
  '$filter',
  '$modal',
  '$translate',
  'IamGroup',
  'IamUser',
  'ngTableParams',
  function ($scope, $rootScope, $filter, $modal, $translate, IamGroup, IamUser, ngTableParams) {
    $scope.groups = [];
    IamGroup.query().then(function (groups) {
      $scope.groups = groups;
      $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        sorting: { name: 'asc' }
      }, {
        total: $scope.groups.length,
        getData: function ($defer, params) {
          var filteredData = params.filter() ? $filter('filter')($scope.groups, params.filter()) : $scope.groups;
          var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
          params.total(orderedData.length);
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        },
        $scope: {
          $data: {},
          $emit: function () {
          }
        }
      });
    });
    $scope.$on('chellIam.groupCreated', function (event) {
      IamGroup.query().then(function (groups) {
        $scope.groups = groups;
      });
    });
    $scope.$watchCollection('groups', function () {
      if ($scope.tableParams) {
        $scope.tableParams.reload();
      }
    });
    $scope.create = function () {
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
        if (!confirm(removeQuestion))
          return;
        IamGroup.remove(group).then(function () {
          $scope.groups.splice($scope.groups.indexOf(group), 1);
        });
        $scope.deleteButtonHook();
      });
    };
  }
]);
chellIam.controller('GroupFormController', [
  '$scope',
  '$rootScope',
  'IamGroup',
  'IamUser',
  function ($scope, $rootScope, IamGroup, IamUser) {
    $scope.editGroup = {};
    IamUser.query().then(function (possibleUsers) {
      IamGroup.query().then(function (possibleGroups) {
        $scope.possibleMembers = $scope.calculatePossibleMembers($scope.editGroup, possibleGroups, possibleUsers);
      });
    });
    $scope.$on('chellIam.editGroup', function (event, group) {
      $scope.editGroup = group;
      IamUser.query().then(function (possibleUsers) {
        IamGroup.query().then(function (possibleGroups) {
          $scope.possibleMembers = $scope.calculatePossibleMembers($scope.editGroup, possibleGroups, possibleUsers);
        });
      });
    });
    $scope.$on('chellIam.userCreated', function (event) {
      IamUser.query().then(function (possibleUsers) {
        IamGroup.query().then(function (possibleGroups) {
          $scope.possibleMembers = $scope.calculatePossibleMembers($scope.editGroup, possibleGroups, possibleUsers);
        });
      });
    });
    $scope.save = function () {
      $scope.editGroup.members = [];
      angular.forEach($scope.possibleMembers, function (possibleMember, key) {
        if (possibleMember.ticked === true) {
          $scope.editGroup.members.push({
            value: possibleMember.id,
            display: possibleMember.name,
            type: possibleMember.type
          });
        }
      });
      var isNew = $scope.editGroup.id == null;
      if (isNew) {
        IamGroup.create($scope.editGroup).then(function () {
          $scope.cancel();
          $rootScope.$broadcast('chellIam.groupCreated');
          $scope.saveButtonHook();
        });
      } else {
        IamGroup.update($scope.editGroup).then(function () {
          $scope.cancel();
          $rootScope.$broadcast('chellIam.groupCreated');
          $scope.saveButtonHook();
        });
      }
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
      possibleMembers = possibleMembers.concat({
        name: 'Users',
        isGroup: true
      }).concat(users.slice(0).map(function (user) {
        var ticked = false;
        angular.forEach(editGroup.members, function (groupMember, key) {
          if (groupMember.type == 'User' && groupMember.value == user.id) {
            ticked = true;
          }
        });
        return {
          icon: '<i class="glyphicon glyphicon-user"></i>',
          name: user.fullname,
          ticked: ticked,
          id: user.id,
          type: 'User'
        };
      })).concat({ isGroup: false }).concat({
        name: 'Groups',
        isGroup: true
      }).concat(groups.slice(0).map(function (group) {
        var ticked = false;
        angular.forEach(editGroup.members, function (groupMember, key) {
          if (groupMember.type == 'Group' && groupMember.value == group.id) {
            ticked = true;
          }
        });
        return {
          icon: '<i class="glyphicon glyphicon-lock"></i>',
          name: group.name,
          ticked: ticked,
          id: group.id,
          type: 'Group'
        };
      })).concat({ isGroup: false });
      return possibleMembers;
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
chellIam.controller('ChangePasswordModalController', [
  '$scope',
  '$modalInstance',
  'user',
  'requestOldPassword',
  '$base64',
  '$window',
  '$preferences',
  function ($scope, $modalInstance, user, requestOldPassword, $base64, $window, $preferences) {
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
  }
]);
chellIam.controller('CurrentUserController', [
  '$scope',
  'IamUser',
  '$http',
  '$rootScope',
  '$window',
  'CurrentUserService',
  '$modal',
  'authService',
  function ($scope, IamUser, $http, $rootScope, $window, CurrentUserService, $modal, authService) {
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
        IamUser.changePassword($scope.currentUser, newBase64Credential).then(function () {
          $window.sessionStorage.token = newBase64Credential;
        });
      });
    };
  }
]);;// Source: build/templates.js
angular.module('templates-chell-iam', ['templates/change-password-dialog.tpl.html', 'templates/group-form.tpl.html', 'templates/group-list.tpl.html', 'templates/group-view-dialog.tpl.html', 'templates/login-dialog.tpl.html', 'templates/multi-value.tpl.html', 'templates/user-button.tpl.html', 'templates/user-form.tpl.html', 'templates/user-list.tpl.html', 'templates/user-profile.tpl.html', 'templates/user-view-dialog.tpl.html']);

angular.module("templates/change-password-dialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/change-password-dialog.tpl.html",
    "<div class=\"panel-heading\">\n" +
    "    <button class=\"close\" ng-click=\"cancel()\">{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.X_BUTTON' | translate}}</button>\n" +
    "    <h3>{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.TITLE' | translate}}</h3>\n" +
    "</div>\n" +
    "<div class=\"panel-body\">\n" +
    "    <form id=\"loginForm\" name=\"loginForm\" ng-submit=\"loginForm.$valid && changePassword()\" novalidate>\n" +
    "\n" +
    "        <div class=\"alert alert-danger\" ng-show=\"wrongCredentials\">\n" +
    "            <a class=\"close\" data-dismiss=\"alert\" href=\"#\">×</a>{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.INCORRECT_OLD_PW' | translate}}\n" +
    "        </div>\n" +
    "        <div class=\"alert alert-danger\" ng-show=\"notMatching\">\n" +
    "            <a class=\"close\" data-dismiss=\"alert\" href=\"#\">×</a>{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.PASSWORDS_NOT_MATCHING' | translate}}\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error has-feedback':notMatching}\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div style=\"margin-bottom: 10px\" class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-asterisk\"></i></span>\n" +
    "                    <input type=\"password\" class=\"form-control\" id=\"inputNewPassword\"\n" +
    "                           placeholder=\"{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.PH_NEW_PASSWORD' | translate}}\" required\n" +
    "                           ng-model=\"$parent.newPassword\" ng-pattern=\"passwordPattern\" autofocus>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error has-feedback':notMatching}\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div style=\"margin-bottom: 10px\" class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-repeat\"></i></span>\n" +
    "                    <input type=\"password\" class=\"form-control\" id=\"inputRepeatPassword\"\n" +
    "                           placeholder=\"{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.PH_REPEAT_PASSWORD' | translate}}\" required\n" +
    "                           ng-model=\"$parent.repeatPassword\" ng-pattern=\"passwordPattern\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error has-feedback':wrongCredentials}\" ng-show=\"requestOldPassword\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div style=\"margin-bottom: 10px\" class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                    <input type=\"password\" class=\"form-control\" id=\"inputOldPassoword\"\n" +
    "                           placeholder=\"{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.PH_OLD_PASSWORD' | translate}}\"\n" +
    "                           ng-model=\"$parent.oldPassword\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div style=\"margin-bottom: 10px\">\n" +
    "                    <a ng-click=\"infoCollapsed = !infoCollapsed\">{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.PASSWORD_INFO_LINK' | translate}}</a>\n" +
    "                    <div collapse=\"infoCollapsed\" class=\"panel panel-default\">\n" +
    "                        <div class=\"panel-body\">\n" +
    "                            <div>{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.PASSWORD_INFO' | translate}}</div>\n" +
    "                            <div>{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.PASSWORD_PATTERN_INFO' | translate}}: <span style=\"color: blue\">{{passwordPattern.toString()}}</span></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group last\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"cancel()\">{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.CANCEL_BUTTON' | translate}}</button>\n" +
    "                    <button class=\"btn btn-primary\" ng-click=\"changePassword()\" type=\"submit\" ng-disabled=\"loginForm.$invalid\">{{'CHELL_IAM.CHANGE_PASSWORD_DIALOG.CLOSE_BUTTON' | translate}}</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"panel-footer\">\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("templates/group-form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/group-form.tpl.html",
    "<div>\n" +
    "    <form id=\"groupForm\" name=\"groupForm\" novalidate ng-submit=\"groupForm.$valid && save()\">\n" +
    "        <fieldset>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"form-group col-md-6\">\n" +
    "                    <label for=\"inputGroupId\" class=\"control-label\">{{'CHELL_IAM.GROUP_FORM.GROUP_ID' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputGroupId\" placeholder=\"{{'CHELL_IAM.GROUP_FORM.PH_GENERATED' | translate}}\" readonly=\"true\"\n" +
    "                           ng-model=\"editGroup.id\"/>\n" +
    "                </div>\n" +
    "                <div class=\"form-group col-md-6\">\n" +
    "                    <label for=\"inputCreationDate\" class=\"control-label\">{{'CHELL_IAM.GROUP_FORM.CREATION_DATE' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputCreationDate\" placeholder=\"{{'CHELL_IAM.GROUP_FORM.PH_CREATION_DATE' | translate}}\" readonly=\"true\"\n" +
    "                           ng-model=\"editGroup.meta.created\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group required\" ng-class=\"{ 'has-error' : groupForm.inputGroupname.$invalid && !groupForm.inputGroupname.$pristine }\">\n" +
    "                <label for=\"inputGroupname\" class=\"control-label\">{{'CHELL_IAM.GROUP_FORM.NAME' | translate}}</label>\n" +
    "                <input class=\"form-control\" id=\"inputGroupname\" name=\"inputGroupname\" placeholder=\"{{'CHELL_IAM.GROUP_FORM.PH_NAME' | translate}}\" required\n" +
    "                       ng-model=\"editGroup.name\" autofocus/>\n" +
    "                <p ng-show=\"groupForm.inputGroupname.$invalid && !groupForm.inputGroupname.$pristine\" class=\"help-block\">{{'CHELL_IAM.GROUP_FORM.ERROR_NAME' | translate}}</p>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputMembers\" class=\"control-label\">{{'CHELL_IAM.GROUP_FORM.MEMBERS' | translate}}</label>\n" +
    "                <multi-select id=\"inputMembers\" input-model=\"possibleMembers\" button-label=\"icon name\" item-label=\"icon name\" tick-property=\"ticked\"\n" +
    "                              group-property=\"isGroup\" ng-model=\"editGroup.members\"/>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "        <button type=\"submit\" class=\"btn btn-primary\" ng-disabled=\"groupForm.$invalid\">{{'CHELL_IAM.GROUP_FORM.SAVE_BUTTON' | translate}}</button>\n" +
    "        <button class=\"btn btn-default\" ng-click=\"cancel()\">{{'CHELL_IAM.GROUP_FORM.CANCEL_BUTTON' | translate}}</button>\n" +
    "        </form>\n" +
    "</div>");
}]);

angular.module("templates/group-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/group-list.tpl.html",
    "<div>\n" +
    "    <table ng-table=\"tableParams\" show-filter=\"true\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" template-pagination=\"chell-iam/group-list/pager\" class=\"table table-striped table-bordered\"\n" +
    "           id=\"groupDatatable\">\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"group in $data\">\n" +
    "            <td data-title=\"'CHELL_IAM.GROUP_LIST.COLUMN_TITLE.NAME' | translate\" filter=\"{'name': 'text'}\" sortable=\"'name'\" ng-bind=\"group.name\" width=\"300px\"></td>\n" +
    "            <td data-title=\"'CHELL_IAM.GROUP_LIST.COLUMN_TITLE.MEMBERS' | translate\">\n" +
    "                <div ng-repeat=\"member in group.members\">\n" +
    "                    <i ng-show=\"member.type == 'User'\" class=\"glyphicon glyphicon-user\"></i>\n" +
    "                    <i ng-show=\"member.type == 'Group'\" class=\"glyphicon glyphicon-lock\"></i>\n" +
    "                    {{member.display}}\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td data-title=\"'CHELL_IAM.GROUP_LIST.COLUMN_TITLE.ACTIONS' | translate\" class=\"center\">\n" +
    "                <div class=\"btn-group btn-group-sm\">\n" +
    "                    <a class=\"btn btn-default\" rel=\"tooltip\" title=\"{{'CHELL_IAM.GROUP_LIST.VIEW_BUTTON' | translate}}\" ng-click=\"view(group)\">\n" +
    "                        <i class=\"glyphicon glyphicon-zoom-in icon-white\"></i>\n" +
    "                    </a>\n" +
    "                    <a class=\"btn btn-default\" rel=\"tooltip\" title=\"{{'CHELL_IAM.GROUP_LIST.EDIT_BUTTON' | translate}}\" ng-click=\"edit(group)\" ng-hide=\"readOnly()\">\n" +
    "                        <i class=\"glyphicon glyphicon-edit icon-white\"></i>\n" +
    "                    </a>\n" +
    "                    <a class=\"btn btn-default\" rel=\"tooltip\" title=\"{{'CHELL_IAM.GROUP_LIST.DELETE_BUTTON' | translate}}\" ng-click=\"remove(group)\" ng-hide=\"readOnly()\">\n" +
    "                        <i class=\"glyphicon glyphicon-trash icon-white\"></i>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "    <script type=\"text/ng-template\" id=\"chell-iam/group-list/pager\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <button class=\"btn btn-default\" ng-show=\"$parent.$parent.showCreateButton && !$parent.$parent.readOnly()\" ng-click=\"$parent.$parent.create()\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-lock\"></i>{{'CHELL_IAM.GROUP_LIST.CREATE_GROUP_BUTTON'\n" +
    "                    | translate}}\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <div class=\"btn-group center-block\">\n" +
    "                    <button class=\"btn btn-default center-block\" ng-click=\"params.page(page.number)\" ng-class=\"{'disabled': !page.active}\" ng-repeat=\"page in pages\" ng-switch=\"page.type\">\n" +
    "                        <div ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\">&laquo;</div>\n" +
    "                        <div ng-switch-when=\"first\" ng-click=\"params.page(page.number)\"><span ng-bind=\"page.number\"></span></div>\n" +
    "                        <div ng-switch-when=\"page\" ng-click=\"params.page(page.number)\"><span ng-bind=\"page.number\"></span></div>\n" +
    "                        <div ng-switch-when=\"more\" ng-click=\"params.page(page.number)\">&#8230;</div>\n" +
    "                        <div ng-switch-when=\"last\" ng-click=\"params.page(page.number)\"><span ng-bind=\"page.number\"></span></div>\n" +
    "                        <div ng-switch-when=\"next\" ng-click=\"params.page(page.number)\">&raquo;</div>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <div ng-if=\"params.settings().counts.length\" class=\"ng-table-counts btn-group pull-right\">\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </script>\n" +
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
    "            <div class=\"row\">\n" +
    "                <div class=\"form-group col-md-6\">\n" +
    "                    <label for=\"inputGroupId\" class=\"control-label\">{{'CHELL_IAM.GROUP_VIEW_DIALOG.GROUP_ID' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputGroupId\" placeholder=\"{{'CHELL_IAM.GROUP_VIEW_DIALOG.PH_GROUP_ID' | translate}}\" readonly=\"true\"\n" +
    "                           ng-model=\"group.id\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group col-md-6\">\n" +
    "                    <label for=\"inputCreationDate\" class=\"control-label\">{{'CHELL_IAM.GROUP_VIEW_DIALOG.CREATION_DATE' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputCreationDate\" placeholder=\"{{'CHELL_IAM.GROUP_VIEW_DIALOG.PH_CREATION_DATE' | translate}}\"\n" +
    "                           readonly=\"true\"\n" +
    "                           ng-model=\"group.meta.created\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputGroupName\" class=\"control-label\">{{'CHELL_IAM.GROUP_VIEW_DIALOG.NAME' | translate}}</label>\n" +
    "                <input class=\"form-control\" id=\"inputGroupName\" placeholder=\"{{'CHELL_IAM.GROUP_VIEW_DIALOG.PH_NAME' | translate}}\" readonly=\"true\"\n" +
    "                       ng-model=\"group.name\">\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <i class=\"glyphicon glyphicon-user\"></i> <label for=\"inputUsers\">{{'CHELL_IAM.GROUP_VIEW_DIALOG.USERS' | translate}}</label>\n" +
    "                    <select id=\"inputUsers\" size=\"5\" class=\"form-control\">\n" +
    "                        <option ng-repeat=\"member in group.members\" ng-show=\"member.type=='User'\">{{member.display}}</option>\n" +
    "                    </select>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <i class=\"glyphicon glyphicon-lock\"></i> <label for=\"inputGroups\">{{'CHELL_IAM.GROUP_VIEW_DIALOG.GROUPS' | translate}}</label>\n" +
    "                    <select id=\"inputGroups\" size=\"5\" class=\"form-control\">\n" +
    "                        <option ng-repeat=\"member in group.members\" ng-show=\"member.type=='Group'\">{{member.display}}</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
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
    "                    <div style=\"margin-bottom: 10px\" class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                        <input class=\"form-control\" id=\"inputLogin\" placeholder=\"{{'CHELL_IAM.LOGIN_DIALOG.PH_LOGIN' | translate}}\" required ng-model=\"$parent.login\" autofocus>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error has-feedback':wrongCredentials}\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div style=\"margin-bottom: 10px\" class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                        <input type=\"password\" class=\"form-control\" id=\"inputPassword\" placeholder=\"{{'CHELL_IAM.LOGIN_DIALOG.PH_PASSWORD' | translate}}\" required\n" +
    "                               ng-model=\"$parent.password\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group last\">\n" +
    "                <div class=\"col-sm-8\">\n" +
    "                    <div class=\"checkbox\">\n" +
    "                        <label>\n" +
    "                            <input type=\"checkbox\"/>\n" +
    "                            {{'CHELL_IAM.LOGIN_DIALOG.REMEMBER_ME' | translate}}\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                    <div class=\"pull-right\">\n" +
    "                        <button type=\"reset\" class=\"btn btn-default btn-sm\">\n" +
    "                            {{'CHELL_IAM.LOGIN_DIALOG.RESET_BUTTON' | translate}}\n" +
    "                        </button>\n" +
    "                        <button type=\"submit\" class=\"btn btn-success btn-sm\" ng-click=\"signin()\">\n" +
    "                            {{'CHELL_IAM.LOGIN_DIALOG.LOGIN_BUTTON' | translate}}\n" +
    "                        </button>\n" +
    "                    </div>\n" +
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

angular.module("templates/multi-value.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/multi-value.tpl.html",
    "<div ng-show=\"!panel\">\n" +
    "    <div class=\"multiple-form-group input-group\" style=\"padding-bottom: 3px\" ng-repeat=\"value in valueList\" ng-show=\"valueList\">\n" +
    "        <div class=\"input-group-btn input-group-select dropdown\">\n" +
    "            <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" ng-disabled=\"readOnly\"\n" +
    "                    style=\"min-width: 95px;\">\n" +
    "                <span class=\"concept\">{{value.type}}</span> <span class=\"caret\"></span>\n" +
    "            </button>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" ng-hide=\"readOnly\">\n" +
    "                <li ng-repeat=\"possibleType in possibleTypeList\"><a ng-click=\"selectType(possibleType, value)\">{{possibleType}}</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"value.value\" ng-readonly=\"{{readOnly}}\">\n" +
    "        <span ng-hide=\"readOnly\" class=\"input-group-btn\" style=\"width: 34px\" >\n" +
    "            <button type=\"button\" class=\"btn btn-danger btn-add\" style=\"width: 34px\" ng-click=\"removeValue(value)\">-</button>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div ng-show=\"panel\">\n" +
    "    <div class=\"panel panel-default\" ng-repeat=\"value in valueList\">\n" +
    "        <div class=\"panel-heading clearfix\" style=\"padding: 0px; background-color: #ffffff\">\n" +
    "            <div class=\"input-group-btn input-group-select pull-left dropdown\">\n" +
    "                <button class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" ng-disabled=\"readOnly\"\n" +
    "                        style=\"min-width: 95px; border-left: none; border-top: none; border-bottom: none; border-bottom-left-radius: 0px\">\n" +
    "                    <span class=\"concept\">{{value.type}}</span> <span class=\"caret\"></span>\n" +
    "                </button>\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\" ng-hide=\"readOnly\">\n" +
    "                    <li ng-repeat=\"possibleType in possibleTypeList\"><a ng-click=\"selectType(possibleType, value)\">{{possibleType}}</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        <span ng-hide=\"readOnly\" class=\"btn-group pull-right\" style=\"width: 34px\">\n" +
    "            <button type=\"button\" class=\"btn btn-danger btn-add\"\n" +
    "                    style=\"width: 34px; border: none; border-bottom-left-radius: 0px; border-top-left-radius: 0px; border-bottom-right-radius: 0px; border-top-right-radius: 3px;\"\n" +
    "                    ng-click=\"removeValue()\">-\n" +
    "            </button>\n" +
    "        </span>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\">\n" +
    "            <div inject></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<button type=\"button\" class=\"btn btn-success btn-xs\" ng-click=\"addValue()\" ng-hide=\"readOnly\">+</button>");
}]);

angular.module("templates/user-button.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-button.tpl.html",
    "<div class=\"dropdown\" ng-controller=\"CurrentUserController\">\n" +
    "    <button class=\"btn btn-default dropdown-toggle navbar-btn\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-expanded=\"true\">\n" +
    "        <img height=22 width=\"22\" ng-src=\"{{currentUser.gravatarMail ? ('http://www.gravatar.com/avatar/'+(currentUser.gravatarMail | md5)+'?s=22') : currentUser.photo}}\">\n" +
    "        {{currentUser.fullname}}\n" +
    "        <span class=\"caret\"></span>\n" +
    "    </button>\n" +
    "    <ul class=\"dropdown-menu pull-right\" role=\"menu\" aria-labelledby=\"dropdownMenu1\">\n" +
    "        <div id=\"transclude\"></div>\n" +
    "        <li visible-by-login role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" ng-click=\"changePassword()\"><i class=\"glyphicon glyphicon-asterisk\"></i> Change Password</a></li>\n" +
    "        <li role=\"presentation\" class=\"divider\"></li>\n" +
    "        <li visible-by-login role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" ng-click=\"logout()\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li>\n" +
    "    </ul>\n" +
    "</div>");
}]);

angular.module("templates/user-form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-form.tpl.html",
    "<div>\n" +
    "    <form id=\"userForm\" name=\"userForm\" novalidate ng-submit=\"userForm.$valid && save()\">\n" +
    "        <fieldset>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"form-group col-md-6\">\n" +
    "                    <label for=\"inputUserId\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.USER_ID' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputUserId\"\n" +
    "                           placeholder=\"{{'CHELL_IAM.USER_FORM.PH_USER_ID' | translate}}\" readonly=\"true\"\n" +
    "                           ng-model=\"editUser.id\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group col-md-6\">\n" +
    "                    <label for=\"inputExtId\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.EXTERNAL_ID' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputExtId\"\n" +
    "                           placeholder=\"{{'CHELL_IAM.USER_FORM.PH_EXTERNAL_ID' | translate}}\"\n" +
    "                           ng-model=\"editUser.externalId\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"form-group col-md-6 required\" ng-class=\"{ 'has-error' : userForm.inputLogin.$invalid && !userForm.inputLogin.$pristine }\">\n" +
    "                    <label for=\"inputLogin\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.LOGIN' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputLogin\" name=\"inputLogin\" placeholder=\"{{'CHELL_IAM.USER_FORM.PH_LOGIN' | translate}}\" required\n" +
    "                           ng-model=\"editUser.login\" autofocus/>\n" +
    "                    <p ng-show=\"userForm.inputLogin.$invalid && !userForm.inputLogin.$pristine\" class=\"help-block\">{{'CHELL_IAM.USER_FORM.ERROR_LOGIN' | translate}}</p>\n" +
    "                </div>\n" +
    "                <div class=\"form-group col-md-6\">\n" +
    "                    <label for=\"inputDisplay\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.DISPLAY' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputDisplay\"\n" +
    "                           placeholder=\"{{'CHELL_IAM.USER_FORM.PH_DISPLAY' | translate}}\"\n" +
    "                           ng-model=\"editUser.fullname\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"form-group col-md-6\">\n" +
    "                    <label for=\"inputFirstname\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.FIRSTNAME' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputFirstname\"\n" +
    "                           placeholder=\"{{'CHELL_IAM.USER_FORM.PH_FIRSTNAME' | translate}}\"\n" +
    "                           ng-model=\"editUser.firstname\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group col-md-6\">\n" +
    "                    <label for=\"inputLastname\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.LASTNAME' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputLastname\"\n" +
    "                           placeholder=\"{{'CHELL_IAM.USER_FORM.PH_LASTNAME' | translate}}\"\n" +
    "                           ng-model=\"editUser.lastname\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputTitle\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.TITLE' | translate}}</label>\n" +
    "                <input class=\"form-control\" id=\"inputTitle\"\n" +
    "                       placeholder=\"{{'CHELL_IAM.USER_FORM.PH_TITLE' | translate}}\"\n" +
    "                       ng-model=\"editUser.title\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputEMail\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.EMAIL' | translate}}</label>\n" +
    "                <multi-value id=\"inputEMail\" value-list=\"editUser.emails\" label-property=\"type\"\n" +
    "                             value-property=\"value\" possible-types=\"Work,Home,Gravatar\"/>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputPhone\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.PHONE' | translate}}</label>\n" +
    "                <multi-value id=\"inputPhone\" value-list=\"editUser.phones\" label-property=\"type\"\n" +
    "                             value-property=\"value\" possible-types=\"Work,Home,Mobile\"/>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputIms\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.IMS' | translate}}</label>\n" +
    "                <multi-value id=\"inputIms\" value-list=\"editUser.ims\" label-property=\"type\"\n" +
    "                             value-property=\"value\" possible-types=\"Skype,Lync,Yahoo\"/>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputLanguage\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.LANGUAGE' | translate}}</label>\n" +
    "                <select class=\"form-control\" id=\"inputLanguage\" ng-model=\"editUser.language\">\n" +
    "                    <option value=\"en_US\">English</option>\n" +
    "                    <!-- TODO: Get available languages dynamically -->\n" +
    "                    <option value=\"de\">German</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputAddresses\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.ADRESSES' | translate}}</label>\n" +
    "                <multi-value id=\"inputAddresses\" value-list=\"editUser.addresses\" label-property=\"type\" panel=\"true\"\n" +
    "                             possible-types=\"Work,Home\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label for=\"inputStreetAddress\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.STREET' | translate}}</label>\n" +
    "                        <input class=\"form-control\" id=\"inputStreetAddress\"\n" +
    "                               placeholder=\"{{'CHELL_IAM.USER_FORM.PH_STREET' | translate}}\"\n" +
    "                               ng-model=\"$parent.value.streetAddress\">\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"form-group col-md-6\">\n" +
    "                            <label for=\"inputZip\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.ZIP' | translate}}</label>\n" +
    "                            <input class=\"form-control\" id=\"inputZip\"\n" +
    "                                   placeholder=\"{{'CHELL_IAM.USER_FORM.PH_ZIP' | translate}}\"\n" +
    "                                   ng-model=\"$parent.value.postalCode\">\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group col-md-6\">\n" +
    "                            <label for=\"inputCity\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.CITY' | translate}}</label>\n" +
    "                            <input class=\"form-control\" id=\"inputCity\"\n" +
    "                                   placeholder=\"{{'CHELL_IAM.USER_FORM.PH_CITY' | translate}}\"\n" +
    "                                   ng-model=\"$parent.value.locality\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"form-group col-md-6\">\n" +
    "                            <label for=\"inputRegion\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.REGION' | translate}}</label>\n" +
    "                            <input class=\"form-control\" id=\"inputRegion\"\n" +
    "                                   placeholder=\"{{'CHELL_IAM.USER_FORM.PH_REGION' | translate}}\"\n" +
    "                                   ng-model=\"$parent.value.region\">\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group col-md-6\">\n" +
    "                            <label for=\"inputCountry\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.COUNTRY' | translate}}</label>\n" +
    "                            <input class=\"form-control\" id=\"inputCountry\"\n" +
    "                                   placeholder=\"{{'CHELL_IAM.USER_FORM.PH_COUNTRY' | translate}}\"\n" +
    "                                   ng-model=\"$parent.value.country\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </multi-value>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputActive\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.STATUS' | translate}}</label>\n" +
    "\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input id=\"inputActive\" type=\"checkbox\"\n" +
    "                               ng-model=\"editUser.active\"> {{'CHELL_IAM.USER_FORM.ACTIVE' |\n" +
    "                        translate}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputGroups\" class=\"control-label\">{{'CHELL_IAM.USER_FORM.GROUPS' | translate}}</label>\n" +
    "                <multi-select id=\"inputGroups\" input-model=\"possibleGroups\" button-label=\"icon name\"\n" +
    "                              item-label=\"icon name\" tick-property=\"ticked\"\n" +
    "                              group-property=\"isGroup\"/>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "        <button type=\"submit\" class=\"btn btn-primary\" ng-disabled=\"userForm.$invalid\">{{'CHELL_IAM.GROUP_FORM.SAVE_BUTTON' | translate}}</button>\n" +
    "        <button class=\"btn btn-default\" ng-click=\"cancel()\">{{'CHELL_IAM.GROUP_FORM.CANCEL_BUTTON' | translate}}</button>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("templates/user-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-list.tpl.html",
    "<div>\n" +
    "    <table ng-table=\"tableParams\" show-filter=\"true\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" template-pagination=\"chell-iam/user-list/pager\" class=\"table table-striped table-bordered\" id=\"userDatatable\">\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"user in $data\">\n" +
    "            <td data-title=\"'CHELL_IAM.USER_LIST.COLUMN_TITLE.NAME' | translate\" filter=\"{'fullname': 'text'}\" sortable=\"'fullname'\" ng-bind=\"user.fullname\" width=\"150px\"></td>\n" +
    "            <td data-title=\"'CHELL_IAM.USER_LIST.COLUMN_TITLE.LOGIN' | translate\" filter=\"{'login': 'text'}\" sortable=\"'login'\" ng-bind=\"user.login\" width=\"150px\"></td>\n" +
    "            <td data-title=\"'CHELL_IAM.USER_LIST.COLUMN_TITLE.DATE_REGISTERED' | translate\" sortable=\"'creationDate'\" class=\"center\" ng-bind=\"user.creationDate | date:'dd.MM.yyyy'\"></td>\n" +
    "            <td data-title=\"'CHELL_IAM.USER_LIST.COLUMN_TITLE.GROUPS' | translate\" style=\"min-width: 20px;\">\n" +
    "                <div ng-repeat=\"group in user.groups\">\n" +
    "                    <i class=\"glyphicon glyphicon-lock\"></i>\n" +
    "                    {{group.display}}\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td data-title=\"'CHELL_IAM.USER_LIST.COLUMN_TITLE.STATUS' | translate\" sortable=\"'status'\" filter=\"{ 'status': 'status' }\" class=\"center\">\n" +
    "                <span class=\"label\" ng-class=\"{'label-success': user.status=='activated', 'label-danger': user.status!='activated'}\">{{user.status}}</span>\n" +
    "            </td>\n" +
    "            <td data-title=\"'CHELL_IAM.USER_LIST.COLUMN_TITLE.ACTIONS' | translate\" class=\"center\">\n" +
    "                <div class=\"btn-group btn-group-sm\">\n" +
    "                    <button class=\"btn btn-default\" title=\"{{'CHELL_IAM.USER_LIST.VIEW_BUTTON' | translate}}\">\n" +
    "                        <i class=\"glyphicon glyphicon-zoom-in icon-white\" ng-click=\"view(user)\"></i>\n" +
    "                    </button>\n" +
    "                    <button class=\"btn btn-default\" title=\"{{'CHELL_IAM.USER_LIST.EDIT_BUTTON' | translate}}\" ng-click=\"edit(user)\" ng-hide=\"readOnly()\">\n" +
    "                        <i class=\"glyphicon glyphicon-edit icon-white\"></i>\n" +
    "                    </button>\n" +
    "                    <button class=\"btn btn-default\" title=\"{{'CHELL_IAM.USER_LIST.DELETE_BUTTON' | translate}}\" ng-click=\"remove(user)\" ng-hide=\"readOnly()\">\n" +
    "                        <i class=\"glyphicon glyphicon-trash icon-white\"></i>\n" +
    "                    </button>\n" +
    "                    <button class=\"btn btn-default\" title=\"{{'CHELL_IAM.USER_LIST.PASSWORD_CHANGE_BUTTON' | translate}}\" ng-click=\"changePassword(user)\" ng-hide=\"readOnly()\">\n" +
    "                        <i class=\"glyphicon glyphicon-asterisk icon-white\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "    <script type=\"text/ng-template\" id=\"chell-iam/user-list/pager\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <button class=\"btn btn-default\" ng-show=\"$parent.$parent.showCreateButton && !$parent.$parent.readOnly()\" ng-click=\"$parent.$parent.create()\"><i style=\"padding-right: 10px\" class=\"glyphicon glyphicon-user\"></i>{{'CHELL_IAM.USER_LIST.CREATE_USER_BUTTON' | translate}}</button>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <div class=\"btn-group center-block\">\n" +
    "                    <button class=\"btn btn-default center-block\" ng-click=\"params.page(page.number)\" ng-class=\"{'disabled': !page.active}\" ng-repeat=\"page in pages\" ng-switch=\"page.type\">\n" +
    "                        <div ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\">&laquo;</div>\n" +
    "                        <div ng-switch-when=\"first\" ng-click=\"params.page(page.number)\"><span ng-bind=\"page.number\"></span></div>\n" +
    "                        <div ng-switch-when=\"page\" ng-click=\"params.page(page.number)\"><span ng-bind=\"page.number\"></span></div>\n" +
    "                        <div ng-switch-when=\"more\" ng-click=\"params.page(page.number)\">&#8230;</div>\n" +
    "                        <div ng-switch-when=\"last\" ng-click=\"params.page(page.number)\"><span ng-bind=\"page.number\"></span></div>\n" +
    "                        <div ng-switch-when=\"next\" ng-click=\"params.page(page.number)\">&raquo;</div>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <div ng-if=\"params.settings().counts.length\" class=\"ng-table-counts btn-group pull-right\">\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </script>\n" +
    "    <script type=\"text/ng-template\" id=\"ng-table/filters/status.html\">\n" +
    "        <select id=\"filter-status\" class=\"form-control\" ng-model=\"params.filter()['status']\">\n" +
    "            <option value=\"\"></option>\n" +
    "            <option value=\"activated\">{{'CHELL_IAM.USER_LIST.FILTER_ACTIVE' | translate}}</option>\n" +
    "            <option value=\"inactive\">{{'CHELL_IAM.USER_LIST.FILTER_INACTIVE' | translate}}</option>\n" +
    "        </select>\n" +
    "    </script>\n" +
    "</div>");
}]);

angular.module("templates/user-profile.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-profile.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-8\">\n" +
    "        <form id=\"userProfile\" name=\"userProfile\" novalidate ng-submit=\"userProfile.$valid && save(user)\">\n" +
    "            <fieldset>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"form-group col-md-6\">\n" +
    "                        <label for=\"inputUserId\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.USER_ID' | translate}}</label>\n" +
    "                        <input class=\"form-control\" id=\"inputUserId\"\n" +
    "                               placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_USER_ID' | translate}}\" readonly=\"true\"\n" +
    "                               ng-model=\"user.id\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group col-md-6\" ng-show=\"!readOnly || user.externalId\">\n" +
    "                        <label for=\"inputExtId\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.EXTERNAL_ID' | translate}}</label>\n" +
    "                        <input class=\"form-control\" id=\"inputExtId\"\n" +
    "                               placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_EXTERNAL_ID' | translate}}\" ng-readonly=\"readOnly\"\n" +
    "                               ng-model=\"user.externalId\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"form-group col-md-6\">\n" +
    "                        <label for=\"inputLogin\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.LOGIN' | translate}}</label>\n" +
    "                        <input class=\"form-control\" id=\"inputLogin\"\n" +
    "                               placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_LOGIN' | translate}}\" ng-readonly=\"readOnly\"\n" +
    "                               ng-model=\"user.login\" required=\"true\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group col-md-6\">\n" +
    "                        <label for=\"inputDisplay\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.DISPLAY' | translate}}</label>\n" +
    "                        <input class=\"form-control\" id=\"inputDisplay\"\n" +
    "                               placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_DISPLAY' | translate}}\" ng-readonly=\"readOnly\"\n" +
    "                               ng-model=\"user.fullname\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"form-group col-md-6\" ng-show=\"!readOnly || user.firstname\">\n" +
    "                        <label for=\"inputFirstname\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.FIRSTNAME' | translate}}</label>\n" +
    "                        <input class=\"form-control\" id=\"inputFirstname\"\n" +
    "                               placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_FIRSTNAME' | translate}}\"\n" +
    "                               ng-model=\"user.firstname\" ng-readonly=\"readOnly\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group col-md-6\" ng-show=\"!readOnly || user.lastname\">\n" +
    "                        <label for=\"inputLastname\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.LASTNAME' | translate}}</label>\n" +
    "                        <input class=\"form-control\" id=\"inputLastname\"\n" +
    "                               placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_LASTNAME' | translate}}\"\n" +
    "                               ng-model=\"user.lastname\" ng-readonly=\"readOnly\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"!readOnly || user.title\">\n" +
    "                    <label for=\"inputTitle\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.TITLE' | translate}}</label>\n" +
    "                    <input class=\"form-control\" id=\"inputTitle\"\n" +
    "                           placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_TITLE' | translate}}\"\n" +
    "                           ng-model=\"user.title\" ng-readonly=\"readOnly\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"user.emails != null || user.emails.length != 0 && !readOnly\">\n" +
    "                    <label for=\"inputEMail\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.EMAIL' | translate}}</label>\n" +
    "                    <multi-value id=\"inputEMail\" value-list=\"user.emails\" label-property=\"type\"\n" +
    "                                 value-property=\"value\" read-only=\"readOnly\" possible-types=\"Work,Home,Gravatar\"/>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"user.phones != null || user.phones.length != 0 && !readOnly\">\n" +
    "                    <label for=\"inputPhone\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.PHONE' | translate}}</label>\n" +
    "                    <multi-value id=\"inputPhone\" value-list=\"user.phones\" label-property=\"type\"\n" +
    "                                 value-property=\"value\" read-only=\"readOnly\" possible-types=\"Work,Home,Mobile\"/>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"user.ims != null || user.ims.length != 0 && !readOnly\">\n" +
    "                    <label for=\"inputIms\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.IMS' | translate}}</label>\n" +
    "                    <multi-value id=\"inputIms\" value-list=\"user.ims\" label-property=\"type\"\n" +
    "                                 value-property=\"value\" read-only=\"readOnly\" possible-types=\"Skype,Lync,Yahoo\"/>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"!readOnly || user.language\">\n" +
    "                    <label for=\"inputLanguage\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.LANGUAGE' | translate}}</label>\n" +
    "                    <select class=\"form-control\" id=\"inputLanguage\" ng-model=\"user.language\" ng-disabled=\"readOnly\">\n" +
    "                        <option value=\"en_US\">English</option>\n" +
    "                        <!-- TODO: Get available languages dynamically -->\n" +
    "                        <option value=\"de\">German</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"!readOnly || user.addresses\">\n" +
    "                    <label for=\"inputAddresses\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.ADRESSES' | translate}}</label>\n" +
    "                    <multi-value id=\"inputAddresses\" value-list=\"user.addresses\" label-property=\"type\" panel=\"true\"\n" +
    "                                 read-only=\"readOnly\" possible-types=\"Work,Home\">\n" +
    "                        <div class=\"form-group\" ng-show=\"!readOnly || value.streetAddress\">\n" +
    "                            <label for=\"inputStreetAddress\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.STREET' | translate}}</label>\n" +
    "                            <input class=\"form-control\" id=\"inputStreetAddress\"\n" +
    "                                   placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_STREET' | translate}}\" ng-readonly=\"readOnly\"\n" +
    "                                   ng-model=\"$parent.value.streetAddress\">\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"form-group col-md-6\" ng-show=\"!readOnly || value.postalCode\">\n" +
    "                                <label for=\"inputZip\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.ZIP' | translate}}</label>\n" +
    "                                <input class=\"form-control\" id=\"inputZip\"\n" +
    "                                       placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_ZIP' | translate}}\" ng-readonly=\"readOnly\"\n" +
    "                                       ng-model=\"$parent.value.postalCode\">\n" +
    "                            </div>\n" +
    "                            <div class=\"form-group col-md-6\" ng-show=\"!readOnly || value.locality\">\n" +
    "                                <label for=\"inputCity\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.CITY' | translate}}</label>\n" +
    "                                <input class=\"form-control\" id=\"inputCity\"\n" +
    "                                       placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_CITY' | translate}}\" ng-readonly=\"readOnly\"\n" +
    "                                       ng-model=\"$parent.value.locality\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"form-group col-md-6\" ng-show=\"!readOnly || value.region\">\n" +
    "                                <label for=\"inputRegion\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.REGION' | translate}}</label>\n" +
    "                                <input class=\"form-control\" id=\"inputRegion\"\n" +
    "                                       placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_REGION' | translate}}\" ng-readonly=\"readOnly\"\n" +
    "                                       ng-model=\"$parent.value.region\">\n" +
    "                            </div>\n" +
    "                            <div class=\"form-group col-md-6\" ng-show=\"!readOnly || value.country\">\n" +
    "                                <label for=\"inputCountry\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.COUNTRY' | translate}}</label>\n" +
    "                                <input class=\"form-control\" id=\"inputCountry\"\n" +
    "                                       placeholder=\"{{'CHELL_IAM.USER_PROFILE.PH_COUNTRY' | translate}}\" ng-readonly=\"readOnly\"\n" +
    "                                       ng-model=\"$parent.value.country\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </multi-value>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"readOnly\">\n" +
    "                    <i class=\"glyphicon glyphicon-lock\"></i> <label for=\"inputGroups\" class=\"control-label\">{{'CHELL_IAM.USER_PROFILE.GROUPS'\n" +
    "                    | translate}}</label>\n" +
    "                    <select id=\"inputGroups\" size=\"5\" class=\"form-control\" ng-disabled=\"readOnly\">\n" +
    "                        <option ng-repeat=\"group in user.groups\">{{group.display}}</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </fieldset>\n" +
    "            <div ng-show=\"!readOnly\">\n" +
    "                <button type=\"submit\" class=\"btn btn-primary\" ng-disabled=\"userProfile.$invalid\">{{'CHELL_IAM.USER_PROFILE.SAVE_BUTTON' | translate}}</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4\">\n" +
    "        <div style=\"max-width: 220px; margin: 15px 5px\">\n" +
    "            <label>{{'CHELL_IAM.USER_PROFILE.PROFILE_PREVIEW' | translate}}</label>\n" +
    "            <img height=\"220\" width=\"220\"\n" +
    "                 ng-src=\"{{user.gravatarMail ? ('http://www.gravatar.com/avatar/'+(user.gravatarMail | md5)+'?s=220') : user.photo}}\">\n" +
    "\n" +
    "            <h1>\n" +
    "                <span style=\"color: #428bca; font-size: 26px; line-height: 30px;\">{{user.fullname}}</span>\n" +
    "                <span style=\"display: block; overflow: hidden; width: 100%; font-size: 20px; font-style: normal; font-weight: 300;\n" +
    "                        line-height: 24px; color: #666; text-overflow: ellipsis;\">{{user.login}}</span>\n" +
    "            </h1>\n" +
    "            <ul style=\"list-style: none; padding-left: 0px; padding-top: 15px; padding-bottom: 15px; border-top: 1px solid #428bca; border-bottom: 1px solid #428bca\">\n" +
    "\n" +
    "                <li style=\"color: #428bca; font-size: 11px\" ng-repeat=\"email in user.emails\"><i\n" +
    "                        style=\"padding-right: 10px\" class=\"glyphicon glyphicon-envelope\"></i> {{email.value}}\n" +
    "                </li>\n" +
    "                <li style=\"color: #428bca; font-size: 11px\"><i style=\"padding-right: 10px\"\n" +
    "                                                               class=\"glyphicon glyphicon-time\"></i> {{user.creationDate\n" +
    "                    | date:'dd.MM.yyyy'}}\n" +
    "                </li>\n" +
    "                <li style=\"color: #428bca; font-size: 11px\"><i style=\"padding-right: 10px\"\n" +
    "                                                               class=\"glyphicon glyphicon-flag\"></i> {{user.status}}\n" +
    "                </li>\n" +
    "                <li style=\"color: #428bca; font-size: 11px\" ng-repeat=\"group in user.groups\"><i\n" +
    "                        style=\"padding-right: 10px\" class=\"glyphicon glyphicon-lock\"></i> {{group.display}}\n" +
    "                </li>\n" +
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
    "    <chell-user-profile user=\"user\" read-only=\"true\"/>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"cancel()\">{{'CHELL_IAM.USER_VIEW_DIALOG.CLOSE_BUTTON' | translate}}</button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
