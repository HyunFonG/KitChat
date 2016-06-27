var KitChat;
(function (KitChat) {
    var Controllers;
    (function (Controllers) {
        var AppController = (function () {
            function AppController($scope, $location, GroupFactory) {
                this.scope = $scope;
                this.location = $location;
            }
            AppController.prototype.tabSwitch = function (tab) {
                console.log('SWITCH');
                switch (tab) {
                    case 'unjoinedGroup':
                        this.location.path('/');
                        break;
                    case 'joinedGroup':
                        this.location.path('/joined-group');
                        break;
                }
            };
            AppController.prototype.logout = function () {
                this.location.path('/logout');
            };
            return AppController;
        }());
        Controllers.AppController = AppController;
    })(Controllers = KitChat.Controllers || (KitChat.Controllers = {}));
})(KitChat || (KitChat = {}));
