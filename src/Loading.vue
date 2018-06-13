<template lang="pug">
  div#loading
    div.aps
      div.triangle
      div
        div
          div Play
          div
            div Time
</template>

<style lang="stylus">

@font-face
  font-family: myFirstFont;
  src: url('./assets/MyriadPro-Semibold.otf');

@keyframes a
  0%
    transform translateX(-100%)
  50%
    transform translateX(20px)
  100%
    transform translateX(0%)

@keyframes b
  0%
    transform translateX(40px);
  40%
    transform translateX(-40px);
  70%
    transform translateX(0px);
  100%
    transform translateX(-20px);

@keyframes c
  0%
    transform translateX(0%)
  50%
    transform translateX(30px)
  100%
    transform translateX(0%)

.aps
  position absolute
  display flex
  overflow hidden
  align-items center
  z-index 1
.triangle
  animation b .5s ease forwards
  animation-delay 3s
  transform translateX(40px)
  height 0px
  border-width 20px 0px 20px 40px
  margin-left 60px
  border-color transparent transparent transparent #fff
  border-style solid
  z-index -1
.triangle + div
  background #E00
  overflow hidden
  >div
    animation a 1s ease forwards
    animation-delay 1s
    transform translateX(-100%)
    transition 1s
    >div
      display inline-block
    div+div
      div
        // transform translateX(50px)
        animation c .5s ease-in forwards
        animation-delay 3.25s
        margin-right 40px
// .aps:hover .triangle + div
  // transform translateX(0%)
#loading
  height 100%
  background #E00
  display flex
  justify-content center
  align-items center
  position relative
  color #fff
  div
    div
      font 64px myFirstFont
      
</style>

