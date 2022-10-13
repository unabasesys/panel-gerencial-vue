<template>
  <div>
    <v-card class="pa-2 rounded-box-div" outlined max-width="800">
      <span class="nunito-bold-bright-gray-18px">Rentabilidad</span>


        <v-row class="mr-2">
          <v-col cols="12" md="12" >
            <v-select
              :items="items"
              label="Mensual"
              class="customSelect"
              dense
              style="float: right;"
            ></v-select>

          </v-col>

        </v-row>



      <div style="display: block">
        <Pie
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="300"
          :height="300"
        />

      </div>
    </v-card>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs/legacy";

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
      },
    };
  },
};
</script>

<style>
.v-input__control {
  max-width: 100px;
}

.v-input__slot {
  background-color: #f6f7f8;
}

.v-select__selections {
  min-height: 30px;
}
</style>