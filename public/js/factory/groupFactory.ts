module KitChat.Factory{

    import Group = KitChat.Model.Group;

    export class GroupFactory{

        http: ng.IHttpService;
        q: ng.IQService;
        config: any;
        joinedGroup: Group[];
        unjoinedGroup: Group[];

        constructor($http: ng.IHttpService, $q: ng.IQService, config: any){
            this.http = $http;
            this.q = $q;
            this.config = config;
            this.joinedGroup = [];
            this.unjoinedGroup = [];
            this.requestGroupData();
        }

        private requestGroupData(){
            this.http({
                method: 'GET',
                url: this.config.getGroupURL
            }).then(
                (result) => {
                    console.log(result);
                    this.setJoinedData(result.data);
                    this.setUnjoinedData(result.data);
                    console.log('FROM FACTORY ',this.joinedGroup,this.unjoinedGroup);
                },
                (error) => {
                    console.log(error);
                }
            )
        }

        private setJoinedData(data: any){
            for(let i = 0; i < data.joinedgroup.length; i++){
                let g = new Group(data.joinedgroup[i].group);
                this.joinedGroup.push(g);
            }
        }

        private setUnjoinedData(data: any){
            for(let i = 0; i < data.unjoinedgroup.length; i++){
                let g = new Group(data.unjoinedgroup[i].name);
                this.unjoinedGroup.push(g);
            }
        }

        public getJoinedGroup(){
            var deferred = this.q.defer();
            deferred.resolve(this.joinedGroup);
            return deferred.promise;
        }

        public addJoinedGroup(name: string){
            this.joinedGroup.push(new Group(name));
        }

        public getUnjoinedGroup(){
            var deferred = this.q.defer();
            deferred.resolve(this.unjoinedGroup);
            return deferred.promise;
        }

        public addUnjoinedGroup(name: string){
            this.unjoinedGroup.push(new Group(name));
        }

        public removeUnjoinedGroup(idx: number){
            console.log(idx);
            this.unjoinedGroup.splice(idx,1);
        }
    }
}
