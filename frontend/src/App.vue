<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { useLoggedInUserStore } from "@/store/loggedInUser";
import { storeToRefs } from 'pinia';


export default {
  name: 'App',
  data() {
    return {
      orgName: 'Dataplatform',
      allowed: useLoggedInUserStore()
    }
  },
  created() {
    // axios.get(`${apiURL}/org`).then((res) => {
    //   this.orgName = res.data.name
    // })
  }, 
  methods: {
    logout() {
      allowed.role = ''

    }   
}
}
</script>
<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\nonprofit.svg" />
        </section>
        <!-- This allows us to hide the navbar for the login page = -->
        <nav v-if="!$route.meta.hideNavbar" class="mt-10">
          <!-- <nav class="mt-10"> -->
          <ul class="flex flex-col gap-4">
            <li> <!-- Added dashboard link to make separate than login -->
              <router-link to="/home">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/findevents">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
            
            <li>
              <router-link to="/findclient">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Client
              </router-link>
            </li>
            <li>
              <router-link to="/listservices">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Services
              </router-link>
            </li>
            <li>
              <router-link v-if="allowed.role === 'editor'" to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>
            <li>
              <router-link v-if="allowed.role === 'editor'" to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <li>
              <router-link v-if="allowed.role === 'editor'" to="/createservices">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Create Services
              </router-link>
            </li>
            <li>
              <router-link v-if="allowed.role === 'editor'" to="/manageservices">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Manage Services
              </router-link>
            </li>
           
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  on-click="logout()"
                  >people</span
                >
               Logout
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)">
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
