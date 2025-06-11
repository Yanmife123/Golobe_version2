"use client";
import { useState } from "react";
import Navbar from "@/component/default/navbar";
import { PlanTrip } from "@/component/default/plantrip";
import { CardContainer } from "@/component/UI/golobeUI";
import { GolobeSection } from "@/component/default/golobeSection";
import { Review } from "@/component/default/reviews";
import {
  SearchFlightForm,
  SearchStayForm,
} from "@/component/searchForm/searchForm";
import Image from "next/image";

export default function Home() {
  const [searchNavClicked, setSearchNavClicked] = useState<boolean>(false);
  return (
    <main className="flex__center ">
      <div className="boxWidth">
        <div className="md:px-9 md:py-7 px-2 py-2 h-auto">
          <section className="relative md:h-[600px] h-[300px]">
            <div className="h-full w-full absolute top-0 left-0 md:rounded-[24px] rounded-[0] overflow-hidden">
              <Image
                src={"/hero-Image.jpg"}
                alt="Hero Image"
                fill={true}
                className=" md:rounded-[24px] rounded-[0] z-[-1]"
                priority={true}
              />
              <div className=" z-[-1] default_hero_shadow w-full h-full  md:rounded-[24px] rounded-[0]  " />
            </div>
            <Navbar />
            <div className="md:h-[250px] h-[170px] flex__center brightness-100">
              <div className="flex flex-col items-center text-white">
                <h2 className="font-trade font-bold sm:text-[45px] text-[35px] text-center">
                  Helping Others
                </h2>
                <h1 className="font-trade font-bold sm:text-[80px] text-[12vw] text-center mt-[-5px]">
                  Live & Travel
                </h1>
                <h4 className="font-sans sm:text-[20px] text-base font-semibold text-center">
                  Special offers to suit your plan
                </h4>
              </div>
            </div>
          </section>
          <section className="relative md:h-[200px] h-[450px]">
            <div className="absolute md:top-[-150px] top-0 w-full md:h-[250px] h-auto flex justify-center">
              <CardContainer className="pt-[16px] px-[32px] pb-[32px] lg:w-[80%] w-full h-full md:rounded-[16px] rounded-[0]">
                <div className="flex gap-12 flex-col">
                  <div className="flex w-[220px] h-[48px]">
                    <div
                      className={`flex justify-start items-center gap-2 cursor-pointer flex-1 navigate ${
                        !searchNavClicked ? "navigate_active" : " "
                      }`}
                      onClick={() => {
                        setSearchNavClicked(false);
                      }}
                    >
                      <Image
                        src={"/plane.svg"}
                        alt="flight Icon"
                        height={24}
                        width={24}
                      />
                      <div className="text-primary font-semibold font-sans">
                        Flights
                      </div>
                    </div>
                    <div
                      className={`flex justify-start items-center gap-2 flex-1 cursor-pointer navigate ${
                        searchNavClicked ? "navigate_active" : " "
                      }`}
                      onClick={() => {
                        setSearchNavClicked(true);
                      }}
                    >
                      <Image
                        src={"/hostel.svg"}
                        alt="flight Icon"
                        height={24}
                        width={24}
                      />
                      <div className="text-primary font-semibold font-sans">
                        Stays
                      </div>
                    </div>
                  </div>
                  {searchNavClicked ? <SearchStayForm /> : <SearchFlightForm />}
                </div>
              </CardContainer>
            </div>
          </section>
          <PlanTrip />
          <GolobeSection />
          <Review />
        </div>
      </div>
    </main>
  );
}
