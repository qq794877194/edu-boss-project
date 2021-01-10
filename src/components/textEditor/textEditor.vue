<template>
    <div ref="editorBox"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import E from 'wangeditor';
import { uploadCourseImage } from '@/api/course';

export default Vue.extend({
  name: 'textEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    const editor = new E(this.$refs.editorBox as any);
    editor.config.onchangeTimeout = 500;
    editor.config.onchange = (newHtml: string) => {
      this.$emit('input', newHtml);
    };
    editor.config.customUploadImg = async (resultFiles: any, insertImgFn: any) => {
      const fd = new FormData();
      fd.append('file', resultFiles[0]);
      const { data } = await uploadCourseImage(fd);
      insertImgFn(data.data.name);
    };
    editor.create();
    editor.txt.html(this.value);
  }
});
</script>

<style scoped>

</style>
