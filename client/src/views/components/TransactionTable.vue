<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Latest Transaction</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">TxnHash</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Method</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Block</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Age</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">From</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">To</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Value</th>

              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in transactions">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <i class="ni ni-single-copy-04 me-2"></i>
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ maskValue(item.txnHash) }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <span class="badge badge-sm bg-gradient-success">Transfer</span>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ maskValue(item.block) }}</p>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ item.age }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ maskValue(item.from) }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ maskValue(item.to) }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ item.value }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "transaction-table",
  data() {
    return {
      transactions: [
        {
          "txnHash": "0x12345632132132134567890-=-0987654567890-",
          "block": "0x1234567895345345345345345345345",
          "age": "20 seconds",
          'from': '0x123456789914134235245345345345',
          'to': '0x134611335423545245345345345',
          'value': '500'
        },
        {
          "txnHash": "0x12345632132132134567890-=-0987654567890-",
          "block": "0x1234567895345345345345345345345",
          "age": "20 seconds",
          'from': '0x123456789914134235245345345345',
          'to': '0x134611335423545245345345345',
          'value': '500'
        },
        {
          "txnHash": "0x12345632132132134567890-=-0987654567890-",
          "block": "0x1234567895345345345345345345345",
          "age": "20 seconds",
          'from': '0x123456789914134235245345345345',
          'to': '0x134611335423545245345345345',
          'value': '500'
        },
        {
          "txnHash": "0x12345632132132134567890-=-0987654567890-",
          "block": "0x1234567895345345345345345345345",
          "age": "20 seconds",
          'from': '0x123456789914134235245345345345',
          'to': '0x134611335423545245345345345',
          'value': '500'
        },
      ]
    }
  },
  methods: {
    maskValue: function (value) {
      if (String(value).length > 12)
        return String(value).substring(0, 12) + "..."
      return String(value)
    }
  }
};
</script>
