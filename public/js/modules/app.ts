var appModule = angular.module('kitChat',['ngRoute']);

appModule.controller('GroupController',['$scope','$http',($scope,$http)
    => new KitChat.Controllers.GroupController($scope,$http)]);
