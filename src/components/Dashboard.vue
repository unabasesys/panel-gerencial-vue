<template>
  <div class="background-general">
    <Aside :username="username" v-if="activeAside" />
    <Navbar v-if="activeNav" />

    <div id="container" class="content no-collapsed">
      <div class="ml-5">
        <v-row>
          <v-col cols="12" class="mt-5">
            <span class="nunito-semi-bold-santas-gray-12px">Dashboard</span>
          </v-col>
          <v-col cols="12" style="margin-top: -20px">
            <span class="nunito-semi-bold-bright-gray-24px"
              >Buen día, {{ user }}!</span
            >
          </v-col>
        </v-row>

        <v-row style="padding-top: 20px">
          <v-col
            cols="2"
            v-for="item in indicadores"
            :key="item.name"
            style="margin-right: 30px"
          >
            <v-card
              class="rounded-box"
              width="210"
              height="120"
              color="#ffffff"
              outlined
            >
              <div class="row mt-1 ml-2">
                <div cols="6" style="min-width: 180px">
                  <span class="nunito-semi-bold-santas-gray-12px">{{
                    item.name
                  }}</span>
                </div>
                <div cols="6">
                  <v-icon size="12" color="#98A2B3">ub-tres_puntos</v-icon>
                </div>
              </div>

              <div class="row mt-4">
                <div cols="6">
                  <div class="circle-responsive ml-4">
                    <v-avatar color="#D0F7EB" size="50">
                      <v-icon size="40">{{ item.icon }}</v-icon>
                    </v-avatar>
                  </div>
                </div>

                <div cols="6" class="mt-2">
                  <span class="nunito-normal-16px">${{ item.nValue }}</span>
                </div>
              </div>

              <div class="row">
                <div cols="6" style="min-width: 150px">
                  <span class="nunito-semi-bold-santas-gray-10px ml-6"
                    >Informatin text</span
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
        <v-row style="padding-top: 20px">
          <v-col cols="7" style="margin-right: 30px">
            <v-card
              class="rounded-box"
              min-width="650"
              min-height="520"
              color="#ffffff"
              outlined
            >
              <div class="row mt-1 ml-5 mt-5">
                <div cols="8">
                  <ventas />
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Aside from "../components/Aside.vue";
import ventas from "../components/graphics/ventas_mes.vue";
import { timeStamp } from "console";
export default {
  components: {
    Navbar,
    Aside,
    ventas,
  },

  data() {
    return {
      username: this.$route.params.username,
      user: "",
      activeAside: true,
      activeNav: true,
      indicadores: [
        {
          name: "Cotizaciones por aprobar",
          nValue: this.randomNum(),
          icon: "ub-cot_por_aprobar",
          percent: 0,
        },
        {
          name: "Cotizaciones vencidas",
          nValue: this.randomNum(),
          icon: "ub-cot_vencidas",
          percent: 15,
        },
        {
          name: "Negocios por facturar",
          nValue: this.randomNum(),
          icon: "ub-neg_por_facturar",
          percent: 0,
        },
        {
          name: "Por cobrar",
          nValue: this.randomNum(),
          icon: "ub-por_cobrar",
          percent: 35,
        },

        {
          name: "Por pagar",
          nValue: this.randomNum(),
          icon: "ub-por_pagar",
          percent: 0,
        },
      ],
    };
  },

  methods: {
    randomNum() {
      let res = parseInt(Math.random() * (20000000 - 1000));
      return this.formatNumber(res);
    },
    formatNumber(num) {
      return String(
        new Intl.NumberFormat("de-DE").format(
          parseFloat(Math.round(String(num).replace(",", ".")))
        )
      );
    },
  },

  mounted() {
    let is = this.$route.params.from;
    if (is === "v3") {
      this.activeAside = false;
      this.activeNav = false;
      this.user = this.$route.params.user;
      document
        .getElementsByClassName("no-collapsed")[0]
        .classList.remove("no-collapsed");
    }
  },
};
</script>

<style>
.circle-responsive {
  min-width: 60px;
  min-height: 60px;

  max-height: 60px;
  max-width: 60px;
  border-radius: 50%;
}

.rounded-box {
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px !important;
  border-radius: 20px !important;
  max-width: 400px;
  background-color: white;
}

.background-general {
  background-color: #fafafb;
}
</style>