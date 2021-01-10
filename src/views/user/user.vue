<template>
  <div class="user">
    <el-card>
      <div slot="header">
        <el-form label-width="70px" :model="form" ref="form" :inline="true">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="time">
            <el-date-picker
              clearable
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="form.time"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchUsers" :loading="loading">查询</el-button>
            <el-button @click="reset" :disabled="loading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="users" class="mb30"  v-loading="loading">
        <el-table-column v-for="item in column" :label="item.label" :prop="item.prop" :key="item.prop" />
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-link type="primary" @click="openAssignRole(scope.row)">分配角色</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :disabled="loading"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-dialog
      title="分配角色"
      :visible="roleSwitch"
      width="50%"
      v-if="roleSwitch"
      @close="closeAssignRole"
    >
      <el-select v-model="roleIdList" multiple placeholder="请选择角色" class="w100">
        <el-option v-for="role in roles" :label="role.name" :value="role.id" :key="role.id"></el-option>
      </el-select>
      <span slot="footer">
        <el-button type="primary" class="mr15" @click="AssignRole">确定</el-button>
        <el-button @click="closeAssignRole">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getUserPages } from '@/api/user';
import { getAllRole, allocateUserRoles, getUserRoles } from '@/api/role';

const column = [
  { label: '编号', prop: 'id' },
  { label: '用户名', prop: 'name' },
  { label: '手机号', prop: 'phone' },
  { label: '注册时间', prop: 'createTime' }
];
export default Vue.extend({
  name: 'user',
  data () {
    return {
      column,
      form: {
        phone: '',
        time: [],
        currentPage: 1,
        pageSize: 10
      },
      loading: false,
      userId: null,
      users: [],
      total: 0,
      roleSwitch: false,
      roleIdList: [],
      roles: []
    };
  },
  created () {
    this.loadUsers();
    this.loadRoles();
  },
  methods: {
    async loadRoles () {
      const { data } = await getAllRole();
      this.roles = data.data;
    },
    async loadRolesWithUser () {
      const { data } = await getUserRoles(this.userId);
      this.roleIdList = data.data.map((item: any) => item.id);
    },
    async loadUsers () {
      const options: {[key: string]: any} = Object.assign({}, this.form);
      const [startCreateTime, endCreateTime] = options.time;
      options.startCreateTime = startCreateTime;
      options.endCreateTime = endCreateTime;
      const { data } = await getUserPages(options);
      this.users = data.data.records.map((item: any) => {
        item.createTime = this.$formatDate(item.createTime);
        return item;
      });
      this.total = data.data.total;
    },
    searchUsers () {
      this.form.currentPage = 1;
      this.loadUsers();
    },
    reset () {
      (this.$refs.form as any).resetFields();
      this.loadUsers();
    },
    handleSizeChange (size: number) {
      this.form.pageSize = size;
      this.form.currentPage = 1;
      this.loadUsers();
    },
    handleCurrentChange (page: number) {
      this.form.currentPage = page;
      this.loadUsers();
    },
    openAssignRole (user: any) {
      this.userId = user.id;
      this.loadRolesWithUser();
      this.roleSwitch = true;
    },
    closeAssignRole () {
      this.userId = null;
      this.roleIdList = [];
      this.roleSwitch = false;
    },
    async AssignRole () {
      if (!this.roleIdList.length) return;
      await allocateUserRoles({
        userId: this.userId,
        roleIdList: this.roleIdList
      });
      this.$message.success('角色分配成功');
      this.closeAssignRole();
    }
  }
});
</script>

<style scoped>

</style>
