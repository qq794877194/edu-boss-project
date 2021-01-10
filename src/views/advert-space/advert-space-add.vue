<template>
    <div class="advert-add">
      <createOrEdit />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import createOrEdit from './components/createOrEdit.vue';
export default Vue.extend({
  name: 'advert-space-add',
  components: {
    createOrEdit
  }
});
</script>

<style scoped>

</style>
