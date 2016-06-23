var appModule = angular.module('kitChat', ['ngRoute']);
appModule.controller('GroupController', ['$scope', '$http',
    function ($scope, $http) { return new KitChat.Controllers.GroupController($scope, $http); }]);
