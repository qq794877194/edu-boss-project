<template>
<el-card>
  <el-form :model="form" :rules="rules" ref="form" label-width="120px" style="width: 50%">
    <el-form-item label="广告名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="广告位置" prop="spaceId">
      <el-select v-model="form.spaceId">
        <el-option v-for="item in spaces" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="开始时间" prop="startTime">
      <el-date-picker type="datetime" :pickerOptions="pickerOptions" v-model="form.startTime"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" prop="endTime">
      <el-date-picker type="datetime" :pickerOptions="pickerOptions" v-model="form.endTime"></el-date-picker>
    </el-form-item>
    <el-form-item label="上线/下线" prop="status">
      <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>
    <el-form-item label="广告图片" prop="img">
      <img-upload v-model="form.img"></img-upload>
    </el-form-item>
    <el-form-item label="广告链接" prop="link">
      <el-input v-model="form.link"></el-input>
    </el-form-item>
    <el-form-item label="广告备注" prop="text">
      <el-input type="textarea" v-model="form.text"></el-input>
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
import { saveOrUpdateAdvert, getAdById } from '@/api/advert';
import { getAllSpaces } from '@/api/advert-space';
import imgUpload from '@/components/imgUpload/imgUpload.vue';

const rules = {
  name: { required: true, message: '请输入广告名称', trigger: 'blur' },
  spaceId: { required: true, message: '请选择广告位置', trigger: 'blur' },
  img: { required: true, message: '请上传广告图片', trigger: 'blur' },
  link: { required: true, message: '请输入广告链接', trigger: 'blur' },
  startTime: { required: true, message: '请选择开始时间', trigger: 'blur' },
  endTime: { required: true, message: '请选择结束时间', trigger: 'blur' }
};
const pickerOptions = {
  disabledDate (date: any) {
    return date <= new Date();
  }
};
export default Vue.extend({
  name: 'createOrEdit',
  props: {
    advertId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      form: {
        name: '',
        text: '',
        img: '',
        link: '',
        startTime: '',
        endTime: '',
        status: 0
      },
      pickerOptions,
      rules,
      spaces: []
    };
  },
  async created () {
    this.loadSpaces();
    console.log(this.advertId);
    if (this.advertId) {
      const { data } = await getAdById(this.advertId);
      this.form = data.content;
    }
  },
  methods: {
    async loadSpaces () {
      const { data } = await getAllSpaces();
      this.spaces = data.content;
    },
    async onSubmit () {
      const text = this.advertId ? '编辑' : '添加';
      await (this.$refs.form as any).validate();
      try {
        await saveOrUpdateAdvert(this.form);
        this.$message.success(text + '成功');
        this.$router.back();
      } catch (e) {
        this.$message.error(text + '失败');
      }
    },
    resetForm () {
      (this.$refs.form as any).resetFields();
    }
  },
  components: {
    imgUpload
  }
});
</script>

<style scoped>

</style>
