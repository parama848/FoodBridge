import { Link } from "react-router-dom";
import { ArrowRight, Heart, ShieldCheck, Zap } from "lucide-react";

function Hero() {
    return (
        <section className="relative overflow-hidden border-b border-white/[0.06]">

            {/* Background effects */}

            <div className="pointer-events-none absolute inset-0">

                <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-[140px]" />

                <div className="absolute bottom-[-200px] left-[-150px] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />

                <div className="absolute right-[-150px] top-[40%] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />

            </div>


            {/* Subtle grid */}

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "70px 70px"
                }}
            />


            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <div className="grid min-h-[calc(100vh-80px)] items-center gap-16 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">


                    {/* =====================================================
                        LEFT
                    ===================================================== */}

                    <div className="max-w-3xl">

                        {/* Badge */}

                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-2">

                            <span className="relative flex h-2 w-2">

                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />

                            </span>

                            <span className="text-xs font-semibold tracking-wide text-emerald-300">
                                Making every meal count
                            </span>

                        </div>


                        {/* Heading */}

                        <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[76px]">

                            Good food should

                            <span className="block">
                                never
                            </span>

                            <span className="block text-emerald-400">
                                go to waste.
                            </span>

                        </h1>


                        {/* Description */}

                        <p className="mt-8 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">

                            FoodBridge connects surplus food donors
                            with verified foundations, turning excess
                            food into meaningful meals for communities
                            that need them.

                        </p>


                        {/* Buttons */}

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                            <Link
                                to="/donor/donations/create"
                                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-7 text-sm font-bold text-black transition-all duration-200 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/10"
                            >

                                Donate food

                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                />

                            </Link>


                            <Link
                                to="/donor/donations"
                                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-7 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                            >
                                View my donations
                            </Link>

                        </div>


                        {/* Trust */}

                        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-gray-600">

                            <div className="flex items-center gap-2">

                                <ShieldCheck
                                    size={14}
                                    className="text-emerald-400"
                                />

                                Verified foundations

                            </div>


                            <span className="hidden h-1 w-1 rounded-full bg-gray-700 sm:block" />


                            <div className="flex items-center gap-2">

                                <Zap
                                    size={14}
                                    className="text-emerald-400"
                                />

                                Real-time updates

                            </div>


                            <span className="hidden h-1 w-1 rounded-full bg-gray-700 sm:block" />


                            <div className="flex items-center gap-2">

                                <Heart
                                    size={14}
                                    className="text-emerald-400"
                                />

                                Community impact

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        RIGHT — VISUAL CARD
                    ===================================================== */}

                    <div className="relative mx-auto w-full max-w-lg lg:ml-auto">

                        {/* Main card */}

                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">


                            {/* Card header */}

                            <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">

                                <div>

                                    <p className="text-xs font-medium text-gray-500">
                                        FoodBridge
                                    </p>

                                    <h3 className="mt-1 text-sm font-semibold text-white">
                                        Donation journey
                                    </h3>

                                </div>


                                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5">

                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                                    <span className="text-[10px] font-semibold text-emerald-300">
                                        LIVE
                                    </span>

                                </div>

                            </div>


                            {/* Donation */}

                            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-black/30 p-5">

                                <div className="flex items-start justify-between gap-4">

                                    <div>

                                        <p className="text-xs text-gray-500">
                                            Donation
                                        </p>

                                        <h4 className="mt-1 text-lg font-bold text-white">
                                            Fresh Vegetable Biryani
                                        </h4>

                                        <p className="mt-1 text-xs text-gray-500">
                                            15 KG · Cooked Food
                                        </p>

                                    </div>


                                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-300">
                                        ACTIVE
                                    </span>

                                </div>


                                {/* Progress */}

                                <div className="mt-7">

                                    <div className="relative h-1 rounded-full bg-white/10">

                                        <div className="absolute left-0 top-0 h-1 w-[75%] rounded-full bg-emerald-400" />

                                    </div>


                                    <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">

                                        <div>

                                            <div className="font-semibold text-emerald-400">
                                                Donated
                                            </div>

                                            <div className="mt-1 text-gray-600">
                                                Completed
                                            </div>

                                        </div>


                                        <div>

                                            <div className="font-semibold text-emerald-400">
                                                Accepted
                                            </div>

                                            <div className="mt-1 text-gray-600">
                                                Foundation
                                            </div>

                                        </div>


                                        <div>

                                            <div className="font-semibold text-white">
                                                Pickup
                                            </div>

                                            <div className="mt-1 text-gray-600">
                                                In progress
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Foundation */}

                            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-black/20 p-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">

                                    <Heart size={19} />

                                </div>


                                <div className="min-w-0">

                                    <p className="text-[10px] text-gray-600">
                                        Accepted by
                                    </p>

                                    <p className="mt-1 truncate text-sm font-semibold text-white">
                                        Hope Food Relief Foundation
                                    </p>

                                </div>


                                <div className="ml-auto shrink-0">

                                    <ShieldCheck
                                        size={18}
                                        className="text-emerald-400"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Floating stat */}

                        <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 py-4 shadow-2xl sm:block">

                            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-600">
                                Community impact
                            </p>

                            <p className="mt-1 text-xl font-bold text-white">
                                One meal
                                <span className="text-emerald-400"> matters.</span>
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;