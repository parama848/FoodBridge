import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    AlertCircle,
    ArrowLeft,
    CalendarClock,
    CheckCircle2,
    Clock3,
    MapPin,
    Package,
    RefreshCw,
    Truck,
    UtensilsCrossed
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";


function DonationDetails() {

    const { donationId } = useParams();

    const navigate = useNavigate();


    // =========================================================
    // STATE
    // =========================================================

    const [donation, setDonation] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [refreshing, setRefreshing] = useState(false);


    // =========================================================
    // FETCH DONATION
    // GET /api/donations/{donationId}
    // =========================================================

    const fetchDonation = async (isRefresh = false) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");


            const response =
                await axiosInstance.get(
                    `/donations/${donationId}`
                );


            const apiResponse =
                response.data;


            if (!apiResponse.success) {

                throw new Error(
                    apiResponse.message ||
                    "Unable to retrieve donation."
                );

            }


            setDonation(
                apiResponse.data
            );


        } catch (err) {

            console.error(
                "Donation details error:",
                err
            );


            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to load donation details."
            );


        } finally {

            if (isRefresh) {
                setRefreshing(false);
            } else {
                setLoading(false);
            }

        }

    };


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        if (!donationId) {

            setError(
                "Donation ID is missing."
            );

            setLoading(false);

            return;
        }


        fetchDonation();

    }, [donationId]);


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <LoadingState />
        );

    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error && !donation) {

        return (

            <div className="min-h-screen bg-[#050505] text-white">

                <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-5">

                    <div className="w-full rounded-3xl border border-red-400/10 bg-white/[0.02] p-8 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10 text-red-400">

                            <AlertCircle size={25} />

                        </div>


                        <h1 className="mt-6 text-xl font-bold">
                            Unable to load donation
                        </h1>


                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            {error}
                        </p>


                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                            <button
                                type="button"
                                onClick={() => fetchDonation()}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
                            >

                                <RefreshCw size={16} />

                                Try again

                            </button>


                            <Link
                                to="/donor/donations"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-300"
                            >

                                <ArrowLeft size={16} />

                                My Donations

                            </Link>

                        </div>

                    </div>

                </main>

            </div>

        );

    }


    // =========================================================
    // NO DATA
    // =========================================================

    if (!donation) {
        return null;
    }


    const status =
        getStatusConfig(
            donation.status
        );


    return (

        <div className="min-h-screen bg-[#050505] text-white">

            <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">


                {/* =================================================
                    BACK
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        navigate("/donor/donations")
                    }
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
                >

                    <ArrowLeft size={16} />

                    My Donations

                </button>


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex items-start gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">

                            <UtensilsCrossed size={24} />

                        </div>


                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                                Donation #{donation.id}
                            </p>


                            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                                {donation.foodName}
                            </h1>


                            <p className="mt-2 text-sm text-gray-600">
                                {donation.foodType}
                            </p>

                        </div>

                    </div>


                    <span
                        className={`
                            inline-flex w-fit rounded-full border px-4 py-2
                            text-xs font-bold uppercase tracking-wide
                            ${status.className}
                        `}
                    >
                        {status.label}
                    </span>

                </div>


                {/* =================================================
                    STATUS TIMELINE
                ================================================= */}

                <section className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">

                    <div>

                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
                            Donation progress
                        </p>


                        <h2 className="mt-2 text-lg font-semibold">
                            Track your donation
                        </h2>

                    </div>


                    <DonationTimeline
                        status={donation.status}
                    />

                </section>


                {/* =================================================
                    MAIN GRID
                ================================================= */}

                <div className="mt-6 grid gap-6 lg:grid-cols-3">


                    {/* =================================================
                        FOOD INFORMATION
                    ================================================= */}

                    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 lg:col-span-2">

                        <SectionTitle
                            icon={Package}
                            title="Food information"
                        />


                        <div className="mt-6 grid gap-4 sm:grid-cols-2">

                            <DetailCard
                                label="Food name"
                                value={
                                    donation.foodName
                                }
                            />


                            <DetailCard
                                label="Food type"
                                value={
                                    donation.foodType
                                }
                            />


                            <DetailCard
                                label="Quantity"
                                value={`
                                    ${donation.quantity ?? "-"}
                                    ${donation.quantityUnit ?? ""}
                                `}
                            />


                            <DetailCard
                                label="Status"
                                value={
                                    status.label
                                }
                            />

                        </div>

                    </section>


                    {/* =================================================
                        FOUNDATION
                    ================================================= */}

                    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6">

                        <SectionTitle
                            icon={CheckCircle2}
                            title="Foundation"
                        />


                        {donation.acceptedFoundationName ? (

                            <div className="mt-6">

                                <p className="text-xs text-gray-700">
                                    Accepted by
                                </p>


                                <p className="mt-2 text-sm font-semibold text-white">
                                    {donation.acceptedFoundationName}
                                </p>


                                {donation.acceptedFoundationId && (

                                    <p className="mt-2 text-xs text-gray-600">

                                        Foundation ID:{" "}

                                        {
                                            donation.acceptedFoundationId
                                        }

                                    </p>

                                )}

                            </div>

                        ) : (

                            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/20 p-4">

                                <Clock3
                                    size={18}
                                    className="text-gray-600"
                                />


                                <p className="mt-3 text-sm font-medium text-gray-400">
                                    Waiting for a foundation
                                </p>


                                <p className="mt-1 text-xs leading-6 text-gray-700">
                                    Nearby verified foundations
                                    can discover your available
                                    donation.
                                </p>

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        TIMING
                    ================================================= */}

                    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6">

                        <SectionTitle
                            icon={CalendarClock}
                            title="Food timing"
                        />


                        <div className="mt-6 space-y-4">

                            <DetailCard
                                label="Prepared"
                                value={formatDateTime(
                                    donation.preparedAt
                                )}
                            />


                            <DetailCard
                                label="Expires"
                                value={formatDateTime(
                                    donation.expiresAt
                                )}
                            />

                        </div>

                    </section>


                    {/* =================================================
                        PICKUP LOCATION
                    ================================================= */}

                    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 lg:col-span-2">

                        <SectionTitle
                            icon={MapPin}
                            title="Pickup location"
                        />


                        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/20 p-5">

                            <p className="text-sm leading-7 text-gray-400">

                                {donation.pickupAddress ||
                                    "Pickup address not available."}

                            </p>


                            {donation.latitude !== null &&
                                donation.latitude !== undefined &&
                                donation.longitude !== null &&
                                donation.longitude !== undefined && (

                                    <div className="mt-5 flex flex-wrap gap-3">

                                        <Coordinate
                                            label="Latitude"
                                            value={
                                                donation.latitude
                                            }
                                        />


                                        <Coordinate
                                            label="Longitude"
                                            value={
                                                donation.longitude
                                            }
                                        />

                                    </div>

                                )}

                        </div>

                    </section>


                    {/* =================================================
                        DONATION INFORMATION
                    ================================================= */}

                    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 lg:col-span-3">

                        <SectionTitle
                            icon={Clock3}
                            title="Donation information"
                        />


                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            <DetailCard
                                label="Donation ID"
                                value={`#${donation.id}`}
                            />


                            <DetailCard
                                label="Created"
                                value={formatDateTime(
                                    donation.createdAt
                                )}
                            />


                            <DetailCard
                                label="Last updated"
                                value={formatDateTime(
                                    donation.updatedAt
                                )}
                            />


                            <DetailCard
                                label="Current status"
                                value={status.label}
                            />

                        </div>

                    </section>

                </div>


                {/* =================================================
                    FOOTER ACTION
                ================================================= */}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">

                    <Link
                        to="/donor/donations"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
                    >

                        <ArrowLeft size={16} />

                        Back to My Donations

                    </Link>


                    <button
                        type="button"
                        disabled={refreshing}
                        onClick={() =>
                            fetchDonation(true)
                        }
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <RefreshCw
                            size={16}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        {refreshing
                            ? "Refreshing..."
                            : "Refresh status"}

                    </button>

                </div>

            </main>

        </div>

    );
}


/* =============================================================
   TIMELINE
============================================================= */

function DonationTimeline({ status }) {

    const steps = [

        {
            key: "AVAILABLE",
            label: "Available",
            description:
                "Your donation is available for nearby foundations.",
            icon: Package
        },

        {
            key: "ACCEPTED",
            label: "Accepted",
            description:
                "A foundation has accepted your donation.",
            icon: CheckCircle2
        },

        {
            key: "PICKED_UP",
            label: "Picked up",
            description:
                "The foundation has collected the food.",
            icon: Truck
        },

        {
            key: "DELIVERED",
            label: "Delivered",
            description:
                "The food has been delivered successfully.",
            icon: CheckCircle2
        }

    ];


    // =========================================================
    // EXPIRED
    // =========================================================

    if (status === "EXPIRED") {

        return (

            <div className="mt-8">

                <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.04] p-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-400/30 bg-red-400/10 text-red-400">

                            <Clock3 size={17} />

                        </div>


                        <div>

                            <p className="text-sm font-semibold text-red-400">
                                Donation expired
                            </p>


                            <p className="mt-1 text-xs leading-6 text-gray-600">
                                This donation was not accepted before
                                its expiry time.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    const currentIndex =
        steps.findIndex(
            step =>
                step.key === status
        );


    return (

        <div className="mt-8">


            {/* =================================================
                DESKTOP
            ================================================= */}

            <div className="hidden md:block">

                <div className="relative">

                    {/* Background line */}

                    <div className="absolute left-[7%] right-[7%] top-5 h-px bg-white/[0.08]" />


                    {/* Progress line */}

                    <div
                        className="absolute left-[7%] top-5 h-px bg-emerald-400 transition-all duration-500"
                        style={{
                            width:
                                currentIndex <= 0
                                    ? "0%"
                                    : `${(currentIndex / (steps.length - 1)) * 86}%`
                        }}
                    />


                    <div className="relative grid grid-cols-4">

                        {steps.map(
                            (
                                step,
                                index
                            ) => {

                                const Icon =
                                    step.icon;


                                const completed =
                                    currentIndex >= index;


                                const current =
                                    currentIndex === index;


                                return (

                                    <div
                                        key={
                                            step.key
                                        }
                                        className="flex flex-col items-center text-center"
                                    >

                                        <div
                                            className={`
                                                flex h-10 w-10 items-center justify-center
                                                rounded-full border transition
                                                ${
                                                    completed
                                                        ? "border-emerald-400 bg-emerald-400 text-black"
                                                        : "border-white/10 bg-[#0b0b0b] text-gray-700"
                                                }
                                            `}
                                        >

                                            <Icon
                                                size={17}
                                            />

                                        </div>


                                        <p
                                            className={`
                                                mt-4 text-xs font-semibold
                                                ${
                                                    completed
                                                        ? "text-white"
                                                        : "text-gray-700"
                                                }
                                            `}
                                        >
                                            {step.label}
                                        </p>


                                        <p
                                            className={`
                                                mt-1 max-w-[150px] text-[10px] leading-5
                                                ${
                                                    current
                                                        ? "text-gray-500"
                                                        : "text-gray-800"
                                                }
                                            `}
                                        >
                                            {
                                                step.description
                                            }
                                        </p>

                                    </div>

                                );

                            }
                        )}

                    </div>

                </div>

            </div>


            {/* =================================================
                MOBILE
            ================================================= */}

            <div className="space-y-5 md:hidden">

                {steps.map(
                    (
                        step,
                        index
                    ) => {

                        const Icon =
                            step.icon;


                        const completed =
                            currentIndex >= index;


                        const current =
                            currentIndex === index;


                        return (

                            <div
                                key={
                                    step.key
                                }
                                className="flex gap-4"
                            >

                                <div className="flex flex-col items-center">

                                    <div
                                        className={`
                                            flex h-9 w-9 shrink-0 items-center justify-center
                                            rounded-full border
                                            ${
                                                completed
                                                    ? "border-emerald-400 bg-emerald-400 text-black"
                                                    : "border-white/10 bg-white/[0.02] text-gray-700"
                                            }
                                        `}
                                    >

                                        <Icon
                                            size={15}
                                        />

                                    </div>


                                    {index <
                                        steps.length - 1 && (

                                        <div
                                            className={`
                                                mt-2 h-full min-h-8 w-px
                                                ${
                                                    currentIndex >
                                                    index
                                                        ? "bg-emerald-400"
                                                        : "bg-white/[0.07]"
                                                }
                                            `}
                                        />

                                    )}

                                </div>


                                <div className="pb-3">

                                    <p
                                        className={`
                                            text-sm font-semibold
                                            ${
                                                completed
                                                    ? "text-white"
                                                    : "text-gray-700"
                                            }
                                        `}
                                    >
                                        {
                                            step.label
                                        }
                                    </p>


                                    <p
                                        className={`
                                            mt-1 text-xs leading-6
                                            ${
                                                current
                                                    ? "text-gray-500"
                                                    : "text-gray-800"
                                            }
                                        `}
                                    >
                                        {
                                            step.description
                                        }
                                    </p>

                                </div>

                            </div>

                        );

                    }
                )}

            </div>

        </div>

    );
}


/* =============================================================
   SECTION TITLE
============================================================= */

function SectionTitle({
    icon: Icon,
    title
}) {

    return (

        <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-gray-500">

                <Icon size={17} />

            </div>


            <h2 className="text-sm font-semibold text-white">
                {title}
            </h2>

        </div>

    );

}


/* =============================================================
   DETAIL CARD
============================================================= */

function DetailCard({
    label,
    value
}) {

    return (

        <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">

            <p className="text-[10px] uppercase tracking-wider text-gray-700">
                {label}
            </p>


            <p className="mt-2 break-words text-sm font-medium text-gray-400">
                {value || "-"}
            </p>

        </div>

    );

}


/* =============================================================
   COORDINATE
============================================================= */

function Coordinate({
    label,
    value
}) {

    return (

        <div className="rounded-xl border border-white/[0.06] px-3 py-2">

            <span className="text-[9px] uppercase tracking-wider text-gray-700">
                {label}
            </span>


            <p className="mt-1 text-xs text-gray-500">
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


        case "EXPIRED":

            return {

                label: "Expired",

                className:
                    "border-red-400/20 bg-red-400/10 text-red-400"

            };


        default:

            return {

                label:
                    status || "Unknown",

                className:
                    "border-white/10 bg-white/5 text-gray-400"

            };

    }

}


/* =============================================================
   FORMAT DATE + TIME
============================================================= */

function formatDateTime(value) {

    if (!value) {
        return "-";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "-";

    }


    return date.toLocaleString(
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

}


/* =============================================================
   LOADING
============================================================= */

function LoadingState() {

    return (

        <div className="min-h-screen bg-[#050505] text-white">

            <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">

                <div className="animate-pulse">

                    <div className="h-4 w-28 rounded bg-white/[0.06]" />


                    <div className="mt-8 flex items-center gap-4">

                        <div className="h-14 w-14 rounded-2xl bg-white/[0.06]" />

                        <div>

                            <div className="h-3 w-24 rounded bg-white/[0.05]" />

                            <div className="mt-3 h-7 w-56 rounded bg-white/[0.07]" />

                        </div>

                    </div>


                    <div className="mt-8 h-56 rounded-3xl border border-white/[0.05] bg-white/[0.02]" />


                    <div className="mt-6 grid gap-6 lg:grid-cols-3">

                        <div className="h-48 rounded-3xl bg-white/[0.02] lg:col-span-2" />

                        <div className="h-48 rounded-3xl bg-white/[0.02]" />

                    </div>

                </div>

            </main>

        </div>

    );

}


export default DonationDetails;