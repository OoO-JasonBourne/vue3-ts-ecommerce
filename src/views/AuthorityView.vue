<template>
    <div>
        <el-tree ref="treeRef" style="max-width: 600px" :data="list" show-checkbox :check-strictly="true"
            :default-checked-keys="authority" :props="{
            children: 'roleList',
            label: 'name'
        }" />
        <el-button type="primary" @click="changeAuthority">确认修改</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getAuthorityList } from '@/request/api'
import { InitData } from '@/type/authority'
import { useRoute } from 'vue-router'

export default defineComponent({
    setup() {
        // 路由传参
        const router = useRoute();
        // 实例化数据
        const data = reactive(new InitData(
            Number(router.query.id), router.query.authority &&
            (Array.isArray(router.query.authority)
                ? router.query.authority.map((item) => Number(item))
                : [Number(router.query.authority)]) ||
        [])
        )
        // 生命周期
        onMounted(() => {
            getAuthority()
        })
        // 获取权限列表方法
        const getAuthority = () => {
            getAuthorityList().then((res) => {
                if (res.data.status === 200) {
                    console.log('请求', res)
                    data.list = res.data.data
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        // 修改权限方法
        const changeAuthority = () => {
            console.log(data.treeRef.getCheckedKeys())
        }



        return { ...toRefs(data), changeAuthority }
    }
})
</script>

<style scoped></style>