<template>
    <div>
        <div class="dailySummaryDetail">
            <mt-header :title='dailySummary.title'>
              <router-link to="/dailySummary" slot="left">
                <mt-button icon="back">返回</mt-button>
              </router-link>
            </mt-header>
            <div class="dailySummaryContent">
                <label>提交时间</label>
                <span>{{dailySummary.time}}</span>
                <label>当日计划</label>
                <span>{{dailySummary.work_plan}}</span>
                <label>当日总结</label>
                <span>{{dailySummary.content}}</span>
                <label>次日计划</label>
                <span>{{dailySummary.tomorrow_plan}}</span>
                <label>点评</label>
                <span v-if="len == 0">{{noOne}}</span>
                <div v-else>
                    <div v-for='item in dailySummary.comment' >
                        <mt-cell title="点评人" :value="item.user_name"></mt-cell>
                        <mt-cell title="点评内容" :value="item.comentcontent"></mt-cell>
                    </div>
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
            selected:'index',
            dailySummary:'',
            len:'',
            noOne:''
        }
    },
    methods:{
        
    },
    created(){
        
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            var _self = vm;
            var personId = vm.$route.params.id;
            //
            vm.$axios.get('http://api.7171.la/v1/Office/get_DailySummary/'+personId,{headers:{"token":localStorage.token}}
                ).then(function (data) {
                    _self.dailySummary = data.data;
                    if (_self.dailySummary.comment.length == 0) {
                        _self.len = _self.dailySummary.comment.length;
                        _self.noOne = '客官，等等，暂无人点评';
                    }
            });
        });
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .dailySummaryDetail
        padding-bottom 55px
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        overflow auto
        background #eee
        .dailySummaryContent
            width 90%
            margin 5%
            background #fff
            border 1px solid #999
            label
                display block
                border-bottom 1px solid #999
                padding 0.1rem
                font-size 0.15rem
                color #666
            >span
                display block
                border-bottom 1px solid #999
                padding 0.1rem
                font-size 0.14rem
                line-height 0.2rem
                color #666
                &:last-of-type
                    border-bottom 0
</style>