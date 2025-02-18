'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment-timezone";
import {  Anime, User, Review }  from '@/types/type';
import { fetchUserProfile } from '@/lib/userApi'; 
import { FetchUserReview } from '@/lib/reviewApi';
import { FetchAnime } from '@/lib/animeApi';


export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const dataUser = await fetchUserProfile()
        setUser(dataUser);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>Profile</h1>
        <p>Id: {user._id}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
      <div>
        <UserReviews/>
      </div>
    </div>
  );
};

function UserReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserProfile();
        const reviewData: Review[] = await FetchUserReview(userData._id);
        setReviews(reviewData);

      } catch (error) {
        console.error("Error fetching user profile or reviews:", error);
      }
    };

    fetchData();
  }, []);

    return(
    <div>
      <h2>All your Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const createdAt = moment(review.createdAt).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
          const updatedAt = moment(review.updatedAt).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");

          return (

            <div key={review._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <a href={`/home/${review.animeId}`}>go to</a>
              <h3>{review.animeName}</h3>
              <p>Review ID: {review._id}</p>
              <p>User ID: {review.userId._id}</p>
              <p>
                <strong>User:</strong> {review.userId.username || "Anonymous"}
              </p>
              <p>
                <strong>Score:</strong> {review.score}/5
              </p>
              <p>{review.text}</p>
              <p><strong>Created At:</strong> {createdAt}</p>  {/* เพิ่มแสดงเวลา createdAt */}
              <p><strong>Updated At:</strong> {updatedAt}</p>  {/* เพิ่มแสดงเวลา updatedAt */}
            </div>
          );
        })
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};
