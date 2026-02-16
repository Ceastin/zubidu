import axios from "axios";

const API = axios.create({ 
  // Vite exposes env variables automatically through this object
  baseURL: import.meta.env.VITE_API_URL 
});
export const getRandomImage = async () => {
    try {
        const response = await API.get("/image/random");
        return response.data.image;
    } catch (err) {
        console.error("Error fetching random image", err); 
        return null;
    }
};