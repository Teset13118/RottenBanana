'use client';
import { useState, useEffect } from 'react';

import { Review } from '@/types/type';
import { FetchUserReview } from '@/app/api/reviewApi';
import { UserReviewSkeleton } from '@/app/components/skeletons/profileSkeletons';
import { ReviewCard } from '../ReviewsCard';

// รีวิวทั้งหมดของผู้ใช้
export default function UserReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const fetchData = async () => {
        try {
            const userData = sessionStorage.getItem('userId') || "";
            const reviewData = await FetchUserReview(userData, sortOrder);
            setReviews(reviewData);
        } catch (error) {
            console.error("Error fetching user profile or reviews:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [sortOrder]);

    if (loading) {
        return <UserReviewSkeleton />;
    }

    return (
        <ReviewCard reviews={reviews} sortOrder={sortOrder} setSortOrder={setSortOrder}/>
    );
}