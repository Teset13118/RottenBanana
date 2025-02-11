"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function OtherUserProfile() {
  const { userId } = useParams(); // ดึง userId จาก URL
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/profile/${userId}`
        );
        setUser(response.data);
      } catch (err) {
        setError("User not found");
      }
    };

    if (userId) fetchUserProfile();
  }, [userId]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile of {user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
