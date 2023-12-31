import NavigationBar from "@/components/navigationBar";

export default function Layout({children}: { children: React.ReactNode}) {
    return (
        <>
        <NavigationBar/>
            {children}
        </>
    );
}