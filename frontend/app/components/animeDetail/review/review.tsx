'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import moment from "moment-timezone";

import { Review} from '@/types/type';
import { fetchUserProfile } from '@/app/api/userApi';
import { FetchReviewList, updateReview, deleteReview} from '@/app/api/reviewApi';
import { ReviewsSkeleton } from '@/app/components/skeletons/animeDetailSkeleton';
import ReviewStatistics from './reviewStatistic';
import PostReview from './postReview';

export default function Reviews() {
  const { id } = useParams() as { id: string };
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [editScore, setEditScore] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  //สำหรับ modal
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const reviewData: Review[] = await FetchReviewList(id, sortOrder);
      const userData = await fetchUserProfile();
      setReviews(reviewData);

      if (userData) {
        setUserId(userData._id);
        setHasReviewed(reviewData.some((review) => review.userId._id === userData._id));
      }
    } catch (error) {
      console.error("Error fetching review list or user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder]);

  const handleEdit = (review: Review) => {
    setEditingReview(review._id);
    setEditText(review.text);
    setEditScore(review.score);
    setIsModalOpen(true);
    setDropdownOpen(null);
  };

  const handleUpdate = async (reviewId: string) => {
    try {
      await updateReview(reviewId, editText, editScore);
      setEditingReview(null);
      setIsModalOpen(false);
      fetchData()
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      fetchData()
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) {
    return <ReviewsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 p-4 lg:auto-rows-min">
      {/* Left Panel */}
      <div className="flex flex-col gap-4 lg:col-span-1">
        <PostReview hasReviewed={hasReviewed} fetchData={fetchData} />
        <ReviewStatistics reviews={reviews} />
      </div>

      {/* Right Panel (Reviews List) */}
      <div className="lg:col-span-2 p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-80 text-white self-start">
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <div className="mb-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 cursor-pointer">
              <option value="asc">Newest</option>
              <option value="desc">Oldest</option>
            </select>
          </div>
        </div>


        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 pb-1 mb-4 relative border-solid rounded-lg shadow-lg bg-gray-800 bg-opacity-80 text-white">
              <div className="flex items-center">
                <a
                  href={`/profile/otherUserProfile/${review.userId._id}`}
                  className="font-bold text-lg mr-2 hover:underline"
                  title={review.userId.username}
                >
                  {review.userId.nickname || review.userId.username}
                </a>
              </div>

              <div className="my-3">
                <p className="text-[#03BD70]">{review.text}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <span className="font-semibold">Ripeness Level {review.score}</span>
                  <img
                    src={`/bananaScore/${review.score}.png`}
                    alt="Rating"
                    className="w-16 mr-1"
                  />
                </div>

                <div className="text-xs text-gray-500">
                  <p>
                    {moment(review.updatedAt).isSame(moment(review.createdAt))
                      ? `Created: ${moment(review.createdAt).fromNow()}`
                      : `Updated: ${moment(review.updatedAt).fromNow()}`}
                  </p>
                </div>
              </div>

              {/* User actions dropdown */}
              {userId === review.userId._id && (
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === review._id ? null : review._id)
                    }
                    className="size-10 p-1 rounded-full hover:bg-gray-900 font-bold"
                  >
                    &#x22EE;
                  </button>
                  {dropdownOpen === review._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-gray-900 border rounded shadow-lg z-10">
                      <button
                        onClick={() => handleEdit(review)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="block w-full text-left px-4 py-2 hover:bg-red-800 text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#FEC81A] p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold">Edit Review</h3>
            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="border border-black rounded-md p-2 w-full mt-2 bg-[#ecbe29]" />
            <h5 className='mt-4 font-bold'>Your new Banana ripeness:</h5>
            {/* Banana Rating */}
            <div className="flex justify-center mt-1 space-x-2">
              {[5, 4, 3, 2, 1].map(num => (
                <img
                  key={num}
                  src={`/bananaScore/${num}.png`}
                  alt={`Rating ${num}`}
                  className={`w-10 sm:w-12 md:w-16 cursor-pointer transition-all duration-200 ${editScore === num
                    ? "opacity-100 scale-125 md:scale-150"
                    : "opacity-70 hover:opacity-100 hover:scale-125 md:hover:scale-150"
                    }`}
                  onClick={() => setEditScore(num)}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => handleUpdate(editingReview!)} className="bg-[#03BD70] text-white hover:bg-[#2b8560] px-3 py-1 mr-2 rounded-lg">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}