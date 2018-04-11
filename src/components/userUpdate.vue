<template>
    <div class="userUpdate">
        <div>
            <mt-header title="修改个人信息">
              <router-link to="/user" slot="left">
                <mt-button icon="back">返回</mt-button>
              </router-link>
            </mt-header>
            <div class="userContent">
                <div class="userBlock">
                    <mt-field label="电话" :value="user.phone" v-model="user.phone"></mt-field>
                    <mt-field label="邮箱" :value="user.email" v-model="user.email"></mt-field>
                    <mt-field label="卡号" :value="user.salarycard" v-model="user.salarycard"></mt-field>
                </div>
                <div class="userBtn">
                    <mt-button type="primary" @click="update()">修改</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            user:'',
            phone:'',
            email:'',
            salarycard:''
        }
    },
    created(){
        var _self = this;
        this.$axios.get('http://api.7171.la/v1/Employee/UserInfo',{headers:{"token":localStorage.token}}
            ).then(function (data) {
                _self.user = data.data;
        });
    },
    methods: {
        update(){
            var _self = this;
            this.$axios({
                method:'put',
                url:'http://api.7171.la/v1/Employee/UserInfo',
                headers:{
                    "token":localStorage.token
                },
                data:{
                    "phone":_self.user.phone,
                    "email":_self.user.email,
                    "salarycard":_self.user.salarycard
                }
            }).then(function (data) {
                Toast(data.data.info);
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .userUpdate
        height 100%
        >div
            padding-bottom 55px
            position absolute
            left 0
            right 0
            top 0
            bottom 0
            overflow auto
            .userHeader
                background #6c8bd0
                padding 0.3rem
                width 100%
                img
                    display block
                    margin 0 auto
                label
                    display block
                    text-align center
                    color #fff
                    margin 0.15rem 0 0
                    font-size 0.16rem
                    font-weight bold
                    letter-spacing 0.02rem
            .userContent
                padding 2%
                .userBlock
                    width 96%
                    margin 4% 2%
                    background #fff
                    border-left 1px solid #ddd
                    border-right 1px solid #ddd
                    .mint-cell:first-of-type
                        border-top 1px solid #ddd
                    .mint-cell-wrapper
                        background-image none
                        border-bottom 1px solid #ddd
                    .mint-field-core
                        text-align right
                .userBtn button
                    display block
                    width 86%
                    margin 1% 7%
</style>