<template>
  <div>
    <v-card class="pa-4 rounded-box-div mb-10" outlined>
      <span class="nunito-bold-bright-gray-18px">Mis tareas</span>
      <v-row class="mt-4">
          <v-col
            cols="5"
            v-for="item in indicadores"
            :key="item.name"
            style="margin-right: 30px"
          >
            <v-card
              class="rounded-box"
              width="180"
              height="120"
              color="#F0F5FF"
              outlined>
              <div class="row mt-1 ml-2">
                <div cols="6" style="min-width: 150px">
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
                    <v-avatar color="#FFFFFF" size="50">
                      <v-icon size="40" color="#6871EC">{{ item.icon }}</v-icon>
                    </v-avatar>
                  </div>
                </div>

                <div cols="6" class="mt-2">
                  <span class="nunito-normal-16px">{{ item.nValue }}</span>
                </div>
              </div>

              <div class="row">
                <div cols="6" style="min-width: 120px">
                  <span class="nunito-semi-bold-santas-gray-10px ml-6"
                    >Information text</span
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

       
    </v-card>
  </div>
</template>

<script>
export default {
    data() {
    return {
      indicadores: [
        {
          name: "OCS por aprobar",
          nValue: this.randomNum(),
          icon: "ub-like",
          percent: 0,
        },
        {
          name: "Rendiciones pendientes",
          nValue: this.randomNum(),
          icon: "ub-papel",
          percent: 15,
        },
        
      ],
    };
  },

  methods: {
    randomNum() {
      let res = parseInt(Math.random() * (20));
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
}
</script>

<style>

</style>