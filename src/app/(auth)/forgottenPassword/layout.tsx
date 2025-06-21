import Link from "next/link";
export default function ForgottenPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link
          href={"/login"}
          className="text-primaryT font-medium text-sm hover:text-grey transition-all"
        >
          &lt; Back to login
        </Link>
      </div>
      {children}
    </div>
  );
}
