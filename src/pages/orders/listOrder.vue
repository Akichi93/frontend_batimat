<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="page-head-box">
              <h3>Commandes</h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/home"> Tableau de bord </router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Commande
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-8"></div>
          <div class="col-md-4 text-end">
            <router-link to="/addorder" class="btn btn-primary">
              <i class="fas fa-plus me-2"></i>Ajouter commande
            </router-link>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>Nom du client</th>
                    <th>Prénom du client</th>
                    <th>Contact du client</th>
                    <th>Methode de paiement</th>
                    <th>Date d'achat</th>

                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(order, i) in orders" :key="i">
                    <tr>
                      <td>
                        {{ order.customer.firstname }}
                      </td>
                      <td>
                        {{ order.customer.lastname }}
                      </td>
                      <td>{{ order.customer.phone }}</td>
                      <td>{{ order.payment_method }}</td>
                      <td>{{ formatDateTime(order.created_at) }}</td>
                      <td>
                        <a
                          href="#"
                          @click="editOrder(order.uuidOrder)"
                          data-bs-toggle="modal"
                          data-bs-target="#view_order"
                          title="Voir"
                          ><i class="fas fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>

            <viewOrder :ordertoedit="ordertoedit"></viewOrder>
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
import { formatDateTime } from "../../utils/helpers/dateFormat";
import viewOrder from "./viewOrder.vue";

export default {
  name: "listOrder",
  data() {
    return {
      value: null,
      orders: [],
      isLoading: true,
      ordertoedit: "",
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    formatDateTime,
    async getOrders() {
      try {
        this.isLoading = true;
        this.orders = await appService.getOrder();
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async editOrder(uuidOrder) {
      try {
        this.ordertoedit = await appService.getOrderByUuid(uuidOrder);
      } catch (error) {
        console.error(error);
      }
    },
  },

  components: { Header, Sidebar, viewOrder },
};
</script>
    <style scoped>
</style>
    