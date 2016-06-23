/// <reference path="../../typings/angularjs/angular.d.ts"/>

var appModule = angular.module('kitChat',['ngRoute']);

appModule.controller('GroupController',['$scope','$http',
    ($scope,$http) => new KitChat.Controllers.GroupController($scope,$http)]);
