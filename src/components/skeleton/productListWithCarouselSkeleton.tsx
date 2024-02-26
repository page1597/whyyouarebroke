import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";

export default function ProductListWithCarouselSkeleton() {
  return (
    <div className="sm:px-6 px-3 sm:ml-1 -ml-1 sm:-mr-6 -mr-3 ">
      {Array.from({ length: 4 })?.map((_, index) => (
        <div key={index} className="lg:mb-16 mb-10">
          <div className="flex justify-between items-end mr-4 sm:mr-9 lg:my-5 my-3">
            <h3 className="transparent h-8 w-32 lg:text-xl text-lg ml-1" />
            <button name="more" className="lg:text-base text-sm">
              더보기
            </button>
          </div>
          <Carousel opts={{ align: "start", active: false }} className="w-11/12 lg:ml-5 ml-2">
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 lg:ml-0 basis-1/2 flex justify-center items-center sm:basis-1/4"
                >
                  <div className="flex justify-center items-center">
                    <div className="cursor-pointer flex justify-center flex-col">
                      <div className="sm:flex hidden justify-center">
                        <div className="relative overflow-hidden">
                          <img width={240} height={240} className="bg-zinc-100" />
                        </div>
                      </div>
                      <div className="sm:hidden flex justify-center items-center ">
                        <div className="relative overflow-hidden">
                          <img width={160} height={160} className="bg-zinc-100" />
                        </div>
                      </div>
                      <div className="flex flex-col lg:mt-3 mt-2">
                        <div className="flex gap-1 h-5 w-9/12 bg-zinc-100" />
                        <div className="mt-1 bg-zinc-100 h-5 w-6/12" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="md:-mt-6" />
            <CarouselNext className="md:-mt-6" />
          </Carousel>
        </div>
      ))}
    </div>
  );
}
