var chat = angular.module('chat',[]);

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
chat.controller('addGroupCtrl',function($scope,$rootScope,$http){
    $scope.createGroup = function(){
        console.log("HELLO");
        $http.post("/createGroup", {groupname:$scope.groupname})
        .success(function(data, status) {
            console.log($rootScope.groups);
            $rootScope.groups.push({"name":$scope.groupname});
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

    $rootScope.twoLetterGroupName = function(group){
        return group.substring(0,2);
    }
    $scope.groupnameToDisplay = function(group){
        return group.substring(0,10) + "...";
    }

    $scope.joinGroup = function(groupname){
        console.log(groupname);
        //TODO POST TO ROUTE
    }

});

chat.controller('messageListCtrl',function($scope,$rootScope){

});
