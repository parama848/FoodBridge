import { Link } from "react-router-dom";

function Footer() {

    return (

        <footer className="border-t border-white/[0.08] bg-[#030303]">

            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">

                <div className="grid gap-12 lg:grid-cols-4">


                    {/* =================================================
                        BRAND
                    ================================================= */}

                    <div className="lg:col-span-2">

                        <Link
                            to="/"
                            className="inline-flex items-center gap-3"
                        >

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
                                <span className="font-black">
                                    F
                                </span>
                            </div>


                            <div>

                                <div className="text-lg font-bold text-white">
                                    FoodBridge
                                </div>

                                <div className="text-[9px] font-semibold tracking-[0.18em] text-gray-500">
                                    SHARE · CONNECT · IMPACT
                                </div>

                            </div>

                        </Link>


                        <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">

                            Connecting surplus food with verified
                            foundations and communities that need it.
                            Together, we can reduce food waste and
                            create meaningful impact.

                        </p>


                        <div className="mt-6 flex flex-wrap gap-2">

                            <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-gray-500">
                                Food redistribution
                            </span>

                            <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-gray-500">
                                Community impact
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        PLATFORM
                    ================================================= */}

                    <div>

                        <h3 className="text-sm font-semibold text-white">
                            Platform
                        </h3>

                        <div className="mt-5 flex flex-col gap-3">

                            <Link
                                to="/register"
                                className="text-sm text-gray-500 transition hover:text-white"
                            >
                                Become a Donor
                            </Link>

                            <Link
                                to="/register"
                                className="text-sm text-gray-500 transition hover:text-white"
                            >
                                Join as Foundation
                            </Link>

                            <a
                                href="#how-it-works"
                                className="text-sm text-gray-500 transition hover:text-white"
                            >
                                How It Works
                            </a>

                            <a
                                href="#impact"
                                className="text-sm text-gray-500 transition hover:text-white"
                            >
                                Our Impact
                            </a>

                        </div>

                    </div>


                    {/* =================================================
                        COMPANY
                    ================================================= */}

                    <div>

                        <h3 className="text-sm font-semibold text-white">
                            Company
                        </h3>

                        <div className="mt-5 flex flex-col gap-3">

                            <a
                                href="#about"
                                className="text-sm text-gray-500 transition hover:text-white"
                            >
                                About FoodBridge
                            </a>

                            <a
                                href="#contact"
                                className="text-sm text-gray-500 transition hover:text-white"
                            >
                                Contact
                            </a>

                            <a
                                href="#privacy"
                                className="text-sm text-gray-500 transition hover:text-white"
                            >
                                Privacy Policy
                            </a>

                            <a
                                href="#terms"
                                className="text-sm text-gray-500 transition hover:text-white"
                            >
                                Terms of Service
                            </a>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================================================
                BOTTOM
            ========================================================= */}

            <div className="border-t border-white/[0.07]">

                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-gray-600 sm:px-6 md:flex-row md:items-center md:justify-center lg:px-8">

                    <p>
                        © 2026 FoodBridge. All rights reserved.
                    </p>

                    <p>
                        Built to reduce food waste and strengthen communities.
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;