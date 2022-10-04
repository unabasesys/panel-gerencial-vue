<template>
  <div>
    <div>
      <h5>asdasd</h5>
      <div>
        <Navbar />

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