<template>
  <v-card class="rounded-box-div mb-1 flex-grow-1" :loading="loadComplete">
    <template slot="progress">
      <v-progress-linear color="#69DFC0" indeterminate></v-progress-linear>
    </template>
    <div class="pa-5">
      <span class="nunito-bold-bright-gray-18px"
        >Rentabilidad año en curso</span
      >

      <v-row class="mr-2">
        <v-col cols="12" md="12">
          <v-select
            :items="items"
            v-model="periodoSelect"
            label="Periodo"
            class="customSelect"
            solo
            dense
            @change="setRentabilidadPeriodo()"
          >
            <template slot="append">
              <v-icon size="5">ub-arrow_down</v-icon>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <Pie
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="400"
        :height="250"
      />
    </div>
  </v-card>
</template>

<script>
import { Pie } from "vue-chartjs/legacy";
import axios from "axios";
import selectGraphic from "../selector/select_graphic.vue";
import numeral from "numeral";
import progressCircular from "../progressCircular.vue";
import { mapMutations, mapState, mapGetters } from "vuex";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "PieChart",
  components: {
    Pie,
    selectGraphic,
    progressCircular,
  },
  props: {
    chartId: {
      type: String,
      default: "pie-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
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
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loadComplete: true,
      items: [this.getCurrentYear() - 1, this.getCurrentYear()],
      periodoSelect: "",
      chartData: {
        labels: ["Total venta", "Rentabilidad"],
        datasets: [
          {
            backgroundColor: ["#20A789", "#69DFC0"],
            data: [],
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        animation: { easing: "easeInCirc" },
        responsive: true,
        plugins: {
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
          /** Imported from a question linked above. 
          Apparently Works for ChartJS V2 **/
          datalabels: {
            formatter: (value, dnct1) => {
              let sum = 0;
              let dataArr = dnct1.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += Number(data);
              });

              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: "#ff3",
          },
        },
      },
    };
  },

  methods: {
    ...mapMutations({
      setSpinner: "SET_SPINNER",
    }),
    getCurrentYear() {
      let date = new Date();
      return date.getFullYear();
    },
    loadGraph(data) {
      if (data[0].acumulado < 0) {
        this.chartData.datasets[0].backgroundColor[0] = "#D83934";
      }
      if (data[0].acumulado > 0) {
        this.chartData.datasets[0].backgroundColor[0] = "#20A789";
      }
      if (data[0].rentabilidad < 0) {
        this.chartData.datasets[0].backgroundColor[1] = "#D83934";
      }
      if (data[0].rentabilidad > 0) {
        this.chartData.datasets[0].backgroundColor[1] = "#69DFC0";
      }

      this.chartData.datasets[0].data.push(data[0].acumulado);
      this.chartData.datasets[0].data.push(data[0].rentabilidad);

      this.loadComplete = false;
    },
    async setRentabilidadPeriodo() {
      this.fethData(this.periodoSelect);
    },
    async fethData(year = "") {
      const url = this.$route.query.url;
      const sid = this.$route.query.sid;
      if (sid != undefined && sid != "" && url != undefined && url != "") {
        this.loadComplete = true;
        this.chartData.datasets[0].data = [];
        let date = new Date();
        const year_ = year != "" ? year : date.getFullYear();
        let config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          url: "https://frank.unabase.com/node/get-ventas-compras",
          data: {
            hostname: "https://" + url,
            date_from: year_,
            por_gastar: true,
            sid,
          },
        };

        await axios(config).then((respuestas) => {
          let acumulado_ventas =
            respuestas.data[0].ventas.suma.months[12].value;
          let rentabilidad_final =
            respuestas.data[0].resultado.months[12].value;

          if (acumulado_ventas < 0) {
            this.chartData.datasets[0].backgroundColor[0] = "#D83934";
          }
          if (acumulado_ventas > 0) {
            this.chartData.datasets[0].backgroundColor[0] = "#20A789";
          }
          if (rentabilidad_final < 0) {
            this.chartData.datasets[0].backgroundColor[1] = "#D83934";
          }
          if (rentabilidad_final > 0) {
            this.chartData.datasets[0].backgroundColor[1] = "#69DFC0";
          }

          this.chartData.datasets[0].data.push(acumulado_ventas);
          this.chartData.datasets[0].data.push(rentabilidad_final);
          this.loadComplete = false;
        });
      }
    },
  },
};
</script>

<style>
</style>