<template>
  <div>
    <Aside :username="username" />
    <Navbar />

    <div id="container" class="content no-collapsed">
      <v-row style="padding-top: 20px">
        <v-col cols="4">
          <v-card
            class="mx-auto card-2 rounded-box"
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
      </v-row>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Aside from "../components/Aside.vue";
export default {
  components: {
    Navbar,
    Aside,
  },

  data() {
    return {
      username: this.$route.params.username,
      indicadores: [
        {
          name: 'Ventas',
          nValue: this.randomNum(),
          icon: 'fa-sack-dollar',
          percent: 0,
        },
        {
          name: 'Utilidad Presupuestada',
          nValue: this.randomNum(),
          icon: 'mdi-calculator',
          percent: 15,
        },
        {
          name: 'Costo Final Estimado',
          nValue: this.randomNum(),
          icon: 'fa-hand-holding-dollar',
          percent: 0,
        },
        {
          name: 'Utilidad Real',
          nValue: this.randomNum(),
          icon: 'fa-money-bill-trend-up',
          percent: 35,
        },

        {
          name: 'Valor de Oportunidad',
          nValue: this.randomNum(),
          icon: 'fa-money-bill-trend-up',
          percent: 0,
        },

        {
          name: 'Porcentaje de Éxito',
          nValue: this.randomNum(),
          icon: 'fa-money-bill-trend-up',
          percent: 0,
        },
      ],
    };
  },
};
</script>

<style>
</style>