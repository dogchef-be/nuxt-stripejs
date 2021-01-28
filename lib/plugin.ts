import { loadStripe } from '@stripe/stripe-js/pure'
import { Plugin } from '@nuxt/types'
import type { Stripe, StripeElementLocale, CheckoutLocale } from '@stripe/stripe-js'

let stripe: Stripe | null

function _isTrue(val: string): boolean {
  return val === "true";
}

function retryDelay(retryCount: number): number {
  const delay = 2 ** retryCount * 500;
  return delay + delay * 0.2 * Math.random();
}

export async function getStripeInstance(locale?: StripeElementLocale | CheckoutLocale): Promise<Stripe | null> {
  if (!stripe) {
    if (!locale && _isTrue("<%= options.i18n %>")) {
      locale = window.$nuxt.$i18n.locale as StripeElementLocale | CheckoutLocale
    }

    let retries: number = 0;

    while (stripe === null && retries < 3) {
      setTimeout(async () => {
        stripe = await loadStripe("<%= options.publishableKey %>", { locale });
        retries++;
      }, retryDelay(retries));
    }

    if (stripe === null && retries === 3) {
      throw new Error("nuxt-stripejs: error loading Stripe");
    }
  }

  return stripe
}

const stripePlugin: Plugin = (ctx, inject): void => {
  inject('stripe', getStripeInstance)
}

export default stripePlugin
