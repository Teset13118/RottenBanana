'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from 'axios';
import moment from "moment-timezone";
import "@/styles/globals.css";

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
  }, []);

  if (anime) {
    sessionStorage.setItem('animeTitle', anime.title)
    sessionStorage.setItem('animePic', anime.images.jpg.image_url)
  }
  return (
    <div>
      {anime ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 w-full">
          {/* Anime Image Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-5 lg:row-span-5">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-full h-full object-cover rounded-lg shadow-lg "
            />
          </div>

          {/* Anime Title and Genre Section */}
          <div className="col-span-1 row-span-2 md:col-span-2 lg:col-span-2 md:col-start-3 lg:col-start-3 md:row-span-2 lg:row-span-2 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">{anime.title}</h1>
            <p className="text-base md:text-lg mb-2">
              <strong>Genres:</strong> {anime.genres.map(genre => genre.name).join(', ')}
            </p>
            <p className="text-base md:text-lg mb-2">{anime.season} {anime.year}</p>
            <p className="text-sm md:text-md text-gray-600">{anime.rating}</p>
          </div>

          {/* YouTube Trailer Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 md:col-start-3 lg:col-start-5 md:row-span-3 lg:row-span-2 h-full">
            <div className="relative w-full h-full min-h-[200px]">
              <iframe
                src={anime.trailer.embed_url}
                title="YouTube Video"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>

          {/* Anime Synopsis Section */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 md:col-start-1 lg:col-start-3 md:row-span-2 lg:row-span-3 bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Synopsis</h2>
            <p className="text-sm md:text-md text-gray-700 flex-grow">{anime.synopsis}</p>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading anime details...</p>
      )}
    </div>
  );
};



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
    return stats.totalReviews > 0 ? ((count / stats.totalReviews) * 100).toFixed(1) : "0.0";
  };
  // สร้างความยาวของแถบตามสัดส่วน
  const getBarWidth = (count: number): string => {
    if (stats.totalReviews === 0) return ""; // รีเซ็ตแถบถ้าไม่มี review
    const percentage = (count / stats.totalReviews) * 100;
    return `${Math.max(percentage, 3)}%`; // ให้แถบมีความยาวอย่างน้อย 3% เพื่อความสวยงาม
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full col-span-1">
      <h2 className="text-xl font-semibold mb-4">Review Statistics</h2>

      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-600">{stats.averageScore}</div>
          <div className="text-sm text-gray-500">Average Score</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">{stats.totalReviews}</div>
          <div className="text-sm text-gray-500">Total Reviews</div>
        </div>
      </div>

      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map(score => (
          <div key={score} className="flex items-center">
            <div className="w-8 text-sm font-medium">{score} ★</div>
            <div className="flex-1 mx-2">
              <div className="h-3 rounded-full bg-gray-200">
                <div
                  className={`h-3 rounded-full ${score >= 4 ? 'bg-green-500' : score === 3 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: getBarWidth(stats.scoreDistribution[score]) }}
                ></div>
              </div>
            </div>
            <div className="w-24 text-right text-sm">
              {stats.scoreDistribution[score]} ({getPercentage(stats.scoreDistribution[score])}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function PostReview({ hasReviewed, fetchData }: { hasReviewed: boolean; fetchData: () => void; }) {
  const { id: animeId } = useParams() as { id: string };
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [animeTitle, setAnimeTitle] = useState<string>("");
  const [animePic, setAnimePic] = useState<string>("");
  const [scoreError, setScoreError] = useState<string>("");

  useEffect(() => {
    setIsAuthenticated(!!sessionStorage.getItem("token"));
    setAnimeTitle(sessionStorage.getItem("animeTitle") || "");
    setAnimePic(sessionStorage.getItem("animePic") || "");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setScoreError("");

    if (!isAuthenticated) {
      setErrorMessage("You must be logged in to review.");
      return;
    }

    if (score === 0) {
      setScoreError("Please select a score before posting.");
      return;
    }

    try {
      const res = await postReview(animeId, animeTitle, animePic, text, score)
      if (res.status === 201) {
        alert("Review posted successfully!");
        setText("");
        setScore(0);
        fetchData()
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Failed to post Review.");
    }
  };

  return (
    <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Post a Review</h2>
      {isAuthenticated ? (
        hasReviewed ? (
          <p className="text-red-500 font-medium">You have already posted a review.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              placeholder="Write your review..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
            <div>
              <p className="font-medium">Select your Banana ripeness:</p>
              <div className="flex gap-2">
                {[5, 4, 3, 2, 1].map((num) => (
                  <img
                    key={num}
                    src={`/bananaScore/${num}.png`}
                    alt={`Rating ${num}`}
                    className={`w-10 sm:w-12 md:w-16 cursor-pointer transition-opacity duration-200 ${score === num
                        ? "opacity-100 scale-125 md:scale-150"
                        : "opacity-70 hover:opacity-100 hover:scale-125 md:hover:scale-150"
                      }`}
                    onClick={() => {
                      setScore(num);
                      setScoreError("");
                    }}
                  />
                ))}
              </div>
              {scoreError && <p className="text-red-500 mt-2 font-medium">{scoreError}</p>}
            </div>
            <button
              type="submit"
              className={`w-full font-semibold py-2 rounded-lg transition 
              ${score === 0 ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              {score === 0 ? "Please Select a Score" : "Post Review"}
            </button>
          </form>
        )
      ) : (
        <p className="text-red-500 font-medium">You must be logged in to review.</p>
      )}
      {errorMessage && <div className="text-red-500 font-medium mt-2">{errorMessage}</div>}
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

  //modal
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const reviewData: Review[] = await FetchReviewList(id);
      const userData = await fetchUserProfile();
      setReviews(reviewData);

      if (userData) {
        setUserId(userData._id);
        setHasReviewed(reviewData.some((review) => review.userId._id === userData._id));
      }
    } catch (error) {
      console.error("Error fetching review list or user profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 p-4 lg:auto-rows-min">
      {/* Left Panel */}
      <div className="flex flex-col gap-4 lg:col-span-1">
        <PostReview hasReviewed={hasReviewed} fetchData={fetchData} />
        <ReviewStatistics reviews={reviews} />
      </div>

      {/* Right Panel (Reviews List) */}
      <div className="lg:col-span-2 p-6 rounded-lg shadow-lg bg-white self-start">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => {
            const createdAt = moment(review.createdAt).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
            const updatedAt = moment(review.updatedAt).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");

            return (
              <div key={review._id} className="border p-4 pb-1 mb-4 relative border-solid rounded-lg shadow-lg bg-white">
                <div className="flex items-center mb-3">
                  <a
                    href={`/profile/otherUserProfile/${review.userId._id}`}
                    className="font-bold text-lg mr-2 hover:underline"
                    title={review.userId.username}
                  >
                    {review.userId.nickname ? review.userId.nickname : review.userId.username}
                  </a>
                </div>

                <div className="my-3">
                  <p className="text-gray-700">{review.text}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <span className="font-semibold">Ripeness Level {review.score}</span>
                    <img src={`/bananaScore/${review.score}.png`} alt="Rating" className="w-16 mr-1" />
                  </div>

                  <div className="text-xs text-gray-500">

                    {/* <p>Created: {createdAt}</p>
                    <p>Updated: {updatedAt}</p> */}
                  </div>
                </div>

                {/* User actions dropdown */}
                {userId === review.userId._id && (
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === review._id ? null : review._id)}
                      className="size-10 p-1 rounded-full hover:bg-gray-100 font-bold"
                    >
                      &#x22EE;
                    </button>
                    {dropdownOpen === review._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                        <button
                          onClick={() => handleEdit(review)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
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

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold">Edit Review</h3>
            <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="border p-2 w-full mt-2" />
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
              <button onClick={() => handleUpdate(editingReview!)} className="bg-green-500 text-white px-3 py-1 mr-2">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-3 py-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Info() {

  return (
    <>
      <div>
        <AnimeInfo />
        <Reviews />
      </div>
    </>
  );
}