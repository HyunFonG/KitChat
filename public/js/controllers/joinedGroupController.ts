module KitChat.Controllers{

    export class JoinedGroupController{
        scope: ng.IScope;
        http: ng.IHttpService;
        location: ng.ILocationService;
        config: Config;
        groupFactory: KitChat.Factory.GroupFactory;

        constructor($scope: ng.IScope,$http: ng.IHttpService,$location: ng.ILocationService,config:Config,groupFactory: KitChat.Factory.GroupFactory){
            this.scope = $scope;
            this.http = $http;
            this.location = $location;
            this.config = config;
            this.groupFactory = groupFactory;

            groupFactory.getJoinedGroup().then(
                (result) => {
                    this.scope.joinedGroups = this.groupFactory.joinedGroup;
                },
                (error) => {
                    console.log(error);
                }
            );
        }

        public navigateToChatRoom(url: string,idx: number){
            this.location.path(url);
        }
    }
}
