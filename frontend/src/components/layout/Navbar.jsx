// import { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";

// import NotificationBell from "../notifications/NotificationBell";

// import { useAuth } from "../../context/AuthContext";


// function Navbar() {

//     const {
//         user,
//         isAuthenticated,
//         logout,
//     } = useAuth();

//     const navigate = useNavigate();

//     const [mobileOpen, setMobileOpen] =
//         useState(false);


//     // =========================================================
//     // NORMALIZE ROLE
//     // =========================================================

//     const role =
//         user?.role?.toUpperCase();


//     // =========================================================
//     // ROLE BASED DASHBOARD
//     // =========================================================

//     const dashboardPath = {

//         DONOR:
//             "/donor/dashboard",

//         FOUNDATION:
//             "/foundation/dashboard",

//         ADMIN:
//             "/admin/dashboard",

//     }[role] || "/home";


//     // =========================================================
//     // LOGOUT
//     // =========================================================

//     const handleLogout = () => {

//         logout();

//         setMobileOpen(false);

//         navigate(
//             "/login",
//             {
//                 replace: true,
//             }
//         );
//     };


//     // =========================================================
//     // NAVIGATION STYLE
//     // =========================================================

//     const navClass = ({ isActive }) =>

//         `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
//             isActive
//                 ? "bg-white/[0.06] text-white"
//                 : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
//         }`;


//     // =========================================================
//     // CLOSE MOBILE MENU
//     // =========================================================

//     const closeMobileMenu = () => {

//         setMobileOpen(false);

//     };


//     return (

//         <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#050505]/90 backdrop-blur-xl">

//             {/* =====================================================
//                 MAIN NAVBAR
//             ===================================================== */}

//             <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">


//                 {/* =================================================
//                     LOGO
//                 ================================================= */}

//                 <Link
//                     to={
//                         isAuthenticated
//                             ? dashboardPath
//                             : "/home"
//                     }
//                     onClick={closeMobileMenu}
//                     className="flex shrink-0 items-center gap-3"
//                 >

//                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black shadow-lg">

//                         <span className="text-lg font-black">
//                             F
//                         </span>

//                     </div>


//                     <div className="hidden sm:block">

//                         <div className="text-lg font-bold tracking-tight text-white">
//                             FoodBridge
//                         </div>

//                         <div className="mt-0.5 text-[9px] font-semibold tracking-[0.18em] text-gray-500">
//                             SHARE · CONNECT · IMPACT
//                         </div>

//                     </div>

//                 </Link>


//                 {/* =================================================
//                     DESKTOP NAVIGATION
//                 ================================================= */}

//                 <nav className="hidden items-center gap-1 lg:flex">

//                     {isAuthenticated ? (

//                         <>

//                             {/* =====================================
//                                 DASHBOARD
//                             ===================================== */}

//                             <NavLink
//                                 to={dashboardPath}
//                                 className={navClass}
//                             >
//                                 Dashboard
//                             </NavLink>


//                             {/* =====================================
//                                 DONOR
//                             ===================================== */}

//                             {role === "DONOR" && (

//                                 <>

//                                     <NavLink
//                                         to="/donor/donations/create"
//                                         className={navClass}
//                                     >
//                                         Donate Food
//                                     </NavLink>


//                                     <NavLink
//                                         to="/donor/donations"
//                                         className={navClass}
//                                     >
//                                         My Donations
//                                     </NavLink>

//                                 </>

//                             )}


//                             {/* =====================================
//                                 FOUNDATION
//                             ===================================== */}

//                             {role === "FOUNDATION" && (

//                                 <>

//                                     <NavLink
//                                         to="/foundation/available-food"
//                                         className={navClass}
//                                     >
//                                         Available Food
//                                     </NavLink>


//                                     <NavLink
//                                         to="/foundation/donations"
//                                         className={navClass}
//                                     >
//                                         My Donations
//                                     </NavLink>


//                                     <NavLink
//                                         to="/foundation/profile"
//                                         className={navClass}
//                                     >
//                                         Foundation Profile
//                                     </NavLink>

//                                 </>

//                             )}


//                             {/* =====================================
//                                 ADMIN
//                             ===================================== */}

//                             {role === "ADMIN" && (

//                                 <>

//                                     <NavLink
//                                         to="/admin/users"
//                                         className={navClass}
//                                     >
//                                         Users
//                                     </NavLink>


//                                     <NavLink
//                                         to="/admin/foundations"
//                                         className={navClass}
//                                     >
//                                         Foundations
//                                     </NavLink>


//                                     <NavLink
//                                         to="/admin/donations"
//                                         className={navClass}
//                                     >
//                                         Donations
//                                     </NavLink>


//                                     <NavLink
//                                         to="/admin/reports"
//                                         className={navClass}
//                                     >
//                                         Reports
//                                     </NavLink>

//                                 </>

//                             )}


//                             {/* =====================================
//                                 NOTIFICATIONS
//                             ===================================== */}

//                             <NavLink
//                                 to="/donor/notifications"
//                                 className={navClass}
//                             >
//                                 Notifications
//                             </NavLink>

//                         </>

//                     ) : (

//                         <>

//                             <a
//                                 href="#how-it-works"
//                                 className="rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
//                             >
//                                 How It Works
//                             </a>


//                             <a
//                                 href="#impact"
//                                 className="rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
//                             >
//                                 Our Impact
//                             </a>


//                             <a
//                                 href="#about"
//                                 className="rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
//                             >
//                                 About
//                             </a>

//                         </>

//                     )}

//                 </nav>


//                 {/* =================================================
//                     DESKTOP RIGHT SIDE
//                 ================================================= */}

//                 <div className="hidden items-center gap-3 lg:flex">

//                     {isAuthenticated ? (

//                         <>

//                             {/* =====================================
//                                 NOTIFICATIONS
//                             ===================================== */}

//                             <Link
//                                 to="/donor/notifications"
//                                 className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
//                                 title="Notifications"
//                             >

//                                 <svg
//                                     width="18"
//                                     height="18"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="1.8"
//                                 >

//                                     <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

//                                     <path d="M13.73 21a2 2 0 0 1-3.46 0" />

//                                 </svg>

//                             </Link>


//                             {/* =====================================
//                                 USER
//                             ===================================== */}

//                             <div className="flex items-center gap-3 border-l border-white/10 pl-4">

//                                 <div className="hidden text-right xl:block">

//                                     <p className="text-sm font-semibold text-white">
//                                         {user?.name || "User"}
//                                     </p>

//                                     <p className="text-[10px] font-medium tracking-wider text-gray-500">
//                                         {role || "USER"}
//                                     </p>

//                                 </div>


//                                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 font-bold text-black">

//                                     {user?.name
//                                         ?.charAt(0)
//                                         ?.toUpperCase() || "U"}

//                                 </div>

//                             </div>


//                             {/* =====================================
//                                 LOGOUT
//                             ===================================== */}

//                             <button
//                                 type="button"
//                                 onClick={handleLogout}
//                                 className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400"
//                             >
//                                 Logout
//                             </button>

//                         </>

//                     ) : (

//                         <>

//                             <Link
//                                 to="/login"
//                                 className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:text-white"
//                             >
//                                 Sign in
//                             </Link>


//                             <Link
//                                 to="/register"
//                                 className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
//                             >
//                                 Get started
//                             </Link>

//                         </>

//                     )}

//                 </div>


//                 {/* =================================================
//                     MOBILE MENU BUTTON
//                 ================================================= */}

//                 <button
//                     type="button"
//                     onClick={() =>
//                         setMobileOpen(
//                             !mobileOpen
//                         )
//                     }
//                     className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 transition hover:bg-white/[0.06] lg:hidden"
//                     aria-label="Toggle navigation"
//                 >

//                     {mobileOpen ? (

//                         <svg
//                             width="21"
//                             height="21"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                         >

//                             <path d="M6 6l12 12" />

//                             <path d="M18 6L6 18" />

//                         </svg>

//                     ) : (

//                         <svg
//                             width="21"
//                             height="21"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                         >

//                             <path d="M4 6h16" />

//                             <path d="M4 12h16" />

//                             <path d="M4 18h16" />

//                         </svg>

//                     )}

//                 </button>

//             </div>


//             {/* =====================================================
//                 MOBILE MENU
//             ===================================================== */}

//             {mobileOpen && (

//                 <div className="border-t border-white/[0.08] bg-[#070707] px-5 py-5 lg:hidden">

//                     <div className="mx-auto flex max-w-7xl flex-col gap-1">

//                         {isAuthenticated ? (

//                             <>

//                                 {/* =================================
//                                     DASHBOARD
//                                 ================================= */}

//                                 <NavLink
//                                     to={dashboardPath}
//                                     className={navClass}
//                                     onClick={closeMobileMenu}
//                                 >
//                                     Dashboard
//                                 </NavLink>


//                                 {/* =================================
//                                     DONOR
//                                 ================================= */}

//                                 {role === "DONOR" && (

//                                     <>

//                                         <NavLink
//                                             to="/donor/donations/create"
//                                             className={navClass}
//                                             onClick={closeMobileMenu}
//                                         >
//                                             Donate Food
//                                         </NavLink>


//                                         <NavLink
//                                             to="/donor/donations"
//                                             className={navClass}
//                                             onClick={closeMobileMenu}
//                                         >
//                                             My Donations
//                                         </NavLink>

//                                     </>

//                                 )}


//                                 {/* =================================
//                                     FOUNDATION
//                                 ================================= */}

//                                 {role === "FOUNDATION" && (

//                                     <>

//                                         <NavLink
//                                             to="/foundation/available-food"
//                                             className={navClass}
//                                             onClick={closeMobileMenu}
//                                         >
//                                             Available Food
//                                         </NavLink>


//                                         <NavLink
//                                             to="/foundation/donations"
//                                             className={navClass}
//                                             onClick={closeMobileMenu}
//                                         >
//                                             My Donations
//                                         </NavLink>


//                                         <NavLink
//                                             to="/foundation/profile"
//                                             className={navClass}
//                                             onClick={closeMobileMenu}
//                                         >
//                                             Foundation Profile
//                                         </NavLink>

//                                     </>

//                                 )}


//                                 {/* =================================
//                                     ADMIN
//                                 ================================= */}

//                                 {role === "ADMIN" && (

//                                     <>

//                                         <NavLink
//                                             to="/admin/users"
//                                             className={navClass}
//                                             onClick={closeMobileMenu}
//                                         >
//                                             Users
//                                         </NavLink>


//                                         <NavLink
//                                             to="/admin/foundations"
//                                             className={navClass}
//                                             onClick={closeMobileMenu}
//                                         >
//                                             Foundations
//                                         </NavLink>


//                                         <NavLink
//                                             to="/admin/donations"
//                                             className={navClass}
//                                             onClick={closeMobileMenu}
//                                         >
//                                             Donations
//                                         </NavLink>


//                                         <NavLink
//                                             to="/admin/reports"
//                                             className={navClass}
//                                             onClick={closeMobileMenu}
//                                         >
//                                             Reports
//                                         </NavLink>

//                                     </>

//                                 )}


//                                 {/* =================================
//                                     NOTIFICATIONS
//                                 ================================= */}

//                                 <NavLink
//                                     to="/donor/notifications"
//                                     className={navClass}
//                                     onClick={closeMobileMenu}
//                                 >
//                                     Notifications
//                                 </NavLink>


//                                 <div className="my-3 border-t border-white/10" />


//                                 {/* =================================
//                                     LOGOUT
//                                 ================================= */}

//                                 <button
//                                     type="button"
//                                     onClick={handleLogout}
//                                     className="rounded-xl px-3 py-3 text-left text-sm font-medium text-red-400 transition hover:bg-red-400/10"
//                                 >
//                                     Logout
//                                 </button>

//                             </>

//                         ) : (

//                             <>

//                                 <a
//                                     href="#how-it-works"
//                                     className="rounded-lg px-3 py-3 text-sm text-gray-400 hover:bg-white/[0.04] hover:text-white"
//                                     onClick={closeMobileMenu}
//                                 >
//                                     How It Works
//                                 </a>


//                                 <a
//                                     href="#impact"
//                                     className="rounded-lg px-3 py-3 text-sm text-gray-400 hover:bg-white/[0.04] hover:text-white"
//                                     onClick={closeMobileMenu}
//                                 >
//                                     Our Impact
//                                 </a>


//                                 <a
//                                     href="#about"
//                                     className="rounded-lg px-3 py-3 text-sm text-gray-400 hover:bg-white/[0.04] hover:text-white"
//                                     onClick={closeMobileMenu}
//                                 >
//                                     About
//                                 </a>


//                                 <div className="my-3 border-t border-white/10" />


//                                 <Link
//                                     to="/login"
//                                     className="rounded-xl px-3 py-3 text-sm text-gray-300"
//                                     onClick={closeMobileMenu}
//                                 >
//                                     Sign in
//                                 </Link>


//                                 <Link
//                                     to="/register"
//                                     className="mt-1 rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black"
//                                     onClick={closeMobileMenu}
//                                 >
//                                     Get started
//                                 </Link>

//                             </>

//                         )}

//                     </div>

//                 </div>

//             )}

//         </header>

//     );
// }


// export default Navbar;

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

    const [mobileOpen, setMobileOpen] =
        useState(false);


    // =========================================================
    // NORMALIZE ROLE
    // =========================================================

    const role =
        user?.role?.toUpperCase();


    // =========================================================
    // ROLE BASED DASHBOARD
    // =========================================================

    const dashboardPath = {

        DONOR:
            "/donor/dashboard",

        FOUNDATION:
            "/foundation/dashboard",

        ADMIN:
            "/admin/dashboard",

    }[role] || "/home";


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        logout();

        setMobileOpen(false);

        navigate(
            "/login",
            {
                replace: true,
            }
        );
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
                bg-[#050505]/90
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
                    h-20
                    w-full
                    max-w-7xl
                    items-center
                    justify-between
                    px-5
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
                        shrink-0
                        items-center
                        gap-3
                    "
                >

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-white
                            text-black
                            shadow-lg
                        "
                    >

                        <span className="text-lg font-black">
                            F
                        </span>

                    </div>

            
                    <div className="hidden sm:block">

                        <div
                            className="
                                text-lg
                                font-bold
                                tracking-tight
                                text-white
                            "
                        >
                            FoodBridge
                        </div>

                        <div
                            className="
                                mt-0.5
                                text-[9px]
                                font-semibold
                                tracking-[0.18em]
                                text-gray-500
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

                            {/* =====================================
                                DASHBOARD
                            ===================================== */}

                            <NavLink
                                to={dashboardPath}
                                className={navClass}
                            >
                                Dashboard
                            </NavLink>


                            {/* =====================================
                                DONOR
                            ===================================== */}

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


                            {/* =====================================
                                FOUNDATION
                            ===================================== */}

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


                            {/* =====================================
                                ADMIN
                            ===================================== */}

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


                            {/* =====================================
                                NOTIFICATIONS
                            ===================================== */}

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

                            {/* =====================================
                                REAL-TIME NOTIFICATION BELL
                            ===================================== */}

                            <NotificationBell />


                            {/* =====================================
                                USER
                            ===================================== */}

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


                            {/* =====================================
                                LOGOUT
                            ===================================== */}

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
                    MOBILE MENU BUTTON
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        setMobileOpen(!mobileOpen)
                    }
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        text-gray-300
                        transition
                        hover:bg-white/[0.06]
                        lg:hidden
                    "
                    aria-label="Toggle navigation"
                >

                    {mobileOpen ? (

                        <svg
                            width="21"
                            height="21"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
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
                        >

                            <path d="M4 6h16" />

                            <path d="M4 12h16" />

                            <path d="M4 18h16" />

                        </svg>

                    )}

                </button>

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
                        px-5
                        py-5
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

                                {/* =================================
                                    DASHBOARD
                                ================================= */}

                                <NavLink
                                    to={dashboardPath}
                                    className={navClass}
                                    onClick={closeMobileMenu}
                                >
                                    Dashboard
                                </NavLink>


                                {/* =================================
                                    DONOR
                                ================================= */}

                                {role === "DONOR" && (

                                    <>

                                        <NavLink
                                            to="/donor/donations/create"
                                            className={navClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Donate Food
                                        </NavLink>


                                        <NavLink
                                            to="/donor/donations"
                                            className={navClass}
                                            onClick={closeMobileMenu}
                                        >
                                            My Donations
                                        </NavLink>

                                    </>

                                )}


                                {/* =================================
                                    FOUNDATION
                                ================================= */}

                                {role === "FOUNDATION" && (

                                    <>

                                        <NavLink
                                            to="/foundation/available-food"
                                            className={navClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Available Food
                                        </NavLink>


                                        <NavLink
                                            to="/foundation/donations"
                                            className={navClass}
                                            onClick={closeMobileMenu}
                                        >
                                            My Donations
                                        </NavLink>


                                        <NavLink
                                            to="/foundation/profile"
                                            className={navClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Foundation Profile
                                        </NavLink>

                                    </>

                                )}


                                {/* =================================
                                    ADMIN
                                ================================= */}

                                {role === "ADMIN" && (

                                    <>

                                        <NavLink
                                            to="/admin/users"
                                            className={navClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Users
                                        </NavLink>


                                        <NavLink
                                            to="/admin/foundations"
                                            className={navClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Foundations
                                        </NavLink>


                                        <NavLink
                                            to="/admin/donations"
                                            className={navClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Donations
                                        </NavLink>


                                        <NavLink
                                            to="/admin/reports"
                                            className={navClass}
                                            onClick={closeMobileMenu}
                                        >
                                            Reports
                                        </NavLink>

                                    </>

                                )}


                                {/* =================================
                                    NOTIFICATIONS
                                ================================= */}

                                <NavLink
                                    to="/notifications"
                                    className={navClass}
                                    onClick={closeMobileMenu}
                                >
                                    Notifications
                                </NavLink>


                                <div
                                    className="
                                        my-3
                                        border-t
                                        border-white/10
                                    "
                                />


                                {/* =================================
                                    LOGOUT
                                ================================= */}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="
                                        rounded-xl
                                        px-3
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

                                <Link
                                    to="/how-it-works"
                                    className="
                                        rounded-lg
                                        px-3
                                        py-3
                                        text-sm
                                        text-gray-400
                                        hover:bg-white/[0.04]
                                        hover:text-white
                                    "
                                    onClick={closeMobileMenu}
                                >
                                    How It Works
                                </Link>


                                <Link
                                    to="/impact"
                                    className="
                                        rounded-lg
                                        px-3
                                        py-3
                                        text-sm
                                        text-gray-400
                                        hover:bg-white/[0.04]
                                        hover:text-white
                                    "
                                    onClick={closeMobileMenu}
                                >
                                    Our Impact
                                </Link>


                                <a
                                    href="#about"
                                    className="
                                        rounded-lg
                                        px-3
                                        py-3
                                        text-sm
                                        text-gray-400
                                        hover:bg-white/[0.04]
                                        hover:text-white
                                    "
                                    onClick={closeMobileMenu}
                                >
                                    About
                                </a>


                                <div
                                    className="
                                        my-3
                                        border-t
                                        border-white/10
                                    "
                                />


                                <Link
                                    to="/login"
                                    className="
                                        rounded-xl
                                        px-3
                                        py-3
                                        text-sm
                                        text-gray-300
                                    "
                                    onClick={closeMobileMenu}
                                >
                                    Sign in
                                </Link>


                                <Link
                                    to="/register"
                                    className="
                                        mt-1
                                        rounded-xl
                                        bg-white
                                        px-4
                                        py-3
                                        text-center
                                        text-sm
                                        font-semibold
                                        text-black
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