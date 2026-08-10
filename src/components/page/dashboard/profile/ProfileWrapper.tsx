"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function ProfileWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div>
      <div className="relative h-[320px] md:h-[360px] lg:h-[390px]">
        <div className="relative w-full lg:h-[350px] md:h-[300px] h-[200px]">
          <Image
            src={"/Default-Cover.jpg"}
            alt="Cover image"
            fill
            className="object-cover rounded-2xl"
          />
          <div className="absolute sm:bottom-4 top-4 md:right-12 right-6">
            <button className="flex gap-2 rounded-lg px-4 py-2 bg-secondaryT items-center cursor-pointer">
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.47656 10.5234V12.5127C8.47656 12.6391 8.42629 12.7612 8.33691 12.8506C8.24757 12.9398 8.12626 12.9893 8 12.9893C7.87374 12.9893 7.75243 12.9398 7.66309 12.8506C7.57371 12.7612 7.52344 12.6391 7.52344 12.5127V10.5234H8.47656ZM8 0.0234375C9.25092 0.0234375 10.4312 0.473561 11.3232 1.29102C12.0904 1.99304 12.6127 2.91968 12.8555 4.00098C12.8772 4.09853 12.9265 4.18803 12.9971 4.25879C13.0676 4.3295 13.1565 4.3794 13.2539 4.40137C13.7478 4.51315 14.219 4.70786 14.6201 4.9707L14.7881 5.08789C15.5661 5.66431 15.9766 6.45989 15.9766 7.3877C15.9765 8.34404 15.5955 9.14614 14.875 9.70703C14.238 10.2023 13.3503 10.4766 12.375 10.4766H8.52344V5.7627L9.63086 6.87012C9.6796 6.91883 9.73708 6.95809 9.80078 6.98438C9.8645 7.01066 9.93303 7.02361 10.002 7.02344C10.0709 7.02326 10.1395 7.01002 10.2031 6.9834C10.2667 6.95677 10.3246 6.91713 10.373 6.86816C10.5777 6.66115 10.565 6.32407 10.3604 6.11914L8.37012 4.12988C8.27196 4.03179 8.13876 3.97656 8 3.97656C7.86124 3.97656 7.72804 4.03179 7.62988 4.12988L5.63965 6.12012C5.44127 6.31858 5.42234 6.64262 5.6123 6.85156C5.65994 6.90403 5.71778 6.94709 5.78223 6.97656C5.84663 7.00599 5.91652 7.02173 5.9873 7.02344C6.05811 7.02514 6.12858 7.01263 6.19434 6.98633C6.26013 6.96 6.32001 6.92022 6.37012 6.87012L7.47656 5.76367V10.4766H4.25C3.12162 10.4766 2.07038 10.1044 1.29004 9.43066C0.473359 8.72383 0.0234375 7.7466 0.0234375 6.6748C0.023489 5.61441 0.440961 4.68591 1.23145 3.9873C1.80422 3.48255 2.5553 3.12605 3.3877 2.95801C3.46773 2.94185 3.54318 2.90683 3.60742 2.85645C3.67149 2.80612 3.7231 2.74167 3.75781 2.66797C4.06261 2.02625 4.50973 1.46214 5.06543 1.01953C5.8851 0.367755 6.90038 0.0234375 8 0.0234375Z"
                  fill="black"
                  stroke="#112211"
                  strokeWidth="0.046875"
                />
              </svg>

              <div className="text-sm font-medium">Upload new cover</div>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center absolute lg:-bottom-22 md:-bottom-18 -bottom-10 left-0 w-full">
          <div className="relative w-[160px] h-[160px] overflow-hidden">
            <Image
              src={"/default-pic.jpg"}
              alt="Profile image"
              fill
              className="rounded-full object-cover object-center border-4 border-salmon2"
            />
            {/*The Pen Edit Button */}
            <div className="absolute right-1.5 bottom-0">
              <div className="bg-salmon2 rounded-full w-fit">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="44" height="44" rx="22" fill="#FF8682" />
                  <path
                    d="M26.8103 16.06L14.0542 28.8475L13.2812 30.7187L15.1525 29.9458L27.94 17.1897L26.8103 16.06ZM29.3627 13.5081L28.81 14.0603L29.9397 15.19L30.4923 14.6373C30.6374 14.4922 30.7188 14.2955 30.7188 14.0903C30.7188 13.8852 30.6374 13.6884 30.4923 13.5433L30.4572 13.5081C30.3853 13.4362 30.3 13.3792 30.2061 13.3403C30.1122 13.3014 30.0116 13.2814 29.9099 13.2814C29.8083 13.2814 29.7076 13.3014 29.6137 13.3403C29.5198 13.3792 29.4345 13.4362 29.3627 13.5081Z"
                    stroke="black"
                    strokeWidth="2.0625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/*The Profile Contact*/}
          </div>
          <div className="flex flex-col gap-2 items-center text-primaryT">
            <h3 className="font-semibold text-2xl font-sans">John Doe</h3>
            <p className="">john.doe@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="mt-22 md:mt-28 lg:mt-36">
        <div className="flex justify-center gap-4">
          <ul className="bg-white px-6 flex shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] max-w-5xl w-full rounded-2xl">
            <li
              className={`flex-1  py-4 ${pathname === "/dashboard/profile" ? "border-b-2 border-secondaryT" : ""}`}
            >
              <Link href="/dashboard/profile" className="text-center block">
                Account
              </Link>
            </li>
            <li
              className={`flex-1 border-l border-[#D7E2EE] py-4  ${pathname === "/dashboard/profile/history" ? "border-b-2 border-secondaryT" : ""}`}
            >
              <Link
                href="/dashboard/profile/history"
                className="text-center block"
              >
                History
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-7">{children}</div>
      </div>
    </div>
  );
}
