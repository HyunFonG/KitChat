module Model{

    import Group = Model.Group;

    export class UnjoinedGroup{

        lists: Group[];
        http: ng.IHttpService;

        constructor($http:ng.IHttpService){
            this.http = $http;
            this.lists = [];
            this.getUnjoinedGroup();
        }

        public getUnjoinedGroup(){
            this.http({
                method: 'GET',
                url: '/api/group'
            }).then(
                (result) => {
                    console.log('UnjoinedGroup : ',result);
                    this.decorateResponse(result.data);
                },
                (error) => {
                    console.log(error);
                }
            );
        }

        private decorateResponse(result:any){
            for(let i = 0 ; i < result.unjoinedgroup.length ; i++){
                let g = new Group(result.unjoinedgroup[i].name);
                this.lists.push(g);
            }
            console.log(this.lists);
        }
    }
}
