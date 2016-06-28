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
appModule.factory('GroupFactory', ['$http', '$q', 'Config',
    function ($http, $q, Config) {
        return new KitChat.Factory.GroupFactory($http, $q, Config);
    }
]);
appModule.controller('AppController', ['$scope', '$location', 'GroupFactory',
    function ($scope, $location, GroupFactory) { return new KitChat.Controllers.AppController($scope, $location, GroupFactory); }
]);
appModule.controller('UnjoinedGroupController', ['$scope', '$http', 'Config', 'GroupFactory',
    function ($scope, $http, Config, GroupFactory) { return new KitChat.Controllers.UnjoinedGroupController($scope, $http, Config, GroupFactory); }
]);
appModule.controller('JoinedGroupController', ['$scope', '$http', '$location', 'Config', 'GroupFactory',
    function ($scope, $http, $location, Config, GroupFactory) { return new KitChat.Controllers.JoinedGroupController($scope, $http, $location, Config, GroupFactory); }
]);
appModule.controller('ChatRoomController', ['$scope', '$http', '$location', 'Config', 'GroupFactory',
    function ($scope, $http, $location, Config, GroupFactory) { return new KitChat.Controllers.ChatRoomController($scope, $http, $location, Config, GroupFactory); }
]);
