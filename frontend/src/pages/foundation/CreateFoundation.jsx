import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    MapPin,
    Send
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";


function CreateFoundation() {

    const navigate = useNavigate();


    // =========================================================
    // FORM
    // =========================================================

    const [form, setForm] = useState({

        organizationName: "",

        registrationNumber: "",

        address: "",

        city: "",

        state: "",

        pincode: ""

    });


    // =========================================================
    // LOCATION
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
    // UI
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


        setError("");
    };


    // =========================================================
    // DETECT LOCATION
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
                            "Unable to detect your location.";
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
    // SUBMIT
    // POST /api/foundations
    // =========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        setError("");


        // -----------------------------------------------------
        // LOCATION REQUIRED
        // -----------------------------------------------------

        if (
            location.latitude === null ||
            location.longitude === null
        ) {

            setError(
                "Please detect your foundation's current location."
            );

            return;
        }


        // -----------------------------------------------------
        // PINCODE
        // -----------------------------------------------------

        if (
            !/^[0-9]{6}$/.test(
                form.pincode
            )
        ) {

            setError(
                "Pincode must contain exactly 6 digits."
            );

            return;
        }


        // -----------------------------------------------------
        // REQUEST BODY
        // -----------------------------------------------------

        const request = {

            organizationName:
                form.organizationName.trim(),

            registrationNumber:
                form.registrationNumber.trim(),

            address:
                form.address.trim(),

            city:
                form.city.trim(),

            state:
                form.state.trim(),

            pincode:
                form.pincode.trim(),

            latitude:
                location.latitude,

            longitude:
                location.longitude

        };


        console.log(
            "Create foundation request:",
            request
        );


        // -----------------------------------------------------
        // API
        // -----------------------------------------------------

        try {

            setLoading(true);


            const response =
                await axiosInstance.post(
                    "/foundations",
                    request
                );


            const apiResponse =
                response.data;


            if (!apiResponse.success) {

                throw new Error(
                    apiResponse.message ||
                    "Unable to create foundation profile."
                );
            }


            setSuccess(true);


            // -------------------------------------------------
            // REDIRECT
            // -------------------------------------------------

            setTimeout(() => {

                navigate(
                    "/foundation/profile"
                );

            }, 1200);


        } catch (err) {

            console.error(
                "Create foundation error:",
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


                setError(
                    firstError ||
                    backendMessage ||
                    "Please check your foundation details."
                );

            } else {

                setError(
                    backendMessage ||
                    err.message ||
                    "Unable to create foundation profile."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="min-h-screen bg-[#050505] text-white">

            <main className="mx-auto max-w-4xl px-5 py-10 sm:px-6 lg:px-8">


                {/* =================================================
                    BACK
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        navigate("/home")
                    }
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
                >

                    <ArrowLeft size={16} />

                    Back

                </button>


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mt-8">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">

                        <Building2 size={22} />

                    </div>


                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                        Foundation registration
                    </p>


                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Create your foundation profile
                    </h1>


                    <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                        Tell us about your organization so FoodBridge
                        can verify your foundation and connect you with
                        nearby food donations.
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

                        <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.04] p-4">

                            <p className="text-sm leading-6 text-red-300">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* =================================================
                        SUCCESS
                    ================================================= */}

                    {success && (

                        <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4">

                            <CheckCircle2
                                size={19}
                                className="shrink-0 text-emerald-400"
                            />


                            <div>

                                <p className="text-sm font-semibold text-emerald-300">
                                    Foundation profile submitted
                                </p>


                                <p className="mt-1 text-xs text-emerald-400/60">
                                    Your profile has been submitted
                                    for verification.
                                </p>

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        ORGANIZATION
                    ================================================= */}

                    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">

                        <SectionHeader
                            icon={Building2}
                            title="Organization information"
                            description="Provide your official foundation details."
                        />


                        <div className="grid gap-6 p-6 sm:p-8">


                            <InputField
                                label="Organization name"
                                name="organizationName"
                                value={
                                    form.organizationName
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Hope Food Relief Foundation"
                                maxLength={150}
                                required
                            />


                            <InputField
                                label="Registration number"
                                name="registrationNumber"
                                value={
                                    form.registrationNumber
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter official registration number"
                                maxLength={100}
                                required
                            />

                        </div>

                    </section>


                    {/* =================================================
                        LOCATION
                    ================================================= */}

                    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">

                        <SectionHeader
                            icon={MapPin}
                            title="Foundation location"
                            description="Your location helps FoodBridge find nearby donations."
                        />


                        <div className="space-y-6 p-6 sm:p-8">


                            {/* Address */}

                            <InputField
                                label="Address"
                                name="address"
                                value={
                                    form.address
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="150 Anna Salai"
                                maxLength={255}
                                required
                            />


                            {/* City / State */}

                            <div className="grid gap-6 sm:grid-cols-2">

                                <InputField
                                    label="City"
                                    name="city"
                                    value={
                                        form.city
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Chennai"
                                    maxLength={100}
                                    required
                                />


                                <InputField
                                    label="State"
                                    name="state"
                                    value={
                                        form.state
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Tamil Nadu"
                                    maxLength={100}
                                    required
                                />

                            </div>


                            {/* Pincode */}

                            <InputField
                                label="Pincode"
                                name="pincode"
                                value={
                                    form.pincode
                                }
                                onChange={handleChange}
                                placeholder="600002"
                                maxLength={6}
                                inputMode="numeric"
                                required
                            />


                            {/* =================================================
                                CURRENT LOCATION
                            ================================================= */}

                            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">

                                <div className="flex items-start gap-4">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">

                                        <MapPin size={18} />

                                    </div>


                                    <div className="flex-1">

                                        <h3 className="text-sm font-semibold text-white">
                                            Foundation location
                                        </h3>


                                        <p className="mt-1 text-xs leading-6 text-gray-600">
                                            You don't need to enter latitude
                                            or longitude. FoodBridge will
                                            automatically detect your current
                                            location.
                                        </p>

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    onClick={
                                        detectLocation
                                    }
                                    disabled={
                                        locationLoading
                                    }
                                    className="mt-5 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/[0.1] disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    <MapPin size={18} />

                                    {locationLoading

                                        ? "Detecting location..."

                                        : locationDetected

                                            ? "Location detected — detect again"

                                            : "Use current location"

                                    }

                                </button>


                                {locationDetected && (

                                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] px-4 py-3">

                                        <CheckCircle2
                                            size={17}
                                            className="shrink-0 text-emerald-400"
                                        />


                                        <p className="text-xs text-emerald-300">
                                            Foundation location captured successfully.
                                        </p>

                                    </div>

                                )}


                                {locationError && (

                                    <p className="mt-3 text-xs leading-6 text-red-300">
                                        {locationError}
                                    </p>

                                )}

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        INFORMATION
                    ================================================= */}

                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5">

                        <div className="flex items-start gap-3">

                            <CheckCircle2
                                size={18}
                                className="mt-0.5 shrink-0 text-emerald-400"
                            />


                            <div>

                                <p className="text-sm font-semibold text-white">
                                    Verification
                                </p>


                                <p className="mt-1 text-xs leading-6 text-gray-600">
                                    After submitting your profile,
                                    FoodBridge administrators will review
                                    your foundation before granting access
                                    to donation operations.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/home")
                            }
                            className="min-h-12 rounded-xl border border-white/10 px-6 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={
                                loading ||
                                success
                            }
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-7 text-sm font-bold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {loading ? (

                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />

                                    Submitting...

                                </>

                            ) : (

                                <>
                                    <Send size={16} />

                                    Submit Foundation

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

        <div className="flex gap-4 border-b border-white/[0.07] px-6 py-5 sm:px-8">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-gray-400">

                <Icon size={18} />

            </div>


            <div>

                <h2 className="text-sm font-semibold text-white">
                    {title}
                </h2>


                <p className="mt-1 text-xs leading-5 text-gray-600">
                    {description}
                </p>

            </div>

        </div>
    );
}


/* =============================================================
   INPUT
============================================================= */

function InputField({
    label,
    name,
    value,
    onChange,
    placeholder,
    maxLength,
    inputMode,
    required
}) {

    return (

        <div>

            <label
                htmlFor={name}
                className="mb-2 block text-xs font-semibold text-gray-400"
            >

                {label}

                {required && (

                    <span className="ml-1 text-emerald-400">
                        *
                    </span>

                )}

            </label>


            <input
                id={name}
                name={name}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                inputMode={inputMode}
                required={required}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:bg-black/50 focus:ring-4 focus:ring-emerald-400/[0.06]"
            />

        </div>
    );
}


export default CreateFoundation;