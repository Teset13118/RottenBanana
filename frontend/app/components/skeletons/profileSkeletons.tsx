export function ProfileInfoSkeleton() {
    return (
        <div className="flex flex-col items-center">
            <div className='rounded-full border-solid border-8 p-7'>
                <div className="rounded-full size-52 bg-gray-200 animate-pulse" />
            </div>

            <div className="pt-4 lg:px-24 w-full">
                <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-md w-2/3 mb-4 animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded-lg w-full mb-4 animate-pulse"></div>
                <div className='flex w-full justify-center'>
                    <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}

export function UserReviewSkeleton() {
    return (
        <div className="animate-pulse">
            {[1, 2, 3].map((index) => (
                <div key={index} className="flex flex-col md:flex-row mb-3 rounded-lg p-4 shadow-lg border border-solid">
                    <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
                        <div className="min-h-16 my-2">
                            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
                        </div>
                        <div className="flex items-center mt-4 h-10">
                            <div className="h-6 bg-gray-200 rounded-md w-1/3 mr-2"></div>
                            <div className="h-6 bg-gray-200 rounded-md w-16"></div>
                        </div>
                    </div>
                    <div>
                        <div className="w-28 h-40 bg-gray-200 rounded-2xl"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function OtherUserProfileInfoSkeleton() {
    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='rounded-full border-solid border-8 p-7'>
                    <div className="rounded-full size-52 bg-gray-200 animate-pulse" />
                </div>
            </div>
            <div className='pt-4 lg:px-24 w-full'>
                <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-md w-2/3 mb-4 animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded-lg w-full mb-4 animate-pulse"></div>
            </div>
        </>
    );
}

export function OtherUserReviewSkeleton() {
    return (
        <div className="animate-pulse">
            {[1, 2, 3].map((index) => (
                <div key={index} className="flex flex-col md:flex-row mb-3 rounded-lg p-4 shadow-lg border border-solid">
                    <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
                        <div className="min-h-16 my-2">
                            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
                        </div>
                        <div className="flex items-center mt-4 h-10">
                            <div className="h-6 bg-gray-200 rounded-md w-1/3 mr-2"></div>
                            <div className="h-6 bg-gray-200 rounded-md w-16"></div>
                        </div>
                    </div>
                    <div>
                        <div className="w-28 h-40 bg-gray-200 rounded-2xl"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}