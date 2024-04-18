export interface goodsInt {
    userId: number,
    id: number,
    title: string,
    introduce: string
}
interface searchDataInt {
    title: string,
    introduce: string,
    page: number, // 页数
    count: number, // 总条数
    pageSize: number    // 每页条数
}


export class InitData {
    // 搜索数据
    searchData: searchDataInt = {
        title: '',
        introduce: '',
        page: 1,
        count: 0,
        pageSize: 10
    }
    // 原始商品数据
    rawGoods:goodsInt[] = []
    // 展示的商品数据
    goodsList: goodsInt[] = []
    // 定义数组，展示查询过后需要展示的数据
    searchedGoods:goodsInt[] = []
}