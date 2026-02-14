"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavbarItems = [
  { title: "Flight", href: "/dashboard/flight", src: "/plane.svg" },
  { title: "Hostel", href: "/dashboard/hostel", src: "/hostel.svg" },
  // { title: "Bookings", href: "#" },
  // { title: "Messages", href: "#" },
  // { title: "Settings", href: "#" },
];

export default function DashboardNarbar() {
  const pathname = usePathname();
  return (
    <header className="bg-white md:py-2 shadow-md flex__center">
      <nav className="boxShadow md:w-[90%] w-[95%] max-w-7xl">
        <div className="boxWidth flex justify-between items-center py-4">
          <ul className="gap-8 md:flex hidden">
            {NavbarItems.map((item) => (
              <li key={item.title} className="relative">
                <div
                  className={`h-[5px] w-full bg-secondaryT absolute left-0  -bottom-[16px] md:-bottom-[36px] ${pathname.includes(item.href) ? "block" : "hidden"} `}
                />
                <Link href={item.href} className="flex items-center gap-2">
                  <div>
                    <Image
                      src={item.src}
                      alt={item.title + "icon"}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="text-sm font-sans font-semibold text-primaryT">
                    {item.title}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={"/dashboard/flight"}>
            <div className="relative  w-[114px] h-[34px]">
              <Image src={"/Logo.svg"} alt="Golobe Icon" fill />
            </div>
          </Link>
          <div>
            <ul className="flex md:gap-4 gap-6 items-center">
              <li>
                <Link
                  className="py-2 text-sm font-sans text-primaryT font-semibold"
                  href={"#"}
                >
                  <div className="flex gap-1 items-center">
                    <Heart
                      size={18}
                      className=" text-primaryT"
                      fill="#112211"
                    />{" "}
                    <span className="max-md:hidden">Favorites</span>
                  </div>
                </Link>
              </li>
              <li>
                <div className="h-[34px] w-[1px] bg-primaryT " />
              </li>
              <li>
                <Link
                  className="py-2 bg-primaryT text-white text-sm rounded-[8px] font-semibold"
                  href={"#"}
                >
                  <div className="flex gap-1 items-center ">
                    <div className="relative w-[45px] h-[45px] rounded-full ">
                      <Image
                        src={"/default-pic.jpg"}
                        alt="User Icon"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="text-primaryT max-md:hidden"> Profile</div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
