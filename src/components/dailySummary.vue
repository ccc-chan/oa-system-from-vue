<template>
    <div class="dailySummary">
        <mt-cell title="添加每日计划" to="/dailySummaryAdd" is-link value="添加"></mt-cell>
        <div v-infinite-scroll="scroll" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="content">
            <div class="table-title">
                <div>
                    <span>提交人</span>
                </div>
                <div>
                    <span>所在部门</span>
                </div>
                <div>
                    <span>所在岗位</span>
                </div>
            </div>
            <div v-for="item in dailySummaryList">
                <router-link :to="'dailySummaryDetail/'+item.id">
                    <div class="table-content">
                        <div>
                            <span>{{item.name}}</span>
                        </div>
                        <div>
                            <span>{{item.bmname}}</span>
                        </div>
                        <div>
                            <span>{{item.gwname}}</span>
                        </div>
                    </div>
                </router-link>
            </div>
            <div v-show='isShow' class="tip">已经到底了</div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            dailySummaryList:[],
            isShow:false,
            curPage:'',
            totalPage:'',
        }
    },
    methods: {
        scroll(){
            var contentHeight = $(".dailySummary").height() + 100;
            var screenHeight = $(window).height();
            var _self = this;
            if ($(".dailySummary").scrollTop() >= contentHeight - screenHeight) {
                _self.curPage++;
                if(_self.curPage < _self.totalPage){
                    this.$axios.get('http://api.7171.la/v1/Office/DailySummary?page='+_self.curPage, {headers:{"token":localStorage.token}}).then(function(data){
                            for (var i = 0; i<data.data.data.length; i++) {
                                _self.dailySummaryList.push(data.data.data[i]);
                            }
                    });
                }else{
                    _self.isShow = !_self.isShow;
                }
            }
        }
    },
    created(){
        var _self = this;
        this.$axios.get('http://api.7171.la/v1/Office/DailySummary?page=0',{headers:{"token":localStorage.token}}
            ).then(function (data) {
                console.log(data.data)
                _self.dailySummaryList = data.data.data;
                _self.curPage = data.data.current_page;
                _self.totalPage = data.data.last_page;
                //提交每日总结用
                localStorage.dailyId = data.data.today_work_plan.id;
                localStorage.work_plan = data.data.today_work_plan.work_plan;
        });
    },
    mounted(){
        document.getElementsByClassName('dailySummary')[0].addEventListener('scroll', this.scroll);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .dailySummary
        padding-bottom 55px
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        overflow auto
        .table-title
            overflow hidden
            >div
                float left
                width 33.3%
                background #95cae8
                border 1px solid #ddd
                border-bottom 0
                &:nth-of-type(2)
                    border-left 0
                    border-right 0
                span
                    display block
                    padding 0.1rem
                    font-size 0.1rem
                    text-align center
                    font-weight bold
        .table-content
            overflow hidden
            >div
                float left
                width 33.3%
                border 1px solid #ddd
                border-bottom 0
                &:nth-of-type(2)
                    border-left 0
                    border-right 0
            span
                display block
                padding 0.1rem 0
                font-size 0.14rem
                text-align center
        .tip
            font-size 0.14rem
            padding 0.1rem
            text-align center
            color #666
</style>
