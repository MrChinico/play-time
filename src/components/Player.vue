<template lang="pug">
  div#player
    div.album
    div.control
      div.previous(ref="previous")
      div.play-pause(@click="playPause")
      div.next(ref="next")
    div.time-bar(
      ondragstart="return false"
      @mousedown="changeTimeBarStart($event)"
      @mousemove="changeTimeBarBody($event)"
      @mouseup="changeTimeBarEnd($event)"
      ref="timeBar"
      )
      div.background
        div.buffer(ref="buffer")
        div.progress(ref="progress")
          span
    div.time {{current}} / {{duration}}
    div.tools
      div.volume
      div.play-mode
      div.list
    audio(@playing = "test" ref="audio")
    //- video(ref="video")
</template>

<style lang="stylus">
#player
  display flex
  height 4rem
  border-top 1px solid #CCC
  align-items center
  .album
    width 48px
    height 48px
    margin-left 8px
    background #0f0
  .control
    // background #ff0
    margin-left 8px
    display flex
    align-items center
    >div
      width 24px
      height 24px
      border 1px solid #000
      border-radius 50%
      margin-left 8px
    .play-pause
      width 32px
      height 32px
  .time-bar
    margin-left 16px
    padding 0px 8px
    // background #257
    height 32px
    flex 4
    // background #0ff
    display flex
    align-items center
    .background
      pointer-events none
      width 100%
      height 4px
      border-radius 2px
      background #CCC
      position relative
      .buffer
        pointer-events none
        position absolute
        border-radius 2px
        width 0%
        height 100%
        background #AAA
      .progress
        pointer-events none
        position absolute
        border-radius 2px
        width 0%
        height 100%
        background #C00
        display flex
        align-items center
        transition .25s;
        span 
          pointer-events none
          position absolute
          width 8px
          height 8px
          background #C00
          right -8px
          border 4px solid #AAA
          border-radius 50%
          transition .25s
  .time
    margin-left 8px
    max-width 128px
    // background #f0f
  .tools
    margin-left 8px
    // background #555
    display flex
    >div
      margin-right 8px
      width 24px
      height 24px
      background #f00
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setTimeout } from 'timers';

@Component
export default class Player extends Vue {

  private changeTimeBarSwitch: boolean  = false;
  private playing: boolean              = false;
  private audioEl                       = null;
  private progressEl                    = null;
  private bufferEl                      = null;
  private newProgress                   = null;
  private duration: string = '00:00';
  private current: string = '00:00';


  public mounted(){
    this.audioEl    = this.$refs.audio;
    this.progressEl = this.$refs.progress;
    this.bufferEl   = this.$refs.buffer;
  }
  public getProgressTime( time ): string {
    let m=0, s=0;
    m = Math.floor(Number(time / 60));
    s = Math.floor(Number(time % 60));
    console.log(time)
    console.log('hhh')
    if( m < 10 ){
      m = '0' + m;
    }
    if( s < 10 ){
      s = '0' + s;
    }
    return m + ':' + s
  }
  public test() {
    this.duration = this.getProgressTime( this.audioEl.duration )
    this.playing = true;
    this.updatePlayProgress();
  }
  public changeMusic(): void {
    this.audioEl.play();
  }
  public playPause(): void {
    let audio = this.$refs.audio;
    console.log(this.playing)
    if ( this.playing ) {
      audio.pause();
      this.playing = false;
    }
    else {
      audio.play();
    }
  }
  
  public updatePlayProgress() {
    if (this.audioEl.buffered.length != 0){
      this.bufferEl.style.width = (this.audioEl.buffered.end(this.audioEl.buffered.length - 1) / this.audioEl.duration).toFixed(2) * 100 + '%';
    }
    this.progressEl.style.width = ((this.audioEl.currentTime / this.audioEl.duration)*100).toFixed(2) + '%';
    this.current = this.getProgressTime( this.audioEl.currentTime );
    // this.buffer.style.width = ((this.audioEl.currentTime / this.audioEl.duration)*100).toFixed(2) + '%';
    // console.log(this.audioEl.duration)
    if ( this.playing ) {
      setTimeout( this.updatePlayProgress, 1000 );
    }
  }

  public changeTimeBarStart(e): void {
    this.changeTimeBarSwitch = true;
    this.playing = false;
  }
  public changeTimeBarBody(e): void {
    if ( this.changeTimeBarSwitch ) {
      let
        timeBar           = this.$refs.timeBar,
        timeBarProgress   = this.$refs.progress,
        timeBarStyle      = getComputedStyle( timeBar ),
        timeBarFullWidth  = Number( timeBarStyle.width.replace( 'px', '' ) ) + (
                              Number( timeBarStyle.paddingLeft.replace( 'px', '' ) ) + 
                              Number( timeBarStyle.paddingRight.replace( 'px', '' ) )
                            ),
        timeBarWidth      = Number( timeBarStyle.width.replace( 'px', '' ) );
        
        this.newProgress = ( ( e.offsetX - Number( timeBarStyle.paddingLeft.replace( 'px', '' ) ) ) / timeBarWidth ).toFixed( 2 );
        if ( this.newProgress<0 ) {
          this.newProgress = 0;
        }
        if ( this.newProgress>1 ) {
          this.newProgress = 1;
        }

        this.current = this.getProgressTime( this.audioEl.duration * this.newProgress );

        if (e.srcElement.className == 'time-bar') {
          timeBarProgress.style.width = ( this.newProgress * 100 ) + '%';
        }
        
      console.log( e.offsetX - Number( timeBarStyle.paddingLeft.replace( 'px', '' ) ) );
      console.log(this.audioEl.duration*this.newProgress);

      // console.log(e.offsetX+' | '+e.offsetX);
      // console.log(e);
    }
  }
  public changeTimeBarEnd(e): void {
    this.changeTimeBarSwitch = false;
    this.playing = true;
    this.audioEl.currentTime = this.audioEl.duration * this.newProgress;
    this.audioEl.play()
  }
}
</script>

