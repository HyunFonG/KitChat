var Model;
(function (Model) {
    var Group = (function () {
        function Group(name) {
            this.name = name;
        }
        return Group;
    }());
    Model.Group = Group;
})(Model || (Model = {}));
