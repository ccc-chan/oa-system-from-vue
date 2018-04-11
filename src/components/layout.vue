<template>
    <div id="layout">
        <oa-nav></oa-nav>
        <!-- 这里是需要keepalive的 -->
        <transition :name="transitionName">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>

        <!-- 这里不会被keepalive -->
        <transition :name="transitionName">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
        <oa-footer></oa-footer>
    </div>
</template>

<script>
import Zfooter from './footer'
import Znav from './nav'
export default {
    data () {
        return {
            selected: 'user',
            transitionName:''
        }
    },
    components:{
        'oa-footer': Zfooter,
        'oa-nav':Znav
    },
    watch: {//使用watch 监听$router的变化
        $route(to, from) {
          //如果to索引大于from索引,判断为前进状态,反之则为后退状态
          if(to.meta.index > from.meta.index){
            //设置动画名称
            this.transitionName = 'slide-left';
          }else{
            this.transitionName = 'slide-right';
          }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active,
      will-change transform
      transition all 500ms
      position absolute
    .slide-right-enter
      opacity 0
      transform translate3d(-100%, 0, 0)
    .slide-right-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)
    .slide-left-enter
      opacity 0
      transform translate3d(100%, 0, 0)
    .slide-left-leave-active
      opacity 0
      transform translate3d(-100%, 0, 0)
</style>