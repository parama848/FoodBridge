// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import { useAuth } from "../../context/AuthContext";

// function Login() {
//   const navigate = useNavigate();

//   const { login } = useAuth();

//   // =========================================================
//   // FORM STATE
//   // =========================================================

//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   // =========================================================
//   // UI STATE
//   // =========================================================

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   // =========================================================
//   // LOGIN
//   // =========================================================

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");

//     // -----------------------------------------------------
//     // VALIDATION
//     // -----------------------------------------------------

//     if (!email.trim()) {
//       setError("Please enter your email address.");

//       return;
//     }

//     if (!password.trim()) {
//       setError("Please enter your password.");

//       return;
//     }

//     try {
//       setLoading(true);

//       // -------------------------------------------------
//       // AUTH CONTEXT
//       // -------------------------------------------------

//       const loggedInUser = await login(email.trim(), password);

//       console.log("Login successful:", loggedInUser);

//       // -------------------------------------------------
//       // REDIRECT
//       // -------------------------------------------------

//       navigate("/home", {
//         replace: true,
//       });
//     } catch (error) {
//       console.error("Login failed:", error);

//       // -------------------------------------------------
//       // BACKEND ERROR
//       // -------------------------------------------------

//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Invalid email or password.";

//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white">
//       <div className="grid min-h-screen lg:grid-cols-2">
//         {/* =====================================================
//                     LEFT SIDE — BRAND
//                 ===================================================== */}

//         <div className="relative hidden overflow-hidden lg:flex">
//           {/* Background effects */}

//           <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

//           <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

//           <div className="relative flex w-full flex-col justify-between p-12">
//             {/* Main message */}

//             <div className="max-w-xl">
//               <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
//                 <span className="h-2 w-2 rounded-full bg-emerald-400" />
//                 Fighting food waste together
//               </div>

//               <h1 className="text-5xl font-bold leading-tight xl:text-6xl">
//                 Turning
//                 <span className="text-emerald-400"> surplus food</span>
//                 <br />
//                 into meaningful meals.
//               </h1>

//               <p className="mt-6 max-w-lg text-lg leading-8 text-gray-400">
//                 FoodBridge connects food donors with verified foundations to
//                 make food redistribution faster, safer and more impactful.
//               </p>

//               <Link to="/register">
//                 <button
//                   className="
//                                     rounded-xl
//                                    mt-10
//                                     bg-white
//                                     px-5
//                                     py-2.5
//                                     text-sm
//                                     font-semibold
//                                     text-black
//                                     transition
//                                     hover:bg-gray-200
//                                 "
//                 >
//                   Get started
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* =====================================================
//                     RIGHT SIDE — LOGIN
//                 ===================================================== */}

//         <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
//           <div className="w-full max-w-md">
//             {/* Mobile Logo */}

//             <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
//                 <span className="font-black">F</span>
//               </div>

//               <span className="text-xl font-bold">FoodBridge</span>
//             </div>

//             {/* Heading */}

//             <div className="mb-8">
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
//                 Welcome back
//               </h2>

//               <p className="mt-3 text-gray-400">
//                 Sign in to continue to your FoodBridge account.
//               </p>
//             </div>

//             {/* Card */}

//             <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 sm:p-8">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* =================================================
//                                     EMAIL
//                                 ================================================= */}

//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="mb-2 block text-sm font-medium text-gray-300"
//                   >
//                     Email address
//                   </label>

//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(event) => setEmail(event.target.value)}
//                     placeholder="you@example.com"
//                     autoComplete="email"
//                     disabled={loading}
//                     className="block w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-400/60 focus:bg-black/60 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-50"
//                   />
//                 </div>

//                 {/* =================================================
//                                     PASSWORD
//                                 ================================================= */}

//                 <div>
//                   <div className="mb-2 flex items-center justify-between">
//                     <label
//                       htmlFor="password"
//                       className="block text-sm font-medium text-gray-300"
//                     >
//                       Password
//                     </label>

//                     {/* <button
//                                             type="button"
//                                             className="text-xs font-medium text-gray-400 transition hover:text-white"
//                                         >
//                                             Forgot password?
//                                         </button> */}
//                   </div>

//                   <input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(event) => setPassword(event.target.value)}
//                     placeholder="Enter your password"
//                     autoComplete="current-password"
//                     disabled={loading}
//                     className="block w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-400/60 focus:bg-black/60 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-50"
//                   />
//                 </div>

//                 {/* =================================================
//                                     REMEMBER ME
//                                 ================================================= */}

//                 {/* <label className="flex items-center gap-3 text-sm text-gray-400">

//                                     <input
//                                         type="checkbox"
//                                         className="h-4 w-4 rounded border-white/20 bg-black"
//                                     />

//                                     Remember me

//                                 </label> */}

//                 {/* =================================================
//                                     ERROR
//                                 ================================================= */}

//                 {error && (
//                   <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
//                     {error}
//                   </div>
//                 )}

//                 {/* =================================================
//                                     SIGN IN
//                                 ================================================= */}

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full rounded-xl bg-emerald-400 py-3.5 font-semibold text-black transition hover:bg-emerald-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   {loading ? "Signing in..." : "Sign in"}
//                 </button>
//               </form>

//               {/* =================================================
//                                 REGISTER LINK
//                             ================================================= */}

//               <div className="mt-7 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
//                 Don't have an account?
//                 <Link
//                   to="/register"
//                   className="ml-2 font-semibold text-white transition hover:text-emerald-400"
//                 >
//                   Create account
//                 </Link>
//               </div>
//             </div>

//             {/* Footer */}

//             <p className="mt-6 text-center text-xs leading-5 text-gray-600">
//               By continuing, you agree to FoodBridge's terms and privacy policy.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    Eye,
    EyeOff,
    Loader2,
    LogIn
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";


function Login() {

    const navigate = useNavigate();

    const {
        login
    } = useAuth();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const [showPassword, setShowPassword] =
        useState(false);


    const [loading, setLoading] =
        useState(false);


    const [errors, setErrors] =
        useState({});


    // =========================================================
    // HANDLE INPUT
    // =========================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));


        // Clear field error while typing

        if (errors[name]) {

            setErrors((previous) => ({
                ...previous,
                [name]: ""
            }));
        }
    };


    // =========================================================
    // VALIDATION
    // =========================================================

    const validate = () => {

        const newErrors = {};


        if (!formData.email.trim()) {

            newErrors.email =
                "Email is required";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(formData.email)
        ) {

            newErrors.email =
                "Enter a valid email address";
        }


        if (!formData.password) {

            newErrors.password =
                "Password is required";

        } else if (
            formData.password.length < 8
        ) {

            newErrors.password =
                "Password must contain at least 8 characters";
        }


        setErrors(newErrors);


        return Object.keys(newErrors).length === 0;
    };


    // =========================================================
    // LOGIN
    // =========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!validate()) {
            return;
        }


        setLoading(true);


        try {

            const loggedInUser =
                await login(
                    formData.email,
                    formData.password
                );


            // -------------------------------------------------
            // ROLE BASED REDIRECTION
            // -------------------------------------------------

            const role =
                loggedInUser?.role?.toUpperCase();


            switch (role) {

                case "DONOR":

                    navigate(
                        "/donor/dashboard",
                        {
                            replace: true
                        }
                    );

                    break;


                case "FOUNDATION":

                    navigate(
                        "/foundation/dashboard",
                        {
                            replace: true
                        }
                    );

                    break;


                case "ADMIN":

                    navigate(
                        "/admin/dashboard",
                        {
                            replace: true
                        }
                    );

                    break;


                default:

                    navigate(
                        "/home",
                        {
                            replace: true
                        }
                    );
            }

        } catch (error) {

            /*
             * AuthContext already displays the
             * professional error toast.
             *
             * We intentionally don't show another
             * toast here to avoid duplicate messages.
             */

            console.error(
                "Login failed:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================================
    // UI
    // =========================================================

    return (

        <div className="
            min-h-screen
            bg-[#050505]
            px-5
            py-12
            text-white
        ">

            <div className="
                mx-auto
                flex
                min-h-[calc(100vh-6rem)]
                max-w-md
                items-center
                justify-center
            ">

                <div className="
                    w-full
                    rounded-3xl
                    border
                    border-white/[0.08]
                    bg-white/[0.03]
                    p-6
                    shadow-2xl
                    backdrop-blur-xl
                    sm:p-8
                ">

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="
                        mb-8
                        text-center
                    ">

                        <div className="
                            mx-auto
                            mb-5
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-white
                            text-black
                            shadow-lg
                        ">

                            <span className="
                                text-xl
                                font-black
                            ">
                                F
                            </span>

                        </div>


                        <h1 className="
                            text-2xl
                            font-bold
                            tracking-tight
                        ">
                            Welcome back
                        </h1>


                        <p className="
                            mt-2
                            text-sm
                            text-gray-500
                        ">
                            Sign in to continue to FoodBridge
                        </p>

                    </div>


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* EMAIL */}

                        <div>

                            <label
                                htmlFor="email"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-300
                                "
                            >
                                Email address
                            </label>


                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                placeholder="you@example.com"
                                disabled={loading}
                                className={`
                                    w-full
                                    rounded-xl
                                    border
                                    bg-white/[0.03]
                                    px-4
                                    py-3
                                    text-sm
                                    text-white
                                    outline-none
                                    transition
                                    placeholder:text-gray-600
                                    focus:bg-white/[0.05]
                                    ${
                                        errors.email
                                            ? "border-red-400/50 focus:border-red-400"
                                            : "border-white/10 focus:border-white/30"
                                    }
                                `}
                            />


                            {errors.email && (

                                <p className="
                                    mt-2
                                    text-xs
                                    text-red-400
                                ">
                                    {errors.email}
                                </p>
                            )}

                        </div>


                        {/* PASSWORD */}

                        <div>

                            <label
                                htmlFor="password"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-300
                                "
                            >
                                Password
                            </label>


                            <div className="relative">

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    disabled={loading}
                                    className={`
                                        w-full
                                        rounded-xl
                                        border
                                        bg-white/[0.03]
                                        px-4
                                        py-3
                                        pr-12
                                        text-sm
                                        text-white
                                        outline-none
                                        transition
                                        placeholder:text-gray-600
                                        focus:bg-white/[0.05]
                                        ${
                                            errors.password
                                                ? "border-red-400/50 focus:border-red-400"
                                                : "border-white/10 focus:border-white/30"
                                        }
                                    `}
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (previous) =>
                                                !previous
                                        )
                                    }
                                    disabled={loading}
                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        rounded-lg
                                        p-2
                                        text-gray-500
                                        transition
                                        hover:bg-white/[0.05]
                                        hover:text-white
                                    "
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >

                                    {showPassword ? (

                                        <EyeOff
                                            size={18}
                                        />

                                    ) : (

                                        <Eye
                                            size={18}
                                        />

                                    )}

                                </button>

                            </div>


                            {errors.password && (

                                <p className="
                                    mt-2
                                    text-xs
                                    text-red-400
                                ">
                                    {errors.password}
                                </p>
                            )}

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-green-400
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-black
                                transition
                                hover:bg-green-400
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {loading ? (

                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Signing in...
                                </>

                            ) : (

                                <>
                                    <LogIn
                                        size={18}
                                    />

                                    Sign in
                                </>

                            )}

                        </button>

                    </form>


                    {/* =================================================
                        REGISTER
                    ================================================= */}

                    <div className="
                        mt-7
                        text-center
                        text-sm
                        text-gray-500
                    ">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="
                                font-medium
                                text-white
                                transition
                                hover:text-gray-300
                            "
                        >
                            Create New Account
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default Login;