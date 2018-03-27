<template>
    <div class="nav" :class="{active: active == 'active' }">
        <ul>
            <li>
                <i class="iconfont icon-guanliyuan_guanliyuanrizhi"></i>
                招生业务管理系统
            </li>
            <li class="item">
                任务分配
            </li>
            <li class="item">
                生源信息（项目经理）
            </li>
            <li>
                <i class="iconfont icon-guanliyuan_guanliyuanrizhi"></i>
                办公系统
            </li>
            <li class="item">
                文件列表
            </li>
            <li class="item">
                会议纪要
            </li>
            <li class="item">
                每周总结及计划
            </li>
            <li class="item">
                每日总结及计划
            </li>
        </ul>
    </div>
</template>

<script>
import {swipe} from '../../static/js/jquery.touchSwipe.js'
export default {
    data () {
        return {
            active:'off',
        }
    },
    mounted:function(){
        /*$("body").swipe( {
            swipe:function(event, direction, distance, duration, fingerCount) {
                //$(this).text("你用"+fingerCount+"个手指以"+duration+"秒的速度向" + direction + "滑动了" +distance+ "像素 " );
                _self.selected(direction);
            },
        });*/
    },
    methods: {
        selected:function(str){
            if (str == 'right') {
                this.active = 'active';
            }else{
                this.active = 'off';
            }
        }
    },
    watch: {
        $route (to, from) {
          this.uri = this.$route.path;
          //this.address(this.uri);
          if(this.uri != '/login'){
            var _self = this;
            $("body").swipe( {
                swipe:function(event, direction, distance, duration, fingerCount) {
                    //$(this).text("你用"+fingerCount+"个手指以"+duration+"秒的速度向" + direction + "滑动了" +distance+ "像素 " );
                    _self.selected(direction);
                },
            });
          }
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .nav
        position fixed
        background rgba(0,0,0,0.5)
        z-index 2
        top 0
        bottom 0
        //left -100%
        right 100%
        height 100%
        width 100%
        -webkit-transition all ease-in-out .2s
        -moz-transition all ease-in-out .2s
        -ms-transition all ease-in-out .2s
        -o-transition all ease-in-out .2s
        transition all ease-in-out .2
        >ul
            position absolute
            width 2rem
            height 100%
            background #6e9cbf
            // #6e9cbf
            li
                color #fff
                border-bottom 1px solid #fff
                line-height 0.26rem
                font-size 0.14rem
                padding 0.2rem
                i
                    padding-right 0.1rem
            .item
                padding-left 0.5rem
                padding-right 0.1rem
    .active
        right 0%
</style>
