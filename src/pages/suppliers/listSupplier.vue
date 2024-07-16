<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Fournisseur</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home"> Tableau de bord </router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Fournisseur
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
                data-bs-target="#add_customer"
                class="btn btn-success btn-add-emp"
                style="width: auto"
                ><i class="fas fa-plus"></i> Ajouter un fournisseur
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
              <template v-if="isLoading">
                <loadingcomponent></loadingcomponent>
              </template>
              <template v-else>
                <table class="table table-striped custom-table mb-0">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th class="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(supplier, i) in suppliers" :key="i">
                      <tr>
                        <td v-text="supplier.name"></td>
                        <td v-text="supplier.email"></td>
                        <td v-text="supplier.phone"></td>
                        <td>
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_supplier"
                            @click="editSupplier(supplier.uuidSupplier)"
                            title="Modifier"
                            ><i class="fas fa-pen"></i>
                          </a>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </template>
            </div>

            <addSupplier @supplier-add="refresh"></addSupplier>
            <editSupplier
              :suppliertoedit="suppliertoedit"
              @supplier-updated="refresh"
            ></editSupplier>
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
import addSupplier from "../suppliers/addSupplier.vue";
import editSupplier from "../suppliers/editSupplier.vue";
import loadingcomponent from "../../components/loading/spinnercomponent.vue";

export default {
  name: "dashboard",
  data() {
    return {
      value: null,
      suppliers: [],
      isLoading: true,
      suppliertoedit: "",
    };
  },
  created() {
    this.getSuppliers();
  },

  methods: {
    async getSuppliers() {
      try {
        this.isLoading = true;
        this.suppliers = await appService.getSupplier();
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async editSupplier(uuidSupplier) {
      try {
        this.suppliertoedit = await appService.getSupplierByUuid(uuidSupplier);
      } catch (error) {
        console.error(error);
      }
    },

    async refresh() {
      this.suppliers = await appService.getSupplier();
    },
  },

  components: { Header, Sidebar, addSupplier, editSupplier, loadingcomponent },
};
</script>
      <style scoped>
</style>
      