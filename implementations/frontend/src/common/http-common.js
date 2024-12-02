import axios from "axios";

export default axios.create({
    baseURL : "https://greenpath-backend.vercel.app/api", // "http://localhost:5000/api",
    headers : {
        "Content-Type" : "application/json"
    }
})