<template>
    <Multiselect
      :value="product"
      :options="products"
      :custom-label="
        ({ uuidProduct, product_name }) =>
          `${uuidProduct} - [${product_name}]`
      "
      valueProp="uuidProduct"
      :placeholder="placeholder"
      label="product_name"
      track-by="product_name"
      :searchable="true"
    >
    </Multiselect>
  </template>
    <script>
  import Multiselect from "@vueform/multiselect";
  import appService from "../../services/appService";
  
  export default {
    name: "productcomponent",
    props: ["product", "placeholder"],
    data() {
      return {
        products: [],
      };
    },
  
    mounted() {
      this.getProduct();
    },
    created() {
      this.getProduct();
    },
  
    methods: {
      async getProduct() {
        this.products = await appService.getProduct();
      },
    },
    components: { Multiselect },
  };
  </script>