import Link from "next/link";
import Image from "next/image";
import { navigationDefault } from "@/static-data/nav";
export default function Navbar() {
  return (
    <nav className=" sm:px-6 px-3 sm:py-8 py-4 flex justify-between brightness-100">
      <ul className="hidden gap-3 sm:flex">
        {navigationDefault.map((item) => (
          <li key={item.title}>
            <Link href={"/"} className="flex items-center gap-2">
              <div>
                <Image
                  src={item.src}
                  alt={item.title + "icon"}
                  width={24}
                  height={24}
                  priority={true}
                  className="w-fit h-fit brightness-100"
                />
              </div>
              <div className="text-sm font-sans font-semibold text-white">
                {item.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="relative w-[114px] h-[34px] border-2">
        <Image
          src={"/Logo-white.svg"}
          alt="Golobe Icon"
          // width={114}
          // height={34}
          fill={true}
          // style={{ width: "auto", height: "auto" }}
          className="brightness-100"
        />
      </div>
      <div>
        <ul className="flex gap-4">
          <li>
            <Link
              href={"/login"}
              className="px-6 py-2 text-sm font-sans text-white font-semibold"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href={"/register"}
              className="px-6 py-3 bg-white text-primaryT text-sm rounded-[8px] font-semibold"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
