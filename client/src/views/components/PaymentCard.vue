<template>
  <div class="card mt-4">
    <div class="card-header pb-0 p-3">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <h6 class="mb-0">Transfer To Other Wallet</h6>
        </div>
        <div class="col-6 text-end">
          <argon-button color="dark" variant="gradient"  @click="sendTransaction()">
            <i class="ni ni-send text-success me-2"></i> Send
          </argon-button>
        </div>
      </div>
    </div>

    <div class="card-body p-3">
      <div class="row">
        <div class="col-md-6 mb-md-0 mb-4">
          <div class="form-group">
            <label class="form-label">Token</label>
            <input type="email" class="form-control" value="MyCoin" readonly>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="amountToTransfer" class="form-label">Amount</label>
            <input type="number" class="form-control" id="amountToTransfer" placeholder="0" min="0"
              v-model="receiverAmount">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mb-md-0 mb-4">
          <div class="form-group">
            <label for="addressToTransfer" class="form-label">To Address</label>
            <input class="form-control" id="addressToTransfer" placeholder="Enter address" min="0"
              v-model="receiverAddress">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import {http} from '@/plugins/axios.js'

export default {
  name: "payment-card",
  components: {
    ArgonButton,
  },
  data() {
    return {
      'receiverAddress': '',
      'receiverAmount': 0
    }
  },
  methods: {
    sendTransaction: function () {
      if (this.receiverAddress == '' || this.receiverAmount == 0) 
        return

      http.post('/sendTransaction', {
        "ownerPublicAddress": sessionStorage.getItem('address'),
        "address": this.receiverAddress,
        "amount": this.receiverAmount
      })
        .then(resp => {
          alert('send success')
        })
        .catch(function (error) {
          if (error.response.status == 400) 
            alert('You do not have enough money or receiver address does not exist')
        })
    },
  }
};
</script>
