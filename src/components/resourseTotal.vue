<template>
    <div>
        <!-- <Zonav></Zonav> -->
        <mt-tab-container class="page-tabbar-container" v-model='selected'>
            <mt-search  cancel-text="取消" placeholder="搜索学校" :show='true'>
                <mt-cell title="添加信息" to="/resourseTotalAdd" is-link value=""></mt-cell>
                <div v-infinite-scroll="scroll" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <div class="table-title">
                        <div>
                            <span>录入人</span>
                        </div>
                        <div>
                            <span>生源总数量</span>
                        </div>
                        <div>
                            <span>计划生源数</span>
                        </div>
                    </div>
                    <div v-for="item in resourseList">
                        <router-link :to="'resourseTotalDetail/'+item.id">
                            <div class="table-content">
                                <div>
                                    <span>{{item.user_name}}</span>
                                </div>
                                <div>
                                    <span>{{item.t_pupils_num}}</span>
                                </div>
                                <div>
                                    <span>{{item.p_pupils_num}}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div v-show='isShow' class="tip">已经到底了</div>
                </div>
            </mt-search>
        </mt-tab-container>
    </div>
</template>

<script>
import store from '../store/store'
export default {
    data () {
        return {
            selected: 'index',
            resourseList:[],
            curPage:'',
            totalPage:'',
            loading:true,
            isShow:false,
        }
    },
    methods: {
        scroll(event) {
            var contentHeight = $(".mint-search-list").height() + 100;
            var screenHeight = $(window).height();
            if ($(".mint-search-list").scrollTop() >= contentHeight - screenHeight && this.loading == true) {
                var _self = this;
                _self.loading = false;
                _self.curPage++;
                if(_self.curPage <= _self.totalPage){
                    this.$axios.get('http://api.7171.la/v1/Enrolment/SchoolAnalysis?page='+_self.curPage, {headers:{"token":localStorage.token}})
                        .then(function(data){
                        //console.log(data.data);
                        for (var i = 0; i<data.data.list.data.length; i++) {
                            _self.resourseList.push(data.data.list.data[i]);
                        }
                        _self.$nextTick(() => {
                            _self.loading = true;
                        })
                    });
                }else{
                    _self.isShow = !_self.isShow;
                }
            }
        }
    },
    created(){
        var _self = this;
        this.$axios.get('http://api.7171.la/v1/Enrolment/SchoolAnalysis?page=1', {headers:{"token":localStorage.token}})
                .then(function(data){
                    _self.resourseList = data.data.list.data;
                    _self.curPage = data.data.list.current_page;
                    _self.totalPage = data.data.list.last_page;
                    _self.$store.state.areaList = data.data.ra_val;
        });
    },
    mounted(){
        document.getElementsByClassName('mint-search-list')[0].addEventListener('scroll', this.scroll)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .mint-search
        width 100%
        .mint-searchbar
            display none
        .mint-searchbar-core
            font-size 0.14rem
            padding-left 0.1rem
        .mint-searchbar-cancel
            font-size 0.14rem
        .mint-search-list
            padding-bottom 55px
            padding-top 0
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
                    padding 0.1rem
                    font-size 0.14rem
                    text-align center
        .tip
            font-size 0.14rem
            padding 0.1rem
            text-align center
            color #666
</style>