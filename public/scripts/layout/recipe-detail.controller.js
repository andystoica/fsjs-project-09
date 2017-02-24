
(function (){
    'use strict';

    angular
        .module('app')
        .controller('RecipeDetailController', RecipeDetailController);

    function RecipeDetailController($scope, $location, $routeParams, dataService) {
        // Controller public state
        $scope.title = '';
        $scope.recipe = {
            name: "",
            description: "",
            category: "",
            prepTime: "",
            cookTime: "",
            ingredients: [],
            steps: []
        };
        $scope.categories = [];
        $scope.foodItems = [];
        $scope.errors = [];

        // Controller public methods
        $scope.saveRecipe = saveRecipe;
        $scope.goHome = goHome;
        $scope.addIngredient = addIngredient;
        $scope.deleteIngredient = deleteIngredient;
        $scope.addStep = addStep;
        $scope.deleteStep = deleteStep;
        $scope.anyErrors = anyErrors;

        // Get the complete list of categories for category dropdown
        dataService.getCategories(function (res) {
            $scope.categories = res.data;
        });

        // Get the complete list of ingredients for ingredient dropdown
        dataService.getFoodItems(function (res) {
            $scope.foodItems = res.data;
        });

        // ADD new recipe
        if ($location.url() === "/add") {
            $scope.title = 'Add New Recipe';
        }
        // EDIT existing recipe
        else {
            $scope.title = 'Loading recipe';
            let recipeId = $routeParams.id;
            dataService.getRecipe(recipeId, function (res) {
                $scope.recipe = res.data; // Get existing recipe
                $scope.recipe.prepTime = $scope.recipe.prepTime
                        ? $scope.recipe.prepTime.toString()
                        : ""; // PrepTime data to string
                $scope.recipe.cookTime = $scope.recipe.cookTime
                        ? $scope.recipe.cookTime.toString()
                        : "" // CookTime data to string
                $scope.title = $scope.recipe.name; // Page title
            });
        }


        // Saves a new recipes or saves the changes to an existing one
        // based on existence of the _id key
        function saveRecipe() {
            if ($scope.recipe._id) { // Editing an existing recipe
                dataService.updateRecipe($scope.recipe);
            } else { // Saving a new recipe
                dataService.addRecipe($scope.recipe);
            }
            $scope.goHome();
        }

        // Redirect to main list of recipes
        function goHome() {
            $location.path('/');
        }

        // Returns true if the errors array is not empty
        function anyErrors() {
            return $scope.errors.length > 0;
        }

        // Adds an empty foodItem to the list of ingredients
        function addIngredient() {
            $scope.recipe.ingredients.push({});
        }

        // Deletes the selected foodItem from the list of ingredients
        function deleteIngredient(index) {
            $scope.recipe.ingredients.splice(index, 1);
        }

        // Adds an empty cookins step
        function addStep() {
            $scope.recipe.steps.push({});
        }

        // Deletes an existing cooking step
        function deleteStep(index) {
            $scope.recipe.steps.splice(index, 1);
        }
    }

})();
