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
      <tr v-for="item in list" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.completed ? 'Active' : 'Inactive' }}</td>
        <td><button @click="editService(item.id)">Edit</button></td>
      </tr>
    </table>
  </main>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "EmployeeList",
  data() {
    return { list: [] };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((resp) => {
        this.list = resp.data;
        console.log(resp.data);
      })
      .catch((error) => {
        console.error(error);
        this.list = [];
      });
  },
  methods: {
    editService(serviceId) {
      router.push({ path: `/updateservices?id=${serviceId}` });
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
Make sure to also update your router/index.js file as we've modified the path for the /updateservices route.





