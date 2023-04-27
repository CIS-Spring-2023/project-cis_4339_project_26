import { defineStore } from 'pinia'
const apiURL = import.meta.env.VITE_ROOT_API
import axios from 'axios'
import CryptoJS from 'crypto-js';
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
          isLoggedIn: response.allowed,
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



 function checkDB(u, p) {
  let data = {UserName: u, Password: p}
  const verify = axios.post(`${apiURL}/users`, data)
  const dataVerified = verify.then((res)=>res.data)
  return dataVerified
}
// adding the hash to the password
function hashPwd(entry){
    return CryptoJS.SHA256(entry).toString()
}

async function apiLogin(u, p) {
  const hashedPassword = await hashPwd(p)
  console.log('pass', hashedPassword) // added this to be able to see the password's hash value to save to the DB
  const DB = await checkDB(u, hashedPassword)
  if(DB.length > 0){
     return Promise.resolve({ allowed:true, role:DB[0].Role, name:DB[0].FirstName })
  }else{
    return Promise.reject(new Error("invalid credentials")); // this is not working
  }
  
}

