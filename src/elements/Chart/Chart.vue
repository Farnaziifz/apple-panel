<template>
  <!-- Chart component for show data in chart.js chart -->
  <div class="card card-chart">
    <div class="card-header" :class="['card-header-' + ChartBackground]">
      <!-- <div class="ct-chart" id="dailySalesChart"></div> -->
      <canvas class="ct-chart" ref="chartRef"></canvas>
    </div>
    <div class="card-body">
      <h4 class="card-title">
        <slot name="CardTopTitle"></slot>
      </h4>
      <p class="card-category">
        <slot name="CardDescription"></slot>
      </p>
    </div>
    <!-- <div class="card-footer">
      <div class="stats">
        <slot name="CardFooterDescription"></slot>

        <slot name="CardFooterText"></slot>
      </div>
    </div> -->
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  // get chart options with props for use in chart
  props: [
    "ChartType",
    "ChartLabel",
    "ChartDataLabels",
    "ChartData",
    "ChartBackground",
  ],
  data() {
    return {
      chartType: this.ChartType,
      chartLabel: this.ChartLabel,
      chartLabels: this.ChartDataLabels,
      chartData: this.ChartData,
      myChart: null,
    };
  },
  watch: {
    //watch for change in ChartType prop and call initializeChart method to render new chart
    ChartType: function(newChartType) {
      this.chartType = newChartType;
      this.initializeChart();
    },
    //watch for change in ChartLabel prop and call initializeChart method to render new chart
    ChartLabel: function(newChartLabel) {
      this.chartLabel = newChartLabel;
      this.initializeChart();
    },
    //watch for change in ChartDataLabels prop and call initializeChart method to render new chart
    ChartDataLabels: function(newChartDataLabels) {
      this.chartLabels = newChartDataLabels;
      this.initializeChart();
    },
    //watch for change in ChartData prop and call initializeChart method to render new chart
    ChartData: function(newChartData) {
      this.chartData = newChartData;
      this.initializeChart();
    },
  },
  mounted() {
    this.initializeChart();
  },
  methods: {
    // create chart with data that passes as props
    initializeChart() {
      // define and set variables for use in chart
      var chart = this.$refs.chartRef;
      var ctx = chart.getContext("2d");
      // check if old chart exists, destroy it
      if (this.myChart) {
        this.myChart.destroy();
      }
      this.myChart = new Chart(ctx, {
        type: this.chartType,
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: this.chartLabel,
              lineTension: 0,
              data: this.chartData,
              fill: false, //under chart
              borderDash: [1, 1], // dashed border
              // pointHoverBackgroundColor: "#55bae7", //nodes backgrounds color on hover
              pointHoverBorderColor: "#55bae7", // nodes border color on hover
              pointBackgroundColor: "white", // color of nodes
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: "white",
              borderWidth: 3,
            },
          ],
        },
        options: {
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 18,
            },
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: "#ededed",
                  borderDash: [1, 1],
                },
                ticks: {
                  fontColor: "white",
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  color: "#ededed",
                  borderDash: [1, 1],
                },
                ticks: {
                  fontColor: "white",
                  fontSize: 14,
                  stepSize: 1,
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.card-footer {
  border-top: none !important;
}

.card-title {
  /* background-color: red; */
  padding-top: 10px;
}
</style>
