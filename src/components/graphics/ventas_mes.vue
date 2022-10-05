<template>
  <div>
    <div>
      <v-btn min-width="1" max-width="1">
        <span style="font-size: 10px">1H</span>
      </v-btn>
    </div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
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
        responsive: true,
        plugins: {
          legend: {
            labels: {
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
                }
            }
        }
        },
      },
    };
  },
};
</script>

<style>
</style>