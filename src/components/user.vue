<template>
    <div class="user">
        <div>
            <div class="userHeader">
                <img src="../../static/img/header.png">
                <label>{{user.name}}</label>
            </div>
            <div class="userContent">
                <div class="userBlock">
                    <mt-cell title="工号" :value="user.uid"></mt-cell>
                    <mt-cell title="身份证号" :value="user.idcard"></mt-cell>
                    <mt-cell title="性别" :value="user.sex"></mt-cell>
                    <mt-cell title="聘用性质" :value="user.prxzval"></mt-cell>
                </div>
                <div class="userBlock">
                    <mt-cell title="出生年月" :value="user.birth"></mt-cell>
                    <mt-cell title="政治面貌" :value="user.politicaloutlook"></mt-cell>
                    <mt-cell title="民族" :value="user.nation_name"></mt-cell>
                    <mt-cell title="籍贯" :value="user.nativeplace"></mt-cell>
                </div>
                <div class="userBlock">
                    <mt-cell title="所在公司" :value="user.gs_name"></mt-cell>
                    <mt-cell title="部门" :value="user.bm_name"></mt-cell>
                    <mt-cell title="岗位" :value="user.gw_name"></mt-cell>
                    <mt-cell title="员工状态" :value="user.status"></mt-cell>
                </div>
                <div class="userBlock">
                    <mt-cell title="添加信息" to="/userUpdate" is-link value="添加"></mt-cell>
                </div>
                <div class="userBtn">
                    <mt-button type="primary" @click="logout()">退出登陆</mt-button>
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
            selected: 'user',
            user:'',
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
        logout(){
            localStorage.clear();
            this.$router.push("/");
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .user
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
                background #f1f1f1
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
                    >a
                        display block
                .userBtn button
                    display block
                    width 86%
                    margin 1% 7%
</style>