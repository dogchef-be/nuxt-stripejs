import path from 'path'
import { getStripeInstance } from './plugin'

declare module 'vue/types/vue' {
  interface Vue {
    $stripe: typeof getStripeInstance
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $stripe: typeof getStripeInstance
  }

  interface Context {
    $stripe: typeof getStripeInstance
  }
}

// eslint-disable-next-line
export default function StripeModule(this: any): void {
  const defaults = {
    i18n: false,
  }

  const options = Object.assign({}, defaults, this.options.stripe)
  if (
    typeof options.publishableKey !== 'string' ||
    !options.publishableKey.length
  ) {
    throw new Error('nuxt-stripejs: publishableKey is required')
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: 'false',
    options,
  })
}
