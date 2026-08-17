import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";



const availableFoodStyles = `
@keyframes availableFoodCardIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.available-food-card {
    animation: availableFoodCardIn .42s ease-out both;
}

@media (prefers-reduced-motion: reduce) {
    .available-food-card {
        animation: none !important;
    }
}
`;

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

            <main className="min-h-screen bg-[#F8FAFD] text-[#17233D]">

                <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

                    {/* Header skeleton */}

                    <div className="animate-pulse">

                        <div className="h-4 w-28 rounded bg-[#E6ECF5]" />

                        <div className="mt-4 h-10 w-72 rounded bg-[#E6ECF5]" />

                        <div className="mt-4 h-5 w-full max-w-2xl rounded bg-[#EEF3FB]" />

                    </div>


                    {/* Cards skeleton */}

                    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {[1, 2, 3].map(
                            item => (

                                <div
                                    key={item}
                                    className="h-[420px] animate-pulse rounded-3xl border border-[#E1E6EE] bg-[#F2F6FF]"
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

        <main className="min-h-screen bg-[#F8FAFD] text-[#17233D]">

            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section>

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        <div>

                            <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#1557D6]">
                                Foundation
                            </p>

                            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                                Available food
                            </h1>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#17233D] sm:text-base">
                                Discover surplus food available near your foundation
                                and help deliver meaningful meals to people who need them.
                            </p>

                        </div>


                        {/* Refresh */}

                        <button
                            type="button"
                            onClick={fetchDonations}
                            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#E1E6EE] bg-[#F2F6FF] px-5 py-3 text-sm font-bold text-[#17233D] transition hover:border-[#C9D8EC] hover:bg-[#EEF3FB] hover:text-[#17233D]"
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

                    <div className="rounded-2xl border border-[#E1E6EE] bg-white p-5 shadow-[0_4px_18px_rgba(23,35,61,0.045)]">

                        <p className="text-sm font-semibold text-[#17233D]">
                            Available donations
                        </p>

                        <p className="mt-3 text-3xl font-extrabold">
                            {donations.length}
                        </p>

                    </div>


                    <div className="rounded-2xl border border-[#E1E6EE] bg-white p-5 shadow-[0_4px_18px_rgba(23,35,61,0.045)]">

                        <p className="text-sm font-semibold text-[#17233D]">
                            Food categories
                        </p>

                        <p className="mt-3 text-3xl font-extrabold">
                            {foodTypes.length}
                        </p>

                    </div>


                    <div className="rounded-2xl border border-[#E1E6EE] bg-white p-5 shadow-[0_4px_18px_rgba(23,35,61,0.045)]">

                        <p className="text-sm font-semibold text-[#17233D]">
                            Showing results
                        </p>

                        <p className="mt-3 text-3xl font-extrabold">
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

                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#17233D]">
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
                                className="w-full rounded-2xl border border-[#E1E6EE] bg-white px-12 py-4 text-sm text-[#17233D] outline-none transition placeholder:text-[#53627A] focus:border-[#9FB8E8] focus:bg-[#F2F6FF]"
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
                            className="rounded-2xl border border-[#E1E6EE] bg-white px-5 py-4 text-sm text-[#17233D] outline-none transition focus:border-[#9FB8E8]"
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

                    <section className="mt-8 rounded-3xl border border-red-200 bg-white p-8 text-center shadow-[0_5px_20px_rgba(23,35,61,0.045)]">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-700">
                            !
                        </div>

                        <h2 className="mt-5 text-xl font-semibold">
                            Unable to load donations
                        </h2>

                        <p className="mx-auto mt-2 max-w-lg text-sm text-[#17233D]">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={fetchDonations}
                            className="mt-6 rounded-xl bg-[#1557D6] px-6 py-3 font-semibold text-black transition hover:bg-[#0F46B5]"
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

                        <section className="mt-10 rounded-3xl border border-[#E1E6EE] bg-white/[0.02] px-6 py-20 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1557D6]/10 text-3xl">
                                🍱
                            </div>

                            <h2 className="mt-6 text-2xl font-semibold">
                                No nearby donations available
                            </h2>

                            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#17233D]">
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
                                    className="mt-6 rounded-xl border border-[#E1E6EE] px-5 py-3 text-sm font-bold text-[#17233D] transition hover:bg-[#EEF3FB] hover:text-[#17233D]"
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
                                        className="available-food-card group overflow-hidden rounded-3xl border border-[#E1E6EE] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#9FB8E8] hover:bg-[#F2F6FF]"
                                    >


                                        {/* ---------------------------------
                                            CARD HEADER
                                        --------------------------------- */}

                                        <div className="border-b border-[#E1E6EE] p-6">

                                            <div className="flex items-start justify-between gap-4">

                                                <div className="flex min-w-0 items-center gap-4">

                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1557D6]/10 text-xl">
                                                        🍽️
                                                    </div>

                                                    <div className="min-w-0">

                                                        <h2 className="truncate text-lg font-extrabold">
                                                            {donation.foodName}
                                                        </h2>

                                                        <p className="mt-1 text-sm font-semibold text-[#17233D]">
                                                            {donation.foodType}
                                                        </p>

                                                    </div>

                                                </div>


                                                <span className="shrink-0 rounded-full border border-[#C9D8EC] bg-[#1557D6]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1557D6]">
                                                    {donation.status || "AVAILABLE"}
                                                </span>

                                            </div>

                                        </div>


                                        {/* ---------------------------------
                                            CARD BODY
                                        --------------------------------- */}

                                        <div className="space-y-4 p-6">


                                            {/* Quantity */}

                                            <div className="flex items-center justify-between rounded-xl border border-[#E1E6EE] bg-black/20 px-4 py-3">

                                                <span className="text-sm font-semibold text-[#17233D]">
                                                    Quantity
                                                </span>

                                                <span className="font-semibold">
                                                    {donation.quantity}{" "}
                                                    {donation.quantityUnit}
                                                </span>

                                            </div>


                                            {/* Prepared */}

                                            <div>

                                                <p className="text-xs font-extrabold uppercase tracking-wider text-[#17233D]">
                                                    Prepared
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-[#17233D]">
                                                    {formatDateTime(
                                                        donation.preparedAt
                                                    )}
                                                </p>

                                            </div>


                                            {/* Expires */}

                                            <div>

                                                <p className="text-xs font-extrabold uppercase tracking-wider text-[#17233D]">
                                                    Expires
                                                </p>

                                                <p
                                                    className={`mt-1 text-sm font-bold ${
                                                        isExpiringSoon(
                                                            donation.expiresAt
                                                        )
                                                            ? "text-red-700"
                                                            : "text-[#17233D]"
                                                    }`}
                                                >
                                                    {formatDateTime(
                                                        donation.expiresAt
                                                    )}
                                                </p>

                                            </div>


                                            {/* Location */}

                                            <div>

                                                <p className="text-xs font-extrabold uppercase tracking-wider text-[#17233D]">
                                                    Pickup location
                                                </p>

                                                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-[#17233D]">
                                                    {donation.pickupAddress ||
                                                        "Pickup address unavailable"}
                                                </p>

                                            </div>


                                            {/* Expiry warning */}

                                            {isExpiringSoon(
                                                donation.expiresAt
                                            ) && (

                                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
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
                                                className="w-full rounded-xl bg-[#1557D6] py-3.5 font-semibold text-black transition hover:bg-[#0F46B5] active:scale-[0.99]"
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