(function (){
    'use strict';

    angular
        .module('app')
        .controller('RecipesController', RecipesController)

    function RecipesController($scope, $location, dataService) {
        // Controller public state
        $scope.recipes = [];
        $scope.categoris = [];

        // Controller public methods
        $scope.isListEmpty = isListEmpty;
        $scope.filterByCategory = filterByCategory;
        $scope.deleteRecipe = deleteRecipe;
        $scope.addNewRecipe = addNewRecipe;

        // Get complete list of recipes
        dataService.getRecipes(function (res) {
            $scope.recipes = res.data;
        });
        // Get complete list of categories
        dataService.getCategories(function (res) {
            $scope.categories = res.data;
        });



        // Returns true if the list of recipes is empty
        function isListEmpty() {
            return $scope.recipes.length === 0;
        }

        // Refines the list of recipes for a certain category
        // through a new API call
        function filterByCategory() {
            let category = $scope.currentCategory ? $scope.currentCategory.name : "";
            dataService.getRecipesByCategory(category, function (res) {
                $scope.recipes = res.data;
            });
        }

        // Removeds the selected recipe from the list and
        // sends DELETE API call
        function deleteRecipe(deleteId) {
            $scope.recipes = $scope.recipes.filter(recipe => recipe._id !== deleteId);
            dataService.deleteRecipe(deleteId);
        }

        // Redirects to new recipe page
        function addNewRecipe() {
            $location.path('/add');
        }
    }

})();
