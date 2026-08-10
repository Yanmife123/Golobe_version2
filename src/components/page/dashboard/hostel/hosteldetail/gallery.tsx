"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/shadcn-ul/dialog";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [open, setOpen] = useState(false);
  const [big, ...thumbs] = images;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative w-full h-[300px] md:h-[420px] rounded-xl overflow-hidden">
          <Image src={big} alt={name} fill className="object-cover" priority />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {thumbs.slice(0, 4).map((src, i) => {
            const isLast = i === 3;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setOpen(true)}
                className="relative w-full h-[145px] md:h-[203px] rounded-xl overflow-hidden cursor-pointer"
              >
                <Image src={src} alt={name} fill className="object-cover" />
                {isLast && (
                  <span className="absolute bottom-3 right-3 bg-secondaryT text-primaryT text-sm font-semibold px-3 py-1.5 rounded-md">
                    View all photos
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{name} — Photos</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((src) => (
              <div
                key={src}
                className="relative w-full h-40 rounded-lg overflow-hidden"
              >
                <Image src={src} alt={name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
