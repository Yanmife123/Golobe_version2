interface DashboardHeaderProps {
  className?: string;
  rightContent?: React.ReactNode;
  paragraph?: string;
  title: string;
}

export function DashboardHeader({
  className,
  rightContent,
  paragraph,
  title,
}: DashboardHeaderProps) {
  return (
    <div
      className={`flex max-sm:flex-col max-sm:gap-4  justify-between items-center ${className || ""}`}
    >
      <div className="max-w-2xl flex flex-col gap-4 ">
        <h2 className="text-2xl md:text-3xl font-semibold text-black sm:text-start text-center">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base sm:text-start text-center">
          {paragraph}
        </p>
      </div>
      <div>{rightContent}</div>
    </div>
  );
}
