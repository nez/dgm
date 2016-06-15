'use strict';

define( function ( require ) {
    var BaseService             = require( 'common/BaseService' );
    var CkanService             = require( 'common/CkanService' );
    var BreadcrumbDirective     = require( 'common/BreadcrumbDirective' );
    var FileUploaderDirective   = require( 'common/FileUploaderDirective' );
    var NoSpaceFilter           = require( 'common/NoSpaceFilter' );
    var TweetDirective          = require( 'common/TweetDirective' );

    var CommonModule            = angular.module( 'CommonModule', []);

    CommonModule.directive( 'breadcrumb', [ '$location', 'events', BreadcrumbDirective ]);

    CommonModule.directive( 'fileUploader', [ '$rootScope', 'events', 'SessionsService', FileUploaderDirective ]);

    CommonModule.directive( 'tweet', [ '$window', '$location', TweetDirective ]);

    CommonModule.factory( 'BaseService', [ '$rootScope', '$resource', 'events', BaseService ]);

    CommonModule.factory( 'CkanService', [ '$rootScope', '$resource', 'events', CkanService ]);

    CommonModule.filter( 'noSpace', [ NoSpaceFilter ]);
});