"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AuthError({
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
    <div className="flex flex-col gap-4 items-center text-center py-10">
      <h2 className="text-xl font-semibold text-primaryT">
        Something went wrong
      </h2>
      <p className="text-grey max-w-sm">
        We couldn&apos;t complete that. Please try again.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="py-2 px-5 rounded-[8px] bg-secondaryT text-primaryT font-semibold cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/login"
          className="py-2 px-5 rounded-[8px] border border-secondaryT text-primaryT font-semibold"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
