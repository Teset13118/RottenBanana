"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { fetchOtherUserProfile } from '@/app/api/userApi';
import { User } from '@/types/type';
import { OtherUserProfileInfoSkeleton } from "@/app/components/skeletons/profileSkeletons";

// รายละเอียดข้อมูลของผู้ใช้คนอื่น
export default function OtherUserProfileInfo() {
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
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="profilePic"
              className="rounded-full size-72"
            />
          </div>
        </div>
        <div className='pt-4 lg:px-24 w-full'>
          <p className='font-bold text-2xl'>{user.nickname ? user.nickname : user.username}</p>
          <p className='text-xl text-gray-400'>{user.username}</p>
          <p className='text-xl text-gray-400'>{user.email}</p>
          {user.about ?
            <p className='border-solid border-2 p-2 rounded-lg bg-gray-200 min-h-24 mt-4 text-base'>{user.about || ''}</p>
            : ""
          }
        </div>
      </>
    );
  }