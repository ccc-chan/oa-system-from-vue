<template>
    <div class="areaDivide">
        <!-- picker的显示个数 -->
        <div class="choiceSchool">
            <mt-button type="primary" @click.native="picker">选择学校</mt-button>
            <mt-popup v-model="popupVisible" position="bottom">
                <div class="picker-toolbar">
                    <span class="mint-datetime-cancel" >取消</span>
                    <span class="mint-datetime-confirm" @click='confirm'>确定</span>
                </div>
                <mt-picker ref='pickerObj' :slots="slots"></mt-picker>
            </mt-popup>
        </div>
        <div class="contentBg">
            <div class="area-title">
                <div>
                    <span>姓名</span>
                </div>
                <div>
                    <span>岗位</span>
                </div>
            </div>
            <div v-for='item in peopleList'>
                <router-link :to="'areaDivideDetail/'+item.id">
                    <div class="area-content">
                        <div>
                            <span>{{item.name}}</span>
                        </div>
                        <div>
                            <span>{{item.gw_name}}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            popupVisible:false,//picker组件显示和关闭
            slots:[{values: []}],
            type:'',
            schoolList:[],
            peopleList:[],
        }
    },
    methods: {
        picker(){
            this.popupVisible=true;
        },
        confirm(){
            var id;
            var values = this.$refs.pickerObj.getValues();
            for(var i=0;i<this.schoolList.length;i++){
                if (values[0] == this.schoolList[i].school_name) {
                    id = this.schoolList[i].id;
                }
            }
            if (values[0] != "请选择") {
                var _self = this;
                this.$axios({
                    method:'get',
                    url:'http://api.7171.la/v1/Enrolment/UserDistribution/'+_self.type+'?sid='+id,
                    headers:{
                        "token":localStorage.token
                    },
                }).then(function (data) {
                    //console.log(data.data)
                    if(data.data.msg == "该院校没人负责"){
                        Toast(data.data.msg);
                    }else{
                        _self.peopleList = data.data;
                    }
                });
            }
            this.popupVisible=false;
        }
    },
    created(){
        var _self = this;
        this.$axios.get('http://api.7171.la/v1/Enrolment/RegionDistribution',{headers:{"token":localStorage.token}}
            ).then(function (data) {
                _self.type = data.data.type;
                _self.slots[0].values.push("请选择");
                for (var i = 0; i < data.data.school.length ;i++) {
                    _self.slots[0].values.push(data.data.school[i].school_name);
                    _self.schoolList.push(data.data.school[i]);
                };
        });
    },
    mounted(){

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    @import "../stylus/common.stylus";
    .areaDivide
        padding-bottom 55px
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        overflow auto
        background #f1f1f1
        .choiceSchool
            margin 0.15rem
            >button
                display block
                font-size 0.16rem
                padding 0.1rem 0.1rem
                width 100%
                font-weight bold
            .mint-popup-bottom
                width 100%
            .picker-toolbar
                >span
                    font-size 0.16rem
                    display block
                    margin 0.1rem
                    color #1556b8
        .area-title
            overflow hidden
            >div
                float left
                width 49.9%
                background #95cae8
                border 1px solid #ddd
                span
                    display block
                    padding 0.1rem
                    font-size 0.1rem
                    text-align center
                    font-weight bold
        .area-content
            overflow hidden
            >div
                float left
                width 49.9%
                border 1px solid #ddd
                border-top 0
                &:last-of-type
                    border-left 0
            span
                display block
                padding 0.1rem
                font-size 0.14rem
                text-align center
</style>
