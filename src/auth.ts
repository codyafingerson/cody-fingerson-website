import NextAuth from "next-auth"
import Zoho from "next-auth/providers/zoho"
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [Zoho]

// map of providers (in case more are added in the future)
export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider();
        return { id: providerData.id, name: providerData.name }
    } else {
        return { id: provider.id, name: provider.name }
    }
}).filter((provider) => provider.id !== "credentials")

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async signIn(params) {
            const { user } = params
            if(user.email && user.email.endsWith("@codyfingerson.com")) {
                return true
            } else {
                return false
            }
        },
    }
})