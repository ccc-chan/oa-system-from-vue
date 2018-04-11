<template>
    <div>
        <div class="resourseTotal_add">
            <mt-header title="管理地区列表">
              <router-link to="/areaDivide" slot="left">
                <mt-button icon="back">返回</mt-button>
              </router-link>
            </mt-header>
            <mt-cell title="姓名" :value="person.name"></mt-cell>
            <mt-cell title="岗位" :value="person.gw_name"></mt-cell>
            <mt-cell title="负责地区"></mt-cell>
            <mt-cell v-for='item in area' :title="item.name"></mt-cell>
            <mt-button type="primary" @click.native="addArea">添加地区</mt-button>
            <mt-popup v-model="popupVisible" position="bottom">
                <div class="picker-toolbar">
                    <span class="mint-datetime-cancel" @click='cancel'>取消</span>
                    <span class="mint-datetime-confirm" >确定</span>
                </div>
                <div class="province areaBox" v-show="nowIndex===0">
                    <div class="areaItem">
                        <span v-for='item in provinceList' :uid='item.code' @click='province(item.code,item.name)'>{{item.name}}</span>
                    </div>
                </div>
                <div class="city areaBox" v-show="nowIndex===1">
                    <div class="areaItem">
                        <span v-for='item in cityList' :uid='item.code' @click='city(item.code,item.name)'>{{item.name}}</span>
                    </div>
                </div>
                <div class="area areaBox" v-show="nowIndex===2">
                    <div class="areaItem">
                        <span v-for='item in areaList' :uid='item.code' @click='areaV(item.code,item.name)'>{{item.name}}</span>
                    </div>
                </div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            selected:'index',
            nowIndex:0,//默认第一个tab为激活状态
            person:'',
            area:'',
            popupVisible:false,
            areaList:[],
            provinceList:[],
            cityList:[],
            provinceValue:'',
            cityValue:'',
            areaValue:''
        }
    },
    methods:{
        cancel(){
            this.popupVisible = false;
        },
        addArea(){
            this.popupVisible = true;
            this.nowIndex = 0;
        },
        province(code,name){
            this.provinceValue = code;
            this.queryArea(code,'city');
        },
        city(code,name){
            this.cityValue = code;
            this.queryArea(code,'area');
        },
        areaV(code,name){
            this.areaValue = name;
            this.popupVisible = false;
            //分配地区
            this.$axios({
                method:'post',
                url:'http://api.7171.la/v1/Enrolment/RegionDistribution',
                headers:{"token":localStorage.token},
                data: {
                  user_id: this.person.id,
                  prov: this.provinceValue,
                  city: this.cityValue,
                  area: this.cityValue,
                }
            }).then(function (data) {
                Toast(data.data.info);
            });
        },
        queryArea(code,type){
            var _self = this;
            this.$axios.get('http://api.7171.la/ProvCityArea/'+code, {headers:{"token":localStorage.token}})
                .then(function(data){
                    if (type == 'city') {
                        //查询城市
                        _self.nowIndex = 1;
                        _self.cityList = data.data;
                    }else{
                        //查询区
                        _self.nowIndex = 2;
                        _self.areaList = data.data;
                    }
            });
        }
    },
    created(){
        var _self = this;
        this.$axios.get('http://api.7171.la/ProvCityArea/0', {headers:{"token":localStorage.token}})
            .then(function(data){
                _self.provinceList = data.data;
        });
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            var _self = vm;
            var personId = vm.$route.params.id;
            vm.$axios.get('http://api.7171.la/v1/Employee/ResponsibleArea/'+personId,{headers:{"token":localStorage.token}}
                ).then(function (data) {
                    _self.person = data.data.user_info;
                    _self.area = data.data.area;
            });
        });
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .resourseTotal_add
        padding-bottom 55px
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        overflow auto
        .mint-field-core
            text-align right
        button
            display block
            width 90%
            margin 5%
        .picker-toolbar span
            color #1556b8
        .mint-popup-bottom
            width 100%
            height 40%
            .areaBox
                overflow auto
                height 100%
                width 100%
                .areaItem
                    overflow auto
            span
                display block
                font-size 0.15rem
                padding 0.15rem
</style>