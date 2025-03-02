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
import { AnimeInfoSkeleton, ReviewStatisticsSkeleton, PostReviewSkeleton, ReviewsSkeleton } from '@/app/components/skeletons/animeDetailSkeleton';

export default function ReviewStatistics({ reviews }: { reviews: Review[] }) {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => setLoading(false), 800);
    }, []);
  
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
    if (loading) {
      return <ReviewStatisticsSkeleton />;
    }
  
  
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