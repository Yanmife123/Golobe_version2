import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "../header/header";
import { CardContainer } from "../../../UI/golobeUI";

const PlanTripData = [
  {
    id: 1,
    title: "Istanbul, Turkey",
    src: "/trip-image-1.jpg",
    flight: "/flight",
    hotel: "/hostel",
    resort: "/",
  },
  {
    id: 2,
    title: "Sydney, Australia",
    src: "/trip-image-2.jpg",
    flight: "/flight",
    hotel: "/hostel",
    resort: "/",
  },
  {
    id: 3,
    title: "Baku, Azerbaijan",
    src: "/trip-image-3.jpg",
    flight: "/flight",
    hotel: "/hostel",
    resort: "/",
  },
  {
    id: 4,
    title: "Malé, Maldives",
    src: "/trip-image-4.jpg",
    flight: "/flight",
    hotel: "/hostel",
    resort: "/",
  },
  {
    id: 5,
    title: "Paris, France",
    src: "/trip-image-5.jpg",
    flight: "/flight",
    hotel: "/hostel",
    resort: "/",
  },
  {
    id: 6,
    title: "New York, US",
    src: "/trip-image-6.jpg",
    flight: "/flight",
    hotel: "/hostel",
    resort: "/",
  },
  {
    id: 7,
    title: "London, UK",
    src: "/trip-image-7.jpg",
    flight: "/flight",
    hotel: "/hostel",
    resort: "/",
  },
  {
    id: 8,
    title: "Tokyo, Japan",
    src: "/trip-image-8.jpg",
    flight: "/flight",
    hotel: "/hostel",
    resort: "/",
  },
  {
    id: 9,
    title: "Dubai, UAE",
    src: "/trip-image-9.jpg",
    flight: "/flight",
    hotel: "/hostel",
    resort: "/",
  },
];

export function PlanTrip() {
  return (
    <section className="h-auto py-7">
      <SectionHeader
        title={[
          "Plan your perfect trip",
          "Search Flights & Places Hire to our most popular destinations",
        ]}
        btn={["/plan-trip", "See more places"]}
      />
      <div className="mt-[40px] flex justify-center">
        <div className=" sm:w-full w-[85%] grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {PlanTripData.map((trip) => (
            <CardContainer className="p-4" key={trip.id}>
              <div className="flex items-center gap-4 relative">
                <div className="w-[80px] h-[80px] relative">
                  <Image
                    src={trip.src}
                    alt={trip.title + "picture"}
                    fill={true}
                    sizes="80px"
                    className="rounded-[8px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-primaryT text-base font-sans font-semibold">
                    {trip.title}
                  </p>
                  <ul className="list-none flex gap-2 items-center">
                    <li>
                      <Link
                        href={trip.flight}
                        className="text-primaryT text-sm font-medium  font-sans"
                      >
                        Flight
                      </Link>
                    </li>
                    <div className="h-[5px] w-[5px] rounded-full bg-primary" />
                    <li>
                      <Link
                        href={trip.hotel}
                        className="text-primaryT text-sm font-medium  font-sans"
                      >
                        Hotels
                      </Link>
                    </li>
                    <div className="h-[5px] w-[5px] rounded-full bg-primary" />
                    <li>
                      <Link
                        href={trip.resort}
                        className="text-primaryT text-sm font-medium  font-sans"
                      >
                        Resorts
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
