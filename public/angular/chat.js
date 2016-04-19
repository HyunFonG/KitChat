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

chat.run(function($rootScope,$http){
    var socket = io.connect();
    $http.get("/api/user")
    .success(function(data, status) {
        console.log("GET /API/USER");
        console.log(data);
        // console.log($rootScope.groups);
        $rootScope.username = data.username;
    });
    socket.on('newgroup',function(data){
        console.log("RECEIVE FROM BROADCAST");
        console.log(data);
        console.log($rootScope.username);
        if($rootScope.username != data.create_by){
            toastr["info"]("New group just created!")
            $rootScope.unjoinedgroups.push({"name":data.group});
            $rootScope.$apply();
        }
    });
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
    var socket = io.connect();
    $scope.createGroup = function(){
        console.log("HELLO");
        $http.post("/createGroup", {groupname:$scope.groupname})
        .success(function(data, status) {
            console.log("DATA");
            console.log(data);
            // console.log($rootScope.groups);
            $rootScope.unjoinedgroups.push({"name":$scope.groupname});
            $scope.dismiss();
            toastr["success"]($scope.groupname+" has been created!", "Group Created!");
            $rootScope.username = data.sender_username;
            socket.emit('newgroup',{"group":$scope.groupname,"sender_username":data.sender_username});
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
    var socket = io.connect();
    $scope.navigateBack = function(){
        console.log("I'am going back");
        socket.emit('unsubscribe',{"room":$routeParams.groupname});
        $location.path('/list');
    }

    $scope.roomTitle = " "+$routeParams.groupname;

    $http.post('/loadMessage',{groupname:$routeParams.groupname})
    .success(function(data,status){
        $scope.messagesList = data['message'];
        $scope.currentUser = data['cur_user'];
        console.log($scope.messagesList);
        $timeout(function(){
            var objDiv = document.getElementById("to-scroll");
            objDiv.scrollTop = objDiv.scrollHeight;
        },0,false);
        socket.emit('subscribe',{"room":$routeParams.groupname});
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

    $scope.sendMessage = function(){
        // console.log("TO SEND:"+$scope.messageToSend);
        // var io = require('socket.io');
        socket.emit('chat', {"username":$scope.currentUser,"message":$scope.messageToSend,"group":$routeParams.groupname});
        $scope.messageToSend = null;
    }
    socket.on('message', function (data) {
        console.log("RECEIVE FROM SOCKET");
        console.log(data);
        // console.log($scope.messagesList);
        $scope.messagesList.push({"username":data.username,"message":data.message,"create_at":data.create_at,"group":$routeParams.groupname});
        console.log("INSERT TO SCOPE");
        console.log($scope.messagesList);
        $scope.$apply();
        $timeout(function(){
            var objDiv = document.getElementById("to-scroll");
            objDiv.scrollTop = objDiv.scrollHeight;
        },0,false);
    });

})
