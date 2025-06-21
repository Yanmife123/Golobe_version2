import Link from "next/link";
import { Button } from "../shadcn-uI/button";

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
    <Button
      className={`w-full h-auto py-3 bg-secondaryT text-primaryT font-sans font-semibold hover:bg-mintygreen ${className} cursor-pointer`}
    >
      {children}
    </Button>
  );
}

export function BtnLink1({ children, href, className }: Props) {
  return (
    <Link
      href={href}
      className={`${className} btn1 border-1 border-secondaryT rounded-[5px] px-4 py-2 text-sm font-sans font-medium text-primaryT`}
    >
      {children}
    </Link>
  );
}

export function BtnLink2({ children, href, className }: Props) {
  return (
    <Link
      href={href}
      className={`${className} bg-secondaryT rounded-[5px] px-4 py-2 text-sm font-sans font-medium text-primaryT `}
    >
      {children}
    </Link>
  );
}
