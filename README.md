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

## Example/Screenshots

[Example Site](https://rawgit.com/rvillars/chell-iam/master/examples/example1.html)

#### User List
![user-list](https://raw.githubusercontent.com/mimacom/chell-iam/gh-pages/screenshots/user-list.png "User List")

#### Editing Groups
![group-form](https://raw.githubusercontent.com/mimacom/chell-iam/gh-pages/screenshots/group-form.png "Editing Groups")

#### Login Dialog
![Login](https://raw.githubusercontent.com/mimacom/chell-iam/gh-pages/screenshots/login.png "Login Dialog")

## Installation

Just the common clientside javascript procedure:

Once on your system:
- Install NodeJS
- npm install -g grunt-cli
- npm install -g bower

For this module:
- npm install
- bower install
- grunt build

## Usage

TODO: code and examples

- Add "chell-iam": "mimacom/chell-iam#master" to your bower dependencies
- Load "chell-iam.min.js" in your index file
- Make sure you also load transitive dependencies (e.g. with grunt-bower-install). See also bower.json file of chell-iam dependency
- Load "styles/chell-iam.css" in your index file
- Select an adapter form the directory "adapters" (e.g. SCIMIamAdapter.js) or write your own adapter and load it in your index file
- Add 'chell-iam' as a depencency to your angularjs module
- Add the attribute class="chell-login-required" on the body tag of your website to enable the chell-iam login functionality for your application
- Add <chell-user-profile/> or an appropriate tag (see wiki) to your html code.

#### Using Iam Mock
- Add module 'ngMockE2E' to your applications module dependencies
- Load "adapters/SCIMIamMock.js"
- Add httpBackend passthrough (e.g. like in example1.js)

## Thirdparty libraries

chell-iam is based on:
 - AngularJS
 - Twitter Bootstrap
 - UI Bootstrap
 - ng-table
 - angular-md5
 - angular-translate
 - angular-base64
 - underscore

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

- 0.1.0 - Version for chell-js prototype *Not production ready*
- 0.2.0 - Enhanced SCIM compatible version *Not production ready*

## License

Apache License 2.0, see LICENSE file.
