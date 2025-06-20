import Image from "next/image";
import { footer, socials } from "@/static-data/nav";
import Link from "next/link";

function FooterForm() {
  return (
    <form className="flex gap-4 md:justify-start justify-center">
      <input
        type="email"
        name="email"
        placeholder="Your email address"
        className="bg-white rounded-[4px] box-border w-[90%] max-md:max-w-[300px] px-4 py-2 outline-none"
        required
      />
      <button className="bg-primary text-white py-2 px-4 rounded-[5px] font-sans text-sm font-semibold">
        Subscribe
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 relative h-auto pt-16 shadow-card">
      <div className="h-[340px] absolute top-0 left-0 w-full flex justify-center z-2">
        <div className="lg:w-[80%] w-[95%] h-full bg-mintygreen brightness-100 shadow-card rounded-[20px] z-2 px-6">
          <div className="w-full flex justify-between h-full">
            <div className="flex-1  text-primary flex flex-col gap-4 md:items-start items-center justify-center ">
              <h2 className="sm:text-[40px] text-[33px] max-sm:text-center leading-[54px] font-trade font-bold ">
                Subscribe <br className="md:block hidden" /> Newsletter
              </h2>
              <div className="flex flex-col gap-2 md:items-start items-center">
                <h4 className="text-2xl font-trade font-bold">The Travel</h4>
                <p className="paragraph font-medium opacity-70">
                  Get inspired! Receive travel discounts, tips and behind the
                  scenes stories.
                </p>
              </div>
              <div className="w-full">
                <FooterForm />
              </div>
            </div>
            <div className="flex-1 hidden justify-end md:flex">
              <div className="relative lg:h-[305px] h-[260px]  lg:w-[380px] w-[320px]">
                <Image
                  src={"/mailbox.png"}
                  alt="mailbox icon"
                  fill={true}
                  sizes="(max-width: 600px) 100vw, 380px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" pt-[220px] mt-[100px] bg-secondary pb-15 px-8 flex justify-center z-1 items-end">
        <div className="flex lg:w-[83%] w-[100%] md:flex-row flex-col justify-between z-3 max-md:items-center gap-6">
          <div className="flex flex-col gap-6">
            <div>
              <Image
                src={"/footerLogo.png"}
                alt="Golobe Logo"
                width={120}
                height={40}
              />
            </div>
            <div className="flex gap-3">
              {socials.map((social) => (
                <Link href={social.href} key={social.tilte}>
                  <div className="relative h-[20px] w-[20px]">
                    <Image
                      src={social.src}
                      alt={social.tilte + "icon"}
                      fill={true}
                      sizes="20px"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {footer.map((data) => (
            <div className="flex flex-col gap-4" key={data.id}>
              <p className="font-trade text-base text-primary font-bold max-md:text-center">
                {data.tile}
              </p>
              <ul className="flex flex-col gap-3 list-none max-md:items-center">
                {data.links.map((link, index) => (
                  <li className="" key={index}>
                    <Link
                      href={link.href}
                      className="font-medium text-sm opacity-70 font-sans"
                    >
                      {link.linkName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
