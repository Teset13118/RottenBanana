'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

import { postReview } from '@/lib/reviewApi';
import { PostReviewSkeleton} from '@/app/components/skeletons/animeDetailSkeleton';

export default function PostReview({ hasReviewed, fetchData }: { hasReviewed: boolean; fetchData: () => void; }) {
    const { id: animeId } = useParams() as { id: string };
    const [text, setText] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [animeTitle, setAnimeTitle] = useState<string>("");
    const [animePic, setAnimePic] = useState<string>("");
    const [scoreError, setScoreError] = useState<string>("");
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setIsAuthenticated(!!sessionStorage.getItem("token"));
      setAnimeTitle(sessionStorage.getItem("animeTitle") || "");
      setAnimePic(sessionStorage.getItem("animePic") || "");
      setTimeout(() => setLoading(false), 800);
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
  
    if (loading) {
      return <PostReviewSkeleton />;
    }
  
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