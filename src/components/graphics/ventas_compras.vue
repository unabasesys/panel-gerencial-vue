<template>
  <div>
    <span class="nunito-bold-bright-gray-18px">Ventas / Compras</span>
    <selectGraphic />
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

    <div style="float: left">
      <v-switch
        v-model="switch_por_gastar"
        label="Por gastar"
        dense
        solo
        color="#F47975"
        @change="setPorGastar()"
      ></v-switch>
    </div>
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
            label: "Compras",
            backgroundColor: "#F47975",
            data: [],
          },
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
    setPorGastar() {
      this.chartData.datasets[0].data = []
      this.costos_directos.map((val, index) => {
        //12= acumulado
        if (index != 12) {
          if (this.switch_por_gastar) {
            let sum =
              val.value +
              this.por_gastar[index].value +
              this.gastos_generales[index].value;
            this.chartData.datasets[0].data.push(sum);
          } else {
            let sum = val.value + this.gastos_generales[index].value;
            this.chartData.datasets[0].data.push(sum);
          }
        }
      });
    },
    async fethData() {
      let url = this.$route.query.url;

      let date = new Date();

      let c_date =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://" + url + "/node/get-ventas-compras",
        data: {
          hostname: "https://" + url,
          date_from: date.getFullYear(),
          por_gastar: true,
        },
      };

      await axios(config).then((respuestas) => {
        this.gastos_generales = respuestas.data[0].gastos_generales.suma.months;
        this.por_gastar = respuestas.data[0].por_gastar.suma.months;
        this.costos_directos = respuestas.data[0].costos_directos.suma.months;

        this.costos_directos.map((val, index) => {
          //12= acumulado
          if (index != 12) {
            let sum =
              val.value +
              this.por_gastar[index].value +
              this.gastos_generales[index].value;
            this.chartData.datasets[0].data.push(sum);
          }
        });
        debugger;
        respuestas.data[0].ventas.suma.months.map((val, index) => {
          //12= acumulado
          if (index != 12) {
            this.chartData.datasets[1].data.push(val.value);
          }
        });
      });
    },
  },

  mounted() {
    this.fethData();
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