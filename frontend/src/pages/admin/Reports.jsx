import { useCallback, useEffect, useMemo, useState } from "react";

import {
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  Download,
  Loader2,
  PackageCheck,
  RefreshCw,
  TrendingUp,
  Users,
  Utensils,
  XCircle,
} from "lucide-react";

// =========================================================
// API
// =========================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

const USERS_API =
  `${API_BASE_URL}/admin/users`;

const PENDING_FOUNDATIONS_API =
  `${API_BASE_URL}/admin/foundations/pending`;

const DONATIONS_API =
  `${API_BASE_URL}/admin/donations`;


// =========================================================
// REPORTS
// =========================================================

function Reports() {

  // =======================================================
  // STATE
  // =======================================================

  const [users, setUsers] = useState([]);

  const [pendingFoundations, setPendingFoundations] =
    useState([]);

  const [donations, setDonations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [lastUpdated, setLastUpdated] =
    useState(null);


  // =======================================================
  // TOKEN
  // =======================================================

  const getToken = () => {
    return localStorage.getItem("token");
  };


  // =======================================================
  // FETCH API
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


    let result = null;

    try {
      result = await response.json();
    } catch {
      result = null;
    }


    if (!response.ok) {

      throw new Error(
        result?.message ||
        `Request failed with status ${response.status}`
      );
    }


    if (
      result &&
      result.success === false
    ) {

      throw new Error(
        result.message ||
        "Request failed."
      );
    }


    return result?.data;
  };


  // =======================================================
  // LOAD REPORT DATA
  // =======================================================

  const loadReports = useCallback(
    async (isRefresh = false) => {

      try {

        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");


        const [
          usersData,
          pendingFoundationsData,
          donationsData,
        ] = await Promise.all([

          fetchApi(
            `${USERS_API}?page=0&size=100`
          ),

          fetchApi(
            PENDING_FOUNDATIONS_API
          ),

          fetchApi(
            `${DONATIONS_API}?page=0&size=100`
          ),

        ]);


        // =================================================
        // USERS
        // =================================================

        const usersList =
          Array.isArray(usersData)
            ? usersData
            : usersData?.content || [];

        setUsers(usersList);


        // =================================================
        // PENDING FOUNDATIONS
        // =================================================

        const foundationsList =
          Array.isArray(
            pendingFoundationsData
          )
            ? pendingFoundationsData
            : pendingFoundationsData?.content || [];

        setPendingFoundations(
          foundationsList
        );


        // =================================================
        // DONATIONS
        // =================================================

        const donationsList =
          Array.isArray(donationsData)
            ? donationsData
            : donationsData?.content || [];

        setDonations(
          donationsList
        );


        setLastUpdated(
          new Date()
        );

      } catch (err) {

        console.error(
          "Reports loading error:",
          err
        );

        setError(
          err.message ||
          "Failed to load reports."
        );

      } finally {

        setLoading(false);
        setRefreshing(false);
      }

    },
    []
  );


  // =======================================================
  // INITIAL LOAD
  // =======================================================

  useEffect(() => {

    loadReports();

  }, [loadReports]);


  // =======================================================
  // USER STATISTICS
  // =======================================================

  const userStats = useMemo(() => {

    const donors =
      users.filter(
        (user) =>
          user.role === "DONOR"
      ).length;


    const foundations =
      users.filter(
        (user) =>
          user.role === "FOUNDATION"
      ).length;


    const admins =
      users.filter(
        (user) =>
          user.role === "ADMIN"
      ).length;


    const active =
      users.filter(
        (user) =>
          user.status === "ACTIVE"
      ).length;


    return {
      total: users.length,
      donors,
      foundations,
      admins,
      active,
    };

  }, [users]);


  // =======================================================
  // DONATION STATISTICS
  // =======================================================

  const donationStats = useMemo(() => {

    const stats = {

      total: donations.length,

      available: 0,

      accepted: 0,

      pickedUp: 0,

      delivered: 0,

      expired: 0,

    };


    donations.forEach(
      (donation) => {

        switch (
          donation.status
        ) {

          case "AVAILABLE":
            stats.available++;
            break;

          case "ACCEPTED":
            stats.accepted++;
            break;

          case "PICKED_UP":
            stats.pickedUp++;
            break;

          case "DELIVERED":
            stats.delivered++;
            break;

          case "EXPIRED":
            stats.expired++;
            break;

          default:
            break;
        }

      }
    );


    return stats;

  }, [donations]);


  // =======================================================
  // TOTAL FOOD
  // =======================================================

  const totalFoodQuantity =
    useMemo(() => {

      return donations.reduce(
        (total, donation) => {

          return (
            total +
            (Number(
              donation.quantity
            ) || 0)
          );

        },
        0
      );

    }, [donations]);


  // =======================================================
  // DELIVERED FOOD
  // =======================================================

  const deliveredFoodQuantity =
    useMemo(() => {

      return donations
        .filter(
          (donation) =>
            donation.status ===
            "DELIVERED"
        )
        .reduce(
          (total, donation) => {

            return (
              total +
              (Number(
                donation.quantity
              ) || 0)
            );

          },
          0
        );

    }, [donations]);


  // =======================================================
  // DELIVERY RATE
  // =======================================================

  const deliveryRate =
    useMemo(() => {

      if (
        donations.length === 0
      ) {
        return 0;
      }


      return Math.round(
        (
          donationStats.delivered /
          donations.length
        ) * 100
      );

    }, [
      donations.length,
      donationStats.delivered,
    ]);


  // =======================================================
  // ACCEPTANCE RATE
  // =======================================================

  const acceptanceRate =
    useMemo(() => {

      if (
        donations.length === 0
      ) {
        return 0;
      }


      const acceptedOrBeyond =
        donationStats.accepted +
        donationStats.pickedUp +
        donationStats.delivered;


      return Math.round(
        (
          acceptedOrBeyond /
          donations.length
        ) * 100
      );

    }, [
      donations.length,
      donationStats,
    ]);


  // =======================================================
  // EXPIRY RATE
  // =======================================================

  const expiryRate =
    useMemo(() => {

      if (
        donations.length === 0
      ) {
        return 0;
      }


      return Math.round(
        (
          donationStats.expired /
          donations.length
        ) * 100
      );

    }, [
      donations.length,
      donationStats.expired,
    ]);


  // =======================================================
  // DONATION STATUS CHART
  // =======================================================

  const statusData = useMemo(() => {

    return [

      {
        label: "Available",
        value:
          donationStats.available,
        color:
          "bg-emerald-400",
      },

      {
        label: "Accepted",
        value:
          donationStats.accepted,
        color:
          "bg-blue-400",
      },

      {
        label: "Picked Up",
        value:
          donationStats.pickedUp,
        color:
          "bg-yellow-400",
      },

      {
        label: "Delivered",
        value:
          donationStats.delivered,
        color:
          "bg-purple-400",
      },

      {
        label: "Expired",
        value:
          donationStats.expired,
        color:
          "bg-red-400",
      },

    ];

  }, [donationStats]);


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
        .slice(0, 10);

    }, [donations]);


  // =======================================================
  // EXPORT REPORT
  // =======================================================

  const exportReport = () => {

    const report = {

      generatedAt:
        new Date().toISOString(),

      summary: {

        totalUsers:
          userStats.total,

        donors:
          userStats.donors,

        foundations:
          userStats.foundations,

        admins:
          userStats.admins,

        pendingFoundations:
          pendingFoundations.length,

        totalDonations:
          donationStats.total,

        available:
          donationStats.available,

        accepted:
          donationStats.accepted,

        pickedUp:
          donationStats.pickedUp,

        delivered:
          donationStats.delivered,

        expired:
          donationStats.expired,

        totalFoodQuantity:
          totalFoodQuantity,

        deliveredFoodQuantity:
          deliveredFoodQuantity,

        deliveryRate:
          `${deliveryRate}%`,

        acceptanceRate:
          `${acceptanceRate}%`,

        expiryRate:
          `${expiryRate}%`,
      },

      donations:
        donations,

    };


    const blob =
      new Blob(
        [
          JSON.stringify(
            report,
            null,
            2
          ),
        ],
        {
          type:
            "application/json",
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const anchor =
      document.createElement(
        "a"
      );

    anchor.href = url;

    anchor.download =
      `foodbridge-report-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;

    document.body.appendChild(
      anchor
    );

    anchor.click();

    anchor.remove();

    URL.revokeObjectURL(url);
  };


  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#050505] px-5 py-8 text-white sm:px-8 lg:px-10">

        <PageHeader />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          {[1, 2, 3, 4].map(
            (item) => (

              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              />

            )
          )}

        </div>


        <div className="mt-6 grid gap-6 xl:grid-cols-2">

          {[1, 2].map(
            (item) => (

              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              />

            )
          )}

        </div>

      </div>
    );
  }


  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="min-h-screen bg-[#050505] px-5 py-8 text-white sm:px-8 lg:px-10">


      {/* =================================================
          HEADER
      ================================================= */}

      <PageHeader
        refreshing={refreshing}
        onRefresh={() =>
          loadReports(true)
        }
        onExport={exportReport}
      />


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">

          <XCircle className="mt-0.5 h-5 w-5 shrink-0" />

          <div className="flex-1">
            {error}
          </div>

        </div>

      )}


      {/* =================================================
          PRIMARY STATISTICS
      ================================================= */}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <ReportCard
          icon={Users}
          label="Total Users"
          value={userStats.total}
          description={`${userStats.donors} donors`}
        />


        <ReportCard
          icon={Utensils}
          label="Total Donations"
          value={donationStats.total}
          description={`${donationStats.delivered} delivered`}
        />


        <ReportCard
          icon={PackageCheck}
          label="Food Donated"
          value={`${totalFoodQuantity.toFixed(2)} KG`}
          description={`${deliveredFoodQuantity.toFixed(2)} KG delivered`}
        />


        <ReportCard
          icon={TrendingUp}
          label="Delivery Rate"
          value={`${deliveryRate}%`}
          description="Donation delivery success"
        />

      </div>


      {/* =================================================
          PERFORMANCE STATISTICS
      ================================================= */}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SmallMetric
          icon={Building2}
          label="Foundation Users"
          value={
            userStats.foundations
          }
        />


        <SmallMetric
          icon={Clock3}
          label="Pending Verification"
          value={
            pendingFoundations.length
          }
        />


        <SmallMetric
          icon={CheckCircle2}
          label="Acceptance Rate"
          value={`${acceptanceRate}%`}
        />


        <SmallMetric
          icon={XCircle}
          label="Expiry Rate"
          value={`${expiryRate}%`}
        />

      </div>


      {/* =================================================
          REPORT GRID
      ================================================= */}

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">


        {/* =================================================
            DONATION STATUS
        ================================================= */}

        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Distribution
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Donation Status
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Current donation lifecycle.
              </p>

            </div>


            <BarChart3 className="h-5 w-5 text-gray-600" />

          </div>


          <div className="mt-8 space-y-5">

            {statusData.map(
              (item) => {

                const percentage =
                  donationStats.total > 0
                    ? Math.round(
                        (
                          item.value /
                          donationStats.total
                        ) * 100
                      )
                    : 0;


                return (
                  <div
                    key={item.label}
                  >

                    <div className="mb-2 flex items-center justify-between">

                      <span className="text-sm text-gray-400">
                        {item.label}
                      </span>

                      <span className="text-sm font-semibold text-white">
                        {item.value}
                      </span>

                    </div>


                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">

                      <div
                        className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                        style={{
                          width:
                            `${percentage}%`,
                        }}
                      />

                    </div>


                    <p className="mt-1 text-right text-xs text-gray-600">
                      {percentage}%
                    </p>

                  </div>
                );

              }
            )}

          </div>

        </section>


        {/* =================================================
            FOOD IMPACT
        ================================================= */}

        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Food Impact
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Redistribution Performance
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Food movement across the platform.
            </p>

          </div>


          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">


            <ImpactCard
              label="Total Food"
              value={`${totalFoodQuantity.toFixed(2)} KG`}
            />


            <ImpactCard
              label="Delivered Food"
              value={`${deliveredFoodQuantity.toFixed(2)} KG`}
            />


            <ImpactCard
              label="Delivered Donations"
              value={
                donationStats.delivered
              }
            />


            <ImpactCard
              label="Expired Donations"
              value={
                donationStats.expired
              }
            />

          </div>


          <div className="mt-6 rounded-xl border border-white/[0.06] bg-black/20 p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-400">
                  Food Delivery Progress
                </p>

                <p className="mt-1 text-2xl font-bold text-white">
                  {deliveryRate}%
                </p>

              </div>


              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10">

                <PackageCheck className="h-5 w-5 text-emerald-400" />

              </div>

            </div>


            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.05]">

              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                style={{
                  width:
                    `${deliveryRate}%`,
                }}
              />

            </div>

          </div>

        </section>

      </div>


      {/* =================================================
          USER & FOUNDATION REPORT
      ================================================= */}

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">


        {/* USER REPORT */}

        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Platform
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                User Distribution
              </h2>

            </div>


            <Users className="h-5 w-5 text-gray-600" />

          </div>


          <div className="mt-6 space-y-4">

            <DistributionRow
              label="Donors"
              value={
                userStats.donors
              }
              total={
                userStats.total
              }
            />


            <DistributionRow
              label="Foundations"
              value={
                userStats.foundations
              }
              total={
                userStats.total
              }
            />


            <DistributionRow
              label="Administrators"
              value={
                userStats.admins
              }
              total={
                userStats.total
              } 
            />


            <DistributionRow
              label="Active Users"
              value={
                userStats.active
              }
              total={
                userStats.total
              }
            />

          </div>

        </section>


        {/* FOUNDATION REPORT */}

        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Verification
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Foundation Overview
              </h2>

            </div>


            <Building2 className="h-5 w-5 text-gray-600" />

          </div>


          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <ImpactCard
              label="Foundation Users"
              value={
                userStats.foundations
              }
            />


            <ImpactCard
              label="Pending"
              value={
                pendingFoundations.length
              }
            />


            <ImpactCard
              label="Verified / Processed"
              value={
                Math.max(
                  userStats.foundations -
                  pendingFoundations.length,
                  0
                )
              }
            />

          </div>


          {pendingFoundations.length > 0 && (

            <div className="mt-6 rounded-xl border border-yellow-400/10 bg-yellow-400/5 p-4">

              <div className="flex items-start gap-3">

                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />

                <div>

                  <p className="text-sm font-semibold text-yellow-300">
                    Action Required
                  </p>

                  <p className="mt-1 text-xs leading-5 text-yellow-200/60">
                    {pendingFoundations.length} foundation
                    {pendingFoundations.length !== 1
                      ? "s are"
                      : " is"}{" "}
                    currently waiting for verification.
                  </p>

                </div>

              </div>

            </div>

          )}

        </section>

      </div>


      {/* =================================================
          RECENT DONATIONS
      ================================================= */}

      <section className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">

        <div className="flex flex-col gap-3 border-b border-white/[0.08] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Activity
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Recent Donations
            </h2>

          </div>


          <span className="text-xs text-gray-600">
            Showing latest{" "}
            {Math.min(
              recentDonations.length,
              10
            )}{" "}
            records
          </span>

        </div>


        {recentDonations.length === 0 ? (

          <div className="px-6 py-16 text-center">

            <Utensils className="mx-auto h-8 w-8 text-gray-700" />

            <p className="mt-4 text-sm text-gray-500">
              No donation records available.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead className="border-b border-white/[0.06]">

                <tr>

                  <TableHeader>
                    Food
                  </TableHeader>

                  <TableHeader>
                    Donor
                  </TableHeader>

                  <TableHeader>
                    Quantity
                  </TableHeader>

                  <TableHeader>
                    Foundation
                  </TableHeader>

                  <TableHeader>
                    Status
                  </TableHeader>

                  <TableHeader>
                    Created
                  </TableHeader>

                </tr>

              </thead>


              <tbody className="divide-y divide-white/[0.05]">

                {recentDonations.map(
                  (donation) => (

                    <tr
                      key={
                        donation.id
                      }
                      className="transition hover:bg-white/[0.02]"
                    >

                      <td className="px-6 py-4">

                        <div>

                          <p className="text-sm font-medium text-white">
                            {donation.foodName}
                          </p>

                          <p className="mt-1 text-xs text-gray-600">
                            #{donation.id}
                          </p>

                        </div>

                      </td>


                      <td className="px-6 py-4">

                        <div>

                          <p className="text-sm text-gray-400">
                            {donation.donorName ||
                              "—"}
                          </p>

                          <p className="mt-1 text-xs text-gray-600">
                            {donation.donorEmail ||
                              ""}
                          </p>

                        </div>

                      </td>


                      <td className="px-6 py-4">

                        <span className="text-sm text-gray-400">
                          {donation.quantity}{" "}
                          {donation.quantityUnit}
                        </span>

                      </td>


                      <td className="px-6 py-4">

                        <span className="text-sm text-gray-400">
                          {donation.foundationName ||
                            "Not assigned"}
                        </span>

                      </td>


                      <td className="px-6 py-4">

                        <StatusBadge
                          status={
                            donation.status
                          }
                        />

                      </td>


                      <td className="px-6 py-4">

                        <span className="text-xs text-gray-600">
                          {formatDate(
                            donation.createdAt
                          )}
                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>


      {/* =================================================
          REPORT FOOTER
      ================================================= */}

      <div className="mt-6 flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">

        <span>
          FoodBridge Administration Reports
        </span>

        <span>
          {lastUpdated
            ? `Last updated ${lastUpdated.toLocaleString(
                "en-IN"
              )}`
            : "—"}
        </span>

      </div>

    </div>
  );
}


// =========================================================
// PAGE HEADER
// =========================================================

function PageHeader({
  refreshing = false,
  onRefresh,
  onExport,
}) {

  return (
    <header>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Administration
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Reports & Analytics
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Monitor FoodBridge activity, food redistribution,
            users, foundations, and donation performance.
          </p>

        </div>


        <div className="flex flex-wrap gap-2">

          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
          >

            {refreshing ? (

              <Loader2 className="h-4 w-4 animate-spin" />

            ) : (

              <RefreshCw className="h-4 w-4" />

            )}

            Refresh

          </button>


          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-300"
          >

            <Download className="h-4 w-4" />

            Export Report

          </button>

        </div>

      </div>

    </header>
  );
}


// =========================================================
// REPORT CARD
// =========================================================

function ReportCard({
  icon: Icon,
  label,
  value,
  description,
}) {

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/[0.12] hover:bg-white/[0.03]">

      <div className="flex items-start justify-between">

        <div className="min-w-0">

          <p className="text-sm text-gray-500">
            {label}
          </p>

          <p className="mt-2 truncate text-2xl font-bold text-white">
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-600">
            {description}
          </p>

        </div>


        <div className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">

          <Icon className="h-5 w-5 text-emerald-400" />

        </div>

      </div>

    </div>
  );
}


// =========================================================
// SMALL METRIC
// =========================================================

function SmallMetric({
  icon: Icon,
  label,
  value,
}) {

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">

        <Icon className="h-4 w-4 text-gray-400" />

      </div>


      <div>

        <p className="text-xs text-gray-600">
          {label}
        </p>

        <p className="mt-1 text-lg font-semibold text-white">
          {value}
        </p>

      </div>

    </div>
  );
}


// =========================================================
// IMPACT CARD
// =========================================================

function ImpactCard({
  label,
  value,
}) {

  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4">

      <p className="text-xs text-gray-600">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// DISTRIBUTION ROW
// =========================================================

function DistributionRow({
  label,
  value,
  total,
}) {

  const percentage =
    total > 0
      ? Math.round(
          (value / total) * 100
        )
      : 0;


  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-sm text-gray-400">
          {label}
        </span>

        <span className="text-sm font-semibold text-white">
          {value}
        </span>

      </div>


      <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">

        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-700"
          style={{
            width:
              `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}


// =========================================================
// TABLE HEADER
// =========================================================

function TableHeader({
  children,
}) {

  return (
    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
      {children}
    </th>
  );
}


// =========================================================
// STATUS BADGE
// =========================================================

function StatusBadge({
  status,
}) {

  const config = {

    AVAILABLE:
      "border-emerald-400/20 bg-emerald-400/5 text-emerald-400",

    ACCEPTED:
      "border-blue-400/20 bg-blue-400/5 text-blue-400",

    PICKED_UP:
      "border-yellow-400/20 bg-yellow-400/5 text-yellow-400",

    DELIVERED:
      "border-purple-400/20 bg-purple-400/5 text-purple-400",

    EXPIRED:
      "border-red-400/20 bg-red-400/5 text-red-400",

  };


  const className =
    config[status] ||
    "border-white/[0.1] bg-white/[0.03] text-gray-400";


  const label =
    status
      ? status
          .replaceAll(
            "_",
            " "
          )
          .toLowerCase()
          .replace(
            /\b\w/g,
            (char) =>
              char.toUpperCase()
          )
      : "Unknown";


  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}


// =========================================================
// DATE FORMAT
// =========================================================

function formatDate(
  value
) {

  if (!value) {
    return "—";
  }


  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
  }


  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}


export default Reports;