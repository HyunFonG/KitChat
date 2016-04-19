var chat = angular.module('chat',['ngRoute','ngAnimate','angular-loading-bar']);

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
        // controller: 'chatRoomCtrl'
    }).
    when('/room/:groupname', {
        templateUrl: 'partials/chat-room',
        controller: 'chatRoomCtrl'
    }).
    otherwise({
        templateUrl: 'partials/chat-list'
    });
    // $locationProvider.html5Mode(true);
}]);

chat.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);

chat.controller('addGroupCtrl',function($scope,$rootScope,$http){
    $scope.createGroup = function(){
        console.log("HELLO");
        $http.post("/createGroup", {groupname:$scope.groupname})
        .success(function(data, status) {
            console.log($rootScope.groups);
            $rootScope.unjoinedgroups.push({"name":$scope.groupname});
            $scope.dismiss();
            toastr["success"]($scope.groupname+" has been created!", "Group Created!");
        });
    }
});

chat.controller('groupListCtrl',function($scope,$rootScope,$http){
    $http.get('/api/group').
    success(function(data) {
        $rootScope.unjoinedgroups = data['unjoinedgroup'];
        $rootScope.joinedgroups = data['joinedgroup'];
    });

    $scope.joinGroup = function(groupname,index){
        console.log(groupname);
        $http.post("/joininggroup",{group:groupname})
        .success(function(data,status){
            console.log("INDEX :"+index);
            $rootScope.joinedgroups.push({"group":groupname});
            // var groupElem = angular.element( document.querySelector('#box-'+groupname));
            // groupElem.remove();
            $rootScope.unjoinedgroups.splice(index,1);
            toastr["success"]("You joined group \""+groupname+"\"", "Joined!");
        });
    }

});

chat.controller('messageListCtrl',function($scope,$rootScope,$location){
    $scope.navigateToChatRoom = function(route_path){
        console.log("Hello I'am Navigate to Chat Room");
        //TODO Make navigate to chat room with specific id (or name somehow...)
        $location.path(route_path);
    }
});

chat.controller('chatRoomCtrl',function($scope,$location,$routeParams,$http,$timeout){
    $scope.navigateBack = function(){
        console.log("I'am going back");
        //TODO Make navigate to chat room with specific id (or name somehow...)
        $location.path('/list');
    }
    $scope.roomTitle = " "+$routeParams.groupname;

    $http.post('/loadMessage',{groupname:$routeParams.groupname})
    .success(function(data,status){
        console.log(data);
        $scope.messagesList = data['message'];
        $scope.currentUser = data['cur_user'];
        $timeout(function(){
            var objDiv = document.getElementById("to-scroll");
            objDiv.scrollTop = objDiv.scrollHeight;
        },0,false);

    });

    $scope.getLeftRightClass = function(index,messageList,currentUser,mode){
        // console.log(mode);
        if(messageList[index]["username"] != currentUser){
            if(mode == 0)
                return "message-leftzone";
            return "message-left";
        }
        else{
            if(mode == 0)
                return "message-rightzone";
            return "message-right";
        }
    }
})
