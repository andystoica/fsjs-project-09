(function (){
    'use strict';

    angular
        .module('app')
        .controller('RecipeDeleteController', RecipeDeleteController)

    function RecipeDeleteController($scope, $location, $routeParams, dataService) {
        // Controller public state
        $scope.recipe = {};
        $scope.recipeId = $routeParams.id;

        // Controller public methods
        $scope.deleteRecipe = deleteRecipe;
        $scope.cancelDelete = goHome;

        // Get recipe details
        dataService.getRecipe($scope.recipeId, function (res) {
            $scope.recipe = res.data;
        });



        // Removeds the selected recipe from the list by
        // sending DELETE API call and redirect home
        function deleteRecipe(deleteId) {
            dataService.deleteRecipe(deleteId);
            goHome();
        }

        // Cancels delete and redirects to home page
        function goHome() {
            $location.path('/');
        }
    }

})();
