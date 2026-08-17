// import { Link } from "react-router-dom";

// function Footer() {

//     return (

//         <footer className="border-t border-white/[0.08] bg-[#030303]">

//             <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">

//                 <div className="grid gap-12 lg:grid-cols-4">


//                     {/* =================================================
//                         BRAND
//                     ================================================= */}

//                     <div className="lg:col-span-2">

//                         <Link
//                             to="/"
//                             className="inline-flex items-center gap-3"
//                         >

//                             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
//                                 <span className="font-black">
//                                     F
//                                 </span>
//                             </div>


//                             <div>

//                                 <div className="text-lg font-bold text-white">
//                                     FoodBridge
//                                 </div>

//                                 <div className="text-[9px] font-semibold tracking-[0.18em] text-gray-500">
//                                     SHARE · CONNECT · IMPACT
//                                 </div>

//                             </div>

//                         </Link>


//                         <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">

//                             Connecting surplus food with verified
//                             foundations and communities that need it.
//                             Together, we can reduce food waste and
//                             create meaningful impact.

//                         </p>


//                         <div className="mt-6 flex flex-wrap gap-2">

//                             <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-gray-500">
//                                 Food redistribution
//                             </span>

//                             <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-gray-500">
//                                 Community impact
//                             </span>

//                         </div>

//                     </div>


//                     {/* =================================================
//                         PLATFORM
//                     ================================================= */}

//                     <div>

//                         <h3 className="text-sm font-semibold text-white">
//                             Platform
//                         </h3>

//                         <div className="mt-5 flex flex-col gap-3">

//                             <Link
//                                 to="/register"
//                                 className="text-sm text-gray-500 transition hover:text-white"
//                             >
//                                 Become a Donor
//                             </Link>

//                             <Link
//                                 to="/register"
//                                 className="text-sm text-gray-500 transition hover:text-white"
//                             >
//                                 Join as Foundation
//                             </Link>

//                             <a
//                                 href="#how-it-works"
//                                 className="text-sm text-gray-500 transition hover:text-white"
//                             >
//                                 How It Works
//                             </a>

//                             <a
//                                 href="#impact"
//                                 className="text-sm text-gray-500 transition hover:text-white"
//                             >
//                                 Our Impact
//                             </a>

//                         </div>

//                     </div>


//                     {/* =================================================
//                         COMPANY
//                     ================================================= */}

//                     <div>

//                         <h3 className="text-sm font-semibold text-white">
//                             Company
//                         </h3>

//                         <div className="mt-5 flex flex-col gap-3">

//                             <a
//                                 href="#about"
//                                 className="text-sm text-gray-500 transition hover:text-white"
//                             >
//                                 About FoodBridge
//                             </a>

//                             <a
//                                 href="#contact"
//                                 className="text-sm text-gray-500 transition hover:text-white"
//                             >
//                                 Contact
//                             </a>

//                             <a
//                                 href="#privacy"
//                                 className="text-sm text-gray-500 transition hover:text-white"
//                             >
//                                 Privacy Policy
//                             </a>

//                             <a
//                                 href="#terms"
//                                 className="text-sm text-gray-500 transition hover:text-white"
//                             >
//                                 Terms of Service
//                             </a>

//                         </div>

//                     </div>

//                 </div>

//             </div>


//             {/* =========================================================
//                 BOTTOM
//             ========================================================= */}

//             <div className="border-t border-white/[0.07]">

//                 <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-gray-600 sm:px-6 md:flex-row md:items-center md:justify-center lg:px-8">

//                     <p>
//                         © 2026 FoodBridge. All rights reserved.
//                     </p>

//                     <p>
//                         Built to reduce food waste and strengthen communities.
//                     </p>

//                 </div>

//             </div>

//         </footer>
//     );
// }

// export default Footer;

import { Link } from "react-router-dom";

import {
    ArrowUpRight,
    Heart,
} from "lucide-react";


function Footer() {

    return (

        <footer
            className="
                border-t
                border-[#E6EAF0]
                bg-white
                text-[#17233D]
            "
        >

            {/* =====================================================
                MAIN FOOTER
            ===================================================== */}

            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-5
                    py-14
                    sm:px-6
                    sm:py-16
                    lg:px-8
                    lg:py-20
                "
            >

                <div
                    className="
                        grid
                        gap-12
                        sm:grid-cols-2
                        lg:grid-cols-4
                        lg:gap-10
                    "
                >


                    {/* =================================================
                        BRAND
                    ================================================= */}

                    <div
                        className="
                            sm:col-span-2
                            lg:col-span-2
                        "
                    >

                        {/* Logo */}

                        <Link
                            to="/"
                            className="
                                inline-flex
                                items-center
                                gap-3
                                group
                            "
                        >

                            {/* Logo Icon */}

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#1557D6]
                                    text-white
                                    shadow-[0_4px_12px_rgba(21,87,214,0.16)]
                                    transition
                                    duration-200
                                    group-hover:bg-[#0F46B5]
                                "
                            >

                                <span
                                    className="
                                        text-lg
                                        font-black
                                    "
                                >
                                    F
                                </span>

                            </div>


                            {/* Brand Text */}

                            <div>

                                <div
                                    className="
                                        text-lg
                                        font-extrabold
                                        tracking-tight
                                        text-[#17233D]
                                    "
                                >
                                    <span>
                                        Food
                                    </span>

                                    <span className="text-[#1557D6]">
                                        Bridge
                                    </span>
                                </div>


                                <div
                                    className="
                                        mt-0.5
                                        text-[9px]
                                        font-bold
                                        tracking-[0.18em]
                                        text-[#8A96A8]
                                    "
                                >
                                    SHARE · CONNECT · IMPACT
                                </div>

                            </div>

                        </Link>


                        {/* Description */}

                        <p
                            className="
                                mt-6
                                max-w-md
                                text-sm
                                leading-7
                                text-[#66748A]
                            "
                        >
                            Connecting surplus food with verified
                            foundations and communities that need it.
                            Together, we can reduce food waste and
                            create meaningful impact.
                        </p>


                        {/* Tags */}

                        <div
                            className="
                                mt-6
                                flex
                                flex-wrap
                                gap-2
                            "
                        >

                            <span
                                className="
                                    rounded-full
                                    border
                                    border-[#DCE5F4]
                                    bg-[#F5F8FF]
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-semibold
                                    text-[#53627A]
                                "
                            >
                                Food redistribution
                            </span>


                            <span
                                className="
                                    rounded-full
                                    border
                                    border-[#DCE5F4]
                                    bg-[#F5F8FF]
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-semibold
                                    text-[#53627A]
                                "
                            >
                                Community impact
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        PLATFORM
                    ================================================= */}

                    <div>

                        <h3
                            className="
                                text-sm
                                font-bold
                                text-[#17233D]
                            "
                        >
                            Platform
                        </h3>


                        <div
                            className="
                                mt-5
                                flex
                                flex-col
                                gap-3.5
                            "
                        >

                            <Link
                                to="/register"
                                className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    text-sm
                                    font-medium
                                    text-[#66748A]
                                    transition
                                    duration-200
                                    hover:text-[#1557D6]
                                "
                            >
                                Become a Donor

                                <ArrowUpRight
                                    size={13}
                                    className="
                                        opacity-0
                                        transition
                                        group-hover:opacity-100
                                    "
                                />

                            </Link>


                            <Link
                                to="/register"
                                className="
                                    text-sm
                                    font-medium
                                    text-[#66748A]
                                    transition
                                    duration-200
                                    hover:text-[#1557D6]
                                "
                            >
                                Join as Foundation
                            </Link>


                            <Link
                                to="/how-it-works"
                                className="
                                    text-sm
                                    font-medium
                                    text-[#66748A]
                                    transition
                                    duration-200
                                    hover:text-[#1557D6]
                                "
                            >
                                How It Works
                            </Link>


                            <Link
                                to="/impact"
                                className="
                                    text-sm
                                    font-medium
                                    text-[#66748A]
                                    transition
                                    duration-200
                                    hover:text-[#1557D6]
                                "
                            >
                                Our Impact
                            </Link>

                        </div>

                    </div>


                    {/* =================================================
                        COMPANY
                    ================================================= */}

                    <div>

                        <h3
                            className="
                                text-sm
                                font-bold
                                text-[#17233D]
                            "
                        >
                            Company
                        </h3>


                        <div
                            className="
                                mt-5
                                flex
                                flex-col
                                gap-3.5
                            "
                        >

                            <Link
                                to="/about-us"
                                className="
                                    text-sm
                                    font-medium
                                    text-[#66748A]
                                    transition
                                    duration-200
                                    hover:text-[#1557D6]
                                "
                            >
                                About FoodBridge
                            </Link>


                            <Link
                                to="/contact"
                                className="
                                    text-sm
                                    font-medium
                                    text-[#66748A]
                                    transition
                                    duration-200
                                    hover:text-[#1557D6]
                                "
                            >
                                Contact
                            </Link>


                            <Link
                                to="/privacy"
                                className="
                                    text-sm
                                    font-medium
                                    text-[#66748A]
                                    transition
                                    duration-200
                                    hover:text-[#1557D6]
                                "
                            >
                                Privacy Policy
                            </Link>


                            <Link
                                to="/terms"
                                className="
                                    text-sm
                                    font-medium
                                    text-[#66748A]
                                    transition
                                    duration-200
                                    hover:text-[#1557D6]
                                "
                            >
                                Terms of Service
                            </Link>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                BOTTOM FOOTER
            ===================================================== */}

            <div
                className="
                    border-t
                    border-[#E8ECF2]
                    bg-[#FAFBFD]
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        max-w-7xl
                        flex-col
                        gap-3
                        px-5
                        py-5
                        text-xs
                        text-[#7B879A]
                        sm:px-6
                        md:flex-row
                        md:items-center
                        md:justify-center
                        lg:px-8
                    "
                >

                    {/* Copyright */}

                    <p>
                        © 2026 FoodBridge. All rights reserved.
                    </p>


                    {/* Message */}

                    <p
                        className="
                            flex
                            items-center
                            gap-1.5
                        "
                    >

                        Built to reduce food waste and strengthen
                        communities.

                        <Heart
                            size={12}
                            className="text-[#1557D6]"
                            fill="currentColor"
                        />

                    </p>

                </div>

            </div>

        </footer>
    );
}


export default Footer;