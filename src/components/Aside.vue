<template>
  <div>
    <v-navigation-drawer
      permanent
      :expand-on-hover="aside.estado"
      :width="200"
      class="aside"
    >
      <v-list>
        <v-list-item class="text-center">
          <v-img
            v-if="aside.estado"
            lazy-src="../assets/logo_chico.png"
            max-height="30"
            max-width="30"
            src="../assets/logo_chico.png"
          ></v-img>

          <v-img
            v-if="!aside.estado"
            lazy-src="../assets/logo_unabase.png"
            max-height="40"
            max-width="140"
            src="../assets/logo_unabase.png"
          ></v-img>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link to="/dashboard" color="#03D6F9" hover="#03D6F9">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/panel" color="#03D6F9" hover="#03D6F9">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Panel</v-list-item-title>
        </v-list-item>

        <v-list-item link color="#03D6F9">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Configuración</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    username: String,
  },
  computed: {
    ...mapState(["aside"]),
  },
};
</script>

<style>
.aside {
  float: left;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  z-index: 1;
}

.item-list:hover{
    background-color: yellow;
}
</style>