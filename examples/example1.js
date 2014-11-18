/*jshint globalstrict: true*/
'use strict';

var chellIamExample1 = angular.module('chell-iam-example1', [
    'chell-iam'
]);

chellIamExample1.controller('ExampleGroupController', function($scope) {
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
});

chellIamExample1.controller('ExampleUserController', function($scope) {
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
});