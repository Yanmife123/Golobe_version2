import { Skeleton } from "@/components/shadcn-ul/skeleton";

export default function Loading() {
  return (
    <div className="w-full flex__center py-6">
      <div className="w-full max-w-6xl px-5 space-y-6">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-80 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
