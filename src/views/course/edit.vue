<template>
    <div class="course-edit">
      <createOrUpdate :courseId="courseId" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import createOrUpdate from './components/createOeUpdate.vue';

export default Vue.extend({
  name: 'course-edit',
  props: {
    courseId: {
      type: [Number, String]
    }
  },
  components: {
    createOrUpdate
  }
});
</script>

<style scoped>

</style>
