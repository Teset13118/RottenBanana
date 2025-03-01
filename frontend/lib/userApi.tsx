import axios from 'axios';

export async function fetchUserProfile() {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) return null;

        const res = await axios.get('http://localhost:8080/api/auth/profile',
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function fetchOtherUserProfile(userId: string) {
    try {
        const res = await axios.get(`http://localhost:8080/api/auth/profile/${userId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};


export async function LogoutUser() {
    try {
        const token = sessionStorage.getItem('token');
        await axios.post('http://localhost:8080/api/auth/logout',
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        sessionStorage.removeItem('token');
    } catch (error) {
        throw error;
    }
}

export async function updateUserProfile(nickname: string, about: string) {
    try {
        const token = sessionStorage.getItem('token');
        await axios.put('http://localhost:8080/api/auth/update/profile', 
            {nickname, about},
            { headers: { Authorization: `Bearer ${token}` } }
        );
    }catch (error) {
        throw error;
    }
};
