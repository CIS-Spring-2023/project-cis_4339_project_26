

<template>
    <main>
        <div>
            <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10 mb-10">
                Login
            </h1>
        </div>
        <form class="flex flex-col justify-center items-center" @submit.prevent="store.login(username, password)" novalidate="true">

        <div class="text-center w-80">
            <label>User Name</label>
            <input type="text" 
            class="mt-2 mb-5 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="username" placeholder="username" required>
        <div class="text-center" >
            <label>Password</label>
            <input type="password" 
            class="mt-2 mb-5 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            v-model="password" placeholder="password" required>
            </div>
            <button class="bg-red-700 text-white rounded">Submit</button>
        </div>
        </form>
    </main>
</template>
<script>
import { useLoggedInUserStore } from "@/store/loggedInUser";


export default {
    data: () => {
        return {
            username: "",
            pasword: "",
        };
    },
    setup() {
        const store = useLoggedInUserStore()
        return {
            store,
        }
    },
    // I think this could be an easier way to get the code to show certain pages to viewer
    // I need more time to figure this out
    data() {
        return {
            isAuthorized: false,
            restrictPages: ['/eventform', '/intakeform']
        }
    }
}
</script>
