<template>
    <div class="login">
        <div>
            <img src="../../static/img/logo.png">
            <div>
                <input type="text" placeholder="请输入工号" v-model='userName'></input>
            </div>
            <div>
                <input type="password" placeholder="请输入密码" v-model='password'></input>
            </div>
            <div>
                <!-- <router-link to='/index'> -->
                    <mt-button type="default" @click='login'>登陆</mt-button>
                <!-- </router-link> -->
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store/store'
export default {
  data () {
    return {
        userName:'',
        password:''
    }
  },
  created(){
    if(localStorage.getItem('userId')){
        this.$router.push("index");
    }
  },
  methods:{
    login(){
        var _self = this;
        if (this.userName == '') {
            alert("请输入工号！");
            return false;
        }
        if (this.password == '') {
            alert("请输入密码！");
            return false;
        }
        //登陆
        var url="http://api.7171.la/v1/userLogin/login";
        this.$axios({
            method:'post',
            url:url,
            data: {
              user_name: this.userName,
              pass_word: this.password
            }
        }).then(function (data) {
            console.log(data.data);
            var obj = data.data;
            if(obj.error_code == '60000'){
                alert("用户不存在");
                return false;
            }
            else if(obj.error_code == '60001'){
                alert("密码错误");
                return false;
            }else if(obj.error_code == '60002'){
                alert("该用户禁止登录");
            }else{
                localStorage.userName = obj.name;
                localStorage.userId = obj.uid;
                localStorage.token = obj.token;
                _self.$router.push("layout");
            }
        });
    },
  }
}
</script>

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
