'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from 'axios';


function AnimeInfo() {
  interface Anime  {
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }
  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);

  useEffect(() => {
      fetch(`http://localhost:8080/api/anime/${id}`)
        .then((res) => res.json())
        .then((data) => setAnime(data))
        .catch((err) => console.error('Error fetching anime info:', err));
  }, [id]);

  console.log(anime)

  return (
      <div>
        <p>{id ? `Anime ID: ${id}` : "No ID found"}</p>
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
  

function CommentList() {
  interface Comment {
    _id : string;
    userId: {
      _id: string;
      username: string;
    };
    animeId: string;
    text: string;
    score: number;
    createdAt: string;
    updatedAt: string;
  }
  const { id } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  
  useEffect(() => {
    fetch(`http://localhost:8080/api/comment/getCommentList/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error('Error fetching anime info:', err));
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key = {comment._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <p>Comment ID:{comment._id}</p>
            <p>User ID: {comment.userId._id}</p>
            <p><strong>User:</strong> {comment.userId.username || "Anonymous"}</p>
            <p><strong>Score:</strong> {comment.score}/5</p>
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

function PostComment(){
  const { id: animeId } = useParams();
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
      setErrorMessage("You must be logged in to comment.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/comment/postComment",
        { animeId, text, score },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert("Comment posted successfully!");
        setText("");
        setScore(5);
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Failed to post comment.");
    }
  };

  return (
    <div>
      <h2>Post a Comment</h2>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Score (1-5)"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p style={{ color: "red" }}>You must be logged in to comment.</p>
      )}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
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
        <PostComment/>
      </div>
      <div>
        <CommentList/>
      </div>
    </>
  )
}