import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

function RecommendProductsSkeleton() {
  return (
    <div className="w-11/12">
      <Carousel opts={{ align: "start", active: false }}>
        <CarouselContent>
          <div className="hidden sm:flex">
            {Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem key={index} className="sm:basis-1/4 cursor-pointer flex justify-center">
                <div className="relative overflow-hidden">
                  <img
                    width={240}
                    height={240}
                    className="border-zinc-100 bg-zinc-100 object-contain transition-transform transform-gpu"
                  />
                </div>
              </CarouselItem>
            ))}
          </div>
          <div className="flex sm:hidden w-full">
            {Array.from({ length: 2 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/2 cursor-pointer flex justify-center">
                <div className="relative overflow-hidden">
                  <img
                    width={160}
                    height={160}
                    className="border-zinc-100 bg-zinc-100 object-contain transition-transform transform-gpu"
                  />
                </div>
              </CarouselItem>
            ))}
          </div>
        </CarouselContent>
        <CarouselPrevious className="sm:mt-0 mt-6" />
        <CarouselNext className="sm:mt-0 mt-6" />
      </Carousel>
    </div>
  );
}

export default RecommendProductsSkeleton;
