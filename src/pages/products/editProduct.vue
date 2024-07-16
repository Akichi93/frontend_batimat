<template>
    <div id="edit_product" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier produit</h5>
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
            <form>
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>Nom du produit</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="producttoedit.product_name"
                    />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>Barcode</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="producttoedit.barcode"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Désignation</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="producttoedit.designation"
                />
              </div>
              <div class="form-group">
                <label>Référence fournisseur</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="producttoedit.supplier_reference"
                />
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
                  @click="editProduct"
                  data-bs-dismiss="modal"
                >
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
    <script>
  import { createToaster } from "@meforma/vue-toaster";
  import appService from "../../services/appService";
  
  const toaster = createToaster({
    /* options */
  });
  export default {
    props: ["producttoedit"],
    name: "editproduct",
    methods: {
      async editProduct() {
        const uuidProductToUpdate = this.producttoedit.uuidProduct;
        try {
          const updatedProducts = await appService.updateProduct(
            this.producttoedit,
            uuidProductToUpdate
          );
  
          this.$emit("product-updated", updatedProducts);
  
          toaster.success(`Produit modifié`, {
            position: "top-right",
          });
        } catch (error) {
         
          toaster.error(
            `Une erreur s'est produite lors de la mise à jour du client`,
            {
              position: "top-right",
              duration: 4000,
            }
          );
        }
      },
    },
  };
  </script>
    