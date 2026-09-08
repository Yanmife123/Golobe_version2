import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/shadcn-ul/button";
import { Room } from "@/static-data/hotelData";

export function RoomsList({
  hotelId,
  rooms,
}: {
  hotelId: string;
  rooms: Room[];
}) {
  return (
    <div className="divide-y">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="flex items-center gap-4 py-4 flex-wrap sm:flex-nowrap"
        >
          <div className="relative w-14 h-12 rounded-md overflow-hidden flex-shrink-0">
            <Image src={room.image} alt={room.name} fill sizes="56px" className="object-cover" />
          </div>
          <p className="flex-1 text-sm min-w-[200px]">{room.name}</p>
          <p className="font-semibold">
            ${room.pricePerNight}
            <span className="text-sm font-normal text-grey">/night</span>
          </p>
          <Button
            asChild
            className="bg-secondaryT text-primaryT font-semibold hover:bg-mintygreen"
          >
            <Link href={`/dashboard/hostel/${hotelId}/booking?room=${room.id}`}>
              Book now
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
