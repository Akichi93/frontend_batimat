<template>
  <Multiselect
    :value="supplier"
    :options="suppliers"
    :custom-label="
      ({ uuidSupplier, name }) =>
        `${uuidSupplier} - [${name}]`
    "
    valueProp="uuidSupplier"
    :placeholder="placeholder"
    label="name"
    track-by="name"
    :searchable="true"
  >
  </Multiselect>
</template>
  <script>
import Multiselect from "@vueform/multiselect";
import appService from "../../services/appService";

export default {
  name: "suppliercomponent",
  props: ["supplier", "placeholder"],
  data() {
    return {
      suppliers: [],
    };
  },

  mounted() {
    this.getSupplier();
  },
  created() {
    this.getSupplier();
  },

  methods: {
    async getSupplier() {
      this.suppliers = await appService.getSupplier();
    },
  },
  components: { Multiselect },
};
</script>