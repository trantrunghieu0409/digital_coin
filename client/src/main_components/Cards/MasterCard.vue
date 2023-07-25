<template>
  <div class="card bg-transparent shadow-xl">
    <div class="overflow-hidden position-relative border-radius-xl"
      :style="{ backgroundImage: 'url(' + require('../../assets/img/card-bitcoin.jpg') + ')' }">
      <span class="mask bg-gradient-dark"></span>
      <div class="card-body position-relative z-index-1 p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="text-white text-sm opacity-8 mb-0">{{ balanceText }}</p>
            <h2 class="text-white mb-5 pb-2">${{ balance * 1.5 }}</h2>
          </div>
          <div>
            <argon-button color="white" variant="outline" @click="mineBlock()">
              <i class="fa fa-plus text-warning me-2"></i> Mine Block
            </argon-button>
          </div>
        </div>
        <div class="d-flex">
          <div class="d-flex">
            <div :class="'me-4'">
              <p class="text-white text-sm opacity-8 mb-0">{{ publicAddressText }}</p>
              <h6 class="text-white mb-0">0x{{ String(address).substring(0, 16) }}...
                <i style="cursor: pointer;" class="ni ni-ungroup text-sm opacity-8 mb-0" @click="copyURL(address)">
                  Copy</i>
              </h6>
            </div>
            <div :class="'me-4'">
              <p class="text-white text-sm opacity-8 mb-0">{{ coinText }}</p>
              <h6 class="text-white mb-0">{{ balance }}</h6>
            </div>

          </div>
          <div class="w-20 d-flex align-items-end justify-content-end" :class="'ms-auto'">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ArgonAvatar from "@/components/ArgonAvatar.vue";
import img from "../../assets/img/card-visa.jpg";
import img1 from "../../assets/img/logos/mastercard.png";
import ArgonButton from "@/components/ArgonButton.vue";
import { http } from '../../plugins/axios.js'

export default {
  name: "master-card",
  components: {
    ArgonAvatar,
    ArgonButton
  },
  props: {
    balanceText: {
      type: String,
      default: "Balance",
    },
    publicAddressText: {
      type: String,
      default: "Public Address",
    },
    coinText: {
      type: String,
      default: "Coin(s)",
    },
  },
  data() {
    return {
      img,
      img1,
      'address': null,
      'balance': null,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init: function () {
      this.getAddress();
      this.getBalance();
    },
    getAddress: function () {
      this.address = sessionStorage.getItem('address')
    },
    getBalance: function () {
      http.get(`/balance/${this.address}`)
        .then(resp => {
          this.balance = resp.data.balance;
        })
    },
    mineBlock: function () {
      http.post(`/mineBlock/${this.address}`)
        .then(resp => {
          this.getBalance()
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
    },
    async copyURL(mytext) {
      try {
        await navigator.clipboard.writeText(mytext);
        alert("Copied")
      } catch ($e) {
      }
    }
  }
};
</script>
