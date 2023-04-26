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
      <tr v-for="service in services" :key="service.ServiceName">
        <td>{{ service.ServiceName }}</td>
        <td>{{ service.isActive ? 'Active' : 'Inactive' }}</td>
        <td>
          <button @click="editService(service._id)">Edit</button>
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
    editService(id) {
      router.push({ path: `/updateServices/${id}` });
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
  /* add 20px margin to the bottom of the table */
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