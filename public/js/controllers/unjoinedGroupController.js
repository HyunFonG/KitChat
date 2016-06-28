var KitChat;
(function (KitChat) {
    var Controllers;
    (function (Controllers) {
        var UnjoinedGroupController = (function () {
            function UnjoinedGroupController($scope, $http, config, groupFactory) {
                var _this = this;
                this.scope = $scope;
                this.http = $http;
                this.config = config;
                this.groupFactory = groupFactory;
                groupFactory.getUnjoinedGroup().then(function (result) {
                    console.log(result);
                    _this.scope.unjoinedGroups = _this.groupFactory.unjoinedGroup;
                }, function (error) {
                    console.log(error);
                });
            }
            UnjoinedGroupController.prototype.createGroup = function () {
                var _this = this;
                var payload = {
                    groupname: this.scope['newGroupName']
                };
                this.http({
                    method: 'POST',
                    data: payload,
                    url: this.config.createGroupURL
                }).then(function (result) {
                    console.log(result);
                    _this.groupFactory.addUnjoinedGroup(_this.scope['newGroupName']);
                }, function (error) {
                    console.log(error);
                });
            };
            UnjoinedGroupController.prototype.joinGroup = function (name, idx) {
                var _this = this;
                console.log('prepare to join');
                var payload = {
                    group: name
                };
                this.http({
                    method: 'POST',
                    data: payload,
                    url: this.config.joinGroupURL
                }).then(function (result) {
                    console.log("JOINED");
                    console.log(result);
                    _this.groupFactory.removeUnjoinedGroup(idx);
                }, function (error) {
                    console.log(error);
                });
            };
            return UnjoinedGroupController;
        }());
        Controllers.UnjoinedGroupController = UnjoinedGroupController;
    })(Controllers = KitChat.Controllers || (KitChat.Controllers = {}));
})(KitChat || (KitChat = {}));
