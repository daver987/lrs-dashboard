<template>
  <q-page class="flex-center">
    <q-card class="max-w-xl mx-auto">
      <q-card-section>
        <div id="paypal-button" ref="myPaypal"></div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { loadScript } from '@paypal/paypal-js'
import { onMounted, ref } from 'vue'

const loadScriptOptions = {
  vault: true,
  currency: 'CAD',
  'buyer-country': 'CA',
  // components: ['buttons'],
  // 'data-namespace': 'paypal_sdk',
  'client-id':
    'AW0hEHQUIkWRqLggFOtU3toB24TPPdTHCHu6wh2Wj5eXAA-ScWOiTVkrz0woXz0H1NDDmQ-dJdQO32CM',
  'data-client-token':
    'eyJicmFpbnRyZWUiOnsiYXV0aG9yaXphdGlvbkZpbmdlcnByaW50IjoiNzlkNTkxMDk1YTY5NGIyZjdiODMwNzM0MzI1NjQwZDU2NzljYTljNmQwY2NhM2FhNzU0NGIzMDc2NDgzNGZmY3xtZXJjaGFudF9pZD1yd3dua3FnMnhnNTZobTJuJnB1YmxpY19rZXk9NjNrdm4zN3Z0MjlxYjRkZiZjcmVhdGVkX2F0PTIwMjItMDMtMTBUMDA6NTY6MDIuNzg5WiIsInZlcnNpb24iOiIzLXBheXBhbCJ9LCJwYXlwYWwiOnsiaWRUb2tlbiI6ImV5SnJhV1FpT2lKbE5EQTJOakE0WWpVMFlUazBORGd4WWprMVl6YzFOREkwT0dOak1USXpaaUlzSW5SNWNDSTZJa3BYVkNJc0ltRnNaeUk2SWxKVE1qVTJJbjAuZXlKcGMzTWlPaUpvZEhSd2N6b3ZMMkZ3YVM1ellXNWtZbTk0TG5CaGVYQmhiQzVqYjIwaUxDSmhkRjlvWVhOb0lqb2lUVlJEZVcxa1RrWnNWV2R0UVRKS09UZ3RSSFJWUVNJc0ltRmpjaUk2V3lKamJHbGxiblFpWFN3aVlYVmtJam9pUVZjd2FFVklVVlZKYTFkU2NVeG5aMFpQZEZVemRHOUNNalJVVUZCa1ZFaERTSFUyZDJneVYybzFaVmhCUVMxVFkxZFBhVlJXYTNKNk1IZHZXSG93U0RGT1JFUnRVUzFrU21SUlR6TXlRMDBpTENKeWIyeGxJam9pVFVWU1EwaEJUbFFpTENKaGRYUm9YM1JwYldVaU9qRTJORFk0TnpNM05qTXNJbUY2SWpvaVoyTndMbk5zWXlJc0ltVjRjQ0k2TVRZME5qZzNORFkyTXl3aWMyVnpjMmx2Ymw5cGJtUmxlQ0k2SW05TllqTmhOV1JoYzJsU1IxaFJRelpIYUhOZlMyVnpVMFE1UnlJc0ltbGhkQ0k2TVRZME5qZzNNemMyTXl3aWFuUnBJam9pVlRKQlFVc3RObEp3TTNOUWJGbEdlRGd4Wm5KbGVHWjFhR1J5WWkwNVRFWTNNSFZzWkcweE5tdDVWbmxDZGxOemN6UnNTSFJvVGpCUGNWaE1VRlpvWjNWUVNGaDVOREpFYmpSSGVFTmxVR1J4U1ZSck4yVTRSMmN3ZFdwcE1GQXlSSGhYT0dORWJWWmtSM2xJZVZwbVQxcDNabVJLYkRVdFRUVkVka3RKYlZFaUxDSmpiR2xsYm5SZmFXUWlPaUpCVnpCb1JVaFJWVWxyVjFKeFRHZG5SazkwVlROMGIwSXlORlJRVUdSVVNFTklkVFozYURKWGFqVmxXRUZCTFZOalYwOXBWRlpyY25vd2QyOVllakJJTVU1RVJHMVJMV1JLWkZGUE16SkRUU0o5LkcxUElyOTh5eEhzWEU2d3d5dmNfQ19ia0VHbTZnbG4wckg3SE1YNDBwZWRMSnUzRUl3WDlmZVMyc1NvWHpRUW1DTC0tQWdrdTJpTlFIajlxUXc1ZWo0cTg0UnBSVVV6Rjc0M0VaZ3pIVkhHQ2VnY0FNc3NDWU80M2t4cGkxdjBfbkZ4cDZCclJGVzFIZ1llR3lCSDVBNGlhMmlpQlozQWpCYmhJV1ZvTGIxSmItNjB4LTZ4aTdtTGxHUExIRGplZDR1WlFaV2pyMFdiNk5vT05iN2NBWmo0MTN3ZGt2ZlRXQ0lmYlprMUM3elBLNHVXaU80eUdheERQUVRtY3o3NXNJU09zMVRzTXA1b0owWmJ2UVc4eHc5RkhrZmJhcFBGZGRHRzhyQk9VOC1HMDJCbkswdG1YWnRJYWVKV0tLekpxRklwVC1EelRLaTBtOWt3MVo3WldNZyIsImFjY2Vzc1Rva2VuIjoiQTIxQUFLZTkxZDNyUjhESjlGX1JSVzUxVFlBSURsbEU1WDhlUnY1a0EzRmhLMV9mRl9EUXl1a1ZMdXdvWnRjN1JpeFViMXFCZ1JIdHVaODZLTUl3YmZBUU9nT051a1VtZyJ9fQ==',
}

const myPaypal = ref(null)
onMounted(() => {
  loadPaypal()
})

const loadPaypal = async () => {
  let paypal
  try {
    paypal = await loadScript(loadScriptOptions)
  } catch (error) {
    console.error('failed to load the PayPal JS SDK script', error)
  }

  if (paypal) {
    try {
      await paypal
        .Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '1.00',
                  },
                },
              ],
            })
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              window.location.href = '/quotes'
            })
          },
        })
        .render(myPaypal.value)
    } catch (error) {
      console.error('failed to render the PayPal Buttons', error)
    }
  }
}
</script>
