<template>
  <div>
    <v-autocomplete
      v-model="value"
      :items="items"
      dense
      filled
      @change="getNegocios(value)"
      label="Seleccione empresa"
    ></v-autocomplete>

  </div>
</template>

<script>
export default {
  data: () => ({
    check_empresas: ["CLP", "MEX", "ESP", "BRA", "ARG"],
    items: [
      "Todas",
      "Primo argentina",
      "Primo brasil",
      "Primo españa",
      "Primo mexico",
      "Primo chile",
    ],
    value: null,
    check_value: null,
  }),
  methods: {
    getNegocios() {
      this.$emit('getEmpresaSelect',this.value);
    },
  },
};
</script>

<style>
</style>