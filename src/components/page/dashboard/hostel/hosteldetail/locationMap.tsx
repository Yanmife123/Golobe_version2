import { MapPin } from "lucide-react";

export function LocationMap({ address }: { address: string }) {
  const query = encodeURIComponent(address);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-semibold text-lg">Location/Map</h2>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-secondaryT text-primaryT font-semibold text-sm px-4 py-2 rounded-md hover:bg-mintygreen transition-colors"
        >
          View on google maps
        </a>
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${query}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full h-[320px] rounded-xl overflow-hidden border bg-secondaryLight/30 group"
        style={{
          backgroundImage:
            "radial-gradient(circle, #11221133 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 group-hover:bg-black/5 transition-colors">
          <MapPin className="w-8 h-8 text-salmon" fill="#fd736e" />
          <span className="text-sm font-medium text-primaryT bg-white px-3 py-1.5 rounded-md shadow">
            View on Google Maps
          </span>
        </span>
      </a>
      <p className="flex items-center gap-1 text-sm text-grey">
        <MapPin className="w-4 h-4" /> {address}
      </p>
    </div>
  );
}
