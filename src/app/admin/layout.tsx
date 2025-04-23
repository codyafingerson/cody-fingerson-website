import { auth } from "@/auth"
import SubContainer from "@/components/SubContainer";
import SubNavbar from "@/components/SubNav";
import Link from "next/link";

const adminRoutes = [
    { path: '/admin', label: 'Admin Home' },
    { path: '/admin/tools', label: 'Tools Page' },
    { path: '/admin/projects', label: 'Projects Page' },
]

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth()

    if (!session)
        return (
            <div>
                <h1>Not authenticated</h1>
                <p>You must be signed in to view this page</p>
                <Link href="/admin/signin">
                    <button>Sign in</button>
                </Link>
            </div>
        )

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white p-4 text-center">
                <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
                <p className="text-gray-500">You are signed in as {session.user?.email}</p>
            </header>
            <div className="flex-grow container mx-auto px-4 py-10">
                <SubNavbar routes={adminRoutes} />
                <SubContainer>
                    {children}
                </SubContainer>
            </div>
        </div>
    )
}