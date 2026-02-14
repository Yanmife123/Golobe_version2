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

      <div className="overflow-y max-md:mb-6">{children}</div>

      {/* <DashboardFooter /> */}
      <NavFooter />
    </div>
  );
}
