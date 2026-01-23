import Image from "next/image";

export function HeroSection({
  children,
  image,
  title,
  label,
}: {
  children: React.ReactNode;
  image: string;
  label?: string;
  title: string;
}) {
  return (
    <div className="w-full paddingX relative">
      <div className="w-full absolute top-0 left-0 right-0 bottom-0 z-0">
        <div className="absolute inset-0 md:h-[500px] h-[300px]  w-full bg-gradient-to-r from-[rgba(0,35,77,0.63)] to-transparent -z-1"></div>
        <div className="relative md:h-[500px] h-[300px]  overflow-hidden w-full -z-2">
          <Image
            src={image}
            alt="Hero Image"
            fill
            // priority
            className="object-cover object-top"
          />
        </div>
      </div>
      <div className="flex__center">
        <div className="z-1 boxWidth text-white relative paddingY md:px-18 px-5">
          <div className="max-w-[360px] md:py-10 py-2">
            <h1 className="text-4xl font-bold font-trade">{title}</h1>
            <p className="font-medium text-lg font-sans mt-2">{label}</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
