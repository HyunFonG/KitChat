var KitChat;
(function (KitChat) {
    var Controllers;
    (function (Controllers) {
        var Group = Model.Group;
        var GroupController = (function () {
            function GroupController($scope, $http) {
                this.scope = $scope;
                this.http = $http;
                console.log(this.http);
                this.groups = [];
                new Group('Hello');
                this.initGroup();
            }
            GroupController.prototype.initGroup = function () {
                console.log(this.http);
                this.http({
                    method: 'GET',
                    url: '/api/user'
                }).then(function (result) {
                    console.log('Result: ', result);
                }, function (error) {
                    console.log('Error: ', error);
                });
            };
            return GroupController;
        }());
        Controllers.GroupController = GroupController;
    })(Controllers = KitChat.Controllers || (KitChat.Controllers = {}));
})(KitChat || (KitChat = {}));
