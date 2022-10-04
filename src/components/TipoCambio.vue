<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>{{ snackbar_message }}</span>
      <v-btn text color="white" @click="snackbar = false"> Cerrar </v-btn>
    </v-snackbar>

    <v-row class="mt-8 ml-1">
      <v-dialog v-model="dialog" persistent max-width="600px" v-if="this.empresa != ''">
        <template v-slot:activator="{ on, attrs }">
          <v-btn rounded color="#1BA988" dark v-bind="attrs" v-on="on">
            Tipo cambio
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Actualizar tipo de cambio</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-subheader>1 Dolar:</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Valor"
                    v-model="valor_dolar"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>1 EURO:</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Valor"
                    v-model="valor_euro"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Cerrar
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveTipoCambio()">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data: () => ({
    dialog: false,
    valor_dolar: "",
    valor_euro: "",
    id_cambio: "",
    snackbar: false,
    snackbar_message: "",
  }),

  props: {
    empresa: String,
  },

  methods: {
    ...mapMutations(["mostrarLoading", "ocultarLoading", "setTipoCambioStore"]),
    setSnackbar(message) {
      this.snackbar = true;
      this.snackbar_message = message;
    },
    setTipoCambio(empresa) {
      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "https://dev3.unabase.com/node/get-tipo-cambio",
        method: "POST",
        data: {
          hostname: "https://dev3.unabase.com",
          empresa,
        },
      };

      debugger
      axios(config).then((respuestas) => {
        debugger
        if (respuestas.data[0].total_records > 0) {
          this.valor_dolar = respuestas.data[0].rows[0].valor_dolar;
          this.valor_euro = respuestas.data[0].rows[0].valor_euro;
          this.id_cambio = respuestas.data[0].rows[0].id;

          //Seteo de tipos de cambio en store
          let data_cambio = {
            valorEuro: respuestas.data[0].rows[0].valor_euro,
            valorDolar: respuestas.data[0].rows[0].valor_dolar,
          };
          let dt = [];
          dt.push(data_cambio);
          this.setTipoCambioStore(dt);
        } else {
          this.valor_dolar = "";
          this.valor_euro = "";
          this.id_cambio = "";
        }
      });
    },
    async saveTipoCambio() {
      if (this.empresa != "") {
        this.dialog = false;
        let config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          url: "https://dev3.unabase.com/node/save-tipo-cambio",
          //timeout: 5000,
          data: {
            hostname: "https://dev3.unabase.com",
            tipo_empresa: this.empresa,
            valor_dolar: this.valor_dolar,
            valor_euro: this.valor_euro,
            id_cambio: this.id_cambio,
          },
        };

        console.log("DATA: ", config.data);

        await axios(config).then((respuestas) => {
          if (respuestas.data[0].success) {
            this.setSnackbar("Actualizado con exito!");
          } else {
            this.setSnackbar("Error al actualizar!");
          }
        });
      } else {
        this.setSnackbar("Seleccione una empresa");
      }
    },
  },
  created: function () {




  },
};
</script>

<style>
</style>