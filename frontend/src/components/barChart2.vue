<script>//used chat gpt to go from the original bar chart to a pie chart 
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  props: {
    label: {
      type: Array
    },
    zipcode: {
      type: Array
    }
  },
  async mounted() {
    const backgroundColor = this.chartData.map(() => this.getColor())
    await new Chart(this.$refs.attendanceChart2, {
      type: 'pie',
      data: {
        labels: this.label,
        datasets: [
          {
            borderWidth: 1,
            backgroundColor: backgroundColor,
            data: this.chartData
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    })
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
