'use strict';
app.factory('categoriesService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var categoriesServiceFactory = {};

    // Get all categories
    var _getCategories = function () {

        return $http.get(serviceBase + 'api/categories').then(function (results) {
            return results;
        });
    };
    categoriesServiceFactory.getCategories = _getCategories;

    //Get Category by Id
    categoriesServiceFactory.getCategory = function (Id) {
        return $http.get(serviceBase + "api/categories/getbyid/" + Id);
    }

    //Create new record
    categoriesServiceFactory.createCategory = function (category) {
        var result = $http({
            method: "post",
            url: serviceBase + "api/categories/insert",
            data: category
        });
        return result;
    }

    //Update the Record
    categoriesServiceFactory.updateCategory = function (Id, category) {
        var result = $http({
            method: "put",
            url: serviceBase + "api/categories/update/" + Id,
            data: category
        });
        return result;
    }

    //Delete the Record
    categoriesServiceFactory.deleteCategory = function (Id) {
        var result = $http({
            method: "delete",
            url: serviceBase + "api/categories/delete/" + Id
        });
        return result;
    }

    return categoriesServiceFactory;

}]);