<template>
  <el-card class="resource-list" >
    <div slot="header">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name" placeholder="资源名称" clearable ></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="form.url" placeholder="资源路径" clearable ></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="资源分类" clearable >
            <el-option v-for="item in resourceTags" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div class="tr">
        <el-button size="small" @click="resourceOpen">添加资源</el-button>
        <el-button size="small" @click="$router.push({name: 'resource-category'})">资源分类</el-button>
      </div>
    </div>
    <el-table
      :data="resources"
      v-loading="loading"
      style="width: 100%;margin-bottom: 25px">
      <el-table-column v-for="item in column" :prop="item.prop" :key="item.prop" :label="item.label" />
      <el-table-column label="资源类型" width="130px">
        <template slot-scope="scope">
          <el-tag type="primary" class="mr15">{{scope.row.categoryName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px">
        <template slot-scope="scope">
          <el-link type="primary" class="mr15" @click="resourceOpen(scope.row)">编辑</el-link>
          <el-link type="danger" @click="handleDelete(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.current"
      :page-sizes="[5, 10, 20, 30, 40]"
      :page-size="form.size"
      :disabled="loading"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    <el-dialog
      :visible="resourceSwitch"
      :title="resource && resource.id ? '编辑资源' : '添加资源'"
      :close-on-click-modal="false"
      @close="resourceClose"
    >
      <resourceCreateOrEdit
        v-if="resourceSwitch"
        :resourceTags="resourceTags"
        :resourceInfo="resource"
        @success="resourceClose(true)"
      ></resourceCreateOrEdit>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { getResourcePages, getResourceTags, deleteResource } from '@/api/resource';
import resourceCreateOrEdit from './resourceCreateOrEdit.vue';

const column = [
  { label: '编号', prop: 'id' },
  { label: '资源名称', prop: 'name' },
  { label: '资源路径', prop: 'url' },
  { label: '描述', prop: 'description' },
  { label: '创建时间', prop: 'createdTime' }
];
export default Vue.extend({
  name: 'resourceList',
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: '',
        current: 1,
        size: 10
      },
      totalCount: 0,
      column,
      resources: [],
      resourceTags: [],
      tagsMap: null,
      loading: false,
      resourceSwitch: false,
      resource: null // 添加或编辑使用
    };
  },
  created () {
    this.loadResourceTags().then(() => {
      this.loadResources();
    });
  },
  methods: {
    async loadResources () {
      this.loading = true;
      const { data } = await getResourcePages(this.form);
      data.data.records.forEach((item: any) => {
        item.createdTime = this.$formatDate(item.createdTime);
        item.categoryName = (this.tagsMap as any)[item.categoryId];
      });
      this.loading = false;
      this.totalCount = data.data.total;
      this.resources = data.data.records;
    },
    async loadResourceTags () {
      const { data } = await getResourceTags();
      const tagsMap: any = {};
      data.data.forEach((item: any) => {
        tagsMap[item.id] = item.name;
      });
      this.resourceTags = data.data;
      this.tagsMap = tagsMap;
    },
    onSubmit () {
      this.form.current = 1;
      this.loadResources();
    },
    resetSearch () {
      (this.$refs.form as any).resetFields();
      this.form.current = 1;
      this.loadResources();
    },
    resourceOpen (resource: any) {
      if (resource) {
        this.resource = resource;
      }
      this.resourceSwitch = true;
    },
    resourceClose (reload: any) {
      this.resource = null;
      this.resourceSwitch = false;
      reload && this.loadResources();
    },
    handleEdit () {

    },
    handleDelete (item: any) {
      this.$delConfirm(item.name, () => {
        return deleteResource(item.id);
      }).then(() => {
        this.loadResources();
      });
    },
    handleSizeChange (val: number) {
      this.form.size = val;
      this.form.current = 1;
      this.loadResources();
    },
    handleCurrentChange (val: number) {
      this.form.current = val;
      this.loadResources();
    }
  },
  components: {
    resourceCreateOrEdit
  }
});
</script>

<style scoped>

</style>
