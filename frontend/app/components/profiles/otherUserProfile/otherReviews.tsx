"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { FetchUserReview } from '@/app/api/reviewApi';
import { Review } from '@/types/type';
import { OtherUserReviewSkeleton } from "@/app/components/skeletons/profileSkeletons";
import { ReviewCard } from '../ReviewsCard';

// รีวิวทั้งหมดของผู้ใช้คนอื่น
export default function OtherUserReviews() {
    const { userId } = useParams() as { userId: string };
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const reviewData: Review[] = await FetchUserReview(userId, sortOrder);
                setReviews(reviewData);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sortOrder]);

    if (loading) {
        return <OtherUserReviewSkeleton />;
    }

    return (
        <ReviewCard reviews={reviews} sortOrder={sortOrder} setSortOrder={setSortOrder} />
    )
}