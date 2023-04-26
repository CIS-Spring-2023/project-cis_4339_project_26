<script>
import { Chart, registerables } from 'chart.js'
// import { MongoClient } from 'mongodb' // import the MongoClient from the mongodb library
Chart.register(...registerables)

//Zip Codes 
export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  async mounted() {
    const backgroundColor = this.chartData.map(() => this.getColor())
    const borderColor = backgroundColor.map((e) =>
      e.replace(/[\d\.]+\)$/g, '1)')
    )

    // establish a connection to the MongoDB database
    const client = new MongoClient('mongodb://localhost:3000')
    await client.connect()
    const db = client.db('mydatabase')

    // query for zip codes and their associated data
    const collection = db.collection('test')
    const zipCodes = await collection.find().toArray()
    const zipCodeLabels = zipCodes.map((zipCode) => zipCode.code)
    const zipCodeData = zipCodes.map((zipCode) => zipCode.data)

    await new Chart(this.$refs.attendanceChart2, {
      type: 'pie',
      data: {
        labels: zipCodeLabels,
        datasets: [
          {
            borderWidth: 1,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: zipCodeData
          }
        ]
      },
      options: {
        scales: {
          y: {
            ticks: {
              stepSize: 1
            }
          },
          x: {
            gridLines: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    })
    await client.close() // close the database connection
  },
  methods: {
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
    }
  }
}
</script>
<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendanceChart2"></canvas>
  </div>
</template>
