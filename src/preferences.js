'use strict';

var preferences = angular.module('preferences', []);

preferences.constant('$preferences', {
    'CHELL_IAM': {
        'SECURITY': {
            'PASSWORD_PATTERN': /^(?=.*[a-z])(?=.*[A-Z]).{4,15}$/
        }
    }
});