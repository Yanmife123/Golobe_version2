import { Skeleton } from "@/components/shadcn-ul/skeleton";
import { Card } from "@/components/shadcn-ul/card";

export default function Loading() {
  return (
    <div className="p-5 space-y-6">
      <Skeleton className="h-24 w-full rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <Skeleton className="h-96 w-full rounded-2xl hidden lg:block" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="p-5 flex-row items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-10 w-24 shrink-0" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
