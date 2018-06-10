<template lang="pug">
  div#root
    TitleBar
    div.window(ondragend="drop(event)")
      Navigation
      router-view
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
  min-width 800px
  height 100%
  .window
    background #fff
    display flex 
    flex 1
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TitleBar from '@/components/TitleBar.vue';
import Navigation from '@/components/Navigation.vue';

@Component({
  components: {
    TitleBar,
    Navigation,
  },
})
export default class Main extends Vue {
  public mounted() {
    var div = document.createElement("div");
    var support = ('draggable' in div) || ('ondrapstart' in div && 'ondrop' in div);
    console.log(support);
  }
  public drop(event) {
    console.log(event);
  }
}
</script>



