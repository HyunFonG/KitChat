module KitChat.Controllers {

    import UnjoinedGroup = Model.UnjoinedGroup;

    export class UnjoinedGroupController {
        scope: ng.IScope;
        http: ng.IHttpService;
        unjoinedGroups: UnjoinedGroup;

        constructor($scope: ng.IScope,$http: ng.IHttpService) {
            this.scope = $scope;
            this.http = $http;
            this.unjoinedGroups = new UnjoinedGroup(this.http);
        }

    }
}
