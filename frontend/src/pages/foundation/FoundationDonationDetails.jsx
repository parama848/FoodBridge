import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
    ArrowLeft,
    Check,
    CheckCircle2,
    Clock3,
    MapPin,
    Package,
    Truck,
    Utensils,
    AlertCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function FoundationDonationDetails() {

    const { donationId } = useParams();
    const navigate = useNavigate();

    const [donation, setDonation] = useState(null);

    const [loading, setLoading] = useState(true);

    const [processing, setProcessing] = useState(false);

    const [error, setError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");


    // =========================================================
    // FETCH DONATION
    // =========================================================

    const fetchDonation = async () => {

        try {

            setLoading(true);
            setError("");

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    `${API_URL}/donations/${donationId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            const data =
                response.data?.data;

            if (!data) {

                throw new Error(
                    "Donation data not found"
                );
            }

            setDonation(data);

        } catch (err) {

            console.error(
                "Failed to fetch donation:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load donation"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        if (donationId) {
            fetchDonation();
        }

    }, [donationId]);


    // =========================================================
    // REQUEST / ACCEPT DONATION
    // =========================================================

    const handleRequestDonation = async () => {

        if (!donation || processing) {
            return;
        }

        try {

            setProcessing(true);
            setError("");
            setSuccessMessage("");

            const token =
                localStorage.getItem("token");

            const response =
                await axios.post(
                    `${API_URL}/donations/${donation.id}/accept`,
                    {},
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            setDonation(
                response.data?.data
            );

            setSuccessMessage(
                "Donation accepted successfully."
            );

        } catch (err) {

            console.error(
                "Request donation error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to request this donation"
            );

        } finally {

            setProcessing(false);
        }
    };


    // =========================================================
    // MARK AS PICKED UP
    // =========================================================

    const handlePickup = async () => {

        if (!donation || processing) {
            return;
        }

        try {

            setProcessing(true);
            setError("");
            setSuccessMessage("");

            const token =
                localStorage.getItem("token");

            const response =
                await axios.put(
                    `${API_URL}/donations/${donation.id}/pickup`,
                    {},
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            setDonation(
                response.data?.data
            );

            setSuccessMessage(
                "Donation marked as picked up successfully."
            );

        } catch (err) {

            console.error(
                "Pickup error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to mark donation as picked up"
            );

        } finally {

            setProcessing(false);
        }
    };


    // =========================================================
    // MARK AS DELIVERED
    // =========================================================

    const handleDelivery = async () => {

        if (!donation || processing) {
            return;
        }

        try {

            setProcessing(true);
            setError("");
            setSuccessMessage("");

            const token =
                localStorage.getItem("token");

            const response =
                await axios.put(
                    `${API_URL}/donations/${donation.id}/deliver`,
                    {},
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            setDonation(
                response.data?.data
            );

            setSuccessMessage(
                "Donation delivered successfully."
            );

        } catch (err) {

            console.error(
                "Delivery error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to mark donation as delivered"
            );

        } finally {

            setProcessing(false);
        }
    };


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
    // STATUS LABEL
    // =========================================================

    const getStatusLabel = (status) => {

        switch (status) {

            case "AVAILABLE":
                return "AVAILABLE";

            case "ACCEPTED":
                return "ACCEPTED";

            case "PICKED_UP":
                return "PICKED UP";

            case "DELIVERED":
                return "DELIVERED";

            case "EXPIRED":
                return "EXPIRED";

            default:
                return status || "UNKNOWN";
        }
    };


    // =========================================================
    // STATUS DESCRIPTION
    // =========================================================

    const getStatusDescription = (status) => {

        switch (status) {

            case "AVAILABLE":
                return "This donation is available for your foundation to request.";

            case "ACCEPTED":
                return "Your foundation has accepted this donation. Arrange pickup from the donor.";

            case "PICKED_UP":
                return "The food has been picked up. Complete the delivery to the beneficiary.";

            case "DELIVERED":
                return "This donation has been successfully delivered.";

            case "EXPIRED":
                return "This donation has expired and is no longer available.";

            default:
                return "Donation status unavailable.";
        }
    };


    // =========================================================
    // STATUS COLORS
    // =========================================================

    const getStatusClass = (status) => {

        switch (status) {

            case "AVAILABLE":
                return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";

            case "ACCEPTED":
                return "border-blue-500/30 bg-blue-500/10 text-blue-400";

            case "PICKED_UP":
                return "border-amber-500/30 bg-amber-500/10 text-amber-400";

            case "DELIVERED":
                return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";

            case "EXPIRED":
                return "border-red-500/30 bg-red-500/10 text-red-400";

            default:
                return "border-white/10 bg-white/[0.03] text-slate-300";
        }
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="min-h-screen bg-[#050505] text-white">

                <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">

                    <div className="text-center">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />

                        <p className="mt-5 text-sm text-slate-400">
                            Loading donation...
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error && !donation) {

        return (
            <div className="min-h-screen bg-[#050505] text-white">

                <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6">

                    <div className="w-full rounded-3xl border border-red-500/20 bg-red-500/[0.04] p-10 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">

                            <AlertCircle
                                size={30}
                                className="text-red-400"
                            />

                        </div>

                        <h2 className="mt-6 text-2xl font-semibold">
                            Unable to load donation
                        </h2>

                        <p className="mt-3 text-slate-400">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/foundation/available-food"
                                )
                            }
                            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium transition hover:bg-white/5"
                        >
                            <ArrowLeft size={17} />
                            Back to Available Food
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    if (!donation) {
        return null;
    }


    // =========================================================
    // VALUES
    // =========================================================

    const quantity =
        donation.quantity ?? "—";

    const quantityUnit =
        donation.quantityUnit || "";

    const pickupAddress =
        donation.pickupAddress ||
        "Pickup location not available";

    const status =
        donation.status || "UNKNOWN";


    const isAvailable =
        status === "AVAILABLE";

    const isAccepted =
        status === "ACCEPTED";

    const isPickedUp =
        status === "PICKED_UP";

    const isDelivered =
        status === "DELIVERED";


    // =========================================================
    // PAGE
    // =========================================================

    return (
        <div className="min-h-screen bg-[#050505] text-white">

            <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

                {/* =================================================
                    BACK
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            isAvailable
                                ? "/foundation/available-food"
                                : "/foundation/donations"
                        )
                    }
                    className="mb-10 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >

                    <ArrowLeft size={18} />

                    {isAvailable
                        ? "Available Food"
                        : "My Donations"}

                </button>


                {/* =================================================
                    HEADER
                ================================================= */}

                <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                    <div className="flex items-center gap-5">

                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-emerald-500/10">

                            <Utensils
                                size={34}
                                className="text-emerald-400"
                            />

                        </div>

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400">
                                Food Donation
                            </p>

                            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                                {donation.foodName}
                            </h1>

                        </div>

                    </div>


                    {/* STATUS */}

                    <div
                        className={`inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold ${getStatusClass(
                            status
                        )}`}
                    >

                        <span
                            className={`h-2.5 w-2.5 rounded-full ${
                                isDelivered
                                    ? "bg-emerald-400"
                                    : isPickedUp
                                      ? "bg-amber-400"
                                      : isAccepted
                                        ? "bg-blue-400"
                                        : isAvailable
                                          ? "bg-emerald-400"
                                          : "bg-slate-500"
                            }`}
                        />

                        {getStatusLabel(status)}

                    </div>

                </section>


                {/* =================================================
                    MESSAGES
                ================================================= */}

                {error && (

                    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.04] px-5 py-4 text-sm text-red-300">

                        <AlertCircle size={18} />

                        {error}

                    </div>

                )}


                {successMessage && (

                    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] px-5 py-4 text-sm text-emerald-300">

                        <CheckCircle2 size={18} />

                        {successMessage}

                    </div>

                )}


                {/* =================================================
                    PROGRESS
                ================================================= */}

                <section className="mb-8 rounded-3xl border border-white/10 bg-white/[0.015] p-6 sm:p-8">

                    <div className="mb-7">

                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                            Donation Progress
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            {getStatusDescription(status)}
                        </p>

                    </div>


                    <div className="grid grid-cols-3 gap-3 sm:gap-6">

                        {/* ACCEPTED */}

                        <div className="text-center">

                            <div
                                className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border ${
                                    [
                                        "ACCEPTED",
                                        "PICKED_UP",
                                        "DELIVERED",
                                    ].includes(status)
                                        ? "border-blue-400/40 bg-blue-400/10 text-blue-400"
                                        : "border-white/10 bg-white/[0.03] text-gray-600"
                                }`}
                            >

                                {[
                                    "ACCEPTED",
                                    "PICKED_UP",
                                    "DELIVERED",
                                ].includes(status) ? (
                                    <Check size={18} />
                                ) : (
                                    <Package size={18} />
                                )}

                            </div>

                            <p className="mt-3 text-xs font-medium text-gray-400 sm:text-sm">
                                Accepted
                            </p>

                        </div>


                        {/* PICKED UP */}

                        <div className="text-center">

                            <div
                                className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border ${
                                    [
                                        "PICKED_UP",
                                        "DELIVERED",
                                    ].includes(status)
                                        ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                                        : "border-white/10 bg-white/[0.03] text-gray-600"
                                }`}
                            >

                                {[
                                    "PICKED_UP",
                                    "DELIVERED",
                                ].includes(status) ? (
                                    <Check size={18} />
                                ) : (
                                    <Truck size={18} />
                                )}

                            </div>

                            <p className="mt-3 text-xs font-medium text-gray-400 sm:text-sm">
                                Picked Up
                            </p>

                        </div>


                        {/* DELIVERED */}

                        <div className="text-center">

                            <div
                                className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border ${
                                    status === "DELIVERED"
                                        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                                        : "border-white/10 bg-white/[0.03] text-gray-600"
                                }`}
                            >

                                {status === "DELIVERED" ? (
                                    <Check size={18} />
                                ) : (
                                    <CheckCircle2 size={18} />
                                )}

                            </div>

                            <p className="mt-3 text-xs font-medium text-gray-400 sm:text-sm">
                                Delivered
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    MAIN GRID
                ================================================= */}

                <div className="grid gap-8 lg:grid-cols-[1fr_420px]">


                    {/* =================================================
                        FOOD INFORMATION
                    ================================================= */}

                    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.015]">

                        <div className="border-b border-white/10 px-8 py-7">

                            <h2 className="text-2xl font-semibold">
                                Food information
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Details provided by the donor.
                            </p>

                        </div>


                        <div className="grid gap-5 p-8 sm:grid-cols-2">

                            {/* FOOD TYPE */}

                            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">

                                <div className="flex items-center gap-3 text-slate-500">

                                    <Utensils size={22} />

                                    <span className="text-sm">
                                        Food type
                                    </span>

                                </div>

                                <p className="mt-6 text-lg font-semibold text-white">
                                    {donation.foodType ||
                                        "Not specified"}
                                </p>

                            </div>


                            {/* QUANTITY */}

                            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">

                                <div className="flex items-center gap-3 text-slate-500">

                                    <Package size={22} />

                                    <span className="text-sm">
                                        Quantity
                                    </span>

                                </div>

                                <p className="mt-6 text-lg font-semibold text-white">

                                    {quantity}{" "}

                                    {quantityUnit && (
                                        <span>
                                            {quantityUnit}
                                        </span>
                                    )}

                                </p>

                            </div>


                            {/* PREPARED */}

                            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">

                                <div className="flex items-center gap-3 text-slate-500">

                                    <Clock3 size={22} />

                                    <span className="text-sm">
                                        Prepared
                                    </span>

                                </div>

                                <p className="mt-6 text-lg font-semibold text-white">
                                    {formatDate(
                                        donation.preparedAt
                                    )}
                                </p>

                            </div>


                            {/* EXPIRES */}

                            <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-6">

                                <div className="flex items-center gap-3 text-red-400">

                                    <Clock3 size={22} />

                                    <span className="text-sm">
                                        Expires
                                    </span>

                                </div>

                                <p className="mt-6 text-lg font-semibold text-red-400">
                                    {formatDate(
                                        donation.expiresAt
                                    )}
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        ACTION PANEL
                    ================================================= */}

                    <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.015] p-8">

                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                            {isAvailable
                                ? "Pickup Information"
                                : "Donation Management"}
                        </p>


                        <h2 className="mt-4 text-2xl font-semibold">

                            {isAvailable
                                ? "Request this donation"
                                : isAccepted
                                  ? "Ready for pickup"
                                  : isPickedUp
                                    ? "Ready for delivery"
                                    : "Donation completed"}

                        </h2>


                        {/* PICKUP LOCATION */}

                        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6">

                            <div className="flex items-start gap-4">

                                <MapPin
                                    size={25}
                                    className="mt-1 shrink-0 text-emerald-400"
                                />

                                <div>

                                    <p className="text-xs uppercase tracking-wider text-slate-500">
                                        Pickup location
                                    </p>

                                    <p className="mt-3 text-base leading-7 text-slate-200">
                                        {pickupAddress}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            AVAILABLE
                        ================================================= */}

                        {isAvailable && (

                            <button
                                type="button"
                                disabled={processing}
                                onClick={handleRequestDonation}
                                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-6 py-4 text-base font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                {processing ? (

                                    <>
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />

                                        Requesting...
                                    </>

                                ) : (

                                    <>
                                        <CheckCircle2 size={20} />

                                        Request this donation
                                    </>

                                )}

                            </button>

                        )}


                        {/* =================================================
                            ACCEPTED
                        ================================================= */}

                        {isAccepted && (

                            <button
                                type="button"
                                disabled={processing}
                                onClick={handlePickup}
                                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-400 px-6 py-4 text-base font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                {processing ? (

                                    <>
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />

                                        Updating...
                                    </>

                                ) : (

                                    <>
                                        <Truck size={20} />

                                        Mark as Picked Up
                                    </>

                                )}

                            </button>

                        )}


                        {/* =================================================
                            PICKED UP
                        ================================================= */}

                        {isPickedUp && (

                            <button
                                type="button"
                                disabled={processing}
                                onClick={handleDelivery}
                                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-6 py-4 text-base font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                {processing ? (

                                    <>
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />

                                        Updating...
                                    </>

                                ) : (

                                    <>
                                        <CheckCircle2 size={20} />

                                        Mark as Delivered
                                    </>

                                )}

                            </button>

                        )}


                        {/* =================================================
                            DELIVERED
                        ================================================= */}

                        {isDelivered && (

                            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6">

                                <div className="flex items-start gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">

                                        <CheckCircle2
                                            size={22}
                                            className="text-emerald-400"
                                        />

                                    </div>

                                    <div>

                                        <p className="font-semibold text-emerald-300">
                                            Donation Delivered
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            This donation has been successfully delivered.
                                            No further action is required.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            EXPIRED
                        ================================================= */}

                        {status === "EXPIRED" && (

                            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">

                                <div className="flex items-start gap-4">

                                    <AlertCircle
                                        size={22}
                                        className="mt-1 shrink-0 text-red-400"
                                    />

                                    <div>

                                        <p className="font-semibold text-red-300">
                                            Donation Expired
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            This donation is no longer available
                                            for pickup.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        )}


                        {!isDelivered &&
                            status !== "EXPIRED" && (

                                <p className="mt-5 text-center text-xs leading-6 text-slate-500">

                                    {isAvailable
                                        ? "By requesting this donation, your foundation confirms that it can arrange pickup from the donor location."
                                        : isAccepted
                                          ? "Confirm this action only after your foundation has physically collected the food."
                                          : isPickedUp
                                            ? "Confirm this action after the food has been delivered to the beneficiary."
                                            : ""}

                                </p>

                            )}

                    </aside>

                </div>

            </main>

        </div>
    );
}

export default FoundationDonationDetails;