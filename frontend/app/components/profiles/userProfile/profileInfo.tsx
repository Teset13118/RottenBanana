'use client';
import { useState, useEffect } from 'react';

import { User } from '@/types/type';
import { fetchUserProfile, updateUserProfile } from '@/app/api/userApi';
import { ProfileInfoSkeleton } from '@/app/components/skeletons/profileSkeletons';

export default function ProfileInfo() {
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
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profilePic"
          className="rounded-full size-72"
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