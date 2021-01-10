<template>
  <el-card class="resource-list" >
    <div slot="header">
        <el-button size="small" @click="$router.push({name: 'advert-add'})">添加广告</el-button>
    </div>
    <el-table
      :data="adverts"
      v-loading="loading"
      style="width: 100%;margin-bottom: 25px">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="广告名称"></el-table-column>
      <el-table-column prop="spaceName" label="广告位置"></el-table-column>
      <el-table-column label="广告图片">
        <template slot-scope="scope">
          <img :src="scope.row.img" width="100">
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <p>开始时间: {{scope.row.startTimeFormatString}}</p>
          <p>结束时间: {{scope.row.endTimeFormatString}}</p>
        </template>
      </el-table-column>
      <el-table-column label="上线/下线" width="130px">
        <template slot-scope="scope">
          <el-switch class="mr15" @change="changeStatus(scope.row)" v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-link type="primary" class="mr15" @click="$router.push({name: 'advert-edit', params: {advertId: scope.row.id}})">编辑</el-link>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { getAllAdvert, saveOrUpdateAdvert } from '@/api/advert';
import { getAllSpaces } from '@/api/advert-space';

export default Vue.extend({
  name: 'advert',
  data () {
    return {
      adverts: [],
      spacesMap: {},
      tagsMap: null,
      loading: false
    };
  },
  created () {
    this.loadSpaces().then(() => {
      this.loadAdverts();
    });
  },
  methods: {
    async loadSpaces () {
      const { data } = await getAllSpaces();
      const map: any = {};
      data.content.forEach((item: any) => {
        map[item.id] = item.name;
      });
      this.spacesMap = map;
    },
    async loadAdverts () {
      this.loading = true;
      const { data } = await getAllAdvert();
      this.loading = false;
      this.adverts = data.content.map((item: any) => {
        item.spaceName = (this.spacesMap as any)[item.spaceId];
        return item;
      });
    },
    async changeStatus (info: any) {
      const text = info.status ? '上架' : '下架';
      try {
        await saveOrUpdateAdvert(info);
        this.$message.success(text + '成功');
      } catch (e) {
        this.$message.success(text + '失败');
      }
    }
  },
  components: {

  }
});
</script>

<style scoped>

</style>
