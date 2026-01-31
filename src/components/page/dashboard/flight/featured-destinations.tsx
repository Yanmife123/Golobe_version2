"use client";

import { DashboardHeader } from "@/components/UI/dashboard/DashboardSectionHeader";
import Link from "next/link";

const destinations = [
  {
    id: 1,
    name: "Tokyo",
    image:
      "https://res.cloudinary.com/duyhha3mz/image/upload/c78427665c9f65ea73e797f6c34f4acfdbf70095_edm29s.jpg",
    position: "top-2 right-1 md:top-20 md:right-32",
  },
  {
    id: 2,
    name: "Paris",
    image:
      "https://res.cloudinary.com/duyhha3mz/image/upload/6f84c7814557f899dc9d44d562a8ce869f115012_dnrmpw.jpg",
    position: "top-4 left-1  md:top-32 md:left-20",
  },
  {
    id: 3,
    name: "Bali",
    image:
      "https://res.cloudinary.com/duyhha3mz/image/upload/4aeaf87fe548323d5328d6bd3757dba0b1502936_udtfak.jpg",
    position: "top-40 left-17 md:top-1/3 md:left-1/4",
  },
  {
    id: 4,
    name: "Dubai",
    image:
      "https://res.cloudinary.com/duyhha3mz/image/upload/5bfbaa15c21795f536bbeb9bd3bfa2d5ab31720f_itzipj.jpg",
    position: "top-40 right-4 md:top-1/2 md:right-1/4",
  },
  {
    id: 5,
    name: "New York",
    image:
      "https://res.cloudinary.com/duyhha3mz/image/upload/c0b89224d9474eb315740b9f236364d4a9f303fc_ecr7zu.jpg",

    position: "bottom-4 left-1 md:bottom-1/3 md:left-1/3 ",
  },
  {
    id: 6,
    name: "Sydney",
    image:
      "https://images.unsplash.com/photo-1506973404872-a4a50e48c4d9?w=200&h=150&fit=crop",
    position: "bottom-2 right-1 md:bottom-20 md:right-20",
  },
];

export function FeaturedDestinations() {
  return (
    <section className="pt-16 md:pt-24">
      <div className=" ">
        {/* Section Header */}
        <DashboardHeader
          title=" Let's go places together"
          paragraph="Discover the latest offers and news and start planning your next
              trip with us."
          rightContent={
            <a
              href="#"
              className="text-primary hover:text-primary/80 transition-colors text-sm font-medium whitespace-nowrap ml-4 border-1 border-secondaryT px-3 py-2 rounded-md flex items-center gap-1"
            >
              See All
            </a>
          }
          className="mb-3"
        />

        {/* World Map Section with Scattered Destinations */}
        <div className="relative w-full bg-gradient-to-br from-mintygreen/80 via-mintygreen/90 to-mintygreen/90 rounded-2xl overflow-hidden min-h-96 md:min-h-[500px]">
          {/* World Map Background Pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-15"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="worldMap"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="25" cy="25" r="2" fill="currentColor" />
                <circle cx="75" cy="60" r="2" fill="currentColor" />
                <circle cx="50" cy="75" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="1000" height="600" fill="url(#worldMap)" />
          </svg>

          {/* Scattered Destination Cards */}
          <div className="absolute inset-0">
            {destinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/destination/${dest.id}`}
                className={`absolute ${dest.position} group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-20`}
              >
                <div className="relative">
                  {/* Card */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-24 md:w-40 group-hover:shadow-xl transition-shadow">
                    <img
                      src={dest.image || "/placeholder.svg"}
                      alt={dest.name}
                      className="w-full h-16 md:h-28 object-cover"
                    />
                    <div className="p-2 md:p-3 bg-white">
                      <p className="text-xs md:text-sm font-semibold text-foreground text-center truncate">
                        {dest.name}
                      </p>
                    </div>
                  </div>
                  {/* Connecting Line */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-primary/30 group-hover:bg-primary/60 transition-colors"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
      </div>
    </section>
  );
}
