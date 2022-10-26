<template>
  <div>
      <span class="nunito-bold-bright-gray-18px">Ventas por cliente</span>
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
  </div>
</template>
  
  <script>
import { Bar } from "vue-chartjs/legacy";
import { Chart, registerables } from "chart.js";
import selectGraphic from "../selector/select_graphic.vue";
import axios from "axios";

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
      default: 300,
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
                return "$ " + value + " M";
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
    async fethData() {
      let url = this.$route.query.url;

      let date = new Date();
      let currentYear = date.getFullYear();
      let prevYear = currentYear - 1;
      //https://dev3.unabase.com/4DACTION/_V3_getVentasClienteReporte?q=&q2=&fecha_asignacion=true&estado_en_proceso=true&estado_cerrado=true&date_from=2022&date_to=2022&param_1=&estado_compras=
      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://" + url + "/node/get-ventas-cliente",
        data: {
          hostname: "https://" + url,
          fecha_asignacion: true,
          estado_en_proceso: true,
          estado_cerrado: true,
          date_from: 2022,
          date_to: 2022,
        },
      };

      const cutName = (name) => {
        return name.length > 5 ? name.substring(0, 12) + '...' : name
      }

      axios(config).then((respuestas) => {
        var size = 10;
        var items = respuestas.data[0].clientes.slice(0, size).map((i) => {
          return i;
        });
        items.forEach((val) => {
          this.chartData.labels.push(cutName(val.nombre));
          this.chartData.datasets[0].data.push(val.neto);
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