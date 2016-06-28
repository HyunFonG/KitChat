var KitChat;
(function (KitChat) {
    var Controllers;
    (function (Controllers) {
        var ChatRoomController = (function () {
            function ChatRoomController($scope, $http, $location, config, groupFactory) {
                this.scope = $scope;
                this.http = $http;
                this.location = $location;
                this.config = config;
                this.groupFactory = groupFactory;
                this.http({
                    method: 'POST',
                    url: this.config.getGroupMessageURL,
                    data: {
                        groupname: 
                    }
                });
            }
            return ChatRoomController;
        }());
        Controllers.ChatRoomController = ChatRoomController;
    })(Controllers = KitChat.Controllers || (KitChat.Controllers = {}));
})(KitChat || (KitChat = {}));
