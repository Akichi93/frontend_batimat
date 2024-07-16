<template>
  <div class="modal custom-modal fade" id="view_order" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Détail de la commande</h3>
          </div>
          <printcomponent>
              <template v-slot>
                <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-md-12">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Prix unitaire</th>
                      <th>Quantité</th>
                      <th class="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="detail in ordertoedit.order_details"
                      :key="detail.id"
                    >
                      <td>{{ detail.product.product_name }}</td>

                      <td>{{ formatNumberDecimalWithThousandsSeparator(detail.unit_price)  }}</td>
                      <td>{{ detail.quantity }}</td>
                      <td class="text-end">{{ detail.amount }}</td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <div class="row invoice-payment">
                    <div class="col-sm-7"></div>
                    <div class="col-sm-5">
                      <div class="m-b-20">
                        <div class="table-responsive no-border">
                          <table class="table">
                            <tbody>
                              <tr>
                                <th>Total:</th>
                                <td class="text-end"></td>
                              </tr>

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
              </template>
            </printcomponent>
        
        </div>
      </div>
    </div>
  </div>
</template>
    <script>
import printcomponent from '../../components/print/printcomponent.vue';
import { formatNumberDecimalWithThousandsSeparator } from "../../utils/helpers/thousandSeparator";
export default {
  props: ["ordertoedit"],
   components: {
    printcomponent,
  },
  methods: {
    formatNumberDecimalWithThousandsSeparator,
    print() {
      const printContents = document.getElementById("printMe").innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    },
  },
};
</script>