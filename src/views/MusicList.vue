<template lang="pug">
  div#music-list music-list
    div(v-for="(music,index) of musicList" :key="index")
      div.play(@click="changeMusic(music)") play
      div.name {{music.name}}
      div.type {{music.type}}
      div.size {{music.size}}
</template>

<style lang="stylus">
  #music-list
    width 100%;
    flex 1
    >div
      padding 4px 16px
      font-size 14px
      color #333
      display flex
      &:nth-child(2n+1){
        background #EEE;
      }
      .play
        flex .5
      .name
        flex 4
      .type
        flex 1
      .size
        flex 1
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  computed: {
    musicList () {
      return this.$store.state.musicList;
    }
  }
})
export default class HelloWorld extends Vue {
  // private musicList = null;

  private changeMusic(music){
    let audio = this.$parent.$refs.player.$refs.audio;
    audio.src = music.path;
    audio.play();
    console.log(audio);
  }
  private mounted(){
    // this.musicList = this.$store.state.musicList;
  }
  
}
</script>

