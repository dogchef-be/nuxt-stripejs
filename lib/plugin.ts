import { loadStripe } from '@stripe/stripe-js/pure'
import { Plugin } from '@nuxt/types'
import type { Stripe } from '@stripe/stripe-js'

let stripe: Stripe | null

export async function getStripeInstance(): Promise<Stripe | null> {
  let locale

  const i18n = "<%= options.i18n %>"

  if (i18n === "true") {
    locale = window.$nuxt.$i18n.locale
  }

  if (!stripe)
    stripe = await loadStripe("<%= options.publishableKey %>", {
      locale: locale,
    })

  return stripe
}

const stripePlugin: Plugin = (ctx, inject): void => {
  inject('stripe', getStripeInstance)
}

export default stripePlugin
