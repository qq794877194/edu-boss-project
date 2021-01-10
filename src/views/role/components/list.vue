<template>
  <div class="role-list">
    <el-card>
      <div slot="header" class="m-list list-justify">
        <div class="m-list">
          <el-input v-model="roleName" placeholder="角色名称" class="mr15" clearable @clear="loadAllRoles"></el-input>
          <el-button type="primary" @click="loadAllRoles">查询</el-button>
        </div>
        <el-button @click="handleAdd">添加角色</el-button>
      </div>
      <el-table :data="roleList" style="width: 100%">
        <el-table-column :prop="item.prop" :width="item.width" :label="item.label" :key="item.label" v-for="item in column" />
        <el-table-column label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <el-link type="success" @click="$router.push({name: 'allocation-menu', params: {roleId: scope.row.id}})" class="mr15">分配菜单</el-link>
            <el-link type="success" @click="$router.push({name: 'allocation-source', params: {roleId: scope.row.id}})">分配资源</el-link>
            <br>
            <el-link type="primary" @click="handleEdit(scope.row)" class="mr15">编辑</el-link>
            <el-link type="danger" @click="handleDel(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :visible="dialogSwitch"
      :title="roleId ? '编辑角色' : '添加角色'"
      @close="dialogClose"
      width="30%"
    >
      <createOrEdit
        :roleId="roleId"
        v-if="dialogSwitch"
        @dialogClose="dialogClose"
        @editSuccess="editSuccess" />
    </el-dialog>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import { getRolePages, deleteRole } from '@/api/role';
import createOrEdit from './createOrEdit.vue';
const column = [
  { label: '角色名称', prop: 'name' },
  { label: '描述', prop: 'description' },
  { label: '创建日期', prop: 'createdTime' }
];
export default Vue.extend({
  name: 'roleList',
  data () {
    return {
      column,
      roleName: '',
      roleList: [],
      dialogSwitch: false,
      roleId: null
    };
  },
  created () {
    this.loadAllRoles();
  },
  methods: {
    async loadAllRoles () {
      const { data } = await getRolePages({
        name: this.roleName,
        size: 999
      });
      if (data.code === '000000') {
        data.data.records.forEach((item: any) => {
          item.createdTime = this.$formatDate(item.createdTime);
        });
        this.roleList = data.data.records;
      }
    },
    handleAdd () {
      this.roleId = null;
      this.dialogSwitch = true;
    },
    handleEdit (role: any) {
      console.log(role);
      this.roleId = role.id;
      this.dialogSwitch = true;
    },
    handleDel (item: any) {
      this.$delConfirm(item.name, () => {
        return deleteRole(item.id);
      }).then(() => {
        this.loadAllRoles();
      });
    },
    dialogClose () {
      this.dialogSwitch = false;
      this.roleId = null;
    },
    editSuccess () {
      this.dialogSwitch = false;
      this.roleId = null;
      this.loadAllRoles();
    }
  },
  components: {
    createOrEdit
  }
});
</script>

<style scoped>

</style>
