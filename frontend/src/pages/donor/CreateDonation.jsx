import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    CalendarClock,
    CheckCircle2,
    Clock3,
    MapPin,
    Package,
    Send,
    UtensilsCrossed
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";


function CreateDonation() {

    const navigate = useNavigate();


    // =========================================================
    // FORM STATE
    // =========================================================

    const [form, setForm] = useState({
        foodName: "",
        foodType: "",
        quantity: "",
        quantityUnit: "KG",

        preparedDate: getTodayDate(),
        preparedTime: getCurrentTime(),

        expiryDate: getTodayDate(),
        expiryTime: "",

        pickupAddress: ""
    });


    // =========================================================
    // LOCATION STATE
    // =========================================================

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });


    const [locationLoading, setLocationLoading] =
        useState(false);

    const [locationDetected, setLocationDetected] =
        useState(false);

    const [locationError, setLocationError] =
        useState("");


    // =========================================================
    // UI STATE
    // =========================================================

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState(false);


    // =========================================================
    // HANDLE INPUT
    // =========================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setForm(previous => ({
            ...previous,
            [name]: value
        }));


        if (error) {
            setError("");
        }
    };


    // =========================================================
    // DETECT CURRENT LOCATION
    // =========================================================

    const detectLocation = () => {

        if (!navigator.geolocation) {

            setLocationError(
                "Location detection is not supported by your browser."
            );

            return;
        }


        setLocationLoading(true);

        setLocationDetected(false);

        setLocationError("");

        setError("");


        navigator.geolocation.getCurrentPosition(

            (position) => {

                const {
                    latitude,
                    longitude
                } = position.coords;


                setLocation({
                    latitude,
                    longitude
                });


                setLocationDetected(true);

                setLocationLoading(false);

            },

            (geoError) => {

                console.error(
                    "Location error:",
                    geoError
                );


                let message =
                    "Unable to detect your location.";


                switch (geoError.code) {

                    case geoError.PERMISSION_DENIED:

                        message =
                            "Location permission was denied. Please allow location access in your browser.";

                        break;


                    case geoError.POSITION_UNAVAILABLE:

                        message =
                            "Your current location could not be determined.";

                        break;


                    case geoError.TIMEOUT:

                        message =
                            "Location detection timed out. Please try again.";

                        break;


                    default:

                        message =
                            "Unable to detect your location. Please try again.";
                }


                setLocationError(message);

                setLocationLoading(false);

            },

            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        );
    };


    // =========================================================
    // CREATE DATE TIME
    // =========================================================

    const createDateTime =
        (
            date,
            time
        ) => {

            if (!date || !time) {
                return null;
            }


            return `${date}T${time}:00`;
        };


    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        setError("");

        setSuccess(false);


        // -----------------------------------------------------
        // REQUIRED FIELDS
        // -----------------------------------------------------

        if (
            !form.foodName.trim() ||
            !form.foodType.trim() ||
            !form.quantity ||
            !form.preparedDate ||
            !form.preparedTime ||
            !form.expiryDate ||
            !form.expiryTime ||
            !form.pickupAddress.trim()
        ) {

            setError(
                "Please complete all required fields."
            );

            return;
        }


        // -----------------------------------------------------
        // LOCATION
        // -----------------------------------------------------

        if (
            location.latitude === null ||
            location.longitude === null
        ) {

            setError(
                "Please detect your current location before creating the donation."
            );

            return;
        }


        // -----------------------------------------------------
        // QUANTITY
        // -----------------------------------------------------

        const quantity =
            Number(form.quantity);


        if (
            Number.isNaN(quantity) ||
            quantity <= 0
        ) {

            setError(
                "Quantity must be greater than zero."
            );

            return;
        }


        // -----------------------------------------------------
        // DATE TIME
        // -----------------------------------------------------

        const preparedAt =
            createDateTime(
                form.preparedDate,
                form.preparedTime
            );


        const expiresAt =
            createDateTime(
                form.expiryDate,
                form.expiryTime
            );


        if (
            !preparedAt ||
            !expiresAt
        ) {

            setError(
                "Please provide valid preparation and expiry times."
            );

            return;
        }


        const preparedDateTime =
            new Date(preparedAt);


        const expiryDateTime =
            new Date(expiresAt);


        // -----------------------------------------------------
        // EXPIRY VALIDATION
        // -----------------------------------------------------

        if (
            Number.isNaN(
                preparedDateTime.getTime()
            ) ||
            Number.isNaN(
                expiryDateTime.getTime()
            )
        ) {

            setError(
                "Please provide valid dates and times."
            );

            return;
        }


        if (
            expiryDateTime <=
            preparedDateTime
        ) {

            setError(
                "Expiry time must be after the preparation time."
            );

            return;
        }


        if (
            expiryDateTime <=
            new Date()
        ) {

            setError(
                "Expiry time must be in the future."
            );

            return;
        }


        // -----------------------------------------------------
        // REQUEST BODY
        // -----------------------------------------------------

        const request = {

            foodName:
                form.foodName.trim(),

            foodType:
                form.foodType.trim(),

            quantity:
                quantity,

            quantityUnit:
                form.quantityUnit,

            preparedAt:
                preparedAt,

            expiresAt:
                expiresAt,

            pickupAddress:
                form.pickupAddress.trim(),

            latitude:
                location.latitude,

            longitude:
                location.longitude
        };


        console.log(
            "Create donation request:",
            request
        );


        // -----------------------------------------------------
        // API CALL
        // POST /api/donations
        // -----------------------------------------------------

        try {

            setLoading(true);


            const response =
                await axiosInstance.post(
                    "/donations",
                    request
                );


            const apiResponse =
                response.data;


            if (!apiResponse.success) {

                throw new Error(
                    apiResponse.message ||
                    "Failed to create donation."
                );
            }


            setSuccess(true);

            toast.success(
                "Donation created successfully. Nearby verified foundations can now view it.",
                {
                    duration: 4000,
                }
            );


            // -------------------------------------------------
            // REDIRECT
            // -------------------------------------------------

            setTimeout(() => {

                navigate(
                    "/donor/dashboard"
                );

            }, 1200);

        } catch (err) {

            console.error(
                "Create donation error:",
                err
            );


            const backendMessage =
                err.response?.data?.message;


            const validationErrors =
                err.response?.data?.errors;


            if (
                validationErrors &&
                typeof validationErrors === "object"
            ) {

                const firstError =
                    Object.values(
                        validationErrors
                    )[0];


                const message =
                    firstError ||
                    backendMessage ||
                    "Please check your donation details.";

                setError(message);
                toast.error(message);

            } else {

                const message =
                    backendMessage ||
                    err.message ||
                    "Unable to create donation.";

                setError(message);
                toast.error(message);
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="min-h-screen bg-[#F8FAFD] text-[#17233D]">

            <main className="mx-auto max-w-4xl px-5 py-10 sm:px-6 lg:px-8">


                {/* =================================================
                    BACK
                ================================================= */}

                <Link
                    to="/donor/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-[#7B879A] transition hover:text-[#17233D]"
                >

                    <ArrowLeft size={16} />

                    Back to dashboard

                </Link>


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="mt-8">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1557D6]/10 text-[#1557D6]">

                        <UtensilsCrossed size={22} />

                    </div>


                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#1557D6]">
                        Food donation
                    </p>


                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Donate surplus food
                    </h1>


                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#7B879A] sm:text-base">
                        Share your surplus food with verified
                        foundations and help turn excess food into
                        meaningful meals.
                    </p>

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-6"
                >


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">

                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                            <p className="text-sm leading-6 text-red-700">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* =================================================
                        SUCCESS
                    ================================================= */}

                    {success && (

                        <div className="flex items-center gap-3 rounded-2xl border border-[#C9D8F2] bg-[#1557D6]/[0.05] p-4">

                            <CheckCircle2
                                size={20}
                                className="shrink-0 text-[#1557D6]"
                            />

                            <div>

                                <p className="text-sm font-semibold text-[#1557D6]">
                                    Donation created successfully
                                </p>

                                <p className="mt-1 text-xs text-[#1557D6]/60">
                                    Redirecting to your dashboard...
                                </p>

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        FOOD INFORMATION
                    ================================================= */}

                    <section className="overflow-hidden rounded-3xl border border-[#E1E6EE] bg-white shadow-[0_4px_18px_rgba(23,35,61,0.045)]">

                        <SectionHeader
                            icon={Package}
                            title="Food information"
                            description="Tell foundations what food is available."
                        />


                        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">


                            <InputField
                                label="Food name"
                                name="foodName"
                                value={form.foodName}
                                onChange={handleChange}
                                placeholder="Fresh Vegetable Biryani"
                                required
                            />


                            <div>

                                <label
                                    htmlFor="foodType"
                                    className="mb-2 block text-xs font-bold text-[#17233D]"
                                >
                                    Food type
                                    <span className="ml-1 font-extrabold text-[#1557D6]">
                                        *
                                    </span>
                                </label>


                                <select
                                    id="foodType"
                                    name="foodType"
                                    value={form.foodType}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-[#E1E6EE] bg-white px-4 py-3.5 text-sm text-[#17233D] outline-none transition focus:border-[#9FB8E8] focus:bg-[#F8FAFD] focus:ring-4 focus:ring-[#1557D6]/[0.06]"
                                >

                                    <option
                                        value=""
                                        className="bg-white"
                                    >
                                        Select food type
                                    </option>

                                    <option
                                        value="Cooked Food"
                                        className="bg-white"
                                    >
                                        Cooked Food
                                    </option>

                                    <option
                                        value="Packaged Food"
                                        className="bg-white"
                                    >
                                        Packaged Food
                                    </option>

                                    <option
                                        value="Bakery"
                                        className="bg-white"
                                    >
                                        Bakery
                                    </option>

                                    <option
                                        value="Fruits"
                                        className="bg-white"
                                    >
                                        Fruits
                                    </option>

                                    <option
                                        value="Vegetables"
                                        className="bg-white"
                                    >
                                        Vegetables
                                    </option>

                                    <option
                                        value="Other"
                                        className="bg-white"
                                    >
                                        Other
                                    </option>

                                </select>

                            </div>


                            <InputField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={form.quantity}
                                onChange={handleChange}
                                placeholder="15"
                                min="0.01"
                                step="0.01"
                                required
                            />


                            <div>

                                <label
                                    htmlFor="quantityUnit"
                                    className="mb-2 block text-xs font-bold text-[#17233D]"
                                >
                                    Quantity unit
                                    <span className="ml-1 font-extrabold text-[#1557D6]">
                                        *
                                    </span>
                                </label>


                                <select
                                    id="quantityUnit"
                                    name="quantityUnit"
                                    value={form.quantityUnit}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E1E6EE] bg-white px-4 py-3.5 text-sm text-[#17233D] outline-none transition focus:border-[#9FB8E8] focus:bg-[#F8FAFD] focus:ring-4 focus:ring-[#1557D6]/[0.06]"
                                >

                                    <option
                                        value="KG"
                                        className="bg-white"
                                    >
                                        Kilograms (KG)
                                    </option>

                                    <option
                                        value="LITRE"
                                        className="bg-white"
                                    >
                                        Litres
                                    </option>

                                    <option
                                        value="PACKET"
                                        className="bg-white"
                                    >
                                        Packets
                                    </option>

                                    <option
                                        value="PLATE"
                                        className="bg-white"
                                    >
                                        Plates
                                    </option>

                                    <option
                                        value="BOX"
                                        className="bg-white"
                                    >
                                        Boxes
                                    </option>

                                    <option
                                        value="PIECE"
                                        className="bg-white"
                                    >
                                        Pieces
                                    </option>

                                </select>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        FOOD TIMING
                    ================================================= */}

                    <section className="overflow-hidden rounded-3xl border border-[#E1E6EE] bg-white shadow-[0_4px_18px_rgba(23,35,61,0.045)]">

                        <SectionHeader
                            icon={CalendarClock}
                            title="Food timing"
                            description="Tell us when the food was prepared and when it should be consumed."
                        />


                        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">


                            {/* Prepared */}

                            <div className="rounded-2xl border border-[#E6EAF0] bg-[#F8FAFD] p-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F2F6FF] text-[#66748A]">

                                        <Clock3 size={17} />

                                    </div>


                                    <div>

                                        <p className="text-sm font-semibold text-[#17233D]">
                                            Prepared
                                        </p>

                                        <p className="mt-0.5 text-[10px] text-[#9AA4B3]">
                                            When was the food prepared?
                                        </p>

                                    </div>

                                </div>


                                <div className="mt-5 space-y-4">

                                    <InputField
                                        label="Date"
                                        name="preparedDate"
                                        type="date"
                                        value={form.preparedDate}
                                        onChange={handleChange}
                                        required
                                    />


                                    <TimeSelect
                                        label="Time"
                                        name="preparedTime"
                                        value={form.preparedTime}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* Expiry */}

                            <div className="rounded-2xl border border-[#E6EAF0] bg-[#F8FAFD] p-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1557D6]/10 text-[#1557D6]">

                                        <CalendarClock size={17} />

                                    </div>


                                    <div>

                                        <p className="text-sm font-semibold text-[#17233D]">
                                            Best before
                                        </p>

                                        <p className="mt-0.5 text-[10px] text-[#9AA4B3]">
                                            When should this food expire?
                                        </p>

                                    </div>

                                </div>


                                <div className="mt-5 space-y-4">

                                    <InputField
                                        label="Expiry date"
                                        name="expiryDate"
                                        type="date"
                                        value={form.expiryDate}
                                        onChange={handleChange}
                                        required
                                    />


                                    <TimeSelect
                                        label="Expiry time"
                                        name="expiryTime"
                                        value={form.expiryTime}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        LOCATION
                    ================================================= */}

                    <section className="overflow-hidden rounded-3xl border border-[#E1E6EE] bg-white shadow-[0_4px_18px_rgba(23,35,61,0.045)]">

                        <SectionHeader
                            icon={MapPin}
                            title="Pickup location"
                            description="Tell us where the foundation should collect the food."
                        />


                        <div className="space-y-6 p-6 sm:p-8">


                            {/* Detect location */}

                            <button
                                type="button"
                                onClick={detectLocation}
                                disabled={locationLoading}
                                className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#C9D8F2] bg-[#1557D6]/[0.05] px-5 text-sm font-semibold text-[#1557D6] transition hover:bg-[#1557D6]/[0.1] disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                <MapPin size={19} />

                                {locationLoading
                                    ? "Detecting your location..."
                                    : locationDetected
                                        ? "Detect location again"
                                        : "Use my current location"
                                }

                            </button>


                            {/* Location success */}

                            {locationDetected && (

                                <div className="rounded-2xl border border-[#DCE6F6] bg-[#1557D6]/[0.03] p-4">

                                    <div className="flex items-start gap-3">

                                        <CheckCircle2
                                            size={19}
                                            className="mt-0.5 shrink-0 text-[#1557D6]"
                                        />

                                        <div>

                                            <p className="text-sm font-semibold text-[#1557D6]">
                                                Location detected
                                            </p>

                                            <p className="mt-1 text-xs leading-6 text-[#9AA4B3]">
                                                Your coordinates have been
                                                captured securely and will
                                                be used to find nearby
                                                foundations.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* Location error */}

                            {locationError && (

                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                                    <p className="text-xs leading-6 text-red-700">
                                        {locationError}
                                    </p>

                                </div>

                            )}


                            {/* Address */}

                            <div>

                                <label
                                    htmlFor="pickupAddress"
                                    className="mb-2 block text-xs font-bold text-[#17233D]"
                                >

                                    Pickup address

                                    <span className="ml-1 font-extrabold text-[#1557D6]">
                                        *
                                    </span>

                                </label>


                                <textarea
                                    id="pickupAddress"
                                    name="pickupAddress"
                                    value={form.pickupAddress}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Example: 150 Anna Salai, Chennai"
                                    required
                                    className="w-full resize-none rounded-xl border border-[#E1E6EE] bg-white px-4 py-3.5 text-sm text-[#17233D] outline-none transition placeholder:text-[#66748A] focus:border-[#9FB8E8] focus:bg-[#F8FAFD] focus:ring-4 focus:ring-[#1557D6]/[0.06]"
                                />

                            </div>


                            {/* Explanation */}

                            <div className="rounded-2xl border border-[#E6EAF0] bg-[#F8FAFD] p-4">

                                <div className="flex items-start gap-3">

                                    <MapPin
                                        size={17}
                                        className="mt-0.5 shrink-0 text-[#7B879A]"
                                    />

                                    <p className="text-xs leading-6 text-[#9AA4B3]">

                                        FoodBridge uses your location
                                        automatically to determine which
                                        verified foundations are within
                                        the configured service radius.
                                        You don't need to enter latitude
                                        or longitude manually.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        FINAL INFORMATION
                    ================================================= */}

                    <div className="rounded-2xl border border-[#E6EAF0] bg-[#F8FAFD] p-5">

                        <div className="flex items-start gap-3">

                            <CheckCircle2
                                size={18}
                                className="mt-0.5 shrink-0 text-[#1557D6]"
                            />

                            <div>

                                <p className="text-sm font-semibold text-[#17233D]">
                                    Ready to donate?
                                </p>

                                <p className="mt-1 text-xs leading-6 text-[#9AA4B3]">
                                    Once submitted, your donation will become
                                    available to eligible verified foundations
                                    nearby.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                        <Link
                            to="/donor/dashboard"
                            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#E1E6EE] px-6 text-sm font-semibold text-[#66748A] transition hover:bg-[#F2F6FF] hover:text-[#17233D]"
                        >
                            Cancel
                        </Link>


                        <button
                            type="submit"
                            disabled={loading || success}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1557D6] px-7 text-sm font-bold text-white transition hover:bg-[#0F46B5] disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {loading ? (

                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                    Creating donation...

                                </>

                            ) : (

                                <>
                                    <Send size={16} />

                                    Create Donation

                                </>

                            )}

                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
}


/* =============================================================
   SECTION HEADER
============================================================= */

function SectionHeader({
    icon: Icon,
    title,
    description
}) {

    return (

        <div className="flex gap-4 border-b border-[#E6EAF0] px-6 py-5 sm:px-8">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6FF] text-[#66748A]">

                <Icon size={18} />

            </div>


            <div>

                <h2 className="text-sm font-semibold text-[#17233D]">
                    {title}
                </h2>

                <p className="mt-1 text-xs leading-5 text-[#9AA4B3]">
                    {description}
                </p>

            </div>

        </div>
    );
}


/* =============================================================
   TIME SELECTOR
============================================================= */

function TimeSelect({
    label,
    name,
    value,
    onChange,
    required = false
}) {

    const timeOptions = [];

    for (let hour = 0; hour < 24; hour++) {

        for (let minute = 0; minute < 60; minute += 15) {

            const valueHour =
                String(hour).padStart(2, "0");

            const valueMinute =
                String(minute).padStart(2, "0");

            const optionValue =
                `${valueHour}:${valueMinute}`;

            const displayHour =
                hour % 12 || 12;

            const period =
                hour < 12 ? "AM" : "PM";

            const displayValue =
                `${displayHour}:${valueMinute} ${period}`;

            timeOptions.push({
                value: optionValue,
                label: displayValue
            });
        }
    }

    return (

        <div>

            <label
                htmlFor={name}
                className="mb-2 block text-xs font-bold text-[#17233D]"
            >

                {label}

                {required && (

                    <span className="ml-1 font-extrabold text-[#1557D6]">
                        *
                    </span>

                )}

            </label>


            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full appearance-none rounded-xl border border-[#E1E6EE] bg-white px-4 py-3.5 text-sm font-semibold text-[#17233D] outline-none transition focus:border-[#9FB8E8] focus:bg-[#F8FAFD] focus:ring-4 focus:ring-[#1557D6]/[0.06]"
            >

                <option
                    value=""
                    disabled
                >
                    Choose a time
                </option>

                {timeOptions.map((time) => (

                    <option
                        key={time.value}
                        value={time.value}
                    >
                        {time.label}
                    </option>

                ))}

            </select>

            <p className="mt-2 text-[11px] font-medium text-[#66748A]">
                Choose a time in 15-minute intervals
            </p>

        </div>
    );
}


/* =============================================================
   INPUT FIELD
============================================================= */

function InputField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    min,
    step
}) {

    return (

        <div>

            <label
                htmlFor={name}
                className="mb-2 block text-xs font-bold text-[#17233D]"
            >

                {label}

                {required && (

                    <span className="ml-1 font-extrabold text-[#1557D6]">
                        *
                    </span>

                )}

            </label>


            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                min={min}
                step={step}
                className="w-full rounded-xl border border-[#E1E6EE] bg-white px-4 py-3.5 text-sm text-[#17233D] outline-none transition placeholder:text-[#66748A] focus:border-[#9FB8E8] focus:bg-[#F8FAFD] focus:ring-4 focus:ring-[#1557D6]/[0.06]"
            />

        </div>
    );
}


/* =============================================================
   TODAY
============================================================= */

function getTodayDate() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            now.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;
}


/* =============================================================
   CURRENT TIME
============================================================= */

function getCurrentTime() {

    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const roundedMinutes =
        Math.floor(
            now.getMinutes() / 15
        ) * 15;


    const minutes =
        String(
            roundedMinutes
        ).padStart(2, "0");


    return `${hours}:${minutes}`;
}


export default CreateDonation;