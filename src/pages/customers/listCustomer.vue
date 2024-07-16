<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Clients</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home"> Tableau de bord </router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Client
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
                ><i class="fas fa-plus"></i> Ajouter un client
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
                      <th>Prenom</th>
                      <th>Téléphone</th>
                      <th class="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(customer, i) in customers" :key="i">
                      <tr>
                        <td v-text="customer.firstname"></td>
                        <td v-text="customer.lastname"></td>
                        <td v-text="customer.phone"></td>
                        <td>
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_customer"
                            @click="editCustomer(customer.uuidCustomer)"
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

            <addCustomer @customer-add="refresh"></addCustomer>
            <editCustomer
              :customertoedit="customertoedit"
              @customer-updated="refresh"
            ></editCustomer>
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
import addCustomer from "../customers/addCustomer.vue";
import editCustomer from "../customers/editCustomer.vue";
import loadingcomponent from "../../components/loading/spinnercomponent.vue";

export default {
  name: "dashboard",
  data() {
    return {
      value: null,
      customers: [],
      isLoading: true,
      customertoedit: "",
    };
  },
  created() {
    this.getCustomers();
  },

  methods: {
    async getCustomers() {
      try {
        this.isLoading = true;
        this.customers = await appService.getCustomer();
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async editCustomer(uuidCustomer) {
      try {
        this.customertoedit = await appService.getCustomerByUuid(uuidCustomer);
      } catch (error) {
        console.error(error);
      }
    },

    async refresh() {
      this.customers = await appService.getCustomer();
    },
  },

  components: { Header, Sidebar, addCustomer, editCustomer, loadingcomponent },
};
</script>
    <style scoped>
</style>
    