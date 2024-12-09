import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseURL) {
  console.error("NEXT_PUBLIC_BASE_URL is not defined");
}

const apiClient = axios.create({
  // baseURL: "https://codingcommando.in/api/v1/",
  // baseURL: "http://localhost:8000/api/v1/",
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
