<template>
  <div class="background-general">
    <dashboard />

  </div>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
export default {
  data: () => ({
    settings: [],
    items: ["Soporte", "Soporte2"],
    value: null,
  }),
  components: {
    Dashboard,
  },
};
</script>

<style>
  .background-general {
  background-color: #fafafb;
}
</style>