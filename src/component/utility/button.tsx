import Link from "next/link";

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function FormBtn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`bg-secondary text-primary font-semibold text-sm px-6 py-3 rounded-[8px] ${className} cursor-pointer font-sans `}
    >
      {children}
    </button>
  );
}

export function BtnLink1({ children, href, className }: Props) {
  return (
    <Link
      href={href}
      className={`${className} btn1 border-1 border-secondary rounded-[5px] px-4 py-2 text-sm font-sans font-medium text-primary`}
    >
      {children}
    </Link>
  );
}
export function BtnLink2({ children, href, className }: Props) {
  return (
    <Link
      href={href}
      className={`${className} bg-secondary rounded-[5px] px-4 py-2 text-sm font-sans font-medium text-primary `}
    >
      {children}
    </Link>
  );
}
