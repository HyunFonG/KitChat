module KitChat.Controllers{

    export class ChatRoomController{
        scope: ng.IScope;
        http: ng.IHttpService;
        location: ng.ILocationService;
        // routeParams: ng.I
        config: Config;
        groupFactory: KitChat.Factory.GroupFactory;

        constructor($scope: ng.IScope,$http: ng.IHttpService,$location: ng.ILocationService,config:Config,groupFactory: KitChat.Factory.GroupFactory){
            this.scope = $scope;
            this.http = $http;
            this.location = $location;
            this.config = config;
            this.groupFactory = groupFactory;
            this.http({
                method: 'POST',
                url: this.config.getGroupMessageURL,
                data: {
                    groupname:
                }
            })
        }

    }
}
