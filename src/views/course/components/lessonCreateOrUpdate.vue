<template>
  <el-form :model="form" :rules="rules" label-width="200px" ref="form">
    <el-form-item label="课程名称" prop="courseName">
      <el-input v-model="form.courseName" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="章节名称" prop="sectionName">
      <el-input v-model="form.sectionName" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="课时名称" prop="theme">
      <el-input v-model="form.theme"></el-input>
    </el-form-item>
    <el-form-item label="时长" prop="duration">
      <el-input v-model="form.duration" type="number"></el-input>
    </el-form-item>
    <el-form-item label="是否开放试听" prop="isFree">
      <el-switch v-model="form.isFree"></el-switch>
    </el-form-item>
    <el-form-item label="课时排序" prop="orderNum">
      <el-input v-model="form.orderNum">
        <template slot="append">数字控制排序，数字越大越靠后</template>
      </el-input>
    </el-form-item>
    <el-form-item align="center" label-width="0">
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { saveOrUpdateLesson } from '@/api/course';

const rules = {
  courseName: { required: true },
  sectionName: { required: true },
  theme: { required: true, message: '请输入课时名称', trigger: 'blur' },
  duration: { required: true, message: '请输入时长', trigger: 'blur' },
  status: 0,
  orderNum: { required: true, message: '请输入排序', trigger: 'blur' }
};
export default Vue.extend({
  name: 'lessonCreateOrUpdate',
  props: {
    lesson: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        courseId: '',
        courseName: '',
        sectionId: '',
        sectionName: '',
        theme: '',
        duration: '',
        isFree: false,
        status: 0, // 0-隐藏，1-未发布，2-已发布
        orderNum: 0
      },
      rules
    };
  },
  created () {
    this.form = { ...this.form, ...this.lesson };
  },
  methods: {
    async onSubmit () {
      const text = this.lesson.theme ? '编辑' : '新增';
      await (this.$refs.form as any).validate();
      try {
        await saveOrUpdateLesson(this.form);
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
