'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from 'axios';
import moment from "moment-timezone";

import {  Anime, Comment }  from '@/types/type';
import {  FetchAnime }  from '@/lib/animeApi';
import { FetchCommentList, updateComment, deleteComment, postComment } from '@/lib/commentApi';


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
  const { id } = useParams() as { id:string };
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [editScore, setEditScore] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchCommentList(id);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comment list:', error);
      }

      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        setUserId(decodedToken.id);
      }
    };
    fetchData();
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
        comments.map((comment) => {
          const createdAt = moment(comment.createdAt).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
          const updatedAt = moment(comment.updatedAt).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");

          return (
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
              <p><strong>Created At:</strong> {createdAt}</p>  {/* เพิ่มแสดงเวลา createdAt */}
              <p><strong>Updated At:</strong> {updatedAt}</p>  {/* เพิ่มแสดงเวลา updatedAt */}
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
          );
        })
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

function PostComment(){
  const { id: animeId } = useParams() as {id:string};
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    if (!token) {
      setErrorMessage("You must be logged in to comment.");
      return;
    }

    try {
      const res = await postComment(animeId, text, score)
      if (res.status === 201) {
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