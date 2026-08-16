import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Clock3,
    Package,
    Plus,
    RefreshCw,
    Search,
    UtensilsCrossed
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";


function MyDonations() {

    const navigate = useNavigate();


    // =========================================================
    // STATE
    // =========================================================

    const [donations, setDonations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("ALL");


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
                    "Unable to retrieve donations."
                );
            }


            setDonations(
                Array.isArray(apiResponse.data)
                    ? apiResponse.data
                    : []
            );

        } catch (err) {

            console.error(
                "My donations error:",
                err
            );


            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to load your donations."
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
    // FILTER DONATIONS
    // =========================================================

    const filteredDonations =
        useMemo(() => {

            return donations.filter(
                donation => {

                    const matchesStatus =
                        statusFilter === "ALL" ||
                        donation.status === statusFilter;


                    const searchValue =
                        search
                            .trim()
                            .toLowerCase();


                    if (!searchValue) {

                        return matchesStatus;
                    }


                    const searchableText = [

                        donation.foodName,

                        donation.foodType,

                        donation.pickupAddress,

                        donation.acceptedFoundationName,

                        donation.status

                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();


                    return (
                        matchesStatus &&
                        searchableText.includes(
                            searchValue
                        )
                    );
                }
            );

        }, [
            donations,
            search,
            statusFilter
        ]);


    // =========================================================
    // COUNTS
    // =========================================================

    const counts = useMemo(() => {

        return {

            all: donations.length,

            available:
                donations.filter(
                    item =>
                        item.status === "AVAILABLE"
                ).length,

            accepted:
                donations.filter(
                    item =>
                        item.status === "ACCEPTED"
                ).length,

            pickedUp:
                donations.filter(
                    item =>
                        item.status === "PICKED_UP"
                ).length,

            delivered:
                donations.filter(
                    item =>
                        item.status === "DELIVERED"
                ).length

        };

    }, [donations]);


    return (

        <div className="min-h-screen bg-[#050505] text-white">

            <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                            Donor
                        </p>


                        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            My donations
                        </h1>


                        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                            Track the food you've donated and follow
                            every donation from availability to delivery.
                        </p>

                    </div>


                    <Link
                        to="/donations/create"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 text-sm font-bold text-black transition hover:bg-emerald-300"
                    >

                        <Plus size={17} />

                        Donate Food

                    </Link>

                </div>


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

                    <StatCard
                        label="All"
                        value={counts.all}
                        active={statusFilter === "ALL"}
                        onClick={() =>
                            setStatusFilter("ALL")
                        }
                    />


                    <StatCard
                        label="Available"
                        value={counts.available}
                        active={
                            statusFilter ===
                            "AVAILABLE"
                        }
                        onClick={() =>
                            setStatusFilter("AVAILABLE")
                        }
                    />


                    <StatCard
                        label="Accepted"
                        value={counts.accepted}
                        active={
                            statusFilter ===
                            "ACCEPTED"
                        }
                        onClick={() =>
                            setStatusFilter("ACCEPTED")
                        }
                    />


                    <StatCard
                        label="Picked up"
                        value={counts.pickedUp}
                        active={
                            statusFilter ===
                            "PICKED_UP"
                        }
                        onClick={() =>
                            setStatusFilter("PICKED_UP")
                        }
                    />


                    <StatCard
                        label="Delivered"
                        value={counts.delivered}
                        active={
                            statusFilter ===
                            "DELIVERED"
                        }
                        onClick={() =>
                            setStatusFilter("DELIVERED")
                        }
                    />

                </div>


                {/* =================================================
                    SEARCH / FILTER
                ================================================= */}

                <div className="mt-8 flex flex-col gap-3 lg:flex-row">

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                        />


                        <input
                            type="text"
                            value={search}
                            onChange={event =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search food, type, location or foundation..."
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/40 focus:bg-white/[0.04]"
                        />

                    </div>


                    <select
                        value={statusFilter}
                        onChange={event =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-gray-300 outline-none focus:border-emerald-400/40"
                    >

                        <option
                            value="ALL"
                            className="bg-[#111]"
                        >
                            All statuses
                        </option>

                        <option
                            value="AVAILABLE"
                            className="bg-[#111]"
                        >
                            Available
                        </option>

                        <option
                            value="ACCEPTED"
                            className="bg-[#111]"
                        >
                            Accepted
                        </option>

                        <option
                            value="PICKED_UP"
                            className="bg-[#111]"
                        >
                            Picked up
                        </option>

                        <option
                            value="DELIVERED"
                            className="bg-[#111]"
                        >
                            Delivered
                        </option>

                    </select>


                    <button
                        type="button"
                        onClick={fetchDonations}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
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
                    ERROR
                ================================================= */}

                {error && (

                    <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/[0.04] p-5">

                        <AlertCircle
                            size={19}
                            className="mt-0.5 shrink-0 text-red-400"
                        />


                        <div className="flex-1">

                            <p className="text-sm font-semibold text-red-300">
                                Unable to load donations
                            </p>


                            <p className="mt-1 text-xs leading-6 text-red-400/70">
                                {error}
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={fetchDonations}
                            className="text-xs font-semibold text-red-300 hover:text-white"
                        >
                            Retry
                        </button>

                    </div>

                )}


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="mt-8 grid gap-4 lg:grid-cols-2">

                        {Array.from({
                            length: 4
                        }).map((_, index) => (

                            <DonationSkeleton
                                key={index}
                            />

                        ))}

                    </div>

                )}


                {/* =================================================
                    EMPTY
                ================================================= */}

                {!loading &&
                    !error &&
                    filteredDonations.length === 0 && (

                        <EmptyState
                            hasFilters={
                                Boolean(
                                    search.trim()
                                ) ||
                                statusFilter !== "ALL"
                            }
                            clearFilters={() => {

                                setSearch("");

                                setStatusFilter(
                                    "ALL"
                                );

                            }}
                        />

                    )}


                {/* =================================================
                    DONATIONS
                ================================================= */}

                {!loading &&
                    !error &&
                    filteredDonations.length > 0 && (

                        <div className="mt-8 grid gap-4 lg:grid-cols-2">

                            {filteredDonations.map(
                                donation => (

                                    <DonationCard
                                        key={
                                            donation.id
                                        }
                                        donation={
                                            donation
                                        }
                                        onClick={() =>
                                            navigate(
                                                `/donor/donations/${donation.id}`
                                            )
                                        }
                                    />

                                )
                            )}

                        </div>

                    )}

            </main>

        </div>
    );
}


/* =============================================================
   STAT CARD
============================================================= */

function StatCard({
    label,
    value,
    active,
    onClick
}) {

    return (

        <button
            type="button"
            onClick={onClick}
            className={`
                rounded-2xl border p-4 text-left transition
                ${
                    active
                        ? "border-emerald-400/20 bg-emerald-400/[0.05]"
                        : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]"
                }
            `}
        >

            <p className="text-xs text-gray-600">
                {label}
            </p>


            <p
                className={`
                    mt-2 text-2xl font-bold
                    ${
                        active
                            ? "text-emerald-400"
                            : "text-white"
                    }
                `}
            >
                {value}
            </p>

        </button>
    );
}


/* =============================================================
   DONATION CARD
============================================================= */

function DonationCard({
    donation,
    onClick
}) {

    const status =
        getStatusConfig(
            donation.status
        );


    return (

        <button
            type="button"
            onClick={onClick}
            className="group w-full text-left"
        >

            <article className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 transition duration-200 hover:border-white/[0.14] hover:bg-white/[0.035] sm:p-6">


                {/* =================================================
                    TOP
                ================================================= */}

                <div className="flex items-start justify-between gap-4">

                    <div className="flex min-w-0 items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">

                            <UtensilsCrossed size={19} />

                        </div>


                        <div className="min-w-0">

                            <h2 className="truncate text-base font-semibold text-white">
                                {donation.foodName ||
                                    "Food donation"}
                            </h2>


                            <p className="mt-1 truncate text-xs text-gray-600">
                                {donation.foodType ||
                                    "Food"}
                            </p>

                        </div>

                    </div>


                    <span
                        className={`
                            shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide
                            ${status.className}
                        `}
                    >
                        {status.label}
                    </span>

                </div>


                {/* =================================================
                    DETAILS
                ================================================= */}

                <div className="mt-6 grid grid-cols-2 gap-3">

                    <InfoItem
                        label="Quantity"
                        value={`${donation.quantity ?? "-"} ${donation.quantityUnit ?? ""}`}
                    />


                    <InfoItem
                        label="Created"
                        value={formatDate(
                            donation.createdAt
                        )}
                    />


                    <InfoItem
                        label="Prepared"
                        value={formatDateTime(
                            donation.preparedAt
                        )}
                    />


                    <InfoItem
                        label="Expires"
                        value={formatDateTime(
                            donation.expiresAt
                        )}
                    />

                </div>


                {/* =================================================
                    FOUNDATION
                ================================================= */}

                {donation.acceptedFoundationName && (

                    <div className="mt-4 rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-3">

                        <p className="text-[10px] uppercase tracking-wider text-gray-700">
                            Accepted by
                        </p>


                        <p className="mt-1 truncate text-xs font-medium text-gray-400">
                            {donation.acceptedFoundationName}
                        </p>

                    </div>

                )}


                {/* =================================================
                    LOCATION
                ================================================= */}

                {donation.pickupAddress && (

                    <p className="mt-4 truncate text-xs text-gray-600">
                        📍 {donation.pickupAddress}
                    </p>

                )}


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">

                    <span className="text-xs text-gray-700">
                        Donation #{donation.id}
                    </span>


                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 transition group-hover:text-emerald-400">

                        View details

                        <ArrowRight
                            size={14}
                            className="transition group-hover:translate-x-0.5"
                        />

                    </span>

                </div>

            </article>

        </button>
    );
}


/* =============================================================
   INFO ITEM
============================================================= */

function InfoItem({
    label,
    value
}) {

    return (

        <div className="rounded-xl border border-white/[0.05] bg-black/20 p-3">

            <p className="text-[10px] uppercase tracking-wider text-gray-700">
                {label}
            </p>


            <p className="mt-1 truncate text-xs font-medium text-gray-400">
                {value}
            </p>

        </div>
    );
}


/* =============================================================
   STATUS CONFIG
============================================================= */

function getStatusConfig(status) {

    switch (status) {

        case "AVAILABLE":

            return {
                label: "Available",
                className:
                    "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
            };


        case "ACCEPTED":

            return {
                label: "Accepted",
                className:
                    "border-blue-400/20 bg-blue-400/10 text-blue-400"
            };


        case "PICKED_UP":

            return {
                label: "Picked up",
                className:
                    "border-amber-400/20 bg-amber-400/10 text-amber-400"
            };


        case "DELIVERED":

            return {
                label: "Delivered",
                className:
                    "border-purple-400/20 bg-purple-400/10 text-purple-400"
            };


        default:

            return {
                label: status || "Unknown",
                className:
                    "border-white/10 bg-white/5 text-gray-400"
            };
    }
}


/* =============================================================
   DATE
============================================================= */

function formatDate(value) {

    if (!value) {
        return "-";
    }


    const date =
        new Date(value);


    if (Number.isNaN(
        date.getTime()
    )) {

        return "-";
    }


    return date.toLocaleDateString(
        undefined,
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =============================================================
   DATE + TIME
============================================================= */

function formatDateTime(value) {

    if (!value) {
        return "-";
    }


    const date =
        new Date(value);


    if (Number.isNaN(
        date.getTime()
    )) {

        return "-";
    }


    return date.toLocaleString(
        undefined,
        {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =============================================================
   SKELETON
============================================================= */

function DonationSkeleton() {

    return (

        <div className="animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div className="h-11 w-11 rounded-xl bg-white/[0.06]" />

                    <div>

                        <div className="h-4 w-36 rounded bg-white/[0.06]" />

                        <div className="mt-2 h-3 w-20 rounded bg-white/[0.04]" />

                    </div>

                </div>


                <div className="h-6 w-20 rounded-full bg-white/[0.05]" />

            </div>


            <div className="mt-6 grid grid-cols-2 gap-3">

                <div className="h-14 rounded-xl bg-white/[0.04]" />

                <div className="h-14 rounded-xl bg-white/[0.04]" />

                <div className="h-14 rounded-xl bg-white/[0.04]" />

                <div className="h-14 rounded-xl bg-white/[0.04]" />

            </div>

        </div>
    );
}


/* =============================================================
   EMPTY STATE
============================================================= */

function EmptyState({
    hasFilters,
    clearFilters
}) {

    return (

        <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/[0.015] px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-gray-600">

                <Package size={24} />

            </div>


            <h2 className="mt-6 text-lg font-semibold text-white">

                {hasFilters
                    ? "No matching donations"
                    : "No donations yet"
                }

            </h2>


            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">

                {hasFilters
                    ? "Try changing your search or status filter."
                    : "Your food donations will appear here once you create your first donation."
                }

            </p>


            {hasFilters ? (

                <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                    Clear filters
                </button>

            ) : (

                <Link
                    to="/donor/donations/create"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-300"
                >

                    <Plus size={16} />

                    Create your first donation

                </Link>

            )}

        </div>
    );
}


export default MyDonations;