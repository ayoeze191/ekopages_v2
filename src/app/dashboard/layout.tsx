import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-[65px] max-[700px]:pt-[62px]">
        <DashboardShell>{children}</DashboardShell>
      </main>
      <Footer flush />
    </>
  );
}
