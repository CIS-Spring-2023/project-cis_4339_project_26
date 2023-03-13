import { createRouter, createWebHistory } from 'vue-router'
import { useLoggedInUserStore } from "@/store/loggedInUser"

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
    meta: { 
      requiresAuth: true, 
    }
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue')
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
      next("/home")
    }
  }else{
    next()
  }
})
export default router
