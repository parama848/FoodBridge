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

            <div className="min-h-screen bg-[#F8FAFD] text-[#17233D]">

                <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-5">

                    <div className="w-full rounded-3xl border border-red-200 bg-white p-8 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">

                            <AlertCircle size={25} />

                        </div>


                        <h1 className="mt-6 text-xl font-bold">
                            Unable to load donation
                        </h1>


                        <p className="mt-2 text-sm leading-6 text-[#17233D]">
                            {error}
                        </p>


                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                            <button
                                type="button"
                                onClick={() => fetchDonation()}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9E1ED] px-5 py-3 text-sm font-bold text-[#17233D] transition hover:bg-[#F2F6FF] hover:text-[#17233D]"
                            >

                                <RefreshCw size={16} />

                                Try again

                            </button>


                            <Link
                                to="/donor/donations"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1557D6] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#0F46B5]"
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

        <div className="min-h-screen bg-[#F8FAFD] text-[#17233D]">

            <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">


                {/* =================================================
                    BACK
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        navigate("/donor/donations")
                    }
                    className="inline-flex items-center gap-2 text-sm text-[#17233D] transition hover:text-[#17233D]"
                >

                    <ArrowLeft size={16} />

                    My Donations

                </button>


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex items-start gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F2F6FF] text-[#1557D6]">

                            <UtensilsCrossed size={24} />

                        </div>


                        <div>

                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1557D6]">
                                Donation #{donation.id}
                            </p>


                            <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                                {donation.foodName}
                            </h1>


                            <p className="mt-2 text-sm text-[#17233D]">
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

                <section className="mt-8 rounded-3xl border border-[#E6EAF0] bg-white p-6 shadow-[0_4px_18px_rgba(23,35,61,0.04)] sm:p-8">

                    <div>

                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#17233D]">
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

                    <section className="rounded-3xl border border-[#E6EAF0] bg-white p-6 lg:col-span-2">

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

                    <section className="rounded-3xl border border-[#E6EAF0] bg-white p-6">

                        <SectionTitle
                            icon={CheckCircle2}
                            title="Foundation"
                        />


                        {donation.acceptedFoundationName ? (

                            <div className="mt-6">

                                <p className="text-xs text-[#17233D]">
                                    Accepted by
                                </p>


                                <p className="mt-2 text-sm font-bold text-[#17233D]">
                                    {donation.acceptedFoundationName}
                                </p>


                                {donation.acceptedFoundationId && (

                                    <p className="mt-2 text-xs text-[#17233D]">

                                        Foundation ID:{" "}

                                        {
                                            donation.acceptedFoundationId
                                        }

                                    </p>

                                )}

                            </div>

                        ) : (

                            <div className="mt-6 rounded-2xl border border-[#EEF1F5] bg-white p-4">

                                <Clock3
                                    size={18}
                                    className="text-[#17233D]"
                                />


                                <p className="mt-3 text-sm font-semibold text-[#17233D]">
                                    Waiting for a foundation
                                </p>


                                <p className="mt-1 text-xs leading-6 text-[#17233D]">
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

                    <section className="rounded-3xl border border-[#E6EAF0] bg-white p-6">

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

                    <section className="rounded-3xl border border-[#E6EAF0] bg-white p-6 lg:col-span-2">

                        <SectionTitle
                            icon={MapPin}
                            title="Pickup location"
                        />


                        <div className="mt-6 rounded-2xl border border-[#EEF1F5] bg-white p-5">

                            <p className="text-sm leading-7 text-[#17233D]">

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

                    <section className="rounded-3xl border border-[#E6EAF0] bg-white p-6 lg:col-span-3">

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
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D9E1ED] px-5 text-sm font-bold text-[#17233D] transition hover:bg-[#F2F6FF] hover:text-[#17233D]"
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
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D9E1ED] px-5 text-sm font-bold text-[#17233D] transition hover:bg-[#F2F6FF] hover:text-[#17233D] disabled:cursor-not-allowed disabled:opacity-50"
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

    if (status === "EXPIRED") {

        return (

            <div className="mt-7">

                <div className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-5">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-red-600 shadow-sm ring-1 ring-red-100">

                        <Clock3 size={18} />

                    </div>

                    <div>

                        <p className="text-sm font-bold text-[#17233D]">
                            Donation expired
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#53627A]">
                            This donation was not accepted before its expiry time.
                        </p>

                    </div>

                </div>

            </div>

        );
    }

    const currentIndex =
        Math.max(
            steps.findIndex(
                step => step.key === status
            ),
            0
        );

    return (

        <div className="mt-8">

            <style>
                {`
                    @keyframes foodbridgeStepIn {
                        0% {
                            opacity: 0;
                            transform: translateY(8px) scale(.96);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }

                    @keyframes foodbridgePulse {
                        0%, 100% {
                            box-shadow:
                                0 0 0 0 rgba(21, 87, 214, 0.18),
                                0 5px 16px rgba(21, 87, 214, 0.10);
                        }
                        50% {
                            box-shadow:
                                0 0 0 8px rgba(21, 87, 214, 0.05),
                                0 8px 22px rgba(21, 87, 214, 0.16);
                        }
                    }

                    @keyframes foodbridgeProgress {
                        from {
                            transform: scaleX(0);
                        }
                        to {
                            transform: scaleX(1);
                        }
                    }

                    .foodbridge-step-in {
                        animation: foodbridgeStepIn .45s ease-out both;
                    }

                    .foodbridge-active {
                        animation: foodbridgePulse 2s ease-in-out infinite;
                    }

                    .foodbridge-progress {
                        transform-origin: left center;
                        animation: foodbridgeProgress .8s cubic-bezier(.22,1,.36,1) both;
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .foodbridge-step-in,
                        .foodbridge-active,
                        .foodbridge-progress {
                            animation: none !important;
                        }
                    }
                `}
            </style>

            {/* =====================================================
                DESKTOP TIMELINE
            ===================================================== */}

            <div className="hidden md:block">

                <div className="relative px-3 pt-1">

                    {/* Track */}

                    <div className="absolute left-[10%] right-[10%] top-[25px] h-[3px] rounded-full bg-[#E7EDF6]" />

                    {/* Completed progress */}

                    {currentIndex > 0 && (

                        <div
                            className="foodbridge-progress absolute left-[10%] top-[25px] h-[3px] rounded-full bg-[#1557D6]"
                            style={{
                                width:
                                    `${(currentIndex / (steps.length - 1)) * 80}%`
                            }}
                        />

                    )}

                    <div className="relative grid grid-cols-4 gap-5">

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
                                        key={step.key}
                                        className="foodbridge-step-in flex flex-col items-center text-center"
                                        style={{
                                            animationDelay:
                                                `${index * 90}ms`
                                        }}
                                    >

                                        {/* Step icon */}

                                        <div
                                            className={`
                                                relative z-10 flex h-12 w-12 items-center
                                                justify-center rounded-full border-4 border-white
                                                transition-all duration-300
                                                ${
                                                    completed
                                                        ? "bg-[#1557D6] text-white shadow-[0_5px_16px_rgba(21,87,214,0.18)]"
                                                        : "bg-white text-[#66748A] ring-1 ring-[#D9E1ED]"
                                                }
                                                ${
                                                    current
                                                        ? "foodbridge-active"
                                                        : ""
                                                }
                                            `}
                                        >

                                            <Icon size={18} strokeWidth={2.2} />

                                            {current && (

                                                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#1557D6]" />

                                            )}

                                        </div>


                                        {/* Step content */}

                                        <div className="mt-4 max-w-[190px]">

                                            <div className="flex items-center justify-center gap-2">

                                                <p
                                                    className={`
                                                        text-sm font-extrabold
                                                        ${
                                                            completed
                                                                ? "text-[#17233D]"
                                                                : "text-[#66748A]"
                                                        }
                                                    `}
                                                >
                                                    {step.label}
                                                </p>

                                                {current && (

                                                    <span className="rounded-full bg-[#EAF1FF] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#1557D6]">
                                                        Current
                                                    </span>

                                                )}

                                            </div>

                                            <p
                                                className={`
                                                    mt-2 text-xs leading-5
                                                    ${
                                                        completed
                                                            ? "text-[#53627A]"
                                                            : "text-[#8A96A8]"
                                                    }
                                                `}
                                            >
                                                {step.description}
                                            </p>

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                </div>

            </div>


            {/* =====================================================
                MOBILE TIMELINE
            ===================================================== */}

            <div className="md:hidden">

                <div className="relative space-y-1">

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

                            const isLast =
                                index === steps.length - 1;

                            return (

                                <div
                                    key={step.key}
                                    className="foodbridge-step-in relative flex gap-4"
                                    style={{
                                        animationDelay:
                                            `${index * 90}ms`
                                    }}
                                >

                                    {/* Vertical connector */}

                                    {!isLast && (

                                        <div
                                            className={`
                                                absolute left-[22px] top-[48px] h-[calc(100%-24px)]
                                                w-[3px] rounded-full
                                                ${
                                                    currentIndex > index
                                                        ? "bg-[#1557D6]"
                                                        : "bg-[#E7EDF6]"
                                                }
                                            `}
                                        />

                                    )}


                                    {/* Icon */}

                                    <div
                                        className={`
                                            relative z-10 flex h-11 w-11 shrink-0 items-center
                                            justify-center rounded-full border-4 border-white
                                            ${
                                                completed
                                                    ? "bg-[#1557D6] text-white shadow-[0_5px_14px_rgba(21,87,214,0.16)]"
                                                    : "bg-white text-[#66748A] ring-1 ring-[#D9E1ED]"
                                            }
                                            ${
                                                current
                                                    ? "foodbridge-active"
                                                    : ""
                                            }
                                        `}
                                    >

                                        <Icon size={16} />

                                    </div>


                                    {/* Content */}

                                    <div className="min-w-0 flex-1 pb-7 pt-1">

                                        <div className="flex flex-wrap items-center gap-2">

                                            <p
                                                className={`
                                                    text-sm font-extrabold
                                                    ${
                                                        completed
                                                            ? "text-[#17233D]"
                                                            : "text-[#66748A]"
                                                    }
                                                `}
                                            >
                                                {step.label}
                                            </p>

                                            {current && (

                                                <span className="rounded-full bg-[#EAF1FF] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#1557D6]">
                                                    Current
                                                </span>

                                            )}

                                        </div>

                                        <p
                                            className={`
                                                mt-1 text-xs leading-5
                                                ${
                                                    completed
                                                        ? "text-[#53627A]"
                                                        : "text-[#8A96A8]"
                                                }
                                            `}
                                        >
                                            {step.description}
                                        </p>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

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

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F2F6FF] text-[#17233D]">

                <Icon size={17} />

            </div>


            <h2 className="text-sm font-bold text-[#17233D]">
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

        <div className="rounded-2xl border border-[#EEF1F5] bg-white p-4">

            <p className="text-[10px] font-bold uppercase tracking-wider text-[#17233D]">
                {label}
            </p>


            <p className="mt-2 break-words text-sm font-bold text-[#17233D]">
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

        <div className="rounded-xl border border-[#EEF1F5] px-3 py-2">

            <span className="text-[9px] font-bold uppercase tracking-wider text-[#17233D]">
                {label}
            </span>


            <p className="mt-1 text-xs text-[#17233D]">
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
                    "border-[#C9D8F2] bg-[#F2F6FF] text-[#1557D6]"

            };


        case "ACCEPTED":

            return {

                label: "Accepted",

                className:
                    "border-blue-200 bg-blue-50 text-blue-700"

            };


        case "PICKED_UP":

            return {

                label: "Picked up",

                className:
                    "border-amber-200 bg-amber-50 text-amber-700"

            };


        case "DELIVERED":

            return {

                label: "Delivered",

                className:
                    "border-purple-200 bg-purple-50 text-purple-700"

            };


        case "EXPIRED":

            return {

                label: "Expired",

                className:
                    "border-red-200 bg-red-50 text-red-700"

            };


        default:

            return {

                label:
                    status || "Unknown",

                className:
                    "border-[#D9E1ED] bg-white/5 text-[#17233D]"

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

        <div className="min-h-screen bg-[#F8FAFD] text-[#17233D]">

            <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">

                <div className="animate-pulse">

                    <div className="h-4 w-28 rounded bg-[#F2F6FF]" />


                    <div className="mt-8 flex items-center gap-4">

                        <div className="h-14 w-14 rounded-2xl bg-[#F2F6FF]" />

                        <div>

                            <div className="h-3 w-24 rounded bg-[#F2F6FF]" />

                            <div className="mt-3 h-7 w-56 rounded bg-[#EEF3FB]" />

                        </div>

                    </div>


                    <div className="mt-8 h-56 rounded-3xl border border-[#EEF1F5] bg-white" />


                    <div className="mt-6 grid gap-6 lg:grid-cols-3">

                        <div className="h-48 rounded-3xl bg-white lg:col-span-2" />

                        <div className="h-48 rounded-3xl bg-white" />

                    </div>

                </div>

            </main>

        </div>

    );

}


export default DonationDetails;