import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear field error while typing

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
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
      const loggedInUser = await login(formData.email, formData.password);

      // -------------------------------------------------
      // ROLE BASED REDIRECTION
      // -------------------------------------------------

      const role = loggedInUser?.role?.toUpperCase();

      switch (role) {
        case "DONOR":
          navigate("/donor/dashboard", {
            replace: true,
          });

          break;

        case "FOUNDATION":
          navigate("/foundation/dashboard", {
            replace: true,
          });

          break;

        case "ADMIN":
          navigate("/admin/dashboard", {
            replace: true,
          });

          break;

        default:
          navigate("/home", {
            replace: true,
          });
      }
    } catch (error) {
      /*
       * AuthContext already displays the
       * professional error toast.
       *
       * We intentionally don't show another
       * toast here to avoid duplicate messages.
       */

      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      className="
            min-h-screen
            bg-[#F8FAFD]
            px-5
            py-12
            text-[#111827]
        "
    >
      <div
        className="
                mx-auto
                flex
                min-h-[calc(100vh-6rem)]
                max-w-md
                items-center
                justify-center
            "
      >
        <div
          className="
                    w-full
                    rounded-3xl
                    border
                    border-[#D9E1ED]
                    bg-white
                    p-6
                    shadow-[0_12px_35px_rgba(23,35,61,0.08)]
                    backdrop-blur-xl
                    sm:p-8
                "
        >
          {/* =================================================
                        HEADER
                    ================================================= */}

          <div
            className="
                        mb-8
                        text-center
                    "
          >
            <div
              className="
                            mx-auto
                            mb-5
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[#1557D6]
                            text-white
                            shadow-[0_6px_18px_rgba(21,87,214,0.20)]
                        "
            >
              <span
                className="
                                text-xl
                                font-black
                            "
              >
                F
              </span>
            </div>

            <h1
              className="
                            text-2xl
                            font-bold
                            tracking-tight
                        "
            >
              Welcome back
            </h1>

            <p
              className="
                            mt-2
                            text-sm
                            text-[#17233D]
                        "
            >
              Sign in to continue to FoodBridge
            </p>
          </div>

          {/* =================================================
                        FORM
                    ================================================= */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}

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
                autoComplete="email"
                placeholder="you@gmail.com"
                disabled={loading}
                className={`
                                    w-full
                                    rounded-xl
                                    border
                                    border-[#D9E1ED]
                                    bg-white
                                    px-4
                                    py-3
                                    text-sm
                                    text-[#111827]
                                    outline-none
                                    transition
                                    placeholder:text-[#64748B]
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-[#1557D6]/10
                                    ${
                                      errors.email
                                        ? "border-red-300 focus:border-red-500"
                                        : "border-[#D9E1ED] focus:border-[#1557D6]"
                                    }
                                `}
              />

              {errors.email && (
                <p
                  className="
                                    mt-2
                                    text-xs
                                    text-red-600
                                "
                >
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
                                    font-bold
                                    text-[#111827]
                                "
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
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
                                        text-black
                                        outline-none
                                        transition
                                        placeholder:text-gray-600
                                        focus:bg-white/[0.05]
                                        ${
                                          errors.password
                                            ? "border-red-300 focus:border-red-500"
                                            : "border-[#D9E1ED] focus:border-[#1557D6]"
                                        }
                                    `}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  disabled={loading}
                  className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        rounded-lg
                                        p-2
                                        text-[#475569]
                                        transition
                                        hover:bg-[#F2F6FF]
                                        hover:text-[#1557D6]
                                    "
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p
                  className="
                                    mt-2
                                    text-xs
                                    text-red-600
                                "
                >
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
                                bg-[#1557D6]
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-white
                                shadow-[0_6px_16px_rgba(21,87,214,0.18)]
                                transition
                                hover:bg-[#0F46B5]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign in
                </>
              )}
            </button>
          </form>

          {/* =================================================
    REGISTER
================================================= */}

          <div
            className="
        mt-7
        flex
        items-center
        justify-center
        gap-1
        whitespace-nowrap
        text-center
        text-sm
        text-[#17233D]
    "
          >
            <span>Don't have an account?</span>

            <Link
              to="/register"
              className="
            shrink-0
            font-bold
            text-[#1557D6]
            transition
            hover:text-[#0F46B5]
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
