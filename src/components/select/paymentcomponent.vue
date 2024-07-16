<template>
    <Multiselect
      :value="value"
      :options="valeurs"
      :custom-label="customLabel"
      valueProp="id"
      :placeholder="placeholder"
      label="label"
      track-by="id"
      :searchable="true"
      class="form-control"
    />
  </template>
  
  <script>
  import Multiselect from "@vueform/multiselect";
  
  export default {
    name: "paymentcomponent",
    props: ["value", "placeholder"],
    data() {
      return {
        valeurs: [
          { id: "CHECK", label: "Chèque" },
          { id: "CASH", label: "Liquidité" },
          { id: "CREDIT_CARD", label: "Carte de crédit" },
        ],
      };
    },
    components: { Multiselect },
    methods: {
      customLabel({ id, label }) {
        return `${id} - [${label}]`;
      },
    },
  };
  </script>