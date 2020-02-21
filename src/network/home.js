import {request} from "./request"

//home页面的所有接口都在这个js文件中，一个接口一个方法

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,page
        }
    })
}