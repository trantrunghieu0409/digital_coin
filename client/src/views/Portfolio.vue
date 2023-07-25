<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-8">
        <div class="row mt-4">
          <div class="col-xl-6 mb-xl-0 mb-4">
            <master-card />
          </div>
          <div class="col-xl-6">
            <div class="row">
              <div class="col-md-6">
                <default-info-card :classIcon="salary.classIcon" :title="salary.title" :desc="salary.desc"
                  :price="salary.price" />
              </div>
              <div class="col-md-6">
                <default-info-card :classIcon="paypal.classIcon" :title="paypal.title" :desc="paypal.desc"
                  :price="paypal.price" />
              </div>
            </div>
          </div>
          <div class="col-md-12 mb-4">
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
import DefaultInfoCard from "@/main_components/Cards/DefaultInfoCard.vue";
import PaymentCard from "./components/PaymentCard.vue";
import InvoiceCard from "./components/InvoiceCard.vue";
import TransactionTable from "./components/TransactionTable.vue";

export default {
  name: "Portfolio",
  components: {
    MasterCard,
    DefaultInfoCard,
    PaymentCard,
    InvoiceCard,
    TransactionTable,
  },
  data() {
    return {
      salary: {
        classIcon: "text-white fas fa-landmark",
        title: "Salary",
        desc: "Belong Interactive",
        price: "+$2000",
      },
      paypal: {
        classIcon: "text-white fab fa-paypal",
        title: "Paypal",
        desc: "Freelance Payment",
        price: "$455.00",
      },
    };
  },
};
</script>
