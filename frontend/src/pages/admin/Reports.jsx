import { useCallback, useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
          "bg-[#1557D6]",
      },

      {
        label: "Accepted",
        value:
          donationStats.accepted,
        color:
          "bg-[#5B8DEF]",
      },

      {
        label: "Picked Up",
        value:
          donationStats.pickedUp,
        color:
          "bg-[#D9A441]",
      },

      {
        label: "Delivered",
        value:
          donationStats.delivered,
        color:
          "bg-[#7B61C9]",
      },

      {
        label: "Expired",
        value:
          donationStats.expired,
        color:
          "bg-[#D95C5C]",
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
  // EXPORT REPORT AS PDF
  // =======================================================

  const exportReport = () => {

    try {

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });


      // =====================================================
      // COLORS
      // =====================================================

      const NAVY = [23, 35, 61];
      const BLUE = [21, 87, 214];
      const LIGHT_BLUE = [242, 246, 255];
      const BORDER = [230, 234, 240];
      const MUTED = [102, 116, 138];
      const LIGHT_TEXT = [123, 135, 154];
      const WHITE = [255, 255, 255];


      // =====================================================
      // HELPERS
      // =====================================================

      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        pdf.internal.pageSize.getHeight();

      const margin = 15;

      let y = 20;


      const checkPage = (requiredHeight = 10) => {

        if (y + requiredHeight > pageHeight - 15) {

          pdf.addPage();

          y = 18;

        }

      };


      const drawSectionTitle = (
        title,
        subtitle = ""
      ) => {

        checkPage(20);

        pdf.setFillColor(
          ...LIGHT_BLUE
        );

        pdf.roundedRect(
          margin,
          y,
          pageWidth - margin * 2,
          subtitle ? 16 : 12,
          3,
          3,
          "F"
        );

        pdf.setTextColor(
          ...BLUE
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(10);

        pdf.text(
          title,
          margin + 5,
          y + 7
        );

        if (subtitle) {

          pdf.setTextColor(
            ...MUTED
          );

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setFontSize(7.5);

          pdf.text(
            subtitle,
            margin + 5,
            y + 12
          );

        }

        y += subtitle ? 22 : 18;

      };


      const drawMetric = (
        x,
        width,
        label,
        value,
        description = ""
      ) => {

        pdf.setDrawColor(
          ...BORDER
        );

        pdf.setFillColor(
          ...WHITE
        );

        const height =
          description ? 27 : 22;

        pdf.roundedRect(
          x,
          y,
          width,
          height,
          3,
          3,
          "FD"
        );

        pdf.setTextColor(
          ...LIGHT_TEXT
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(7);

        pdf.text(
          label,
          x + 4,
          y + 6
        );

        pdf.setTextColor(
          ...NAVY
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(14);

        pdf.text(
          String(value),
          x + 4,
          y + 14
        );

        if (description) {

          pdf.setTextColor(
            ...MUTED
          );

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setFontSize(6.5);

          pdf.text(
            description,
            x + 4,
            y + 20
          );

        }

      };


      const drawKeyValue = (
        label,
        value,
        x,
        width
      ) => {

        pdf.setTextColor(
          ...MUTED
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(8);

        pdf.text(
          label,
          x,
          y
        );

        pdf.setTextColor(
          ...NAVY
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.text(
          String(value),
          x + width,
          y
        );

      };


      const drawTable = (
        headers,
        rows,
        columnWidths = null
      ) => {

        if (!rows || rows.length === 0) {
          return;
        }

        autoTable(pdf, {
          startY: y,
          head: [headers],
          body: rows,

          theme: "grid",

          styles: {
            font: "helvetica",
            fontSize: 7.5,
            textColor: [23, 35, 61],
            lineColor: [230, 234, 240],
            lineWidth: 0.25,
            cellPadding: 3,
            valign: "middle",
          },

          headStyles: {
            fillColor: [23, 35, 61],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 7.5,
            halign: "left",
          },

          alternateRowStyles: {
            fillColor: [248, 250, 253],
          },

          bodyStyles: {
            fillColor: [255, 255, 255],
          },

          margin: {
            left: margin,
            right: margin,
            top: 15,
            bottom: 18,
          },

          tableWidth: "auto",

          columnStyles: columnWidths
            ? Object.fromEntries(
                columnWidths.map(
                  (width, index) => [
                    index,
                    {
                      cellWidth: width,
                    },
                  ]
                )
              )
            : {},

          didDrawPage: () => {
            // Footer is added after the complete document is generated.
          },
        });

        y =
          pdf.lastAutoTable.finalY + 8;

      };

      // =====================================================
      // HEADER
      // =====================================================

      pdf.setFillColor(
        ...BLUE
      );

      pdf.roundedRect(
        margin,
        y,
        pageWidth - margin * 2,
        30,
        4,
        4,
        "F"
      );

      pdf.setTextColor(
        ...WHITE
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(20);

      pdf.text(
        "FoodBridge",
        margin + 7,
        y + 11
      );

      pdf.setFontSize(12);

      pdf.text(
        "Administration Report",
        margin + 7,
        y + 19
      );

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(7);

      pdf.text(
        `Generated: ${new Date().toLocaleString("en-IN")}`,
        pageWidth - margin - 7,
        y + 11,
        { align: "right" }
      );

      pdf.text(
        "Share • Connect • Impact",
        pageWidth - margin - 7,
        y + 18,
        { align: "right" }
      );

      y += 38;


      // =====================================================
      // EXECUTIVE SUMMARY
      // =====================================================

      drawSectionTitle(
        "Executive Summary",
        "Food redistribution platform overview"
      );


      const metricGap = 4;

      const metricWidth =
        (pageWidth - margin * 2 - metricGap * 3) / 4;


      drawMetric(
        margin,
        metricWidth,
        "TOTAL USERS",
        userStats.total,
        `${userStats.active} active`
      );

      drawMetric(
        margin + metricWidth + metricGap,
        metricWidth,
        "TOTAL DONATIONS",
        donationStats.total,
        `${donationStats.delivered} delivered`
      );

      drawMetric(
        margin + (metricWidth + metricGap) * 2,
        metricWidth,
        "FOOD DONATED",
        `${totalFoodQuantity.toFixed(2)} KG`,
        `${deliveredFoodQuantity.toFixed(2)} KG delivered`
      );

      drawMetric(
        margin + (metricWidth + metricGap) * 3,
        metricWidth,
        "DELIVERY RATE",
        `${deliveryRate}%`,
        "Donation delivery success"
      );

      y += 35;


      // =====================================================
      // USER & FOUNDATION OVERVIEW
      // =====================================================

      drawSectionTitle(
        "User & Foundation Overview"
      );

      const overviewRows = [
        ["Total Users", userStats.total],
        ["Donors", userStats.donors],
        ["Foundation Users", userStats.foundations],
        ["Administrators", userStats.admins],
        ["Active Users", userStats.active],
        ["Pending Foundations", pendingFoundations.length],
        [
          "Verified / Processed",
          Math.max(
            userStats.foundations -
            pendingFoundations.length,
            0
          ),
        ],
      ];

      drawTable(
        ["Metric", "Value"],
        overviewRows,
        [
          pageWidth - margin * 2 - 45,
          45,
        ]
      );


      // =====================================================
      // DONATION PERFORMANCE
      // =====================================================

      drawSectionTitle(
        "Donation Performance",
        "Current donation lifecycle statistics"
      );

      const donationRows = [
        ["Available", donationStats.available],
        ["Accepted", donationStats.accepted],
        ["Picked Up", donationStats.pickedUp],
        ["Delivered", donationStats.delivered],
        ["Expired", donationStats.expired],
        ["Total", donationStats.total],
      ];

      drawTable(
        ["Status", "Donations"],
        donationRows,
        [
          pageWidth - margin * 2 - 45,
          45,
        ]
      );


      const rateRows = [
        ["Delivery Rate", `${deliveryRate}%`],
        ["Acceptance Rate", `${acceptanceRate}%`],
        ["Expiry Rate", `${expiryRate}%`],
        ["Total Food", `${totalFoodQuantity.toFixed(2)} KG`],
        ["Delivered Food", `${deliveredFoodQuantity.toFixed(2)} KG`],
      ];

      drawTable(
        ["Performance", "Result"],
        rateRows,
        [
          pageWidth - margin * 2 - 45,
          45,
        ]
      );


      // =====================================================
      // RECENT DONATIONS
      // =====================================================

      drawSectionTitle(
        "Recent Donations",
        "Latest donation activity"
      );

      const recentRows =
        recentDonations.map(
          (donation) => [
            donation.foodName || "—",
            donation.donorName || "—",
            `${donation.quantity ?? "—"} ${donation.quantityUnit || ""}`.trim(),
            donation.foundationName || "Not assigned",
            donation.status
              ? donation.status
                  .replaceAll("_", " ")
                  .toLowerCase()
                  .replace(
                    /\b\w/g,
                    (char) =>
                      char.toUpperCase()
                  )
              : "Unknown",
            formatDate(
              donation.createdAt
            ),
          ]
        );


      if (recentRows.length > 0) {

        drawTable(
          [
            "Food",
            "Donor",
            "Quantity",
            "Foundation",
            "Status",
            "Created",
          ],
          recentRows,
          [
            35,
            32,
            23,
            42,
            27,
            21,
          ]
        );

      } else {

        pdf.setTextColor(
          ...MUTED
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(9);

        pdf.text(
          "No donation records available.",
          margin,
          y
        );

        y += 12;

      }


      // =====================================================
      // FOOTER ON ALL PAGES
      // =====================================================

      const totalPages =
        pdf.internal.getNumberOfPages();

      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {

        pdf.setPage(page);

        pdf.setDrawColor(
          ...BORDER
        );

        pdf.line(
          margin,
          pageHeight - 12,
          pageWidth - margin,
          pageHeight - 12
        );

        pdf.setTextColor(
          ...LIGHT_TEXT
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(6.5);

        pdf.text(
          "FoodBridge • Administration Reports",
          margin,
          pageHeight - 7
        );

        pdf.text(
          `Page ${page} of ${totalPages}`,
          pageWidth - margin,
          pageHeight - 7,
          { align: "right" }
        );

      }


      // =====================================================
      // DOWNLOAD PDF
      // =====================================================

      const date =
        new Date()
          .toISOString()
          .slice(0, 10);

      pdf.save(
        `foodbridge-report-${date}.pdf`
      );

    } catch (err) {

      console.error(
        "PDF export error:",
        err
      );

      setError(
        "Unable to generate PDF report. Please try again."
      );

    }

  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#F8FAFD] px-5 py-8 text-[#17233D] sm:px-8 lg:px-10">

        <PageHeader />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          {[1, 2, 3, 4].map(
            (item) => (

              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl border border-[#EEF1F5] bg-white"
              />

            )
          )}

        </div>


        <div className="mt-6 grid gap-6 xl:grid-cols-2">

          {[1, 2].map(
            (item) => (

              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-[#EEF1F5] bg-white"
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
    <div className="min-h-screen bg-[#F8FAFD] px-5 py-8 text-[#17233D] sm:px-8 lg:px-10">


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

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

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

        <section className="rounded-2xl border border-[#E6EAF0] bg-white p-6 shadow-[0_3px_14px_rgba(23,35,61,0.035)]">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1557D6]">
                Distribution
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Donation Status
              </h2>

              <p className="mt-1 text-sm text-[#7B879A]">
                Current donation lifecycle.
              </p>

            </div>


            <BarChart3 className="h-5 w-5 text-[#9AA4B3]" />

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

                      <span className="text-sm text-[#66748A]">
                        {item.label}
                      </span>

                      <span className="text-sm font-semibold text-[#17233D]">
                        {item.value}
                      </span>

                    </div>


                    <div className="h-2 overflow-hidden rounded-full bg-[#EEF3FB]">

                      <div
                        className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                        style={{
                          width:
                            `${percentage}%`,
                        }}
                      />

                    </div>


                    <p className="mt-1 text-right text-xs text-[#9AA4B3]">
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

        <section className="rounded-2xl border border-[#E6EAF0] bg-white p-6 shadow-[0_3px_14px_rgba(23,35,61,0.035)]">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1557D6]">
              Food Impact
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Redistribution Performance
            </h2>

            <p className="mt-1 text-sm text-[#7B879A]">
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


          <div className="mt-6 rounded-xl border border-[#EEF1F5] bg-[#F8FAFD] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-[#66748A]">
                  Food Delivery Progress
                </p>

                <p className="mt-1 text-2xl font-bold text-[#17233D]">
                  {deliveryRate}%
                </p>

              </div>


              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F6FF]">

                <PackageCheck className="h-5 w-5 text-[#1557D6]" />

              </div>

            </div>


            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EEF3FB]">

              <div
                className="h-full rounded-full bg-[#1557D6] transition-all duration-700"
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

        <section className="rounded-2xl border border-[#E6EAF0] bg-white p-6 shadow-[0_3px_14px_rgba(23,35,61,0.035)]">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1557D6]">
                Platform
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                User Distribution
              </h2>

            </div>


            <Users className="h-5 w-5 text-[#9AA4B3]" />

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

        <section className="rounded-2xl border border-[#E6EAF0] bg-white p-6 shadow-[0_3px_14px_rgba(23,35,61,0.035)]">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1557D6]">
                Verification
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Foundation Overview
              </h2>

            </div>


            <Building2 className="h-5 w-5 text-[#9AA4B3]" />

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

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">

              <div className="flex items-start gap-3">

                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                <div>

                  <p className="text-sm font-semibold text-amber-700">
                    Action Required
                  </p>

                  <p className="mt-1 text-xs leading-5 text-amber-700/70">
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

      <section className="mt-6 overflow-hidden rounded-2xl border border-[#E6EAF0] bg-white">

        <div className="flex flex-col gap-3 border-b border-[#E6EAF0] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1557D6]">
              Activity
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Recent Donations
            </h2>

          </div>


          <span className="text-xs text-[#9AA4B3]">
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

            <Utensils className="mx-auto h-8 w-8 text-[#53627A]" />

            <p className="mt-4 text-sm text-[#7B879A]">
              No donation records available.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead className="border-b border-[#EEF1F5]">

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


              <tbody className="divide-y divide-[#EEF1F5]">

                {recentDonations.map(
                  (donation) => (

                    <tr
                      key={
                        donation.id
                      }
                      className="transition hover:bg-white"
                    >

                      <td className="px-6 py-4">

                        <div>

                          <p className="text-sm font-medium text-[#17233D]">
                            {donation.foodName}
                          </p>

                          <p className="mt-1 text-xs text-[#9AA4B3]">
                            #{donation.id}
                          </p>

                        </div>

                      </td>


                      <td className="px-6 py-4">

                        <div>

                          <p className="text-sm text-[#66748A]">
                            {donation.donorName ||
                              "—"}
                          </p>

                          <p className="mt-1 text-xs text-[#9AA4B3]">
                            {donation.donorEmail ||
                              ""}
                          </p>

                        </div>

                      </td>


                      <td className="px-6 py-4">

                        <span className="text-sm text-[#66748A]">
                          {donation.quantity}{" "}
                          {donation.quantityUnit}
                        </span>

                      </td>


                      <td className="px-6 py-4">

                        <span className="text-sm text-[#66748A]">
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

                        <span className="text-xs text-[#9AA4B3]">
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

      <div className="mt-6 flex flex-col gap-2 border-t border-[#EEF1F5] pt-5 text-xs text-[#9AA4B3] sm:flex-row sm:items-center sm:justify-between">

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

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1557D6]">
            Administration
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Reports & Analytics
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-[#7B879A]">
            Monitor FoodBridge activity, food redistribution,
            users, foundations, and donation performance.
          </p>

        </div>


        <div className="flex flex-wrap gap-2">

          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9E1ED] bg-white px-4 py-2.5 text-sm text-[#53627A] transition hover:bg-[#EEF3FB] disabled:cursor-not-allowed disabled:opacity-50"
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1557D6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0F46B5]"
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
    <div className="rounded-2xl border border-[#E6EAF0] bg-white p-5 shadow-[0_3px_14px_rgba(23,35,61,0.035)] transition hover:border-[#D9E1ED] hover:bg-white">

      <div className="flex items-start justify-between">

        <div className="min-w-0">

          <p className="text-sm text-[#7B879A]">
            {label}
          </p>

          <p className="mt-2 truncate text-2xl font-bold text-[#17233D]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#9AA4B3]">
            {description}
          </p>

        </div>


        <div className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2F6FF]">

          <Icon className="h-5 w-5 text-[#1557D6]" />

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
    <div className="flex items-center gap-4 rounded-2xl border border-[#E6EAF0] bg-white p-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6FF]">

        <Icon className="h-4 w-4 text-[#66748A]" />

      </div>


      <div>

        <p className="text-xs text-[#9AA4B3]">
          {label}
        </p>

        <p className="mt-1 text-lg font-semibold text-[#17233D]">
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
    <div className="rounded-xl border border-[#EEF1F5] bg-[#F8FAFD] p-4">

      <p className="text-xs text-[#9AA4B3]">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-[#17233D]">
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

        <span className="text-sm text-[#66748A]">
          {label}
        </span>

        <span className="text-sm font-semibold text-[#17233D]">
          {value}
        </span>

      </div>


      <div className="h-2 overflow-hidden rounded-full bg-[#EEF3FB]">

        <div
          className="h-full rounded-full bg-[#1557D6] transition-all duration-700"
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
    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9AA4B3]">
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
      "border-[#C9D8F2] bg-[#F2F6FF] text-[#1557D6]",

    ACCEPTED:
      "border-blue-200 bg-blue-50 text-blue-600",

    PICKED_UP:
      "border-yellow-400/20 bg-amber-50 text-amber-600",

    DELIVERED:
      "border-purple-200 bg-purple-50 text-purple-600",

    EXPIRED:
      "border-red-200 bg-red-50 text-red-600",

  };


  const className =
    config[status] ||
    "border-[#D9E1ED] bg-white text-[#66748A]";


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