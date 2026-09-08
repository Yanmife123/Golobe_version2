import { Skeleton } from "@/components/shadcn-ul/skeleton";
import { Card } from "@/components/shadcn-ul/card";

export default function Loading() {
  return (
    <div className="p-5 space-y-6">
      <Skeleton className="h-24 w-full rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <Skeleton className="h-96 w-full rounded-2xl hidden lg:block" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-0 gap-0 overflow-hidden">
              <Skeleton className="h-40 w-full rounded-none" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
