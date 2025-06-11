import Image from "next/image";
import { SectionHeader } from "../header/header";

const reviews = [
  {
    id: 1,
    name: "Olga",
    title: "“A real sense of community, nurtured”",
    work: "Weave Studios – Kai Tak",
    src: "/reviews-img1.jpg",
  },

  {
    id: 2,
    name: "Thomas",
    title: "“The facilities are superb. Clean, slick, bright.”",
    work: "Weave Studios – Olympic",
    src: "/reviews-img2.jpg",
  },
  {
    id: 3,
    name: "Eliot",
    title: "“A real sense of community, nurtured”",
    work: "Weave Studios – Kai Tak",
    src: "/reviews-img3.jpg",
  },
];

export function Review() {
  return (
    <section className="mt-6  md:py-12 py-6">
      <SectionHeader
        title={["Reviews", "What people says about Golobe facilities"]}
        btn={["/reviews", "See All"]}
      />
      <div className="mt-6 flex justify-center">
        <div className="flex gap-10 md:flex-row flex-col max-md:items-center md:justify-center max-w-[1300px] max-sm:w-[85%]">
          {reviews.map((review) => (
            <div
              className="flex-1 relative shadow-card bg-white rounded-[20px] flex flex-col gap-8 p-6 max-w-[500px] justify-between "
              key={review.id}
            >
              <div className="absolute top-5 left-6 rounded-[20px] bg-secondaryLight h-full w-full z-[-1]" />
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-trade font-bold text-primary">
                  {review.title}
                </h2>
                <p className="text-sm font-medium font-sans opacity-50 text-primary">
                  Really appreciate the help and support from the staff during
                  these tough times. Shoutout to Katie for helping me always,
                  even when I was out of the country. And always available when
                  needed.
                </p>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4">
                    <div className="relative h-[22px] w-[22px]">
                      <Image
                        src={"/star.png"}
                        alt={"review start"}
                        fill={true}
                        sizes="22px"
                      />
                    </div>
                    <div className="relative h-[22px] w-[22px]">
                      <Image
                        src={"/star.png"}
                        alt={"review start"}
                        fill={true}
                        sizes="22px"
                      />
                    </div>
                    <div className="relative h-[22px] w-[22px]">
                      <Image
                        src={"/star.png"}
                        alt={"review start"}
                        fill={true}
                        sizes="22px"
                      />
                    </div>
                    <div className="relative h-[22px] w-[22px]">
                      <Image
                        src={"/star.png"}
                        alt={"review start"}
                        fill={true}
                        sizes="22px"
                      />
                    </div>
                    <div className="relative h-[22px] w-[22px]">
                      <Image
                        src={"/star.png"}
                        alt={"review start"}
                        fill={true}
                        sizes="22px"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm text-primary font-bold font-trade">
                      {review.name}
                    </h4>
                    <p className="mt-2 opacity-50 text-[0.75rem] text-primary font-medium">
                      {review.work}
                    </p>
                    <div className="flex items-center gap-2">
                      <Image
                        src={"/google.png"}
                        alt="Google Icon"
                        width={24}
                        height={24}
                      />
                      <div className="text-[0.75rem] font-trade font-bold text-primary opacity-40">
                        Google
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Image
                  src={review.src}
                  alt={review.name + "Profile"}
                  width={357}
                  height={200}
                  style={{ width: "auto", height: "auto" }}
                  className="rounded-[8px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
