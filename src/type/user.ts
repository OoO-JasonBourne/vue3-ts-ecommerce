export interface UserListInt {
    id: number,
    userName: string,
    nickName: string,
    role: InRoleListInt[]
}
interface InRoleListInt {
    role: number,
    roleName: string
}
interface selectUserInt {
    role: number,
    nickName: string
}
interface OutRoleListInt {
    roleId: number,
    roleName: "",
    authority: number[]
}
interface editUserInt {
    id: number,
    userName: string,
    nickName: string,
    role: number[]
}

export class InitUserData {
    userList: UserListInt[] = [];   // 接收用户信息列表
    // 筛选键入的用户信息列表
    selectUserData: selectUserInt = {
        role: 0,
        nickName: ""
    }
    selectedUserData: UserListInt[] = []    // 筛选后的用户信息列表
    roleList: OutRoleListInt[] = [] // 接收角色信息列表
    isShow = false  // “编辑”弹出框默认 false
    editedUser:editUserInt = { // 选中“编辑”的信息
        id: 0,
        userName: '',
        nickName: '',
        role: []
    } 
}
