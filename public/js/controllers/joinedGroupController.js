var KitChat;
(function (KitChat) {
    var Controllers;
    (function (Controllers) {
        var JoinedGroupController = (function () {
            function JoinedGroupController($scope, $http, $location, config, groupFactory) {
                var _this = this;
                this.scope = $scope;
                this.http = $http;
                this.location = $location;
                this.config = config;
                this.groupFactory = groupFactory;
                groupFactory.getJoinedGroup().then(function (result) {
                    _this.scope.joinedGroups = _this.groupFactory.joinedGroup;
                }, function (error) {
                    console.log(error);
                });
            }
            JoinedGroupController.prototype.navigateToChatRoom = function (url, idx) {
                this.location.path(url);
            };
            return JoinedGroupController;
        }());
        Controllers.JoinedGroupController = JoinedGroupController;
    })(Controllers = KitChat.Controllers || (KitChat.Controllers = {}));
})(KitChat || (KitChat = {}));
