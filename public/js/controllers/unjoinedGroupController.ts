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

        public createGroup(){
            let payload = {
                groupname: this.scope['newGroupName']
            };
            this.http({
                method: 'POST',
                data: payload,
                url: '/api/group/create'
            }).then(
                (result) => {
                    console.log(result);
                    this.unjoinedGroups.addGroup(this.scope['newGroupName']);
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
                url: '/api/group/join'
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
