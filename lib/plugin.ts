import { loadStripe } from '@stripe/stripe-js/pure'
import { Plugin } from '@nuxt/types'
import type { Stripe, StripeElementLocale, CheckoutLocale } from '@stripe/stripe-js'

let stripe: Stripe | null

function _isTrue(val: string): boolean {
  return val === "true";
}

export async function getStripeInstance(locale?: StripeElementLocale | CheckoutLocale): Promise<Stripe | null> {
  if (!stripe) {
    if (!locale && _isTrue("<%= options.i18n %>")) {
      locale = window.$nuxt.$i18n.locale as StripeElementLocale | CheckoutLocale
    }

    stripe = await loadStripe("<%= options.publishableKey %>", {
      locale,
    })
  }

  return stripe
}

const stripePlugin: Plugin = (ctx, inject): void => {
  inject('stripe', getStripeInstance)
}

export default stripePlugin
