import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    CheckCircle2,
    Clock3,
    MapPin,
    Package,
    Truck,
    Utensils,
    AlertCircle,
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";

function MyFoundationDonations() {

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================================================
    // FETCH FOUNDATION DONATIONS
    // =========================================================

    const fetchDonations = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await axiosInstance.get(
                    "/donations/foundation/my"
                );

            const data =
                response.data?.data || [];

            setDonations(data);

        } catch (err) {

            console.error(
                "Failed to load foundation donations:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load your donations."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchDonations();

    }, []);


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }
        );
    };


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
                        "border-blue-500/20 bg-blue-500/10 text-blue-400",
                };

            case "PICKED_UP":

                return {
                    label: "Picked Up",
                    icon: Truck,
                    className:
                        "border-amber-500/20 bg-amber-500/10 text-amber-400",
                };

            case "DELIVERED":

                return {
                    label: "Delivered",
                    icon: CheckCircle2,
                    className:
                        "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
                };

            default:

                return {
                    label: status || "Unknown",
                    icon: Clock3,
                    className:
                        "border-white/10 bg-white/5 text-gray-400",
                };
        }
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="min-h-[70vh] bg-[#050505] text-white">

                <div className="flex min-h-[70vh] items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />

                        <p className="mt-4 text-sm text-gray-500">
                            Loading your donations...
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (
            <div className="min-h-[70vh] bg-[#050505] px-6 py-12 text-white">

                <div className="mx-auto max-w-4xl">

                    <div className="rounded-3xl border border-red-500/20 bg-red-500/[0.04] p-10 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">

                            <AlertCircle
                                size={26}
                                className="text-red-400"
                            />

                        </div>

                        <h2 className="mt-5 text-xl font-semibold">
                            Unable to load donations
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={fetchDonations}
                            className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    // =========================================================
    // PAGE
    // =========================================================

    return (
        <div className="min-h-[70vh] bg-[#050505] text-white">

            <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-10">

                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                        Foundation
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        My Donations
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                        Track food donations accepted by your foundation
                        from pickup through delivery.
                    </p>

                </div>


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {donations.length === 0 ? (

                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04]">

                            <Package
                                size={30}
                                className="text-gray-500"
                            />

                        </div>

                        <h2 className="mt-6 text-xl font-semibold">
                            No donations yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                            Donations you accept from the available food
                            section will appear here.
                        </p>

                        <Link
                            to="/foundation/available-food"
                            className="mt-7 inline-flex rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                        >
                            Browse Available Food
                        </Link>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {donations.map((donation) => {

                            const status =
                                getStatusConfig(
                                    donation.status
                                );

                            const StatusIcon =
                                status.icon;

                            return (

                                <article
                                    key={donation.id}
                                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.035]"
                                >

                                    {/* =================================
                                        TOP
                                    ================================= */}

                                    <div className="border-b border-white/10 p-6">

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="flex min-w-0 items-center gap-3">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">

                                                    <Utensils
                                                        size={20}
                                                        className="text-emerald-400"
                                                    />

                                                </div>

                                                <div className="min-w-0">

                                                    <h2 className="truncate text-lg font-semibold">
                                                        {donation.foodName}
                                                    </h2>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {donation.foodType}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* STATUS */}

                                            <div
                                                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${status.className}`}
                                            >

                                                <StatusIcon size={13} />

                                                {status.label}

                                            </div>

                                        </div>

                                    </div>


                                    {/* =================================
                                        DETAILS
                                    ================================= */}

                                    <div className="space-y-5 p-6">

                                        {/* QUANTITY */}

                                        <div className="flex items-start gap-3">

                                            <Package
                                                size={18}
                                                className="mt-0.5 shrink-0 text-gray-500"
                                            />

                                            <div>

                                                <p className="text-[11px] uppercase tracking-wider text-gray-600">
                                                    Quantity
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-200">
                                                    {donation.quantity}{" "}
                                                    {donation.quantityUnit}
                                                </p>

                                            </div>

                                        </div>


                                        {/* LOCATION */}

                                        <div className="flex items-start gap-3">

                                            <MapPin
                                                size={18}
                                                className="mt-0.5 shrink-0 text-gray-500"
                                            />

                                            <div>

                                                <p className="text-[11px] uppercase tracking-wider text-gray-600">
                                                    Pickup location
                                                </p>

                                                <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-300">
                                                    {donation.pickupAddress ||
                                                        "Location not available"}
                                                </p>

                                            </div>

                                        </div>


                                        {/* EXPIRY */}

                                        <div className="flex items-start gap-3">

                                            <Clock3
                                                size={18}
                                                className="mt-0.5 shrink-0 text-gray-500"
                                            />

                                            <div>

                                                <p className="text-[11px] uppercase tracking-wider text-gray-600">
                                                    Expires
                                                </p>

                                                <p className="mt-1 text-sm text-gray-300">
                                                    {formatDate(
                                                        donation.expiresAt
                                                    )}
                                                </p>

                                            </div>

                                        </div>


                                        {/* =================================
                                            PROGRESS
                                        ================================= */}

                                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

                                            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-gray-600">
                                                Donation progress
                                            </p>

                                            <div className="flex items-center">

                                                {/* ACCEPTED */}

                                                <div
                                                    className={`h-2 w-2 rounded-full ${
                                                        [
                                                            "ACCEPTED",
                                                            "PICKED_UP",
                                                            "DELIVERED",
                                                        ].includes(
                                                            donation.status
                                                        )
                                                            ? "bg-blue-400"
                                                            : "bg-gray-700"
                                                    }`}
                                                />

                                                <div
                                                    className={`h-px flex-1 ${
                                                        [
                                                            "PICKED_UP",
                                                            "DELIVERED",
                                                        ].includes(
                                                            donation.status
                                                        )
                                                            ? "bg-blue-400/50"
                                                            : "bg-gray-800"
                                                    }`}
                                                />

                                                {/* PICKED UP */}

                                                <div
                                                    className={`h-2 w-2 rounded-full ${
                                                        [
                                                            "PICKED_UP",
                                                            "DELIVERED",
                                                        ].includes(
                                                            donation.status
                                                        )
                                                            ? "bg-amber-400"
                                                            : "bg-gray-700"
                                                    }`}
                                                />

                                                <div
                                                    className={`h-px flex-1 ${
                                                        donation.status ===
                                                        "DELIVERED"
                                                            ? "bg-emerald-400/50"
                                                            : "bg-gray-800"
                                                    }`}
                                                />

                                                {/* DELIVERED */}

                                                <div
                                                    className={`h-2 w-2 rounded-full ${
                                                        donation.status ===
                                                        "DELIVERED"
                                                            ? "bg-emerald-400"
                                                            : "bg-gray-700"
                                                    }`}
                                                />

                                            </div>

                                            <div className="mt-3 flex justify-between text-[10px] text-gray-600">

                                                <span>
                                                    Accepted
                                                </span>

                                                <span>
                                                    Picked Up
                                                </span>

                                                <span>
                                                    Delivered
                                                </span>

                                            </div>

                                        </div>


                                        {/* =================================
                                            VIEW
                                        ================================= */}

                                        <Link
                                            to={`/foundation/donations/${donation.id}`}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                                        >
                                            View Donation
                                        </Link>

                                    </div>

                                </article>

                            );
                        })}

                    </div>

                )}

            </main>

        </div>
    );
}

export default MyFoundationDonations;