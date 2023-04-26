<template>
  <div class="create-service">
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10 mb-4">
      Create Service
    </h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" class="form-control" v-model="service.ServiceName" />
      </div>
      <div class="form-group">
        <label for="status">Status:</label>
        <select id="status" class="form-control" v-model="service.isActive">
          <option value=true>Active</option>
          <option value=false>Inactive</option>
        </select>
      </div>
      <button type="submit" class="mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Create
      </button>
    </form>
    <div v-if="showSuccessMessage" class="text-green-500 mt-4">
      Service created successfully.
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "CreateService",
  data() {
    return {
      service: {
        ServiceName: "",
        isActive: true
      },
      showSuccessMessage: false
    };
  },
  methods: {
    submitForm() {
      axios
        .post(`http://localhost:3000/services`, this.service)
        .then(() => {
          console.log("Service created successfully.");
          this.showSuccessMessage = true;
          this.service = {
            ServiceName: "",
            isActive: true
          };
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
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