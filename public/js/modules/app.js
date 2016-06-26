var appModule = angular.module('KitChat', ['ngRoute']);
appModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'partials/unjoined-group',
            controller: 'UnjoinedGroupController',
            controllerAs: 'vm'
        })
            .when('/joined-group', {
            templateUrl: 'partials/joined-group',
            controller: 'JoinedGroupController',
            controllerAs: 'vm'
        })
            .when('/room/:groupName', {
            templateUrl: 'partials/chat-room',
            controller: 'ChatRoomController',
            controllerAs: 'vm'
        })
            .otherwise({
            redirect: '/'
        });
    }]);
appModule.constant('Config', Config.Default);
appModule.controller('AppController', ['$scope', '$location',
    function ($scope, $location) { return new KitChat.Controllers.AppController($scope, $location); }
]);
appModule.controller('UnjoinedGroupController', ['$scope', '$http', 'Config',
    function ($scope, $http, Config) { return new KitChat.Controllers.UnjoinedGroupController($scope, $http, Config); }
]);
