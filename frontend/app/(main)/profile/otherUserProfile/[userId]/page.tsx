"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchOtherUserProfile } from '@/lib/userApi'; 
import moment from "moment-timezone";
import {  Anime, User, Review }  from '@/types/type';
import { FetchUserReview } from '@/lib/reviewApi';
import { FetchAnime } from '@/lib/animeApi';


export default function OtherUserProfile() {
  const { userId } = useParams() as {userId:string}; // ดึง userId จาก URL
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchOtherUserProfile(userId);
        setUser(data);
      } catch (err) {
        setError("User not found");
      }
    };
    fetchUser();
  }, [userId]);

  if (error) return <div>{error}</div>;
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>Profile of {user.username}</h1>
        <p>Email: {user.email}</p>
        <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      <div>
        <OtherUserReviews/>
      </div>
    </div>
  );
}

function OtherUserReviews() {
  const { userId } = useParams() as { userId:string };
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewData: Review[] = await FetchUserReview(userId);
        setReviews(reviewData);

      } catch (error) {
        console.error("Error fetching user profile or reviews:", error);
      }
    };

    fetchData();
  }, []);
  console.log(reviews)

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