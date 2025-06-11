import Image from "next/image";
import { BtnLink2 } from "../utility/button";
const golobeSection = [
  {
    id: 1,
    title: "Flights",
    paragraph: "Search Flights & Places Hire to our most popular destinations",
    src: "/flights.png",
    href: "/flights",
  },
  {
    id: 2,
    title: "Hotels",
    paragraph: "Search hotels & Places Hire to our most popular destinations",
    src: "/hostel.png",
    href: "/hotels",
  },
];

export function GolobeSection() {
  return (
    <section className="mt-7">
      <div className="flex justify-center">
        <div className="max-sm:w-[85%] max-w-[1200px] flex md:flex-row flex-col gap-8">
          {golobeSection.map((data) => (
            <div className="flex relative flex-1 shadow-card" key={data.id}>
              <div className=" w-[448px] md:w-[350px] lg:w-[448px] h-[448px] relative">
                <Image
                  src={data.src}
                  alt={data.title}
                  fill={true}
                  // sizes="(max-width: 768px) 90vw, 448px"
                />
              </div>
              <div className="absolute z-[1] top-0 left-0 h-full w-full default_hero_shadow_reverse rounded-[20px]" />
              <div className=" absolute left-0 bottom-0 opacity-100 z-[2] py-5 flex justify-center">
                <div className="flex flex-col items-center gap-4 w-[80%]">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold font-trade text-center text-white text-[40px]">
                      {data.title}
                    </h1>
                    <p className="text-white text-center paragraph">
                      {data.paragraph}
                    </p>
                  </div>

                  <BtnLink2 href={data.href}>
                    <div className="flex items-center gap-1">
                      <Image
                        src={"/mail-plane.svg"}
                        alt={"linkIcon"}
                        width={16}
                        height={16}
                      />
                      <div>Show {data.title}</div>
                    </div>
                  </BtnLink2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
