import Vue from 'vue'
import Router from 'vue-router'
import Setting from '@/page/Setting'
import About from '@/page/About'
import Add from '@/page/Add'
import Home from '@/page/Home'
import Problems from '@/page/Problems'
import Logout from '@/page/Logout'
import Problem from '@/page/Problem'
import Announcement from '@/page/Announcement'
import Error from '@/page/Error'
import Edit from '@/page/Edit'
import Register from '@/page/Register'
import Submission from '@/page/Submission'
import Status from '@/page/Status'
import Person from '@/page/Person'
import Contest from '@/page/Contest'
import Ranklist from '@/page/Ranklist'
import AddUser from '@/page/AddUser'
import ClassList from '@/page/ClassList'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/dev',
      name: 'Dev',
      component: Person,
    }, {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/setting/:id',
      name: 'Setting',
      component: Setting,
      meta: {
        NeedLogin: true
      }
    }, {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/add',
      name: 'Add',
      component: Add,
      meta: {
        NeedStaff: true
      }
    },
    {
      path: '/problems',
      name: 'Problems',
      component: Problems,
      meta: {
        NeedStaff: true
      }
    },
    {
      path: '/problem/:id',
      name: 'Problem',
      component: Problem,
      meta: {
        NeedStaff: true
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit
    }, {
      path: '/announcement/:id',
      name: 'Announcement',
      component: Announcement
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/status',
      name: 'Status',
      component: Status,
      meta: {
        NeedLogin: true
      }
    },
    {
      path: '/submission/:id',
      name: 'Submission',
      component: Submission,
      meta: {
        NeedLogin: true
      }
    },
    {
      path: '/contest/',
      name: 'Contest',
      component: Contest,
    }, {
      path: '/ranklist/',
      name: 'Ranklist',
      component: Ranklist,
    }, {
      path: '/user/:id',
      name: 'Person',
      component: Person,
    }, {
      path: '/adduser',
      name: 'AddUser',
      component: AddUser,
      meta: {
        NeedStaff: true
      }
    }, {
      path: '/classlist',
      name: 'ClassList',
      component: ClassList,
      meta: {
        NeedLogin: true
      }
    },
  ]
})