export default function ProductListSkeleton() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-y-10 gap-x-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col justify-center items-center cursor-pointer mb-10 md:mb-20">
            <div className="md:max-w-60 max-w-40">
              <div className="md:flex hidden justify-center">
                <div className="relative overflow-hidden">
                  <img width={240} height={240} className="bg-zinc-100" />
                </div>
              </div>
              <div className="md:hidden flex h-40 justify-center items-center">
                <div className="relative overflow-hidden">
                  <img width={160} height={160} className="bg-zinc-100" />
                </div>
              </div>
              <div className="text-sm font-bold text-zinc-800">
                <div className="bg-zinc-100 mt-2 h-5" />
                <div className="bg-zinc-100 mt-1 h-4 w-9/12" />
                <div className="bg-zinc-100 h-4 mt-1 w-7/12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
