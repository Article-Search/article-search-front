import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const token = localStorage.getItem('accessToken');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

api.interceptors.response.use(
    response => response, // simply return the response for successful requests
    async error => {
        if (error.response.status === 401 || error.response.status === 403) {
            // If we get a 401 or 403 error, try to refresh the token
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const response = await axios.post('/auth/refresh/', { refresh: refreshToken });
                    const newToken = response.data.access;
                    localStorage.setItem('accessToken', newToken);


                    // Retry the original request with the new token
                    const config = error.config;
                    config.headers['Authorization'] = `Bearer ${newToken}`;
                    return axios(config);
                } catch (refreshError) {
                    // If refreshing the token fails, handle the error (e.g., redirect to login page)
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;
