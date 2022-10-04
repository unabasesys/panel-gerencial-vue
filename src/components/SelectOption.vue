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
      "Primo argentina",
      "Primo brasil",
      "Primo españa barcelona",
      "Primo españa madrid",
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