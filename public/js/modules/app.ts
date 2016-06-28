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

// Initiate Constant Value
appModule.constant('Config', Config.Default);

// Initiate Factory
appModule.factory('GroupFactory', ['$http','$q','Config',
    ($http,$q,Config) => {
        return new KitChat.Factory.GroupFactory($http,$q,Config);
    }
]);

// Initiate Controller
appModule.controller('AppController',['$scope','$location','GroupFactory',
    ($scope,$location,GroupFactory) => new KitChat.Controllers.AppController($scope,$location,GroupFactory)
]);

appModule.controller('UnjoinedGroupController',['$scope','$http','Config','GroupFactory',
    ($scope,$http,Config,GroupFactory) => new KitChat.Controllers.UnjoinedGroupController($scope,$http,Config,GroupFactory)
]);

appModule.controller('JoinedGroupController',['$scope','$http','$location','Config','GroupFactory',
    ($scope,$http,$location,Config,GroupFactory) => new KitChat.Controllers.JoinedGroupController($scope,$http,$location,Config,GroupFactory)
]);

appModule.controller('ChatRoomController',['$scope','$http','$location','Config','GroupFactory',
    ($scope,$http,$location,Config,GroupFactory) => new KitChat.Controllers.ChatRoomController($scope,$http,$location,Config,GroupFactory)
]);
