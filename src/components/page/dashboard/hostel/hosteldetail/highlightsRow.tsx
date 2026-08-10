import { Sparkles } from "lucide-react";

export function HighlightsRow({
  rating,
  ratingLabel,
  reviewCount,
  highlights,
}: {
  rating: number;
  ratingLabel: string;
  reviewCount: number;
  highlights: string[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      <div className="bg-secondaryT rounded-lg p-4 flex flex-col justify-center">
        <p className="text-2xl font-bold">{rating}</p>
        <p className="text-sm font-semibold">{ratingLabel}</p>
        <p className="text-xs">{reviewCount} reviews</p>
      </div>
      {highlights.map((h) => (
        <div
          key={h}
          className="border rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-center"
        >
          <Sparkles className="w-5 h-5 text-secondaryT" />
          <p className="text-sm">{h}</p>
        </div>
      ))}
    </div>
  );
}
