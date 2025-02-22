"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import moment from "moment-timezone";
import "@/styles/globals.css";
import { fetchOtherUserProfile } from '@/lib/userApi';
import { FetchUserReview } from '@/lib/reviewApi';
import { User, Review } from '@/types/type';

function OtherUserProfileInfo() {
  const { userId } = useParams() as { userId: string };
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchOtherUserProfile(userId);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profilePic"
          className='rounded-full size-44'
        />
      </div>
      <div className='pt-4'>
        <p className='text-[0.6rem]'>UserId: {user._id}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </>
  );
}

function OtherUserReviews() {
  const { userId } = useParams() as { userId: string };
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewData: Review[] = await FetchUserReview(userId);
        setReviews(reviewData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      {reviews.length > 0 ? (
        <>
          {reviews.map((review) => {
            const updatedAt = moment(review.updatedAt).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");

            return (
              <div key={review._id} className="flex flex-col md:flex-row bg-gray-200 mb-3 rounded-lg p-2">
                <div className="flex-1">
                  <h3>
                    <a href={`/home/animeDetail/${review.animeId}`}>{review.animeName}</a>
                  </h3>
                  <p><strong>Score:</strong> {review.score}/5</p>
                  <p>{review.text}</p>
                  <div className="flex">
                    <p>Updated At: {updatedAt}</p>
                  </div>
                </div>
                <div className="flex justify-center">
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 px-5 min-w-80">
      <div className="w-full mx-auto">
        <h1 className="text-2xl font-bold text-center lg:text-end pr-5 pb-2">Profile</h1>
        <div className="h-[95%] p-5 border-b-2 border-solid border-black lg:border-b-0 lg:border-r-2">
          <OtherUserProfileInfo />
        </div>
      </div>
      <div className='lg:col-span-2'>
        <h1 className="text-2xl font-bold mt-5 text-center lg:mt-0 lg:text-end pr-5 pb-2">Reviews</h1>
        <div className="max-h-[574px] overflow-y-auto bg-gray-100 p-4 rounded-lg">
          <OtherUserReviews />
        </div>
      </div>
    </div>
  );
}
