export function AnimeInfoSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 w-full">
            {/* Anime Image Section Skeleton */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-5 lg:row-span-5 animate-pulse">
                <div className="w-full h-96 md:h-full bg-gray-200 rounded-lg"></div>
            </div>

            {/* Anime Title and Genre Section Skeleton */}
            <div className="col-span-1 row-span-2 md:col-span-2 lg:col-span-2 md:col-start-3 lg:col-start-3 md:row-span-2 lg:row-span-2 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center animate-pulse">
                <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
            </div>

            {/* YouTube Trailer Section Skeleton */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 md:col-start-3 lg:col-start-5 md:row-span-3 lg:row-span-2 h-full animate-pulse">
                <div className="relative w-full h-full min-h-[200px] bg-gray-200 rounded-lg"></div>
            </div>

            {/* Anime Synopsis Section Skeleton */}
            <div className="col-span-1 md:col-span-4 lg:col-span-4 md:col-start-1 lg:col-start-3 md:row-span-2 lg:row-span-3 bg-white p-6 rounded-lg shadow-lg h-full flex flex-col animate-pulse">
                <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            </div>
        </div>
    );
}

export function ReviewStatisticsSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full col-span-1 animate-pulse">
            <h2 className="text-xl font-semibold mb-4 bg-gray-300 h-6 w-40 rounded"></h2>

            <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                    <div className="text-3xl font-bold bg-gray-300 h-8 w-16 rounded"></div>
                    <div className="text-sm bg-gray-200 h-4 w-24 mt-1 rounded"></div>
                </div>

                <div className="text-center">
                    <div className="text-3xl font-bold bg-gray-300 h-8 w-16 rounded"></div>
                    <div className="text-sm bg-gray-200 h-4 w-24 mt-1 rounded"></div>
                </div>
            </div>

            <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((score) => (
                    <div key={score} className="flex items-center">
                        <div className="w-8 text-sm font-medium bg-gray-200 h-5 rounded"></div>
                        <div className="flex-1 mx-2">
                            <div className="h-3 rounded-full bg-gray-200">
                                <div className="h-3 rounded-full bg-gray-300 w-1/3"></div>
                            </div>
                        </div>
                        <div className="w-24 text-right text-sm bg-gray-200 h-5 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PostReviewSkeleton() {
    return (
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg animate-pulse">
            <h2 className="text-xl font-semibold mb-4 bg-gray-300 h-6 w-40 rounded"></h2>

            <div className="space-y-4">
                <div className="w-full h-24 bg-gray-200 rounded-lg"></div> {/* Textarea Placeholder */}

                <div>
                    <p className="font-medium bg-gray-300 h-5 w-48 rounded"></p>
                    <div className="flex gap-2 mt-2">
                        {[5, 4, 3, 2, 1].map((num) => (
                            <div key={num} className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-lg"></div> // Banana Placeholder
                        ))}
                    </div>
                </div>

                <div className="w-full h-10 bg-gray-300 rounded-lg"></div> {/* Button Placeholder */}
            </div>
        </div>
    );
}

export function ReviewsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 p-4 lg:auto-rows-min animate-pulse">
            {/* Left Panel */}
            <div className="flex flex-col gap-4 lg:col-span-1">
                <div className="h-40 bg-gray-300 rounded-lg"></div> {/* PostReview Skeleton */}
                <div className="h-32 bg-gray-300 rounded-lg"></div> {/* ReviewStatistics Skeleton */}
            </div>

            {/* Right Panel (Reviews List) */}
            <div className="lg:col-span-2 p-6 rounded-lg shadow-lg bg-white">
                <h2 className="text-xl font-semibold mb-4 bg-gray-300 h-6 w-40 rounded"></h2>
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="border p-4 pb-1 mb-4 rounded-lg shadow-lg bg-white">
                        <div className="flex items-center">
                            <div className="bg-gray-300 h-6 w-40 rounded"></div> {/* Username */}
                        </div>

                        <div className="my-3">
                            <div className="h-12 bg-gray-300 rounded"></div> {/* Review text */}
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                                <div className="bg-gray-300 h-5 w-24 rounded"></div> {/* Ripeness Level */}
                                <div className="w-16 h-16 bg-gray-300 rounded-lg ml-2"></div> {/* Banana Image */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
