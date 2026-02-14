import { Card } from "@/components/shadcn-ul/card";
import { LucideIcon } from "lucide-react";

interface DynamicResultHeaderProps {
  data: {
    id: string | number;
    title: string;
    // name: string;
    description?: string;
    icon?: LucideIcon;
  }[];
  children?: React.ReactNode; // Replace 'any' with the actual type of your data
}

export function DynamicResultHeader({
  data,
  children,
}: DynamicResultHeaderProps) {
  return (
    <Card className="w-full flex__center flex-row  gap-6 px-6">
      {data.map((item, index) => (
        <div
          className={`flex-1 ${
            index === data.length - 1 && !children
              ? ""
              : "border-r-1 border-primaryT/20"
          }`}
          key={item.id}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {item.icon && <item.icon className="w-5 h-5 mb-1" />}
              <div className="font-semibold">{item.title}</div>
            </div>
            {/* <div className="text-sm">{item.name}</div> */}
            {item.description && (
              <div className="text-xs text-muted-foreground">
                {item.description}
              </div>
            )}
          </div>
        </div>
      ))}
      {children}
    </Card>
  );
}
