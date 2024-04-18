export interface RoleDataInt {
    roleId: number,
    roleName: string,
    authority:number[]
}

export class InitData {
    list:RoleDataInt[] = []
}