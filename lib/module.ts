import path from 'path'
import { NuxtStripeJsConfig } from './@types/config'
import { getStripe } from './plugin'

declare module 'vue/types/vue' {
  interface Vue {
    $stripe: typeof getStripe
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $stripe: typeof getStripe
  }

  interface Context {
    $stripe: typeof getStripe
  }
}

function validateOptions(options: NuxtStripeJsConfig) {
  if (options.accounts.length === 0) {
    throw new Error('nuxt-stripejs: No stripe accounts were defined');
  }
  options.accounts.forEach((account) => {
    if (!account.id || account.id.length === 0) {
      throw new Error('nuxt-stripejs: Empty stripe account id');
    }
    if (!account.pubKey || account.pubKey.length === 0) {
      throw new Error('nuxt-stripejs: Empty stripe account publishable key');
    }
  });
}

// eslint-disable-next-line
export default function StripeModule(this: any): void {
  const { nuxt } = this

  const defaults = { i18n: false }
  const options: NuxtStripeJsConfig = Object.assign({}, defaults, nuxt.options.publicRuntimeConfig.stripe, this.options.stripe)

  validateOptions(options)

  // Assign options to the public runtime config
  nuxt.options.publicRuntimeConfig.stripe = options

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: 'false',
    options,
  })
}
