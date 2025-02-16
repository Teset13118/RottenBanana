'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from 'axios';
import moment from "moment-timezone";

import {  Anime, Review }  from '@/types/type';
import {  FetchAnime }  from '@/lib/animeApi';
import { fetchUserProfile } from '@/lib/userApi';
import { FetchReviewList, updateReview, deleteReview, postReview } from '@/lib/reviewApi';


function AnimeInfo() {
  const { id } = useParams() as { id:string };
  const [anime, setAnime] = useState<Anime | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchAnime(id);
        setAnime(data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
      <div>
        {anime ? (
          <div>
            <h1>{anime.title}</h1>
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              style={{ width: "300px", height: "450px", objectFit: "cover", borderRadius: "10px" }}
            />
          </div>
        ) : (
          <p>Loading anime details...</p>
        )}
      </div>
    );
  }

function PostReview({ fetchData }: { fetchData: () => void }){
    const { id: animeId } = useParams() as {id:string};
    const [text, setText] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, []);
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setErrorMessage("");
  
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You must be logged in to review.");
        return;
      }
  
      try {
        const res = await postReview(animeId, text, score)
        if (res.status === 201) {
          alert("Review posted successfully!");
          setText("");
          setScore(0);
          fetchData();
        }
      } catch (error: any) {
        setErrorMessage(error?.response?.data?.message || "Failed to post Review.");
      }
    };
  
    return (
      <div>
        <h2>Post a Review</h2>
        {isAuthenticated ? (
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your review..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <div>
              <p>Select your rating:</p>
              <div style={{ display: "flex", gap: "5px" }}>
                {[5, 4, 3, 2, 1].map((num) => (
                  <img
                    key={num}
                    src={`/${num}.png`}
                    alt={`Rating ${num}`}
                    style={{ width: "100px", cursor: "pointer", opacity: score === num ? 1 : 0.7 }}
                    onClick={() => setScore(num)}
                  />
                ))}
              </div>
            </div>
            <button type="submit">Post Review</button>
          </form>
        ) : (
          <p style={{ color: "red" }}>You must be logged in to review.</p>
        )}
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </div>
    );
  }

function ReviewList() {
  const { id } = useParams() as { id:string };
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [editScore, setEditScore] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  
  const fetchData = async () => {
    try {
      const data = await FetchReviewList(id);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching review list:', error);
    }
    try{
      const data = await fetchUserProfile();
      if(data){
        setUserId(data._id)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }

  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (review: Review) => {
    setEditingReview(review._id);
    setEditText(review.text);
    setEditScore(review.score);
  };

  const handleUpdate = async (reviewId: string) => {
    try {
      await updateReview(reviewId, editText, editScore);
      setEditingReview(null);
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

  return (
    <div>
      <PostReview fetchData={fetchData} />
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const createdAt = moment(review.createdAt).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
          const updatedAt = moment(review.updatedAt).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");

          return (
            <div
              key={review._id}
              style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}
            >
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
              <a href={`/profile/${review.userId._id}`}>profile</a>

              {/* ปุ่ม Edit & Delete เฉพาะเจ้าของคอมเมนต์ */}
              {userId === review.userId._id && (
                <div>
                  {editingReview === review._id ? (
                    <>
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Edit review"
                      />
                      <input
                        type="number"
                        value={editScore}
                        onChange={(e) => setEditScore(Number(e.target.value))}
                        min="0"
                        max="5"
                      />
                      <button onClick={() => handleUpdate(review._id)}>Save</button>
                      <button onClick={() => setEditingReview(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(review)}>Edit</button>
                      <button onClick={() => handleDelete(review._id)}>Delete</button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default function Info(){
  return (
    <>
      <div>
        <AnimeInfo/>
      </div>
      <div>
        <ReviewList/>
      </div>
    </>
  )
}