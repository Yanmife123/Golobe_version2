import { Button } from "@/components/shadcn-ul/button";
import { Card } from "@/components/shadcn-ul/card";
import { DashboardHeader } from "@/components/UI/dashboard/DashboardSectionHeader";
import { BtnLink2 } from "@/components/utility/button";
import Image from "next/image";

export const destinations = [
  {
    id: 1,
    city: "Melbourne",
    country: "Australia",
    description: "An amazing journey",
    price: 700,
    image:
      "https://res.cloudinary.com/duyhha3mz/image/upload/fall-1_pfmmet.jpgg",
  },
  {
    id: 2,
    city: "Paris",
    country: "France",
    description: "A Paris adventure",
    price: 600,
    image:
      "https://res.cloudinary.com/duyhha3mz/image/upload/fall-2_xujbkp.jpg",
  },
  {
    id: 3,
    city: "London",
    country: "United Kingdom",
    description: "London eye adventure",
    price: 350,
    image:
      "https://res.cloudinary.com/duyhha3mz/image/upload/fall-3_jyelrk.jpg",
  },
  {
    id: 4,
    city: "Columbia",
    country: "USA",
    description: "Amazing streets",
    price: 700,
    image:
      "https://res.cloudinary.com/duyhha3mz/image/upload/fall-4_nx3yle.jpg",
  },
];

export function PopularDestination() {
  return (
    <div className="pt-16 md:pt-24 w-full">
      <DashboardHeader
        title="Fall to Travel"
        paragraph="Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination."
        rightContent={
          <a
            href="#"
            className="text-primary hover:text-primary/80 transition-colors text-sm font-medium whitespace-nowrap ml-4 border-1 border-secondaryT px-3 py-2 rounded-md flex items-center gap-1"
          >
            See All
          </a>
        }
      />
      <div className="mt-8 flex__center w-full">
        <div className="max-w-6xl w-full">
          <div className=" max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-5 lg:gap-6 gap-6">
            {destinations.map((destination) => (
              <Card
                key={destination.id}
                className="overflow-hidden relative border-none md:h-80 lg:h-96 h-64"
              >
                <Image
                  src={destination.image}
                  alt={destination.city}
                  className="w-full h-full object-cover"
                  fill
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold line-clamp-1 gap-2">
                        {destination.city}, {destination.country}
                      </h3>
                      <p className="text-sm line-clamp-1">
                        {destination.description}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-xl">
                        ${destination.price}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <BtnLink2 href="#" className="w-full block text-center">
                      Book Flight
                    </BtnLink2>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
