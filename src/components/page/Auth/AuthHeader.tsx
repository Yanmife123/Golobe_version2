export default function AuthHeader({
  h2,
  paragraph,
}: {
  h2: string;
  paragraph?: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:items-start items-center">
      <h2 className="font-trade font-bold text-4xl text-black">{h2}</h2>
      <p className="font-normal font-sans text-base opacity-75 text-primaryT md:text-start text-center">
        {paragraph}
      </p>
    </div>
  );
}
