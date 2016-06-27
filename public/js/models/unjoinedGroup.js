var KitChat;
(function (KitChat) {
    var Model;
    (function (Model) {
        var Group = KitChat.Model.Group;
        var UnjoinedGroup = (function () {
            function UnjoinedGroup(groups) {
                this.lists = [];
                for (var i = 0; i < groups.length; i++) {
                    var g = new Group(groups[i].name);
                    this.lists.push(g);
                }
            }
            UnjoinedGroup.prototype.addGroup = function (name) {
                this.lists.push(new Group(name));
            };
            UnjoinedGroup.prototype.remove = function (idx) {
                this.lists.splice(idx, 1);
            };
            return UnjoinedGroup;
        }());
        Model.UnjoinedGroup = UnjoinedGroup;
    })(Model = KitChat.Model || (KitChat.Model = {}));
})(KitChat || (KitChat = {}));
