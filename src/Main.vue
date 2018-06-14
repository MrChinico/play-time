<template lang="pug">
  div#root
    TitleBar
    div.window(
      @drop="openDropFiles($event)"
      @dragover="tesa($event)"
      ref="window")
      Navigation
      router-view
    Player(ref="player")
</template>

<style lang="stylus">
*
  margin 0px
  padding 0px
html, body
  height 100%
a
  text-decoration none 
  color inherit
@font-face
  font-family: newfont;
  src: url('./assets/NotoSansHans-Regular.otf');
@font-face
  font-family: newenfont;
  src: url('./assets/MyriadPro-Regular.otf');

</style>


<style lang="stylus">
#root
  font-size 16px
  font-family newenfont,newfont 
  display flex 
  flex-flow column
  background #fff
  min-width 800px
  height 100%
  .window
    background #fff
    display flex 
    flex 1
  .player
    // background #ff0000
    height 4rem
    border-top 1px solid #CCC
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TitleBar from '@/components/TitleBar.vue';
import Navigation from '@/components/Navigation.vue';
import Player from '@/components/Player.vue';
import { constants } from 'http2';

@Component({
  components: {
    TitleBar,
    Navigation,
    Player,
  },
})
export default class Main extends Vue {

  private musicList = [];
  public openDropFiles( e ): void {
    let
      player    = this.$refs.player,
      fileList  = e.dataTransfer.files;
      this.musicList = [];
    for( let file of fileList ) {
      let size;
      if( file.size < (1024 * 1024 * 1024) ) {
        size = (file.size / 1024 / 1024).toFixed(2)+'MB';
      }
      this.musicList.push({
        name: file.name,
        type: file.type,
        size: size,
        path: file.path
      });
    }

    this.$store.commit('musicListUpdate', this.musicList);
    console.log(this.$store.state.musicList);
    this.$router.push({path:'music-list'});

    for( let index = 0; index < fileList.length; index++ ) {
      let
        file = fileList[ index ];

        player.$refs.audio.src = file.path;
    }
    player.changeMusic();
  }

  public test(e) {
    console.log(e)
    console.log(e.dataTransfer.files);
    console.log(e.dataTransfer.items);
    
  }

  public tesa(e) {
    e.preventDefault();
    console.log(e.offsetX+' | '+e.offsetX)
  }

  public mounted() {
    let box = this.$refs.window;
    let bo = this.$refs.ad;
    console.log(this.$refs)

    // document.ondragover = function (e) {
    //     e.preventDefault();  //只有在ondragover中阻止默认行为才能触发 ondrop 而不是 ondragleave
    //   console.log('157');
    // };
    

    document.ondragover = function (e) {
      e.preventDefault();
      // console.log(e.dataTransfer);
    }
    document.ondrop = function (e) {
      e.preventDefault();  //阻止 document.ondrop的默认行为  *** 在新窗口中打开拖进的图片
    };
  }
}
</script>



