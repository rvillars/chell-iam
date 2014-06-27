chell-iam [![Build Status](https://travis-ci.org/mimacom/chell-iam.svg?branch=master)](https://travis-ci.org/mimacom/chell-iam)
=========

chell-iam is an identity and access management module for AngularJS applications. It provides a login dialog, a profile view, user and role administration guis and client side security based on roles.
 
Different REST based backend IAM services (like Apache Syncope, OpenIDM, etc.) can be connected by using the existing Adapter or by writing your own. 

chell-iam is based on:
 - Twitter Bootstrap
 - AngularJS
 - ng-table
 - underscore
 
Installation/Build
------------------
Classical clientside javascript procedure:
 
Once:
- Install NodeJS
- npm install -g grunt-cli
- npm install -g bower
 
For this module:
- npm install
- bower install
- grunt build
