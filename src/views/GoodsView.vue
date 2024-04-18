<template>
    <div>
        <div class="search">
            <el-form :inline="true" :model="goodsList" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="searchData.title" placeholder="请输入关键字" clearable />
                </el-form-item>
                <el-form-item label="详情">
                    <el-input v-model="searchData.introduce" placeholder="请输入关键字" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="compList.compGoodsList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="title" label="名称" width="180" />
            <el-table-column prop="introduce" label="详情" />
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-size="searchData.pageSize" :total="searchData.count"
            @change="pageChange" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch, onMounted } from 'vue'
import { getGoodsList } from '@/request/api'
import { InitData } from '@/type/goods'

export default defineComponent({
    setup() {
        // 初始化数据
        const initData = reactive(new InitData())
        // 生命周期
        onMounted(() => {
            // 请求商品数据
            getGoods();
        })
        // 请求商品数据方法
        const getGoods = () => {
            getGoodsList().then((res) => {
                if (res.data.status === 200) {
                    // 将结果赋值给 原始数据rawGoods 和 展示数据goodsList
                    initData.rawGoods = res.data.data
                    initData.goodsList = res.data.data;
                    initData.searchData.count = res.data.data.length;
                } else {
                    console.log('获取数据失败')
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        // 计算属性包装分页数据
        const compList = reactive({
            compGoodsList: computed(() => {
                return initData.goodsList.slice(
                    (initData.searchData.page - 1) * initData.searchData.pageSize,
                    initData.searchData.page * initData.searchData.pageSize
                )
            })
        })
        // 切换页码事件
        const pageChange = (currentPage: number, pageSize: number) => {
            initData.searchData.page = currentPage;
            initData.searchData.pageSize = pageSize;
        }
        // 查询
        const search = () => {
            if (initData.searchData.title || initData.searchData.introduce) {
                if (initData.searchData.title) {
                    initData.searchedGoods = initData.goodsList.filter((good) => {
                        return good.title.includes(initData.searchData.title)
                    })
                }
                if (initData.searchData.introduce) {
                    initData.searchedGoods = initData.goodsList.filter((good) => {
                        return good.introduce.includes(initData.searchData.introduce)
                    })
                }
                // 将查询后的商品列表赋值给展示的商品列表 // 查询后的数据总数重新赋值
                initData.goodsList = initData.searchedGoods;
                initData.searchData.count = initData.searchedGoods.length;
            } else {
                return
            }
        };
        // 监听输入框的两个属性
        watch([() => initData.searchData.title, () => initData.searchData.introduce],
            ([newTitle, newInto], [oldTitle, olfTro]) => {
                if (!newTitle && !newInto) {
                    initData.goodsList = initData.rawGoods;
                    initData.searchData.count = initData.rawGoods.length;
                }
            })

        return { ...toRefs(initData), pageChange, compList, search }
    }
})
</script>

<style lang="scss" scoped>


.el-pagination {
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 20;
}
</style>