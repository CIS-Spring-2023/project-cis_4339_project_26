

<template>
    <main>
        <div>
            <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
                Login
            </h1>
        </div>
        <form @submit.prevent="store.login(username, password)" novalidate="true">

        <div class="form-group text-center">
            <label>User Name</label>
            <input type="text" class="form-control" v-model="username" placeholder="username" required>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="password" required>
            </div>
            <button class="btn btn-danger mt-3">Submit</button>
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
    }
}
</script>
