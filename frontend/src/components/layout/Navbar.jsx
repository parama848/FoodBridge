
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
    Bell,
    ChevronDown,
    Grid2X2,
    Menu,
    X,
    LogOut,
    User,
} from "lucide-react";

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
    // CLOSE MOBILE MENU
    // =========================================================

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };


    // =========================================================
    // DESKTOP NAVIGATION STYLE
    // =========================================================

    const navClass = ({ isActive }) => {

        return `
            group
            relative
            inline-flex
            items-center
            gap-2
            rounded-lg
            px-3
            py-2.5
            text-sm
            font-semibold
            transition-all
            duration-200

            ${
                isActive
                    ? `
                        bg-[#EEF4FF]
                        text-[#1557D6]
                    `
                    : `
                        text-[#53627A]
                        hover:bg-[#F5F7FA]
                        hover:text-[#1557D6]
                    `
            }
        `;
    };


    // =========================================================
    // MOBILE NAVIGATION STYLE
    // =========================================================

    const mobileNavClass = ({ isActive }) => {

        return `
            flex
            w-full
            items-center
            rounded-xl
            px-4
            py-3.5
            text-sm
            font-semibold
            transition-all
            duration-200

            ${
                isActive
                    ? `
                        bg-[#EEF4FF]
                        text-[#1557D6]
                    `
                    : `
                        text-[#42516A]
                        hover:bg-[#F6F8FB]
                        hover:text-[#1557D6]
                    `
            }
        `;
    };


    // =========================================================
    // USER INITIAL
    // =========================================================

    const userInitial =
        user?.name
            ?.charAt(0)
            ?.toUpperCase() || "U";


    return (

        <header
            className="
                sticky
                top-0
                z-50
                w-full
                border-b
                border-[#E6EAF0]
                bg-white
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
                    max-w-[1440px]
                    items-center
                    justify-between
                    px-4
                    sm:h-[76px]
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
                        gap-2.5
                    "
                >

                    {/* Logo Box */}

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#1557D6]
                            text-white
                            shadow-[0_4px_12px_rgba(21,87,214,0.20)]
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
                                whitespace-nowrap
                                text-base
                                font-extrabold
                                tracking-tight
                                text-[#17233D]
                                sm:text-lg
                            "
                        >
                            <span className="text-[#17233D]">
                                Food
                            </span>
                            <span className="text-[#1557D6]">
                                Bridge
                            </span>
                        </div>


                        <div
                            className="
                                hidden
                                text-[8px]
                                font-bold
                                tracking-[0.18em]
                                text-[#8A96A8]
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


                            {/* =================================================
                                DONOR
                            ================================================= */}

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


                            {/* =================================================
                                FOUNDATION
                            ================================================= */}

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


                            {/* =================================================
                                ADMIN
                            ================================================= */}

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

                                <Bell
                                    size={15}
                                    strokeWidth={2}
                                />

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
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-[#53627A]
                                    transition
                                    hover:bg-[#F5F7FA]
                                    hover:text-[#1557D6]
                                "
                            >
                                How It Works
                            </Link>


                            <Link
                                to="/impact"
                                className="
                                    rounded-lg
                                    px-3
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-[#53627A]
                                    transition
                                    hover:bg-[#F5F7FA]
                                    hover:text-[#1557D6]
                                "
                            >
                                Our Impact
                            </Link>


                            <Link
                                to="/about-us"
                                className="
                                    rounded-lg
                                    px-3
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-[#53627A]
                                    transition
                                    hover:bg-[#F5F7FA]
                                    hover:text-[#1557D6]
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

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-[#E2E7EF]
                                    bg-white
                                    text-[#42516A]
                                    transition
                                    hover:border-[#B9C9E8]
                                    hover:bg-[#1557D6]
                                    hover:text-[#1557D6]
                                "
                            >

                                <NotificationBell />

                            </div>


                            {/* Vertical Divider */}

                            <div
                                className="
                                    h-8
                                    w-px
                                    bg-[#E6EAF0]
                                "
                            />


                            {/* User */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2.5
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
                                            font-bold
                                            leading-4
                                            text-[#17233D]
                                        "
                                    >
                                        {user?.name || "User"}
                                    </p>


                                    <p
                                        className="
                                            mt-1
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.14em]
                                            text-[#1557D6]
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
                                        rounded-full
                                        bg-[#1557D6]
                                        text-sm
                                        font-bold
                                        text-white
                                        shadow-[0_3px_10px_rgba(21,87,214,0.18)]
                                    "
                                >
                                    {userInitial}
                                </div>

                            </div>


                            {/* Logout */}

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-[#DCE2EA]
                                    bg-white
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-[#33415C]
                                    transition
                                    hover:border-[#B8C4D6]
                                    hover:bg-[#F7F9FC]
                                    hover:text-[#17233D]
                                "
                            >

                                <LogOut
                                    size={15}
                                />

                                Logout

                            </button>

                        </>

                    ) : (

                        <>

                            {/* Sign In */}

                            <Link
                                to="/login"
                                className="
                                    rounded-xl
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-[#42516A]
                                    transition
                                    hover:bg-[#F5F7FA]
                                    hover:text-[#1557D6]
                                "
                            >
                                Sign in
                            </Link>


                            {/* Get Started */}

                            <Link
                                to="/register"
                                className="
                                    rounded-xl
                                    bg-[#1557D6]
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-[0_4px_12px_rgba(21,87,214,0.18)]
                                    transition
                                    hover:bg-[#0F46B5]
                                    hover:shadow-[0_6px_16px_rgba(21,87,214,0.22)]
                                "
                            >
                                Get started
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

                    {isAuthenticated ? (

                        <>

                            {/* Mobile Notification */}

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-[#E1E6EE]
                                    bg-white
                                    text-[#33415C]
                                    shadow-sm
                                "
                            >

                                <NotificationBell />

                            </div>


                            {/* Mobile Menu */}

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileOpen(
                                        !mobileOpen
                                    )
                                }
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-[#DCE2EA]
                                    bg-white
                                    text-[#33415C]
                                    transition
                                    hover:bg-[#F5F8FF]
                                    hover:text-[#1557D6]
                                "
                                aria-label="Toggle navigation"
                                aria-expanded={mobileOpen}
                            >

                                {mobileOpen ? (

                                    <X
                                        size={21}
                                        strokeWidth={2}
                                    />

                                ) : (

                                    <Menu
                                        size={21}
                                        strokeWidth={2}
                                    />

                                )}

                            </button>

                        </>

                    ) : (

                        <>

                            {/* Mobile Sign In */}

                            <Link
                                to="/login"
                                onClick={closeMobileMenu}
                                className="
                                    rounded-xl
                                    border
                                    border-[#DCE2EA]
                                    bg-white
                                    px-3.5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-[#33415C]
                                    transition
                                    hover:border-[#B8C8E6]
                                    hover:bg-[#F5F8FF]
                                    hover:text-[#1557D6]
                                    sm:px-4
                                "
                            >
                                Sign in
                            </Link>


                            {/* Mobile Menu */}

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileOpen(
                                        !mobileOpen
                                    )
                                }
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-[#DCE2EA]
                                    bg-white
                                    text-[#33415C]
                                    transition
                                    hover:bg-[#F5F8FF]
                                    hover:text-[#1557D6]
                                "
                                aria-label="Toggle navigation"
                                aria-expanded={mobileOpen}
                            >

                                {mobileOpen ? (

                                    <X
                                        size={21}
                                    />

                                ) : (

                                    <Menu
                                        size={21}
                                    />

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
                        border-[#E6EAF0]
                        bg-white
                        px-4
                        py-4
                        shadow-[0_8px_24px_rgba(15,35,70,0.06)]
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

                                {/* User Header */}

                                <div
                                    className="
                                        mb-3
                                        flex
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-[#E5EAF1]
                                        bg-[#F7F9FC]
                                        p-3
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#1557D6]
                                            text-sm
                                            font-bold
                                            text-white
                                        "
                                    >
                                        {userInitial}
                                    </div>


                                    <div className="min-w-0">

                                        <p
                                            className="
                                                truncate
                                                text-sm
                                                font-bold
                                                text-[#17233D]
                                            "
                                        >
                                            {user?.name || "User"}
                                        </p>


                                        <p
                                            className="
                                                mt-0.5
                                                text-[10px]
                                                font-bold
                                                uppercase
                                                tracking-[0.14em]
                                                text-[#1557D6]
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
                                    onClick={
                                        closeMobileMenu
                                    }
                                >                            
                                    Dashboard

                                </NavLink>


                                {/* Donor */}

                                {role === "DONOR" && (

                                    <>

                                        <NavLink
                                            to="/donor/donations/create"
                                            className={
                                                mobileNavClass
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
                                        >
                                            Donate Food
                                        </NavLink>


                                        <NavLink
                                            to="/donor/donations"
                                            className={
                                                mobileNavClass
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
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
                                            className={
                                                mobileNavClass
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
                                        >
                                            Available Food
                                        </NavLink>


                                        <NavLink
                                            to="/foundation/donations"
                                            className={
                                                mobileNavClass
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
                                        >
                                            My Donations
                                        </NavLink>


                                        <NavLink
                                            to="/foundation/profile"
                                            className={
                                                mobileNavClass
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
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
                                            className={
                                                mobileNavClass
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
                                        >
                                            Users
                                        </NavLink>


                                        <NavLink
                                            to="/admin/foundations"
                                            className={
                                                mobileNavClass
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
                                        >
                                            Foundations
                                        </NavLink>


                                        <NavLink
                                            to="/admin/donations"
                                            className={
                                                mobileNavClass
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
                                        >
                                            Donations
                                        </NavLink>


                                        <NavLink
                                            to="/admin/reports"
                                            className={
                                                mobileNavClass
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
                                        >
                                            Reports
                                        </NavLink>

                                    </>

                                )}


                                {/* Notifications */}

                                <NavLink
                                    to="/notifications"
                                    className={
                                        mobileNavClass
                                    }
                                    onClick={
                                        closeMobileMenu
                                    }
                                >

                                    <Bell
                                        size={18}
                                    />

                                    Notifications

                                </NavLink>


                                {/* Divider */}

                                <div
                                    className="
                                        my-3
                                        h-px
                                        bg-[#E7EBF1]
                                    "
                                />


                                {/* Profile */}

                                <NavLink
                                    to={
                                        role === "FOUNDATION"
                                            ? "/foundation/profile"
                                            : "/profile"
                                    }
                                    className={
                                        mobileNavClass
                                    }
                                    onClick={
                                        closeMobileMenu
                                    }
                                >

                                    <User
                                        size={18}
                                    />

                                    Profile

                                </NavLink>


                                {/* Logout */}

                                <button
                                    type="button"
                                    onClick={
                                        handleLogout
                                    }
                                    className="
                                        mt-1
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-4
                                        py-3.5
                                        text-left
                                        text-sm
                                        font-semibold
                                        text-[#D64545]
                                        transition
                                        hover:bg-[#FFF4F4]
                                    "
                                >

                                    <LogOut
                                        size={18}
                                    />

                                    Logout

                                </button>

                            </>

                        ) : (

                            <>

                                {/* Public Links */}

                                <Link
                                    to="/how-it-works"
                                    className={
                                        mobileNavClass({
                                            isActive: false,
                                        })
                                    }
                                    onClick={
                                        closeMobileMenu
                                    }
                                >
                                    How It Works
                                </Link>


                                <Link
                                    to="/impact"
                                    className={
                                        mobileNavClass({
                                            isActive: false,
                                        })
                                    }
                                    onClick={
                                        closeMobileMenu
                                    }
                                >
                                    Our Impact
                                </Link>


                                <Link
                                    to="/about-us"
                                    className={
                                        mobileNavClass({
                                            isActive: false,
                                        })
                                    }
                                    onClick={
                                        closeMobileMenu
                                    }
                                >
                                    About
                                </Link>


                                {/* Divider */}

                                <div
                                    className="
                                        my-3
                                        h-px
                                        bg-[#E7EBF1]
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
                                        border-[#D7DFEA]
                                        bg-white
                                        px-4
                                        py-3.5
                                        text-sm
                                        font-semibold
                                        text-[#33415C]
                                        transition
                                        hover:bg-[#F5F8FF]
                                        hover:text-[#1557D6]
                                    "
                                    onClick={
                                        closeMobileMenu
                                    }
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
                                        bg-[#1557D6]
                                        px-4
                                        py-3.5
                                        text-sm
                                        font-bold
                                        text-white
                                        shadow-[0_4px_12px_rgba(21,87,214,0.16)]
                                        transition
                                        hover:bg-[#0F46B5]
                                    "
                                    onClick={
                                        closeMobileMenu
                                    }
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