<template>
  <v-row class="mr-2">
    <v-col cols="12" md="12">
      <v-select :items="items" label="Mensual" class="customSelect" solo dense>
        <template slot="append">
          <v-icon size="5">ub-arrow_down</v-icon>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
    };
  },
};
</script>

<style>
.v-input__control {
  max-width: 90px;
}

.v-select__slot > label {
  font-size: 12px;
}

.v-input__slot {
  background-color: #f6f7f8!important;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px!important;
}

.v-select__selections {
  min-height: 30px;
}

.customSelect {
  float: right;
  border-radius: 20px !important;
}

</style>