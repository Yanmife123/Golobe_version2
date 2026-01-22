import ImageSlider from "@/components/UI/slider";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-14 sm:py-8 paddingX h-auto  flex justify-center">
      <div className=" max-w-[1200px] w-[90%] flex md:justify-start justify-center ">
        <div className="flex-1 justify-center md:flex hidden border-1 border-transparent">
          <ImageSlider className="lg:h-[580px] lg:w-[460px] h-[480px] w-[350px]" />
        </div>
        <div className="flex-1 border-1 border-transparent flex justify-center">
          <div className="lg:w-[80%] md:w-[90%] w-full h-full flex flex-col justify-center">
            <Link href="/">
              <Image
                src={"/Logo.svg"}
                alt="Golobe Logo"
                width={110}
                height={36}
                priority={true}
              />
            </Link>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
