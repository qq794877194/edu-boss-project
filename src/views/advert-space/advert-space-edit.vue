<template>
    <div class="advert-edit">
      <createOrEdit :spaceId="spaceId" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import createOrEdit from './components/createOrEdit.vue';
export default Vue.extend({
  name: 'advert-space-edit',
  props: {
    spaceId: {
      type: [Number, String]
    }
  },
  components: {
    createOrEdit
  }
});
</script>

<style scoped>

</style>
