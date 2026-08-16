// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// axiosInstance.interceptors.request.use(
//     (config) => {

//         const token = localStorage.getItem("token");

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },

//     (error) => Promise.reject(error)
// );

// export default axiosInstance;

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error(
        "VITE_API_BASE_URL is not configured."
    );
}

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 15000,
});

// =========================================================
// REQUEST INTERCEPTOR
// =========================================================

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// =========================================================
// RESPONSE INTERCEPTOR
// =========================================================

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        if (!error.response) {
            console.error(
                "Network error: Backend is unreachable."
            );

            return Promise.reject(error);
        }

        if (error.response.status === 401) {
            console.warn(
                "Unauthorized request."
            );

            // Optional:
            // localStorage.removeItem("token");
            // window.location.href = "/login";
        }

        if (error.response.status === 403) {
            console.warn(
                "Forbidden: insufficient permissions."
            );
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;