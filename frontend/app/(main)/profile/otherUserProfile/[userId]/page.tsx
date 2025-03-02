"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import moment from "moment-timezone";
import "@/styles/globals.css";
import { fetchOtherUserProfile } from '@/lib/userApi';
import { FetchUserReview } from '@/lib/reviewApi';
import { User, Review } from '@/types/type';
import { OtherUserProfileInfoSkeleton, OtherUserReviewSkeleton } from "@/app/components/skeletons/profileSkeletons";


function OtherUserProfileInfo() {
  const { userId } = useParams() as { userId: string };
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await fetchOtherUserProfile(userId);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <OtherUserProfileInfoSkeleton />;
  }

  if (!user) {
    return <div>Failed to load profile data. Please try again.</div>;
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='rounded-full border-solid border-8 p-7'>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profilePic"
            className="rounded-full size-52"
          />
        </div>
      </div>
      <div className='pt-4 lg:px-24 w-full'>
        <p className='font-bold text-2xl'>{user.nickname ? user.nickname : user.username}</p>
        <p className='text-xl'>{user.username}</p>
        <p className='text-xl'>{user.email}</p>
        {user.about ?
          <p className='border-solid border-2 p-2 rounded-lg bg-gray-200 min-h-24 mt-4 text-base'>{user.about || ''}</p>
          : ""
        }
      </div>
    </>
  );
}


function OtherUserReviews() {
  const { userId } = useParams() as { userId: string };
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const reviewData: Review[] = await FetchUserReview(userId, sortOrder);
        setReviews(reviewData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortOrder]);

  if (loading) {
    return <OtherUserReviewSkeleton />;
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <a
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="px-4 text-gray-400 rounded-md hover:underline transition duration-300"
        >
          Sort by {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
        </a>
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
                  <div className='min-h-16 my-2 mx-2'>
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

export default function OtherUserProfile() {
  return (
    <div className="grid grid-cols-1 pt-5 h-[95%] lg:grid-cols-3 px-5 min-w-80">
      <div className="w-full p-5 lg:col-span-1">
        <OtherUserProfileInfo />
      </div>
      <div className="lg:col-span-2 h-[574px] overflow-y-auto p-6 rounded-xl shadow-lg no-scrollbar border border-solid">
        <OtherUserReviews />
      </div>
    </div>
  );
}