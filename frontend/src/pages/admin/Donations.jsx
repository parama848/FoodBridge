import { useEffect, useMemo, useState } from "react";

// =========================================================
// CONFIG
// =========================================================

const API_BASE_URL = "http://localhost:8080/api/admin/donations";


// =========================================================
// STATUS CONFIG
// =========================================================

const STATUS_OPTIONS = [
  "ALL",
  "AVAILABLE",
  "ACCEPTED",
  "PICKED_UP",
  "DELIVERED",
  "EXPIRED",
];


// =========================================================
// STATUS COLORS
// =========================================================

const getStatusClasses = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";

    case "ACCEPTED":
      return "bg-blue-100 text-blue-700 border-blue-200";

    case "PICKED_UP":
      return "bg-amber-100 text-amber-700 border-amber-200";

    case "DELIVERED":
      return "bg-purple-100 text-purple-700 border-purple-200";

    case "EXPIRED":
      return "bg-red-100 text-red-700 border-red-200";

    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};


// =========================================================
// FORMAT STATUS
// =========================================================

const formatStatus = (status) => {
  if (!status) {
    return "-";
  }

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};


// =========================================================
// DATE FORMATTER
// =========================================================

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


// =========================================================
// COMPONENT
// =========================================================

function Donations() {
  // =======================================================
  // STATE
  // =======================================================

  const [donations, setDonations] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [page, setPage] = useState(0);

  const [pageSize] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedDonation, setSelectedDonation] =
    useState(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);


  // =======================================================
  // GET TOKEN
  // =======================================================

  const getToken = () => {
    return localStorage.getItem("token");
  };


  // =======================================================
  // FETCH DONATIONS
  // =======================================================

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Authentication token not found."
        );
      }


      // ---------------------------------------------------
      // BUILD QUERY
      // ---------------------------------------------------

      const params = new URLSearchParams();

      params.append("page", page);
      params.append("size", pageSize);

      if (search.trim()) {
        params.append(
          "search",
          search.trim()
        );
      }

      if (status !== "ALL") {
        params.append(
          "status",
          status
        );
      }


      // ---------------------------------------------------
      // REQUEST
      // ---------------------------------------------------

      const response = await fetch(
        `${API_BASE_URL}?${params.toString()}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );


      if (!response.ok) {
        throw new Error(
          `Failed to load donations (${response.status})`
        );
      }


      const result =
        await response.json();


      if (!result.success) {
        throw new Error(
          result.message ||
            "Failed to load donations."
        );
      }


      const data = result.data;


      setDonations(
        data?.content || []
      );

      setTotalPages(
        data?.totalPages || 0
      );

      setTotalElements(
        data?.totalElements || 0
      );

    } catch (err) {

      console.error(
        "Admin donations error:",
        err
      );

      setError(
        err.message ||
          "Something went wrong while loading donations."
      );

      setDonations([]);

    } finally {

      setLoading(false);
    }
  };


  // =======================================================
  // LOAD DATA
  // =======================================================

  useEffect(() => {
    fetchDonations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);


  // =======================================================
  // SEARCH
  // =======================================================

  const handleSearch = (event) => {
    event.preventDefault();

    setPage(0);

    fetchDonations();
  };


  // =======================================================
  // STATUS CHANGE
  // =======================================================

  const handleStatusChange = (event) => {

    setStatus(event.target.value);

    setPage(0);
  };


  // =======================================================
  // REFRESH
  // =======================================================

  const handleRefresh = () => {
    fetchDonations();
  };


  // =======================================================
  // VIEW DETAILS
  // =======================================================

  const handleViewDetails = async (
    donationId
  ) => {

    try {

      setDetailsLoading(true);

      const token = getToken();

      if (!token) {
        throw new Error(
          "Authentication token not found."
        );
      }


      const response =
        await fetch(
          `${API_BASE_URL}/${donationId}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );


      if (!response.ok) {
        throw new Error(
          `Failed to load donation (${response.status})`
        );
      }


      const result =
        await response.json();


      if (!result.success) {
        throw new Error(
          result.message ||
            "Failed to load donation."
        );
      }


      setSelectedDonation(
        result.data
      );

    } catch (err) {

      console.error(
        "Donation details error:",
        err
      );

      setError(
        err.message ||
          "Failed to load donation details."
      );

    } finally {

      setDetailsLoading(false);
    }
  };


  // =======================================================
  // CLOSE DETAILS
  // =======================================================

  const closeDetails = () => {
    setSelectedDonation(null);
  };


  // =======================================================
  // PAGE NUMBERS
  // =======================================================

  const pageNumbers = useMemo(() => {

    if (totalPages <= 0) {
      return [];
    }

    const pages = [];

    for (
      let i = 0;
      i < totalPages;
      i++
    ) {
      pages.push(i);
    }

    return pages;

  }, [totalPages]);


  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Donations
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Monitor and manage all food donations.
            </p>
          </div>


          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ↻ Refresh
          </button>

        </div>

      </div>


      {/* =================================================
          STAT
      ================================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            Total Donations
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {totalElements}
          </p>

        </div>


        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            Current Page
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {totalPages === 0
              ? 0
              : page + 1}
          </p>

        </div>


        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            Showing
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {donations.length}
          </p>

        </div>


        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            Status Filter
          </p>

          <p className="mt-2 text-lg font-bold text-gray-900">
            {status === "ALL"
              ? "All"
              : formatStatus(status)}
          </p>

        </div>

      </div>


      {/* =================================================
          SEARCH / FILTER
      ================================================= */}

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 lg:flex-row"
        >

          {/* SEARCH */}

          <div className="relative flex-1">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search food, donor name or email..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />

          </div>


          {/* STATUS */}

          <select
            value={status}
            onChange={handleStatusChange}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          >

            {STATUS_OPTIONS.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option === "ALL"
                    ? "All Status"
                    : formatStatus(option)}
                </option>
              )
            )}

          </select>


          {/* SEARCH BUTTON */}

          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Search
          </button>

        </form>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="mb-6 flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={() => setError("")}
            className="font-bold text-red-600 hover:text-red-800"
          >
            ×
          </button>

        </div>

      )}


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {loading ? (

          <div className="flex min-h-[350px] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

              <p className="text-sm text-gray-500">
                Loading donations...
              </p>

            </div>

          </div>

        ) : donations.length === 0 ? (

          <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
              🍱
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              No donations found
            </h3>

            <p className="mt-1 max-w-md text-sm text-gray-500">
              Try changing your search or status filter.
            </p>

          </div>

        ) : (

          <>

            {/* DESKTOP TABLE */}

            <div className="hidden overflow-x-auto lg:block">

              <table className="w-full min-w-[1050px] text-left">

                <thead className="border-b border-gray-200 bg-gray-50">

                  <tr>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      ID
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Food
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Donor
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Quantity
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Foundation
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Expires
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-gray-100">

                  {donations.map(
                    (donation) => (

                      <tr
                        key={donation.id}
                        className="transition hover:bg-gray-50"
                      >

                        {/* ID */}

                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900">
                          #{donation.id}
                        </td>


                        {/* FOOD */}

                        <td className="px-5 py-4">

                          <p className="font-semibold text-gray-900">
                            {donation.foodName}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {donation.foodType}
                          </p>

                        </td>


                        {/* DONOR */}

                        <td className="px-5 py-4">

                          <p className="text-sm font-medium text-gray-900">
                            {donation.donorName}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {donation.donorEmail}
                          </p>

                        </td>


                        {/* QUANTITY */}

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">

                          <span className="font-semibold">
                            {donation.quantity}
                          </span>{" "}

                          {donation.quantityUnit}

                        </td>


                        {/* STATUS */}

                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                              donation.status
                            )}`}
                          >
                            {formatStatus(
                              donation.status
                            )}
                          </span>

                        </td>


                        {/* FOUNDATION */}

                        <td className="px-5 py-4">

                          {donation.foundationName ? (

                            <p className="text-sm font-medium text-gray-900">
                              {donation.foundationName}
                            </p>

                          ) : (

                            <span className="text-sm text-gray-400">
                              Not assigned
                            </span>

                          )}

                        </td>


                        {/* EXPIRES */}

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                          {formatDate(
                            donation.expiresAt
                          )}
                        </td>


                        {/* ACTION */}

                        <td className="px-5 py-4 text-right">

                          <button
                            type="button"
                            onClick={() =>
                              handleViewDetails(
                                donation.id
                              )
                            }
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-900 hover:text-white"
                          >
                            View
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>


            {/* MOBILE / TABLET CARDS */}

            <div className="grid gap-4 p-4 lg:hidden">

              {donations.map(
                (donation) => (

                  <div
                    key={donation.id}
                    className="rounded-xl border border-gray-200 p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Donation #{donation.id}
                        </p>

                        <h3 className="mt-1 font-semibold text-gray-900">
                          {donation.foodName}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {donation.foodType}
                        </p>

                      </div>


                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          donation.status
                        )}`}
                      >
                        {formatStatus(
                          donation.status
                        )}
                      </span>

                    </div>


                    <div className="mt-4 grid grid-cols-2 gap-4">

                      <div>

                        <p className="text-xs text-gray-400">
                          Donor
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {donation.donorName}
                        </p>

                      </div>


                      <div>

                        <p className="text-xs text-gray-400">
                          Quantity
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {donation.quantity}{" "}
                          {donation.quantityUnit}
                        </p>

                      </div>


                      <div>

                        <p className="text-xs text-gray-400">
                          Foundation
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {donation.foundationName ||
                            "Not assigned"}
                        </p>

                      </div>


                      <div>

                        <p className="text-xs text-gray-400">
                          Expires
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                          {formatDate(
                            donation.expiresAt
                          )}
                        </p>

                      </div>

                    </div>


                    <button
                      type="button"
                      onClick={() =>
                        handleViewDetails(
                          donation.id
                        )
                      }
                      className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      View Details
                    </button>

                  </div>

                )
              )}

            </div>

          </>

        )}

      </div>


      {/* =================================================
          PAGINATION
      ================================================= */}

      {!loading &&
        totalPages > 0 && (

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-gray-500">

              Page{" "}

              <span className="font-semibold text-gray-900">
                {page + 1}
              </span>{" "}

              of{" "}

              <span className="font-semibold text-gray-900">
                {totalPages}
              </span>

            </p>


            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                disabled={page === 0}
                onClick={() =>
                  setPage(
                    (previous) =>
                      Math.max(
                        previous - 1,
                        0
                      )
                  )
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>


              {pageNumbers.map(
                (pageNumber) => (

                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() =>
                      setPage(
                        pageNumber
                      )
                    }
                    className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                      pageNumber === page
                        ? "bg-gray-900 text-white"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber + 1}
                  </button>

                )
              )}


              <button
                type="button"
                disabled={
                  page >=
                  totalPages - 1
                }
                onClick={() =>
                  setPage(
                    (previous) =>
                      Math.min(
                        previous + 1,
                        totalPages - 1
                      )
                  )
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>

            </div>

          </div>

        )}


      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {selectedDonation && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeDetails}
        >

          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-6">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Donation #{selectedDonation.id}
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedDonation.foodName}
                </h2>

              </div>


              <button
                type="button"
                onClick={closeDetails}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            {detailsLoading ? (

              <div className="flex min-h-[300px] items-center justify-center">

                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

              </div>

            ) : (

              <div className="space-y-6 p-5 sm:p-6">

                {/* STATUS */}

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-50 p-4">

                  <div>

                    <p className="text-xs font-medium text-gray-500">
                      Current Status
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full border px-3 py-1.5 text-sm font-semibold ${getStatusClasses(
                        selectedDonation.status
                      )}`}
                    >
                      {formatStatus(
                        selectedDonation.status
                      )}
                    </span>

                  </div>


                  <div className="text-right">

                    <p className="text-xs text-gray-400">
                      Created
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {formatDate(
                        selectedDonation.createdAt
                      )}
                    </p>

                  </div>

                </div>


                {/* FOOD */}

                <section>

                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">
                    Food Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 p-4 sm:grid-cols-2 lg:grid-cols-4">

                    <DetailItem
                      label="Food Name"
                      value={
                        selectedDonation.foodName
                      }
                    />

                    <DetailItem
                      label="Food Type"
                      value={
                        selectedDonation.foodType
                      }
                    />

                    <DetailItem
                      label="Quantity"
                      value={`${selectedDonation.quantity} ${selectedDonation.quantityUnit}`}
                    />

                    <DetailItem
                      label="Prepared At"
                      value={formatDate(
                        selectedDonation.preparedAt
                      )}
                    />

                  </div>

                </section>


                {/* DONOR */}

                <section>

                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">
                    Donor Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 p-4 sm:grid-cols-3">

                    <DetailItem
                      label="Name"
                      value={
                        selectedDonation.donorName
                      }
                    />

                    <DetailItem
                      label="Email"
                      value={
                        selectedDonation.donorEmail
                      }
                    />

                    <DetailItem
                      label="Donor ID"
                      value={`#${selectedDonation.donorId}`}
                    />

                  </div>

                </section>


                {/* FOUNDATION */}

                <section>

                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">
                    Foundation
                  </h3>

                  <div className="rounded-xl border border-gray-200 p-4">

                    {selectedDonation.foundationName ? (

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <DetailItem
                          label="Foundation"
                          value={
                            selectedDonation.foundationName
                          }
                        />

                        <DetailItem
                          label="Foundation ID"
                          value={`#${selectedDonation.foundationId}`}
                        />

                      </div>

                    ) : (

                      <p className="text-sm text-gray-500">
                        No foundation has accepted this donation.
                      </p>

                    )}

                  </div>

                </section>


                {/* PICKUP */}

                <section>

                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">
                    Pickup Information
                  </h3>

                  <div className="rounded-xl border border-gray-200 p-4">

                    <DetailItem
                      label="Pickup Address"
                      value={
                        selectedDonation.pickupAddress
                      }
                    />

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <DetailItem
                        label="Latitude"
                        value={
                          selectedDonation.latitude
                        }
                      />

                      <DetailItem
                        label="Longitude"
                        value={
                          selectedDonation.longitude
                        }
                      />

                    </div>

                  </div>

                </section>


                {/* EXPIRY */}

                <section>

                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">
                    Timeline
                  </h3>

                  <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 p-4 sm:grid-cols-3">

                    <DetailItem
                      label="Prepared At"
                      value={formatDate(
                        selectedDonation.preparedAt
                      )}
                    />

                    <DetailItem
                      label="Expires At"
                      value={formatDate(
                        selectedDonation.expiresAt
                      )}
                    />

                    <DetailItem
                      label="Last Updated"
                      value={formatDate(
                        selectedDonation.updatedAt
                      )}
                    />

                  </div>

                </section>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}


// =========================================================
// DETAIL ITEM
// =========================================================

function DetailItem({
  label,
  value,
}) {
  return (
    <div>

      <p className="text-xs font-medium text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-900">
        {value ?? "-"}
      </p>

    </div>
  );
}


export default Donations;