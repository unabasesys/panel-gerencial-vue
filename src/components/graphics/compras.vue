<template>
  <div>
    <span class="nunito-bold-bright-gray-18px">Costos por mes comparativo</span>
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
import axios from "axios";
import { Chart, registerables } from "chart.js";
import selectGraphic from "../selector/select_graphic.vue";
import numeral from "numeral";

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

  por_gastar: [],
  gastos_generales: [],
  costos_directos: [],
  components: { Bar, selectGraphic },
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
      switch_por_gastar: true,
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
            label: "2021",
            backgroundColor: "#D83934",
            data: [],
          },
          {
            label: "2022",
            backgroundColor: "#F8AFAC",
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
  methods: {
    loadGraph(data_current_year,data_past_year) {
      data_past_year.forEach((val) => {
        this.chartData.datasets[0].data.push(val.compras_past);
      });

      data_current_year.forEach((val) => {
        this.chartData.datasets[1].data.push(val.compras);
      });

    },

    setPorGastar() {
      this.chartData.datasets[0].data = [];
      this.costos_directos.forEach((val, index) => {
        if (this.switch_por_gastar) {
          let sum = val.compras;
          this.chartData.datasets[0].data.push(sum);
        } else {
          let sum = val.compras - val.por_gastar;
          this.chartData.datasets[0].data.push(sum);
        }
      });
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