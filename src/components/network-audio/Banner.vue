<template lang="pug">
  div.banner
    div
      div
        div(v-for="(banner, index) of banners" :key="index")
          img(:src="banner.picUrl")
      div
</template>

<style lang="stylus">
#network-audio .banner
  width 100%
  height 100px
  background #f00
  >div
    margin auto
    display flex
    min-width 600px
    max-width 960px
    height 100%
    >div
      flex 2
      background #f0f
      position relative
      >div
        position absolute
        background #f00
      img
        width 100%
    >div+div
      flex 1
      background #0f0
      
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NetworkAudio extends Vue {
  private banners = [];
  public mounted() {
    this.$http.get('http://localhost:3000/banner', {
      params: {
        ID: null
      }
    })
    .then((response) => {
      this.banners = response.data.banners;
      console.log(this.banners);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>