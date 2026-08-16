import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";


function AvailableFood() {

    const navigate = useNavigate();


    // =========================================================
    // STATE
    // =========================================================

    const [donations, setDonations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [foodType, setFoodType] = useState("ALL");


    // =========================================================
    // FETCH AVAILABLE DONATIONS
    // GET /api/donations/available
    // =========================================================

    const fetchDonations = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await axiosInstance.get(
                    "/donations/available"
                );


            const apiResponse =
                response.data;


            if (!apiResponse.success) {

                throw new Error(
                    apiResponse.message ||
                    "Failed to load available donations"
                );
            }


            setDonations(
                apiResponse.data || []
            );


        } catch (error) {

            console.error(
                "Failed to fetch available donations:",
                error
            );


            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Unable to load available donations";


            setError(message);

            setDonations([]);


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
    // FOOD TYPES
    // =========================================================

    const foodTypes =
        useMemo(() => {

            const types =
                donations
                    .map(
                        donation =>
                            donation.foodType
                    )
                    .filter(Boolean);


            return [
                ...new Set(types)
            ];

        }, [donations]);


    // =========================================================
    // FILTER DONATIONS
    // =========================================================

    const filteredDonations =
        useMemo(() => {

            const searchValue =
                search
                    .trim()
                    .toLowerCase();


            return donations.filter(
                donation => {

                    const matchesSearch =
                        !searchValue ||
                        donation.foodName
                            ?.toLowerCase()
                            .includes(searchValue) ||

                        donation.foodType
                            ?.toLowerCase()
                            .includes(searchValue) ||

                        donation.pickupAddress
                            ?.toLowerCase()
                            .includes(searchValue);


                    const matchesFoodType =
                        foodType === "ALL" ||
                        donation.foodType === foodType;


                    return (
                        matchesSearch &&
                        matchesFoodType
                    );
                }
            );

        }, [
            donations,
            search,
            foodType
        ]);


    // =========================================================
    // VIEW DONATION
    // =========================================================

    const viewDonation = (donationId) => {

        navigate(
            `/foundation/donations/${donationId}`
        );
    };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDateTime = (value) => {

        if (!value) {
            return "Not available";
        }


        const date =
            new Date(value);


        if (Number.isNaN(date.getTime())) {
            return "Not available";
        }


        return date.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };


    // =========================================================
    // CHECK EXPIRY
    // =========================================================

    const isExpiringSoon = (expiresAt) => {

        if (!expiresAt) {
            return false;
        }


        const expiry =
            new Date(expiresAt).getTime();


        const now =
            Date.now();


        const difference =
            expiry - now;


        const oneHour =
            60 * 60 * 1000;


        return (
            difference > 0 &&
            difference <= oneHour
        );
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <main className="min-h-screen bg-[#050505] text-white">

                <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

                    {/* Header skeleton */}

                    <div className="animate-pulse">

                        <div className="h-4 w-28 rounded bg-white/10" />

                        <div className="mt-4 h-10 w-72 rounded bg-white/10" />

                        <div className="mt-4 h-5 w-full max-w-2xl rounded bg-white/5" />

                    </div>


                    {/* Cards skeleton */}

                    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {[1, 2, 3].map(
                            item => (

                                <div
                                    key={item}
                                    className="h-[420px] animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]"
                                />

                            )
                        )}

                    </div>

                </div>

            </main>
        );
    }


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <main className="min-h-screen bg-[#050505] text-white">

            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section>

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
                                Foundation
                            </p>

                            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                Available food
                            </h1>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                                Discover surplus food available near your foundation
                                and help deliver meaningful meals to people who need them.
                            </p>

                        </div>


                        {/* Refresh */}

                        <button
                            type="button"
                            onClick={fetchDonations}
                            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                        >

                            <span className="text-base">
                                ↻
                            </span>

                            Refresh

                        </button>

                    </div>

                </section>


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="mt-10 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

                        <p className="text-sm text-gray-500">
                            Available donations
                        </p>

                        <p className="mt-3 text-3xl font-bold">
                            {donations.length}
                        </p>

                    </div>


                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

                        <p className="text-sm text-gray-500">
                            Food categories
                        </p>

                        <p className="mt-3 text-3xl font-bold">
                            {foodTypes.length}
                        </p>

                    </div>


                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

                        <p className="text-sm text-gray-500">
                            Showing results
                        </p>

                        <p className="mt-3 text-3xl font-bold">
                            {filteredDonations.length}
                        </p>

                    </div>

                </section>


                {/* =================================================
                    SEARCH / FILTER
                ================================================= */}

                <section className="mt-8">

                    <div className="flex flex-col gap-3 lg:flex-row">

                        {/* Search */}

                        <div className="relative flex-1">

                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-600">
                                ⌕
                            </span>

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                                placeholder="Search food, type or pickup location..."
                                className="w-full rounded-2xl border border-white/10 bg-white/[0.025] px-12 py-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/40 focus:bg-white/[0.04]"
                            />

                        </div>


                        {/* Food type */}

                        <select
                            value={foodType}
                            onChange={(event) =>
                                setFoodType(
                                    event.target.value
                                )
                            }
                            className="rounded-2xl border border-white/10 bg-[#090909] px-5 py-4 text-sm text-gray-300 outline-none transition focus:border-emerald-400/40"
                        >

                            <option value="ALL">
                                All food types
                            </option>


                            {foodTypes.map(
                                type => (

                                    <option
                                        key={type}
                                        value={type}
                                    >
                                        {type}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                </section>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <section className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/[0.04] p-8 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl text-red-400">
                            !
                        </div>

                        <h2 className="mt-5 text-xl font-semibold">
                            Unable to load donations
                        </h2>

                        <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={fetchDonations}
                            className="mt-6 rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-black transition hover:bg-emerald-300"
                        >
                            Try again
                        </button>

                    </section>
                )}


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {!error &&
                    filteredDonations.length === 0 && (

                        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-20 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 text-3xl">
                                🍱
                            </div>

                            <h2 className="mt-6 text-2xl font-semibold">
                                No nearby donations available
                            </h2>

                            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
                                There are currently no food donations matching
                                your location or selected filters.
                            </p>

                            {(search || foodType !== "ALL") && (

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setFoodType("ALL");
                                    }}
                                    className="mt-6 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/[0.05] hover:text-white"
                                >
                                    Clear filters
                                </button>

                            )}

                        </section>
                    )}


                {/* =================================================
                    DONATION GRID
                ================================================= */}

                {!error &&
                    filteredDonations.length > 0 && (

                        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                            {filteredDonations.map(
                                donation => (

                                    <article
                                        key={donation.id}
                                        className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.04]"
                                    >


                                        {/* ---------------------------------
                                            CARD HEADER
                                        --------------------------------- */}

                                        <div className="border-b border-white/10 p-6">

                                            <div className="flex items-start justify-between gap-4">

                                                <div className="flex min-w-0 items-center gap-4">

                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-xl">
                                                        🍽️
                                                    </div>

                                                    <div className="min-w-0">

                                                        <h2 className="truncate text-lg font-semibold">
                                                            {donation.foodName}
                                                        </h2>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {donation.foodType}
                                                        </p>

                                                    </div>

                                                </div>


                                                <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                                                    {donation.status || "AVAILABLE"}
                                                </span>

                                            </div>

                                        </div>


                                        {/* ---------------------------------
                                            CARD BODY
                                        --------------------------------- */}

                                        <div className="space-y-4 p-6">


                                            {/* Quantity */}

                                            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">

                                                <span className="text-sm text-gray-500">
                                                    Quantity
                                                </span>

                                                <span className="font-semibold">
                                                    {donation.quantity}{" "}
                                                    {donation.quantityUnit}
                                                </span>

                                            </div>


                                            {/* Prepared */}

                                            <div>

                                                <p className="text-xs uppercase tracking-wider text-gray-600">
                                                    Prepared
                                                </p>

                                                <p className="mt-1 text-sm text-gray-300">
                                                    {formatDateTime(
                                                        donation.preparedAt
                                                    )}
                                                </p>

                                            </div>


                                            {/* Expires */}

                                            <div>

                                                <p className="text-xs uppercase tracking-wider text-gray-600">
                                                    Expires
                                                </p>

                                                <p
                                                    className={`mt-1 text-sm font-medium ${
                                                        isExpiringSoon(
                                                            donation.expiresAt
                                                        )
                                                            ? "text-red-400"
                                                            : "text-gray-300"
                                                    }`}
                                                >
                                                    {formatDateTime(
                                                        donation.expiresAt
                                                    )}
                                                </p>

                                            </div>


                                            {/* Location */}

                                            <div>

                                                <p className="text-xs uppercase tracking-wider text-gray-600">
                                                    Pickup location
                                                </p>

                                                <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-400">
                                                    {donation.pickupAddress ||
                                                        "Pickup address unavailable"}
                                                </p>

                                            </div>


                                            {/* Expiry warning */}

                                            {isExpiringSoon(
                                                donation.expiresAt
                                            ) && (

                                                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] px-4 py-3 text-sm text-red-300">
                                                    Expires soon — prioritize this donation.
                                                </div>

                                            )}


                                            {/* View */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    viewDonation(
                                                        donation.id
                                                    )
                                                }
                                                className="w-full rounded-xl bg-emerald-400 py-3.5 font-semibold text-black transition hover:bg-emerald-300 active:scale-[0.99]"
                                            >
                                                View Donation
                                            </button>

                                        </div>

                                    </article>

                                )
                            )}

                        </section>
                    )}

            </div>

        </main>
    );
}


export default AvailableFood;