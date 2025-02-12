import axios from 'axios';

export async function FetchCommentList(id: string){
  try {
    const res = await axios.get(`http://localhost:8080/api/comment//getCommentList/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching anime info:", error);
    throw error;
  }
};

export async function postComment(animeId:string, text:string, score: number) {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post("http://localhost:8080/api/comment/postComment",
      { animeId, text, score },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  } catch (error) {
    throw error;
  } 
};

export async function updateComment(commentId: string, text: string, score: number) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`http://localhost:8080/api/comment/updateComment/${commentId}`,
        { text, score },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  
export async function deleteComment(commentId: string){
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:8080/api/comment/deleteComment/${commentId}`, 
        { headers: { Authorization: `Bearer ${token}` }}
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

