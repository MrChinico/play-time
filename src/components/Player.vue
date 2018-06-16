<template lang="pug">
  div#player
    div.album
    div.control
      div.previous(ref="previous")
      div.play-pause(@click="playPause")
        div(:class="playing?'pause':'play'")
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
      div.volume(@click="volumeSet=!volumeSet")
        icon(name="voice" scale="1")
        div.volume-control(
          v-show="volumeSet"
          ondragstart="return false"
          @mousedown="changeVolumeBarStart($event)"
          @mousemove="changeVolumeBarBody($event)"
          @mouseup="changeVolumeBarEnd($event)"
          ref="volumeSetBar"
        )
          div.background
            div.progress(ref="volumeProgress")
              span
      div.play-mode(@click="setPlayMode")
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
      border 1px solid #888
      border-radius 50%
      margin-left 8px
      position relative
      .play
        position absolute
        top 6px
        left 10px
        height: 0px;
        border-width: 10px 0px 10px 18px;
        border-color: transparent transparent transparent #AAA;
        border-style: solid;
        transition .25s
      .pause
        position absolute
        top 7px
        left 8px
        width 5px
        height 18px
        border-width: 0px 6px 0px 6px
        border-color: transparent #AAA transparent #AAA
        border-style: solid
        transition .25s
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
        transition .125s;
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
    color #888
  .tools
    margin-left 8px
    // background #555
    display flex
    position relative
    .volume-control
      position absolute
      width 24px
      height 83px
      background #EEE;
      border: 1px solid #CCC
      border-bottom 0px; 
      top -122px
      display flex;
      padding 8px 0px
      justify-content center
      align-items center
      .background
        width 4px
        height 100%
        background #CCC
        display flex
        flex-flow column-reverse
        position relative
        .progress
          pointer-events none
          position absolute
          border-radius 2px
          width 4px
          height 50%
          background #C00
          display flex
          justify-content center
          transition .125s;
          span 
            pointer-events none
            position absolute
            width 8px
            height 8px
            background #C00
            top -8px
            border 4px solid #AAA
            border-radius 50%
    .play-mode
      background #f00
    >div
      margin-right 8px
      width 24px
      height 24px
      // background #f00
      svg
        width 100%
        height 100%
        color #AAA

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setTimeout } from 'timers';
import { Utils } from '@/utils/utils';

@Component
export default class Player extends Vue {

  private playing: boolean                = false;
  private volumeSet: boolean              = false;
  private changeTimeBarSwitch: boolean    = false;
  private changeVolumeBarSwitch: boolean  = false;
  private audioEl                         = null;
  private progressEl                      = null;
  private bufferEl                        = null;
  private newProgress                     = null;
  private newVolumeProgress               = null;
  private duration: string = '00:00';
  private current: string = '00:00';
  private playMode: number = 0;


  public mounted(){
    this.audioEl    = this.$refs.audio;
    this.progressEl = this.$refs.progress;
    this.bufferEl   = this.$refs.buffer;
  }

  public setPlayMode(): void {
    let audioEl = this.$refs.audio;
    switch( ++this.playMode ) {
      default:
        this.playMode = 0;
      case 0:
        audioEl.loop = '';
        console.log(this.playMode)
        break;
      case 1:
        audioEl.loop = 'loop';
        console.log(this.playMode)
        break;
    }
  }

  public test() {
    this.duration = Utils.secondToMinute( this.audioEl.duration );
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
    this.current = Utils.secondToMinute( this.audioEl.currentTime );
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

        this.current = Utils.secondToMinute( this.audioEl.duration * this.newProgress );

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

  public changeVolumeBarStart(e): void {
    this.changeVolumeBarSwitch = true;
  }

  public changeVolumeBarBody(e): void {
    if ( this.changeVolumeBarSwitch ) {
      let
        volumeSetBar            = this.$refs.volumeSetBar,
        volumeSetBarProgress    = this.$refs.volumeProgress,
        volumeSetBarStyle       = getComputedStyle( volumeSetBar ),
        volumeSetBarFullHeight  = Number( volumeSetBarStyle.height.replace( 'px', '' ) ) + (
                                    Number( volumeSetBarStyle.paddingBottom.replace( 'px', '' ) ) + 
                                    Number( volumeSetBarStyle.paddingTop.replace( 'px', '' ) )
                                  ),
        volumeSetBarHeight      = Number( volumeSetBarStyle.height.replace( 'px', '' ) );

      this.newVolumeProgress  = ( 1 - ( e.offsetY - Number( volumeSetBarStyle.paddingTop.replace( 'px', '' ) ) ) / volumeSetBarHeight ).toFixed( 2 );

      if ( this.newVolumeProgress < 0 ) {
        this.newVolumeProgress = 0;
      }
      if ( this.newVolumeProgress > 1 ) {
        this.newVolumeProgress = 1;
      }

        // if (e.srcElement.className == 'time-bar') {
          // console.log(volumeSetBarProgress.style.height);
      volumeSetBarProgress.style.height = ( this.newVolumeProgress * 100 ) + '%';
      this.audioEl.volume = this.newVolumeProgress;
      
    }
  }

  public changeVolumeBarEnd(e): void {
    this.changeVolumeBarSwitch = false;
  }
}
</script>

