<template>
  <el-form :model="form" label-width="100px">
    <el-form-item label="资源名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="form.sort"></el-input>
    </el-form-item>
    <el-form-item align="center">
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { saveOrUpdateCategory } from '@/api/resource';
export default Vue.extend({
  name: 'categoryCreateOrEdit',
  props: {
    categoryInfo: {}
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        sort: ''
      }
    };
  },
  created () {
    if (this.categoryInfo) {
      this.form = Object.assign({ id: '', name: '', sort: '' }, this.categoryInfo);
    }
  },
  methods: {
    async onSubmit () {
      const text = this.form.id ? '编辑' : '添加';
      try {
        await saveOrUpdateCategory(this.form);
        this.$message.success(text + '成功');
        this.$emit('success');
      } catch (e) {
        this.$message.error(text + '失败');
      }
    }
  }
});
</script>

<style scoped>

</style>
