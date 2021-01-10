<template>
<el-card>
  <el-form :model="form" :rules="rules" ref="form" label-width="120px" style="width: 50%">
    <el-form-item label="广告位名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { saveOrUpdateSpace, getSpaceById } from '@/api/advert-space';

export default Vue.extend({
  name: 'createOrEdit',
  props: {
    spaceId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      form: {
        name: ''
      },
      rules: {
        name: { required: true, message: '请输入广告位名称', trigger: 'blur' }
      }
    };
  },
  async created () {
    if (this.spaceId) {
      const { data } = await getSpaceById(this.spaceId);
      this.form = data.content;
    }
  },
  methods: {
    async onSubmit () {
      const text = this.spaceId ? '编辑' : '添加';
      await (this.$refs.form as any).validate();
      try {
        await saveOrUpdateSpace(this.form);
        this.$message.success(text + '成功');
        this.$router.back();
      } catch (e) {
        this.$message.error(text + '失败');
      }
    },
    resetForm () {
      (this.$refs.form as any).resetFields();
    }
  }
});
</script>

<style scoped>

</style>
