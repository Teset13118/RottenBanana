'use client';
import { useState, useEffect } from 'react';
import moment from "moment-timezone";
import "@/styles/globals.css";

import { User, Review } from '@/types/type';
import { fetchUserProfile, updateUserProfile } from '@/lib/userApi';
import { FetchUserReview } from '@/lib/reviewApi';
import { ProfileInfoSkeleton, UserReviewSkeleton } from '@/app/components/skeletons/profileSkeletons';


function ProfileInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const dataUser = await fetchUserProfile();
      sessionStorage.setItem('userId', dataUser._id)
      setUser(dataUser);
      setNickname(dataUser.nickname || '');
      setAbout(dataUser.about || '');
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      await updateUserProfile(nickname, about);
      fetchUser()
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <ProfileInfoSkeleton />;
  }

  if (!user) {
    return <div>Failed to load profile data. Please try again.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className='rounded-full border-solid border-8 p-7'>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profilePic"
          className="rounded-full size-52"
        />
      </div>

      <div className="pt-4 lg:px-24 w-full">
        {!isEditing ? (
          <>
            <p className='font-bold text-2xl'>{user.nickname ? user.nickname : user.username}</p>
            <p className='text-xl'>{user.username}</p>
            <p className='text-xl'>{user.email}</p>
            {user.about ?
              <p className='border-solid border-2 p-2 rounded-lg bg-gray-200 min-h-24 mt-4 text-base'>{user.about || ''}</p>
              : ""
            }
            <div className='flex w-full justify-center'>
              <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            <p className='text-base font-bold'>Nickname:</p>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="add nickname"
              className="border p-2 rounded"
            />
            <p className='text-base font-bold'>About:</p>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="add about"
              className="border p-2 rounded"
            />
            <div className='flex gap-2'>
              <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 h-full rounded">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-2 py-1 h-full rounded">
                Cancel
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}


function UserReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = sessionStorage.getItem('userId') || "";
        const reviewData = await FetchUserReview(userData, sortOrder);
        setReviews(reviewData);
      } catch (error) {
        console.error("Error fetching user profile or reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortOrder]); // เพิ่มการตรวจสอบ sortOrder เพื่อให้ข้อมูลอัพเดตเมื่อเปลี่ยนการจัดเรียง

  if (loading) {
    return <UserReviewSkeleton />;
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
export default function Profile() {
  return (
    <div className="grid grid-cols-1 pt-5 h-[95%] lg:grid-cols-3 px-5 min-w-80">
      <div className="w-full p-5 lg:col-span-1">
        <ProfileInfo />
      </div>
      <div className="lg:col-span-2 h-[574px] overflow-y-auto p-6 rounded-xl shadow-lg no-scrollbar border border-solid">
        <UserReviews />
      </div>
    </div>
  );
}