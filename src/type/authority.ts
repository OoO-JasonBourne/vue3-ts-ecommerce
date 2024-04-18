export interface ListInt {
    name: string,
    roleId: number,
    viewRole?: string,
    roleList?: ListInt[]
}

export class InitData{
    id: number
    authority: number[]
    constructor(id:number, authority: number[]){
        this.id = id;
        this.authority = authority;
    } 
    list:ListInt[] = []
    treeRef:any
}