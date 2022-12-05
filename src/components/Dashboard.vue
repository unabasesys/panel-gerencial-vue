<template>
  <div class="background-general">
    <div style="width: 100%" v-if="loaded" id="loading-screen">
      <div id="app">
        <semipolar-spinner
          :animation-duration="2000"
          :size="120"
          color="#20A789"
        />
      </div>
    </div>
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
              <Ventas ref="ventasMes" />
            </v-card>
          </v-col>
          <v-col cols="5" class="d-flex" style="flex-direction: column">
            <v-card class="pa-5 rounded-box-div mb-1 flex-grow-1">
              <Rentabilidad ref="rentabilidad" />
            </v-card>
            <v-card class="pa-5 rounded-box-div mb-1 flex-grow-1">
              <Tareas ref="tareas" />
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mr-2">
          <v-col cols="7" class="d-flex" style="flex-direction: column">
            <v-card class="pa-5 rounded-box-div flex-grow-1">
              <VentasCliente ref="ventasClienteGraph" />
            </v-card>
          </v-col>
          <v-col cols="5" class="d-flex" style="flex-direction: column">
            <v-card class="pa-5 rounded-box-div flex-grow-1">
              <VentasCompras ref="ventasCompras" />
            </v-card>
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
import axios from "axios";
import rentabilidadVue from "../components/graphics/rentabilidad.vue";
import { BreedingRhombusSpinner, SemipolarSpinner } from "epic-spinners";

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
  },
  data() {
    return {
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

  methods: {
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

      const success = await axios(config).then(
        (respuestas) => respuestas.data.logged_in
      );

      return success;
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
        (lastDay.getMonth() + 1)+
        "-" +
        lastDay.getFullYear();
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
          date_to: lastDayDate,
          sid,
        },
      };

      let config_ventas_compras = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://frank.unabase.com/node/get-ventas-compras",
        data: {
          hostname: "https://" + url,
          date_from: date_.getFullYear(),
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

      Promise.all([
        data_indicadores(),
        data_ventas_compras(),
        data_ventas_mes(),
        data_ventas_cliente(),
        data_tareas(),
      ]).then((respuestas) => {
        try {
          respuestas[0].forEach((val) => {
            this.indicadores[0].nValue = this.formatNumber(val.por_vencer);
            this.indicadores[1].nValue = this.formatNumber(val.por_facturar);
            this.indicadores[2].nValue = this.formatNumber(val.por_cobrar);
            this.indicadores[3].nValue = this.formatNumber(val.por_justificar);
            this.indicadores[4].nValue = this.formatNumber(val.por_pagar);
          });

          var size = 10;
          var items = respuestas[3][0].clientes.slice(0, size).map((i) => {
            return i;
          });
          items.forEach((val) => {
            let data = {
              name: val.nombre,
              data: val.neto,
            };
            this.ventas_cliente.push(data);
          });

          //VENTAS MES
          // respuestas[2][0].forEach((val) => {
          //   let data = {
          //     mes: val[0],
          //     value: val[1],
          //   };
          //   this.ventas_mes.push(data);
          // });

          //VENTAS COMPRASS
          const gastos_generales =
            respuestas[1][0].gastos_generales.suma.months;
          const por_gastar = respuestas[1][0].por_gastar.suma.months;
          const costos_directos = respuestas[1][0].costos_directos.suma.months;
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
                ventas: respuestas[1][0].ventas.suma.months[index].value,
              };
              this.ventas_compras.push(object_ventas_compras);
            }
          });

          //Rentabilidad
          const acumulado_ventas =
            respuestas[1][0].ventas.suma.months[12].value;
          const rentabilidad_final =
            respuestas[1][0].resultado.months[12].value;
          let obj_rentabilidad = {
            acumulado: acumulado_ventas,
            rentabilidad: rentabilidad_final,
          };

          this.rentabilidad.push(obj_rentabilidad);

          //TAREAS
          const docs_aprobar = respuestas[4][0].total_doc_por_aprobar;
          const total_rendiciones = respuestas[4][0].total_rendiciones_vencidas;

          let obj_tareas = {
            docs_aprobar,
            total_rendiciones,
          };

          this.tareas.push(obj_tareas);

          //Cargar demas graficos
          this.$refs.ventasClienteGraph.loadGraph(this.ventas_cliente);
          this.$refs.ventasMes.loadGraph(this.ventas_compras);
          this.$refs.ventasCompras.loadGraph(this.ventas_compras);
          this.$refs.rentabilidad.loadGraph(this.rentabilidad);
          this.$refs.tareas.loadGraph(this.tareas);
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
      if (res) {
        this.activeAside = false;
        this.activeNav = false;
        this.user = this.$route.params.user;
        this.fetchData();
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

#loading-screen {
  background-color: rgba(25, 25, 25, 0.7);
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 9999;
  margin-top: 0;
  top: 0;
  text-align: center;
}

#loading-screen > #app {
  width: 100px;
  height: 100px;
  position: relative;
  margin-top: -50px;
  margin-left: 50%;
  top: 50%;
}
</style>