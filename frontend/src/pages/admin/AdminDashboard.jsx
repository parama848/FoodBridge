import { useEffect, useMemo, useState } from "react";

// =========================================================
// API
// =========================================================

const USERS_API =
  "http://localhost:8080/api/admin/users";

const FOUNDATIONS_API =
  "http://localhost:8080/api/admin/foundations";

const DONATIONS_API =
  "http://localhost:8080/api/admin/donations";


// =========================================================
// DONATION STATUS CONFIG
// =========================================================

const STATUS_CONFIG = {
  AVAILABLE: {
    label: "Available",
    icon: "🟢",
  },

  ACCEPTED: {
    label: "Accepted",
    icon: "🔵",
  },

  PICKED_UP: {
    label: "Picked Up",
    icon: "🟡",
  },

  DELIVERED: {
    label: "Delivered",
    icon: "🟣",
  },

  EXPIRED: {
    label: "Expired",
    icon: "🔴",
  },
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
// STATUS COLORS
// =========================================================

const getStatusClasses = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "ACCEPTED":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "PICKED_UP":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "DELIVERED":
      return "bg-purple-50 text-purple-700 border-purple-200";

    case "EXPIRED":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
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
// ADMIN DASHBOARD
// =========================================================

function AdminDashboard() {

  // =======================================================
  // STATE
  // =======================================================

  const [users, setUsers] = useState([]);

  const [pendingFoundations, setPendingFoundations] =
    useState([]);

  const [donations, setDonations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [lastRefreshed, setLastRefreshed] =
    useState(null);


  // =======================================================
  // GET TOKEN
  // =======================================================

  const getToken = () => {
    return localStorage.getItem("token");
  };


  // =======================================================
  // GENERIC API REQUEST
  // =======================================================

  const fetchApi = async (url) => {

    const token = getToken();

    if (!token) {
      throw new Error(
        "Authentication token not found. Please login again."
      );
    }


    const response = await fetch(
      url,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );


    if (!response.ok) {

      let message =
        `Request failed with status ${response.status}`;

      try {
        const errorData =
          await response.json();

        if (errorData?.message) {
          message = errorData.message;
        }
      } catch {
        // Ignore invalid error response
      }

      throw new Error(message);
    }


    const result =
      await response.json();


    if (!result.success) {
      throw new Error(
        result.message ||
          "Request failed."
      );
    }


    return result.data;
  };


  // =======================================================
  // LOAD DASHBOARD DATA
  // =======================================================

  const loadDashboard = async () => {

    try {

      setLoading(true);

      setError("");


      // ---------------------------------------------------
      // EXISTING BACKEND ENDPOINTS
      // ---------------------------------------------------
      //
      // Users:
      // GET /api/admin/users
      //
      // Pending foundations:
      // GET /api/admin/foundations/pending
      //
      // Donations:
      // GET /api/admin/donations
      //
      // ---------------------------------------------------

      const [
        usersData,
        pendingFoundationsData,
        donationsData,
      ] = await Promise.all([

        fetchApi(
          `${USERS_API}?page=0&size=100`
        ),

        fetchApi(
          `${FOUNDATIONS_API}/pending`
        ),

        fetchApi(
          `${DONATIONS_API}?page=0&size=100`
        ),

      ]);


      // ===================================================
      // USERS
      // ===================================================

      const usersList =
        Array.isArray(usersData)
          ? usersData
          : usersData?.content || [];

      setUsers(usersList);


      // ===================================================
      // PENDING FOUNDATIONS
      // ===================================================

      const foundationList =
        Array.isArray(
          pendingFoundationsData
        )
          ? pendingFoundationsData
          : pendingFoundationsData?.content || [];

      setPendingFoundations(
        foundationList
      );


      // ===================================================
      // DONATIONS
      // ===================================================

      const donationsList =
        Array.isArray(donationsData)
          ? donationsData
          : donationsData?.content || [];

      setDonations(
        donationsList
      );


      // ===================================================
      // REFRESH TIME
      // ===================================================

      setLastRefreshed(
        new Date()
      );

    } catch (err) {

      console.error(
        "Admin dashboard error:",
        err
      );

      setError(
        err.message ||
          "Failed to load admin dashboard."
      );

    } finally {

      setLoading(false);
    }
  };


  // =======================================================
  // INITIAL LOAD
  // =======================================================

  useEffect(() => {

    loadDashboard();

  }, []);


  // =======================================================
  // USER STATISTICS
  // =======================================================

  const userStats = useMemo(() => {

    return {

      total: users.length,

      donors:
        users.filter(
          (user) =>
            user.role === "DONOR"
        ).length,

      foundations:
        users.filter(
          (user) =>
            user.role === "FOUNDATION"
        ).length,

      admins:
        users.filter(
          (user) =>
            user.role === "ADMIN"
        ).length,

      active:
        users.filter(
          (user) =>
            user.status === "ACTIVE"
        ).length,

      inactive:
        users.filter(
          (user) =>
            user.status !== "ACTIVE"
        ).length,
    };

  }, [users]);


  // =======================================================
  // DONATION STATISTICS
  // =======================================================

  const donationStats = useMemo(() => {

    const stats = {
      AVAILABLE: 0,
      ACCEPTED: 0,
      PICKED_UP: 0,
      DELIVERED: 0,
      EXPIRED: 0,
    };


    donations.forEach(
      (donation) => {

        if (
          stats[
            donation.status
          ] !== undefined
        ) {

          stats[
            donation.status
          ]++;
        }

      }
    );


    return stats;

  }, [donations]);


  // =======================================================
  // TOTAL FOOD QUANTITY
  // =======================================================

  const totalFoodQuantity =
    useMemo(() => {

      return donations.reduce(
        (total, donation) => {

          const quantity =
            Number(
              donation.quantity
            ) || 0;

          return total + quantity;

        },
        0
      );

    }, [donations]);


  // =======================================================
  // FOUNDATION STATISTICS
  // =======================================================

  const foundationStats =
    useMemo(() => {

      return {

        totalUsers:
          userStats.foundations,

        pending:
          pendingFoundations.length,

      };

    }, [
      userStats.foundations,
      pendingFoundations,
    ]);


  // =======================================================
  // RECENT DONATIONS
  // =======================================================

  const recentDonations =
    useMemo(() => {

      return [...donations]
        .sort(
          (a, b) =>
            new Date(
              b.createdAt
            ) -
            new Date(
              a.createdAt
            )
        )
        .slice(0, 5);

    }, [donations]);


  // =======================================================
  // REFRESH
  // =======================================================

  const handleRefresh = () => {

    loadDashboard();

  };


  // =======================================================
  // LOADING SCREEN
  // =======================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

        <div className="flex min-h-[500px] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

            <p className="text-sm text-gray-500">
              Loading admin dashboard...
            </p>

          </div>

        </div>

      </div>
    );
  }


  // =======================================================
  // MAIN DASHBOARD
  // =======================================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            FoodBridge platform overview and operational insights.
          </p>

        </div>


        <div className="flex items-center gap-3">

          {lastRefreshed && (

            <span className="hidden text-xs text-gray-400 sm:block">
              Updated{" "}
              {lastRefreshed.toLocaleTimeString(
                "en-IN"
              )}
            </span>

          )}


          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ↻ Refresh
          </button>

        </div>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4">

          <div>

            <p className="text-sm font-semibold text-red-800">
              Dashboard Error
            </p>

            <p className="mt-1 text-sm text-red-700">
              {error}
            </p>

          </div>


          <button
            type="button"
            onClick={() =>
              setError("")
            }
            className="text-lg font-bold text-red-500 hover:text-red-700"
          >
            ×
          </button>

        </div>

      )}


      {/* =================================================
          MAIN STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">


        {/* TOTAL USERS */}

        <StatCard
          title="Total Users"
          value={userStats.total}
          subtitle={`${userStats.active} active accounts`}
          icon="👥"
        />


        {/* FOUNDATION USERS */}

        <StatCard
          title="Foundation Users"
          value={userStats.foundations}
          subtitle={`${foundationStats.pending} pending profiles`}
          icon="🏢"
        />


        {/* DONATIONS */}

        <StatCard
          title="Total Donations"
          value={donations.length}
          subtitle={`${donationStats.DELIVERED} delivered`}
          icon="🍱"
        />


        {/* FOOD */}

        <StatCard
          title="Food Quantity"
          value={`${totalFoodQuantity.toFixed(2)} KG`}
          subtitle="Across loaded donations"
          icon="⚖️"
        />

      </div>


      {/* =================================================
          SECONDARY STATISTICS
      ================================================= */}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <MiniStat
          title="Donors"
          value={userStats.donors}
        />

        <MiniStat
          title="Admins"
          value={userStats.admins}
        />

        <MiniStat
          title="Pending Foundations"
          value={foundationStats.pending}
        />

        <MiniStat
          title="Expired Donations"
          value={donationStats.EXPIRED}
        />

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">


        {/* =================================================
            DONATION STATUS
        ================================================= */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-1">

          <div className="mb-5">

            <h2 className="text-lg font-bold text-gray-900">
              Donation Status
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current donation lifecycle.
            </p>

          </div>


          <div className="space-y-5">

            {Object.entries(
              STATUS_CONFIG
            ).map(
              ([status, config]) => {

                const count =
                  donationStats[
                    status
                  ] || 0;


                const percentage =
                  donations.length > 0
                    ? Math.round(
                        (count /
                          donations.length) *
                          100
                      )
                    : 0;


                return (
                  <div
                    key={status}
                  >

                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <span>
                          {config.icon}
                        </span>

                        <span className="text-sm font-medium text-gray-700">
                          {config.label}
                        </span>

                      </div>


                      <div className="flex items-center gap-2">

                        <span className="text-sm font-bold text-gray-900">
                          {count}
                        </span>

                        <span className="text-xs text-gray-400">
                          ({percentage}%)
                        </span>

                      </div>

                    </div>


                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                      <div
                        className="h-full rounded-full bg-gray-900 transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>


        {/* =================================================
            RECENT DONATIONS
        ================================================= */}

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

            <div>

              <h2 className="text-lg font-bold text-gray-900">
                Recent Donations
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest donation activity.
              </p>

            </div>


            <a
              href="/admin/donations"
              className="text-sm font-semibold text-gray-700 transition hover:text-gray-900"
            >
              View all →
            </a>

          </div>


          {recentDonations.length === 0 ? (

            <div className="flex min-h-[300px] items-center justify-center p-6">

              <p className="text-sm text-gray-500">
                No donations available.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-gray-100">

              {recentDonations.map(
                (donation) => (

                  <div
                    key={donation.id}
                    className="flex flex-col gap-4 px-5 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div className="min-w-0">

                      <div className="flex items-center gap-2">

                        <h3 className="truncate text-sm font-semibold text-gray-900">
                          {donation.foodName}
                        </h3>

                        <span className="text-xs text-gray-400">
                          #{donation.id}
                        </span>

                      </div>


                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">

                        <span>
                          {donation.donorName}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {donation.quantity}{" "}
                          {donation.quantityUnit}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {formatDate(
                            donation.createdAt
                          )}
                        </span>

                      </div>


                      <p className="mt-1 truncate text-xs text-gray-400">
                        {donation.foundationName ||
                          "No foundation assigned"}
                      </p>

                    </div>


                    <span
                      className={`w-fit shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                        donation.status
                      )}`}
                    >
                      {formatStatus(
                        donation.status
                      )}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>


      {/* =================================================
          FOUNDATION VERIFICATION
      ================================================= */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-lg font-bold text-gray-900">
              Foundation Verification
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Foundations currently awaiting admin verification.
            </p>

          </div>


          <a
            href="/admin/foundations"
            className="text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            Manage foundations →
          </a>

        </div>


        {pendingFoundations.length === 0 ? (

          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">

            <div className="mb-3 text-2xl">
              ✓
            </div>

            <p className="text-sm font-semibold text-gray-900">
              No pending foundations
            </p>

            <p className="mt-1 text-xs text-gray-500">
              All currently loaded foundation profiles have been processed.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

            {pendingFoundations
              .slice(0, 6)
              .map(
                (foundation) => (

                  <div
                    key={
                      foundation.id
                    }
                    className="rounded-xl border border-gray-200 p-4 transition hover:border-gray-300 hover:shadow-sm"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <h3 className="truncate text-sm font-bold text-gray-900">
                          {
                            foundation.organizationName
                          }
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          ID #{foundation.id}
                        </p>

                      </div>


                      <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                        Pending
                      </span>

                    </div>


                    <div className="mt-4 space-y-2">

                      <InfoRow
                        label="Registration"
                        value={
                          foundation.registrationNumber
                        }
                      />

                      <InfoRow
                        label="City"
                        value={
                          foundation.city
                        }
                      />

                      <InfoRow
                        label="State"
                        value={
                          foundation.state
                        }
                      />

                    </div>


                    <a
                      href={`/admin/foundations/${foundation.id}`}
                      className="mt-4 block w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-xs font-semibold text-gray-700 transition hover:bg-gray-900 hover:text-white"
                    >
                      Review Foundation
                    </a>

                  </div>

                )
              )}

          </div>

        )}

      </div>


      {/* =================================================
          USER OVERVIEW
      ================================================= */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="mb-5">

          <h2 className="text-lg font-bold text-gray-900">
            User Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current platform user distribution.
          </p>

        </div>


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <OverviewBox
            title="Donors"
            value={userStats.donors}
            description="Registered donor accounts"
          />

          <OverviewBox
            title="Foundations"
            value={userStats.foundations}
            description="Registered foundation accounts"
          />

          <OverviewBox
            title="Admins"
            value={userStats.admins}
            description="Administrator accounts"
          />

          <OverviewBox
            title="Active"
            value={userStats.active}
            description="Active user accounts"
          />

        </div>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-semibold text-gray-900">
              FoodBridge Administration
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Monitor food redistribution activity across the platform.
            </p>

          </div>


          {lastRefreshed && (

            <p className="text-xs text-gray-400">
              Last refreshed:{" "}
              {lastRefreshed.toLocaleString(
                "en-IN"
              )}
            </p>

          )}

        </div>

      </div>

    </div>
  );
}


// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="min-w-0">

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 truncate text-2xl font-bold text-gray-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {subtitle}
          </p>

        </div>


        <div className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl">
          {icon}
        </div>

      </div>

    </div>
  );
}


// =========================================================
// MINI STAT
// =========================================================

function MiniStat({
  title,
  value,
}) {

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold text-gray-900">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// OVERVIEW BOX
// =========================================================

function OverviewBox({
  title,
  value,
  description,
}) {

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

      <p className="text-sm font-semibold text-gray-700">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>

    </div>
  );
}


// =========================================================
// INFO ROW
// =========================================================

function InfoRow({
  label,
  value,
}) {

  return (
    <div className="flex items-center justify-between gap-3 text-xs">

      <span className="text-gray-400">
        {label}
      </span>

      <span className="max-w-[60%] truncate text-right font-medium text-gray-700">
        {value || "-"}
      </span>

    </div>
  );
}


export default AdminDashboard;