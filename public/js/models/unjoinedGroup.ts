module KitChat.Model{

    import Group = KitChat.Model.Group;

    export class UnjoinedGroup{

        lists: Group[];

        constructor(groups: any){
            this.lists = [];
            for(let i = 0 ; i < groups.length ; i++){
                let g = new Group(groups[i].name);
                this.lists.push(g);
            }
        }

        public addGroup(name: string){
            this.lists.push(new Group(name));
        }

        public remove(idx: number){
            this.lists.splice(idx,1);
        }

    }
}
