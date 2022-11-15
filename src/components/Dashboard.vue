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
              >Buen día, {{ username }}!</span
            >
          </v-col>
        </v-row>

        <v-row>
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
        <v-row class="mr-2">
          <v-col cols="7" class="d-flex" style="flex-direction: column">
            <v-card class="pa-5 rounded-box-div flex-grow-1">
              <Ventas />
            </v-card>
          </v-col>
          <v-col cols="5" class="d-flex" style="flex-direction: column">
            <v-card class="pa-5 rounded-box-div mb-1 flex-grow-1">
              <Rentabilidad />
            </v-card>
            <v-card class="pa-5 rounded-box-div mb-1 flex-grow-1">
              <Tareas />
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mr-2">
          <v-col cols="7" class="d-flex" style="flex-direction: column">
            <v-card class="pa-5 rounded-box-div flex-grow-1">
              <VentasCliente />
            </v-card>
          </v-col>
          <v-col cols="5" class="d-flex" style="flex-direction: column">
            <v-card class="pa-5 rounded-box-div flex-grow-1">
              <VentasCompras />
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
import Ventas from "../components/graphics/ventas_mes.vue";
import Rentabilidad from "../components/graphics/rentabilidad.vue";
import Tareas from "../components/graphics/tareas.vue";
import VentasCliente from "../components/graphics/ventas_cliente.vue";
import VentasCompras from "../components/graphics/ventas_compras.vue";
import axios from "axios";
import rentabilidadVue from "../components/graphics/rentabilidad.vue";

export default {
  components: {
    Navbar,
    Aside,
    Ventas,
    Rentabilidad,
    Tareas,
    VentasCliente,
    VentasCompras,
  },
  data() {
    return {
      username: this.$route.query.user,
      user: "",
      activeAside: true,
      activeNav: true,
      justify: ["start", "center", "end", "space-around", "space-between"],
      indicadores: [
        {
          name: "Cotizaciones por vencer",
          nValue: 0,
          icon: "ub-cot_por_aprobar",
          percent: 0,
        },
        {
          name: "Negocios por facturar",
          nValue: 0,
          icon: "ub-neg_por_facturar",
          percent: 0,
        },
        {
          name: "Facturas por cobrar",
          nValue: 0,
          icon: "ub-por_cobrar",
          percent: 0,
        },
        {
          name: "Por justificar",
          nValue: 0,
          icon: "ub-por_cobrar",
          percent: 0,
        },
        {
          name: "Por pagar",
          nValue: 0,
          icon: "ub-por_pagar",
          percent: 0,
        },
      ],
      //Rentabilidad
      acumulado: [],
      final: [],

      //Ventas compras
      ventas: [],
      compras: [],
    };
  },

  methods: {
    formatNumber(num) {
      return String(
        new Intl.NumberFormat("de-DE").format(
          parseFloat(Math.round(String(num).replace(",", ".")))
        )
      );
    },

    async fethDataIndicadores() {
      const url = this.$route.query.url;
      const sid = this.$route.query.sid;
      debugger
      if (sid != undefined && sid != "" && url != undefined && url != "") {
        let date = new Date();
        let dateTo =
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear();

        let date_ = new Date(date.getFullYear(), date.getMonth(), 1);
        let dateFrom =
          date_.getDate() +
          "-" +
          (date_.getMonth() + 1) +
          "-" +
          date_.getFullYear();

        debugger;
        //https://dev3.unabase.com/4DACTION/_V3_getVentasClienteReporte?q=&q2=&fecha_asignacion=true&estado_en_proceso=true&estado_cerrado=true&date_from=2022&date_to=2022&param_1=&estado_compras=

        let config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          url: "https://" + url + "/node/get-indicadores",
          data: {
            hostname: "https://" + url,
            date_from: dateFrom,
            date_to: dateTo,
            sid,
          },
        };

        axios(config).then((respuestas) => {
          debugger;

          this.indicadores[0].nValue = this.formatNumber(
            respuestas.data[0].por_vencer
          );
          this.indicadores[1].nValue = this.formatNumber(
            respuestas.data[0].por_facturar
          );
          this.indicadores[2].nValue = this.formatNumber(
            respuestas.data[0].por_cobrar
          );
          this.indicadores[3].nValue = this.formatNumber(
            respuestas.data[0].por_justificar
          );
          this.indicadores[4].nValue = this.formatNumber(
            respuestas.data[0].por_pagar
          );
        });
      }
    },

    async verifySession() {
      let sid = () => {
        // var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") {
            c = c.substring(1);
          }
          // if (c.indexOf(name) == 0) {
          if (c.match(/UNABASE/g)) {
            return c.substring(c.indexOf("UNABASE"));
          }
        }
        return "";
      };

      let sid_ = sid();

      let getInfo = async () => {
        let config = {
          method: "get",
          url: `https://${this.$route.params.web}/4DACTION/_light_get_server_info?sid=${sid_}`,
        };
        try {
          let res = await axios(config);
          return res;
        } catch (err) {
          throw err;
        }
      };

      getInfo().then((res) => {
        if (!res.data.logged_in) {
          location.href = `${window.location.origin}`;
        }
      });
    },

    async fetchData() {
      const url = this.$route.query.url;
      let date = new Date();
      let dateTo =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

      let date_ = new Date(date.getFullYear(), date.getMonth(), 0);
      let dateFrom =
        date_.getDate() +
        "-" +
        (date_.getMonth() + 1) +
        "-" +
        date_.getFullYear();

      let config_indicadores = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://" + url + "/node/get-indicadores",
        data: {
          hostname: "https://" + url,
          date_from: dateFrom,
          date_to: dateTo,
        },
      };

      let config_ventas_compras = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://" + url + "/node/get-ventas-compras",
        data: {
          hostname: "https://" + url,
          date_from: date_.getFullYear(),
          por_gastar: true,
        },
      };

      let data_indicadores = () => {
        return new Promise((resolve, reject) => {
          axios(config_indicadores)
            .then((r) => {
              resolve(r.data);
            })
            .catch((err) => {
              reject();
            });
        });
      };

      let data_ventas_compras = () => {
        return new Promise((resolve, reject) => {
          axios(config_ventas_compras)
            .then((r) => {
              resolve(r.data);
            })
            .catch((err) => {
              reject();
            });
        });
      };

      Promise.all([data_indicadores(), data_ventas_compras()]).then(
        (respuestas) => {
          respuestas[0][0].rows.forEach((val) => {
            this.indicadores[2].nValue = this.formatNumber(val.por_facturar);
            this.indicadores[3].nValue = this.formatNumber(val.por_cobrar);
            this.indicadores[4].nValue = this.formatNumber(val.por_pagar);
          });

          try {
          } catch (error) {
            console.log(error);
          } finally {
          }
        }
      );
    },
  },

  async mounted() {
    let is = this.$route.query.from;
    if (is === "v3") {
      //this.verifySession();
      this.activeAside = false;
      this.activeNav = false;
      this.user = this.$route.params.user;
      document
        .getElementsByClassName("no-collapsed")[0]
        .classList.remove("no-collapsed");
      this.fethDataIndicadores();
      //this.fetchData();
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

.rounded-box-div {
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px !important;
  border-radius: 20px !important;
  background-color: white;
}

.background-general {
  background-color: #fafafb;
}
</style>