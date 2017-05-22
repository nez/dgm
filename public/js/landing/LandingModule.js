'use strict';

define( function ( require ) {
    var LandingSearchCtrl       = require( 'landing/LandingSearchCtrl' );
    var LandingSubscribeCtrl    = require( 'landing/LandingSubscribeCtrl' );

    var LandingModule           = angular.module( 'LandingModule', []);

    LandingModule.controller( 'LandingSearchCtrl', [ '$scope', '$http', 'CategoriesService', LandingSearchCtrl ]);

    LandingModule.controller( 'LandingSubscribeCtrl', [ '$scope', LandingSubscribeCtrl ]);
});
