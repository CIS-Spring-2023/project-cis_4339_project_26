<template>
  <div class="create-service">
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10 mb-4">
      Create Service
    </h1>
    <!-- Form to create a new service -->
    <form @submit.prevent="submitForm">
      <!-- Input field for service name -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" class="form-control" v-model="service.ServiceName" />
      </div>
      <!-- Dropdown for service status -->
      <div class="form-group">
        <label for="status">Status:</label>
        <select id="status" class="form-control" v-model="service.isActive">
          <option value=true>Active</option>
          <option value=false>Inactive</option>
        </select>
      </div>
      <!-- Button to create the service -->
      <button type="submit" class="mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Create
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "CreateService",
  data() {
    return {
      // Object to hold service details
      service: {
        ServiceName: "",
        isActive: true
      },
      // Flag to display success message
      showSuccessMessage: false
    };
  },
  methods: {
    // Method to submit the form and create the service
    submitForm() {
      // Make a POST request to the API to create the service
      axios
        .post(`http://localhost:3000/services`, this.service)
        .then(() => {
          this.showSuccessMessage = true;
          // Reset form fields and hide success message after 3 seconds
          this.service = {
            ServiceName: "",
            isActive: true
          };
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          // Navigate back to the ManageServices page
          router.push('/manageservices');
        })
        .catch((error) => {
          // Log error to console if service creation fails
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.create-service {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-control {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
</style>