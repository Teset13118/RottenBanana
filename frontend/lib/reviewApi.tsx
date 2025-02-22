import axios from 'axios';

export async function FetchReviewList(id: string){
  try {
    const res = await axios.get(`http://localhost:8080/api/review/getReviewList/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching anime info:", error);
    throw error;
  }
};

export async function FetchUserReview(id: string){
  try {
    const res = await axios.get(`http://localhost:8080/api/review/getUserReview/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching anime info:", error);
    throw error;
  }
};

export async function postReview(animeId:string, animeName:string, animePic:string, text:string, score: number) {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.post("http://localhost:8080/api/review/postReview",
      { animeId, animeName, animePic ,text, score },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  } catch (error) {
    throw error;
  } 
};

export async function updateReview(reviewId: string, text: string, score: number) {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.put(`http://localhost:8080/api/review/updateReview/${reviewId}`,
        { text, score },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  
export async function deleteReview(reviewId: string){
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.delete(`http://localhost:8080/api/review/deleteReview/${reviewId}`, 
        { headers: { Authorization: `Bearer ${token}` }}
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

