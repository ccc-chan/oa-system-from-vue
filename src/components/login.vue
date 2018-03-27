<template>
    <div class="login">
        <div>
            <img src="../../static/img/logo.png">
            <div>
                <input type="text" placeholder="请输入工号"></input>
            </div>
            <div>
                <input type="text" placeholder="请输入密码"></input>
            </div>
            <div>
                <router-link to='/index'>
                    <mt-button type="default">登陆</mt-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .login
        background #666
        height 100%
        display flex
        justify-content center
        align-items center
        >div
            width 3rem
            margin 0 auto
            img
                width 100%
                height auto
                max-width 100%
            >div
                height auto
                margin .3rem 0
                input
                    font-size 16px
                    padding 0.05rem 0.1rem
                    border solid 1px #ddd
                    width 100%
                    line-height 25px
                    display block
                    border-radius 3px
                    -webkit-border-radius 3px
                    -webkit-appearance none
                    color #333
                button
                    width 1.5rem
                    margin .5rem auto
                    display block
                    background #ebb563
                    border-color #ebb563
                    color #fff
</style>
