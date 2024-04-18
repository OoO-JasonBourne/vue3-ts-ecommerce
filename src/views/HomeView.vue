<template>
  <div class="home">
    <el-container>
      <!-- -----------------header----------------- -->
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="../assets/logo.png" alt="">
          </el-col>
          <el-col :span="16">
            <h2>电商后台管理系统</h2>
          </el-col>
          <el-col :span="4" class="quit-login">
            <el-button  @click="quitLogin">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <!-- -----------------Aside----------------- -->
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" :default-active="active"
            router>
            <!-- router 开启路由模式 -->
            <el-menu-item :index="need.path" v-for="need in needList" :key="need.path">
              <span>{{ need.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- -----------------main----------------- -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'HomeView',
  setup() {
    // 当前路由信息
    const route = useRoute();
    // 需要展示的路由列表
    const router = useRouter();
    const needList = router.getRoutes().filter(r => {
      return r.meta && r.meta.isShow
    })

    // 退出登录方法 --> 清除token + 跳转
    const quitLogin = () => {
      localStorage.removeItem("token");
      router.push("/login")
    }

    return {
      needList,
      active: route.path,
      quitLogin
    }
  },
  components: {

  },
});
</script>

<style lang="scss" scoped>
.el-header {
  height: 80px;
  background-color: rgb(49, 47, 44);
  text-align: center;
  position: relative;

  img {
    height: 60px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  h2,
  .quit-login {
    height: 80px;
    line-height: 80px;
    color: #FFF;
  }
  
}

.el-container {
  .el-aside {
    height: calc(100vh - 80px);
    background-color: #545c64;
  }
}
</style>