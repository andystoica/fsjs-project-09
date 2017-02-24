
(function() {
    'use strict';

    angular
        .module('app')
        .service('dataService', dataService);

    function dataService($http) {
        // GET /api/recipes - Gets all of the recipes
        this.getRecipes = function (callback) {
            $http.get('/api/recipes').then(callback);
        };

        // GET /api/categories - Gets all of the categories
        this.getCategories = function (callback) {
            $http.get('/api/categories').then(callback);
        };

        // GET /api/fooditems - Gets all of the food items
        this.getFoodItems = function (callback) {
            $http.get('/api/fooditems').then(callback);
        };

        // GET /api/recipes?category={category}
        // Gets all of the recipes for the specified category
        this.getRecipesByCategory = function (category, callback) {
            $http.get('/api/recipes?category=' + category).then(callback);
        };

        // GET /api/recipes/{id} - Gets the recipe for the specified ID
        this.getRecipe = function (recipeId, callback) {
            $http.get('/api/recipes/' + recipeId).then(callback);
        }

        // POST /api/recipes - Adds a recipe
        this.addRecipe = function (recipe, callback) {
            $http.post('/api/recipes', recipe).then(callback);
        }

        // PUT /api/recipes/{id} - Updates the recipe for the specified ID
        this.updateRecipe = function (recipe, callback) {
            $http.put('/api/recipes/' + recipe._id, recipe).then(callback);
        }

        // DELETE /api/recipes/{id} - Deletes the recipe for the specified ID
        this.deleteRecipe = function (recipeId, callback) {
            $http.delete('/api/recipes/' + recipeId).then(callback);
        }
    }

})();
