<template>
    <div class="sourceInformationDetail">
        <mt-header title='总生源详细信息'>
          <router-link to="/sourceInformation" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
        </mt-header>
        <div class="sourceDetailContent">
            <mt-cell title="学生姓名" :value='msg.name'></mt-cell>
            <mt-cell title="报名学校" :value='msg.school_name'></mt-cell>
            <mt-cell title="性别" :value='msg.sex'></mt-cell>
            <mt-cell title="联系电话" :value='msg.phone'></mt-cell>
            <mt-cell title="QQ号码" :value='msg.qq'></mt-cell>
            <mt-cell title="微信账号" :value='msg.wechatnum'></mt-cell>
            <mt-cell title="毕业学校" :value='msg.finishschool'></mt-cell>
            <mt-cell title="文化程度" :value='msg.culture'></mt-cell>
            <mt-cell title="学号" :value='msg.student_id'></mt-cell>
            <mt-cell title="负责人" :value='msg.cs_name'></mt-cell>
            <mt-cell title="缴费类型" :value='msg.payment_type'></mt-cell>
            <mt-cell title="缴费金额" :value='msg.payment_money'></mt-cell>
            <mt-cell title="录入时间" :value='msg.time'></mt-cell>
            <mt-cell title="信息来源" :value='msg.source'></mt-cell>
            <mt-cell title="家庭地址" :value='msg.address'></mt-cell>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            selected:'index',
            msg:''
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
            vm.$axios.get('http://api.7171.la/v1/Enrolment/get_Reginfo/'+personId,{headers:{"token":localStorage.token}}
                ).then(function (data) {
                    // console.log(data.data);
                    _self.msg = data.data;
            });
        });
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .sourceInformationDetail
        padding-bottom 55px
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        overflow auto
        background #eee
        .sourceDetailContent
            >a
                border-bottom 1px solid #eee
</style>