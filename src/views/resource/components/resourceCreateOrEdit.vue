<template>
  <el-form :model="form" label-width="100px">
    <el-form-item label="资源名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="资源路径">
      <el-input v-model="form.url"></el-input>
    </el-form-item>
    <el-form-item label="资源分类">
      <el-select v-model="form.categoryId" placeholder="资源分类" clearable >
        <el-option v-for="item in resourceTags" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item align="center">
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { saveOrUpdateResources } from '@/api/resource';
export default Vue.extend({
  name: 'resourceCreateOrEdit',
  props: {
    resourceTags: {
      type: Array
    },
    resourceInfo: {}
  },
  data () {
    return {
      form: {
        name: '',
        url: '',
        description: '',
        categoryId: this.categoryId
      }
    };
  },
  created () {
    if (this.resourceInfo) {
      this.form = Object.assign({ name: '', url: '', description: '', categoryId: '' }, this.resourceInfo);
    }
  },
  methods: {
    async onSubmit () {
      const info = this.resourceInfo as any;
      const text = info && info.id ? '编辑' : '添加';
      try {
        await saveOrUpdateResources(this.form);
        this.$message.success(text + '成功');
        this.$emit('success');
      } catch (e) {
        this.$message.success(text + '失败');
      }
    }
  }
});
</script>

<style scoped>

</style>
