var chat = angular.module('chat',['ngRoute']);

chat.directive('addModal',function(){
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismiss = function() {
                element.modal('hide');
            };
        }
    }
});

chat.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/list', {
        templateUrl: 'partials/chat-list',
        controller: 'testCtrl'
    }).
    when('/room', {
        templateUrl: 'partials/chat-room',
        controller: 'testCtrl'
    }).
    otherwise({
        redirectTo: '/chat'
    });
    // $locationProvider.html5Mode(true);
}]);

chat.controller('testCtrl',function($scope){
    $scope.chatList = "chat list";
    $scope.chatRoom = "chat room";

});

chat.controller('addGroupCtrl',function($scope,$rootScope,$http){
    $scope.createGroup = function(){
        console.log("HELLO");
        $http.post("/createGroup", {groupname:$scope.groupname})
        .success(function(data, status) {
            console.log($rootScope.groups);
            $rootScope.unjoinedgroups.push({"name":$scope.groupname});
            $scope.dismiss();
        });
    }
});

chat.controller('groupListCtrl',function($scope,$rootScope,$http){
    $http.get('/api/group').
    success(function(data) {
        $rootScope.unjoinedgroups = data['unjoinedgroup'];
        $rootScope.joinedgroups = data['joinedgroup'];
    });

    $scope.twoLetterGroupName = function(group){
        return group.substring(0,2);
    }
    $scope.groupnameToDisplay = function(group){
        return group.substring(0,10);
    }

    $scope.joinGroup = function(groupname){
        console.log(groupname);
        //TODO POST TO ROUTE
        $http.post("/joininggroup",{group:groupname})
        .success(function(data,status){
            console.log("WE DID IT YEAH");
        });
    }

});

chat.controller('messageListCtrl',function($scope,$rootScope){

});
