<template>
  <div class="main-wrapper">
    <Header />

    <Sidebar />

    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <!-- Page Content -->
      <div class="content container-fluid">
        <!-- Page Header -->
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Bienvenue {{ name }}!</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item active">Tableau de bord</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->

        <div class="row">
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="card dash-widget">
              <div class="card-body">
                <span class="dash-widget-icon"
                  ><i class="fa-solid fa-cubes"></i
                ></span>
                <div class="dash-widget-info">
                  <h3>{{ dashboardData.total_products }}</h3>
                  <span>Produits</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="card dash-widget">
              <div class="card-body">
                <span class="dash-widget-icon"
                  ><i class="fa-solid fa-dollar-sign"></i
                ></span>
                <div class="dash-widget-info">
                  <h3>{{ dashboardData.total_customers }}</h3>
                  <span>Clients</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="card dash-widget">
              <div class="card-body">
                <span class="dash-widget-icon"
                  ><i class="fa-regular fa-gem"></i
                ></span>
                <div class="dash-widget-info">
                  <h3>{{ dashboardData.total_suppliers }}</h3>
                  <span>Fournisseurs</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="card dash-widget">
              <div class="card-body">
                <span class="dash-widget-icon"
                  ><i class="fa-solid fa-user"></i
                ></span>
                <div class="dash-widget-info">
                  <h3>{{ dashboardData.total_orders }}</h3>
                  <span>Commandes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Page Content -->
    </div>
    <!-- /Page Wrapper -->
  </div>
</template>
<script>
import AppStorage from "../db/AppStorage";
import Header from "../layout/Header.vue";
import Sidebar from "../layout/Sidebar.vue";
import { apiUrl } from "../utils/constants/apiUrl";
import axios from "axios";

export default {
  name: "dashboard",
  data() {
    return {
      name: AppStorage.getUser(),
      dashboardData: {},
    };
  },
  created() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await axios.get(apiUrl.getdashboard);
        this.dashboardData = response.data;
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    },
  },

  components: { Header, Sidebar },
};
</script>
<style scoped>
</style>

