/*jshint globalstrict: true*/
'use strict';

var chellIamExample2 = angular.module('chell-iam-example2', [
    'chell-iam'
]);

chellIamExample2.controller('ExampleController2', function($scope) {
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