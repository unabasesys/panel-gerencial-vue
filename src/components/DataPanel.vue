<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>{{ snackbar_message }}</span>
      <v-btn text color="white" @click="snackbar = false"> Cerrar </v-btn>
    </v-snackbar>
    <div>
      <Aside :username="username"/>

      <Navbar />
      <div id="container" class="content no-collapsed">
        <v-row>
          <v-col cols="3">
            <SelectOption @getEmpresaSelect="getNegocios" />
          </v-col>
        </v-row>

        <v-row style="padding-top: 20px">
          <v-col cols="4">
            <v-card
              class="mx-auto card-2"
              width="350"
              height="120"
              color="#f000"
              outlined
            >
              <v-list-item>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-card class="mx-auto mb-5 mt-5" color="#34CC02" v-on="on">
                      <v-list-item>
                        <v-list-item-content>
                          <i class="fas fa-donate fa-3x icon-fas"></i>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </template>
                  <span>Total ventas: $ {{ total_ventas }}</span>
                </v-tooltip>

                <v-list-item-content class="pl-6">
                  <div class="text-overline mb-4">Total ventas</div>
                  <v-list-item-title class="text-h5 mb-1">
                    $ {{ total_ventas }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card
              class="mx-auto card-2"
              width="350"
              height="120"
              color="#f000"
              outlined
            >
              <v-list-item>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-card class="mx-auto mb-5 mt-5" color="#FC4903" v-on="on">
                      <v-list-item>
                        <v-list-item-content>
                          <i class="fas fa-donate fa-3x icon-fas"></i>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </template>
                  <span>Total costos: $ {{ total_costos }}</span>
                </v-tooltip>

                <v-list-item-content class="pl-6">
                  <div class="text-overline mb-4">Total costos</div>
                  <v-list-item-title class="text-h5 mb-1">
                    $ {{ total_costos }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card
              class="mx-auto card-3"
              max-width="350"
              height="120"
              color="#f000"
              outlined
            >
              <v-list-item>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-card class="mx-auto mb-5 mt-4" color="#03D6F9" v-on="on">
                      <v-list-item>
                        <v-list-item-content>
                          <i class="fas fa-donate fa-3x icon-fas"></i>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </template>
                  <span>Utilidades: $ {{ total_utilidades }}</span>
                </v-tooltip>

                <v-list-item-content class="pl-6">
                  <div class="text-overline mb-4">Utilidades</div>
                  <v-list-item-title class="text-h5 mb-1">
                    $ {{ total_utilidades }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="table">
            <v-card style="margin-right: 20px">
              <v-card-title>
                <v-row>
                  <v-col cols="2">
                    <v-tooltip top>
                      <template #activator="{ on }">
                        <div multiple v-on="on">
                          <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Seleccione fecha"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>

                            <v-date-picker
                              v-model="date"
                              type="month"
                              range
                              locale="es-ES"
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false">
                                Cancelar
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.menu.save(date), getNegociosByDate(date)
                                "
                              >
                                Aceptar
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </div>
                      </template>
                      <span>Seleccione rango de fecha</span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="2">
                    <v-tooltip top>
                      <template #activator="{ on }">
                        <div multiple v-on="on">
                          <v-select
                            menu-props="auto"
                            label="Tipo de cambio"
                            hide-details
                            prepend-icon="fas fa-dollar-sign"
                            single-line
                            :items="tipo_cambio"
                            v-model="tipo_cambio_v"
                            @change="setTipoCambio(tipo_cambio_v)"
                          ></v-select>
                        </div>
                      </template>
                      <span>Seleccione tipo de cambio</span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="2">
                    <v-tooltip top>
                      <template #activator="{ on }">
                        <div multiple v-on="on">
                          <v-select
                            menu-props="auto"
                            label="Cierre de compras"
                            hide-details
                            prepend-icon="fas fa-lock"
                            single-line
                            :items="cierre_compras"
                            v-model="cierre_compras_v"
                            @change="setCierreCompras(cierre_compras_v)"
                          >
                          </v-select>
                        </div>
                      </template>
                      <span>Seleccione cierre de compras</span>
                    </v-tooltip>
                  </v-col>

                  <v-spacer></v-spacer>
                  <v-col cols="2">
                    <div style="display: flex; justify-content: flex-end">
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Buscador"
                        single-line
                        hide-details
                      ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>

              
              <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                locale="es"
              >
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from "../components/DataPanel.vue";
import Navbar from "../components/Navbar.vue";
import Aside from "../components/Aside.vue";
import axios from "axios";
import { mapMutations, mapState, mapGetters } from "vuex";
import SelectOption from "./SelectOption.vue";

export default {
  components: {
    Panel,
    Navbar,
    SelectOption,
    Aside,
  },
  data() {
    return {
      search: "",
      snackbar: false,
      snackbar_message: "",
      date: [],
      tipo_cambio: ["USD", "EURO", "Moneda original"],
      tipo_cambio_v: null,
      cierre_compras: ["Si", "No"],
      cierre_compras_v: "",
      total_costos: 0,
      total_ventas: 0,
      total_utilidades: 0,
      username: this.$route.params.username,
      headers: [
        {
          text: "NRO NEG",
          align: "start",
          sortable: false,
          value: "nro_neg",
          class: "headertable",
        },
        {
          text: "FECHA ASIGNACION",
          value: "fecha_asignacion",
          class: "headertable",
        },
        { text: "REFERENCIA", value: "referencia", class: "headertable" },
        { text: "CLIENTE", value: "cliente", class: "headertable" },
        { text: "TOTAL VENTA", value: "total_venta", class: "headertable" },
        { text: "GASTO P", value: "gasto_p", class: "headertable" },
        { text: "GASTO R", value: "gasto_r", class: "headertable" },
        {
          text: "UTILIDAD FINAL",
          value: "utilidad_final",
          class: "headertable",
        },
        { text: "FACTURADO", value: "facturado", class: "headertable" },
        { text: "POR FACTURAR", value: "por_facturar", class: "headertable" },
        {
          text: "GASTOS OFICINA",
          value: "gasto_oficina",
          class: "headertable",
        },
        { text: "IMPUESTOS", value: "impuestos", class: "headertable" },
      ],
      desserts: [],
      token: "",
      select_empresa: "",
    };
  },
  computed: {
    ...mapState(["negocio", "negocios", "cards"]),
    ...mapGetters({
      getNegocioStore: "getNegocios",
      getCardsStore: "getDataCards",
    }),
  },
  methods: {
    ...mapMutations([
      "mostrarLoading",
      "ocultarLoading",
      "setNegocio",
      "addNegocio",
      "addDataCards",
    ]),
    setSnackbar(message) {
      this.snackbar = true;
      this.snackbar_message = message;
    },
    init() {
      console.log("INIT");
      this.cierre_compras_v = this.negocio.cierre_compras ? "Si" : "";
    },
    parse(num) {
      return String(
        new Intl.NumberFormat("de-DE").format(
          parseFloat(Math.round(String(num).replace(",", ".")))
        )
      );
    },
    setCierreCompras(value) {
      console.log("Cierre: ", value);

      switch (value.toLowerCase()) {
        case "si": {
          console.log("SE PUSO SI");
          this.setNegocio({
            cierre_compras: true,
          });
          break;
        }
        case "no": {
          console.log("SE PUSO NO");
          this.setNegocio({
            cierre_compras: false,
          });
          break;
        }
      }
      if (this.select_empresa) {
        this.getNegocios(this.select_empresa);
      }
    },
    async setTipoCambio(value) {
      this.mostrarLoading({
        titulo: "Cargando información",
        color: "#03D6F9",
        percent: 0,
      });

      console.log("VALOR: ", value)
      if(this.select_empresa === "Primo españa" && value === "EURO"){
        value = "";
        this.tipo_cambio_v = "Moneda original";
      }

      let datos;
      let tipo_cambio_f = false;
      switch (value) {
        case "USD": {
          datos = await axios.get("https://mindicador.cl/api/dolar/");
          console.log("DOLAR VALOR: ", datos.data.serie[0].valor);
          tipo_cambio_f = true;
          break;
        }

        case "EURO": {
          datos = await axios.get("https://mindicador.cl/api/euro/");
          console.log("EURO VALOR: ", datos.data.serie[0].valor);
          tipo_cambio_f = true;
          break;
        }
        default: {
          this.getNegocios(this.select_empresa);
        }
      }

      if (tipo_cambio_f) {
        let tipo_cambio = datos.data.serie[0].valor;

        const convert = (num1, tipocambio) => {
          let res = num1 / tipocambio;
          return this.parse(res);
        };

        const clearNum = (num) => {
          return String(num)
            .replace("$", "")
            .replace("€", "")
            .replace("R", "")
            .replaceAll(".", "")
            .replaceAll(",", ".");
        };

        //data de cards desde store
        this.getCardsStore.forEach((response) => {
          this.total_ventas = convert(
            clearNum(response.total_ventas),
            tipo_cambio
          );
          this.total_costos = convert(
            clearNum(response.total_costos),
            tipo_cambio
          );
          this.total_utilidades = convert(
            clearNum(response.total_utilidades),
            tipo_cambio
          );
        });

        debugger;
        //Datos de tabla
        let data_t = [];
        if (this.getNegocioStore.length == 0) {
          console.log("CARGA EN STORE");
          this.addNegocio(this.desserts);
        }

        let data_table = {};
        this.getNegocioStore.forEach((response) => {
          data_table = {
            nro_neg: response.nro_neg,
            fecha_asignacion: response.fecha_asignacion,
            referencia: response.referencia,
            cliente: response.cliente,
            total_venta: convert(clearNum(response.total_venta), tipo_cambio),
            gasto_p: convert(clearNum(response.gasto_p), tipo_cambio),
            gasto_r: convert(clearNum(response.gasto_r), tipo_cambio),
            utilidad_final: convert(
              clearNum(response.utilidad_final),
              tipo_cambio
            ),
            facturado: convert(clearNum(response.facturado), tipo_cambio),
            por_facturar: convert(clearNum(response.por_facturar), tipo_cambio),
            impuestos: response.impuestos,
            gasto_oficina: response.gasto_oficina,
          };
          data_t.push(data_table);
        });

        this.desserts = data_t;

        this.ocultarLoading(100);
      }
    },
    setCards() {
      this.total_costos = 0;
      this.total_ventas = 0;
      this.total_utilidades = 0;
      if (this.desserts.length > 0) {
        let array_gasto_r = [];
        let array_total_ventas = [];
        let array_total_utilidades = [];
        Array.from(this.desserts).forEach((data) => {
          let gasto_r = parseFloat(
            data.gasto_r
              .replace("$", "")
              .replace("€", "")
              .replace("R", "")
              .replaceAll(".", "")
              .replaceAll(",", ".")
          );

          let ventas = parseFloat(
            data.total_venta
              .replace("$", "")
              .replace("€", "")
              .replace("R", "")
              .replaceAll(".", "")
              .replaceAll(",", ".")
          );

          let utilidades = parseFloat(
            data.utilidad_final
              .replace("$", "")
              .replace("€", "")
              .replace("R", "")
              .replaceAll(".", "")
              .replaceAll(",", ".")
          );
          //Total costos
          array_gasto_r.push(gasto_r);
          //Total ventas
          array_total_ventas.push(ventas);
          //Total utilidades
          array_total_utilidades.push(utilidades);
        });

        const sumArray = (total, num) => {
          return total + num;
        };

        let total_gastop_c = array_gasto_r.reduce(sumArray);
        let total_ventas_c = array_total_ventas.reduce(sumArray);
        let total_utilidades_c = array_total_utilidades.reduce(sumArray);

        this.total_costos = this.parse(total_gastop_c);
        this.total_ventas = this.parse(total_ventas_c);
        this.total_utilidades = this.parse(total_utilidades_c);

        let data_cards = {
          total_ventas: this.total_ventas,
          total_costos: this.total_costos,
          total_utilidades: this.total_utilidades,
        };
        let dt = [];
        dt.push(data_cards);
        //Agregar data de cards a store
        this.addDataCards(dt);
      }
    },
    getNegociosByDate(date) {
      if (date[0] && date[1] && date[0] != date[1]) {
        if (this.select_empresa) {
          let date_start = date[0];
          let date_end = date[1];
          this.getNegocios(this.select_empresa, date_start, date_end);
        } else {
          this.setSnackbar("Seleccione una empresa");
        }
      } else {
        this.setSnackbar("Debe seleccionar un rango de fechas");
      }
    },
    getNegocios(value, date_start = "", date_end = "") {
      const getAllNegocios = (url_ = "") => {
        console.log("URL: ", url_);
        this.mostrarLoading({
          titulo: "Cargando información",
          color: "#03D6F9",
          percent: 0,
        });

        let config_cl = {
          method: "get",
          url: url_,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjMuMjEzLjE4Ny4xNTciLCJwb3J0IjoiODUyNSIsIm5hbWUiOiJQUklNT0NPTlRFTlQiLCJpZCI6IjEzMzE3IiwiaWF0IjoxNjQ2MzE4NTU5LCJleHAiOjE2Nzc4NTQ1NTl9.bquXHUvnsyUdLaXoIrC17oSeqa0yaqgtcQIBJ3y0HPs",
          },
        };

        let config_esp = {
          method: "get",
          url: url_,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6IjgyMDAiLCJuYW1lIjoiUFJJTU9CVUVOT1NBSVJFU1MuTCIsImlkIjoiOTU3NCIsImlhdCI6MTY0NDg2MDUwMSwiZXhwIjoxNjc2Mzk2NTAxfQ.0Ec4L4y_XWLvzIDl2_LWI6GBmt_0xkZXttCQo8J9etQ",
          },
        };

        let config_mx = {
          method: "get",
          url: url_,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6Ijg0MDAiLCJuYW1lIjoiUFJJTU9DT05URU5UTUVYSUNPIiwiaWQiOiIxMTk1MiIsImlhdCI6MTY0NDkyOTkzNiwiZXhwIjoxNjc2NDY1OTM2fQ.Xcs40HRr-7ecirgMX85ySYvHYQ51RRAmhk3ZkvKbrr8",
          },
        };

        let config_arg = {
          method: "get",
          url: url_,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6IjgzMDAiLCJuYW1lIjoiUFJJTU9DT05URU5UQVJHRU5USU5BIiwiaWQiOiIyMzM5MSIsImlhdCI6MTY0NDkyOTc0NSwiZXhwIjoxNjc2NDY1NzQ1fQ.MobpDClFUE3eXoz_imOwn0HBd0YNArtmZn50Q65NPTA",
          },
        };

        let config_br = {
          method: "get",
          url: url_,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6IjgxMDAiLCJuYW1lIjoiUFJJTU9DT05URU5UQlJBU0lMIiwiaWQiOiI1NDkxIiwiaWF0IjoxNjQ0OTI5NTk4LCJleHAiOjE2NzY0NjU1OTh9.VrtXBJQw1NpAlteIq7pCorZWI_B-_cgVIecBha6Yerw",
          },
        };

        let mov_esp = () => {
          return new Promise((resolve, reject) => {
            axios(config_esp)
              .then((r) => {
                resolve(r.data);
              })
              .catch((err) => {
                reject();
              });
          });
        };

        let mov_mx = () => {
          return new Promise((resolve, reject) => {
            axios(config_mx)
              .then((r) => {
                resolve(r.data);
              })
              .catch((err) => {
                reject();
              });
          });
        };

        let mov_br = () => {
          return new Promise((resolve, reject) => {
            axios(config_br)
              .then((r) => {
                resolve(r.data);
              })
              .catch((err) => {
                reject();
              });
          });
        };

        let mov_arg = () => {
          return new Promise((resolve, reject) => {
            axios(config_arg)
              .then((r) => {
                resolve(r.data);
              })
              .catch((err) => {
                reject();
              });
          });
        };

        let mov_cl = () => {
          return new Promise((resolve, reject) => {
            axios(config_cl)
              .then((r) => {
                resolve(r.data);
              })
              .catch((err) => {
                reject();
              });
          });
        };
        //asdadsdsasda

        this.desserts = [];
        Promise.all([mov_arg(), mov_esp(), mov_mx(), mov_br(), mov_cl()]).then(
          (respuestas) => {
            let dt = [];
            try {
              if (respuestas != undefined) {
                respuestas.forEach((e) => {
                  if (e.data.rows != undefined) {
                    e.data.rows.forEach((e) => {
                      let close_compras = this.negocio.cierre_compras
                        ? true
                        : false;
                      this.cierre_compras_v = close_compras ? "Si" : "No";
                      if (
                        e.estado === "NOTA DE VENTA" &&
                        e.closed_compras == close_compras
                      ) {
                        let data_table = {
                          nro_neg: e.folio,
                          fecha_asignacion: e.fecha_asignacion,
                          referencia: e.referencia,
                          cliente: e.razon_cliente,
                          total_venta: this.parse(e.total_neto),
                          gasto_p: this.parse(e.costo.presupuestado),
                          gasto_r: this.parse(e.costo.real),
                          utilidad_final: this.parse(e.utilidad.final),
                          facturado: this.parse(e.total_facturado),
                          por_facturar: this.parse(e.total_por_facturar),
                        };

                        dt.push(data_table);
                      }
                    });
                    this.desserts = [];
                    this.desserts = dt;
                    this.addNegocio(this.desserts);
                    this.setCards();
                  }
                });
              }
            } catch (error) {
              this.ocultarLoading(100);
              this.desserts = [];
              this.setCards();
              console.log(error);
            } finally {
              this.ocultarLoading(100);
            }
          }
        );
      };

      const getNeg = (token, date_start = "", date_end = "", currency = "") => {
        this.mostrarLoading({
          titulo: "Cargando información",
          color: "#03D6F9",
          percent: 0,
        });

        console.log("FECHA START: ", date_start);
        console.log("FECHA END: ", date_end);
        //Si viene filtro de fecha
        config = {
          method: "get",
          url:
            date_start && date_end
              ? `https://v3api.herokuapp.com/v1/negocios/meses/${date_start}/${date_end}`
              : `https://v3api.herokuapp.com/v1/negocios`,
          headers: {
            Authorization: token,
          },
        };

        this.token = token;
        let doc = () => {
          return new Promise((resolve, reject) => {
            axios(config)
              .then((r) => {
                resolve(r.data);
              })
              .catch((err) => {
                reject();
              });
          });
        };

        Promise.all([doc()]).then((respuestas) => {
          let dt = [];
          try {
            respuestas.forEach((e) => {
              e.data.rows.forEach((e) => {
                let close_compras = this.negocio.cierre_compras ? true : false;
                this.cierre_compras_v = close_compras ? "Si" : "No";
                if (
                  e.estado === "NOTA DE VENTA" &&
                  e.closed_compras === close_compras
                ) {
                  let data_table = {
                    nro_neg: e.folio,
                    fecha_asignacion: e.fecha_asignacion,
                    referencia: e.referencia,
                    cliente: e.razon_cliente,
                    total_venta: currency + this.parse(e.total_neto),
                    gasto_p: currency + this.parse(e.costo.presupuestado),
                    gasto_r: currency + this.parse(e.costo.real),
                    utilidad_final: currency + this.parse(e.utilidad.final),
                    facturado: currency + this.parse(e.total_facturado),
                    por_facturar: currency + this.parse(e.total_por_facturar),
                  };

                  dt.push(data_table);
                }
              });
            });
            this.desserts = [];
            this.desserts = dt;
            this.addNegocio(this.desserts);
            this.setCards();
          } catch (error) {
            this.ocultarLoading(100);
            this.desserts = [];
            console.log(error);
          } finally {
            this.ocultarLoading(100);
          }
        });
      };

      let config;
      let token;
      this.select_empresa = value;
      switch (value) {
        case "Primo españa": {
          token =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6IjgyMDAiLCJuYW1lIjoiUFJJTU9CVUVOT1NBSVJFU1MuTCIsImlkIjoiOTU3NCIsImlhdCI6MTY0NDg2MDUwMSwiZXhwIjoxNjc2Mzk2NTAxfQ.0Ec4L4y_XWLvzIDl2_LWI6GBmt_0xkZXttCQo8J9etQ";

          getNeg(token, date_start, date_end, "€");
          break;
        }

        case "Primo brasil": {
          token =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6IjgxMDAiLCJuYW1lIjoiUFJJTU9DT05URU5UQlJBU0lMIiwiaWQiOiI1NDkxIiwiaWF0IjoxNjQ0OTI5NTk4LCJleHAiOjE2NzY0NjU1OTh9.VrtXBJQw1NpAlteIq7pCorZWI_B-_cgVIecBha6Yerw";
          getNeg(token, date_start, date_end, "R$");
          break;
        }

        case "Primo chile": {
          token =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjMuMjEzLjE4Ny4xNTciLCJwb3J0IjoiODUyNSIsIm5hbWUiOiJQUklNT0NPTlRFTlQiLCJpZCI6IjEzMzE3IiwiaWF0IjoxNjQ2MzE4NTU5LCJleHAiOjE2Nzc4NTQ1NTl9.bquXHUvnsyUdLaXoIrC17oSeqa0yaqgtcQIBJ3y0HPs";
          getNeg(token, date_start, date_end, "$");
          break;
        }

        case "Primo argentina": {
          token =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6IjgzMDAiLCJuYW1lIjoiUFJJTU9DT05URU5UQVJHRU5USU5BIiwiaWQiOiIyMzM5MSIsImlhdCI6MTY0NDkyOTc0NSwiZXhwIjoxNjc2NDY1NzQ1fQ.MobpDClFUE3eXoz_imOwn0HBd0YNArtmZn50Q65NPTA";
          getNeg(token, date_start, date_end, "$");
          break;
        }

        case "Primo mexico": {
          token =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6Ijg0MDAiLCJuYW1lIjoiUFJJTU9DT05URU5UTUVYSUNPIiwiaWQiOiIxMTk1MiIsImlhdCI6MTY0NDkyOTkzNiwiZXhwIjoxNjc2NDY1OTM2fQ.Xcs40HRr-7ecirgMX85ySYvHYQ51RRAmhk3ZkvKbrr8";
          getNeg(token, date_start, date_end, "$");
          break;
        }

        case "Todas": {
          let url =
            date_start && date_end
              ? `https://v3api.herokuapp.com/v1/negocios/meses/${date_start}/${date_end}`
              : `https://v3api.herokuapp.com/v1/negocios`;
          getAllNegocios(url);
          break;
        }
      }
    },
  },
  created: function () {
    this.init();
  },
};
</script>

<style>
.table {
  margin-top: 50px;
}

.header-options {
  padding-left: 50px;
}

.card-3 {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.card-2 {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.card-1 {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.card-title {
  color: white;
  text-align: center;
}

.card-details {
  color: white;
  display: flex;
  justify-content: center;
  padding-left: 40px;
}

.barrer {
  margin-left: 30px;
  border-left: 3px solid white;
  height: 40px;
}

.icon-card-3 {
  margin-right: 2000px;
}

.icon-fas {
  color: white;
}

.headertable {
  background-color: #34cc02;
  color: white;
}

.content {
  display: flow-root;
}

.no-collapsed{
  margin-left: 220px;   
  margin-top: 30px
}

.collapsed{
  margin-top: 30px;
  margin-left: 80px; 
}
</style>