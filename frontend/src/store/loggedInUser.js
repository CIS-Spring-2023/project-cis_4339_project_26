import { defineStore } from 'pinia'

//defining a store
export const useLoggedInUserStore = defineStore({
  // id is only required for devtools with the Pinia store
  id: 'loggedInUser',
  //central part of the store
  state: () => {
    return {
      name: "",
      isLoggedIn: false,
      role:''
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
function apiLogin(u, p) {
  let loggedIn = [
    {
      name: 'e',
      password: 'e',
      role: 'editor'
    },
    {
      name: 'v',
      password: 'v',
      role: 'viewer'
    }
  ]
  console.log(loggedIn)
  for(let i in loggedIn) {
    if(loggedIn[i].name === u && loggedIn[i].password === p && loggedIn[i].role === 'editor') 
    return Promise.resolve({ isAllowed:true, role:loggedIn[i].role, name:loggedIn[i].name })
    if(loggedIn[i].name === u && loggedIn[i].password === p && loggedIn[i].role === 'viewer') 
    return Promise.resolve({ isAllowed:true, role:loggedIn[i].role, name:loggedIn[i].name })
  }
  // if (u === "ed" && p === "ed") return Promise.resolve({ isAllowed: true, name: "John Doe" });
  // if (p === "ed") return Promise.resolve({ isAllowed: false });
  return Promise.reject(new Error("invalid credentials")); // this is not working
}

