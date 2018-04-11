<template>
    <div>
        <div class="dailySummaryAdd">
            <mt-header title="每日计划总结">
              <router-link to="/dailySummary" slot="left">
                <mt-button icon="back">返回</mt-button>
              </router-link>
            </mt-header>
            <div class="dailyAdd">
                <div class="dailyAddContent">
                    <label>当日计划</label>
                    <span>{{todayPlan}}</span>
                </div>
                <div class="dailyAddContent">
                    <label>今天总结</label>
                    <textarea v-model='todaySummary'></textarea>
                </div>
                <div class="dailyAddContent">
                    <label>明日计划</label>
                    <textarea v-model='tomorrowPlan'></textarea>
                </div>
            </div>
            <div class="addBtn">
                <mt-button type="primary" @click='addDaily'>添加</mt-button>
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
            todayPlan:'',
            todaySummary:'',
            tomorrowPlan:''
        }
    },
    created(){
        this.todayPlan = localStorage.work_plan;
    },
    methods:{
        addDaily(){
            if (localStorage.dailyId == undefined) {
                localStorage.dailyId = '';
            }
            this.$axios({
                method:'post',
                url:'http://api.7171.la/v1/Office/DailySummary',
                headers:{
                    "token":localStorage.token
                },
                data: {
                  dsid:localStorage.dailyId,
                  content: this.todaySummary,
                  work_plan: this.tomorrowPlan
                }
            }).then(function (data) {
                Toast(data.data.msg);
            });
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .dailySummaryAdd
        padding-bottom 55px
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        overflow auto
        background #eee
        .dailyAdd
            background #fff
            border 1px solid #999
            width 90%
            margin 5%
            >div
                border-bottom 1px solid #999
                label,>span,>textarea
                    display block
                    border-bottom 1px solid #999
                    padding 0.1rem
                    font-size 0.15rem
                    color #666
                >span,>textarea
                    font-size 0.14rem
                    line-height 0.2rem
                    border-bottom 0
                >textarea
                    height 200px
                    width 100%
                    border 0
                    box-sizing border-box
                    font-family '微软雅黑'
                &:last-of-type
                    border-bottom 0
        .addBtn
            width 90%
            margin 5%
            button
                display block
                width 90%
                margin 5%
                label
                    color #fff
</style>