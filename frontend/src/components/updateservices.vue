<template>
  <div class="create-service">

    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Update Service
    </h1>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="service.ServiceName" />
      </div>
      <div class="input-group">
        <label for="status">Status:</label>
        <select id="status" v-model="service.isActive">
          <option value=true>Active</option>
          <option value=false>Inactive</option>
        </select>
      </div>
      <!-- <button type="submit" class="create-button">Update</button> -->
      <button type="submit" style="background-color: #8B0000; color: white;">Update </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "UpdateService",
  data() {
    return {
      // Initialize the service object
      service: {}
    };
  },
  mounted() {
    // Fetch the service details by ID
    const serviceId = this.$route.params.id;
    axios
      .get(`http://localhost:3000/services/${serviceId}`)
      .then((resp) => {
        // Update the service object with fetched details
        this.service = resp.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    // Submit the form data to update the service
    submitForm() {
      axios
        .put(`http://localhost:3000/services/${this.service._id}`, this.service)
        .then(() => {
          console.log("Service updated successfully.");
          // Redirect to the Manage Services page
          router.push('/manageservices');
        })
        .catch((error) => {
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

.input-group {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

input[type="text"],
select {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
}

input[type="text"],
select {
  border: 1px solid rgb(92, 87, 87);
}

.create-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  margin-top: 20px;
}
</style>