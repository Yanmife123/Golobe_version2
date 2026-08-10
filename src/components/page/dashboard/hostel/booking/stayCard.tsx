import Image from "next/image";
import { Card } from "@/components/shadcn-ul/card";
import { BedDouble } from "lucide-react";
import { Hotel, Room } from "@/static-data/hotelData";

export function StayCard({
  hotel,
  room,
  checkIn,
  checkOut,
  guests,
}: {
  hotel: Hotel;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: string;
}) {
  return (
    <Card className="p-5 gap-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{hotel.name}</p>
        <p className="text-sm text-grey">{guests}</p>
      </div>

      <div className="border rounded-lg px-3 py-2 flex items-center gap-3 w-fit">
        <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
          <Image src={room.image} alt={room.name} fill className="object-cover" />
        </div>
        <p className="text-sm max-w-xs">{room.name}</p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{checkIn}</p>
          <p className="text-xs text-grey">Check-in</p>
        </div>
        <div className="flex-1 flex items-center px-4">
          <span className="flex-1 border-t border-dashed border-grey/50" />
          <BedDouble className="w-4 h-4 mx-2 text-primaryT" />
          <span className="flex-1 border-t border-dashed border-grey/50" />
        </div>
        <div className="text-right">
          <p className="font-semibold">{checkOut}</p>
          <p className="text-xs text-grey">Check-out</p>
        </div>
      </div>
    </Card>
  );
}
