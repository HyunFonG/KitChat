var KitChat;
(function (KitChat) {
    var Controllers;
    (function (Controllers) {
        var UnjoinedGroup = KitChat.Model.UnjoinedGroup;
        var UnjoinedGroupController = (function () {
            function UnjoinedGroupController($scope, $http, config, groupFactory) {
                var _this = this;
                this.scope = $scope;
                this.http = $http;
                this.config = config;
                groupFactory.getUnjoinedGroup().then(function (result) {
                    console.log(result);
                    _this.unjoinedGroups = new UnjoinedGroup(result);
                    console.log('UNJCTRL:', _this.unjoinedGroups);
                }, function (error) {
                    console.log('error');
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
                    _this.unjoinedGroups.addGroup(_this.scope['newGroupName']);
                }, function (error) {
                    console.log(error);
                });
            };
            UnjoinedGroupController.prototype.joinGroup = function (name, idx) {
                var _this = this;
                var payload = {
                    group: name
                };
                this.http({
                    method: 'POST',
                    data: payload,
                    url: this.config.joinGroupURL
                }).then(function (result) {
                    console.log(result);
                    _this.unjoinedGroups.remove(idx);
                }, function (error) {
                    console.log(error);
                });
            };
            return UnjoinedGroupController;
        }());
        Controllers.UnjoinedGroupController = UnjoinedGroupController;
    })(Controllers = KitChat.Controllers || (KitChat.Controllers = {}));
})(KitChat || (KitChat = {}));
