<template lang="pug">
  div#welcome 
    div.title 欢迎使用PlayTime
    div.info 将媒体文件拖至此窗口开始使用
</template>

<style lang="stylus">
#welcome
  flex 1
  display flex
  flex-flow column
  justify-content center
  align-items center
  .title
    width 80%
    padding .5rem 0rem
    border-bottom 1px solid #EEE
    text-align center
    font-size 2rem
    color #333
  .info
    font-size 1rem
    padding 1rem 0px
    color #CCC
</style>