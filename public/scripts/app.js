(function (){
    'use strict';

    angular
        .module('app', ['ngRoute'])
        .factory('$exceptionHandler', exceptionHandler);

    // Overrides exception handling functionaly
    function exceptionHandler() {
        return function (error, cause) {
            console.log('Error: ' + error.message);
        };
    }

})();
