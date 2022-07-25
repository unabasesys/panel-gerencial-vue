<template>
  <div>
    <v-container>
      <v-row class="container">
        <v-col cols="12">
          <v-card elevation="5">
            <v-alert :value="alert" :type="tag">{{ enable }}</v-alert>
            <v-row>
              <v-col cols="12" style="text-align: center; margin-top: 10px"
                ><img width="250" src="../assets/logo_unabase.png" />
              </v-col>
            </v-row>
            <v-col
              cols="12"
              style="
                padding-left: 120px;
                padding-right: 120px;
                text-align: center;
              "
            >
              <form>
                <v-text-field
                  label="Usuario"
                  required
                  v-model="user"
                ></v-text-field>
                <v-text-field
                  label="Contraseña"
                  type="password"
                  v-model="password"
                  required
                ></v-text-field>
              </form>
              <v-btn
                color="#34CC06"
                elevation="16"
                large
                style="margin-bottom: 10px"
                @click="login(password, user)"
                ><h4 style="color: white">Iniciar sesión</h4></v-btn
              >
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      user: "",
      password: "",
      enable: "",
      alert: false,
      tag: "success",
    };
  },

  methods: {
    login() {
      if (this.password && this.user) {
        if (this.password == "primo2022" && this.user == "primo") {
          this.$router.push({name: 'Panel'})
          this.tag = "success";
        } else {
          this.alert = true;
          this.enable = "Error en las credenciales";
          this.tag = "error";
        }
      } else {
        this.alert = true;
        this.enable = "Ingrese usuario y contraseña";
        this.tag = "warning";
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
  padding-left: 15%;
  padding-right: 15%;
}
</style>

