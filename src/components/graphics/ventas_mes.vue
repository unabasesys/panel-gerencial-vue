<template>
  <v-card class="rounded-box-div mb-1 flex-grow-1" :loading="loadComplete">
    <template slot="progress">
      <v-progress-linear color="#69DFC0" indeterminate></v-progress-linear>
    </template>
    <div class="pa-5">
      <span class="nunito-bold-bright-gray-18px"
        >Ventas por mes comparativo</span
      >
      <div class="row mr-1 mb-5 mt-2" style="float: right; margin-top: 30px">
        <!-- <div class="btn-graphic-div">
          <span class="nunito-semi-bold-santas-gray-10px">1H</span>
        </div>
  
        <div class="btn-graphic-div">
          <span class="nunito-semi-bold-santas-gray-10px">3H</span>
        </div>
  
        <div class="btn-graphic-div">
          <span class="nunito-semi-bold-santas-gray-10px">5H</span>
        </div>
  
        <div class="btn-graphic-div">
          <span class="nunito-semi-bold-santas-gray-10px">1D</span>
        </div>
  
        <div class="btn-graphic-div">
          <span class="nunito-semi-bold-santas-gray-10px">1W</span>
        </div>
  
        <div class="btn-graphic-div">
          <span class="nunito-semi-bold-santas-gray-10px">1M</span>
        </div> -->
      </div>
      <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :height="height"
        :width="width"
      />
    </div>
  </v-card>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import numeral from "numeral";
import progressCircular from "../progressCircular.vue";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ...registerables
);

export default {
  name: "BarChart",
  components: { Bar, progressCircular },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 600,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loadComplete: true,
      chartData: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "% Dif",
            type: "line",
            backgroundColor: "#667085",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            label: "2021",
            backgroundColor: "#A8BAF9",
            data: [],
          },
          {
            label: "2022",
            backgroundColor: "#6871EC",
            data: [],
          },
        ],
      },
      chartOptions: {
        categoryPercentage: 0.8, // here
        barPercentage: 0.9, // here
        animation: { easing: "easeInCirc" },
        plugins: {
          legend: {
            labels: {
              position: "bottom",
              // This more specific font property overrides the global property
              font: {
                size: 12,
                family: "Nunito",
                lineHeight: "400",
              },
            },
          },

          tooltip: {
            enabled: true,
            callbacks: {
              label: (tooltipItem, data) => {
                let format = numeral(tooltipItem.raw)
                  .format(" $ 0,0")
                  .replaceAll(",", ".");
                return format;
              },
            },
          },
        },

        scales: {
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, ticks) {
                return (
                  numeral(value / 1000)
                    .format("$ 0,0")
                    .replace(",", ".") + " K"
                );
              },
            },
          },
          x: {
            ticks: {
              font: {
                size: 8,
              },
            },
          },
        },
      },
    };
  },

  methods: {
    loadGraph() {
      this.init();
    },

    init() {
      this.fethData(2021);

      let date = new Date();
      let currentYear = date.getFullYear();
      this.fethData(currentYear);
    },
    async fethData(year) {
      const url = this.$route.query.url;
      const sid = this.$route.query.sid;
      if (sid != undefined && sid != "" && url != undefined && url != "") {
        let date = new Date();
        let currentYear = date.getFullYear();
        let prevYear = currentYear - 1;

        let config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          url: "https://frank.unabase.com/node/get-ventas-mes",
          data: {
            hostname: "https://" + url,
            year,
            sid,
          },
        };

        axios(config).then((respuestas) => {
          respuestas.data[0].forEach((val) => {
            if (year == prevYear) {
              this.chartData.datasets[1].data.push(val[1]);
            }
            if (year == currentYear) {
              this.chartData.datasets[2].data.push(val[1]);
            }
          });

          this.loadComplete = false;
        });
      }
    },
  },
};
</script>

<style>
.btn-graphic-div {
  background-color: #f6f7f8;
  min-width: 30px;
  max-width: 30px;

  min-height: 20px;
  max-height: 20px;

  align-items: center;
  border-radius: 4px !important;
  cursor: pointer;
  margin-right: 2px;
}

.btn-graphic-div:hover {
  background-color: #e4e7ec;
}

.btn-graphic-div > span {
  display: table;
  padding: 2px;
  margin-left: 6px;
}
</style>