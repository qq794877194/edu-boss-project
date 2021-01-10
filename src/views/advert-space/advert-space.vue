<template>
  <el-card class="resource-list" >
    <div slot="header">
      <el-button size="small" @click="$router.push({name: 'advert-space-add'})">添加广告位</el-button>
    </div>
    <el-table
      :data="advertSpaces"
      v-loading="loading"
      style="width: 100%;margin-bottom: 25px">
      <el-table-column prop="id" label="spaceKey"></el-table-column>
      <el-table-column prop="name" label="广告位名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-link type="primary" class="mr15" @click="$router.push({name: 'advert-space-edit', params: {spaceId: scope.row.id}})">编辑</el-link>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { getAllSpaces } from '@/api/advert-space';

export default Vue.extend({
  name: 'advert-space',
  data () {
    return {
      advertSpaces: [],
      spacesMap: {},
      tagsMap: null,
      loading: false
    };
  },
  created () {
    this.loadAdvertSpaces();
  },
  methods: {
    async loadAdvertSpaces () {
      this.loading = true;
      const { data } = await getAllSpaces();
      this.loading = false;
      this.advertSpaces = data.content.map((item: any) => {
        item.createTime = this.$formatDate(item.createTime);
        item.updateTime = this.$formatDate(item.updateTime);
        return item;
      });
    }
  }
});
</script>

<style scoped>

</style>
