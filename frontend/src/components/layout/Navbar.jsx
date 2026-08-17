import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import NotificationBell from "../notifications/NotificationBell";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth();

    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);

    // =========================================================
    // NORMALIZE ROLE
    // =========================================================

    const role = user?.role?.toUpperCase();

    // =========================================================
    // ROLE BASED DASHBOARD
    // =========================================================

    const dashboardPath = {
        DONOR: "/donor/dashboard",
        FOUNDATION: "/foundation/dashboard",
        ADMIN: "/admin/dashboard",
    }[role] || "/home";

    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {
        logout();
        setMobileOpen(false);

        navigate("/login", {
            replace: true,
        });
    };

    // =========================================================
    // NAVIGATION STYLE
    // =========================================================

    const navClass = ({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
            isActive
                ? "bg-white/[0.06] text-white"
                : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
        }`;

    // =========================================================
    // MOBILE NAVIGATION STYLE
    // =========================================================

    const mobileNavClass = ({ isActive }) =>
        `flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            isActive
                ? "bg-white/[0.08] text-white"
                : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
        }`;

    // =========================================================
    // CLOSE MOBILE MENU
    // =========================================================

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    return (
        <header
            className="
                sticky
                top-0
                z-50
                w-full
                border-b
                border-white/[0.08]
                bg-[#050505]/95
                backdrop-blur-xl
            "
        >
            {/* =====================================================
                MAIN NAVBAR
            ===================================================== */}

            <div
                className="
                    mx-auto
                    flex
                    h-[68px]
                    w-full
                    max-w-7xl
                    items-center
                    justify-between
                    px-4
                    sm:h-20
                    sm:px-6
                    lg:px-8
                "
            >

                {/* =================================================
                    LOGO
                ================================================= */}

                <Link
                    to={
                        isAuthenticated
                            ? dashboardPath
                            : "/home"
                    }
                    onClick={closeMobileMenu}
                    className="
                        flex
                        min-w-0
                        shrink-0
                        items-center
                        gap-2.5
                        sm:gap-3
                    "
                >

                    {/* Logo Icon */}

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-white
                            text-black
                            shadow-lg
                            sm:h-11
                            sm:w-11
                        "
                    >
                        <span
                            className="
                                text-base
                                font-black
                                sm:text-lg
                            "
                        >
                            F
                        </span>
                    </div>

                    {/* Brand */}

                    <div className="min-w-0">

                        <div
                            className="
                                truncate
                                text-base
                                font-bold
                                tracking-tight
                                text-white
                                sm:text-lg
                            "
                        >
                            FoodBridge
                        </div>

                        <div
                            className="
                                hidden
                                text-[9px]
                                font-semibold
                                tracking-[0.18em]
                                text-gray-500
                                sm:mt-0.5
                                sm:block
                            "
                        >
                            SHARE · CONNECT · IMPACT
                        </div>

                    </div>

                </Link>


                {/* =================================================
                    DESKTOP NAVIGATION
                ================================================= */}

                <nav
                    className="
                        hidden
                        items-center
                        gap-1
                        lg:flex
                    "
                >

                    {isAuthenticated ? (

                        <>

                            {/* Dashboard */}

                            <NavLink
                                to={dashboardPath}
                                className={navClass}
                            >
                                Dashboard
                            </NavLink>


                            {/* Donor */}

                            {role === "DONOR" && (
                                <>
                                    <NavLink
                                        to="/donor/donations/create"
                                        className={navClass}
                                    >
                                        Donate Food
                                    </NavLink>

                                    <NavLink
                                        to="/donor/donations"
                                        className={navClass}
                                    >
                                        My Donations
                                    </NavLink>
                                </>
                            )}


                            {/* Foundation */}

                            {role === "FOUNDATION" && (
                                <>
                                    <NavLink
                                        to="/foundation/available-food"
                                        className={navClass}
                                    >
                                        Available Food
                                    </NavLink>

                                    <NavLink
                                        to="/foundation/donations"
                                        className={navClass}
                                    >
                                        My Donations
                                    </NavLink>

                                    <NavLink
                                        to="/foundation/profile"
                                        className={navClass}
                                    >
                                        Foundation Profile
                                    </NavLink>
                                </>
                            )}


                            {/* Admin */}

                            {role === "ADMIN" && (
                                <>
                                    <NavLink
                                        to="/admin/users"
                                        className={navClass}
                                    >
                                        Users
                                    </NavLink>

                                    <NavLink
                                        to="/admin/foundations"
                                        className={navClass}
                                    >
                                        Foundations
                                    </NavLink>

                                    <NavLink
                                        to="/admin/donations"
                                        className={navClass}
                                    >
                                        Donations
                                    </NavLink>

                                    <NavLink
                                        to="/admin/reports"
                                        className={navClass}
                                    >
                                        Reports
                                    </NavLink>
                                </>
                            )}


                            {/* Notifications */}

                            <NavLink
                                to="/notifications"
                                className={navClass}
                            >
                                Notifications
                            </NavLink>

                        </>

                    ) : (

                        <>

                            <Link
                                to="/how-it-works"
                                className="
                                    rounded-lg
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-gray-400
                                    transition
                                    hover:bg-white/[0.04]
                                    hover:text-white
                                "
                            >
                                How It Works
                            </Link>

                            <Link
                                to="/impact"
                                className="
                                    rounded-lg
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-gray-400
                                    transition
                                    hover:bg-white/[0.04]
                                    hover:text-white
                                "
                            >
                                Our Impact
                            </Link>

                            <Link
                                to="/about-us"
                                className="
                                    rounded-lg
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-gray-400
                                    transition
                                    hover:bg-white/[0.04]
                                    hover:text-white
                                "
                            >
                                About
                            </Link>

                        </>

                    )}

                </nav>


                {/* =================================================
                    DESKTOP RIGHT SIDE
                ================================================= */}

                <div
                    className="
                        hidden
                        items-center
                        gap-3
                        lg:flex
                    "
                >

                    {isAuthenticated ? (

                        <>

                            {/* Notification */}

                            <NotificationBell />


                            {/* User */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    border-l
                                    border-white/10
                                    pl-4
                                "
                            >

                                {/* User Details */}

                                <div
                                    className="
                                        hidden
                                        text-right
                                        xl:block
                                    "
                                >

                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        {user?.name || "User"}
                                    </p>

                                    <p
                                        className="
                                            text-[10px]
                                            font-medium
                                            tracking-wider
                                            text-gray-500
                                        "
                                    >
                                        {role || "USER"}
                                    </p>

                                </div>


                                {/* Avatar */}

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-emerald-400
                                        font-bold
                                        text-black
                                    "
                                >
                                    {user?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>

                            </div>


                            {/* Logout */}

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="
                                    rounded-xl
                                    border
                                    border-white/10
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-gray-300
                                    transition
                                    hover:border-red-400/30
                                    hover:bg-red-400/10
                                    hover:text-red-400
                                "
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link
                                to="/login"
                                className="
                                    rounded-xl
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-gray-400
                                    transition
                                    hover:text-white
                                "
                            >
                                Sign in
                            </Link>

                            <Link
                                to="/register"
                                className="
                                    rounded-xl
                                    bg-white
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-black
                                    transition
                                    hover:bg-gray-200
                                "
                            >
                                Sign Up
                            </Link>

                        </>

                    )}

                </div>


                {/* =================================================
                    MOBILE RIGHT SIDE
                ================================================= */}

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        lg:hidden
                    "
                >

                    {/* =============================================
                        AUTHENTICATED MOBILE
                    ============================================= */}

                    {isAuthenticated ? (

                        <>
                            {/* Notification Bell */}

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                "
                            >
                                <NotificationBell />
                            </div>


                            {/* Menu Button */}

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileOpen(!mobileOpen)
                                }
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    text-gray-300
                                    transition
                                    hover:bg-white/[0.06]
                                "
                                aria-label="Toggle navigation"
                                aria-expanded={mobileOpen}
                            >

                                {mobileOpen ? (

                                    <svg
                                        width="21"
                                        height="21"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <path d="M6 6l12 12" />
                                        <path d="M18 6L6 18" />
                                    </svg>

                                ) : (

                                    <svg
                                        width="21"
                                        height="21"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <path d="M4 6h16" />
                                        <path d="M4 12h16" />
                                        <path d="M4 18h16" />
                                    </svg>

                                )}

                            </button>
                        </>

                    ) : (

                        <>
                            {/* Sign In */}

                            <Link
                                to="/login"
                                onClick={closeMobileMenu}
                                className="
                                    rounded-xl
                                    border
                                    border-white/10
                                    px-3.5
                                    py-2
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-white/[0.06]
                                    sm:px-4
                                "
                            >
                                Sign in
                            </Link>


                            {/* Menu */}

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileOpen(!mobileOpen)
                                }
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    text-gray-300
                                    transition
                                    hover:bg-white/[0.06]
                                "
                                aria-label="Toggle navigation"
                                aria-expanded={mobileOpen}
                            >

                                {mobileOpen ? (

                                    <svg
                                        width="21"
                                        height="21"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <path d="M6 6l12 12" />
                                        <path d="M18 6L6 18" />
                                    </svg>

                                ) : (

                                    <svg
                                        width="21"
                                        height="21"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <path d="M4 6h16" />
                                        <path d="M4 12h16" />
                                        <path d="M4 18h16" />
                                    </svg>

                                )}

                            </button>
                        </>

                    )}

                </div>

            </div>


            {/* =====================================================
                MOBILE MENU
            ===================================================== */}

            {mobileOpen && (

                <div
                    className="
                        border-t
                        border-white/[0.08]
                        bg-[#070707]
                        px-4
                        py-4
                        lg:hidden
                    "
                >

                    <div
                        className="
                            mx-auto
                            flex
                            max-w-7xl
                            flex-col
                            gap-1
                        "
                    >

                        {isAuthenticated ? (

                            <>

                                {/* =============================
                                    USER INFO
                                ============================= */}

                                <div
                                    className="
                                        mb-3
                                        flex
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.02]
                                        p-3
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-emerald-400
                                            font-bold
                                            text-black
                                        "
                                    >
                                        {user?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "U"}
                                    </div>

                                    <div className="min-w-0">

                                        <p
                                            className="
                                                truncate
                                                text-sm
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            {user?.name || "User"}
                                        </p>

                                        <p
                                            className="
                                                mt-0.5
                                                text-[10px]
                                                font-medium
                                                tracking-wider
                                                text-gray-500
                                            "
                                        >
                                            {role || "USER"}
                                        </p>

                                    </div>

                                </div>


                                {/* Dashboard */}

                                <NavLink
                                    to={dashboardPath}
                                    className={mobileNavClass}
                                    onClick={closeMobileMenu}
                                >
                                    Dashboard
                                </NavLink>


                                {/* Donor */}

                                {role === "DONOR" && (
                                    <>
                                        <NavLink
                                            to="/donor/donations/create"
                                            className={mobileNavClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Donate Food
                                        </NavLink>

                                        <NavLink
                                            to="/donor/donations"
                                            className={mobileNavClass}
                                            onClick={closeMobileMenu}
                                        >
                                            My Donations
                                        </NavLink>
                                    </>
                                )}


                                {/* Foundation */}

                                {role === "FOUNDATION" && (
                                    <>
                                        <NavLink
                                            to="/foundation/available-food"
                                            className={mobileNavClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Available Food
                                        </NavLink>

                                        <NavLink
                                            to="/foundation/donations"
                                            className={mobileNavClass}
                                            onClick={closeMobileMenu}
                                        >
                                            My Donations
                                        </NavLink>

                                        <NavLink
                                            to="/foundation/profile"
                                            className={mobileNavClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Foundation Profile
                                        </NavLink>
                                    </>
                                )}


                                {/* Admin */}

                                {role === "ADMIN" && (
                                    <>
                                        <NavLink
                                            to="/admin/users"
                                            className={mobileNavClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Users
                                        </NavLink>

                                        <NavLink
                                            to="/admin/foundations"
                                            className={mobileNavClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Foundations
                                        </NavLink>

                                        <NavLink
                                            to="/admin/donations"
                                            className={mobileNavClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Donations
                                        </NavLink>

                                        <NavLink
                                            to="/admin/reports"
                                            className={mobileNavClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Reports
                                        </NavLink>
                                    </>
                                )}


                                {/* Notifications */}

                                <NavLink
                                    to="/notifications"
                                    className={mobileNavClass}
                                    onClick={closeMobileMenu}
                                >
                                    Notifications
                                </NavLink>


                                {/* Divider */}

                                <div
                                    className="
                                        my-3
                                        border-t
                                        border-white/10
                                    "
                                />


                                {/* Logout */}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="
                                        w-full
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-left
                                        text-sm
                                        font-medium
                                        text-red-400
                                        transition
                                        hover:bg-red-400/10
                                    "
                                >
                                    Logout
                                </button>

                            </>

                        ) : (

                            <>

                                {/* How It Works */}

                                <Link
                                    to="/how-it-works"
                                    className={`
                                        ${mobileNavClass({
                                            isActive: false,
                                        })}
                                    `}
                                    onClick={closeMobileMenu}
                                >
                                    How It Works
                                </Link>


                                {/* Our Impact */}

                                <Link
                                    to="/impact"
                                    className={`
                                        ${mobileNavClass({
                                            isActive: false,
                                        })}
                                    `}
                                    onClick={closeMobileMenu}
                                >
                                    Our Impact
                                </Link>


                                {/* About */}

                                <Link
                                    to="/about-us"
                                    className={`
                                        ${mobileNavClass({
                                            isActive: false,
                                        })}
                                    `}
                                    onClick={closeMobileMenu}
                                >
                                    About
                                </Link>


                                {/* Divider */}

                                <div
                                    className="
                                        my-3
                                        border-t
                                        border-white/10
                                    "
                                />


                                {/* Sign In */}

                                <Link
                                    to="/login"
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-white/10
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-white/[0.05]
                                    "
                                    onClick={closeMobileMenu}
                                >
                                    Sign in
                                </Link>


                                {/* Get Started */}

                                <Link
                                    to="/register"
                                    className="
                                        mt-2
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-white
                                        px-4
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-black
                                        transition
                                        hover:bg-gray-200
                                    "
                                    onClick={closeMobileMenu}
                                >
                                    Get started
                                </Link>

                            </>

                        )}

                    </div>

                </div>

            )}

        </header>
    );
}

export default Navbar;