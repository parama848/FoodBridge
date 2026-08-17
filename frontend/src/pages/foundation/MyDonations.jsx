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


const myFoundationDonationsStyles = `
@keyframes myFoundationCardIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.my-foundation-card {
    animation: myFoundationCardIn .42s ease-out both;
}

@media (prefers-reduced-motion: reduce) {
    .my-foundation-card {
        animation: none !important;
    }
}
`;

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
                        "border-blue-200 bg-blue-50 text-blue-700",
                };

            case "PICKED_UP":

                return {
                    label: "Picked Up",
                    icon: Truck,
                    className:
                        "border-amber-200 bg-amber-50 text-amber-700",
                };

            case "DELIVERED":

                return {
                    label: "Delivered",
                    icon: CheckCircle2,
                    className:
                        "border-green-200 bg-green-50 text-[#1557D6]",
                };

            default:

                return {
                    label: status || "Unknown",
                    icon: Clock3,
                    className:
                        "border-[#E1E6EE] bg-[#F2F6FF] text-[#17233D]",
                };
        }
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="min-h-[70vh] bg-[#F8FAFD] text-[#17233D]">

                <div className="flex min-h-[70vh] items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#E1E6EE] border-t-emerald-400" />

                        <p className="mt-4 text-sm text-[#17233D]">
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
            <div className="min-h-[70vh] bg-[#F8FAFD] px-6 py-12 text-[#17233D]">

                <div className="mx-auto max-w-4xl">

                    <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">

                            <AlertCircle
                                size={26}
                                className="text-red-700"
                            />

                        </div>

                        <h2 className="mt-5 text-xl font-extrabold">
                            Unable to load donations
                        </h2>

                        <p className="mt-2 text-sm text-[#17233D]">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={fetchDonations}
                            className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#0F46B5]"
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
        <>
            <style>{myFoundationDonationsStyles}</style>
            <div className="min-h-[70vh] bg-[#F8FAFD] text-[#17233D]">

            <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-10">

                    <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#1557D6]">
                        Foundation
                    </p>

                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                        My Donations
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#17233D]">
                        Track food donations accepted by your foundation
                        from pickup through delivery.
                    </p>

                </div>


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {donations.length === 0 ? (

                    <div className="rounded-3xl border border-[#E1E6EE] bg-white px-6 py-16 text-center shadow-[0_6px_24px_rgba(23,35,61,0.05)]">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2F6FF]">

                            <Package
                                size={30}
                                className="text-[#17233D]"
                            />

                        </div>

                        <h2 className="mt-6 text-xl font-extrabold">
                            No donations yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#17233D]">
                            Donations you accept from the available food
                            section will appear here.
                        </p>

                        <Link
                            to="/foundation/available-food"
                            className="mt-7 inline-flex rounded-xl bg-[#1557D6] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#0F46B5]"
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
                                    className="my-foundation-card group overflow-hidden rounded-3xl border border-[#E1E6EE] bg-white shadow-[0_6px_24px_rgba(23,35,61,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#BFD0EA] hover:shadow-[0_12px_30px_rgba(23,35,61,0.09)]"
                                >

                                    {/* =================================
                                        TOP
                                    ================================= */}

                                    <div className="border-b border-[#E1E6EE] p-6">

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="flex min-w-0 items-center gap-3">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">

                                                    <Utensils
                                                        size={20}
                                                        className="text-[#1557D6]"
                                                    />

                                                </div>

                                                <div className="min-w-0">

                                                    <h2 className="truncate text-lg font-extrabold">
                                                        {donation.foodName}
                                                    </h2>

                                                    <p className="mt-1 text-xs text-[#17233D]">
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
                                                className="mt-0.5 shrink-0 text-[#17233D]"
                                            />

                                            <div>

                                                <p className="text-[11px] font-bold uppercase tracking-wider text-[#17233D]">
                                                    Quantity
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-[#17233D]">
                                                    {donation.quantity}{" "}
                                                    {donation.quantityUnit}
                                                </p>

                                            </div>

                                        </div>


                                        {/* LOCATION */}

                                        <div className="flex items-start gap-3">

                                            <MapPin
                                                size={18}
                                                className="mt-0.5 shrink-0 text-[#17233D]"
                                            />

                                            <div>

                                                <p className="text-[11px] font-bold uppercase tracking-wider text-[#17233D]">
                                                    Pickup location
                                                </p>

                                                <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#17233D]">
                                                    {donation.pickupAddress ||
                                                        "Location not available"}
                                                </p>

                                            </div>

                                        </div>


                                        {/* EXPIRY */}

                                        <div className="flex items-start gap-3">

                                            <Clock3
                                                size={18}
                                                className="mt-0.5 shrink-0 text-[#17233D]"
                                            />

                                            <div>

                                                <p className="text-[11px] font-bold uppercase tracking-wider text-[#17233D]">
                                                    Expires
                                                </p>

                                                <p className="mt-1 text-sm text-[#17233D]">
                                                    {formatDate(
                                                        donation.expiresAt
                                                    )}
                                                </p>

                                            </div>

                                        </div>


                                        {/* =================================
                                            PROGRESS
                                        ================================= */}

                                        <div className="rounded-2xl border border-[#E1E6EE] bg-[#F7F9FC] p-4">

                                            <p className="mb-4 text-[11px] font-extrabold uppercase tracking-wider text-[#17233D]">
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
                                                            ? "bg-[#1557D6]"
                                                            : "bg-[#D5DEEA]"
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
                                                            ? "bg-[#1557D6]/40"
                                                            : "bg-[#DCE4EF]"
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
                                                            ? "bg-[#D88A00]"
                                                            : "bg-[#D5DEEA]"
                                                    }`}
                                                />

                                                <div
                                                    className={`h-px flex-1 ${
                                                        donation.status ===
                                                        "DELIVERED"
                                                            ? "bg-[#1557D6]/50"
                                                            : "bg-[#DCE4EF]"
                                                    }`}
                                                />

                                                {/* DELIVERED */}

                                                <div
                                                    className={`h-2 w-2 rounded-full ${
                                                        donation.status ===
                                                        "DELIVERED"
                                                            ? "bg-[#1557D6]"
                                                            : "bg-[#D5DEEA]"
                                                    }`}
                                                />

                                            </div>

                                            <div className="mt-3 flex justify-between text-[10px] text-[#17233D]">

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
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D5DEEA] bg-white px-4 py-3 text-sm font-bold text-[#17233D] transition hover:border-[#1557D6] hover:bg-[#F2F6FF] hover:text-[#1557D6]"
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
        </>
    );
}

export default MyFoundationDonations;