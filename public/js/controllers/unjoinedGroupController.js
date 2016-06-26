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
            UnjoinedGroupController.prototype.createGroup = function () {
                var _this = this;
                var payload = {
                    groupname: this.scope['newGroupName']
                };
                this.http({
                    method: 'POST',
                    data: payload,
                    url: '/api/group/create'
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
                    url: '/api/group/join'
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
