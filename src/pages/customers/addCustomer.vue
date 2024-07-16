<template>
  <div id="add_customer" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter un client</h5>
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
                <label>Nom du client</label>
                <inputText
                  :placeholder="'Entrez la référence du fournisseur'"
                  v-model="form.firstname"
                >
                </inputText>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label>Prénom du client </label>
                <inputText
                  :placeholder="'Entrez la référence'"
                  v-model="form.lastname"
                >
                </inputText>
                <p
                  style="color: red"
                  class="text-red"
                  v-if="errors.nom_client"
                  v-text="errors.nom_client"
                ></p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label>Contact</label>
                <inputText
                  :placeholder="'Entrez le contact'"
                  v-model="form.phone"
                >
                </inputText>
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
              @click="storeCustomer"
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
import { validateCustomerForm } from "../../utils/helpers/formValidation";
import appService from "../../services/appService";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});
export default {
  components: {
    inputText,
  },
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        phone: "",
      },
      customer: [],
      errors: {},
    };
  },
  methods: {
    async storeCustomer() {
      this.errors = validateCustomerForm(this.form);

      if (Object.keys(this.errors).length > 0) {
        toaster.error(`Veuillez remplir tous les champs`, {
          position: "top-right",
        });
        return;
      }

      try {
        const updatedCustomer = await appService.postCustomer(this.form);
        this.$emit("customer-add", updatedCustomer);

        toaster.success(`Client ajouté `, { position: "top-right" });
      } catch (error) {
        toaster.danger(`Client non ajouté `, { position: "top-right" });
        console.error("Erreur lors de l'insertion du client :", error.message);
      }
    },
  },
};
</script>
    