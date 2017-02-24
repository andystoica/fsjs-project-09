(function (){
    'use strict';

    angular
        .module('app', ['ngRoute'])
        .factory('$exceptionHandler', exceptionHandler);

    // Overrides exception handling functionaly by displaying
    // the error message inside an alert window
    function exceptionHandler() {
        return function (error, cause) {
            alert('Error: ' + error.message);
        };
    }

})();
