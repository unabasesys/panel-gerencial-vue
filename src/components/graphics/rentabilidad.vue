<template>
  <div>
      <span class="nunito-bold-bright-gray-18px">Rentabilidad</span>

      <selectGraphic />

      <Pie
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="300"
        :height="150"
      />
  </div>
</template>

<script>
import { Pie } from "vue-chartjs/legacy";
import selectGraphic from "../selector/select_graphic.vue";

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
        labels: ["2019", "2018"],
        datasets: [
          {
            backgroundColor: ["#20A789", "#69DFC0"],
            data: [10, 20],
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
      },
    };
  },
};
</script>

<style>
</style>