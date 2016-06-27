var KitChat;
(function (KitChat) {
    var Factory;
    (function (Factory) {
        var Group = KitChat.Model.Group;
        var GroupFactory = (function () {
            function GroupFactory($http, $q, config) {
                this.http = $http;
                this.q = $q;
                this.config = config;
                this.joinedGroup = [];
                this.unjoinedGroup = [];
                this.requestGroupData();
            }
            GroupFactory.prototype.requestGroupData = function () {
                var _this = this;
                this.http({
                    method: 'GET',
                    url: this.config.getGroupURL
                }).then(function (result) {
                    console.log(result);
                    _this.setJoinedData(result.data);
                    _this.setUnjoinedData(result.data);
                    console.log('FROM FACTORY ', _this.joinedGroup, _this.unjoinedGroup);
                }, function (error) {
                    console.log(error);
                });
            };
            GroupFactory.prototype.setJoinedData = function (data) {
                for (var i = 0; i < data.joinedgroup.length; i++) {
                    var g = new Group(data.joinedgroup[i].group);
                    this.joinedGroup.push(g);
                }
            };
            GroupFactory.prototype.setUnjoinedData = function (data) {
                for (var i = 0; i < data.unjoinedgroup.length; i++) {
                    var g = new Group(data.unjoinedgroup[i].name);
                    this.unjoinedGroup.push(g);
                }
            };
            GroupFactory.prototype.getJoinedGroup = function () {
                var deferred = this.q.defer();
                deferred.resolve(this.joinedGroup);
                return deferred.promise;
            };
            GroupFactory.prototype.getUnjoinedGroup = function () {
                var deferred = this.q.defer();
                deferred.resolve(this.unjoinedGroup);
                return deferred.promise;
            };
            return GroupFactory;
        }());
        Factory.GroupFactory = GroupFactory;
    })(Factory = KitChat.Factory || (KitChat.Factory = {}));
})(KitChat || (KitChat = {}));
