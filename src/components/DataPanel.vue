<template>
  <div class="background-general">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>{{ snackbar_message }}</span>
      <v-btn text color="white" @click="snackbar = false"> Cerrar </v-btn>
    </v-snackbar>
    <div>
      <!-- <Aside :username="username" /> -->

      <Navbar />
      <div id="container" class="content no-collapsed">
        <v-row>
          <v-col cols="3">
            <SelectOption @getEmpresaSelect="getNegocios" ref="selectOption" />
          </v-col>
        </v-row>

        <v-row style="padding-top: 20px">
          <v-col cols="4">
            <v-card
              class="mx-auto card-2 rounded-box"
              width="350"
              height="120"
              color="#ffffff"
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
                  <span class="nunito-semi-bold-santas-gray-16px mb-4"
                    >Total ventas</span
                  >
                  <v-list-item-title class="text-h5 mb-1">
                    $ {{ total_ventas }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card
              class="mx-auto card-2 rounded-box"
              width="350"
              height="120"
              color="white"
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
                  <span class="nunito-semi-bold-santas-gray-16px mb-4"
                    >Total costos</span
                  >
                  <v-list-item-title class="text-h5 mb-1">
                    $ {{ total_costos }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card
              class="mx-auto card-3 rounded-box"
              max-width="350"
              height="120"
              color="white"
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
                  <span class="nunito-semi-bold-santas-gray-16px mb-4"
                    >Utilidades</span
                  >
                  <v-list-item-title class="text-h5 mb-1">
                    $ {{ total_utilidades }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="ml-4">
            <TipoCambio :empresa="select_empresa" ref="tipoCambio"></TipoCambio>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="table">
            <v-card style="margin-right: 20px" class="main-data-table">
              <v-card-title>
                <v-row>
                  <v-col cols="3">
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
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                rounded
                                class="nunito-semi-bold-santas-gray-16px"
                                append-icon="mdi-calendar"
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
                            outlined
                            rounded
                            label="Tipo de cambio"
                            hide-details
                            append-icon="fas fa-dollar-sign"
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
                            outlined
                            rounded
                            class="nunito-semi-bold-santas-gray-16px"
                            label="Cierre de compras"
                            hide-details
                            append-icon="fas fa-lock"
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
                  <v-col cols="3">
                    <div style="display: flex; justify-content: flex-end">
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        outlined
                        rounded
                        class="nunito-semi-bold-santas-gray-16px"
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
import TipoCambio from "../components/TipoCambio.vue";
import axios from "axios";
import { mapMutations, mapState, mapGetters } from "vuex";
import SelectOption from "./SelectOption.vue";
import draggable from "vuedraggable";
export default {
  components: {
    Panel,
    Navbar,
    SelectOption,
    Aside,
    TipoCambio,
    draggable,
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
          class: "nunito-normal-12px",
        },
        {
          text: "FECHA ASIGNACION",
          value: "fecha_asignacion",
          class: "nunito-normal-12px",
        },
        {
          text: "REFERENCIA",
          value: "referencia",
          class: "nunito-normal-12px",
        },
        { text: "CLIENTE", value: "cliente", class: "nunito-normal-12px" },
        {
          align: "right",
          text: "TOTAL VENTA",
          value: "total_venta",
          class: "nunito-normal-12px",
        },
        {
          align: "right",
          text: "GASTO P",
          value: "gasto_p",
          class: "nunito-normal-12px",
        },
        {
          align: "right",
          text: "GASTO R",
          value: "gasto_r",
          class: "nunito-normal-12px",
        },
        {
          align: "right",
          text: "UTILIDAD FINAL",
          value: "utilidad_final",
          class: "nunito-normal-12px",
        },
        {
          align: "right",
          text: "FACTURADO",
          value: "facturado",
          class: "nunito-normal-12px",
        },
        {
          align: "right",
          text: "POR FACTURAR",
          value: "por_facturar",
          class: "nunito-normal-12px",
        },
        {
          align: "right",
          text: "GASTOS OFICINA",
          value: "gasto_oficina",
          class: "nunito-normal-12px",
        },
        {
          align: "right",
          text: "IMPUESTOS",
          value: "impuestos",
          class: "nunito-normal-12px",
        },
      ],
      desserts: [],
      token: "",
      select_empresa: "",
    };
  },
  computed: {
    ...mapState(["negocio", "negocios", "cards", "tokens"]),
    ...mapGetters({
      getNegocioStore: "getNegocios",
      getCardsStore: "getDataCards",
      getTipoCambioStore: "getTipoCambio",
      getUserStore: "getUser",
    }),
  },
  methods: {
    ...mapMutations([
      "mostrarLoading",
      "ocultarLoading",
      "setNegocio",
      "setUser",
      "addNegocio",
      "addDataCards",
    ]),
    setSnackbar(message) {
      this.snackbar = true;
      this.snackbar_message = message;
    },
    async init() {
      this.cierre_compras_v = this.negocio.cierre_compras ? "Si" : "";
    },
    async checkSession() {
      let success = false;
      let t = localStorage.getItem("token");
      debugger;
      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "https://dev3.unabase.com/node/get-token-user",
        //timeout: 5000,
        data: {
          hostname: "https://dev3.unabase.com",
          token: t,
        },
      };

      await axios(config).then((respuestas) => {
        debugger;
        if (respuestas.data[0].success) {
          debugger;
          let currentToken = localStorage.getItem("token");
          if (currentToken === respuestas.data[0].token) {
            success = true;
          } else {
            this.$router.push({ path: "/" });
          }
        } else {
          this.$router.push({ path: "/" });
        }
      });

      return success;
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
    convert(num1, tipocambio) {
      let res = num1 / tipocambio;
      return this.parse(res);
    },
    clearNum(num) {
      return String(num)
        .replace("$", "")
        .replace("€", "")
        .replace("R", "")
        .replaceAll(".", "")
        .replaceAll(",", ".");
    },
    async setTipoCambio(value) {
      this.mostrarLoading({
        titulo: "Cargando información",
        color: "#03D6F9",
        percent: 0,
      });

      const calculateCambio = (tipo_cambio) => {
        //data de cards desde store
        this.getCardsStore.forEach((response) => {
          this.total_ventas = this.convert(
            this.clearNum(response.total_ventas),
            tipo_cambio
          );
          this.total_costos = this.convert(
            this.clearNum(response.total_costos),
            tipo_cambio
          );
          this.total_utilidades = this.convert(
            this.clearNum(response.total_utilidades),
            tipo_cambio
          );
        });

        //Datos de tabla
        let data_t = [];
        if (this.getNegocioStore.length == 0) {
          this.addNegocio(this.desserts);
        }

        let data_table = {};
        this.getNegocioStore.forEach((response) => {
          data_table = {
            nro_neg: response.nro_neg,
            fecha_asignacion: response.fecha_asignacion,
            referencia: response.referencia,
            cliente: response.cliente,
            total_venta: this.convert(
              this.clearNum(response.total_venta),
              tipo_cambio
            ),
            gasto_p: this.convert(this.clearNum(response.gasto_p), tipo_cambio),
            gasto_r: this.convert(this.clearNum(response.gasto_r), tipo_cambio),
            utilidad_final: this.convert(
              this.clearNum(response.utilidad_final),
              tipo_cambio
            ),
            facturado: this.convert(
              this.clearNum(response.facturado),
              tipo_cambio
            ),
            por_facturar: this.convert(
              this.clearNum(response.por_facturar),
              tipo_cambio
            ),
            impuestos: response.impuestos,
            gasto_oficina: response.gasto_oficina,
          };
          data_t.push(data_table);
        });

        this.desserts = data_t;

        this.ocultarLoading(100);
      };

      let tipo_cambio = "";

      this.getTipoCambioStore.forEach((response) => {
        switch (value) {
          case "USD": {
            tipo_cambio = response.valorDolar;
            break;
          }
          case "EURO": {
            tipo_cambio = response.valorEuro;
            break;
          }
        }
      });

      if (tipo_cambio != "") {
        calculateCambio(Number.parseFloat(tipo_cambio.replace(",", ".")));
      } else {
        this.getNegocios(this.select_empresa);
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
    async getNegocios(value, date_start = "", date_end = "") {
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
          timeout: 8000,
          headers: {
            Authorization: `${this.tokens.chile}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        let config_esp_bc = {
          method: "get",
          timeout: 8000,
          url: url_,
          headers: {
            Authorization: `${this.tokens.esp_barcelona}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        let config_esp_mr = {
          method: "get",
          timeout: 8000,
          url: url_,
          headers: {
            Authorization: `${this.tokens.esp_madrid}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        let config_mx = {
          method: "get",
          timeout: 8000,
          url: url_,
          headers: {
            Authorization: `${this.tokens.mex}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        let config_arg = {
          method: "get",
          timeout: 8000,
          url: url_,
          headers: {
            Authorization: `${this.tokens.arg}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        let config_br = {
          method: "get",
          timeout: 8000,
          url: url_,
          headers: {
            Authorization: `${this.tokens.brasil}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        let mov_esp_bc = () => {
          return new Promise((resolve, reject) => {
            axios(config_esp_bc)
              .then((r) => {
                resolve(r.data);
              })
              .catch((err) => {
                reject();
              });
          });
        };

        let mov_esp_mr = () => {
          return new Promise((resolve, reject) => {
            axios(config_esp_mr)
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
        Promise.all([
          mov_arg(),
          mov_esp_mr(),
          mov_esp_bc(),
          mov_mx(),
          mov_br(),
          mov_cl(),
        ])
          .then((respuestas) => {
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
          })
          .catch((error) => {
            this.ocultarLoading(100);
          });
      };

      const getNeg = async (
        token,
        date_start = "",
        date_end = "",
        currency = ""
      ) => {
        this.mostrarLoading({
          titulo: "Cargando información",
          color: "#03D6F9",
          percent: 0,
        });

        //Si viene filtro de fecha
        let config = {
          headers: {
            Authorization: token,
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
          url:
            date_start && date_end
              ? `https://v3api.herokuapp.com/v1/negocios/meses/${date_start}/${date_end}`
              : `https://v3api.herokuapp.com/v1/negocios`,
        };
        debugger;
        this.token = token;

        await axios(config).then((respuestas) => {
          debugger
          let dt = [];

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
          this.$refs.tipoCambio.setTipoCambio(value);
          this.tipo_cambio_v = null;
        });
      };

      let config;
      let token;
      this.select_empresa = value;
      switch (value) {
        case "Primo españa barcelona": {
          token = this.tokens.esp_barcelona;

          getNeg(token, date_start, date_end, "€");
          break;
        }

        case "Primo españa madrid": {
          token = this.tokens.esp_madrid;

          getNeg(token, date_start, date_end, "€");
          break;
        }

        case "Primo brasil": {
          token = this.tokens.brasil;
          getNeg(token, date_start, date_end, "R$");
          break;
        }

        case "Primo chile": {
          token = this.tokens.chile;
          getNeg(token, date_start, date_end, "$");
          break;
        }

        case "Primo argentina": {
          token = this.tokens.arg;
          getNeg(token, date_start, date_end, "$");
          break;
        }

        case "Primo mexico": {
          token = this.tokens.mex;
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
}

.content {
  display: flow-root;
}

.no-collapsed {
  padding: 50px;
}

.collapsed {
  margin-top: 30px;
  margin-left: 80px;
}

.background-general {
  background-color: #fafafb;
}

.rounded-box {
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px !important;
  border-radius: 20px !important;
  max-width: 400px;
  background-color: white;
}

.main-data-table {
  padding: 20px;
  background-color: white;
  border-radius: 25px !important;
  margin-left: 20px !important;
}
</style>