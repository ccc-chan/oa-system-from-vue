<template>
  <div id="app">
    <Zonav></Zonav>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Login from './components/login'
import Znav from './components/nav'
export default {
  components:{
    Login : Login,
    Zonav:Znav
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    height 100%
</style>
