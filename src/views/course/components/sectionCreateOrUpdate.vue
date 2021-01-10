<template>
  <el-form :model="form" :rules="rules" label-width="200px" ref="form">
    <el-form-item label="课程名称" prop="courseName">
      <el-input v-model="form.courseName" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="章节名称" prop="sectionName">
      <el-input v-model="form.sectionName"></el-input>
    </el-form-item>
    <el-form-item label="章节描述" prop="description">
      <el-input v-model="form.description" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="章节排序" prop="orderNum">
      <el-input v-model="form.orderNum"></el-input>
    </el-form-item>
    <el-form-item align="center" label-width="0">
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { saveOrUpdateSection } from '@/api/course';

const rules = {
  courseName: { required: true },
  sectionName: { required: true, message: '请输入章节名称', trigger: 'blur' },
  description: { required: true, message: '请输入章节描述', trigger: 'blur' },
  status: 0,
  orderNum: { required: true, message: '请输入排序', trigger: 'blur' }
};
export default Vue.extend({
  name: 'sectionCreateOrUpdate',
  props: {
    section: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        courseId: '',
        courseName: '',
        sectionName: '',
        description: '',
        status: 0, // 0-隐藏，1-未发布，2-已发布
        orderNum: 0
      },
      rules
    };
  },
  created () {
    this.form = { ...this.form, ...this.section };
  },
  methods: {
    async onSubmit () {
      const text = this.section.id ? '编辑' : '新增';
      await (this.$refs.form as any).validate();
      try {
        await saveOrUpdateSection(this.form);
        this.$message.success(text + '成功');
        this.$emit('success');
      } catch (e) {
        this.$message.error(text + '失败');
      }
    },
    cancel () {
      this.$emit('cancel');
    }
  }
});
</script>

<style scoped>

</style>
