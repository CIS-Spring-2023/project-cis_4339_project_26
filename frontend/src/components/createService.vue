<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
// import axios from 'axios'
// const apiURL = import.meta.ev.VITE_ROOT_API
// issue with line 5 and unsure why. Will need to look into this

export default {
    setup() {
        return { v$: useVuelidate({ $autoDirty: true }) }
    },
    data() {
        return {
            service: {
                name:''
            },
            services: [
                "gotcha",
                "howdy"
            ]
        }
    },
   methods: {
    async handleSubmitForm() {
        // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        // alert('Service has been successfully added.')
        // this.$router.push({ name: 'findevents' }) 
        this.services.push(this.service.name)
    //     axios
    //     .post(`${apiURL}/services`, this.service)//need to make sure that the services is called /services
    //     .then(() => {
    //         alert('Service has been successfully added.')
    //         this.$router.push({ name: 'services' }) 
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    }
   } 
},
// sets validation for various data properties
validations() {
    return {
        service : {
            name: { required }
            }
        }
    }
}

</script>
<!--added all the aesthetics of the create service page-->
<template>
    <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Create New Service
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="handleSubmitForm"> 
            <div class="grid grid-rows-2 grid-cols-3">
                <h2 class="text-2xl font-bold">Service Details</h2>
                <div>
                    <label class="block"></label>
                    <span class="text-gray-700 mr-3">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-96 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name"
                />
                </div>
                <div class="mt-5 ml-4">
                    <button class="bg-red-700 text-white rounded" type="submit">
                        Add New Service
                    </button>
                </div>
            
            </div>
        </form>
        {{ services }}
    </div>
    </main>
</template>