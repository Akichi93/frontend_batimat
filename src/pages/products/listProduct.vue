<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Produits</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home"> Tableau de bord </router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Produit
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row filter-row">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <div class="add-emp-section">
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#add_product"
                class="btn btn-success btn-add-emp"
                style="width: auto"
                ><i class="fas fa-plus"></i> Ajouter un produit
              </a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-row">
            <!-- <searchbranche :placeholder="'Rechercher un client'" v-model="q" @keyup="searchtask"></searchbranche> -->
          </div>
          <div class="col-md-12" style="display: flex; justify-content: end">
            <!-- <clientexport></clientexport> -->
          </div>

          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Nom du produit</th>
                    <th>Référence fournisseur</th>
                    <th>Code barre</th>
                    <th>Référence interne</th>
                    <th>Désignation</th>
                    <th>Fournisseur</th>
                    <th>Quantité</th>
                    <th>Montant</th>

                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(product, i) in products" :key="i">
                    <tr>
                      <td v-text="product.product_name"></td>
                      <td v-text="product.supplier_reference"></td>
                      <td v-text="product.barcode"></td>
                      <td v-text="product.internal_reference"></td>
                      <td v-text="product.designation"></td>
                      <td v-text="product.supplier.name"></td>
                      <td v-text="product.quantity"></td>
                      <td v-text="product.amount"></td>

                      <td>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_product"
                          @click="editProduct(product.uuidProduct)"
                          title="Modifier"
                          ><i class="fas fa-pen"></i>
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#update_stock"
                          @click="editProduct(product.uuidProduct)"
                          title="Modifier"
                          ><i class="fas fa-balance-scale"></i>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>

            <addProduct @product-add="refresh"></addProduct>
            <editProduct
              :producttoedit="producttoedit"
              @product-updated="refresh"
            ></editProduct>
            <updateStock
              :producttoedit="producttoedit"
              @quantity-updated="refresh"
            ></updateStock>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import appService from "../../services/appService";
import addProduct from "./addProduct.vue";
import editProduct from "./editProduct.vue";
import updateStock from "./updateStock.vue";

export default {
  name: "listProduct",
  data() {
    return {
      value: null,
      products: [],
      isLoading: true,
      producttoedit: "",
      stocktoedit: "",
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        this.isLoading = true;
        this.products = await appService.getProduct();
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async editProduct(uuidProduct) {
      try {
        this.producttoedit = await appService.getProductByUuid(uuidProduct);
      } catch (error) {
        console.error(error);
      }
    },

    async refresh() {
      this.products = await appService.getProduct();
    },
  },

  components: { Header, Sidebar, addProduct, editProduct, updateStock },
};
</script>
  <style scoped>
</style>
  