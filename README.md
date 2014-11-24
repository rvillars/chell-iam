# chell-iam [![Build Status](https://travis-ci.org/mimacom/chell-iam.svg?branch=master)](https://travis-ci.org/mimacom/chell-iam)

chell-iam is an identity and access management module for AngularJS applications. It provides a login dialog, a profile view, user and role administration guis and client side security based on roles.
Different REST based backend IAM services (like Apache Syncope, OpenIDM, etc.) can be connected by using the existing Adapter or by writing your own. The following features are provided:

- Directive for sortable and searchable user/group list
- Directive for user/group creation, mutation and validation
- Directive for user profile consisting gravatar profile image
- Login GUI
- Password change GUI
- Support for multible phone numbers, email, messenger and mail addresses.
- Assinging groups to users and other groups
- Editable user profile
- Login mechansim based on HTTP and basicauth
- Custom password patterns with validation
- Customizable readonly mode (e.g. based on group membership)
- Externalized preferences e.g. for password regex
- Full functional example based on a SCIM backend mock
- Fully translatable with angular-translate
- Autorisation service for group mebership check
- Provided SCIM 2.0 compatible backend adapter (http://www.simplecloud.info)
- Support for custom IAM backends by implementing your own adapters

## Screenshots

TODO: Upload screenshots
TODO: Provide link to example page

## Installation

Classical clientside javascript procedure:

Once on your system:
- Install NodeJS
- npm install -g grunt-cli
- npm install -g bower

For this module:
- npm install
- bower install
- grunt build

## Usage

TODO: Write usage instructions

## Thirdparty libraries

chell-iam is based on:
 - Twitter Bootstrap
 - UI Bootstrap
 - AngularJS
 - ng-table
 - underscore
 - angular-md5
 - angular-translate
 - angular-base64

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO: Write history

## License

Apache License 2.0, see LICENSE file.
