<template>
  <main class="main-comp">
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Manage Services
    </h1>
    <br />
    <table>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Modify</th>
      </tr>
      <!-- Loop through all services and display them in table rows -->
      <tr v-for="service in services" :key="service.ServiceName">
        <td>{{ service.ServiceName }}</td>
        <td>{{ service.isActive ? 'Active' : 'Inactive' }}</td>
        <td>
          <!-- Clicking this button will route user to edit service page -->
          <button @click="editService(service._id)" style="background-color: #8B0000; color: white;">Edit</button>
        </td>
      </tr>
    </table>
  </main>
</template>
<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "ManageServices",
  data() {
    return { services: [] };
  },
  mounted() {
    // Fetch all services from server and update the services data
    axios
      .get("http://localhost:3000/services")
      .then((resp) => {
        this.services = resp.data;
      })
      .catch((error) => {
        console.error(error);
        this.services = [];
      });
  },
  methods: {
    // Route user to edit service page
    editService(id) {
      router.push({ path: `/updateservices/${id}` });
    },
  },
};
</script>
<style scoped>
.main-comp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

table {
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
}

th,
td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2ecec;
}

tr:nth-child(even) {
  background-color: #faf6f6;
}
</style>