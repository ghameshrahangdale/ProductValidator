import axios from "axios";
// import auth from "@react-native-firebase/auth";

// 🔐 If you want Firebase Auth later, you can re-enable this.
// const getAuthToken = async () => {
//   const currentUser = auth().currentUser;
//   if (currentUser) {
//     return await currentUser.getIdToken(); // ✅ Fetch from Firebase Auth
//   }
//   return null;
// };

const api = axios.create({
  baseURL: "http://192.168.174.77:4000/",
});

// ✅ Optional: Add token interceptor if using auth later
// api.interceptors.request.use(
//   async (config) => {
//     const token = await getAuthToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("Unauthorized — maybe redirect to login or refresh token.");
//     }
//     return Promise.reject(error);
//   }
// );

export default api;

