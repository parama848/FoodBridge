import { useEffect, useMemo, useState } from "react";
import {
    AlertCircle,
    CheckCircle2,
    Clock3,
    Package,
    RefreshCw,
    Truck,
    UtensilsCrossed,
    ArrowRight,
    Activity,
} from "lucide-react";

import { Link } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";



const dashboardCardStyles = `
@keyframes foundationCardIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.foundation-card-in {
    animation: foundationCardIn .4s ease-out both;
}

@media (prefers-reduced-motion: reduce) {
    .foundation-card-in {
        animation: none !important;
    }
}
`;

function FoundationDashboard() {

    // =========================================================
    // STATE
    // =========================================================

    const [donations, setDonations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================================================
    // FETCH FOUNDATION DONATIONS
    // =========================================================
    //
    // This dashboard shows ONLY donations belonging to the
    // authenticated foundation.
    //
    // GET /api/donations/foundation/my
    //
    // =========================================================

    const fetchDonations = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await axiosInstance.get(
                    "/donations/foundation/my"
                );


            const apiResponse =
                response.data;


            if (!apiResponse?.success) {

                throw new Error(
                    apiResponse?.message ||
                    "Unable to load foundation donations."
                );
            }


            setDonations(
                apiResponse?.data || []
            );


        } catch (err) {

            console.error(
                "Foundation dashboard error:",
                err
            );


            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to load dashboard data."
            );


        } finally {

            setLoading(false);

        }
    };


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        fetchDonations();

    }, []);


    // =========================================================
    // DONATION STATISTICS
    // =========================================================

    const statistics = useMemo(() => {

        const total =
            donations.length;


        const accepted =
            donations.filter(
                donation =>
                    donation.status === "ACCEPTED"
            ).length;


        const pickedUp =
            donations.filter(
                donation =>
                    donation.status === "PICKED_UP"
            ).length;


        const delivered =
            donations.filter(
                donation =>
                    donation.status === "DELIVERED"
            ).length;


        return {
            total,
            accepted,
            pickedUp,
            delivered
        };

    }, [donations]);


    // =========================================================
    // RECENT DONATIONS
    // =========================================================
    //
    // Latest donations first.
    //
    // =========================================================

    const recentDonations =
        useMemo(() => {

            return [...donations]
                .sort(
                    (a, b) =>
                        new Date(
                            b.createdAt || 0
                        ) -
                        new Date(
                            a.createdAt || 0
                        )
                )
                .slice(0, 5);

        }, [donations]);


    // =========================================================
    // STATUS CONFIG
    // =========================================================

    const getStatusConfig = (status) => {

        switch (status) {

            case "ACCEPTED":

                return {
                    label: "Accepted",
                    icon: CheckCircle2,
                    className:
                        "border-blue-200 bg-blue-50 text-blue-700"
                };


            case "PICKED_UP":

                return {
                    label: "Picked Up",
                    icon: Truck,
                    className:
                        "border-amber-200 bg-amber-50 text-amber-700"
                };


            case "DELIVERED":

                return {
                    label: "Delivered",
                    icon: CheckCircle2,
                    className:
                        "border-green-200 bg-green-50 text-[#1557D6]"
                };


            default:

                return {
                    label: status || "Unknown",
                    icon: Clock3,
                    className:
                        "border-[#D9E1ED] bg-white/5 text-[#17233D]"
                };

        }
    };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {

            return "Not available";
        }


        const parsedDate =
            new Date(date);


        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return "Not available";
        }


        return parsedDate.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }
        );
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="min-h-[70vh] bg-[#F8FAFD] text-[#17233D]">

                <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

                    <DashboardSkeleton />

                </main>

            </div>
        );
    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (

            <div className="min-h-[70vh] bg-[#F8FAFD] text-[#17233D]">

                <main className="mx-auto max-w-4xl px-5 py-16 sm:px-6">

                    <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">

                            <AlertCircle
                                size={26}
                                className="text-red-700"
                            />

                        </div>


                        <h2 className="mt-5 text-xl font-semibold">

                            Unable to load dashboard

                        </h2>


                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#17233D]">

                            {error}

                        </p>


                        <button
                            type="button"
                            onClick={fetchDonations}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-gray-200"
                        >

                            <RefreshCw size={16} />

                            Try Again

                        </button>

                    </div>

                </main>

            </div>
        );
    }


    // =========================================================
    // DASHBOARD
    // =========================================================

    return (

        <>
            <style>{dashboardCardStyles}</style>

            <div className="min-h-[70vh] bg-[#F8FAFD] text-[#17233D] foundation-card-in">

            <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#1557D6]">

                            Foundation Dashboard

                        </p>


                        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">

                            Donation Overview

                        </h1>


                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#17233D]">

                            Monitor the food donations accepted by your
                            foundation and track their progress from
                            acceptance to delivery.

                        </p>

                    </div>


                    {/* REFRESH */}

                    <button
                        type="button"
                        onClick={fetchDonations}
                        disabled={loading}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D9E1ED] px-5 text-sm font-bold text-[#17233D] transition hover:border-[#C9D8EC] hover:bg-[#EEF3FB] hover:text-[#17233D] disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <RefreshCw
                            size={16}
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>

                </div>


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">


                    <StatCard
                        icon={Package}
                        label="Total Donations"
                        value={statistics.total}
                        description="Donations accepted by your foundation"
                    />


                    <StatCard
                        icon={CheckCircle2}
                        label="Accepted"
                        value={statistics.accepted}
                        description="Successfully accepted donations"
                    />


                    <StatCard
                        icon={Truck}
                        label="Picked Up"
                        value={statistics.pickedUp}
                        description="Donations collected from donors"
                    />


                    <StatCard
                        icon={Activity}
                        label="Delivered"
                        value={statistics.delivered}
                        description="Donations successfully delivered"
                    />

                </section>


                {/* =================================================
                    IMPACT / PROGRESS
                ================================================= */}

                <section className="mt-8 grid gap-6 lg:grid-cols-3">


                    {/* =================================================
                        DELIVERY PROGRESS
                    ================================================= */}

                    <div className="foundation-card-in rounded-3xl border border-[#E1E6EE] bg-white p-6 shadow-[0_6px_24px_rgba(23,35,61,0.05)] lg:col-span-2">

                        <div className="flex items-start justify-between gap-4">

                            <div>

                                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#17233D]">

                                    Donation Progress

                                </p>


                                <h2 className="mt-2 text-lg font-extrabold">

                                    Your foundation's activity

                                </h2>

                            </div>


                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1557D6]/10 text-[#1557D6]">

                                <Activity size={18} />

                            </div>

                        </div>


                        <div className="mt-8">


                            <ProgressRow
                                label="Accepted"
                                value={
                                    statistics.accepted
                                }
                                total={
                                    statistics.total
                                }
                                icon={CheckCircle2}
                            />


                            <ProgressRow
                                label="Picked Up"
                                value={
                                    statistics.pickedUp
                                }
                                total={
                                    statistics.total
                                }
                                icon={Truck}
                            />


                            <ProgressRow
                                label="Delivered"
                                value={
                                    statistics.delivered
                                }
                                total={
                                    statistics.total
                                }
                                icon={CheckCircle2}
                            />

                        </div>

                    </div>


                    {/* =================================================
                        QUICK ACTIONS
                    ================================================= */}

                    <div className="foundation-card-in rounded-3xl border border-[#E1E6EE] bg-white p-6 shadow-[0_6px_24px_rgba(23,35,61,0.05)]">

                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#17233D]">

                            Quick Access

                        </p>


                        <h2 className="mt-2 text-lg font-extrabold">

                            Manage donations

                        </h2>


                        <div className="mt-6 space-y-3">


                            <Link
                                to="/foundation/donations"
                                className="group flex items-center justify-between rounded-2xl border border-[#E1E6EE] bg-white p-4 transition hover:border-[#9FB8E8] hover:bg-[#EEF3FB]"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1557D6]/10 text-[#1557D6]">

                                        <Package size={17} />

                                    </div>


                                    <div>

                                        <p className="text-sm font-bold">

                                            My Donations

                                        </p>


                                        <p className="mt-1 text-xs text-[#17233D]">

                                            View all accepted donations

                                        </p>

                                    </div>

                                </div>


                                <ArrowRight
                                    size={16}
                                    className="text-[#17233D] transition group-hover:translate-x-1 group-hover:text-[#1557D6]"
                                />

                            </Link>


                            <Link
                                to="/foundation/available-food"
                                className="group flex items-center justify-between rounded-2xl border border-[#E1E6EE] bg-white p-4 transition hover:border-[#9FB8E8] hover:bg-[#EEF3FB]"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF3FB] text-[#17233D]">

                                        <UtensilsCrossed size={17} />

                                    </div>


                                    <div>

                                        <p className="text-sm font-bold">

                                            Find Food

                                        </p>


                                        <p className="mt-1 text-xs text-[#17233D]">

                                            Browse available donations

                                        </p>

                                    </div>

                                </div>


                                <ArrowRight
                                    size={16}
                                    className="text-[#17233D] transition group-hover:translate-x-1 group-hover:text-[#1557D6]"
                                />

                            </Link>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    RECENT DONATIONS
                ================================================= */}

                <section className="mt-8 rounded-3xl border border-[#E1E6EE] bg-white shadow-[0_6px_24px_rgba(23,35,61,0.05)]">


                    {/* HEADER */}

                    <div className="flex flex-col gap-4 border-b border-[#E1E6EE] p-6 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#17233D]">

                                Activity

                            </p>


                            <h2 className="mt-2 text-lg font-extrabold">

                                Recent Donations

                            </h2>

                        </div>


                        <Link
                            to="/foundation/donations"
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#1557D6] transition hover:text-[#1557D6]"
                        >

                            View all

                            <ArrowRight size={15} />

                        </Link>

                    </div>


                    {/* EMPTY */}

                    {recentDonations.length === 0 ? (

                        <div className="px-6 py-16 text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF3FB]">

                                <Package
                                    size={25}
                                    className="text-[#17233D]"
                                />

                            </div>


                            <h3 className="mt-5 text-lg font-extrabold">

                                No donations yet

                            </h3>


                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#17233D]">

                                Donations accepted by your foundation
                                will appear here.

                            </p>

                        </div>

                    ) : (

                        <div className="divide-y divide-white/[0.06]">

                            {recentDonations.map(
                                (donation) => {

                                    const status =
                                        getStatusConfig(
                                            donation.status
                                        );

                                    const StatusIcon =
                                        status.icon;


                                    return (

                                        <Link
                                            key={
                                                donation.id
                                            }
                                            to={`/foundation/donations/${donation.id}`}
                                            className="group block p-6 transition hover:bg-white"
                                        >

                                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">


                                                {/* DONATION */}

                                                <div className="flex min-w-0 items-center gap-4">

                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1557D6]/10 text-[#1557D6]">

                                                        <UtensilsCrossed
                                                            size={19}
                                                        />

                                                    </div>


                                                    <div className="min-w-0">

                                                        <h3 className="truncate text-sm font-bold text-[#17233D]">

                                                            {
                                                                donation.foodName ||
                                                                "Food Donation"
                                                            }

                                                        </h3>


                                                        <p className="mt-1 text-xs text-[#17233D]">

                                                            {
                                                                donation.foodType ||
                                                                "Food"
                                                            }

                                                            {" • "}

                                                            {
                                                                donation.quantity ??
                                                                "-"
                                                            }

                                                            {" "}

                                                            {
                                                                donation.quantityUnit ||
                                                                ""
                                                            }

                                                        </p>

                                                    </div>

                                                </div>


                                                {/* STATUS */}

                                                <div className="flex items-center justify-between gap-5 sm:justify-end">


                                                    <div
                                                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${status.className}`}
                                                    >

                                                        <StatusIcon
                                                            size={13}
                                                        />

                                                        {
                                                            status.label
                                                        }

                                                    </div>


                                                    <div className="hidden text-right sm:block">

                                                        <p className="text-[10px] uppercase tracking-wider text-[#17233D]">

                                                            Updated

                                                        </p>


                                                        <p className="mt-1 text-xs text-[#17233D]">

                                                            {
                                                                formatDate(
                                                                    donation.updatedAt ||
                                                                    donation.createdAt
                                                                )
                                                            }

                                                        </p>

                                                    </div>


                                                    <ArrowRight
                                                        size={16}
                                                        className="text-[#17233D] transition group-hover:translate-x-1 group-hover:text-[#1557D6]"
                                                    />

                                                </div>

                                            </div>

                                        </Link>

                                    );
                                }
                            )}

                        </div>

                    )}

                </section>


                {/* =================================================
                    BOTTOM SUMMARY
                ================================================= */}

                {statistics.total > 0 && (

                    <section className="mt-8 grid gap-4 sm:grid-cols-3">


                        <MiniSummary
                            icon={CheckCircle2}
                            label="Accepted"
                            value={
                                statistics.accepted
                            }
                        />


                        <MiniSummary
                            icon={Truck}
                            label="In Collection"
                            value={
                                statistics.pickedUp
                            }
                        />


                        <MiniSummary
                            icon={CheckCircle2}
                            label="Successfully Delivered"
                            value={
                                statistics.delivered
                            }
                        />

                    </section>

                )}

            </main>

            </div>
        </>
    );
}


// =============================================================
// STAT CARD
// =============================================================

function StatCard({
    icon: Icon,
    label,
    value,
    description
}) {

    return (

        <div className="foundation-card-in group rounded-3xl border border-[#E1E6EE] bg-white p-5 shadow-[0_5px_20px_rgba(23,35,61,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#C9D8EC] hover:shadow-[0_10px_28px_rgba(23,35,61,0.08)]">

            <div className="flex items-start justify-between gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF3FB] text-[#17233D] transition group-hover:bg-[#1557D6]/10 group-hover:text-[#1557D6]">

                    <Icon size={19} />

                </div>


                <span className="text-3xl font-extrabold tracking-tight text-[#17233D]">

                    {value}

                </span>

            </div>


            <p className="mt-5 text-sm font-bold text-[#17233D]">

                {label}

            </p>


            <p className="mt-1 text-xs leading-5 text-[#17233D]">

                {description}

            </p>

        </div>
    );
}


// =============================================================
// PROGRESS ROW
// =============================================================

function ProgressRow({
    label,
    value,
    total,
    icon: Icon
}) {

    const percentage =
        total > 0
            ? Math.min(
                100,
                Math.round(
                    (value / total) * 100
                )
            )
            : 0;


    return (

        <div className="mb-6 last:mb-0">

            <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-2">

                    <Icon
                        size={15}
                        className="text-[#17233D]"
                    />

                    <span className="text-xs font-bold text-[#17233D]">

                        {label}

                    </span>

                </div>


                <span className="text-xs font-semibold text-[#17233D]">

                    {value}

                </span>

            </div>


            <div className="h-2 overflow-hidden rounded-full bg-[#E3EAF4]">

                <div
                    className="h-full rounded-full bg-[#1557D6] transition-all duration-700"
                    style={{
                        width: `${percentage}%`
                    }}
                />

            </div>


            <p className="mt-1.5 text-right text-[10px] text-[#17233D]">

                {percentage}% of total

            </p>

        </div>
    );
}


// =============================================================
// MINI SUMMARY
// =============================================================

function MiniSummary({
    icon: Icon,
    label,
    value
}) {

    return (

        <div className="flex items-center justify-between rounded-2xl border border-[#E1E6EE] bg-white p-5">

            <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF3FB] text-[#17233D]">

                    <Icon size={16} />

                </div>


                <span className="text-sm text-[#17233D]">

                    {label}

                </span>

            </div>


            <span className="text-xl font-extrabold text-[#17233D]">

                {value}

            </span>

        </div>
    );
}


// =============================================================
// DASHBOARD SKELETON
// =============================================================

function DashboardSkeleton() {

    return (

        <div className="animate-pulse">

            {/* HEADER */}

            <div className="space-y-3">

                <div className="h-3 w-36 rounded bg-[#E6ECF5]" />

                <div className="h-9 w-64 rounded bg-[#E6ECF5]" />

                <div className="h-4 w-full max-w-xl rounded bg-[#EEF3FB]" />

            </div>


            {/* STAT CARDS */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {Array.from({
                    length: 4
                }).map((_, index) => (

                    <div
                        key={index}
                        className="h-36 rounded-3xl border border-[#E8EDF4] bg-white"
                    />

                ))}

            </div>


            {/* MAIN */}

            <div className="mt-8 grid gap-6 lg:grid-cols-3">

                <div className="h-72 rounded-3xl border border-[#E8EDF4] bg-white lg:col-span-2" />

                <div className="h-72 rounded-3xl border border-[#E8EDF4] bg-white" />

            </div>


            {/* RECENT */}

            <div className="mt-8 h-96 rounded-3xl border border-[#E8EDF4] bg-white" />

        </div>
    );
}


export default FoundationDashboard;