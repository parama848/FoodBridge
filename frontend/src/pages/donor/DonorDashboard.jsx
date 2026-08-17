import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    Package,
    Plus,
    RefreshCw,
    Truck,
    UtensilsCrossed
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";


function DonorDashboard() {

    const { user } = useAuth();


    const [donations, setDonations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================================================
    // FETCH MY DONATIONS
    // GET /api/donations/my
    // =========================================================

    const fetchDonations = async () => {

        try {

            setLoading(true);
            setError("");


            const response =
                await axiosInstance.get(
                    "/donations/my"
                );


            const apiResponse =
                response.data;


            if (!apiResponse.success) {

                throw new Error(
                    apiResponse.message ||
                    "Failed to retrieve donations"
                );
            }


            setDonations(
                Array.isArray(apiResponse.data)
                    ? apiResponse.data
                    : []
            );

        } catch (err) {

            console.error(
                "Failed to fetch donations:",
                err
            );


            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to load donations"
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
    // STATISTICS
    // =========================================================

    const statistics = useMemo(() => {

        const total =
            donations.length;


        const pending =
            donations.filter(
                donation =>
                    donation.status === "PENDING"
            ).length;


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
            pending,
            accepted,
            pickedUp,
            delivered
        };

    }, [donations]);


    // =========================================================
    // RECENT DONATIONS
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

            case "PENDING":

                return {
                    label: "Pending",
                    className:
                        "border-amber-200 bg-amber-50 text-amber-700",
                    icon: Clock3
                };


            case "ACCEPTED":

                return {
                    label: "Accepted",
                    className:
                        "border-blue-200 bg-blue-50 text-blue-700",
                    icon: CheckCircle2
                };


            case "PICKED_UP":

                return {
                    label: "Picked Up",
                    className:
                        "border-violet-200 bg-violet-50 text-violet-700",
                    icon: Truck
                };


            case "DELIVERED":

                return {
                    label: "Delivered",
                    className:
                        "border-[#C9D8F2] bg-[#1557D6]/10 text-[#1557D6]",
                    icon: CheckCircle2
                };


            default:

                return {
                    label: status || "Unknown",
                    className:
                        "border-[#E1E6EE] bg-white/5 text-[#66748A]",
                    icon: Package
                };
        }
    };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "—";
        }


        try {

            return new Intl.DateTimeFormat(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            ).format(
                new Date(date)
            );

        } catch {

            return "—";

        }
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-[#F8FAFD] text-[#17233D]">


                <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

                    {/* Header skeleton */}

                    <div className="animate-pulse">

                        <div className="h-4 w-32 rounded bg-[#E8EDF5]" />

                        <div className="mt-4 h-10 w-80 rounded bg-[#E8EDF5]" />

                        <div className="mt-3 h-5 w-[450px] max-w-full rounded bg-white/5" />

                    </div>


                    {/* Stats skeleton */}

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {[1, 2, 3, 4].map(
                            item => (

                                <div
                                    key={item}
                                    className="h-32 animate-pulse rounded-2xl border border-[#E1E6EE] bg-[#F8FAFD]"
                                />

                            )
                        )}

                    </div>


                    {/* Content skeleton */}

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">

                        <div className="h-96 animate-pulse rounded-2xl border border-[#E1E6EE] bg-[#F8FAFD]" />

                        <div className="h-96 animate-pulse rounded-2xl border border-[#E1E6EE] bg-[#F8FAFD]" />

                    </div>

                </main>

            </div>
        );
    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (

            <div className="min-h-screen bg-[#F8FAFD] text-[#17233D]">

                <DashboardHeader
                    user={user}
                    onRefresh={fetchDonations}
                />


                <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-5 sm:px-6 lg:px-8">

                    <div className="w-full max-w-md rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">

                            <Package size={24} />

                        </div>


                        <h2 className="mt-5 text-xl font-bold">
                            Unable to load donations
                        </h2>


                        <p className="mt-3 text-sm leading-6 text-[#66748A]">
                            {error}
                        </p>


                        <button
                            type="button"
                            onClick={fetchDonations}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-200"
                        >

                            <RefreshCw size={15} />

                            Try again

                        </button>

                    </div>

                </main>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-[#F8FAFD] text-[#17233D]">


            {/* =====================================================
                HEADER
            ===================================================== */}



            <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">


                {/* =================================================
                    WELCOME
                ================================================= */}

                <section>

                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1557D6]">
                        Donor dashboard
                    </p>


                    <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

                        <div>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Welcome back,
                                <span className="text-[#1557D6]">
                                    {" "}
                                    {user?.name || "Donor"}
                                </span>
                            </h1>


                            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#66748A] sm:text-base">
                                Here's an overview of your food donations
                                and their current journey.
                            </p>

                        </div>


                        <Link
                            to="/donor/donations/create"
                            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1557D6] px-5 text-sm font-bold text-white transition hover:bg-[#0F46B5]"
                        >

                            <Plus size={17} />

                            Donate Food

                            <ArrowRight
                                size={15}
                                className="transition-transform group-hover:translate-x-1"
                            />

                        </Link>

                    </div>

                </section>


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">


                    <StatCard
                        title="Total Donations"
                        value={statistics.total}
                        description="All donations created"
                        icon={Package}
                    />


                    <StatCard
                        title="Pending"
                        value={statistics.pending}
                        description="Waiting for acceptance"
                        icon={Clock3}
                    />


                    <StatCard
                        title="Accepted"
                        value={statistics.accepted}
                        description="Accepted by foundations"
                        icon={CheckCircle2}
                    />


                    <StatCard
                        title="Delivered"
                        value={statistics.delivered}
                        description="Successfully delivered"
                        icon={Truck}
                    />

                </section>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">


                    {/* =================================================
                        RECENT DONATIONS
                    ================================================= */}

                    <div className="overflow-hidden rounded-2xl border border-[#E1E6EE] bg-white shadow-[0_3px_14px_rgba(23,35,61,0.035)]">

                        <div className="flex items-center justify-between border-b border-[#E6EAF0] px-5 py-5 sm:px-6">

                            <div>

                                <h2 className="font-semibold text-[#17233D]">
                                    Recent donations
                                </h2>

                                <p className="mt-1 text-xs text-[#7B879A]">
                                    Your latest food contributions
                                </p>

                            </div>


                            <Link
                                to="/donor/donations"
                                className="hidden items-center gap-1.5 text-xs font-semibold text-[#66748A] transition hover:text-[#17233D] sm:flex"
                            >

                                View all

                                <ArrowRight size={14} />

                            </Link>

                        </div>


                        {recentDonations.length === 0 ? (

                            <EmptyDonations />

                        ) : (

                            <div className="divide-y divide-white/[0.06]">

                                {recentDonations.map(
                                    donation => {

                                        const status =
                                            getStatusConfig(
                                                donation.status
                                            );

                                        const StatusIcon =
                                            status.icon;


                                        return (

                                            <div
                                                key={donation.id}
                                                className="group flex flex-col gap-4 px-5 py-5 transition hover:bg-white sm:flex-row sm:items-center sm:justify-between sm:px-6"
                                            >

                                                <div className="flex min-w-0 items-center gap-4">

                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E1E6EE] bg-[#F8FAFD] text-[#66748A]">

                                                        <UtensilsCrossed
                                                            size={18}
                                                        />

                                                    </div>


                                                    <div className="min-w-0">

                                                        <h3 className="truncate text-sm font-bold text-[#17233D]">
                                                            {donation.foodName || "Food Donation"}
                                                        </h3>


                                                        <p className="mt-1 text-xs text-[#7B879A]">

                                                            {donation.quantity ?? "—"}

                                                            {" "}

                                                            {donation.quantityUnit || ""}

                                                            {" · "}

                                                            {donation.foodType || "Food"}

                                                        </p>

                                                    </div>

                                                </div>


                                                <div className="flex items-center justify-between gap-4 sm:justify-end">

                                                    <div className="text-right">

                                                        <div className="text-xs text-[#7B879A]">
                                                            {formatDate(
                                                                donation.createdAt
                                                            )}
                                                        </div>

                                                        {donation.acceptedFoundationName && (

                                                            <div className="mt-1 max-w-[180px] truncate text-[10px] text-[#8B97A8]">
                                                                {donation.acceptedFoundationName}
                                                            </div>

                                                        )}

                                                    </div>


                                                    <div
                                                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold ${status.className}`}
                                                    >

                                                        <StatusIcon size={11} />

                                                        {status.label}

                                                    </div>

                                                </div>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        )}


                        <div className="border-t border-[#EEF1F5] px-5 py-4 sm:hidden">

                            <Link
                                to="/donations"
                                className="flex items-center justify-center gap-2 text-xs font-semibold text-[#66748A]"
                            >

                                View all donations

                                <ArrowRight size={14} />

                            </Link>

                        </div>

                    </div>


                    {/* =================================================
                        QUICK ACTIONS
                    ================================================= */}

                    <div className="rounded-2xl border border-[#E1E6EE] bg-white p-5 shadow-[0_3px_14px_rgba(23,35,61,0.035)] sm:p-6">

                        <div>

                            <h2 className="font-semibold text-[#17233D]">
                                Quick actions
                            </h2>

                            <p className="mt-1 text-xs text-[#7B879A]">
                                Manage your FoodBridge activity
                            </p>

                        </div>


                        <div className="mt-6 space-y-3">


                            <QuickAction
                                to="/donor/donations/create"
                                icon={Plus}
                                title="Donate food"
                                description="Create a new donation"
                                primary
                            />


                            <QuickAction
                                to="/donor/donations"
                                icon={Package}
                                title="My donations"
                                description="View all your donations"
                            />


                            <QuickAction
                                to="/donor/notifications"
                                icon={CheckCircle2}
                                title="Notifications"
                                description="Check your latest updates"
                            />

                        </div>


                        {/* Small summary */}

                        <div className="mt-6 rounded-xl border border-[#E6EAF0] bg-black/20 p-4">

                            <div className="flex items-center justify-between">

                                <span className="text-xs text-[#7B879A]">
                                    Picked up
                                </span>

                                <span className="text-sm font-bold text-[#17233D]">
                                    {statistics.pickedUp}
                                </span>

                            </div>


                            <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#E8EDF5]">

                                <div
                                    className="h-full rounded-full bg-violet-400 transition-all"
                                    style={{
                                        width:
                                            statistics.total > 0
                                                ? `${Math.min(
                                                    (statistics.pickedUp /
                                                        statistics.total) *
                                                        100,
                                                    100
                                                )}%`
                                                : "0%"
                                    }}
                                />

                            </div>


                            <p className="mt-2 text-[10px] text-[#8B97A8]">
                                Donations currently picked up
                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}


/* =============================================================
   DASHBOARD HEADER
   ============================================================= */




/* =============================================================
   STAT CARD
   ============================================================= */

function StatCard({
    title,
    value,
    description,
    icon: Icon
}) {

    return (

        <div className="group rounded-2xl border border-[#E1E6EE] bg-white p-5 shadow-[0_3px_14px_rgba(23,35,61,0.035)] transition-all duration-200 hover:border-[#D5DEEB] hover:bg-[#F8FAFD]">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-xs font-bold text-[#17233D]">
                        {title}
                    </p>

                    <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#17233D]">
                        {value}
                    </p>

                </div>


                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E1E6EE] bg-[#F8FAFD] text-[#66748A] transition group-hover:text-[#1557D6]">

                    <Icon size={18} />

                </div>

            </div>


            <p className="mt-4 text-[11px] text-[#8B97A8]">
                {description}
            </p>

        </div>
    );
}


/* =============================================================
   QUICK ACTION
   ============================================================= */

function QuickAction({
    to,
    icon: Icon,
    title,
    description,
    primary = false
}) {

    return (

        <Link
            to={to}
            className={`group flex items-center gap-3 rounded-xl border p-3.5 transition ${
                primary
                    ? "border-[#C9D8F2] bg-[#1557D6]/[0.05] hover:bg-[#1557D6]/[0.08]"
                    : "border-[#E6EAF0] bg-white hover:border-[#D5DEEB] hover:bg-[#F8FAFD]"
            }`}
        >

            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    primary
                        ? "bg-[#1557D6] text-white"
                        : "bg-[#F2F6FF] text-[#66748A] group-hover:text-[#17233D]"
                }`}
            >

                <Icon size={17} />

            </div>


            <div className="min-w-0 flex-1">

                <p className="text-sm font-bold text-[#17233D]">
                    {title}
                </p>

                <p className="mt-0.5 text-[10px] text-[#7B879A]">
                    {description}
                </p>

            </div>


            <ArrowRight
                size={14}
                className="shrink-0 text-[#8B97A8] transition group-hover:translate-x-0.5 group-hover:text-[#66748A]"
            />

        </Link>
    );
}


/* =============================================================
   EMPTY DONATIONS
   ============================================================= */

function EmptyDonations() {

    return (

        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E1E6EE] bg-[#F8FAFD] text-[#7B879A]">

                <UtensilsCrossed size={22} />

            </div>


            <h3 className="mt-5 text-sm font-bold text-[#17233D]">
                No donations yet
            </h3>


            <p className="mt-2 max-w-sm text-xs leading-6 text-[#7B879A]">
                Your food donations will appear here once
                you create your first donation.
            </p>


            <Link
                to="/donor/donations/create"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1557D6] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#0F46B5]"
            >

                <Plus size={14} />

                Create donation

            </Link>

        </div>
    );
}


export default DonorDashboard;