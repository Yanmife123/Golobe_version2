"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
export function NavFooter() {
  const pathname = usePathname();
  const NavItemList = [
    { title: "Flight", href: "/dashboard/flight", src: "/plane.svg" },
    { title: "Hostel", href: "/dashboard/hostel", src: "/hostel.svg" },
  ];
  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-2 z-5  flex justify-around">
      {/* <button className="flex flex-col items-center text-sm">
        <Image src={"/plane.svg"} alt="Plane Icon" width={24} height={24} />
        <span>Flight</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        <Image src={"/hostel.svg"} alt="Hostel Icon" width={24} height={24} />
        <span>Hotel</span>
      </button> */}
      {NavItemList.map((item) => (
        <button
          key={item.title}
          className={`flex flex-col items-center px-4 py-2 text-sm ${pathname === item.href ? "border-t-2 border-secondaryT" : ""} `}
        >
          <Image
            src={item.src}
            alt={item.title + " Icon"}
            width={24}
            height={24}
          />
          <span className="text-primaryT">{item.title}</span>
        </button>
      ))}
    </footer>
  );
}
