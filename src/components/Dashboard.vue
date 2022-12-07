<template>
  <div class="background-general">
    <div id="container" class="content no-collapsed">
      <div class="ml-5">
        <v-row>
          <v-col cols="12" style="margin-top: -20px">
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
              height="130"
              color="#ffffff"
              :loading="loadComplete"
              loader-height="4"
              outlined
            >
              <template slot="progress">
                <v-progress-linear
                  color="#69DFC0"
                  indeterminate
                ></v-progress-linear>
              </template>
              <div class="row mt-2 ml-2">
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
                  <v-progress-circular
                    :size="30"
                    color="#F6F7F8"
                    indeterminate
                    class="ml-10"
                    v-if="loadComplete"
                  ></v-progress-circular>
                  <span class="nunito-normal-16px" v-else>{{
                    formatIndicador(item.nValue)
                  }}</span>
                </div>
              </div>

              <div class="row">
                <div cols="6" style="min-width: 150px">
                  <span class="nunito-semi-bold-santas-gray-10px ml-6"
                    >Año en curso</span
                  >
                </div>

                <div cols="6" style="min-width: 120px">
                  <!-- <span class="nunito-semi-bold-emerald-14px"
                    ><v-icon class="mr-1" size="15">ub-percent</v-icon>+{{
                      item.percent
                    }}%</span
                  > -->
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mr-2">
          <v-col cols="7" class="d-flex" style="flex-direction: column">
            <Ventas ref="ventasMes" />
          </v-col>
          <v-col cols="5" class="d-flex" style="flex-direction: column">
            <Rentabilidad ref="rentabilidad" />
            <v-card class="pa-5 rounded-box-div mb-1 flex-grow-1">
              <Tareas ref="tareas" />
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mr-2">
          <v-col cols="6" class="d-flex" style="flex-direction: column">
            <VentasCliente ref="ventasClienteGraph" />
          </v-col>

          <v-col cols="6" class="d-flex" style="flex-direction: column">
            <VentasCompras
              ref="ventasCompras"
              @loadGraphRentabilidad="loadRentabilidad"
            />
          </v-col>
        </v-row>

        <v-row class="mr-2">
          <v-col cols="7" class="d-flex" style="flex-direction: column">
            <Compras ref="compras" />
          </v-col>
          <v-col cols="5" class="d-flex" style="flex-direction: column">
          </v-col>
        </v-row>
      </div>
    </div>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="error">
      <span>{{ snackbar_message }}</span>
    </v-snackbar>
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
import Compras from "../components/graphics/compras.vue";
import numeral from "numeral";
import axios from "axios";
import rentabilidadVue from "../components/graphics/rentabilidad.vue";
import { BreedingRhombusSpinner, SemipolarSpinner } from "epic-spinners";
import progressCircular from "../components/progressCircular.vue";

export default {
  components: {
    Navbar,
    Aside,
    Ventas,
    Rentabilidad,
    Tareas,
    VentasCliente,
    VentasCompras,
    SemipolarSpinner,
    Compras,
    progressCircular,
  },
  data() {
    return {
      loadComplete: true,
      value: 0,
      username: this.$route.query.user,
      user: "",
      activeAside: true,
      activeNav: true,
      snackbar: false,
      loaded: true,
      snackbar_message: "",
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
          name: "Documentos por pagar",
          nValue: 0,
          icon: "ub-por_pagar",
          percent: 0,
        },
      ],
      //Rentabilidad
      acumulado: [],
      final: [],

      //Ventas compras
      ventas_compras: [],
      compras: [],

      //Ventas cliente
      ventas_cliente: [],
      compras: [],

      //Rentabilidad
      rentabilidad: [],

      //Tareas
      tareas: [],
    };
  },

  computed: {},

  methods: {
    formatIndicador(num) {
      let res = parseFloat(String(num).replaceAll(".", "")) / 1000;

      return numeral(res).format(" $ 0,0").replaceAll(",", ".") + "K";
    },
    formatNumber(num) {
      return String(
        new Intl.NumberFormat("de-DE").format(
          parseFloat(Math.round(String(num).replace(",", ".")))
        )
      );
    },

    async checkSession() {
      const url = this.$route.query.url;
      const sid = this.$route.query.sid;
      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://frank.unabase.com/node/is-login",
        data: {
          hostname: "https://" + url,
          sid,
        },
        //timeout: 5000,
      };

      const success = await axios(config).then((respuestas) => respuestas.data);

      return success;
    },

    async loadRentabilidad(res) {
      const acumulado_ventas = res.data[0].ventas.suma.months[12].value;
      const rentabilidad_final = res.data[0].resultado.months[12].value;
      let obj_rentabilidad = {
        acumulado: acumulado_ventas,
        rentabilidad: rentabilidad_final,
      };

      this.rentabilidad.push(obj_rentabilidad);

      this.$refs.rentabilidad.loadGraph(this.rentabilidad);
    },

    async fetchData() {
      const url = this.$route.query.url;
      const sid = this.$route.query.sid;
      const username = this.$route.query.user;
      this.loaded = true;

      let date = new Date();
      let dateTo =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

      let date_ = new Date(date.getFullYear(), date.getMonth(), 1);
      let dateFrom =
        date_.getDate() +
        "-" +
        (date_.getMonth() + 1) +
        "-" +
        date_.getFullYear();

      let config_tareas = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://frank.unabase.com/node/get-tareas",
        data: {
          date_from: 2022,
          date_to: 2022,
          user: username,
          hostname: "https://" + url,
          sid,
        },
      };

      const lastDay = new Date(date.getFullYear(), 11, 31);
      let lastDayDate =
        lastDay.getDate() +
        "-" +
        (lastDay.getMonth() + 1) +
        "-" +
        lastDay.getFullYear();

      let currentDate = new Date();
      let c_date =
        currentDate.getDate() +
        "-" +
        (currentDate.getMonth() + 1) +
        "-" +
        currentDate.getFullYear();
      let config_indicadores = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://frank.unabase.com/node/get-indicadores",
        data: {
          hostname: "https://" + url,
          date_from: dateFrom,
          date_to: c_date,
          sid,
        },
      };

      let year = date_.getFullYear();

      let config_ventas_compras = {
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

      let c_compras_past_year = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://frank.unabase.com/node/get-ventas-compras",
        data: {
          hostname: "https://" + url,
          date_from: date_.getFullYear() - 1,
          por_gastar: true,
        },
      };

      let currentYear = date.getFullYear();

      let config_ventas_mes = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://frank.unabase.com/node/get-ventas-mes",
        data: {
          hostname: "https://" + url,
          year: currentYear,
          sid,
        },
      };

      let config_ventas_cliente = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://frank.unabase.com/node/get-ventas-cliente",
        data: {
          hostname: "https://" + url,
          fecha_asignacion: true,
          estado_en_proceso: true,
          estado_cerrado: true,
          date_from: 2022,
          date_to: 2022,
          sid,
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

      let data_ventas_mes = () => {
        return new Promise((resolve, reject) => {
          axios(config_ventas_mes)
            .then((r) => {
              resolve(r.data);
            })
            .catch((err) => {
              reject();
            });
        });
      };

      let data_ventas_cliente = () => {
        return new Promise((resolve, reject) => {
          axios(config_ventas_cliente)
            .then((r) => {
              resolve(r.data);
            })
            .catch((err) => {
              reject();
            });
        });
      };

      let data_tareas = () => {
        return new Promise((resolve, reject) => {
          axios(config_tareas)
            .then((r) => {
              resolve(r.data);
            })
            .catch((err) => {
              reject();
            });
        });
      };

      let data_compras_past_year = () => {
        return new Promise((resolve, reject) => {
          axios(c_compras_past_year)
            .then((r) => {
              resolve(r.data);
            })
            .catch((err) => {
              reject();
            });
        });
      };
      console.time("START");
      Promise.all([
        data_indicadores(),
        data_ventas_cliente(),
        data_tareas(),
      ]).then((respuestas) => {
        try {
          let only_costos = [];

          respuestas[0].forEach((val) => {
            this.indicadores[0].nValue = this.formatNumber(val.por_vencer);
            this.indicadores[1].nValue = this.formatNumber(val.por_facturar);
            this.indicadores[2].nValue = this.formatNumber(val.por_cobrar);
            this.indicadores[3].nValue = this.formatNumber(val.por_justificar);
            this.indicadores[4].nValue = this.formatNumber(val.por_pagar);
          });

          //VENTAS POR CLIENTE

          var items = respuestas[1][0].clientes.slice(0, 10).map((i) => {
            return i;
          });
          items.forEach((val) => {
            let data = {
              name: val.alias != undefined ? val.alias : val.nombre,
              data: val.neto,
            };
            this.ventas_cliente.push(data);
          });

          //VENTAS COMPRASS
          // const gastos_generales =
          //   respuestas[1][0].gastos_generales.suma.months;
          // const por_gastar = respuestas[1][0].por_gastar.suma.months;
          // const costos_directos = respuestas[1][0].costos_directos.suma.months;
          // let object_ventas_compras = {};

          // costos_directos.forEach((val, index) => {
          //   //12= acumulado
          //   if (index != 12) {
          //     let sum =
          //       val.value +
          //       por_gastar[index].value +
          //       gastos_generales[index].value;

          //     object_ventas_compras = {
          //       compras: sum,
          //       por_gastar: por_gastar[index].value,
          //       ventas: respuestas[1][0].ventas.suma.months[index].value,
          //     };
          //     this.ventas_compras.push(object_ventas_compras);
          //   }
          // });

          //Rentabilidad
          // const acumulado_ventas =
          //   respuestas[3][0].ventas.suma.months[12].value;
          // const rentabilidad_final =
          //   respuestas[3][0].resultado.months[12].value;
          // let obj_rentabilidad = {
          //   acumulado: acumulado_ventas,
          //   rentabilidad: rentabilidad_final,
          // };

          // this.rentabilidad.push(obj_rentabilidad);

          //TAREAS
          const docs_aprobar = respuestas[2][0].total_doc_por_aprobar;
          const total_rendiciones = respuestas[2][0].total_rendiciones_vencidas;

          let obj_tareas = {
            docs_aprobar,
            total_rendiciones,
          };

          this.tareas.push(obj_tareas);

          //Costos por mes

          // const gastos_generales_past =
          //   respuestas[5][0].gastos_generales.suma.months;
          // const por_gastar_past = respuestas[5][0].por_gastar.suma.months;
          // const costos_directos_past =
          //   respuestas[5][0].costos_directos.suma.months;
          // let object_compras = {};

          // costos_directos_past.forEach((val, index) => {
          //   //12= acumulado
          //   if (index != 12) {
          //     let sum =
          //       val.value +
          //       por_gastar_past[index].value +
          //       gastos_generales_past[index].value;

          //     object_compras = {
          //       compras_past: sum,
          //       por_gastar_past: por_gastar[index].value,
          //     };

          //     only_costos.push(object_compras);
          //   }
          // });

          //Cargar demas graficos
          this.$refs.ventasClienteGraph.loadGraph(this.ventas_cliente);
          this.$refs.ventasMes.loadGraph();
          //this.$refs.ventasCompras.loadGraph(this.ventas_compras);
          //this.$refs.rentabilidad.loadGraph(this.rentabilidad);
          this.$refs.tareas.loadGraph(this.tareas);
          this.loadComplete = false;
          //this.$refs.compras.loadGraph(this.ventas_compras, only_costos);
          console.timeEnd("START");
        } catch (error) {
          console.log(error);
        } finally {
          this.loaded = false;
        }
      });
    },
  },

  async mounted() {
    let is = this.$route.query.from;
    if (is === "v3") {
      const res = await this.checkSession();
      let currentTime = new Date();
      let hours = currentTime.getHours();

      if (res.logged_in) {
        this.activeAside = false;
        this.activeNav = false;
        this.user = this.$route.params.user;
        this.fetchData();
        await this.$refs.ventasCompras.fethData();
        await this.$refs.compras.fethData();
      } else if (!res) {
        this.snackbar_message = "Error al iniciar";
        this.snackbar = true;
        this.loaded = false;
      }
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