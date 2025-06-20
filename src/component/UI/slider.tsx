"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
const images = [
  { src: "/slider1.jpg" },
  { src: "/slider2.jpg" },
  { src: "/slider3.jpg" },
];

export default function ImageSlider({ className }: { className?: string }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const SlideImage = ({ src, index }: { src: string; index: number }) => {
    return (
      <div className="embla__slide relative h-full w-full">
        <Image
          src={src}
          alt={`slider ${index}`}
          fill={true}
          className="object-cover rounded-[30px]"
          priority
        />
      </div>
    );
  };

  return (
    <div className={`embla ${className}`} ref={emblaRef}>
      <div className="embla__container h-full w-full">
        {images.map((image, index) => (
          <SlideImage src={image.src} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}
