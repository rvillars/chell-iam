/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

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