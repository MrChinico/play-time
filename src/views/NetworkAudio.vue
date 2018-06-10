<template lang="pug">
  div#network-audio
    Search
    Banner
</template>
<style lang="stylus">
#network-audio
  flex 1
  // background #00f
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Search from '@/components/network-audio/Search.vue';
import Banner from '@/components/network-audio/Banner.vue';

@Component({
  components: {
    Search,
    Banner
  }
})
export default class NetworkAudio extends Vue {
  public mounted() {
    console.log('weeee')
  }
}
</script>
