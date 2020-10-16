# nuxt-stripejs

<a href="https://www.npmjs.com/package/nuxt-stripejs"><img src="https://img.shields.io/npm/v/nuxt-stripejs?style=flat-square"></a> <a href="https://www.npmjs.com/package/nuxt-stripejs"><img src="https://img.shields.io/npm/dt/nuxt-stripejs?style=flat-square"></a> <a href="#"><img src="https://img.shields.io/github/license/dogchef-be/nuxt-stripejs?style=flat-square"></a>

NuxtJS module for Stripe.js

## Main features

- Load Stripe.js only when required
- Reuse the same instance across all components
- TypeScript support

## Setup

1. Add `nuxt-stripejs` dependency to your project:

```bash
npm install nuxt-stripejs
```

2. Add `nuxt-stripejs` module and configuration to `nuxt.config.js`:

```js
export default {
  // ...other config options  
  modules: ["nuxt-stripejs"];
  stripe: {
    publishableKey: 'pk_test_XXXXXXXXXXXXXXX',
  }
}
```

3. (Optional) TypeScript support. Add `nuxt-stripejs` to the `types` section of `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": [
      "nuxt-stripejs"
    ]
  }
}
```

## Options

### `publishableKey`

- Type: `String`

Your Stripe's publishable key.

### `i18n`

- Type: `Boolean`

Enable [i18n-module](https://github.com/nuxt-community/i18n-module) integration.

## Usage

It can be used inside components like:

```js
{
  async mounted() {
    const stripe = await this.$stripe()
    const elements = stripe.elements()

    const card = elements.create('card')
    card.mount('card-element');
  }
}
```

Stripe: [JavaScript SDK documentation & reference](https://stripe.com/docs/js)

## License

See the LICENSE file for license rights and limitations (MIT).
