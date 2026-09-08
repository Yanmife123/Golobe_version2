import { Skeleton } from "@/components/shadcn-ul/skeleton";
import { Card } from "@/components/shadcn-ul/card";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-8 w-40 mb-5" />
      <Card className="p-6 gap-0 divide-y divide-gray-100">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-5">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        ))}
      </Card>
    </div>
  );
}
