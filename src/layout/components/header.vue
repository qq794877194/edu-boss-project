<template>
  <div class="header m-list list-justify">
    <el-breadcrumb>
      <el-breadcrumb-item  v-for="item in $route.meta.routes" :key="item.name" :to="item.path">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="m-list">
        <el-avatar shape="circle" :size="30" :src="userInfo.portrait || require('@/assets/default-avatar.png')"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">{{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" divided @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getUserInfo } from '@/api/user';

export default Vue.extend({
  name: 'appHeader',
  data () {
    return {
      userInfo: {}
    };
  },
  created () {
    this.loadUserInfo();
  },
  methods: {
    async loadUserInfo () {
      const { data: { content } } = await getUserInfo();
      this.userInfo = content;
    },
    logout () {
      this.$store.commit('setUser', null);
      this.$router.push('/login');
      this.$message.success('退出成功');
    }
  }
});
</script>

<style lang="scss" scoped>
.header{
  height: 100%;
  width: 100%;
}
</style>
