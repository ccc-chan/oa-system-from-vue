<template>
    <div class="nav" :class="{active: active == 'active' }">
        <ul>
            <li v-for="(item, index) in menu" class="item">
                <i class="iconfont icon-guanliyuan_guanliyuanrizhi"></i>
                <span>{{item.name}}</span>
                <ul>
                    <li v-for="item1 in item._data" @click="forward(item1.web_mca)">{{item1.name}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import {swipe} from '../../static/js/jquery.touchSwipe.js'
import store from '../store/store'
export default {
    data () {
        return {
            active:'off',
            menu:''
        }
    },
    created(){
        var _self = this;
        this.getMenu();
        $("body").swipe( {
            swipe:function(event, direction, distance, duration, fingerCount) {
                //$(this).text("你用"+fingerCount+"个手指以"+duration+"秒的速度向" + direction + "滑动了" +distance+ "像素 ");
                _self.selected(direction);
            },
        });
    },
    mounted(){
        var _self = this;
        $(".nav").click(function(){
            _self.active = 'off';
        });
        $(".nav>ul").click(function(e){
            e.stopPropagation();
        });
    },
    methods: {
        forward(url){
            //console.log(url);
            this.active = 'off';
            this.$router.push({ path: url });
        },
        selected(str){
            if (str == 'right') {
                this.active = 'active';
            }else{
                this.active = 'off';
            }
        },
        //获取菜单
        getMenu(){
            var _self = this;
            this.$axios.get('http://api.7171.la/v1/Menu/getmenu', {headers:{"token":localStorage.token}})
                .then(function(data){
                    _self.$store.state.nav = data.data;
                    _self.menu = _self.$store.state.nav;
                    //console.log(data.data)
        });
    }
    },
    watch: {
        $route (to, from) {
          this.uri = this.$route.path;
          if(this.uri != '/login'){
            var _self = this;
            
          }
        },
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
            >li
                color #fff
                line-height 0.26rem
                font-size 0.14rem
                margin 0.2rem 0
                span
                    display inline-block
                    padding-bottom 0.1rem
                i
                    padding 0 0.2rem
                a
                    color #fff
                li
                    color #fff
                    border-bottom 1px solid #fff
                    line-height 0.26rem
                    font-size 0.14rem
                    padding 0.1rem 0.2rem 0.1rem 0.6rem
                    &:first-of-type
                        border-top 1px solid #fff
    .active
        right 0%
</style>
