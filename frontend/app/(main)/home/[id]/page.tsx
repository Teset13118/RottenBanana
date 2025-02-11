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

async function updateComment(commentId: string, text: string, score: number) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`http://localhost:8080/api/comment/updateComment/${commentId}`,
      { text, score },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

async function deleteComment(commentId: string){
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`http://localhost:8080/api/comment/deleteComment/${commentId}`, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
    return res.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

function CommentList() {
  interface Comment {
    _id: string;
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
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [editScore, setEditScore] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    fetch(`http://localhost:8080/api/comment/getCommentList/${id}`)
    .then((res) => res.json())
    .then((data) => setComments(data))
    .catch((err) => console.error('Error fetching anime info:', err));

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      setUserId(decodedToken.id);
    }
  });

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment._id);
    setEditText(comment.text);
    setEditScore(comment.score);
  };

  const handleUpdate = async (commentId: string) => {
    try {
      await updateComment(commentId, editText, editScore);
      setEditingComment(null);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}
          >
            <p>Comment ID: {comment._id}</p>
            <p>User ID: {comment.userId._id}</p>
            <p>
              <strong>User:</strong> {comment.userId.username || "Anonymous"}
            </p>
            <p>
              <strong>Score:</strong> {comment.score}/5
            </p>
            <p>{comment.text}</p>
            <a href={`/profile/${comment.userId._id}`}>profile</a>

            {/* ปุ่ม Edit & Delete เฉพาะเจ้าของคอมเมนต์ */}
            {userId === comment.userId._id && (
              <div>
                {editingComment === comment._id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      placeholder="Edit comment"
                    />
                    <input
                      type="number"
                      value={editScore}
                      onChange={(e) => setEditScore(Number(e.target.value))}
                      min="0"
                      max="5"
                    />
                    <button onClick={() => handleUpdate(comment._id)}>Save</button>
                    <button onClick={() => setEditingComment(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(comment)}>Edit</button>
                    <button onClick={() => handleDelete(comment._id)}>Delete</button>
                  </>
                )}
              </div>
            )}
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
      const response = await axios.post("http://localhost:8080/api/comment/postComment",
        { animeId, text, score },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert("Comment posted successfully!");
        setText("");
        setScore(0);
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