/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

    dependency_files: [
        //AngularJS
        'bower-components/angular/angular.js',
        'bower-components/angular-resource/angular-resource.js',
        'bower-components/angular-mocks/angular-mocks.js',

        //AnglularUI
        'bower-components/angular-bootstrap/ui-bootstrap-tpls.js',

        //Underscore
        'bower-components/underscore/underscore.js',
        'bower-components/angular-underscore-module/angular-underscore-module.js',
        'bower-components/angular-underscore/angular-underscore.js',

        //Misc
        'bower-components/angular-md5/angular-md5.js',
        'bower-components/angular-base64/angular-base64.js',
        'bower-components/ng-table/ng-table.js',

        // module
        'chell-iam.js',
        'adapters/MockIamAdapter.js',

        // tests
        'tests/*.js'
    ],

    /**
     * These are the files needed for this module and their order
     */
    module_files: [
        'interceptors.js',
        'module.js',
        'services.js',
        'models.js',
        'directives.js',
        'controllers.js'
    ],

    module_adapters: [
        'adapters/*'
    ]
};