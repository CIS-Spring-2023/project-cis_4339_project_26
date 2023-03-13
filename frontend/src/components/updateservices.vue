<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
export default {
  data() {
    return {
      services: [],
      // Parameter for search to occur
      name: '',
      success: false // add success variable
    }
  },
  // methods: {
  //   handleSubmitForm() {
  //     // make API call to update service
  //     axios
  //       .put(`${apiURL}/services/${this.service.id}`, {
  //         name: this.name
  //       })
  //       .then(response => {
  //         this.success = true // update success variable if API call is successful
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }
  // }
}
</script>

<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Modify Services
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Modify service info</h2>
        <div class="flex flex-col">
          <input type="text"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="name" v-on:keyup.enter="handleSubmitForm" placeholder="Enter Service name" />
          <select v-model="status"
            class="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div class="mt-10 flex justify-end">
            <button class="bg-red-700 text-white px-4 py-2 mr-4 rounded" @click="handleSubmitForm">Save</button>
            <button class="bg-red-700 text-white px-4 py-2 rounded" @click="clearSearch">Discard</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

