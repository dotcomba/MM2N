
var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ui.bootstrap']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "app/views/login.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "app/views/signup.html"
    });

    $routeProvider.when("/orders", {
        controller: "ordersController",
        templateUrl: "app/views/orders.html"
    });

    $routeProvider.when("/categories", {
        controller: "categoriesController",
        templateUrl: "app/views/categories.html"
    });

    $routeProvider.when("/categories/insert", {
        controller: "categoriesController",
        templateUrl: "app/views/createcategory.html"
    });

    $routeProvider.when("/categories/update/:id", {
        controller: "categoriesController",
        templateUrl: "app/views/updatecategory.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "app/views/associate.html"
    });

    $routeProvider.otherwise({ redirectTo: "/categories" });

});

//var serviceBase = 'http://localhost:49213/';
var serviceBase = 'http://mm2server.azurewebsites.net/';
//var serviceBase = 'http://dev-m5.cloudapp.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


