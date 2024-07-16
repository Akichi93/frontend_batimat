<template>
  <div class="modal custom-modal fade" id="update_stock" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Mise à jour du stock</h3>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Quantité</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="producttoedit.quantity"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  class="btn btn-primary continue-btn"
                  @click="editQuantity"
                  >Mettre à jour</a
                >
              </div>
              <div class="col-6">
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  class="btn btn-primary cancel-btn"
                  >Annuler</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import { createToaster } from "@meforma/vue-toaster";
import appService from '../../services/appService';
const toaster = createToaster({
  /* options */
});
export default {
  props: ["producttoedit"],
  methods: {
    async editQuantity() {
        const uuidProductToUpdate = this.producttoedit.uuidProduct;
        try {
          const updatedProducts = await appService.updateQuantity(
            this.producttoedit,
            uuidProductToUpdate
          );
  
          this.$emit("quantity-updated", updatedProducts);
  
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