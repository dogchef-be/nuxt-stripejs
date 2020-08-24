import path from "path";
import { getStripeInstance } from "./plugin";

declare module "vue/types/vue" {
  interface Vue {
    $stripe: typeof getStripeInstance;
  }
}

// eslint-disable-next-line
export default function StripeModule(this: any): void {
  const options = this.options.stripe;
  if (
    typeof options.publishableKey !== "string" ||
    !options.publishableKey.length
  ) {
    throw new Error("nuxt-stripejs: publishableKey is required");
  }

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    ssr: "false",
    options,
  });
}
