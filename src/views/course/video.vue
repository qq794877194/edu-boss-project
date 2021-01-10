<template>
  <div class="course-video">
    <el-card>
      <div slot="header">上传视频</div>
      <el-form label-width="80px" :model="video">
        <el-form-item label="章节名称">
          <el-input v-model="video.sectionName"></el-input>
        </el-form-item>
        <el-form-item label="课时名称">
          <el-input v-model="video.lessonName"></el-input>
        </el-form-item>
        <el-form-item label="视频上传">
          <input type="file" ref="video">
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file" ref="img">
        </el-form-item>
        <el-form-item v-if="videoPercent">
          <el-progress :text-inside="true" style="width: 300px" :stroke-width="15"
                       :percentage="videoPercent"></el-progress>
          <p>视频转码: {{transCodeSuccess ? '成功' : '转码中'}}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpload">开始上传</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  aliyunImagUploadAddressAdnAuth,
  aliyunVideoUploadAddressAdnAuth,
  aliyunTransCode,
  aliyunTransCodePercent
} from '@/api/aliyun-oss';

export default Vue.extend({
  name: 'course-video',
  data () {
    return {
      video: {
        sectionName: '',
        lessonName: ''
      },
      uploader: null,
      imageUrl: '',
      videoPercent: 0,
      transCodeSuccess: false, // 转码进度
      videoId: null,
      timer: null
    };
  },
  created () {
    this.initUploader();
  },
  computed: {
    videoEle () {
      return this.$refs.video;
    },
    imgEle () {
      return this.$refs.img;
    }
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值
        userId: '1618139964448548',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          let uploadAddressAndAuth;
          if (uploadInfo.isImage) {
            const { data } = await aliyunImagUploadAddressAdnAuth();
            this.imageUrl = data.data.imageUrl;
            uploadAddressAndAuth = data.data;
          } else {
            const { data } = await aliyunVideoUploadAddressAdnAuth(uploadInfo.file.name, this.imageUrl);
            uploadAddressAndAuth = data.data;
            this.videoId = uploadAddressAndAuth.videoId;
          }
          // 设置上传凭证
          (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          );
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
          console.log(totalSize, loadedPercent);
          if (!uploadInfo.isImage) {
            this.videoPercent = loadedPercent * 100;
          }
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo: any) {
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
          // 请求转码
          const { data } = await aliyunTransCode({
            lessonId: this.$route.query.lessonId,
            coverImageUrl: this.imageURL,
            fileName: (this.videoEle as any).files[0].name,
            fileId: this.videoId
          });
            // 轮询转码进度
          (this.timer as any) = setInterval(async () => {
            const { data } = await aliyunTransCodePercent(this.$route.query.lessonId);
            if (data.code === '000000') {
              clearInterval(this.timer as any);
              this.timer = null;
              this.transCodeSuccess = true;
              console.log(data);
            }
          }, 3000);
        }
      });
    },
    handleUpload () {
      this.transCodeSuccess = false;
      this.videoPercent = 0;

      const videoFile = (this.videoEle as any).files[0];
      const imgFile = (this.imgEle as any).files[0];
      const uploader = (this.uploader as any);

      // 一旦开始上传就会按照列表中添加的顺序开始上传
      // 需要先确保上传图片
      uploader.addFile(imgFile, null, null, null, '{"Vod":{}}');
      uploader.addFile(videoFile, null, null, null, '{"Vod":{}}');

      // 开始上传，触发onUploadstarted回调
      uploader.startUpload();
    }
  },
  beforeDestroy () {
    clearInterval(this.timer as any);
    this.timer = null;
  }
});
</script>

<style scoped>

</style>
