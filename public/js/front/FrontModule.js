'use strict';

define( function ( require ) {
    var FrontAboutCtrl      = require( 'front/FrontAboutCtrl' );
    var FrontPrivacyCtrl      = require( 'front/FrontPrivacyCtrl' );
    var FrontController     = require( 'front/FrontController' );
    var FrontHomeCtrl       = require( 'front/FrontHomeCtrl' );
    var FrontPopupCtrl      = require( 'front/FrontPopupCtrl' );
    var FrontPostsCtrl      = require( 'front/FrontPostsCtrl' );
    var FrontRouter         = require( 'front/FrontRouter' );

    var FrontModule         = angular.module( 'FrontModule', []);

    FrontModule.config([ '$stateProvider', '$urlRouterProvider', FrontRouter ]);

    FrontModule.controller( 'FrontAboutCtrl', [ '$scope', '$sce', 'PostsService', FrontAboutCtrl ]);

    FrontModule.controller( 'FrontPrivacyCtrl', [ '$scope', '$sce', 'PostsService', FrontPrivacyCtrl ]);

    FrontModule.controller( 'FrontCtrl', [ '$cookies', '$uibModal', FrontController ] );

    FrontModule.controller( 'FrontHomeCtrl', [ '$scope', '$cookies', '$uibModal', FrontHomeCtrl ]);

    FrontModule.controller( 'FrontPopupCtrl', [ '$scope', '$uibModalInstance', FrontPopupCtrl ]);

    FrontModule.controller( 'FrontPostsCtrl', [ '$scope', '$element', '$stateParams', 'CategoriesService', 'PostsService', 'VisualizersService', FrontPostsCtrl ]);
});
