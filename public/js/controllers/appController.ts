module KitChat.Controllers {

    export class AppController {
        scope: ng.IScope;
        location: ng.ILocationService;
        window: ng.IWindowService;

        constructor($scope: ng.IScope,$location: ng.ILocationService,GroupFactory: KitChat.Factory.GroupFactory) {
            this.scope = $scope;
            this.location = $location;
        }

        private tabSwitch(tab:string){
            console.log('SWITCH');
            switch(tab){
                case 'unjoinedGroup':
                    this.location.path('/');
                    break;
                case 'joinedGroup':
                    this.location.path('/joined-group');
                    break;
            }
        }

        private logout(){
            this.location.path('/logout');
        }

    }
}
