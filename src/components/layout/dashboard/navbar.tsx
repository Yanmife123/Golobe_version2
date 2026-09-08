"use client";
import Image from "next/image";
import { Heart, ChevronDown, User, History, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/lib/supabase/useUser";
import { signOutAction } from "@/lib/supabase/auth-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ul/dropdown-menu";

const NavbarItems = [
  { title: "Flight", href: "/dashboard/flight", src: "/plane.svg" },
  { title: "Hostel", href: "/dashboard/hostel", src: "/hostel.svg" },
  // { title: "Bookings", href: "#" },
  // { title: "Messages", href: "#" },
  // { title: "Settings", href: "#" },
];

export default function DashboardNarbar() {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const avatarUrl =
    (user?.user_metadata?.avatar_url as string | undefined) ||
    "/default-pic.jpg";
  const displayName =
    (user?.user_metadata?.name as string | undefined) ||
    (user?.user_metadata?.first_name as string | undefined) ||
    "Traveler";
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
              <Image src={"/Logo.svg"} alt="Golobe Icon" fill sizes="114px" />
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
              {!loading && !user ? (
                <li>
                  <Link
                    className="py-2 px-4 bg-primaryT text-white text-sm rounded-[8px] font-semibold"
                    href={"/login"}
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex gap-1 items-center py-1 pl-1 pr-2 bg-transparent text-primaryT text-sm rounded-[8px] font-semibold cursor-pointer outline-none">
                      <div className="relative w-[45px] h-[45px] rounded-full">
                        <Image
                          src={avatarUrl}
                          alt="User Icon"
                          fill
                          sizes="45px"
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span className="max-md:hidden">Profile</span>
                      <ChevronDown size={16} className="max-md:hidden" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 p-0">
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-secondaryT/25 via-secondaryT/10 to-transparent">
                        <div className="relative w-12 h-12 rounded-full ring-2 ring-white shadow-sm flex-shrink-0">
                          <Image
                            src={avatarUrl}
                            alt="User Icon"
                            fill
                            sizes="48px"
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-primaryT truncate">
                            {displayName}
                          </p>
                          <p className="text-xs text-grey truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <div className="p-1.5">
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-3"
                          >
                            <span className="flex items-center justify-center size-8 rounded-full bg-secondaryLight/50">
                              <User className="size-4" />
                            </span>
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/profile/history"
                            className="flex items-center gap-3"
                          >
                            <span className="flex items-center justify-center size-8 rounded-full bg-secondaryLight/50">
                              <History className="size-4" />
                            </span>
                            Booking history
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" asChild>
                          <form action={signOutAction} className="w-full">
                            <button
                              type="submit"
                              className="flex w-full items-center gap-3 cursor-pointer"
                            >
                              <span className="flex items-center justify-center size-8 rounded-full bg-red-50">
                                <LogOut className="size-4" />
                              </span>
                              Log out
                            </button>
                          </form>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
