import { loadStripe } from '@stripe/stripe-js/pure'
import { Plugin } from '@nuxt/types'
import { Stripe, StripeElementLocale, CheckoutLocale } from '@stripe/stripe-js'
import { NuxtStripeJsAccount, NuxtStripeJsConfig } from './@types/config'

const stripeInstances: { accountId: string, instance: Stripe }[] = []

function delayNextRetry(retryCount: number): Promise<void> {
  const delay = 2 ** retryCount * 500
  return new Promise(resolve => {
    setTimeout(resolve, delay + delay * 0.2 * Math.random())
  })
}

function getAccountConfig(accountId?: string) {
  let account = null;
  if (accountId) {
    account = getModuleConfig().accounts.find((account: NuxtStripeJsAccount) => account.id === accountId)
    if (!account) {
      throw new Error(`nuxt-stripejs: Configuration not found for account ${accountId}`)
    }
  }

  return account ? account : getModuleConfig().accounts[0]
}

function getStripeInstance(accountId: string): Stripe | null {
  const stripeInstance = stripeInstances.find((i) => i.accountId === accountId)
  return stripeInstance ? stripeInstance.instance : null
}

function getModuleConfig(): NuxtStripeJsConfig {
  return window.$nuxt.$config.stripe
}

export async function getStripe(
  accountId?: string,
  locale?: StripeElementLocale | CheckoutLocale
): Promise<Stripe | null> {
  const accountConfig = getAccountConfig(accountId)

  let instance = getStripeInstance(accountConfig.id)
  if (!instance) {
    if (!locale && getModuleConfig().i18n) {
      locale = window.$nuxt.$i18n.locale as StripeElementLocale | CheckoutLocale
    }

    let retries = 0
    do {
      try {
        instance = await loadStripe(accountConfig.pubKey, { locale })
      } catch (e) {
        instance = null
        retries++
        await delayNextRetry(retries)
      }
    } while (!instance && retries < 3)

    if (!instance) {
      throw new Error(
        `nuxt-stripejs: Failed to load Stripe.js after ${retries} retries`
      )
    }

    // Append instance
    stripeInstances.push({
      accountId: accountConfig.id,
      instance: instance
    })
  }

  return instance
}

const stripePlugin: Plugin = (ctx, inject): void => {
  inject('stripe', getStripe)
}

export default stripePlugin
