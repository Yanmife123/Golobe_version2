import { Card } from "@/components/shadcn-ul/card";
import { LucideIcon } from "lucide-react";

interface DynamicResultHeaderProps {
  data: {
    id: string | number;
    title: string;
    description?: string;
    icon?: LucideIcon;
  }[];
  activeId?: string | number;
  onSelect?: (id: string | number) => void;
  children?: React.ReactNode;
}

export function DynamicResultHeader({
  data,
  activeId,
  onSelect,
  children,
}: DynamicResultHeaderProps) {
  return (
    <Card className="w-full grid grid-cols-2 sm:flex sm:flex-row sm:items-center gap-4 sm:gap-6 px-4 sm:px-6 py-4">
      {data.map((item, index) => {
        const isActive = item.id === activeId;
        const Comp = onSelect ? "button" : "div";
        return (
          <Comp
            key={item.id}
            type={onSelect ? "button" : undefined}
            onClick={onSelect ? () => onSelect(item.id) : undefined}
            className={`sm:flex-1 text-left ${onSelect ? "cursor-pointer" : ""} ${
              index === data.length - 1 && !children
                ? ""
                : "sm:border-r-1 border-primaryT/20"
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className="w-5 h-5 mb-1" />}
                <div
                  className={`font-semibold ${isActive ? "text-secondaryT" : ""}`}
                >
                  {item.title}
                </div>
              </div>
              {item.description && (
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              )}
            </div>
          </Comp>
        );
      })}
      {children}
    </Card>
  );
}
