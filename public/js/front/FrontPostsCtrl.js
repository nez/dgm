'use strict';

define( function () {
    return function ( $scope, $element, $stateParams, Categories, Posts ) {
        $scope.section      = $element.data( 'section' );
        var per_page        = 4,
            queryFeatured   = function ( section, tag ) {
                $scope.featured = Posts.query({
                    expanded    : true,
                    featured    : true,
                    page        : 1,
                    per_page    : 1,
                    section     : section,
                    status      : 'PUBLISHED',
                    tag         : tag
                });
            },
            queryPosts      = function ( section, tag ) {
                $scope.posts    = Posts.query({
                    expanded    : true,
                    featured    : false,
                    page        : 1,
                    per_page    : per_page,
                    section     : section,
                    status      : 'PUBLISHED',
                    tag         : tag
                });
            },
            queryTag        = function () {
                Categories.query({
                    page        : 1,
                    per_page    : 1,
                    select      : 'name',
                    slug        : $stateParams.category,
                    type        : 'TAG'
                }).$promise.then( function ( data ) {
                    if ( !data[0] ) {
                        return;
                    }

                    queryFeatured( $scope.section_id, data[0]._id );
                    queryPosts( $scope.section_id, data[0]._id );
                });
            };

        Categories.query({
            page        : 1,
            per_page    : 1,
            select      : 'name',
            slug        : $element.data( 'section' ),
            type        : 'SECTION'
        }).$promise.then( function ( data ) {
            if ( !data[0] ) {
                return;
            }

            $scope.section_id   = data[0]._id;
            if ( data.length == 1 ) {
                if ( $stateParams.category ) {
                    $scope.tag  = $stateParams.category;
                    per_page    = 3;
                    queryTag();
                } else {
                    queryFeatured( $scope.section_id );
                    queryPosts( $scope.section_id );
                }
            }
        });
    };
});