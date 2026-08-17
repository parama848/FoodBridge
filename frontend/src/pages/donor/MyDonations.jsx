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

        <div className="min-h-screen bg-[#F8FAFD] text-[#17233D]">

            <main
                className="
                    mx-auto
                    w-full
                    max-w-7xl
                    px-3
                    py-6
                    sm:px-6
                    sm:py-10
                    lg:px-8
                "
            >


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div
                    className="
                        flex
                        flex-col
                        gap-5
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                        sm:gap-6
                    "
                >

                    <div>

                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-[#1557D6]
                            "
                        >
                            Donor
                        </p>


                        <h1
                            className="
                                mt-2
                                text-2xl
                                font-bold
                                tracking-tight

                                sm:mt-3
                                sm:text-4xl
                            "
                        >
                            My donations
                        </h1>


                        <p
                            className="
                                mt-2
                                max-w-2xl
                                text-xs
                                leading-6
                                text-[#17233D]

                                sm:mt-3
                                sm:text-base
                                sm:leading-7
                            "
                        >
                            Track the food you've donated and
                            follow every donation from
                            availability to delivery.
                        </p>

                    </div>


                    <Link
                        to="/donations/create"
                        className="
                            inline-flex
                            min-h-10
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-[#1557D6]
                            px-5
                            text-sm
                            font-bold
                            text-white
                            transition
                            hover:bg-[#0F46B5]

                            sm:min-h-11
                            sm:w-auto
                        "
                    >

                        <Plus size={17} />

                        Donate Food

                    </Link>

                </div>


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <div
                    className="
                        mt-7
                        grid
                        grid-cols-2
                        gap-2

                        sm:mt-10
                        sm:grid-cols-3
                        sm:gap-3

                        lg:grid-cols-5
                    "
                >

                    <StatCard
                        label="All"
                        value={counts.all}
                        active={
                            statusFilter === "ALL"
                        }
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

                <div
                    className="
                        mt-6
                        flex
                        flex-col
                        gap-2.5

                        sm:mt-8
                        sm:gap-3

                        lg:flex-row
                    "
                >

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-[#17233D]
                            "
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
                            className="
                                w-full
                                rounded-xl
                                border
                                border-[#E1E6EE]
                                bg-[#F8FAFD]
                                py-3
                                pl-11
                                pr-4
                                text-sm
                                text-[#17233D]
                                outline-none
                                transition
                                placeholder:text-[#17233D]
                                focus:border-[#1557D6]/50
                                focus:bg-[#F2F6FF]

                                sm:py-3.5
                            "
                        />

                    </div>


                    <select
                        value={statusFilter}
                        onChange={event =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-[#E1E6EE]
                            bg-[#F8FAFD]
                            px-4
                            py-3
                            text-sm
                            text-[#53627A]
                            outline-none
                            focus:border-[#1557D6]/50

                            sm:py-3.5

                            lg:w-auto
                        "
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
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-[#E1E6EE]
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-[#17233D]
                            transition
                            hover:bg-[#F2F6FF]
                            hover:text-[#17233D]
                            disabled:opacity-50

                            sm:py-3.5
                        "
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

                    <div
                        className="
                            mt-6
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                            p-4

                            sm:mt-8
                            sm:p-5
                        "
                    >

                        <AlertCircle
                            size={19}
                            className="
                                mt-0.5
                                shrink-0
                                text-red-600
                            "
                        />


                        <div className="flex-1 min-w-0">

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-red-700
                                "
                            >
                                Unable to load donations
                            </p>


                            <p
                                className="
                                    mt-1
                                    break-words
                                    text-xs
                                    leading-6
                                    text-red-600/70
                                "
                            >
                                {error}
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={fetchDonations}
                            className="
                                shrink-0
                                text-xs
                                font-semibold
                                text-red-700
                                hover:text-[#17233D]
                            "
                        >
                            Retry
                        </button>

                    </div>

                )}


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div
                        className="
                            mt-6
                            grid
                            gap-3

                            sm:mt-8
                            sm:gap-4

                            lg:grid-cols-2
                        "
                    >

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
                                statusFilter !==
                                "ALL"
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

                        <div
                            className="
                                mt-6
                                grid
                                gap-3

                                sm:mt-8
                                sm:gap-4

                                lg:grid-cols-2
                            "
                        >

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
                rounded-xl
                border
                p-3
                text-left
                transition

                sm:rounded-2xl
                sm:p-4

                ${
                    active
                        ? "border-[#C9D8F2] bg-[#1557D6]/[0.05]"
                        : "border-[#E6EAF0] bg-white hover:bg-[#F2F6FF]"
                }
            `}
        >

            <p
                className="
                    text-[10px]
                    text-[#17233D]

                    sm:text-xs
                "
            >
                {label}
            </p>


            <p
                className={`
                    mt-1
                    text-xl
                    font-bold

                    sm:mt-2
                    sm:text-2xl

                    ${
                        active
                            ? "text-[#1557D6]"
                            : "text-[#17233D]"
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
            className="
                group
                block
                w-full
                min-w-0
                text-left
            "
        >

            <article
                className="
                    w-full
                    min-w-0
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#E6EAF0]
                    bg-white
                    p-4
                    transition
                    duration-200
                    hover:border-[#D5DEEB]
                    hover:bg-[#F8FAFD]
                    shadow-[0_3px_14px_rgba(23,35,61,0.035)]

                    sm:rounded-3xl
                    sm:p-6
                "
            >


                {/* =================================================
                    TOP
                ================================================= */}

                <div
                    className="
                        flex
                        min-w-0
                        items-start
                        justify-between
                        gap-2

                        sm:gap-4
                    "
                >

                    <div
                        className="
                            flex
                            min-w-0
                            flex-1
                            items-center
                            gap-3

                            sm:items-start
                            sm:gap-4
                        "
                    >

                        {/* FOOD ICON */}

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#1557D6]/10
                                text-[#1557D6]

                                sm:h-11
                                sm:w-11
                            "
                        >

                            <UtensilsCrossed
                                size={18}
                            />

                        </div>


                        {/* FOOD NAME */}

                        <div
                            className="
                                min-w-0
                                flex-1
                            "
                        >

                            <h2
                                className="
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-[#17233D]

                                    sm:text-base
                                "
                            >
                                {donation.foodName ||
                                    "Food donation"}
                            </h2>


                            <p
                                className="
                                    mt-0.5
                                    truncate
                                    text-[11px]
                                    text-[#17233D]

                                    sm:mt-1
                                    sm:text-xs
                                "
                            >
                                {donation.foodType ||
                                    "Food"}
                            </p>

                        </div>

                    </div>


                    {/* STATUS */}

                    <span
                        className={`
                            shrink-0
                            rounded-full
                            border
                            px-2
                            py-1
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-wide

                            sm:px-3
                            sm:py-1.5
                            sm:text-[10px]

                            ${status.className}
                        `}
                    >
                        {status.label}
                    </span>

                </div>


                {/* =================================================
                    DETAILS
                ================================================= */}

                <div
                    className="
                        mt-4
                        grid
                        grid-cols-2
                        gap-2.5

                        sm:mt-6
                        sm:gap-3
                    "
                >

                    <InfoItem
                        label="Quantity"
                        value={`
                            ${donation.quantity ?? "-"}
                            ${donation.quantityUnit ?? ""}
                        `}
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

                    <div
                        className="
                            mt-3
                            overflow-hidden
                            rounded-xl
                            border
                            border-[#EEF1F5]
                            bg-[#F8FAFD]
                            px-3
                            py-2.5

                            sm:mt-4
                            sm:rounded-2xl
                            sm:px-4
                            sm:py-3
                        "
                    >

                        <p
                            className="
                                text-[9px]
                                uppercase
                                tracking-wider
                                text-[#17233D]

                                sm:text-[10px]
                            "
                        >
                            Accepted by
                        </p>


                        <p
                            className="
                                mt-0.5
                                truncate
                                text-[11px]
                                font-medium
                                text-[#17233D]

                                sm:mt-1
                                sm:text-xs
                            "
                        >
                            {
                                donation
                                    .acceptedFoundationName
                            }
                        </p>

                    </div>

                )}


                {/* =================================================
                    LOCATION
                ================================================= */}

                {donation.pickupAddress && (

                    <p
                        className="
                            mt-3
                            truncate
                            text-[10px]
                            text-[#17233D]

                            sm:mt-4
                            sm:text-xs
                        "
                    >
                        📍 {donation.pickupAddress}
                    </p>

                )}


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div
                    className="
                        mt-4
                        flex
                        items-center
                        justify-between
                        gap-2
                        border-t
                        border-[#EEF1F5]
                        pt-3

                        sm:mt-5
                        sm:pt-4
                    "
                >

                    <span
                        className="
                            truncate
                            text-[10px]
                            text-[#17233D]

                            sm:text-xs
                        "
                    >
                        Donation #{donation.id}
                    </span>


                    <span
                        className="
                            inline-flex
                            shrink-0
                            items-center
                            gap-1
                            text-[10px]
                            font-semibold
                            text-[#17233D]
                            transition
                            group-hover:text-[#1557D6]

                            sm:text-xs
                        "
                    >

                        View details

                        <ArrowRight
                            size={12}
                            className="
                                transition
                                group-hover:translate-x-0.5

                                sm:h-[14px]
                                sm:w-[14px]
                            "
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

        <div
            className="
                min-w-0
                overflow-hidden
                rounded-xl
                border
                border-[#EEF1F5]
                bg-[#F8FAFD]
                px-2.5
                py-2.5

                sm:p-3
            "
        >

            <p
                className="
                    text-[9px]
                    uppercase
                    tracking-wider
                    text-[#17233D]

                    sm:text-[10px]
                "
            >
                {label}
            </p>


            <p
                className="
                    mt-1
                    truncate
                    text-[11px]
                    font-medium
                    text-[#17233D]

                    sm:text-xs
                "
            >
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
                    "border-[#C9D8F2] bg-[#1557D6]/10 text-[#1557D6]"
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


        default:

            return {
                label: status || "Unknown",
                className:
                    "border-[#E1E6EE] bg-white/5 text-[#17233D]"
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


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

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


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

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

        <div
            className="
                animate-pulse
                rounded-2xl
                border
                border-[#EEF1F5]
                bg-white
                p-4

                sm:rounded-3xl
                sm:p-6
            "
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >

                <div
                    className="
                        flex
                        min-w-0
                        items-center
                        gap-3

                        sm:gap-4
                    "
                >

                    <div
                        className="
                            h-10
                            w-10
                            shrink-0
                            rounded-xl
                            bg-[#EEF3FB]

                            sm:h-11
                            sm:w-11
                        "
                    />


                    <div className="min-w-0">

                        <div
                            className="
                                h-3
                                w-28
                                rounded
                                bg-[#EEF3FB]

                                sm:h-4
                                sm:w-36
                            "
                        />

                        <div
                            className="
                                mt-2
                                h-2.5
                                w-16
                                rounded
                                bg-[#F2F6FF]

                                sm:w-20
                            "
                        />

                    </div>

                </div>


                <div
                    className="
                        h-5
                        w-16
                        shrink-0
                        rounded-full
                        bg-[#F2F6FF]

                        sm:h-6
                        sm:w-20
                    "
                />

            </div>


            <div
                className="
                    mt-4
                    grid
                    grid-cols-2
                    gap-2.5

                    sm:mt-6
                    sm:gap-3
                "
            >

                <div
                    className="
                        h-12
                        rounded-xl
                        bg-[#F2F6FF]

                        sm:h-14
                    "
                />

                <div
                    className="
                        h-12
                        rounded-xl
                        bg-[#F2F6FF]

                        sm:h-14
                    "
                />

                <div
                    className="
                        h-12
                        rounded-xl
                        bg-[#F2F6FF]

                        sm:h-14
                    "
                />

                <div
                    className="
                        h-12
                        rounded-xl
                        bg-[#F2F6FF]

                        sm:h-14
                    "
                />

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

        <div
            className="
                mt-6
                rounded-2xl
                border
                border-dashed
                border-[#E1E6EE]
                bg-white
                px-4
                py-12
                text-center

                sm:mt-8
                sm:rounded-3xl
                sm:px-6
                sm:py-16
            "
        >

            <div
                className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#F2F6FF]
                    text-[#17233D]
                "
            >
                <Package size={24} />
            </div>


            <h2
                className="
                    mt-5
                    text-base
                    font-semibold
                    text-[#17233D]

                    sm:mt-6
                    sm:text-lg
                "
            >
                {
                    hasFilters
                        ? "No matching donations"
                        : "No donations yet"
                }
            </h2>


            <p
                className="
                    mx-auto
                    mt-2
                    max-w-md
                    text-xs
                    leading-6
                    text-[#17233D]

                    sm:text-sm
                "
            >
                {
                    hasFilters
                        ? "Try changing your search or status filter."
                        : "Your food donations will appear here once you create your first donation."
                }
            </p>


            {hasFilters ? (

                <button
                    type="button"
                    onClick={clearFilters}
                    className="
                        mt-5
                        rounded-xl
                        border
                        border-[#E1E6EE]
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-[#17233D]
                        transition
                        hover:bg-[#F2F6FF]
                        hover:text-[#17233D]

                        sm:mt-6
                    "
                >
                    Clear filters
                </button>

            ) : (

                <Link
                    to="/donor/donations/create"
                    className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#1557D6]
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-white
                        transition
                        hover:bg-[#0F46B5]

                        sm:mt-6
                    "
                >

                    <Plus size={16} />

                    Create your first donation

                </Link>

            )}

        </div>

    );
}


export default MyDonations;