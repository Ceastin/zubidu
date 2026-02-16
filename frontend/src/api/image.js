import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getRandomImage = async () => {
    try {
        const response = await API.get("/image/random");
        return response.data.image;
    } catch (err) {
        console.error("Error fetching random image", err); 
        return null;
    }
};