<template>
  <div>
    <mt-tabbar v-model="message" :value="message">
        <mt-tab-item id="index" @click.native='adc("index",homeState)' >
          <!-- <router-link to='/index'> -->
          <!-- <i class="iconfont icon-shouye"></i> -->
          <img slot="icon" :src="homeState">
          首页
          <!-- </router-link> -->
        </mt-tab-item>
        <mt-tab-item id="user" @click.native='adc("user",userState)'>
          <!-- <router-link to='/user'> -->
          <img slot="icon" :src="userState">
          <!-- <i class="iconfont icon-xiazai4"></i> -->
          我的
          <!-- </router-link> -->
        </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import Znav from './nav'
export default {
  data () {
    return {
      message: '',
      uri:'',
      homeState:'../../static/img/home.png',
      userState:'../../static/img/user.png'
    }
  },
  props:{
    //message: String,
  },
  created:function(){
    this.$nextTick(() => {
      this.address(this.$route.path);
    });
  },
  methods: {
    adc(str,stats){
      this.message = str;
    },
    address(url){
      if (url == "/index") {
        this.message = 'index';
        this.homeState = '../../static/img/homeActive.png';
        this.userState = '../../static/img/user.png';
      }else if(url == '/user'){
        this.message = 'user';
        this.userState = '../../static/img/userActive.png';
        this.homeState = '../../static/img/home.png';
      }
    }
  },
  watch: {
    message: function (val, oldVal) {
      // 通过 val 的变更来确定去向
      switch(val){
        case 'index':
          this.$router.push('/index');
        break;
        case 'user':
          this.$router.push('/user');
        break;
      }
    },
    $route (to, from) {
      this.uri = this.$route.path;
      this.address(this.uri);
      this.message = this.uri.slice(1);
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../stylus/base.stylus";
  .mint-tab-item-label
    i
      display block
      padding 5px
      font-size 20px
</style>
