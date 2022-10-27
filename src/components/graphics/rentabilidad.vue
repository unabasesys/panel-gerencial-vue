<template>
  <div>
    <span class="nunito-bold-bright-gray-18px">Rentabilidad año en curso</span>

    <selectGraphic />

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
</template>

<script>
import { Pie } from "vue-chartjs/legacy";
import axios from "axios";
import selectGraphic from "../selector/select_graphic.vue";
import numeral from "numeral";
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
      items: ["Foo", "Bar", "Fizz", "Buzz"],
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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          labels: [
            {
              render: "percentage",
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return 0
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
        let acumulado_ventas = respuestas.data[0].ventas.suma.months[12].value;
        let rentabilidad_final = respuestas.data[0].resultado.months[12].value;
        this.chartData.datasets[0].data.push(acumulado_ventas);
        this.chartData.datasets[0].data.push(rentabilidad_final);
      });
    },
  },

  mounted() {
    this.fethData();
  },
};
</script>

<style>
</style>