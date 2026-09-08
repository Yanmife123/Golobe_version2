import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-5 text-center">
      <h2 className="text-2xl font-semibold text-primaryT">
        We couldn&apos;t find that
      </h2>
      <p className="text-grey max-w-md">
        This listing may have been removed, or the link is incorrect.
      </p>
      <Link
        href="/dashboard/flight"
        className="py-2 px-5 rounded-[8px] bg-secondaryT text-primaryT font-semibold"
      >
        Back to Golobe
      </Link>
    </div>
  );
}
