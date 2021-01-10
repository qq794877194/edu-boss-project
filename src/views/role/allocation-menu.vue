<template>
  <el-card class="allocation-menu">
    <div slot="header">
      <span class="mr15">分配菜单</span>
      <el-link type="primary" @click="$router.back()">
        <i class="el-icon-back"></i>
        返回
      </el-link>
    </div>
    <el-tree
      :props="defaultProps"
      :data="menus"
      ref="menu-tree"
      node-key="id"
      show-checkbox
      :default-checked-keys="checkedKeys"
      :default-expand-all="true"
    >
    </el-tree>
    <div class="m-list list-center" style="margin-top: 30px">
      <el-button type="primary" class="mr15" @click="onSave">保存</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tree } from 'element-ui';
import { genMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/api/menu';
export default Vue.extend({
  name: 'allocation-menu',
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      checkedKeys: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    };
  },
  created () {
    this.loadMenus();
    this.loadRoleMenus();
  },
  methods: {
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId);
      this.getCheckedKeys(data.data);
    },
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id as never];
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList);
        }
      });
    },
    async loadMenus () {
      const { data } = await genMenuNodeList();
      this.menus = data.data;
    },
    onSave () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys();
      if (!menuIdList.length) {
        this.$message.warning('请选择要分配的菜单');
        return;
      }
      allocateRoleMenus({ roleId: this.roleId, menuIdList })
        .then(res => {
          this.$message.success('菜单分配成功');
          this.$router.back();
        }).catch(err => {
          this.$message.error('菜单分配失败');
        });
    },
    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([]);
    }
  }
});
</script>

<style scoped>

</style>
