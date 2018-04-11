<template>
    <div class="resourseTotalDetail">
        <mt-header title="生源记录详情信息">
          <router-link to="/resourseTotal" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
        </mt-header>
        <mt-cell title="录入人" :value='person.user_name'></mt-cell>
        <mt-cell title="学校名称" :value='person.school_name'></mt-cell>
        <mt-cell title="联系人" :value='person.contact'></mt-cell>
        <mt-cell title="联系方式" :value='person.phone'></mt-cell>
        <mt-cell title="生源总数量" :value='person.t_pupils_num'></mt-cell>
        <mt-cell title="毕业生数量" :value='person.graduate_num'></mt-cell>
        <mt-cell title="计划生源数" :value='person.p_pupils_num'></mt-cell>
        <mt-cell title="是否需要支持"  v-if="person.is_support == '1'">是</mt-cell>
        <mt-cell title="是否需要支持" v-else>否</mt-cell>
        <mt-cell title="招待费" :value='person.entertain_money'></mt-cell>
        <mt-cell title="劳务费" :value='person.services_money'></mt-cell>
        <div class="review">
            <mt-button @click="shenhe()" v-if="person.st=='0'" class="shenhe" type="primary">审核</mt-button>
            <mt-button @click="check()" class="checkShenhe" type="primary">查看审核</mt-button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    data () {
        return {
            person:'',
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            var _self = vm;
            var personId = vm.$route.params.id;
            vm.$axios.get('http://api.7171.la/v1/Enrolment/get_SchoolAnalysis/'+personId,{headers:{"token":localStorage.token}}
                ).then(function (data) {
                    console.log(data.data);
                    _self.person = data.data;
            });
        });
    },
    methods:{
        shenhe(){
            var personId = this.$route.params.id;
            var _self = this;
            console.log(personId);
            MessageBox.confirm('确认"'+_self.person.school_name+'"劳务费?').then(action => {
                _self.$axios({
                    method:'post',
                    url:'http://api.7171.la/v1/Enrolment/CheckSchool',
                    headers:{
                        "token":localStorage.token
                    },
                    data:{
                        'said':personId
                    }
                }).then(function (data) {
                    //console.log(data.data);
                    Toast(data.data.msg);
                });
            });
        },
        check(){
            var personId = this.$route.params.id;
            this.$axios.get('http://api.7171.la/v1/Enrolment/CheckSchool/'+personId,{headers:{"token":localStorage.token}}).then(function (data) {
                    Toast(data.data+"已审核");
            });
        }
    },
    watch: {
        '$route': function () {
            this.personId = this.$route.params.id;
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .resourseTotalDetail
        padding-bottom 55px
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        overflow auto
    .review
        width 100%
        button
            width 44%
            height 30px
            float right
            margin 0.5rem 3%
        .checkShenhe
            background #e38d13
            border-color #e38d13
</style>