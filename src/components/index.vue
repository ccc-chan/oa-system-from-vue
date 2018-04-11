<template>
    <div class="index">
        <!-- <Zonav></Zonav> -->
        <mt-tab-container class="page-tabbar-container">
            首页
            <mt-tab-container-item id="首页">
              <!-- <mt-cell v-for="n in 10" :title="'首页 ' + n" /> -->

            </mt-tab-container-item>
        </mt-tab-container>
        <!-- <Zfooter></Zfooter> -->
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
    /*components:{
        Zfooter: Zfooter,
        Zonav:Znav,
    },*/
    methods: {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../stylus/base.stylus";
    .index
        height 100%
</style>
