<template lang="pug">
  div#navigation
    router-link(v-for="(navigation, index) of navigations" :key="index" :to="navigation.path") {{navigation.name}}
</template>

<style lang="stylus">
#navigation
  width 200px
  background #EEE
  border-right 1px solid #CCC
  >a
    display block
    padding .5rem 0rem
    padding-left 2rem
    &:hover
      background #CCC
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Main extends Vue {
  public navigations = [
    {name: '本地音频', path:'/local-audio'},
    {name: '播放列表', path:'/music-list'},
    // {name: '网络音频', path:'/network-audio'},
    // {name: '网络视频', path:'/'},
    {name: '设置', path:'/'},
  ];
}

</script>


