<template>
    <div>
        <!-- --------------表头查询-------------- -->
        <el-form :inline="true" :model="selectUserData" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="selectUserData.nickName" placeholder="请输入关键字" clearable />
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="selectUserData.role" style="width: 240px">
                    <el-option label="全部" :value="0" />
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                        :value="item.roleId" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- --------------表格展示-------------- -->
        <el-table :data="selectedUserData" border style="width: 100%">
            <el-table-column prop="id" label="Id" width="180" />
            <el-table-column prop="nickName" label="姓名" width="180" />
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-button link v-for="item in scope.row.role" :key="item.id">{{ item.roleName }}</el-button>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
                <template #default="scope">
                    <el-button link type="primary" @click="editUser(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- --------------对话框-------------- -->
        <el-dialog v-model="isShow" title="编辑信息" width="500">
            <el-form :model="editedUser" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="editedUser.nickName" />
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="editedUser.role" multiple placeholder="请选择角色" style="width: 240px">
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                            :value="item.roleId" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="isShow = false">取消</el-button>
                    <el-button type="primary" @click="updateUser">
                        更改
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUserList, getRoleList } from '@/request/api'
import { InitUserData } from '@/type/user'

export default defineComponent({
    setup() {
        // 实例化对象
        const initUserData = reactive(new InitUserData());
        // 声明周期
        onMounted(() => {
            getUser();  // 获取用户列表
            getRole();  // 获取角色列表
        })

        // 获取用户列表方法
        const getUser = () => {
            getUserList().then((res) => {
                if (res.data.status === 200) {
                    initUserData.userList = res.data.data;
                    initUserData.selectedUserData = res.data.data;
                } else {
                    console.log("获取用户列表失败")
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        // 获取角色列表方法
        const getRole = () => {
            getRoleList().then((res) => {
                if (res.data.status === 200) {
                    console.log('获取角色列表成功')
                    initUserData.roleList = res.data.data
                } else {
                    console.log("获取角色列表失败")
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        // 查询方法
        const onSubmit = () => {
            if (initUserData.selectUserData.nickName || initUserData.selectUserData.role) {
                if (initUserData.selectUserData.nickName) {
                    initUserData.selectedUserData = initUserData.userList.filter((user) => {
                        return user.nickName.includes(initUserData.selectUserData.nickName)
                    })
                }
                if (initUserData.selectUserData.role) {
                    initUserData.selectedUserData = initUserData.selectedUserData.filter((item) => {
                        return item.role.find((value) => value.role === initUserData.selectUserData.role)
                    })
                }
            } else {
                initUserData.selectedUserData = initUserData.userList;
            }
        };

        // 编辑用户信息方法
        const editUser = (row: any) => {
            initUserData.editedUser = {
                id: row.id,
                nickName: row.nickName,
                userName: row.userName,
                role: row.role.map((item: any) => item.role || item.roleId)
            }
            initUserData.isShow = true;
        }

        // 编辑 --> 更改用户信息方法
        const updateUser = () => {
            let obj: any = initUserData.selectedUserData.find((item) => item.id == initUserData.editedUser.id)
            obj.nickName = initUserData.editedUser.nickName;
            obj.role = initUserData.roleList.filter(item => initUserData.editedUser.role.includes(item.roleId));

            initUserData.selectedUserData.forEach((item, i) => {
                if (item.id == obj.id) {
                    initUserData.selectedUserData[i] = obj
                }
            })
            initUserData.isShow = false;
        }
        // 监听输入框的两个属性
        watch([() => initUserData.selectUserData.nickName, () => initUserData.selectUserData.role],
            ([newName, newRole], [oldName, oldRole]) => {
                if (newName === '' && newRole === 0) {
                    initUserData.selectedUserData = initUserData.userList;
                }
            })


        return { ...toRefs(initUserData), onSubmit, editUser, updateUser }
    }
})
</script>

<style scoped></style>