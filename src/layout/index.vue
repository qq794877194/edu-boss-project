<template>
  <el-container>
    <el-aside width="200px">
      <AppAside></AppAside>
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader></AppHeader>
      </el-header>
      <el-main>
        <!--子路由出口-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import AppAside from './components/aside.vue';
import AppHeader from './components/header.vue';

export default Vue.extend({
  name: 'index',
  components: {
    AppAside,
    AppHeader
  }
});
</script>

<style scoped>
.el-container{
  min-height: 100vh;
  min-width: 980px;
}
  .el-header{
    background: white;
    display: flex;
    align-items: center;
  }
</style>
