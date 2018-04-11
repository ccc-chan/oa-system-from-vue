import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Layout from '@/components/layout'
import Index from '@/components/index'
import User from '@/components/user'
import UserUpdate from '@/components/userUpdate'
import ResourseTotal from '@/components/resourseTotal'
import ResourseTotal_detail from '@/components/resourseTotal_detail'
import ResourseTotal_add from '@/components/resourseTotal_add'
import AreaDivide from '@/components/areaDivide'
import AreaDivideDetail from '@/components/areaDivideDetail'
import DailySummary from '@/components/dailySummary'
import DailySummaryDetail from '@/components/dailySummaryDetail'
import DailySummaryAdd from '@/components/dailySummaryAdd'
import SourceInformation from '@/components/sourceInformation'
import SourceInformationDetail from '@/components/sourceInformationDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta:{index:0},
    },
    {
      path: '/layout',
      component: Layout,
      meta:{index:0},
      children: [
        {
          path: '/index',
          component: Index,
          meta:{index:1},
        },
        {
          path: '/user',
          component: User,
          meta:{index:1},
        },
        {
          path: '/userUpdate',
          component: UserUpdate,
          meta:{index:2},
        },
        {
          path: '/resourseTotal',
          component: ResourseTotal,
          meta: {keepAlive: false},
          meta:{index:1},
        },
        {
          path: '/resourseTotalDetail/:id',
          name:'resourseTotal_detail',
          component: ResourseTotal_detail,
          meta:{index:2},
        },
        {
          path: '/resourseTotalAdd',
          name:'resourseTotal_add',
          component: ResourseTotal_add,
          meta: {keepAlive: false},
          meta:{index:2},
        },
        {
          path: '/areaDivide',
          component: AreaDivide,
          meta: {keepAlive: false},
          meta:{index:1},
        },
        {
          path: '/areaDivideDetail/:id',
          component: AreaDivideDetail,
          meta:{index:2},
        },
        {
          path: '/dailySummary',
          component: DailySummary,
          meta: {keepAlive: false},
          meta:{index:1},
        },
        {
          path: '/dailySummaryDetail/:id',
          component: DailySummaryDetail,
          meta:{index:2},
        },
        {
          path: '/dailySummaryAdd',
          component: DailySummaryAdd,
          meta:{index:2},
        },
        {
          path: '/sourceInformation',
          component: SourceInformation,
          meta:{index:1},
        },
        {
          path: '/sourceInformationDetail/:id',
          component: SourceInformationDetail,
          meta:{index:1},
        },
      ]
    }
  ]
})
