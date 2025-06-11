import React from "react";

export function CardContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} bg-white shadow-card rounded-[16px]`}>
      {children}
    </div>
  );
}
