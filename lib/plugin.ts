import { loadStripe } from '@stripe/stripe-js/pure'
import { Plugin } from '@nuxt/types'
import type { Stripe, StripeElementLocale, CheckoutLocale } from '@stripe/stripe-js'

let stripe: Stripe | null

function _isTrue(val: string): boolean {
  return val === 'true'
}

function delayNextRetry(retryCount: number): Promise<void> {
  const delay = 2 ** retryCount * 500
  return new Promise(resolve => {
    setTimeout(resolve, delay + delay * 0.2 * Math.random())
  })
}

export async function getStripeInstance(
  locale?: StripeElementLocale | CheckoutLocale
): Promise<Stripe | null> {
  if (!stripe) {
    if (!locale && _isTrue('<%= options.i18n %>')) {
      locale = window.$nuxt.$i18n.locale as StripeElementLocale | CheckoutLocale
    }

    let retries = 0
    do {
      try {
        stripe = await loadStripe('<%= options.publishableKey %>', { locale })
      } catch (e) {
        stripe = null
        retries++
        await delayNextRetry(retries)
      }
    } while (!stripe && retries < 3)

    if (!stripe) {
      throw new Error(
        `nuxt-stripejs: Failed to load Stripe.js after ${retries} retries`
      )
    }
  }

  return stripe
}

const stripePlugin: Plugin = (ctx, inject): void => {
  inject('stripe', getStripeInstance)
}

export default stripePlugin
