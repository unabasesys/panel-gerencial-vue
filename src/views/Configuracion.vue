<template>
  <div>
    <div>
      <Aside />

      <div>
        <Navbar />

        <v-row class="mt-10" style="margin-left: 220px; margin-top: 30px">
          <v-col cols="4" class="ml-10">
            <v-autocomplete
              v-model="value"
              :items="items"
              dense
              filled
              label="Seleccione usuario"
            ></v-autocomplete>
            <v-card>
              <v-toolbar color="#FC4903" dark>
                <v-toolbar-title>Listado de empresas</v-toolbar-title>
              </v-toolbar>

              <v-divider></v-divider>

              <v-list subheader two-line flat>
                <v-list-item-group v-model="settings" multiple>
                  <v-list-item>
                    <template v-slot:default="{ active }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="primary"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>Primo argentina</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:default="{ active }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="primary"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>Primo méxico</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:default="{ active }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="primary"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>Primo brasil</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:default="{ active }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="primary"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>Primo chile</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:default="{ active }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="primary"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>Primo españa</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>

            <div class="text-center mt-10">
              <v-btn color="#34CC02" dark> Asignar </v-btn>
            </div>
            
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Aside from "../components/Aside.vue";
export default {
  data: () => ({
    settings: [],
    items: ["Soporte", "Soporte2"],
    value: null,
  }),
  components: {
    Navbar,
    Aside,
  },
};
</script>

<style>
</style>