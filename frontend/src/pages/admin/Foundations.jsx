
import { useCallback, useEffect, useState } from "react";

import {
  Building2,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  MapPin,
  FileText,
  Clock,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";

import toast from "react-hot-toast";


// =========================================================
// API
// =========================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// =========================================================
// FOUNDATIONS PAGE
// =========================================================

function Foundations() {

  const [foundations, setFoundations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [selectedFoundation, setSelectedFoundation] =
    useState(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [actionType, setActionType] =
    useState(null);

  const [rejectReason, setRejectReason] =
    useState("");

  const [showRejectModal, setShowRejectModal] =
    useState(false);

  const [showDetailsModal, setShowDetailsModal] =
    useState(false);


  // =======================================================
  // GET TOKEN
  // =======================================================

  const getToken = () => {

    return localStorage.getItem("token");

  };


  // =======================================================
  // LOAD PENDING FOUNDATIONS
  // =======================================================

  const loadPendingFoundations = useCallback(
    async (isRefresh = false) => {

      try {

        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");


        const token = getToken();


        if (!token) {
          throw new Error(
            "Authentication token not found."
          );
        }


        const response = await fetch(
          `${API_BASE_URL}/admin/foundations/pending`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );


        const result = await response.json();


        if (!response.ok) {

          throw new Error(
            result?.message ||
              "Failed to load pending foundations."
          );
        }


        setFoundations(
          result?.data || []
        );

      } catch (error) {

        console.error(
          "Failed to load foundations:",
          error
        );

        setError(
          error.message ||
            "Unable to load foundations."
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

    loadPendingFoundations();

  }, [loadPendingFoundations]);


  // =======================================================
  // VIEW FOUNDATION DETAILS
  // =======================================================

  const viewFoundation = async (foundationId) => {

    try {

      setDetailsLoading(true);

      setShowDetailsModal(true);

      setSelectedFoundation(null);


      const token = getToken();


      if (!token) {
        throw new Error(
          "Authentication token not found."
        );
      }


      const response = await fetch(
        `${API_BASE_URL}/admin/foundations/${foundationId}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );


      const result = await response.json();


      if (!response.ok) {

        throw new Error(
          result?.message ||
            "Failed to load foundation."
        );
      }


      setSelectedFoundation(
        result?.data
      );

    } catch (error) {

      console.error(
        "Failed to load foundation:",
        error
      );

      setError(
        error.message ||
          "Unable to load foundation details."
      );

      setShowDetailsModal(false);

    } finally {

      setDetailsLoading(false);

    }
  };


  // =======================================================
  // APPROVE FOUNDATION
  // =======================================================

  const approveFoundation = async (
    foundationId
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to approve this foundation?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(true);

      setActionType("approve");

      setError("");


      const token = getToken();


      if (!token) {
        throw new Error(
          "Authentication token not found."
        );
      }


      const response = await fetch(
        `${API_BASE_URL}/admin/foundations/${foundationId}/approve`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result?.message ||
            "Failed to approve foundation."
        );
      }


      // Remove approved foundation
      // from pending list.

      setFoundations(
        (previous) =>
          previous.filter(
            (foundation) =>
              foundation.id !==
              foundationId
          )
      );


      setShowDetailsModal(false);

      setSelectedFoundation(null);

      toast.success(
        "Foundation approved successfully.",
        {
          duration: 3500,
        }
      );

    } catch (error) {

      console.error(
        "Failed to approve foundation:",
        error
      );

      const message =
        error.message ||
        "Unable to approve foundation.";

      setError(message);
      toast.error(message);

    } finally {

      setActionLoading(false);

      setActionType(null);

    }
  };


  // =======================================================
  // OPEN REJECT MODAL
  // =======================================================

  const openRejectModal = (
    foundation
  ) => {

    setSelectedFoundation(
      foundation
    );

    setRejectReason("");

    setShowRejectModal(true);

  };


  // =======================================================
  // REJECT FOUNDATION
  // =======================================================

  const rejectFoundation = async () => {

    if (!selectedFoundation) {
      return;
    }


    const reason =
      rejectReason.trim();


    if (!reason) {

      setError(
        "Please provide a rejection reason."
      );

      return;
    }


    if (reason.length < 5) {

      setError(
        "Rejection reason must contain at least 5 characters."
      );

      return;
    }


    try {

      setActionLoading(true);

      setActionType("reject");

      setError("");


      const token = getToken();


      if (!token) {
        throw new Error(
          "Authentication token not found."
        );
      }


      const params =
        new URLSearchParams();

      params.append(
        "reason",
        reason
      );


      const response = await fetch(
        `${API_BASE_URL}/admin/foundations/${selectedFoundation.id}/reject?${params.toString()}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result?.message ||
            "Failed to reject foundation."
        );
      }


      // Remove rejected foundation
      // from pending list.

      setFoundations(
        (previous) =>
          previous.filter(
            (foundation) =>
              foundation.id !==
              selectedFoundation.id
          )
      );


      setShowRejectModal(false);

      setShowDetailsModal(false);

      setSelectedFoundation(null);

      setRejectReason("");

      toast.success(
        "Foundation rejected successfully.",
        {
          duration: 3500,
        }
      );

    } catch (error) {

      console.error(
        "Failed to reject foundation:",
        error
      );

      const message =
        error.message ||
        "Unable to reject foundation.";

      setError(message);
      toast.error(message);

    } finally {

      setActionLoading(false);

      setActionType(null);

    }
  };


  // =======================================================
  // FORMAT DATE
  // =======================================================

  const formatDate = (
    value
  ) => {

    if (!value) {
      return "—";
    }

    return new Date(
      value
    ).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };


  // =======================================================
  // LOADING STATE
  // =======================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#F8FAFD] px-5 py-8 text-[#17233D] sm:px-8 lg:px-10">

        <PageHeader />

        <div className="mt-8 grid gap-4">

          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="
                  h-32
                  animate-pulse
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white
                "
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


      {/* ===================================================
          HEADER
      =================================================== */}

      <PageHeader
        refreshing={refreshing}
        onRefresh={() =>
          loadPendingFoundations(true)
        }
      />


      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (

        <div
          className="
            mt-6
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            text-red-700
          "
        >

          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

          <span className="flex-1">
            {error}
          </span>

          <button
            onClick={() =>
              setError("")
            }
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>

        </div>

      )}


      {/* ===================================================
          SUMMARY
      =================================================== */}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <SummaryCard
          icon={Clock}
          label="Pending Review"
          value={foundations.length}
        />

        <SummaryCard
          icon={Building2}
          label="Current Queue"
          value={foundations.length}
        />

        <SummaryCard
          icon={FileText}
          label="Verification Required"
          value={foundations.length}
        />

      </div>


      {/* ===================================================
          PENDING FOUNDATIONS
      =================================================== */}

      <section className="mt-8">

        <div className="mb-4">

          <h2 className="text-lg font-bold text-[#111827]">
            Pending Foundations
          </h2>

          <p className="mt-1 text-sm text-[#17233D]">
            Review foundation registration requests before approval.
          </p>

        </div>


        {foundations.length === 0 ? (

          <EmptyState />

        ) : (

          <div className="overflow-hidden rounded-2xl border border-[#E6EAF0]">

            {/* =========================================
                DESKTOP TABLE
            ========================================= */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full min-w-[900px]">

                <thead className="border-b border-[#E6EAF0] bg-white">

                  <tr>

                    <TableHeader>
                      Foundation
                    </TableHeader>

                    <TableHeader>
                      Registration
                    </TableHeader>

                    <TableHeader>
                      Location
                    </TableHeader>

                    <TableHeader>
                      Status
                    </TableHeader>

                    <TableHeader>
                      Created
                    </TableHeader>

                    <TableHeader align="right">
                      Actions
                    </TableHeader>

                  </tr>

                </thead>


                <tbody className="divide-y divide-[#EEF1F5]">

                  {foundations.map(
                    (foundation) => (

                      <tr
                        key={foundation.id}
                        className="transition hover:bg-white"
                      >

                        <td className="px-5 py-5">

                          <div>

                            <p className="font-bold text-[#111827]">
                              {foundation.organizationName}
                            </p>

                            <p className="mt-1 text-xs text-[#334155]">
                              ID #{foundation.id}
                            </p>

                          </div>

                        </td>


                        <td className="px-5 py-5">

                          <span className="text-sm font-semibold text-[#111827]">
                            {foundation.registrationNumber}
                          </span>

                        </td>


                        <td className="px-5 py-5">

                          <div className="flex items-start gap-2">

                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#334155]" />

                            <div>

                              <p className="text-sm font-semibold text-[#111827]">
                                {foundation.city}
                              </p>

                              <p className="text-xs font-semibold text-[#334155]">
                                {foundation.state}
                              </p>

                            </div>

                          </div>

                        </td>


                        <td className="px-5 py-5">

                          <StatusBadge
                            status={
                              foundation.verificationStatus
                            }
                          />

                        </td>


                        <td className="px-5 py-5">

                          <span className="text-sm font-semibold text-[#111827]">
                            {formatDate(
                              foundation.createdAt
                            )}
                          </span>

                        </td>


                        <td className="px-5 py-5">

                          <div className="flex justify-end gap-2">

                            <ActionButton
                              icon={Eye}
                              label="View"
                              onClick={() =>
                                viewFoundation(
                                  foundation.id
                                )
                              }
                            />

                            <ActionButton
                              icon={CheckCircle2}
                              label="Approve"
                              success
                              onClick={() =>
                                approveFoundation(
                                  foundation.id
                                )
                              }
                              loading={
                                actionLoading &&
                                actionType ===
                                  "approve"
                              }
                            />

                            <ActionButton
                              icon={XCircle}
                              label="Reject"
                              danger
                              onClick={() =>
                                openRejectModal(
                                  foundation
                                )
                              }
                            />

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>


            {/* =========================================
                MOBILE CARDS
            ========================================= */}

            <div className="divide-y divide-[#EEF1F5] md:hidden">

              {foundations.map(
                (foundation) => (

                  <FoundationCard
                    key={foundation.id}
                    foundation={foundation}
                    onView={() =>
                      viewFoundation(
                        foundation.id
                      )
                    }
                    onApprove={() =>
                      approveFoundation(
                        foundation.id
                      )
                    }
                    onReject={() =>
                      openRejectModal(
                        foundation
                      )
                    }
                  />

                )
              )}

            </div>

          </div>
        )}

      </section>


      {/* ===================================================
          DETAILS MODAL
      =================================================== */}

      {showDetailsModal && (

        <DetailsModal
          foundation={selectedFoundation}
          loading={detailsLoading}
          onClose={() =>
            setShowDetailsModal(false)
          }
          onApprove={() => {

            if (selectedFoundation) {
              approveFoundation(
                selectedFoundation.id
              );
            }

          }}
          onReject={() => {

            if (selectedFoundation) {

              setShowDetailsModal(false);

              openRejectModal(
                selectedFoundation
              );
            }

          }}
          actionLoading={actionLoading}
        />

      )}


      {/* ===================================================
          REJECT MODAL
      =================================================== */}

      {showRejectModal && (

        <RejectModal
          foundation={selectedFoundation}
          reason={rejectReason}
          setReason={setRejectReason}
          loading={actionLoading}
          onClose={() =>
            setShowRejectModal(false)
          }
          onReject={
            rejectFoundation
          }
        />

      )}

    </div>
  );
}


// =========================================================
// PAGE HEADER
// =========================================================

function PageHeader({
  refreshing = false,
  onRefresh,
}) {

  return (
    <header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1557D6]">
            Administration
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Foundations
          </h1>

          <p className="mt-2 text-sm text-[#17233D]">
            Review and manage foundation verification requests.
          </p>

        </div>


        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#D9E1ED]
            bg-white
            px-4
            py-2.5
            text-sm
            text-[#111827]
            transition
            hover:bg-[#EEF3FB]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          <RefreshCw
            className={`h-4 w-4 ${
              refreshing
                ? "animate-spin"
                : ""
            }`}
          />

          Refresh

        </button>

      </div>

    </header>
  );
}


// =========================================================
// SUMMARY CARD
// =========================================================

function SummaryCard({
  icon: Icon,
  label,
  value,
}) {

  return (
    <div className="rounded-2xl border border-[#E6EAF0] bg-white shadow-[0_3px_14px_rgba(23,35,61,0.035)] p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold text-[#111827]">
            {label}
          </p>

          <p className="mt-2 text-2xl font-extrabold text-[#111827]">
            {value}
          </p>

        </div>


        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2F6FF]">

          <Icon className="h-5 w-5 text-[#1557D6]" />

        </div>

      </div>

    </div>
  );
}


// =========================================================
// TABLE HEADER
// =========================================================

function TableHeader({
  children,
  align = "left",
}) {

  return (
    <th
      className={`px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-[#111827] ${
        align === "right"
          ? "text-right"
          : "text-left"
      }`}
    >
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

  const isPending =
    status === "PENDING";


  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-medium
        ${
          isPending
            ? "border-amber-200 bg-amber-50 text-amber-700"
            : "border-[#D9E1ED] bg-white text-[#111827]"
        }
      `}
    >

      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isPending
            ? "bg-amber-500"
            : "bg-[#9AA4B3]"
        }`}
      />

      {status || "UNKNOWN"}

    </span>
  );
}


// =========================================================
// ACTION BUTTON
// =========================================================

function ActionButton({
  icon: Icon,
  label,
  onClick,
  success = false,
  danger = false,
  loading = false,
}) {

  return (
    <button
      onClick={onClick}
      disabled={loading}
      title={label}
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-lg
        border
        px-3
        py-2
        text-xs
        font-medium
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50

        ${
          success
            ? "border-[#C9D8F2] bg-[#F2F6FF] text-[#1557D6] hover:bg-[#F2F6FF]"
            : danger
            ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
            : "border-[#E6EAF0] bg-white text-[#111827] hover:bg-[#EEF3FB] hover:text-[#17233D]"
        }
      `}
    >

      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Icon className="h-3.5 w-3.5" />
      )}

      <span className="hidden xl:inline">
        {label}
      </span>

    </button>
  );
}


// =========================================================
// MOBILE FOUNDATION CARD
// =========================================================

function FoundationCard({
  foundation,
  onView,
  onApprove,
  onReject,
}) {

  return (
    <div className="p-5">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <h3 className="truncate font-bold text-[#111827]">
            {foundation.organizationName}
          </h3>

          <p className="mt-1 text-xs text-[#334155]">
            Registration:{" "}
            {foundation.registrationNumber}
          </p>

        </div>


        <StatusBadge
          status={
            foundation.verificationStatus
          }
        />

      </div>


      <div className="mt-4 space-y-2 text-sm text-[#17233D]">

        <div className="flex items-center gap-2">

          <MapPin className="h-4 w-4 text-[#334155]" />

          {foundation.city},{" "}
          {foundation.state}

        </div>

        <div className="flex items-center gap-2">

          <Clock className="h-4 w-4 text-[#334155]" />

          {new Date(
            foundation.createdAt
          ).toLocaleDateString("en-IN")}

        </div>

      </div>


      <div className="mt-5 flex gap-2">

        <ActionButton
          icon={Eye}
          label="View"
          onClick={onView}
        />

        <ActionButton
          icon={CheckCircle2}
          label="Approve"
          success
          onClick={onApprove}
        />

        <ActionButton
          icon={XCircle}
          label="Reject"
          danger
          onClick={onReject}
        />

      </div>

    </div>
  );
}


// =========================================================
// EMPTY STATE
// =========================================================

function EmptyState() {

  return (
    <div className="rounded-2xl border border-dashed border-[#D9E1ED] bg-white px-6 py-16 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2F6FF]">

        <CheckCircle2 className="h-7 w-7 text-[#1557D6]" />

      </div>

      <h3 className="mt-5 font-semibold text-[#17233D]">
        All caught up
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-[#17233D]">
        There are currently no foundation registrations waiting for verification.
      </p>

    </div>
  );
}


// =========================================================
// DETAILS MODAL
// =========================================================

function DetailsModal({
  foundation,
  loading,
  onClose,
  onApprove,
  onReject,
  actionLoading,
}) {

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#D9E1ED] bg-white">

        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b border-[#E6EAF0] bg-white px-6 py-5">

          <div>

            <p className="text-xs uppercase tracking-wider text-[#1557D6]">
              Foundation Review
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              Foundation Details
            </h2>

          </div>


          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#17233D] hover:bg-[#F2F6FF] hover:text-[#17233D]"
          >
            <X className="h-5 w-5" />
          </button>

        </div>


        {loading ? (

          <div className="flex min-h-80 items-center justify-center">

            <Loader2 className="h-7 w-7 animate-spin text-[#1557D6]" />

          </div>

        ) : foundation ? (

          <>

            <div className="grid gap-6 p-6 sm:grid-cols-2">

              <DetailItem
                label="Organization Name"
                value={
                  foundation.organizationName
                }
              />

              <DetailItem
                label="Registration Number"
                value={
                  foundation.registrationNumber
                }
              />

              <DetailItem
                label="Address"
                value={
                  foundation.address
                }
              />

              <DetailItem
                label="City"
                value={
                  foundation.city
                }
              />

              <DetailItem
                label="State"
                value={
                  foundation.state
                }
              />

              <DetailItem
                label="Pincode"
                value={
                  foundation.pincode
                }
              />

              <DetailItem
                label="Latitude"
                value={
                  foundation.latitude
                }
              />

              <DetailItem
                label="Longitude"
                value={
                  foundation.longitude
                }
              />

              <DetailItem
                label="Verification Status"
                value={
                  foundation.verificationStatus
                }
              />

              <DetailItem
                label="Created At"
                value={
                  foundation.createdAt
                    ? new Date(
                        foundation.createdAt
                      ).toLocaleString(
                        "en-IN"
                      )
                    : "—"
                }
              />

            </div>


            {foundation.rejectionReason && (

              <div className="mx-6 mb-6 rounded-xl border border-red-200 bg-red-50 p-4">

                <p className="text-xs uppercase tracking-wider text-red-600">
                  Rejection Reason
                </p>

                <p className="mt-2 text-sm text-red-700">
                  {foundation.rejectionReason}
                </p>

              </div>

            )}


            {/* Actions */}

            {foundation.verificationStatus ===
              "PENDING" && (

              <div className="flex flex-col-reverse gap-3 border-t border-[#E6EAF0] p-6 sm:flex-row sm:justify-end">

                <button
                  onClick={onReject}
                  disabled={actionLoading}
                  className="
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-red-600
                    hover:bg-red-100
                    disabled:opacity-50
                  "
                >
                  Reject
                </button>


                <button
                  onClick={onApprove}
                  disabled={actionLoading}
                  className="
                    rounded-xl
                    bg-[#1557D6]
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-[#0F46B5]
                    disabled:opacity-50
                  "
                >
                  {actionLoading
                    ? "Processing..."
                    : "Approve Foundation"}
                </button>

              </div>
            )}

          </>

        ) : null}

      </div>

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
    <div className="rounded-xl border border-[#E6EAF0] bg-white p-4">

      <p className="text-xs font-extrabold uppercase tracking-wider text-[#111827]">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-bold text-[#111827]">
        {value ?? "—"}
      </p>

    </div>
  );
}


// =========================================================
// REJECT MODAL
// =========================================================

function RejectModal({
  foundation,
  reason,
  setReason,
  loading,
  onClose,
  onReject,
}) {

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl border border-[#D9E1ED] bg-white">

        <div className="flex items-center justify-between border-b border-[#E6EAF0] px-6 py-5">

          <div>

            <p className="text-xs uppercase tracking-wider text-red-600">
              Verification Action
            </p>

            <h2 className="mt-1 font-semibold text-[#17233D]">
              Reject Foundation
            </h2>

          </div>


          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-[#17233D] hover:bg-[#F2F6FF] hover:text-[#17233D]"
          >
            <X className="h-5 w-5" />
          </button>

        </div>


        <div className="p-6">

          <p className="text-sm font-semibold text-[#111827]">

            You are rejecting{" "}

            <span className="font-bold text-[#111827]">
              {foundation?.organizationName}
            </span>
            .

          </p>


          <label className="mt-5 block">

            <span className="text-sm font-medium text-[#111827]">
              Rejection reason
            </span>


            <textarea
              value={reason}
              onChange={(event) =>
                setReason(
                  event.target.value
                )
              }
              disabled={loading}
              rows={5}
              maxLength={500}
              placeholder="Explain why this foundation registration is being rejected..."
              className="
                mt-2
                w-full
                resize-none
                rounded-xl
                border
                border-[#D9E1ED]
                bg-white
                px-4
                py-3
                text-sm
                text-[#17233D]
                outline-none
                placeholder:text-[#111827]
                focus:border-red-300
              "
            />

          </label>


          <div className="mt-2 flex justify-end">

            <span className="text-xs font-semibold text-[#334155]">
              {reason.length}/500
            </span>

          </div>


          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              onClick={onClose}
              disabled={loading}
              className="
                rounded-xl
                border
                border-[#D9E1ED]
                px-5
                py-2.5
                text-sm
                text-[#111827]
                hover:bg-[#F2F6FF]
              "
            >
              Cancel
            </button>


            <button
              onClick={onReject}
              disabled={
                loading ||
                !reason.trim()
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-500
                px-5
                py-2.5
                text-sm
                font-semibold
                text-[#17233D]
                hover:bg-red-400
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {loading
                ? "Rejecting..."
                : "Reject Foundation"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


export default Foundations;
