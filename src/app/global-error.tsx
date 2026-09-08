"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-whiteSmoke">
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-5 text-center">
          <h1 className="text-2xl font-semibold text-primaryT">
            Something went wrong
          </h1>
          <p className="text-grey max-w-md">
            We hit an unexpected error loading Golobe. Please try again.
          </p>
          <button
            onClick={reset}
            className="py-2 px-5 rounded-[8px] bg-secondaryT text-primaryT font-semibold cursor-pointer"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
