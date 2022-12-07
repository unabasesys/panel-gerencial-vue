<template>
  <v-card class="rounded-box-div flex-grow-1" :loading="loadComplete">
    <template slot="progress">
      <v-progress-linear color="#69DFC0" indeterminate></v-progress-linear>
    </template>
    <div class="pa-5">
      <span class="nunito-bold-bright-gray-18px">Ventas / Compras</span>
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
          color="#F47975"
          @change="setPorGastar()"
        ></v-switch>
      </div>
    </div>
  </v-card>
</template>
  
  <script>
import { Bar } from "vue-chartjs/legacy";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import selectGraphic from "../selector/select_graphic.vue";
import numeral from "numeral";
import { mapMutations, mapState, mapGetters } from "vuex";
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

  por_gastar: [],
  gastos_generales: [],
  costos_directos: [],
  components: { Bar, selectGraphic, progressCircular },
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
    ...mapMutations({
      setSpinner: "SET_SPINNER",
      setVentasCompras: "setVentasCompras",
    }),
    loadGraph(data, dataa) {
      data.forEach((val) => {
        this.chartData.datasets[0].data.push(val.compras);
        this.chartData.datasets[1].data.push(val.ventas);
      });

      this.costos_directos = data;
      this.loadComplete = false;

      this.$emit("loadGraphRentabilidad", dataa);
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
    async fethData() {
      const url = this.$route.query.url;
      const sid = this.$route.query.sid;
      if (sid != undefined && sid != "" && url != undefined && url != "") {
        let date = new Date();

        let year = date.getFullYear();

        let config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          url: "https://frank.unabase.com/node/get-ventas-compras",
          data: {
            hostname: "https://" + url,
            date_from: year,
            date_to: year,
            por_gastar: true,
          },
        };
        await axios(config).then((respuestas) => {
          let ventas_compras = [];
          const gastos_generales =
            respuestas.data[0].gastos_generales.suma.months;
          const por_gastar = respuestas.data[0].por_gastar.suma.months;
          const costos_directos =
            respuestas.data[0].costos_directos.suma.months;
          let object_ventas_compras = {};

          costos_directos.forEach((val, index) => {
            //12= acumulado
            if (index != 12) {
              let sum =
                val.value +
                por_gastar[index].value +
                gastos_generales[index].value;

              object_ventas_compras = {
                compras: sum,
                por_gastar: por_gastar[index].value,
                ventas: respuestas.data[0].ventas.suma.months[index].value,
              };
              ventas_compras.push(object_ventas_compras);
            }
          });

          this.setVentasCompras(ventas_compras);
          this.loadGraph(ventas_compras, respuestas);
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