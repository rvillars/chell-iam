'use strict';

describe('UserListController', function() {
    var scope;//we'll use this scope in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('chell-iam'));
    // tests start here

    it('should fetch list of users', inject(function(IamUser) {
        IamUser.query().then(function(users) {
            expect(users.length).toBe(2);
        });
    }));
});