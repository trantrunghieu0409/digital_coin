<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row mt-4">
          <div class="col-md-4 mt-4">
            <master-card />
          </div>
          
          <div class="col-md-8 mb-4">
            <payment-card />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <transaction-table />
    </div>
  </div>
</template>


<script>
import MasterCard from "@/main_components/Cards/MasterCard.vue";
import PaymentCard from "./components/PaymentCard.vue";
import InvoiceCard from "./components/InvoiceCard.vue";
import TransactionTable from "./components/TransactionTable.vue";

export default {
  name: "Portfolio",
  components: {
    MasterCard,
    PaymentCard,
    InvoiceCard,
    TransactionTable,
  },
};
</script>
