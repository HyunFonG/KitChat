module KitChat.Controllers {

    import UnjoinedGroup = Model.UnjoinedGroup;

    export class UnjoinedGroupController {
        scope: ng.IScope;
        http: ng.IHttpService;
        unjoinedGroups: UnjoinedGroup;
        config: Config;

        constructor($scope: ng.IScope,$http: ng.IHttpService,config:Config) {
            this.scope = $scope;
            this.http = $http;
            this.unjoinedGroups = new UnjoinedGroup(this.http);
            this.config = config;
        }

        public createGroup(){
            let payload = {
                groupname: this.scope['newGroupName']
            };
            this.http({
                method: 'POST',
                data: payload,
                url: this.config.createGroupURL
            }).then(
                (result) => {
                    console.log(result);
                    this.unjoinedGroups.addGroup(this.scope['newGroupName']);
                    this.scope.dismiss();
                },
                (error) => {
                    console.log(error);
                }
            );
        }

        public joinGroup(name: string,idx: number){
            let payload = {
                group: name
            }
            this.http({
                method: 'POST',
                data: payload,
                url: this.config.joinGroupURL
            }).then(
                (result) => {
                    console.log(result);
                    this.unjoinedGroups.remove(idx);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
}
