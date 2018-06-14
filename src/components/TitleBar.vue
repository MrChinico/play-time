<template lang="pug">
  div#title-bar
    div.left left
    div.title {{appName}}
    div.right
      div
      div
      div
</template>

<style lang="stylus">
#title-bar
  -webkit-app-region: drag
  color #fff
  height 30px
  background #E00
  display flex
  // flex-flow row-reverse
  justify-content space-between
  align-items center
  .left
    width 90px
    background #a00
  .right
    width 90px
    height 100%
    display flex
    justify-content space-around
    align-items center
    >div
      display inline-block
      width 16px
      height 16px
      border-radius 50%
      background #A00
      box-sizing border-box
  
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState({
    countAlias: ( state ) => state.baseInfo.appName,
  }),
})
export default class Main extends Vue {
  public appName = null;
  public mounted() {
    this.appName = this.$store.state.baseInfo.appName;
  }
}
</script>

