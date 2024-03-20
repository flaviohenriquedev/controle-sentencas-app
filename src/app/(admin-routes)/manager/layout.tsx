import {AppLayout} from "@/components/layout/applayout";

export default function ManagerLayout({children}: { children: React.ReactNode }) {
    return (
        <AppLayout.Container>
            <AppLayout.Header/>
            {children}
        </AppLayout.Container>
    )
}
