<template>
  <div class="menu-create">
    <createOrEdit :isEdit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import createOrEdit from './components/createOrEdit.vue';
export default Vue.extend({
  name: 'menuEdit',
  data () {
    return {
    };
  },
  components: {
    createOrEdit
  }
});
</script>

<style scoped>

</style>
