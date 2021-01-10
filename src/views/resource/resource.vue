<template>
  <div class="resource">
    <resourceList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import resourceList from './components/list.vue';
export default Vue.extend({
  name: 'resource',
  components: {
    resourceList
  }
});
</script>

<style scoped>

</style>
