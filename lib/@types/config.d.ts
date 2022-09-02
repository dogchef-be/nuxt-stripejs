import { NuxtConfig } from "@nuxt/types";

interface NuxtStripeJsAccount {
    id: string
    pubKey: string
}

interface NuxtStripeJsConfig {
    i18n: boolean;
    accounts: NuxtStripeJsAccount[]
}