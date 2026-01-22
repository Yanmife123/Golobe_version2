import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";

const NavbarItems = [
  { title: "Flight", href: "/dashboard/flight", src: "/plane.svg" },
  { title: "Hostel", href: "/dashboard/hostel", src: "/hostel.svg" },
  // { title: "Bookings", href: "#" },
  // { title: "Messages", href: "#" },
  // { title: "Settings", href: "#" },
];

export default function DashboardNarbar() {
  return (
    <header className="bg-white border-b border-amber-200 py-4 shadow-md flex__center">
      <nav className="boxShadow border-1  w-[95%] max-w-7xl">
        <div className="boxWidth flex justify-between items-center py-4">
          <ul className="gap-3 md:flex hidden">
            {NavbarItems.map((item) => (
              <li key={item.title}>
                <Link href={"/"} className="flex items-center gap-2">
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
          <div className="relative  w-[114px] h-[34px]">
            <Image src={"/Logo.svg"} alt="Golobe Icon" fill />
          </div>
          <div>
            <ul className="flex gap-4 border-l border-amber-200 items-center">
              <li>
                <Link
                  className="py-2 text-sm font-sans text-primaryT font-semibold"
                  href={"#"}
                >
                  <div className="flex gap-1 items-center">
                    <Heart size={18} className="text-primaryT" /> Favorites
                  </div>
                </Link>
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
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-primaryT"> Profile</div>
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
