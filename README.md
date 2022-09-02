<h1 align="center">
  nuxt-stripejs
</h1>
<p align="center">
  NuxtJS module for Stripe.js with multi-account support
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nuxt-stripejs"><img src="https://img.shields.io/npm/v/nuxt-stripejs?style=flat-square"></a> <a href="https://www.npmjs.com/package/nuxt-stripejs"><img src="https://img.shields.io/npm/dt/nuxt-stripejs?style=flat-square"></a> <a href="#"><img src="https://img.shields.io/github/license/dogchef-be/nuxt-stripejs?style=flat-square"></a>
</p>

## Table of contents
- [Main features](#main-features)
- [Setup](#setup)
- [Options](#options)
- [Usage](#usage)
- [License](#license)

## Main features

- Support multiple Stripe accounts
- Load Stripe.js only when required (once `$stripe()` is called)
- Reuse the same instance across all components
- Retry mechanism to bypass temporary network issues
- Public runtime config
- TypeScript support

## Setup

1. Add `nuxt-stripejs` dependency to your project:

```bash
npm install nuxt-stripejs
```

2. Add `nuxt-stripejs` module and configuration to `nuxt.config.js`:

```js
export default {
  // append the module
  modules: ["nuxt-stripejs"];
  
  // public runtime config
  publicRuntimeConfig: {
    stripe: {
      i18n: true,
      accounts: [
        {
          id: 'account-a',
          pubKey: 'pk_test_123',
        },
        {
          id: 'account-b',
          pubKey: 'pk_test_12345',
        },
      ],
    },
  }
}
```

3. (Optional) TypeScript support. Add `nuxt-stripejs` to the `types` section of `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["nuxt-stripejs"]
  }
}
```

## Options

### `accounts`

- Type: `NuxtStripeJsConfig`
```ts
interface NuxtStripeJsAccount {
    id: string
    pubKey: string
}

interface NuxtStripeJsConfig {
    i18n: boolean;
    accounts: NuxtStripeJsAccount[]
}
```

Stripe accounts (see an example in setup)

### `i18n`

- Type: `Boolean`
- Default: `false`

Enable [i18n-module](https://github.com/nuxt-community/i18n-module) integration.

## Usage

It can be used inside components like:

```html
<template>
  <div>
    <div ref="stripeElements" />
  </div>
</template>
```

```js
{
  async mounted() {
    const stripe = await this.$stripe()
    const elements = stripe.elements()

    const card = elements.create('card')
    card.mount(this.$refs.stripeElements)
  }
}
```

Multiple stripe accounts support:

```js
{
  async mounted() {
    const stripe = await this.$stripe(conditionX ? 'account-a' : 'account-b')
    const elements = stripe.elements()

    const card = elements.create('card')
    card.mount(this.$refs.stripeElements)
  }
}
```


Stripe: [JavaScript SDK documentation & reference](https://stripe.com/docs/js)

## License

See the LICENSE file for license rights and limitations (MIT).
