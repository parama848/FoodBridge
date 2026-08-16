// import {
//     createContext,
//     useContext,
//     useEffect,
//     useState
// } from "react";

// import axiosInstance from "../api/axiosInstance";


// const AuthContext = createContext(null);


// export function AuthProvider({ children }) {

//     const [user, setUser] = useState(null);

//     const [token, setToken] = useState(null);

//     const [loading, setLoading] = useState(true);


//     // =========================================================
//     // RESTORE AUTHENTICATION
//     // =========================================================

//     useEffect(() => {

//         const storedToken =
//             localStorage.getItem("token");

//         const storedUser =
//             localStorage.getItem("user");


//         if (storedToken && storedUser) {

//             try {

//                 setToken(storedToken);

//                 setUser(
//                     JSON.parse(storedUser)
//                 );

//             } catch (error) {

//                 console.error(
//                     "Failed to restore user:",
//                     error
//                 );

//                 localStorage.removeItem("token");

//                 localStorage.removeItem("user");
//             }
//         }


//         setLoading(false);

//     }, []);


//     // =========================================================
//     // LOGIN
//     // POST /api/auth/login
//     // =========================================================

//     const login = async (
//         email,
//         password
//     ) => {

//         const response =
//             await axiosInstance.post(
//                 "/auth/login",
//                 {
//                     email,
//                     password
//                 }
//             );


//         /*
//          * Backend response:
//          *
//          * ApiResponse<LoginResponse>
//          *
//          * Therefore:
//          *
//          * response.data
//          *      ↓
//          * ApiResponse
//          *
//          * response.data.data
//          *      ↓
//          * LoginResponse
//          */

//         const apiResponse =
//             response.data;


//         if (!apiResponse.success) {

//             throw new Error(
//                 apiResponse.message ||
//                 "Login failed"
//             );
//         }


//         const loginResponse =
//             apiResponse.data;


//         if (!loginResponse) {

//             throw new Error(
//                 "Login response data is missing"
//             );
//         }


//         /*
//          * LoginResponse should contain
//          * the JWT and user information.
//          */

//         const receivedToken =
//             loginResponse.token;


//         const receivedUser =
//             loginResponse.user;


//         if (!receivedToken) {

//             throw new Error(
//                 "JWT token was not returned by server"
//             );
//         }


//         if (!receivedUser) {

//             throw new Error(
//                 "User information was not returned by server"
//             );
//         }


//         // -----------------------------------------------------
//         // SAVE SESSION
//         // -----------------------------------------------------

//         localStorage.setItem(
//             "token",
//             receivedToken
//         );


//         localStorage.setItem(
//             "user",
//             JSON.stringify(receivedUser)
//         );


//         // -----------------------------------------------------
//         // UPDATE CONTEXT
//         // -----------------------------------------------------

//         setToken(receivedToken);

//         setUser(receivedUser);


//         return receivedUser;
//     };


//     // =========================================================
//     // LOGOUT
//     // =========================================================

//     const logout = () => {

//         localStorage.removeItem("token");

//         localStorage.removeItem("user");

//         setToken(null);

//         setUser(null);
//     };


//     return (

//         <AuthContext.Provider
//             value={{
//                 user,
//                 token,
//                 loading,

//                 isAuthenticated:
//                     Boolean(token && user),

//                 login,
//                 logout
//             }}
//         >

//             {children}

//         </AuthContext.Provider>
//     );
// }


// // =============================================================
// // CUSTOM HOOK
// // =============================================================

// export function useAuth() {

//     const context =
//         useContext(AuthContext);


//     if (!context) {

//         throw new Error(
//             "useAuth must be used inside AuthProvider"
//         );
//     }


//     return context;
// }

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import toast from "react-hot-toast";

import axiosInstance from "../api/axiosInstance";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(true);


    // =========================================================
    // RESTORE AUTHENTICATION
    // =========================================================

    useEffect(() => {

        const storedToken =
            localStorage.getItem("token");

        const storedUser =
            localStorage.getItem("user");


        if (storedToken && storedUser) {

            try {

                const parsedUser =
                    JSON.parse(storedUser);

                setToken(storedToken);

                setUser(parsedUser);

            } catch (error) {

                console.error(
                    "Failed to restore authentication:",
                    error
                );

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setToken(null);
                setUser(null);
            }
        }


        setLoading(false);

    }, []);


    // =========================================================
    // LOGIN
    // POST /api/auth/login
    // =========================================================

    const login = async (
        email,
        password
    ) => {

        try {

            // -------------------------------------------------
            // API REQUEST
            // -------------------------------------------------

            const response =
                await axiosInstance.post(
                    "/auth/login",
                    {
                        email: email.trim(),
                        password
                    }
                );


            // -------------------------------------------------
            // API RESPONSE
            // -------------------------------------------------

            const apiResponse =
                response.data;


            if (!apiResponse?.success) {

                throw new Error(
                    apiResponse?.message ||
                    "Login failed"
                );
            }


            const loginResponse =
                apiResponse.data;


            if (!loginResponse) {

                throw new Error(
                    "Login response data is missing"
                );
            }


            // -------------------------------------------------
            // EXTRACT TOKEN + USER
            // -------------------------------------------------

            const receivedToken =
                loginResponse.token;

            const receivedUser =
                loginResponse.user;


            if (!receivedToken) {

                throw new Error(
                    "Authentication token was not returned by server"
                );
            }


            if (!receivedUser) {

                throw new Error(
                    "User information was not returned by server"
                );
            }


            // -------------------------------------------------
            // SAVE SESSION
            // -------------------------------------------------

            localStorage.setItem(
                "token",
                receivedToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(receivedUser)
            );


            // -------------------------------------------------
            // UPDATE AUTH STATE
            // -------------------------------------------------

            setToken(receivedToken);

            setUser(receivedUser);


            // -------------------------------------------------
            // SUCCESS TOAST
            // -------------------------------------------------

            toast.success(
                `Welcome back, ${receivedUser.name || "User"}`,
                {
                    duration: 3500,
                }
            );


            return receivedUser;

        } catch (error) {

            // -------------------------------------------------
            // CLEAN ERROR MESSAGE
            // -------------------------------------------------

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Unable to login. Please try again.";


            // -------------------------------------------------
            // LOGIN ERROR TOAST
            // -------------------------------------------------

            toast.error(
                message,
                {
                    duration: 4000,
                }
            );


            // -------------------------------------------------
            // IMPORTANT
            // -------------------------------------------------
            // Re-throw so Login.jsx can still handle
            // loading/navigation/form state if required.
            // -------------------------------------------------

            throw error;
        }
    };


    // =========================================================
    // LOGOUT
    // =========================================================

    const logout = () => {

        // -----------------------------------------------------
        // CLEAR SESSION
        // -----------------------------------------------------

        localStorage.removeItem("token");

        localStorage.removeItem("user");


        // -----------------------------------------------------
        // CLEAR AUTH STATE
        // -----------------------------------------------------

        setToken(null);

        setUser(null);


        // -----------------------------------------------------
        // LOGOUT TOAST
        // -----------------------------------------------------

        toast.success(
            "You have been securely signed out.",
            {
                duration: 3000,
            }
        );
    };


    // =========================================================
    // CONTEXT VALUE
    // =========================================================

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                loading,

                isAuthenticated:
                    Boolean(token && user),

                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}


// =============================================================
// CUSTOM HOOK
// =============================================================

export function useAuth() {

    const context =
        useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }


    return context;
}