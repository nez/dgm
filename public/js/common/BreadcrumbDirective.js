'use strict';

define( function () {
    return function ( $location, events ) {
        return {
            restrict    : 'E',
            templateUrl : 'partials/common/breadcrumb',
            link        : function ( scope ) {
                scope.crumbs    = [];
                var sections    = $location.path().substring( 1 ).split( '/' ),
                    query       = $location.search();

                if ( sections[0] == 'herramientas' || sections[0] == 'blog' ) {
                    scope.crumbs.push({
                        params  : {
                            section     : sections[0]
                        },
                        sref    : 'front.section',
                        url     : sections[0]
                    });
                }
                if ( query && query.category ) {
                    scope.crumbs.push({
                        params  : {
                            section     : sections[0],
                            category    : query.category
                        },
                        sref    : 'front.section',
                        url     : query.category.replace( new RegExp( '-', 'g' ), ' ' )
                    });
                }
                if ( query && query.tag ) {
                    var params  = {
                        section : sections[0],
                        tag     : query.tag
                    };

                    if ( query.category ) {
                        params.category = query.category
                    }

                    scope.crumbs.push({
                        params  : params,
                        sref    : 'front.section',
                        url     : query.tag.replace( new RegExp( '-', 'g' ), ' ' )
                    });
                }

                scope.$on( events.POSTS_RETRIEVED, function ( e, post ) {
                    scope.crumbs.push({
                        params  : {
                            category    : post.category.name,
                            section     : post.section.name,
                            tag         : post.tag.name
                        },
                        sref    : 'front.post',
                        url     : post.name
                    });
                });
                scope.$on( events.CATEGORIES_RETRIEVED, function ( e, category ) {
                    scope.crumbs.push({
                        params  : {
                            category    : category.slug
                        },
                        sref    : 'front.category',
                        url     : category.name
                    });
                });
            }
        };
    };
});