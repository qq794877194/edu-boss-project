<template>
  <el-card class="box-card">
    <div slot="header">
      <el-button @click="$router.push({name: 'menu-create'})">添加菜单</el-button>
    </div>
    <el-table :data="menuList" style="width: 100%">
      <el-table-column :prop="item.prop" :width="item.width" :label="item.label" :key="item.label" v-for="item in column" />
      <el-table-column width="120px">
        <template slot-scope="scope">
          <el-link type="primary" @click="handleEdit(scope.row)" class="mr15">编辑</el-link>
          <el-link type="danger" @click="handleDel(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { getAllMenu, deleteMenu } from '@/api/menu';

const column = [
  { label: '菜单名称', prop: 'name', width: 150 },
  { label: '菜单级数', prop: 'level', width: 80 },
  { label: '菜单路径', prop: 'href', width: 150 },
  { label: '菜单图标', prop: 'icon', width: 150 },
  { label: '排序', prop: 'orderNum', width: 50 },
  { label: '描述', prop: 'description', width: null },
  { label: '是否展示', prop: 'showText', width: 80 },
  { label: '创建日期', prop: 'createdTime', width: 200 }
];
export default Vue.extend({
  name: 'menuList',
  data () {
    return {
      column,
      menuList: []
    };
  },
  created () {
    this.loadAllMenus();
  },
  methods: {
    async loadAllMenus () {
      const { data } = await getAllMenu();
      if (data.code === '000000') {
        data.data.forEach((item: any) => {
          item.createdTime = this.$formatDate(item.createdTime);
          item.showText = item.shown ? '是' : '否';
        });
        this.menuList = data.data;
      }
    },
    handleEdit (item: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      });
    },
    handleDel (item: any) {
      this.$delConfirm(item.name, () => {
        return deleteMenu(item.id);
      }).then(() => {
        this.loadAllMenus();
      });
    }
  }
});
</script>

<style scoped>

</style>
