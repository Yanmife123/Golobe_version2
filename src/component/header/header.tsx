import { BtnLink1 } from "../utility/button";

interface PropsSectionHeader {
  title: string[];
  btn: string[];
  btnClassName?: string;
}

export function Heading1({
  headTitle,
  paragraph,
}: {
  headTitle: string;
  paragraph: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold font-sans text-black sm:text-start text-center">
        {headTitle}
      </h1>
      <p className="text-primary font-base font-sans font-normal sm:text-start text-center opacity-75 tracking-wide">
        {paragraph}
      </p>
    </div>
  );
}

export function SectionHeader({
  title,
  btn,
  btnClassName,
}: PropsSectionHeader) {
  return (
    <div className="flex sm:flex-row flex-col max-sm:gap-3 justify-between items-center w-full">
      <Heading1 headTitle={title[0]} paragraph={title[1]} />
      <BtnLink1 className={btnClassName} href={btn[0]}>
        {btn[1]}
      </BtnLink1>
    </div>
  );
}
