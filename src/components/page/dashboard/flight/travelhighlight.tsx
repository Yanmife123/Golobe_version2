import { Button } from "@/components/shadcn-ul/button";
import { DashboardHeader } from "@/components/UI/dashboard/DashboardSectionHeader";
import Image from "next/image";

const TravelHigtlightData = [
  {
    id: 1,
    img: "https://res.cloudinary.com/duyhha3mz/image/upload/fall-2-3_nhubjq.jpg",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/duyhha3mz/image/upload/fall-2-1_u9xcw1.jpg",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/duyhha3mz/image/upload/fall-2-2_gugyis.jpg",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/duyhha3mz/image/upload/fall-2-4_ejcc6n.jpg",
  },
];

export function TravelHighlight() {
  return (
    <div className="pt-16 md:pt-24 w-full md:pb-10 pb-5">
      <DashboardHeader
        title="Travel Highlights"
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
          <div className=" max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full md:h-95 h-auto gap-7 bg-secondaryT rounded-[18px] p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-4xl font-semibold ">
                      Backpacking Sri Lanka
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-lg flex flex-col items-center bg-white">
                    From <br />
                    <span className="font-semibold text-lg">$700</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm line-clamp-5 text-primaryT">
                    Traveling is a unique experience as it's the best way to
                    unplug from the pushes and pulls of daily life. It helps us
                    to forget about our problems, frustrations, and fears at
                    home. During our journey, we experience life in different
                    ways. We explore new places, cultures, cuisines, traditions,
                    and ways of living.
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Book Flight
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 md:h-95 h-64">
              {TravelHigtlightData.map((item) => (
                <div key={item.id} className="w-full rounded-lg p-2 relative">
                  <Image
                    src={item.img}
                    alt="Travel Highlight"
                    fill
                    className="object-cover rounded-[10px]"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={item.img.replace(
                      "/upload/",
                      "/upload/e_blur:1000,q_1,w_50/",
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
