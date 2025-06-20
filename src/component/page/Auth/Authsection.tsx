export default function AuthSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={` ${className}`}>{children}</div>;
}
