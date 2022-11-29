<template>
  <div>
    <span class="nunito-bold-bright-gray-18px">Mis tareas</span>
    <v-row class="mt-1">
      <v-col
        cols="4"
        v-for="item in indicadores"
        :key="item.name"
        style="margin-right: 60px"
      >
        <v-card
          class="rounded-box"
          width="170"
          height="120"
          color="#F0F5FF"
          outlined
        >
          <div class="row mt-1 ml-2">
            <div cols="6" style="min-width: 140px">
              <span class="nunito-semi-bold-santas-gray-12px">{{
                item.name
              }}</span>
              <v-btn icon @click="toRendiciones(item)">
                <v-icon size="12" color="#98A2B3"
                  >fa-solid fa-square-arrow-up-right</v-icon
                >
              </v-btn>
            </div>
          </div>

          <div class="row mt-2">
            <div cols="6">
              <div class="circle-responsive ml-4">
                <v-avatar color="#FFFFFF" size="50">
                  <v-icon size="40" color="#6871EC">{{ item.icon }}</v-icon>
                </v-avatar>
              </div>
            </div>

            <div cols="6" class="mt-2">
              <span class="nunito-normal-16px">{{ item.nValue }}</span>
            </div>
          </div>

          <div class="row" style="margin-top: -10px">
            <div cols="6" style="min-width: 115px">
              <span class="nunito-semi-bold-santas-gray-10px ml-6"
                >Año en curso</span
              >
            </div>

            <div cols="6" class="">
              <span class="nunito-semi-bold-emerald-14px"
                ><v-icon class="mr-1" size="15">ub-percent</v-icon>+{{
                  item.percent
                }}%</span
              >
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      indicadores: [
        {
          name: "Docs por aprobar",
          type: 'docs',
          nValue: 0,
          icon: "ub-like",
          percent: 0,
        },
        {
          name: "Rendiciones vencidas",
          type: 'fxr',
          nValue: 0,
          icon: "ub-papel",
          percent: 0,
        },
      ],
    };
  },

  methods: {
    loadGraph(data) {
      this.indicadores[0].nValue = data[0].docs_aprobar;
      this.indicadores[1].nValue = data[0].total_rendiciones;
    },
    toRendiciones(item) {
      let url = this.$route.query.url;
      if (url != undefined && item.type != 'docs') {
        window.open(
          `https://${url}/4DACTION/info_rf_vencidas?fromDashboard=true`,
          "_blank" // <- This is what makes it open in a new window.
        );
      }
    },
    formatNumber(num) {
      return String(
        new Intl.NumberFormat("de-DE").format(
          parseFloat(Math.round(String(num).replace(",", ".")))
        )
      );
    },

    async fethData() {
      const url = this.$route.query.url;
      const sid = this.$route.query.sid;
      const username = this.$route.query.user;

      if (
        sid != undefined &&
        sid != "" &&
        url != undefined &&
        url != "" &&
        username != undefined &&
        username != ""
      ) {
        let date = new Date();
        let currentYear = date.getFullYear();
        let prevYear = currentYear - 1;

        let config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          url: "https://" + url + "/node/get-tareas",
          data: {
            date_from: 2022,
            date_to: 2022,
            user: username,
            hostname: "https://" + url,
            sid,
          },
        };

        axios(config).then((respuestas) => {
          debugger;
          this.indicadores[0].nValue = respuestas.data[0].total_doc_por_aprobar;
          this.indicadores[1].nValue =
            respuestas.data[0].total_rendiciones_vencidas;
        });
      }
    },
  },
};
</script>

<style>
</style>