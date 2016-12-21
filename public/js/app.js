'use strict';

define( function ( require ) {
    require( 'events' );
    require( 'admin/AdminModule' );
    require( 'categories/CategoriesModule' );
    require( 'common/CommonModule' );
    require( 'data/DataModule' );
    require( 'datasets/DatasetsModule' )
    require( 'front/FrontModule' );
    require( 'landing/LandingModule' );
    require( 'posts/PostsModule' );
    require( 'sessions/SessionsModule' );
    require( 'users/UsersModule' );
    require( 'visualizers/VisualizersModule');

    var app     = angular.module( 'dgm', [
            'angular-medium-editor',
            'events',
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ui.bootstrap.datepicker',
            'ui.bootstrap.modal',
            'ui.bootstrap.pagination',
            'ui.bootstrap.tooltip',
            'ui.bootstrap.tpls',
            'ui.router',
            'AdminModule',
            'CategoriesModule',
            'VisualizersModule',
            'CommonModule',
            'DataModule',
            'DatasetsModule',
            'FrontModule',
            'LandingModule',
            'PostsModule',
            'SessionsModule',
            'UsersModule'
        ]);

    app.config( [ '$locationProvider', '$urlRouterProvider', '$httpProvider', function ( $locationProvider, $urlRouterProvider, $httpProvider ) {
        $locationProvider.html5Mode( true );
        $urlRouterProvider.otherwise( function ( $injector, $location, $window ) {
            if ( $location.url() == '/busca' ) {
                window.open( $location.absUrl(), '_self' );
            } else {
                $location.url( '/404' );
            }
        });

        $httpProvider.interceptors.push( [ '$rootScope', '$cookies', function ( $rootScope, $cookies ) {
            return {
                request     : function( config ) {
                    var api = ( config.url.indexOf( 'cms-api' ) != -1 ) ? true : false;
                    if ( api ) {
                        var holder  = '';

                        if ( config.method == "DELETE" || config.method == "GET" ) {
                            holder  = 'params';
                        } else {
                            holder  = 'data';
                        }
                        // Append the application signature to the api request
                        if ( config[holder] === undefined || config[holder] === null ) {
                            config[holder]   = {};
                        }

                        var session = $cookies.getObject( 'session' );
                        if ( session ) {
                            config[holder].session   = session.token;
                        }
                    }

                    return config;
                }
            };
        }]);
    }]);

    app.run([ '$rootScope', '$state', '$window', '$location', function ( $rootScope, $state, $window, $location ) {
        $window.ga( 'create', 'UA-44411606-15', 'auto' );
        $rootScope.$state   = $state;

        $rootScope.$on( '$stateChangeSuccess', function ( event ) {
            $window.ga('send', 'pageview', $location.path());
        });
    }]);

    return app;
});
