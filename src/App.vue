<template>
  <v-app>
    <v-main>
      <router-view />
      <v-dialog v-model="loading.estado" hide-overlay persistent width="300">
        <v-card :color="loading.color" dark>
          <v-card-text mb-3 style="padding-top: 20px;">
            <p class="text-center font-weight-bold titulo">{{ loading.titulo }}</p>
            
            <p class="text-center">
              <v-progress-circular
              indeterminate
              color="white"
              class="text-center"
            ></v-progress-circular>
              
              </p>

          </v-card-text>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data: () => ({
    //
  }),

  computed: {
    ...mapState(["loading"]),
  },
};
</script>

<style scoped>

.titulo{
  font-size: 20px;
  color: white;
}
</style>
