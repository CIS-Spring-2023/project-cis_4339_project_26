import { defineStore } from 'pinia'
const apiURL = import.meta.env.VITE_ROOT_API
import axios from 'axios'

//defining a store
export const useLoggedInUserStore = defineStore({
  // id is only required for devtools with the Pinia store
  id: 'loggedInUser',
  //central part of the store
  state: () => {
    return {
      name: "",
      isLoggedIn: false,
      role:'',
    }
  },
  // equivalent to methods in components, perfect to define business logic
  actions: {
    async login(username, password) {
      try {
        const response = await apiLogin(username, password);
        this.$patch({
          isLoggedIn: response.isAllowed,
          name: response.name,
          role: response.role  //added this role to grab the role to determine if editor or viewer
        })
        this.$router.push("/home"); // if it doesn't work, sends back to the login
      } catch(error) {
        console.log(error)
      }
    },
    logout() {
      this.patch({
        name: "",
        isLoggedIn: false
      });
      //this.$router.push("/home");
      // we could do other stuff like redirecting the user
    }
  }
});

//simulate a login - we will later use our backend to handle authentication
//created 2 different users : viewer and editor
function checkDB(u, p) {
  let data = {UserName: u, Password: p}
  const verify = axios.post(`${apiURL}/users`, data) 
  const dataVerified = verify.then((res)=>res.data)
    return dataVerified
}

// function apiLogin(u, p) {
//   let loggedIn = [
//     {
//       name: 'e',
//       password: 'e',
//       role: 'editor'
//     },
//     {
//       name: 'v',
//       password: 'v',
//       role: 'viewer'
//     }
//   ]
async function apiLogin(u, p) {
  const DB = await checkDB(u, p)
  if (DB.length > 0) {
    return Promise.resolve({ Allowed:true, role:DB[0].Role, name:[0].FirstName })
  }else{
    return Promise.reject(new Error("invalid credentials")); // this is not working
  }
}
  

