<template>
  <div class="main-wrapper">
    <Header />
    <Sidebar />

    <div class="page-wrapper">
      <!-- Page Content -->
      <div class="content container-fluid">
        <!-- Page Header -->
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Ajouter une commande</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/home">Tableau de bord</router-link>
                </li>
                <li class="breadcrumb-item active">Ajouter une commande</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /Page Header -->

        <div class="row">
          <div class="col-sm-12">
            <form>
              <div class="row">
                <div class="col-sm-12 col-md-6">
                  <div class="input-block mb-16">
                    <label class="col-form-label">
                      Client <span class="text-danger">*</span>
                    </label>
                    <customercomponent
                      :placeholder="'Sélectionnez un client'"
                      @select="optionSelected"
                      v-model="form.customer_id"
                    ></customercomponent>
                    <p
                      style="color: red"
                      class="text-red"
                      v-if="errors.customer_id"
                      v-text="errors.customer_id"
                    ></p>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div class="input-block mb-16">
                    <label class="col-form-label">
                      Méthode de paiement <span class="text-danger">*</span>
                    </label>
                    <paymentcomponent
                      :placeholder="'Sélectionnez un moyen de paiement'"
                      @select="optionSelected"
                      v-model="form.payment"
                    ></paymentcomponent>
                  </div>
                  <p
                      style="color: red"
                      class="text-red"
                      v-if="errors.payment"
                      v-text="errors.payment"
                    ></p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="table-responsive">
                    <table class="table table-hover table-white" id="addTable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th class="col-sm-2">Produit</th>
                          <th>Prix unitaire</th>
                          <th>Quantité</th>
                          <th>Montant</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(product, index) in products" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td>
                            <productcomponent
                              :placeholder="'Sélectionnez un produit'"
                              @select="productSelected(index, $event)"
                              v-model="product.item"
                            ></productcomponent>
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="text"
                              v-model="product.unitPrice"
                              readonly
                            />
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="number"
                              v-model="product.quantity"
                              @input="updateAmount(index)"
                              :placeholder="'Entrez la quantité'"
                            />
                          </td>
                          <span
                            class="text-danger"
                            v-if="product.quantity > product.availableQuantity"
                          >
                            Quantité maximale disponible :
                            {{ product.availableQuantity }}
                          </span>
                          <td>
                            <input
                              class="form-control"
                              type="text"
                              v-model="product.amount"
                              readonly
                            />
                          </td>
                          <td>
                            <a
                              v-if="index === 0"
                              href="javascript:void(0)"
                              class="text-success font-18"
                              title="Add"
                              @click="addProduct"
                              ><i class="fas fa-plus me-2"></i
                            ></a>
                            <a
                              v-else
                              href="javascript:void(0)"
                              class="text-danger font-18"
                              title="Remove"
                              @click="removeProduct(index)"
                              ><i class="fas fa-trash"></i
                            ></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td class="text-end">Total</td>
                          <td class="text-end pe-4">{{ total }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="submit-section">
                <button
                  type="button"
                  class="btn btn-primary submit-btn"
                  @click="storeOrder"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- /Page Content -->
    </div>
  </div>
</template>

<script>
import customercomponent from "../../components/select/customercomponent.vue";
import productcomponent from "../../components/select/productcomponent.vue";
import Header from "../../layout/Header.vue";
import Sidebar from "../../layout/Sidebar.vue";
import appService from "../../services/appService";
import inputNumber from "../../components/input/inputNumber.vue";
import { validateOrderForm } from "../../utils/helpers/formValidation";
import {
  calculateAmount,
  calculateTotal,
} from "../../utils/helpers/calculationHelpers";
import paymentcomponent from "../../components/select/paymentcomponent.vue";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});

export default {
  name: "listProduct",
  components: {
    Header,
    Sidebar,
    customercomponent,
    productcomponent,
    inputNumber,
    paymentcomponent,
  },
  data() {
    return {
      form: {
        customer_id: "",
        payment: "",
      },
      errors: {},
      products: [{ item: "", unitPrice: 0, quantity: 0, amount: 0 }],
    };
  },
  computed: {
    total() {
      return calculateTotal(this.products);
    },
  },
  methods: {
    addProduct() {
      this.products.push({ item: "", unitPrice: 0, quantity: 0, amount: 0 });
    },
    removeProduct(index) {
      this.products.splice(index, 1);
    },
    async productSelected(index, product) {
      // Vérifiez si le produit est déjà sélectionné
      if (this.products.some((p, i) => p.item === product && i !== index)) {
        toaster.error("Ce produit est déjà sélectionné.", {
          position: "top-right",
        });
        this.products[index].item = ""; // Réinitialisez la sélection du produit
        return;
      }

      try {
        const productData = await appService.getProductPrice(product);
        this.products[index].unitPrice = productData.amount;
        this.products[index].availableQuantity = productData.quantity;
        this.updateAmount(index);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    },
    updateAmount(index) {
      const product = this.products[index];
      if (product.quantity > product.availableQuantity) {
        toaster.error(
          `Quantité maximale disponible : ${product.availableQuantity}`,
          { position: "top-right" }
        );
        product.quantity = product.availableQuantity;
      }
      product.amount = calculateAmount(product.unitPrice, product.quantity);
    },
    async storeOrder() {
      this.errors = validateOrderForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez remplir tous les champs`, {
          position: "top-right",
        });
        return;
      }
      try {
        const orderData = {
          customer_id: this.form.customer_id,
          payment_method: this.form.payment,
          total_amount: this.total, // Corrected this line
          products: this.products.map((product) => ({
            productId: product.item,
            quantity: product.quantity,
            unit_price: product.unitPrice,
            amount: product.amount,
          })),
        };

        console.log(orderData);

        const createorder = await appService.postOrder(orderData);

        toaster.success(`Commande ajoutée`, { position: "top-right" });

        this.$router.push("/listorder");
      } catch (error) {
        console.log(
          "Erreur lors de l'ajout de la commande. Veuillez réessayer."
        );
      }
    },
  },
};
</script>
