export function AirlineLogo({
  airline,
  brandColor,
  size = "lg",
}: {
  airline: string;
  brandColor: string;
  size?: "sm" | "lg";
}) {
  return (
    <span
      className={`font-trade font-semibold leading-none whitespace-nowrap ${
        size === "lg" ? "text-2xl" : "text-sm"
      }`}
      style={{ color: brandColor }}
    >
      {airline}
    </span>
  );
}
