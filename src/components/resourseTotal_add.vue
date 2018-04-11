<template>
    <div>
        <div class="resourseTotal_add">
            <mt-header title="添加生源记录">
              <router-link to="/resourseTotal" slot="left">
                <mt-button icon="back">返回</mt-button>
              </router-link>
            </mt-header>
            <mt-field class='necessary' label="学校名称" placeholder="请输入学校名称" v-model="schoolName"></mt-field>
            <mt-field class='necessary' label="联系人" placeholder="请输入联系人" v-model="contact"></mt-field>
            <mt-field class='necessary' label="联系方式" type='number' placeholder="请输入联系方式" v-model="phone"></mt-field>
            <mt-field class='necessary' label="生源总数量(人)" type='number' placeholder="请输入生源总数量" v-model="t_pupils_num"></mt-field>
            <mt-field class='necessary' label="毕业生数量(人)" type='number' placeholder="请输入毕业生数量" v-model="graduate_num"></mt-field>
            <mt-field class='necessary' label="计划生源数数(人)" type='number' placeholder="请输入计划生源数" v-model="p_pupils_num"></mt-field>
            <mt-cell class='necessary' title="选择地区" v-if="areaList.length == 0" value='请联系上级分配地区'></mt-cell>
            <mt-radio class='necessary' align="right" title="选择地区" v-model="area" v-else :options="areaList"></mt-radio>
            <mt-radio  class='necessary' align="right" title="是否支持" v-model="is_support" :options="['是', '否']"></mt-radio>
            <mt-field class='necessary' label="劳务费" type='number' placeholder="请输入劳务费" v-model="services_money"></mt-field>
            <mt-field class='necessary' label="招待费" type='number' placeholder="请输入招待费" v-model="entertain_money"></mt-field>
            <mt-field label="备注" placeholder="" type="textarea" rows="4" v-model="intro"></mt-field>
            <div class="addBtn">
                <mt-button type="primary" @click='add()'>添加</mt-button>
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
            schoolName:'',
            contact:'',
            phone:'',
            t_pupils_num:'',
            graduate_num:'',
            p_pupils_num:'',
            is_support:'',
            services_money:'',
            entertain_money:'',
            areaList:[],
            area:'',
            intro:''
        }
    },
    created(){
        for (var i = 0; i < this.$store.state.areaList.length; i++) {
            var obj = new Object;
            obj.label = this.$store.state.areaList[i].name;
            obj.value = this.$store.state.areaList[i].code;
            this.areaList.push(obj);
        }
        //console.log(this.areaList)
    },
    methods:{
        add(){
            if(this.is_support == '是'){
                this.is_support == '1';
            }else{
                this.is_support == '0';
            }
            this.$axios({
                method:'post',
                url:'http://api.7171.la/v1/Enrolment/SchoolAnalysis',
                headers:{
                    "token":localStorage.token
                },
                data: {
                  school_name: this.schoolName,
                  contact: this.contact,
                  phone: this.phone,
                  t_pupils_num:this.t_pupils_num,
                  graduate_num:this.graduate_num,
                  p_pupils_num:this.p_pupils_num,
                  is_support:this.is_support,
                  area:this.area,
                  services_money:this.services_money,
                  entertain_money:this.entertain_money,
                  intro:this.intro
                }
            }).then(function (data) {
                console.log(data);
                Toast(data.data.msg);
            });
        },
    }
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
    .necessary
        .mint-cell-text
            position relative
            padding-left 0.15rem
            font-size 0.15rem
            &::before
                position absolute
                content '*'
                color red
                top 5px
                left 0
        .mint-field-core,.mint-radio-label,.mint-cell-value span
            font-size 0.15rem
    .mint-field .mint-cell-title
        flex 1
        height 20px
    .addBtn button
        display block
        width 90%
        margin 5%
        
</style>