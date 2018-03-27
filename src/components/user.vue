<template>
    <div class="user">
        <!-- <Zonav></Zonav> -->
        <mt-tab-container class="page-tabbar-container" v-model='selected'>
            我的
            <mt-tab-container-item id="我的">
              <!-- <mt-cell v-for="n in 5" :title="'我的 ' + n" /> -->

            </mt-tab-container-item>
        </mt-tab-container>
        <Zfooter></Zfooter>
    </div>
</template>

<script>
import Zfooter from './footer'
import Znav from './nav'
export default {
    data () {
        return {
            selected: 'user'
        }
    },
    components:{
        Zfooter: Zfooter,
        Zonav:Znav
    },
    methods: {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .user
        height 100%
</style>