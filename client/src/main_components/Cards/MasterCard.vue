<template>
  <div class="card bg-transparent shadow-xl">
    <div class="overflow-hidden position-relative border-radius-xl"
      :style="{ backgroundImage: 'url(' + require('../../assets/img/card-bitcoin.jpg') + ')' }">
      <span class="mask bg-gradient-dark"></span>
      <div class="card-body position-relative z-index-1 p-3">
        <p class="text-white text-sm opacity-8 mb-0">{{ balanceText }}</p>
        <h2 class="text-white mb-5 pb-2">${{ balance * 1.5 }}</h2>
        <div class="d-flex">
          <div class="d-flex">
            <div :class="'me-4'">
              <p class="text-white text-sm opacity-8 mb-0">{{ publicAddressText }}</p>
              <h6 class="text-white mb-0">0x{{ String(address).substring(0,16) }}...</h6>
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
import {http} from '../../plugins/axios.js'

export default {
  name: "master-card",
  components: {
    ArgonAvatar,
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
    getAddress: async function () {
      http.get('/address')
        .then(resp => {
          this.address = resp.data.address;
        })
    },
    getBalance: async function () {
      http.get('/balance')
        .then(resp => {
          this.balance = resp.data.balance;
        })
    },
  }
};
</script>
