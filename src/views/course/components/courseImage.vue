<template>
  <div class="course-image">
    <el-progress
      type="circle"
      :percentage="percentage"
      :width="178"
      :status="percentage === 100 ? 'success' : undefined"
      v-show="isUploading"></el-progress>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      v-show="!isUploading"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload"
    >
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { uploadCourseImage } from '@/api/course';

export default Vue.extend({
  name: 'courseImage',
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      percentage: 0,
      isUploading: false
    };
  },
  methods: {
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < this.limit;

      if (!isJPG) {
        this.$message.error('上传封面图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error(`上传封面图片大小不能超过 ${this.limit}MB!`);
      }
      return isJPG && isLt2M;
    },
    async handleUpload (options: any) {
      this.isUploading = true;
      const fd = new FormData();
      fd.append('file', options.file);
      const { data } = await uploadCourseImage(fd, (e: any) => {
        this.percentage = Math.floor(e.loaded / e.total * 100);
      });
      this.isUploading = false;
      this.$emit('input', data.data.name);
      this.percentage = 0;
    }
  }
});
</script>

<style lang="scss">
  .course-image .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .course-image .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .course-image .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .course-image .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
