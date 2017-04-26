'use strict';

define( function () {
    return function ( $scope, Categories ) {

        $scope.numberOrganizations = "222";
        $scope.numberData = "0";

        var query       = '';
        $scope.tags     = Categories.query({
            slug        : {
                $ne     : 'nula'
            },
            page        : 1,
            per_page    : 99,
            type        : 'TAG'
        });
        $scope.search   = function () {
            query       = '';
            if ( $scope.keyword ) {
                query   += 'q=' + $scope.keyword + '&';
            }

            if ( $scope.category ) {
                query   += 'tags=' + $scope.category;
            }

            window.open( 'busca/dataset?' + query, '_self' );
        };

        function updateDataLanding(){
          $.ajax("https://api.datos.gob.mx/v1/resources?pageSize=1")
          .done(function(data){
              $scope.numberData = data.pagination.total;
          })
          .fail(function(err){
            console.log(err);
          });
        }

        updateDataLanding();
    };
});
