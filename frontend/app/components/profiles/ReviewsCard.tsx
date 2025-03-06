import moment from "moment-timezone";
import { Review } from '@/types/type';

export const ReviewCard = ({ reviews, sortOrder, setSortOrder }: {   reviews: Review[]; sortOrder: 'asc' | 'desc'; setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>; }) => {
        return (
            <>
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                    <div className="mb-4">
                        <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 cursor-pointer"
                        >
                        <option value="asc">Newest</option>
                        <option value="desc">Oldest</option>
                        </select>
                    </div>
                </div>
    
                {reviews.length > 0 ? (
                    <>
                        {reviews.map((review) => {
                            return (
                                <div key={review._id} className="flex flex-col md:flex-row mb-3 rounded-lg p-4 shadow-lg border border-solid">
                                    <div className="flex-1">
                                        <h3>
                                            <a href={`/home/animeDetail/${review.animeId}`} className='hover:underline font-bold'>{review.animeName}</a>
                                        </h3>
                                        <div className='min-h-16 my-2 text-[#03BD70]'>
                                            <p >{review.text}</p>
                                        </div>
                                        <div className="flex items-center mt-4 h-10">
                                            <span className="font-semibold">Ripeness Level {review.score}</span>
                                            <img src={`/bananaScore/${review.score}.png`} alt="Rating" className="w-16 mr-1" />
                                        </div>
                                        <div className="flex text-xs text-gray-500">
                                            <p>Created: {moment(review.createdAt).fromNow()}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={review.animePic} alt={review.animeName} className="w-28 h-auto object-cover rounded-2xl" />
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </>
        );
}