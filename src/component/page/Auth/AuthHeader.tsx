export default function AuthHeader({
  h2,
  paragraph,
}: {
  h2: string;
  paragraph?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-trade font-bold text-4xl text-black">{h2}</h2>
      <p className="font-normal font-sans text-base opacity-75 text-primary">
        {paragraph}
      </p>
    </div>
  );
}
