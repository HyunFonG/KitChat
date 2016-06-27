module KitChat.Controllers {

    import Group = KitChat.Model.Group;
    import UnjoinedGroup = KitChat.Model.UnjoinedGroup;

    export class UnjoinedGroupController {
        scope: ng.IScope;
        http: ng.IHttpService;
        unjoinedGroups: UnjoinedGroup;
        config: Config;

        constructor($scope: ng.IScope,$http: ng.IHttpService,config:Config,groupFactory: KitChat.Factory.GroupFactory) {
            this.scope = $scope;
            this.http = $http;
            this.config = config;

            groupFactory.getUnjoinedGroup().then(
                (result) => {
                    console.log(result);
                    this.unjoinedGroups = new UnjoinedGroup(result);
                    console.log('UNJCTRL:',this.unjoinedGroups);
                },
                (error) => {
                    console.log('error');
                    console.log(error);
                }
            );
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
                    this.unjoinedGroups.addGroup(this.scope['newGroupName']); //TODO -> MAKE CONSTRUCTOR
                    // this.unjoinedGroups.push(new Group(this.scope['newGroupName']));
                    // this.scope.dismiss();
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
