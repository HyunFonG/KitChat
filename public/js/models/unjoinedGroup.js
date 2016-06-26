var Model;
(function (Model) {
    var Group = Model.Group;
    var UnjoinedGroup = (function () {
        function UnjoinedGroup($http) {
            this.http = $http;
            this.lists = [];
            this.getUnjoinedGroup();
        }
        UnjoinedGroup.prototype.getUnjoinedGroup = function () {
            var _this = this;
            this.http({
                method: 'GET',
                url: '/api/group'
            }).then(function (result) {
                console.log('UnjoinedGroup : ', result);
                _this.decorateResponse(result.data);
            }, function (error) {
                console.log(error);
            });
        };
        UnjoinedGroup.prototype.decorateResponse = function (result) {
            for (var i = 0; i < result.unjoinedgroup.length; i++) {
                var g = new Group(result.unjoinedgroup[i].name);
                this.lists.push(g);
            }
            console.log(this.lists);
        };
        return UnjoinedGroup;
    }());
    Model.UnjoinedGroup = UnjoinedGroup;
})(Model || (Model = {}));
