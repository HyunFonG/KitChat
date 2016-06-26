var KitChat;
(function (KitChat) {
    var Controllers;
    (function (Controllers) {
        var UnjoinedGroup = Model.UnjoinedGroup;
        var UnjoinedGroupController = (function () {
            function UnjoinedGroupController($scope, $http) {
                this.scope = $scope;
                this.http = $http;
                this.unjoinedGroups = new UnjoinedGroup(this.http);
            }
            return UnjoinedGroupController;
        }());
        Controllers.UnjoinedGroupController = UnjoinedGroupController;
    })(Controllers = KitChat.Controllers || (KitChat.Controllers = {}));
})(KitChat || (KitChat = {}));
