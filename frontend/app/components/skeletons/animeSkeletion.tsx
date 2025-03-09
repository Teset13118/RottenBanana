export function AnimeCarouselSkeleton() {
    return (
        <div className="w-full overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="lg:w-1/5 flex-shrink-0 p-2">
                <div className="animate-pulse">
                  <div className="h-96 bg-gray-200 rounded-md mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }

export function AnimeCarouselThisSeasonSkeleton() {
return (
  <div className="carousel carousel-center bg-neutral rounded-box flex-nowrap flex overflow-x-auto no-scrollbar">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
      <div key={index} className="carousel-item flex-shrink-0 border-solid border-2">
        <div className="animate-pulse bg-gray-300 rounded-box w-60 h-80"></div>
      </div>
    ))}
  </div>
);
  }