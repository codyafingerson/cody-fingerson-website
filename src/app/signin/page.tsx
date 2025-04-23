import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/auth";
import { AuthError } from "next-auth";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl = "/" } = await searchParams;

  return (
    <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: callbackUrl,
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(
                  `${SIGNIN_ERROR_URL}?error=${encodeURIComponent(
                    error.message
                  )}`
                );
              }
              throw error;
            }
          }}
        >
          <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">
            <span>Admin Sign-In</span>
          </button>
          <div>
            <p className="text-sm text-gray-500 ml-2">
              Note: Only emails with a domain of codyfingerson.com are allowed to sign in.
            </p>
          </div>
        </form>
      ))}
    </div>
  );
}
