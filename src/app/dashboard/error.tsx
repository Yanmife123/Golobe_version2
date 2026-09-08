"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-5 text-center">
      <div className="rounded-full bg-secondaryLight/40 p-4">
        <AlertTriangle className="w-8 h-8 text-secondaryT" />
      </div>
      <h2 className="text-xl font-semibold text-primaryT">
        We couldn&apos;t load this page
      </h2>
      <p className="text-grey max-w-md">
        Something went wrong on our end. This has been logged — please try
        again in a moment.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="py-2 px-5 rounded-[8px] bg-secondaryT text-primaryT font-semibold cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/dashboard/flight"
          className="py-2 px-5 rounded-[8px] border border-secondaryT text-primaryT font-semibold"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
