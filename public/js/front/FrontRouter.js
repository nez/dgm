'use strict';

define( function () {
    return function ( $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.rule( function( $injector, $location ) {
            var path                = $location.path(),
                hasTrailingSlash    = path[path.length-1] === '/';

            if( hasTrailingSlash ) {
                //if last charcter is a slash, return the same url without the slash
                var newPath = path.substr(0, path.length - 1);
                return newPath;
            }
        });

        $stateProvider
            .state( 'front', {
                abstract    : true,
                views       : {
                    application         : {
                        templateUrl     : 'partials/front/base',
                        controller      : 'FrontCtrl'
                    }
                }
            })
            .state( 'about', {
                parent  : 'front',
                url     : '/acerca',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/about',
                        controller      : 'FrontAboutCtrl'
                    }
                }
            })
            .state( 'style_guide', {
                parent  : 'front',
                url     : '/guia-estilos',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/style_guide'
                    }
                }
            })
            .state( 'privacy', {
                parent  : 'front',
                url     : '/privacidad',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/privacy',
                        controller      : 'FrontPrivacyCtrl'
                    }
                }
            })
            .state('accessibility', {
               parent    : 'front',
               url       : '/accesibilidad',
               views     : {
                    'front-container'  : {
                       templateUrl     : 'partials/front/accessibility',
                       controller      : 'FrontAccessibilityCtrl'
                     }
                 }
             })
            .state( 'libreusomx', {
                parent  : 'front',
                url     : '/libreusomx',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/libreusomx'
                    }
                }
            })
            .state( 'home', {
                abstract    : true,
                parent      : 'front',
                views       : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/home',
                        controller      : 'FrontHomeCtrl'
                    }
                }
            })
            .state( 'landing', {
                parent      : 'home',
                url         : '/',
                views       : {
                    'landing-search'    : {
                        templateUrl     : 'partials/front/landingSearch',
                        controller      : 'LandingSearchCtrl'
                    },
                    'landing-data'      : {
                        templateUrl     : 'partials/data/table',
                        controller      : 'DataLoadCtrl'
                    },
                    'landing-tools'     : {
                        templateUrl     : 'partials/front/posts',
                        controller      : 'FrontPostsCtrl'
                    },
                    'landing-visualizers'
                                        :{
                      templateUrl       : 'partials/front/posts',
                      controller        : 'FrontPostsCtrl'
                    },
                    'landing-blog'      : {
                        templateUrl     : 'partials/front/posts',
                        controller      : 'FrontPostsCtrl'
                    },
                    'landing-subscribe' : {
                        templateUrl     : 'partials/front/landingSubscribe',
                        controller      : 'LandingSubscribeCtrl'
                    }
                }
            })
            .state( 'category', {
                abstract    : true,
                parent      : 'front',
                url         : '/categoria',
                views       : {
                    'front-container'   : {
                        templateUrl     : 'partials/categories/front'
                    }
                }
            })
            .state( 'category.details', {
                url         : '/:category',
                views       : {
                    'category-header'   : {
                        templateUrl     : 'partials/categories/header',
                        controller      : 'CategoriesHeaderCtrl'
                    },
                    'category-data'     : {
                        templateUrl     : 'partials/data/table',
                        controller      : 'DataLoadCtrl'
                    },
                    'category-tools'    : {
                        templateUrl     : 'partials/front/posts',
                        controller      : 'FrontPostsCtrl'
                    },
                    'category-blog'     : {
                        templateUrl     : 'partials/front/posts',
                        controller      : 'FrontPostsCtrl'
                    },
                    'category-extras'   : {
                        templateUrl     : 'partials/categories/extras',
                        controller      : 'CategoriesExtraCtrl'
                    }
                }
            })
            .state( 'front.post', {
                url     : '/{section:herramientas|blog}/:post?category&tag',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/posts/front',
                        controller      : 'PostsFrontCtrl'
                    }
                }
            })
            .state( 'front.section', {
                params  : {
                    category_id : null,
                    section_id  : null
                },
                url     : '/{section:herramientas|blog}?category&tag',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/posts/section',
                        controller      : 'PostsSectionCtrl'
                    }
                }
            })
            .state( '404', {
                parent  : 'front',
                url     : '/404',
                views   : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/404'
                    }
                }
            });
    };
});
