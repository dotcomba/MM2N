'use strict';
app.controller('categoriesController', ['$scope', '$routeParams', '$location', '$timeout', '$route', '$modal',  'categoriesService', function ($scope, $routeParams, $location, $timeout, $route, $modal, categoriesService) {

    //Method to Get Sibgle Category by Id
    var _getCategory = function (Id) {
        categoriesService.getCategory(Id).then(function (result) {
            var res = result.data;
            $scope.category = {
                id: res.id,
                title: res.title,
                description: res.description,
                date: res.date,
                UserId : res.userId,
                transactiontypeid: res.transactionTypeId
            };
        },
                  function (error) {
                      $scope.message = 'Ошибка в процессе загрузки! ';
                  });
     }
    $scope.getCategory = _getCategory;

    // Method to Insert
    $scope.createCategory = function () {

        categoriesService.createCategory($scope.category).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Новая категория создана!";
            startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Ошибка в процессе создания категории: " + errors.join(' ');
         });
    };

    // Method to Update
    $scope.updateCategory = function (id) {

        categoriesService.updateCategory(id, $scope.category).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Категория обновлена успешно!";
            startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Ошибка обновления категории: " + errors.join(' ');
         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/categories');
            $route.reload();
        }, 1000);
    }

    //Method to Delete
    $scope.deleteCategory = function (id, title) {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'deletecategory.html',
                controller: 'ModalConfirmCtrl',
                size: 'sm',
                resolve: {
                    title: function () {
                        return title;
                    }
                }
            });

            modalInstance.result.then(function (res) {
                categoriesService.deleteCategory(id).then(function (response) {
                    $scope.savedSuccessfully = true;
                    $scope.message = "Удалено успешно!";
                    startTimer();

                }, function (err) {
                    $scope.message = "Ошибка" + err;
                });
            }, function () {
                //alert("dismised");
                // https://angular-ui.github.io/bootstrap/
            });
       
    }

    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.TransactionTypes = [{ Value: '35F5A676-539A-46B2-9779-D932FA2B234F', Text: 'Приход' }, { Value: '6B97275F-CCA8-4270-8CCB-CD294AAE7FDB', Text: 'Расход' }];

    // initialization and load
    $scope.categories = [];

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.category = {
        title: "",
        description: "",
        date: new Date(),
        transactiontypeid: '6B97275F-CCA8-4270-8CCB-CD294AAE7FDB'
    };

    // Get single category by id or list without id
    var idParam = $routeParams.id;
    if (idParam != undefined) {
        _getCategory(idParam);
    } else {
        categoriesService.getCategories().then(function (results) {
            $scope.categories = results.data;
        }, function (error) {
            $scope.message = "Ошибка в процессе загрузки!";
        });
    }

    // routing navigation panel
    switch ($route.current.templateUrl) {
        case 'app/views/createcategory.html':
            $("#phContentHeader").html("<i class='fa fa-shopping-cart'></i>&nbsp; Создание категории &nbsp;<small>заполните обязательные поля и сохраните</small>");
            $(".breadcrumb").html("<li><a href='#/Orders'>Главная</a></li><li><a href='#/categories'>Категории</a></li><li class='active'>Создание новой</li>");
            break;
        case 'app/views/updatecategory.html':
            $("#phContentHeader").html("<i class='fa fa-shopping-cart'></i>&nbsp; Правка категории &nbsp;<small>внесите изменения сейчас</small>");
            $(".breadcrumb").html("<li><a href='#/Orders'>Главная</a></li><li><a href='#/categories'>Категории</a></li><li class='active'>Правка</li>");
            break;
        case 'app/views/categories.html':
            $("#phContentHeader").html("<i class='fa fa-shopping-cart'></i>&nbsp; Категории&nbsp;<small>добавте или удалите категорию</small>");
            $(".breadcrumb").html("<li><a href='#/Orders'>Главная</a></li><li class='active'>Категории</li>");
            break;
        default:
            $("#phContentHeader").html("<i class='fa fa-shopping-cart'></i>&nbsp; Добро пожаловать&nbsp;<small>выберите функцию для начала</small>");
            $(".breadcrumb").html("<li><a href='#/Orders'>Главная</a></li><li class='active'>Активная</li>");
    }

    //to do
    // -1. Загрузка справочника и его значения
    // 2. Конфирмейшин не системный
    // -3. Проверка и отображение картинки не на основе ИДешника а на основе Кода
    // +4. Проверить по доступности для аутентифицированного пользователя всех трех Страниц
    // +5. Рускоязычные сообщения об ошибках на стороне сервера

    // 6. Вынос базы данных в облако
    // 7. Переименование всех мест где написано ngAuth на правильные названия, чистка кода
    // 8. Сохранение исходников
    // 9. Создание фонгепа смотрящего на базу данных в облаке

    // 9. ПРОМ разработка с привлечением Вадима Высоцкого, возможно и других

}]);


