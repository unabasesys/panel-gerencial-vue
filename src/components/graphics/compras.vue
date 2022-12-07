<template>
  <div>
    <span class="nunito-bold-bright-gray-18px">Costos por mes comparativo</span>

    <div style="margin-right: 50px; margin-left: 50px" v-if="!loadComplete">
      <div class="loader-line"></div>
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
      class="mt-6"
    />

    <div style="float: left">
      <v-switch
        v-model="switch_por_gastar"
        label="Por gastar"
        dense
        solo
        color="#EA4E49"
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
import { mapGetters } from "vuex";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { load } from "mime";

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
      loadComplete: false,
      switch_por_gastar: true,
      data_current_year: [],
      data_past_year: [],
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
            backgroundColor: "#F8AFAC",
            data: [],
          },
          {
            label: "2022",
            backgroundColor: "#D83934",
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
    ...mapGetters({
      getDataComprasVentas: "getVentasCompras",
    }),
    loadGraph(data_current_year, data_past_year) {
      this.data_current_year = data_current_year;
      this.data_past_year = data_past_year;

      data_past_year.forEach((val) => {
        this.chartData.datasets[0].data.push(val.compras_past);
      });

      data_current_year.forEach((val) => {
        this.chartData.datasets[1].data.push(val.compras);
      });

      this.loadComplete = true;
    },

    setPorGastar() {
      this.chartData.datasets[0].data = [];
      this.chartData.datasets[1].data = [];

      this.data_past_year.forEach((v) => {
        if (this.switch_por_gastar) {
          let sum = v.compras_past;
          this.chartData.datasets[0].data.push(sum);
        } else {
          let sum = v.compras_past - v.por_gastar_past;
          this.chartData.datasets[0].data.push(sum);
        }
      });

      this.data_current_year.forEach((v) => {
        if (this.switch_por_gastar) {
          let sum = v.compras;
          this.chartData.datasets[1].data.push(sum);
        } else {
          let sum = v.compras - v.por_gastar;
          this.chartData.datasets[1].data.push(sum);
        }
      });
    },

    async fethData() {
      const url = this.$route.query.url;
      const sid = this.$route.query.sid;
      if (sid != undefined && sid != "" && url != undefined && url != "") {
        let date = new Date();

        let config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          url: "https://frank.unabase.com/node/get-ventas-compras",
          data: {
            hostname: "https://" + url,
            date_from: date.getFullYear() - 1,
            por_gastar: true,
          },
        };

        await axios(config).then((res) => {
          let only_costos = [];
          const gastos_generales_past =
            res.data[0].gastos_generales.suma.months;
          const por_gastar_past = res.data[0].por_gastar.suma.months;
          const costos_directos_past = res.data[0].costos_directos.suma.months;
          let object_compras = {};

          costos_directos_past.forEach((val, index) => {
            //12= acumulado
            if (index != 12) {
              let sum =
                val.value +
                por_gastar_past[index].value +
                gastos_generales_past[index].value;

              object_compras = {
                compras_past: sum,
                por_gastar_past: por_gastar_past[index].value,
              };

              only_costos.push(object_compras);
            }
          });
          let data_current = this.getDataComprasVentas();
          this.loadGraph(data_current, only_costos);
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

.loading-screen {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 9999;
  top: -10vh;
  right: -5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.loader-line {
  width: 100%;
  height: 3px;
  position: relative;
  overflow: hidden;
  background-color: #f6f7f8;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}

.loader-line:before {
  content: "";
  position: absolute;
  left: -50%;
  height: 3px;
  width: 40%;
  background-color: #e4e7ec;
  -webkit-animation: lineAnim 1s linear infinite;
  -moz-animation: lineAnim 1s linear infinite;
  animation: lineAnim 1s linear infinite;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}

@keyframes lineAnim {
  0% {
    left: -40%;
  }
  50% {
    left: 20%;
    width: 80%;
  }
  100% {
    left: 100%;
    width: 100%;
  }
}
</style>