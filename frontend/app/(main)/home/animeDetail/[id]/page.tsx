'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from 'axios';
import moment from "moment-timezone";

import { Anime, Review, Statistics } from '@/types/type';
import { FetchAnime } from '@/lib/animeApi';
import { fetchUserProfile } from '@/lib/userApi';
import { FetchReviewList, updateReview, deleteReview, postReview } from '@/lib/reviewApi';

//แสดงรายละเอียดของ anime
function AnimeInfo() {
  const { id } = useParams() as { id: string };
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

  if (anime){
    sessionStorage.setItem('animeTitle', anime.title)
    sessionStorage.setItem('animePic', anime.images.jpg.image_url)
  }
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


function ReviewStatistics({ reviews }: { reviews: Review[] }) {

  const calculateStatistics = (): Statistics => {
    const statistics: Statistics = {
      averageScore: 0,
      totalReviews: reviews.length,
      scoreDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      totalScore: 0
    };

    if (reviews.length === 0) return statistics;

    // คำนวณจำนวนของแต่ละคะแนน
    reviews.forEach(review => {
      statistics.scoreDistribution[review.score]++;
      statistics.totalScore += review.score;
    });

    // คำนวณค่าเฉลี่ย
    statistics.averageScore = Number((statistics.totalScore / statistics.totalReviews).toFixed(2));

    return statistics;
  };

  const stats = calculateStatistics();

  // คำนวณเปอร์เซ็นต์ของแต่ละคะแนน
  const getPercentage = (count: number): string => {
    return ((count / stats.totalReviews) * 100).toFixed(1);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Review Statistics</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <p className="text-gray-600">Average Score : {stats.averageScore}</p>
        <p className="text-gray-600">Total Reviews : {stats.totalReviews}</p>
      </div>
      <div>
        {[5, 4, 3, 2, 1].map(score => (
          <div key={score}>
            <span>{score} ★</span>
            <p>{stats.scoreDistribution[score]} ({getPercentage(stats.scoreDistribution[score])}%)</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function PostReview({ fetchData, hasReviewed }: { fetchData: () => void; hasReviewed: boolean;}) {
  const { id: animeId } = useParams() as { id: string };
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const isAuthenticated = !!sessionStorage.getItem("token")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    const animeTitle = sessionStorage.getItem('animeTitle') as string; //postReview ต้องการให้ animeTitle เป็น string เท่านั้น
    const animePic = sessionStorage.getItem('animePic') as string; //postReview ต้องการให้ animePic เป็น string เท่านั้น

    if (!isAuthenticated) {
      setErrorMessage("You must be logged in to review.");
      return;
    }

    try {
      const res = await postReview(animeId, animeTitle, animePic, text, score)
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
        hasReviewed ? (
          <p style={{ color: "red" }}>You have already posted a review.</p>
        ) : (
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
        )
      ) : (
        <p style={{ color: "red" }}>You must be logged in to review.</p>
      )}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
}

function Reviews() {
  const { id } = useParams() as { id: string };
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [editScore, setEditScore] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const reviewData: Review[] = await FetchReviewList(id);
      const userData = await fetchUserProfile();
      setReviews(reviewData);

      if (userData) {
        setUserId(userData._id)
        setHasReviewed(reviewData.some((review) => review.userId._id === userData._id)); // ตรวจสอบว่า user มี review แล้วหรือไม่
      }
    } catch (error) {
      console.error('Error fetching review list or user profile:', error);
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
      {<ReviewStatistics reviews={reviews} />}
      {<PostReview fetchData={fetchData} hasReviewed={hasReviewed} />}
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
              <a href={`/profile/otherUserProfile/${review.userId._id}`}>profile</a>

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

export default function Info() {

  return (
    <>
      <div>
        <AnimeInfo/>
      </div>
      <div>
        <Reviews/>
      </div>
    </>
  );
}