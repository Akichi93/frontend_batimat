<template>
  <div id="edit_customer" class="modal custom-modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier client</h5>
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
                  <label>Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Entrez la boîte postale"
                    v-model="customertoedit.firstname"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Numéro de téléphone"
                    v-model="customertoedit.lastname"
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Contact</label>
              <input
                type="text"
                class="form-control"
                placeholder="fax du client"
                v-model="customertoedit.phone"
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
                @click="editCustomer"
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
  props: ["customertoedit"],
  name: "editcustomer",
  methods: {
    async editCustomer() {
      const uuidCustomerToUpdate = this.customertoedit.uuidCustomer;
      try {
        const updatedClients = await appService.updateCustomer(
          this.customertoedit,
          uuidCustomerToUpdate
        );

        this.$emit("customer-updated", updatedClients);

        toaster.success(`Client modifié`, {
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
  