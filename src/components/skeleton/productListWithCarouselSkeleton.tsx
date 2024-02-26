import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";

export default function ProductListWithCarouselSkeleton() {
  return (
    <div className="sm:px-0 -ml-4 -mr-5 sm:mx-0">
      {Array.from({ length: 4 })?.map((_, index) => (
        <div key={index} className="sm:mb-16 mb-10">
          <div className="flex justify-between items-end mr-6 sm:mr-12 sm:my-5 my-3">
            <h3 className="transparent h-8 w-32" />
            <button name="more" className="sm:text-base text-sm">
              더보기
            </button>
          </div>
          <Carousel opts={{ align: "start" }} className="w-11/12 sm:ml-5">
            <CarouselContent className="ml-0 ">
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="pl-0 sm:ml-0 basis-1/2 sm:basis-1/4">
                  <div className="sm:p-2 flex justify-center items-centers">
                    <div className="cursor-pointer flex justify-center flex-col">
                      <div className="sm:flex hidden">
                        <div className="relative overflow-hidden">
                          <img width={240} height={240} className="bg-zinc-100" />
                        </div>
                      </div>
                      <div className="sm:hidden flex h-40 justify-center items-center">
                        <div className="relative overflow-hidden">
                          <img width={160} height={160} className="bg-zinc-100" />
                        </div>
                      </div>
                      <div className="flex flex-col sm:mt-3 mt-2 sm:text-base text-sm">
                        <div className="flex gap-1 h-6 w-9/12 bg-zinc-100" />
                        <div className="mt-1 bg-zinc-100 h-6 w-6/12" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="sm:-mt-6" />
            <CarouselNext className="sm:-mt-6" />
          </Carousel>
        </div>
      ))}
    </div>
  );
}
