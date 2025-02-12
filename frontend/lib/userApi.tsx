import axios from 'axios';

export async function fetchUserProfile() {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/auth/profile', 
            { headers: { Authorization: `Bearer ${token}` }}
        );
        return res.data;
    } catch (error) {
        throw error;
    }
  };

export async function fetchOtherUserProfile(userId:string) {
    try {
        const res = await axios.get(`http://localhost:8080/api/auth/profile/${userId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
  };


export async function LogoutUser() {
    try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:8080/api/auth/logout',
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        localStorage.removeItem('token');
    } catch (error){
        throw error;
    }
}
