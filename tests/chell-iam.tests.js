'use strict';

describe('IamUser', function() {

    //mock Module to allow us to inject our own dependencies
    beforeEach(angular.mock.module('chell-iam'));
    
    // tests start here
    
    it('should exist',inject(function(IamUser) {
        expect(IamUser).toBeDefined();
    }));

    it('should query list of users', inject(function(IamUser) {
        IamUser.query().then(function(users) {
            expect(users.length).toBe(2);
        });
    }));
    
    it('should get the correct user', inject(function(IamUser) {
        var adminId = '2819c223-7f76-453a-919d-413861904646';
        IamUser.get(adminId).then(function(user) {
            expect(user.length).toBe(1);
            expect(user.id).toBe(adminId);
            expect(user.userName).toBe('chellAdmin')
        });
    }));
});

describe('UserProfileController', function() {

    //mock Module to allow us to inject our own dependencies
    beforeEach(angular.mock.module('chell-iam'));
    
    // tests start here
    
    it('should be creatable', inject(function($rootScope, $controller, IamUser) {
        var scope = $rootScope.$new();
        var userListCtrl = $controller("UserProfileController", {$scope: scope, IamUser: IamUser });
        expect(userListCtrl).toBeDefined();
    }));
});