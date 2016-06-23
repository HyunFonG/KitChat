module KitChat.Controllers {

    import Group = Model.Group;

    export class GroupController {
        scope: any;
        http: ng.IHttpService;
        groups: Group[];
        constructor($scope: ng.IScope,$http: ng.IHttpService) {
            this.scope = $scope;
            this.http = $http;
            console.log(this.http);
            this.groups = [];new Group('Hello');
            this.initGroup();
        }

        private initGroup(){
            // TODO CALL API
            console.log(this.http);
            this.http({
                method: 'GET',
                url: '/api/user'
            }).then(
                function(result){
                    console.log('Result: ',result);
                },
                function(error){
                    console.log('Error: ',error);
                }
            )

        }

    }
}
