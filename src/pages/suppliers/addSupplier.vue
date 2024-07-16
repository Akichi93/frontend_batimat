
<template>
    <div id="add_customer" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter un fournisseur</h5>
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
                  <label>Nom du fournisseur</label>
                  <inputText
                    :placeholder="'Entrez la référence du fournisseur'"
                    v-model="form.name"
                  >
                  </inputText>
                  <p
                    style="color: red"
                    class="text-red"
                    v-if="errors.name"
                    v-text="errors.name"
                  ></p>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Email </label>
                  <inputText
                    :placeholder="'Entrez la référence'"
                    v-model="form.email"
                  >
                  </inputText>
                  <p
                    style="color: red"
                    class="text-red"
                    v-if="errors.email"
                    v-text="errors.email"
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
                  <p
                    style="color: red"
                    class="text-red"
                    v-if="errors.phone"
                    v-text="errors.phone"
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
                @click="storeSupplier"
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
  import { validateSupplierForm } from "../../utils/helpers/formValidation";
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
          name: "",
          email: "",
          phone: "",
        },
        supplier: [],
        errors: {},
      };
    },
    methods: {
      async storeSupplier() {
        this.errors = validateSupplierForm(this.form);
  
        if (Object.keys(this.errors).length > 0) {
          toaster.error(`Veuillez remplir tous les champs`, {
            position: "top-right",
          });
          return;
        }
  
        try {
          const updatedSupplier = await appService.postSupplier(this.form);
          this.$emit("supplier-add", updatedSupplier);
  
          toaster.success(`Fournisseur ajouté `, { position: "top-right" });
        } catch (error) {
          toaster.error(`Fournisseur non ajouté `, { position: "top-right" });
          console.error("Erreur lors de l'insertion du client :", error.message);
        }
      },
    },
  };
  </script>
      