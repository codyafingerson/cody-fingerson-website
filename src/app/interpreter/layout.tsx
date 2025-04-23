import SubContainer from "@/components/SubContainer";
import SubNavbar from "@/components/SubNav";

export default function InterpreterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <SubNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <SubContainer>
                    {children}
                </SubContainer>
            </div>
        </>
    )
}