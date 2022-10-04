<template>
  <div id="navbar">
    <v-app-bar color="white" elevation="2" class="navbar">
      <v-app-bar-nav-icon @click="setAside()"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon to="/">
        <Icon icon="subway:power-batton" color="black" />
        <i class="fa-solid fa-light-switch"></i>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  computed: {
    ...mapState(["aside"]),
  },

  methods: {
    ...mapMutations(["mostrarAside", "ocultarAside"]),
    setAside() {
      if (this.aside.estado) {
        this.ocultarAside();
        document.getElementById("container").className = "no-collapsed";
        document.getElementById("navbar").className = "navbar-no-collapsed";
        
      } else {
        this.mostrarAside();
        document.getElementById("container").className = "collapsed";
        document.getElementById("navbar").className = "navbar-collapsed";
      }
    },
  },
};
</script>

<style>
.navbar {
  position: fixed;
  z-index: 2;
  margin-left: 200px;
}

.navbar-collapsed{
  margin-left: -145px;
}

.navbar-no-collapsed{
  margin-left: 0px;
}
</style>