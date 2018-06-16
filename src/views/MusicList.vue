<template lang="pug">
  div#music-list
    div.title
      div.play
      div.index
      div.name 音乐标题
      div.time 时长
      div.type 类型
      div.size 大小

    div( v-for = "( music, index ) of musicList " :key = "index" )
      img.play(
        @click="changeMusic(music)"
        src="@/assets/play.png"
      )
      div.index {{index < 10 ? '0' + ( index + 1 ) : index + 1}}.
      div.name {{music.name}}
      div.time {{music.time}}
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
      color #555
      display flex
      align-items center
      &:nth-child(2n+1){
        background #EEE;
      }
      .play
        width 20px
        height 20px
        margin-right 16px
      .index
        flex .5
      .name
        flex 5
      .time
        flex 1
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
export default class MusicList extends Vue {
  // private musicList = null;

  private changeMusic( music ) {
    let audio = this.$parent.$refs.player.$refs.audio;
    audio.src = music.path;
    audio.play();
  }
  private mounted(){
    // this.musicList = this.$store.state.musicList;
  }
  
}
</script>

