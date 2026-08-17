import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";


function Register() {

    const navigate = useNavigate();


    // =========================================================
    // FORM STATE
    // =========================================================

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        role: "DONOR"

    });


    // =========================================================
    // UI STATE
    // =========================================================

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =========================================================
    // HANDLE INPUT
    // =========================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData(
            (previous) => ({
                ...previous,
                [name]: value
            })
        );


        // Clear old messages while user edits

        if (error) {
            setError("");
        }

        if (success) {
            setSuccess("");
        }
    };


    // =========================================================
    // REGISTER
    // =========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        setError("");
        setSuccess("");


        // =====================================================
        // VALIDATION
        // =====================================================

        if (!formData.name.trim()) {

            const message =
                "Please enter your full name.";

            setError(message);

            toast.error(message);

            return;
        }


        if (!formData.email.trim()) {

            const message =
                "Please enter your email address.";

            setError(message);

            toast.error(message);

            return;
        }


        // -----------------------------------------------------
        // EMAIL FORMAT
        // -----------------------------------------------------

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailRegex.test(
                formData.email.trim()
            )
        ) {

            const message =
                "Please enter a valid email address.";

            setError(message);

            toast.error(message);

            return;
        }


        // -----------------------------------------------------
        // PASSWORD
        // -----------------------------------------------------

        if (!formData.password.trim()) {

            const message =
                "Please enter a password.";

            setError(message);

            toast.error(message);

            return;
        }


        // Backend requires minimum 8 characters

        if (formData.password.length < 8) {

            const message =
                "Password must contain at least 8 characters.";

            setError(message);

            toast.error(message);

            return;
        }


        try {

            setLoading(true);


            // =================================================
            // POST /api/users
            // =================================================

            const response =
                await axiosInstance.post(
                    "/users",
                    {
                        name:
                            formData.name.trim(),

                        email:
                            formData.email
                                .trim()
                                .toLowerCase(),

                        password:
                            formData.password,

                        role:
                            formData.role
                    }
                );


            // =================================================
            // API RESPONSE
            // =================================================

            const apiResponse =
                response.data;


            console.log(
                "Registration response:",
                apiResponse
            );


            // =================================================
            // CHECK BACKEND SUCCESS
            // =================================================

            if (!apiResponse?.success) {

                throw new Error(
                    apiResponse?.message ||
                    "Registration failed."
                );
            }


            // =================================================
            // SUCCESS MESSAGE
            // =================================================

            let successMessage;


            if (
                formData.role === "FOUNDATION"
            ) {

                successMessage =
                    "Foundation account created successfully.";

            } else {

                successMessage =
                    "Account created successfully. Welcome to FoodBridge!";
            }


            // =================================================
            // INLINE SUCCESS
            // =================================================

            setSuccess(
                formData.role === "FOUNDATION"
                    ? "Foundation account created successfully. Redirecting to login..."
                    : "Account created successfully. Redirecting to login..."
            );


            // =================================================
            // SUCCESS TOAST
            // =================================================

            toast.success(
                successMessage,
                {
                    duration: 4000
                }
            );


            // =================================================
            // REDIRECT TO LOGIN
            // =================================================

            setTimeout(() => {

                navigate(
                    "/login",
                    {
                        replace: true
                    }
                );

            }, 1200);


        } catch (error) {

            console.error(
                "Registration failed:",
                error
            );


            // =================================================
            // BACKEND ERROR
            // =================================================

            const backendResponse =
                error?.response?.data;


            let errorMessage =
                "Registration failed. Please try again.";


            // =================================================
            // VALIDATION ERRORS
            // =================================================

            if (
                backendResponse?.errors
            ) {

                const validationErrors =
                    Object.values(
                        backendResponse.errors
                    );


                if (
                    validationErrors.length > 0
                ) {

                    errorMessage =
                        validationErrors.join(" ");

                } else {

                    errorMessage =
                        backendResponse?.message ||
                        errorMessage;
                }

            } else {

                errorMessage =
                    backendResponse?.message ||
                    backendResponse?.error ||
                    error?.message ||
                    errorMessage;
            }


            // =================================================
            // INLINE ERROR
            // =================================================

            setError(errorMessage);


            // =================================================
            // ERROR TOAST
            // =================================================

            toast.error(
                errorMessage,
                {
                    duration: 4500
                }
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
            bg-[#F8FAFD]
            text-[#111827]
        ">

            <div className="
                flex
                min-h-screen
                items-center
                justify-center
                px-5
                py-10
                sm:px-8
            ">

                <div className="
                    w-full
                    max-w-lg
                ">


                    {/* =====================================================
                        LOGO
                    ===================================================== */}

                    <div className="
                        mb-8
                        flex
                        items-center
                        justify-center
                        gap-3
                    ">

                        <div className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#1557D6]
                            text-white
                            shadow-[0_6px_18px_rgba(21,87,214,0.18)]
                        ">

                            <span className="
                                text-lg
                                font-black
                            ">
                                F
                            </span>

                        </div>


                        <span className="
                            text-xl
                            font-bold
                        ">
                            FoodBridge
                        </span>

                    </div>


                    {/* =====================================================
                        HEADING
                    ===================================================== */}

                    <div className="
                        mb-8
                        text-center
                    ">

                        <h1 className="
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        ">
                            Create your account
                        </h1>


                        <p className="
                            mt-3
                            text-[#17233D]
                        ">
                            Join FoodBridge and help reduce food waste.
                        </p>

                    </div>


                    {/* =====================================================
                        CARD
                    ===================================================== */}

                    <div className="
                        rounded-3xl
                        border
                        border-[#D9E1ED]
                        bg-white
                        p-6
                        shadow-[0_12px_35px_rgba(23,35,61,0.08)]
                        sm:p-8
                    ">


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >


                            {/* =================================================
                                FULL NAME
                            ================================================= */}

                            <div>

                                <label
                                    htmlFor="name"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-bold
                                        text-[#111827]
                                    "
                                >
                                    Full name
                                </label>


                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    autoComplete="name"
                                    disabled={loading}
                                    className="
                                        block
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#D9E1ED]
                                        bg-white
                                        px-4
                                        py-3.5
                                        text-[#111827]
                                        outline-none
                                        transition
                                        placeholder:text-[#64748B]
                                        focus:border-[#1557D6]
                                        focus:ring-4
                                        focus:ring-[#1557D6]/10
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                />

                            </div>


                            {/* =================================================
                                EMAIL
                            ================================================= */}

                            <div>

                                <label
                                    htmlFor="email"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-bold
                                        text-[#111827]
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
                                    placeholder="you@gmail.com"
                                    autoComplete="email"
                                    disabled={loading}
                                    className="
                                        block
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#D9E1ED]
                                        bg-white
                                        px-4
                                        py-3.5
                                        text-[#111827]
                                        outline-none
                                        transition
                                        placeholder:text-[#64748B]
                                        focus:border-[#1557D6]
                                        focus:ring-4
                                        focus:ring-[#1557D6]/10
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                />

                            </div>


                            {/* =================================================
                                PASSWORD
                            ================================================= */}

                            <div>

                                <label
                                    htmlFor="password"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-bold
                                        text-[#111827]
                                    "
                                >
                                    Password
                                </label>


                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a strong password"
                                    autoComplete="new-password"
                                    disabled={loading}
                                    className="
                                        block
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#D9E1ED]
                                        bg-white
                                        px-4
                                        py-3.5
                                        text-[#111827]
                                        outline-none
                                        transition
                                        placeholder:text-[#64748B]
                                        focus:border-[#1557D6]
                                        focus:ring-4
                                        focus:ring-[#1557D6]/10
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                />


                                <p className="
                                    mt-2
                                    text-xs
                                    font-medium
                                    text-[#475569]
                                ">
                                    Minimum 8 characters.
                                </p>

                            </div>


                            {/* =================================================
                                ROLE
                            ================================================= */}

                            <div>

                                <label
                                    htmlFor="role"                                    
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-bold
                                        text-[#111827]
                                    "
                                >
                                    Account type
                                </label>


                                <select
    id="role"
    name="role"
    value={formData.role}
    onChange={handleChange}
    disabled={loading}
    className="
        block
        w-full
        rounded-xl
        border
        border-[#D9E1ED]
        bg-white
        px-4
        py-3.5
        text-[#111827]
        outline-none
        transition
        focus:border-[#1557D6]
        focus:ring-4
        focus:ring-[#1557D6]/10
        disabled:cursor-not-allowed
        disabled:opacity-50
    "
>
    <option value="" disabled>
        Select account type
    </option>

    <option value="DONOR">
        Donor
    </option>

    <option value="FOUNDATION">
        Foundation
    </option>
</select>

                            </div>


                            {/* =================================================
                                ERROR
                            ================================================= */}

                            {error && (

                                <div className="
                                    rounded-xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-red-700
                                ">

                                    {error}

                                </div>

                            )}


                            {/* =================================================
                                SUCCESS
                            ================================================= */}

                            {success && (

                                <div className="
                                    rounded-xl
                                    border
                                    border-emerald-200
                                    bg-emerald-50
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-emerald-700
                                ">

                                    {success}

                                </div>

                            )}


                            {/* =================================================
                                REGISTER BUTTON
                            ================================================= */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full
                                    rounded-xl
                                    bg-[#1557D6]
                                    py-3.5
                                    font-bold
                                    text-white
                                    shadow-[0_6px_16px_rgba(21,87,214,0.18)]
                                    transition
                                    hover:bg-[#0F46B5]
                                    active:scale-[0.99]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                {loading
                                    ? "Creating account..."
                                    : "Create account"
                                }

                            </button>


                        </form>


                        {/* =================================================
                            LOGIN LINK
                        ================================================= */}

                        <div className="
                            mt-7
                            border-t
                            border-white/10
                            pt-6
                            text-center
                            text-sm
                            text-[#17233D]
                        ">

                            Already have an account?


                            <Link
                                to="/login"
                                className="
                                    ml-2
                                    font-bold
                                    text-[#1557D6]
                                    transition
                                    hover:text-[#0F46B5]
                                "
                            >
                                Sign in
                            </Link>

                        </div>


                    </div>


                    {/* =====================================================
                        FOOTER
                    ===================================================== */}

                    <p className="
                        mt-6
                        text-center
                        text-xs
                        font-medium
                        text-[#475569]
                    ">
                        Your account information is securely protected.
                    </p>


                </div>

            </div>

        </div>
    );
}


export default Register;