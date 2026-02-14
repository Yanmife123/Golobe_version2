import { DashboardHeader } from "./DashboardSectionHeader";
import { Card } from "@/components/shadcn-ul/card";
import Image from "next/image";
import { CardContainer } from "../golobeUI";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn-ul/carousel";

interface RecentSearchSectionProps {
  title?: string;
  paragraph?: string;
  data?: RecentSearchItem[];
}

interface RecentSearchItem {
  id: number;
  title: string;
  description: string;
  img: string;
}

export function RecentSearchSection({
  title,
  paragraph,
  data,
}: RecentSearchSectionProps) {
  return (
    <div className="pt-16 md:pt-24 w-full md:pb-10 pb-5">
      <DashboardHeader
        title={title || "Recent Searches"}
        paragraph={paragraph}
      />

      {data && (
        <>
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            {data.map((item) => (
              <Card
                className="p-4 shadow-sm bg-white border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                key={item.id}
              >
                <div className="flex items-center gap-4">
                  <div className="w-[80px] h-[80px] relative flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.title + " picture"}
                      fill={true}
                      sizes="80px"
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="text-primaryT text-sm font-semibold truncate">
                      {item.title}
                    </p>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {data.map((item) => (
                  <CarouselItem key={item.id} className="pl-4 basis-[85%]">
                    <Card className="p-4 shadow-sm bg-white border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-[80px] h-[80px] relative flex-shrink-0">
                          <Image
                            src={item.img}
                            alt={item.title + " picture"}
                            fill={true}
                            sizes="80px"
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <p className="text-primaryT text-sm font-semibold">
                            {item.title}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
}
