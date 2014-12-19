/*jshint globalstrict: true*/
'use strict';

var chellIamExample1 = angular.module('chell-iam-example1', [
    'chell-iam'
]);

chellIamExample1.controller('ExampleGroupController', function($scope, CurrentUserService) {
    $scope.detail = false;
    $scope.list = true;

    $scope.showDetail = function() {
        $scope.detail = true;
        $scope.list = false;
    };

    $scope.showList = function() {
        $scope.detail = false;
        $scope.list = true;
    };

    $scope.readOnly = function() {
        return !CurrentUserService.hasGroupId('e9e30dba-f08f-4109-8486-d5c6a331660a');
    };
});

chellIamExample1.controller('ExampleUserController', function($scope, CurrentUserService) {
    $scope.detail = false;
    $scope.list = true;

    $scope.showDetail = function() {
        $scope.detail = true;
        $scope.list = false;
    };

    $scope.showList = function() {
        $scope.detail = false;
        $scope.list = true;
    };

    $scope.readOnly = function() {
        return !CurrentUserService.hasGroupId('e9e30dba-f08f-4109-8486-d5c6a331660a');
    };
});

chellIamExample1.run(function run($httpBackend) {
    $httpBackend.whenGET(/.*/).passThrough();
});