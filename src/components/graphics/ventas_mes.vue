<template>
  <div>
    <v-card class="pa-4 rounded-box-div" outlined>
      <span class="nunito-bold-bright-gray-18px"
        >Ventas por mes comparativo</span
      >
      <div class="row mr-1 mb-5 mt-10" style="float: right; margin-top: 30px">
        <div class="btn-graphic-div">
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
        </div>
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
    </v-card>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import { Chart, registerables } from "chart.js";
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
  components: { Bar },
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
            data: [20, 20, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          },
          {
            label: "2018",
            backgroundColor: "#6871EC",
            data: [40, 20, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          },
          {
            label: "2019",
            backgroundColor: "#A8BAF9",
            data: [40, 20, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          },
        ],
      },
      chartOptions: {
        categoryPercentage: 0.8, // here
        barPercentage: 0.98, // here
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
        },

        scales: {
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, ticks) {
                return value + " mil";
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