<script>
import { DateTime } from 'luxon'
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
  methods: {
    handleSubmitForm() {
      // make API call to update service
      axios
        .put(`${apiURL}/services/${this.service.id}`, {
          name: this.name
        })
        .then(response => {
          this.success = true // update success variable if API call is successful
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Modify Services 
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold"> Service name</h2>
       
        <div class="flex flex-col">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="name"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter Service name"
            />
          </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Update Service
          </button>
          <br>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >
            Delete Service
          </button>
         
        </div>
      </div>
    </div>
  </main>
</template>