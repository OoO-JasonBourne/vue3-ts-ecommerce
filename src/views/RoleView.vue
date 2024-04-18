<template>
    <div>
        <!-- --------------表头添加-------------- -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary"  @click="addRole">添加角色</el-button>
            </el-form-item>
        </el-form>
        <!-- --------------表格展示-------------- -->
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="roleId" label="Id" width="180" />
            <el-table-column prop="roleName" label="角色名" width="180" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link size="small" @click="changeRole(scope.row)">修改权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getRoleList } from '@/request/api'
import { InitData } from '@/type/role'
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'




export default defineComponent({
    setup() {
        // 实例化数据
        const data = reactive(new InitData);
        // 实例化路由
        const router = useRouter();
        // 生命周期
        onMounted(() => {
            getRole()
        })
        // 获取角色列表方法
        const getRole = () => {
            getRoleList().then((res) => {
                if (res.data.status === 200) {
                    data.list = res.data.data;
                    console.log(res.data.data);
                } else {
                    console.log('获取角色列表信息失败')
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        // 添加角色方法
        const addRole = () => {
            ElMessageBox.prompt('添加角色', '请输入角色', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {
                    if(value){
                        data.list.push({
                            "roleId": data.list.length + 1,
                            "roleName": value,
                            "authority": []
                        })
                    }
                    ElMessage({
                        type: 'success',
                        message: `${value} 角色已添加`,
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '已取消',
                    })
                })
        }
        // 修改角色权限信息方法
        const changeRole = (row: any) => {
            console.log(row)
            router.push({
                name: 'authority',
                query: {
                    id: row.roleId,
                    authority: row.authority
                }
            })

        }


        return { ...toRefs(data), addRole, changeRole }
    }
})

</script>

<style lang="scss" scoped>

</style>