<template>
  <div class="role">
    <roleList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import roleList from './components/list.vue';

export default Vue.extend({
  name: 'role',
  data () {
    return {

    };
  },
  components: {
    roleList
  }
});
</script>

<style scoped>

</style>
