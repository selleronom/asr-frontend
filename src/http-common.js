import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/backend/",
  withCredentials: true,
  headers: {
    "Content-type": "application/json"
  }
});