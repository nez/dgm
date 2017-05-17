'use strict';

define( function () {
    return function ( $scope, $sce, Categories, Posts ) {
        Categories.get( 'desarrolladores' ).$promise.then( function ( data ) {
            Posts.query({
                expanded    : true,
                section     : data._id
            }).$promise.then( function ( posts ) {
                $scope.intro    = _.findWhere( posts, {
                    slug    : 'desarrolladores-intro'
                }).content;

                $scope.catalog  = _.findWhere( posts, {
                    slug    : 'catalogo-de-datos-abiertos'
                }).content;

                $scope.cdn_apis = _.filter( posts, function ( el ) {
                    return el.category.slug == 'api-cdn'
                });

                $scope.ext_apis = _.filter( posts, function ( el ) {
                    return el.category.slug == 'api-external'
                });
            });
        });
    };
});