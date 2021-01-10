<template>
    <div class="course-new">
      <createOrUpdate />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import createOrUpdate from './components/createOeUpdate.vue';

export default Vue.extend({
  name: 'course-new',
  components: {
    createOrUpdate
  }
});
</script>
