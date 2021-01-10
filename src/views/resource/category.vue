<template>
    <el-card>
        <div slot="header" class="m-list list-justify">
          <div>
            <span class="mr15">资源分类</span>
            <el-link type="primary" @click="$router.back()">
              <i class="el-icon-back"></i>
              返回
            </el-link>
          </div>
          <el-button @click="categoryOpen">添加资源</el-button>
        </div>
      <el-table :data="data">
        <el-table-column v-for="item in column" :label="item.label" :prop="item.prop" :key="item.prop" />
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-link type="primary" class="mr15" @click="categoryOpen(scope.row)">编辑</el-link>
            <el-link type="danger" @click="handleDel(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :visible="cateSwitch"
        @close="categoryClose"
        :close-on-click-modal="false"
        :title="categoryInfo && categoryInfo.id ? '编辑资源分类' : '添加资源分类'"
      >
        <categoryCreateOrEdit v-if="cateSwitch" :categoryInfo="categoryInfo" @success="categoryClose(true)" />
      </el-dialog>
    </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import categoryCreateOrEdit from './components/categoryCreateOrEdit.vue';
import { getResourceTags, saveOrUpdateCategory, deleteCategory } from '@/api/resource';
const column = [
  { label: 'ID', prop: 'id' },
  { label: '名称', prop: 'name' },
  { label: '创建时间', prop: 'createdTime' },
  { label: '排序', prop: 'sort' }
];
export default Vue.extend({
  name: 'resource-category',
  data () {
    return {
      column,
      data: [],
      cateSwitch: false,
      categoryInfo: null
    };
  },
  created () {
    this.loadResourceTags();
  },
  methods: {
    async loadResourceTags () {
      const { data } = await getResourceTags();
      data.data.forEach((item: any) => {
        item.createdTime = this.$formatDate(item.createdTime);
      });
      this.data = data.data;
    },
    categoryOpen (categoryInfo: any) {
      if (categoryInfo) {
        this.categoryInfo = categoryInfo;
      }
      this.cateSwitch = true;
    },
    categoryClose (reload: any) {
      this.categoryInfo = null;
      this.cateSwitch = false;
      reload && this.loadResourceTags();
    },
    handleDel (item: any) {
      this.$delConfirm(item.name, () => deleteCategory(item.id))
        .then(() => {
          this.loadResourceTags();
        });
    }
  },
  components: {
    categoryCreateOrEdit
  }
});
</script>

<style scoped>

</style>
