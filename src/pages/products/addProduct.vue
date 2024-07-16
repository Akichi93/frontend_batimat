
<template>
  <div id="add_product" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter un produit</h5>
          <button
            type="button"
            class="close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Nom du produit</label>
                <inputText
                  :placeholder="'Entrez le nom du produit'"
                  v-model="form.product_name"
                >
                </inputText>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.product_name"
                  v-text="errors.product_name"
                ></p>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Référence fournisseur</label>
                <inputText
                  :placeholder="'Entrez la référence du fournisseur'"
                  v-model="form.supplier_reference"
                >
                </inputText>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.supplier_reference"
                  v-text="errors.supplier_reference"
                ></p>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Barcode </label>
                <inputText
                  :placeholder="'Entrez le code'"
                  v-model="form.barcode"
                >
                </inputText>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.barcode"
                  v-text="errors.barcode"
                ></p>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Désignation </label>
                <inputText
                  :placeholder="'Entrez le code'"
                  v-model="form.designation"
                >
                </inputText>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.designation"
                  v-text="errors.designation"
                ></p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Montant</label>
                <inputNumber
                  :numberValue="form.amount"
                  :placeholder="'Entrez le montant'"
                  @update:numberValue="updateAmount"
                >
                </inputNumber>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.amount"
                  v-text="errors.amount"
                ></p>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Quantité</label>
                <inputNumber
                  :numberValue="form.quantity"
                  :placeholder="'Entrez la quantité'"
                  @update:numberValue="updateQuantity"
                >
                </inputNumber>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.quantity"
                  v-text="errors.quantity"
                ></p>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Fournisseur</label>
                <suppliercomponent
                  :placeholder="'selectionnez le fournisseur'"
                  @select="optionSelected"
                  v-model="form.supplier_id"
                ></suppliercomponent>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.supplier_id"
                  v-text="errors.supplier_id"
                ></p>
              </div>
            </div>
          </div>

          <div class="submit-section">
            <button
              type="button"
              class="btn btn-primary cancel-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Annuler
            </button>
            <button
              type="button"
              class="btn btn-primary submit-btn"
              @click="storeProduct"
              data-bs-dismiss="modal"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    <script>
import inputText from "../../components/input/inputText.vue";
import inputNumber from "../../components/input/inputNumber.vue";
import { validateProductForm } from "../../utils/helpers/formValidation";
import appService from "../../services/appService";
import { createToaster } from "@meforma/vue-toaster";
import Suppliercomponent from "../../components/select/suppliercomponent.vue";

const toaster = createToaster({
  /* options */
});
export default {
  components: {
    inputText,
    inputNumber,
    Suppliercomponent,
  },
  data() {
    return {
      form: {
        supplier_reference: "",
        product_name:"",
        barcode: "",
        designation:"",
        amount: 0,
        quantity: 0,
        supplier_id: "",
      },
      supplier: [],
      errors: {},
    };
  },
  methods: {
    updateAmount(value) {
      this.form.amount = value;
    },
    updateQuantity(value) {
      this.form.quantity = value;
    },
    async storeProduct() {
      this.errors = validateProductForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez remplir tous les champs`, {
          position: "top-right",
        });
        return;
      }

      try {
        const updatedProduct = await appService.postProduct(this.form);
        this.$emit("product-add", updatedProduct);

        toaster.success(`Fournisseur ajouté `, { position: "top-right" });
      } catch (error) {
        toaster.error(`Fournisseur non ajouté `, { position: "top-right" });
        console.error("Erreur lors de l'insertion du client :", error.message);
      }
    },
  },
};
</script>
    