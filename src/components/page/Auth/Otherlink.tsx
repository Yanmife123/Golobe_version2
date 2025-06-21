"use clients";
import Image from "next/image";
// import { signIn } from "next-auth/react";

export default function OtherLink() {
  return (
    <div className="grid h-[56px] grid-cols-3 gap-4 mt-5">
      <div className="border border-secondaryT rounded-[5px] py-4 px-2 flex justify-center items-center cursor-pointer">
        <Image
          src={"/authIcon/facebook.svg"}
          alt="facebook icon"
          width={24}
          height={24}
        />
      </div>
      <div
        className="border border-secondaryT rounded-[5px] py-4 px-2 flex justify-center items-center cursor-pointer"
        // onClick={() => {
        //   signIn("google");
        // }}
      >
        <Image
          src={"/authIcon/google.svg"}
          alt="facebook icon"
          width={24}
          height={24}
        />
      </div>
      <div className="border border-secondaryT rounded-[5px] py-4 px-2 flex justify-center items-center cursor-pointer">
        <Image
          src={"/authIcon/apple.svg"}
          alt="facebook icon"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}
