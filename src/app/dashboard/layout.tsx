import DashboardNarbar from "@/components/layout/dashboard/navbar";
// import { DashboardFooter } from "@/components/layout/dashboard/footer";
import { NavFooter } from "@/components/layout/dashboard/navFooter";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-whiteSmoke max-md:pb-12 relative">
      <DashboardNarbar />
      <div className="py-5 bg-red-400">{children}</div>
      {/* <DashboardFooter /> */}
      <NavFooter />
    </div>
  );
}
