import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import DevProjects from '../views/DevProjects.vue'
import ArtProjects from '../views/ArtProjects.vue'
import Archive from '../views/Archive.vue'
import Task from '../views/TaskManager.vue'
import Calendar  from '../views/Calendar.vue'
import {projectAuth} from '../firebase/config'
import { calendarFormat } from 'moment'


Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
   let user = projectAuth.currentUser
   if(!user){
      next({ name: 'Login'})
   }else{
      next()
   }
}
const requireNoAuth = (to, from, next) => {
   let user = projectAuth.currentUser
   if(user){
      next({ name: 'Home'})
   }else{
      next()
   }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireNoAuth
  },
  {
    path: '/devProjects',
    name: 'DevProjects',
    component: DevProjects,
    beforeEnter: requireAuth
  },
  {
    path: '/artProjects',
    name: 'ArtProjects',
    component: ArtProjects,
    beforeEnter: requireAuth
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
    beforeEnter: requireAuth
  },
  {
    path: '/task',
    name: 'Task',
    component: Task,
    beforeEnter: requireAuth
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    beforeEnter: requireAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
