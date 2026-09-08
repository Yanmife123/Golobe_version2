"use client";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function OtherLink({ next }: { next?: string }) {
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    if (loading) return;
    setLoading(true);
    const supabase = createClient();
    const redirectTo = new URL("/auth/callback", window.location.origin);
    if (next) redirectTo.searchParams.set("next", next);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectTo.toString() },
    });

    if (error) setLoading(false);
    // on success the browser is redirected to Google, no further action needed
  }

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
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="border border-secondaryT rounded-[5px] py-4 px-2 flex justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Image
          src={"/authIcon/google.svg"}
          alt="google icon"
          width={24}
          height={24}
        />
      </button>
      <div className="border border-secondaryT rounded-[5px] py-4 px-2 flex justify-center items-center cursor-pointer">
        <Image
          src={"/authIcon/apple.svg"}
          alt="apple icon"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}
