<template>
  <div>
    <span class="nunito-bold-bright-gray-18px">Ventas por cliente</span>
    <progressCircular :statusSpinner="loadComplete" />
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
      class="mt-6"
    />
  </div>
</template>
  
  <script>
import { Bar } from "vue-chartjs/legacy";
import { Chart, registerables } from "chart.js";
import selectGraphic from "../selector/select_graphic.vue";
import axios from "axios";
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
  components: { Bar, selectGraphic,progressCircular },
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
      loadComplete: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Ventas",
            backgroundColor: "#69DFC0",
            data: [],
          },
        ],
      },
      chartOptions: {
        categoryPercentage: 0.8, // here
        barPercentage: 0.9, // here
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
                let format =
                  numeral(tooltipItem.raw)
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
              beginAtZero: true,
              // Include a dollar sign in the ticks
              callback: function (value, index, ticks) {
                return (
                  numeral(value / 1000)
                    .format("$ 0,0")
                    .replaceAll(",", ".") + " K"
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

  computed: {},

  methods: {
    loadGraph(data) {
      const cutName = (name) => {
        return name.length > 5 ? name.substring(0, 12) + "..." : name;
      };

      data.forEach((val) => {
        this.chartData.labels.push(cutName(val.name));
        this.chartData.datasets[0].data.push(val.data);
      });

      this.loadComplete = true
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