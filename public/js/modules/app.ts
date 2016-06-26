/// <reference path="../app.d.ts"/>

var appModule = angular.module('KitChat',['ngRoute']);

// Config Route
appModule.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when('/',{
            templateUrl: 'partials/unjoined-group',
            controller: 'UnjoinedGroupController',
            controllerAs: 'vm'
        })
        .when('/joined-group',{
            templateUrl: 'partials/joined-group',
            controller: 'JoinedGroupController',
            controllerAs: 'vm'
        })
        .when('/room/:groupName',{
            templateUrl: 'partials/chat-room',
            controller: 'ChatRoomController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirect: '/'
        });
}]);

// Initiate Controller
appModule.controller('AppController',['$scope','$location',
    ($scope,$location) => new KitChat.Controllers.AppController($scope,$location)
]);

appModule.controller('UnjoinedGroupController',['$scope','$http',
    ($scope,$http) => new KitChat.Controllers.UnjoinedGroupController($scope,$http)
]);
