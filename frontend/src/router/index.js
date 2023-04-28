import { createRouter, createWebHistory } from 'vue-router'
import { useLoggedInUserStore } from "@/store/loggedInUser"
// this page did not get added properly
// make all paths and names lowercase for consistency
const routes = [
  { //added login route; 
    path: '/',
    props: true,
    component: () => import('../views/login.vue'),
    //added meta to hide the navbar = https:chat.openai.com/chat
    meta: { hideNavbar: true }
  },
  {
    path: '/home',
    props: true,
    component: () => import('../components/homePage.vue'),
    meta: { requiresLog: true }
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue'),
    meta: { requiresLog: true }
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue'),
    meta: { requiresLog: true }
  },
  {
    path: '/createservices',
    name: 'createservices',
    component: () => import('../components/createServices.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/manageservices',
    name: 'manageservices',
    component: () => import('../components/manageServices.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/listservices',
    name: 'listservices',
    component: () => import('../components/listServices.vue'),
    meta: { requiresLog: true }
  },
  {
    path: '/updateservices/:id',
    name: 'updateservices',
    component: () => import('../components/updateServices.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue'),
    meta: { requiresAuth: true }
  },
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// add restrictions to pages based on user with navigation guards
// https://router.vuejs.org/guide/advanced/navigation-guards.html  
//https://chat.openai.com/chat

router.beforeEach(async(to, from, next)=>{
  let store = useLoggedInUserStore()
  
  if(to.matched.some((record)=>record.meta.requiresAuth)){
    if(store.role === 'editor'){
      next();
    }else{
      alert("You don't have access!")
      next("/")
    }
    }else if (to.matched.some((record)=>record.meta.requiresLog)){ 
    if(store.role === 'editor' || store.role === 'viewer'){
      next();
    }else{
      alert("You don't have access!")
      next('/')
    }
  } else {
    next()
  }
})
export default router
