<<<<<<< HEAD
<script>//chat gpt was referenced for error finding and merging issues 
import { DateTime } from 'luxon'
import axios from 'axios'
import Chart from 'chart.js/auto'
import AttendanceChart from './barChart.vue'
import AttendanceChart2 from './barChart2.vue'
const apiURL = 'http://localhost:3000';


export default {
  components: {
    AttendanceChart,
    AttendanceChart2 //this is not currently functional and a hard coded version was used instead 
  },
  data() {
    return {
      recentEvents: [],
      labels: [],
      chartData: [],
      loading: false,
      error: null
    }
  },
  mounted() {
    this.getAttendanceData();

    const ctx = document.getElementById('myChart')
=======
<script>
import { DateTime } from 'luxon'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import Chart from 'chart.js/auto'

export default {
  mounted() {
    const ctx = document.getElementById('myChart')

>>>>>>> cd552da... this is the final part
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['77494 ', '77449 ', '77407 ', '77386 ', '77433 ', '77099 '],
        datasets: [
          {
            label: '# of Ppl in Zip Code ',
            data: [4, 19, 21, 29, 23, 17],
            backgroundColor: [
              'rgba(255, 0, 0, 0.7)',
              'rgba(0, 255, 0, 0.7)',
              'rgba(255, 255, 0, 0.7)',
              'rgba(255, 0, 255, 0.7)',
              'rgba(0, 255, 255, 0.7)',
              'rgba(0, 0, 255, 0.7)'
            ],
            borderColor: [
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 1)'
            ],
            borderWidth: .25
          }
        ]
      },
    })
<<<<<<< HEAD

  },
  methods: {
    async getAttendanceData() {
      try {
        this.error = null
        this.loading = true
        const response = await axios.get(`${apiURL}/events/attendees`)
        this.recentEvents = response.data
        this.labels = response.data.map(
          (item) => `${item.name} (${this.formattedDate(item.date)})`
        )
        this.chartData = response.data.map((item) => item.attendees.length)
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: 'Server Response',
            message: err.message
          }
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: 'Unable to Reach Server',
            message: err.message
          }
        } else {
          // There's probably an error in your code
          this.error = {
            title: 'Application Error',
            message: err.message
          }
        }
      }
      this.loading = false
    },
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    // method to allow click through table to event details
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    }
  }}
=======
  }
}
>>>>>>> cd552da... this is the final part
</script>

<template>
  <main>
    <div>
<<<<<<< HEAD
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Welcome
      </h1>
      <br />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
=======
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Welcome
      </h1>
      <br />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
>>>>>>> cd552da... this is the final part
        <div class="ml-10"></div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Event Name</th>
                <th class="p-4 text-left">Event Date</th>
                <th class="p-4 text-left">Number of Attendees</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
<<<<<<< HEAD
              <tr
                @click="editEvent(event._id)"
                v-for="event in recentEvents"
                :key="event._id"
              >
=======
              <tr @click="editEvent(event._id)" v-for="event in recentEvents" :key="event._id">
>>>>>>> cd552da... this is the final part
                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                <td class="p-2 text-left">{{ event.attendees.length }}</td>
              </tr>
            </tbody>
<<<<<<< HEAD
          </table>
          <div>
            <AttendanceChart
              v-if="!loading && !error"
              :label="labels"
              :chart-data="chartData"
            ></AttendanceChart>
            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="text-6xl font-bold text-center text-gray-500 animate-pulse"
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->
            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
          </div>
          <div>
            <!-- <AttendanceChart2
              v-if="!loading && !error"
              :label="labels"
              :chart-data="chartData"
            ></AttendanceChart2> //this is not currently functional and a hard coded version was used instead-->
=======

            <tbody class="divide-y divide-gray-300">
              <tr>
                <td class="p-2 text-left">Event 1</td>
                <td class="p-2 text-left">3/3/2023</td>
                <td class="p-2 text-left">3</td>
              </tr>
              <tr>
                <td class="p-2 text-left">Event 2</td>
                <td class="p-2 text-left">3/25/2023</td>
                <td class="p-2 text-left">5</td>
              </tr>
              <tr>
                <td class="p-2 text-left">Event 3</td>
                <td class="p-2 text-left">4/7/2023</td>
                <td class="p-2 text-left">7</td>
              </tr>
              <tr>
                <td class="p-2 text-left">Event 4</td>
                <td class="p-2 text-left">4/18/2023</td>
                <td class="p-2 text-left">6</td>
              </tr>
              <tr>
                <td class="p-2 text-left">Event 5</td>
                <td class="p-2 text-left">4/30/2023</td>
                <td class="p-2 text-left">4</td>
              </tr>
            </tbody>
          </table>
          <div>
>>>>>>> cd552da... this is the final part
            <br />
            <canvas id="myChart" width="20" height="20"></canvas>
            <br /><br />
            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
<<<<<<< HEAD
              <p
                class="text-6xl font-bold text-center text-gray-500 animate-pulse"
              >
=======
              <p class="text-6xl font-bold text-center text-gray-500 animate-pulse">
>>>>>>> cd552da... this is the final part
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
          </div>
<<<<<<< HEAD

=======
>>>>>>> cd552da... this is the final part
        </div>
      </div>
    </div>
  </main>
<<<<<<< HEAD
</template>
=======
</template>
>>>>>>> cd552da... this is the final part
