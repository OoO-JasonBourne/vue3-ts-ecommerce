import instance from './index'
import { LoginFormInt } from "@/type/login"

export function login(data: LoginFormInt) {
    return instance({
        url: "/login",
        method: "POST",
        data
    })
}

export function getGoodsList() {
    return instance({
        url: "/getGoodsList",
        method: "GET"
    })
}

export function getUserList(){
    return instance({
        url: "/getUserList",
        method: "GET"
    })
}

export function getRoleList(){
    return instance({
        url: "/getRoleList",
        method: "GET"
    })
}


export function getAuthorityList(){
    return instance({
        url: "/getAuthorityList",
        method: "GET"
    })
}