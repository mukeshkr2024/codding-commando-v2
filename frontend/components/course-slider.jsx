"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import apiClient from "lib/api-client";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function CourseSlider() {
  const [banners, setBanners] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchCourseBanners = async () => {
    try {
      const { data } = await apiClient.get("/banners");
      setBanners(data?.banners);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourseBanners();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  if (loading) {
    return (
      <div className="flex h-40 w-full items-center justify-center bg-light-white">
        <Loader2 className="h-16 w-16 animate-spin text-pink-100" />
      </div>
    );
  }

  if (!banners.length > 0) {
    return null;
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="max-h-[110px] w-[82%] sm:max-h-[200px] md:max-h-[250px] md:w-[92%] lg:max-h-[350px] xl:max-h-[450px] "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className=" w-full">
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <Link href={`/courses/${banner?._id}`} className="">
              <Image
                src={banner?.banner}
                alt={banner?.title}
                layout="responsive"
                ive
                width={300}
                height={200}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="h-6 w-6 md:h-8 md:w-8" />
      <CarouselNext className="h-6 w-6 md:h-8 md:w-8" />
    </Carousel>
  );
}
