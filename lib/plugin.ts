import { loadStripe } from '@stripe/stripe-js/pure'
import { Plugin } from '@nuxt/types'
import type { Stripe } from '@stripe/stripe-js'

let stripe: Stripe | null

export async function getStripeInstance(): Promise<Stripe | null> {
  if (!stripe) stripe = await loadStripe('<%= options.publishableKey %>')

  return stripe
}

const stripePlugin: Plugin = (ctx, inject): void => {
  inject('stripe', getStripeInstance)
}

export default stripePlugin
