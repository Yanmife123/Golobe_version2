export default function OtherLoginOptions({
  paragraph,
}: {
  paragraph: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center w-full">
        <div className="h-[1px] flex-1 bg-primaryT opacity-25" />
        <div className="paragraph font-sm text-primaryT opacity-50">
          {paragraph}
        </div>
        <div className="h-[1px] flex-1 w-[19.4px] bg-primaryT opacity-25" />
      </div>
    </div>
  );
}
