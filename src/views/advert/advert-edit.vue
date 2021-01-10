<template>
    <div class="advert-edit">
      <createOrEdit :advertId="advertId" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import createOrEdit from './components/createOrEdit.vue';
export default Vue.extend({
  name: 'advert-edit',
  props: {
    advertId: {
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
