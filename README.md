# nuxt-stripejs

![npm](https://img.shields.io/npm/v/nuxt-stripejs?style=flat-square) ![npm](https://img.shields.io/npm/dt/nuxt-stripejs?style=flat-square) ![GitHub](https://img.shields.io/github/license/dogchef-be/nuxt-stripejs?style=flat-square)

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

2. Add `nuxt-stripejs` to the `modules` section of `nuxt.config.js`:

```js
export default {
  buildModules: [
    modules: ["nuxt-stripejs"];
  ]
}
```

3. Add `stripe` section to `nuxt.config.js` with module options:

```js
stripe: {
  publishableKey: 'pk_test_XXXXXXXXXXXXXXX',
},
```

## Options

### `publishableKey`

- Type: `String`

Your Stripe's publishable key.

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

4. Enjoy!

## License

See the LICENSE file for license rights and limitations (MIT).
