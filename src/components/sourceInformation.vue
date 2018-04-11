<template>
    <div class="sourceInformation">
        <mt-header title="总生源信息">
          <!-- <router-link to="/resourseTotal" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link> -->
        </mt-header>
        <div class="totalSourcetitle title">
            <div>
                <span>报名学校</span>
            </div>
            <div>
                <span>学生姓名</span>
            </div>
            <div>
                <span>负责人</span>
            </div>
        </div>
        <div v-for='item in sourceList'>
            <router-link :to="'sourceInformationDetail/'+item.id">
                <div class="mainContent">
                    <div>
                        <span>{{item.school_name}}</span>
                    </div>
                    <div>
                        <span>{{item.name}}</span>
                    </div>
                    <div>
                        <span>{{item.source}}</span>
                    </div>
                </div>
            </router-link>
        </div>
        <div v-show='isShow' class="tip">已经到底了</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            sourceList:[],
            isShow:false,
            curPage:'',
            totalPage:''
        }
    },
    methods: {
        scroll(){
            var contentHeight = $(".sourceInformation").height() + 300;
            var screenHeight = $(window).height();
            var _self = this;
            if ($(".sourceInformation").scrollTop() >= contentHeight - screenHeight) {
                _self.curPage++;
                if(_self.curPage < _self.totalPage){
                    this.$axios.get('http://api.7171.la/v1/Enrolment/ReginfoList?page='+_self.curPage, {headers:{"token":localStorage.token}}).then(function(data){
                            //console.log(data.data);
                            for (var i = 0; i<data.data.list.data.length; i++) {
                                _self.sourceList.push(data.data.list.data[i]);
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
        this.$axios.get('http://api.7171.la/v1/Enrolment/ReginfoList?page=0',{headers:{"token":localStorage.token}}
            ).then(function (data) {
                _self.sourceList = data.data.list.data;
                _self.totalPage = data.data.list.last_page;
                _self.curPage = data.data.list.current_page;
        });
    },
    mounted(){
        document.getElementsByClassName('sourceInformation')[0].addEventListener('scroll', this.scroll);
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .sourceInformation
        padding-bottom 55px
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        overflow auto
        .totalSourcetitle
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
                    text-align center
                    padding 0.1rem
                    font-size 0.14rem
                    font-weight bold
        .mainContent
            >div
                float left
                width 33.3%
                border 1px solid #ddd
                height 0.5rem
                display flex
                justify-content center
                align-items center
                border-bottom 0
                &:nth-of-type(2)
                    border-left 0
                    border-right 0
                span
                    display block
                    padding 0.1rem
                    font-size 0.14rem
                    text-align center
</style>
