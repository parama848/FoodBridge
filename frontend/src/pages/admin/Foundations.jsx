// // import { useCallback, useEffect, useState } from "react";

// // import {
// //   Building2,
// //   CheckCircle2,
// //   XCircle,
// //   Eye,
// //   RefreshCw,
// //   MapPin,
// //   FileText,
// //   Clock,
// //   AlertCircle,
// //   X,
// //   Loader2,
// // } from "lucide-react";


// // // =========================================================
// // // API
// // // =========================================================

// // const API_BASE_URL = "http://localhost:8080";


// // // =========================================================
// // // FOUNDATIONS PAGE
// // // =========================================================

// // function Foundations() {

// //   const [foundations, setFoundations] = useState([]);

// //   const [loading, setLoading] = useState(true);

// //   const [refreshing, setRefreshing] = useState(false);

// //   const [error, setError] = useState("");

// //   const [selectedFoundation, setSelectedFoundation] =
// //     useState(null);

// //   const [detailsLoading, setDetailsLoading] =
// //     useState(false);

// //   const [actionLoading, setActionLoading] =
// //     useState(false);

// //   const [actionType, setActionType] =
// //     useState(null);

// //   const [rejectReason, setRejectReason] =
// //     useState("");

// //   const [showRejectModal, setShowRejectModal] =
// //     useState(false);

// //   const [showDetailsModal, setShowDetailsModal] =
// //     useState(false);


// //   // =======================================================
// //   // GET TOKEN
// //   // =======================================================

// //   const getToken = () => {

// //     return localStorage.getItem("token");

// //   };


// //   // =======================================================
// //   // LOAD PENDING FOUNDATIONS
// //   // =======================================================

// //   const loadPendingFoundations = useCallback(
// //     async (isRefresh = false) => {

// //       try {

// //         if (isRefresh) {
// //           setRefreshing(true);
// //         } else {
// //           setLoading(true);
// //         }

// //         setError("");


// //         const token = getToken();


// //         if (!token) {
// //           throw new Error(
// //             "Authentication token not found."
// //           );
// //         }


// //         const response = await fetch(
// //           `${API_BASE_URL}/api/admin/foundations/pending`,
// //           {
// //             method: "GET",

// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               Accept: "application/json",
// //             },
// //           }
// //         );


// //         const result = await response.json();


// //         if (!response.ok) {

// //           throw new Error(
// //             result?.message ||
// //               "Failed to load pending foundations."
// //           );
// //         }


// //         setFoundations(
// //           result?.data || []
// //         );

// //       } catch (error) {

// //         console.error(
// //           "Failed to load foundations:",
// //           error
// //         );

// //         setError(
// //           error.message ||
// //             "Unable to load foundations."
// //         );

// //       } finally {

// //         setLoading(false);
// //         setRefreshing(false);

// //       }

// //     },
// //     []
// //   );


// //   // =======================================================
// //   // INITIAL LOAD
// //   // =======================================================

// //   useEffect(() => {

// //     loadPendingFoundations();

// //   }, [loadPendingFoundations]);


// //   // =======================================================
// //   // VIEW FOUNDATION DETAILS
// //   // =======================================================

// //   const viewFoundation = async (foundationId) => {

// //     try {

// //       setDetailsLoading(true);

// //       setShowDetailsModal(true);

// //       setSelectedFoundation(null);


// //       const token = getToken();


// //       if (!token) {
// //         throw new Error(
// //           "Authentication token not found."
// //         );
// //       }


// //       const response = await fetch(
// //         `${API_BASE_URL}/api/admin/foundations/${foundationId}`,
// //         {
// //           method: "GET",

// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             Accept: "application/json",
// //           },
// //         }
// //       );


// //       const result = await response.json();


// //       if (!response.ok) {

// //         throw new Error(
// //           result?.message ||
// //             "Failed to load foundation."
// //         );
// //       }


// //       setSelectedFoundation(
// //         result?.data
// //       );

// //     } catch (error) {

// //       console.error(
// //         "Failed to load foundation:",
// //         error
// //       );

// //       setError(
// //         error.message ||
// //           "Unable to load foundation details."
// //       );

// //       setShowDetailsModal(false);

// //     } finally {

// //       setDetailsLoading(false);

// //     }
// //   };


// //   // =======================================================
// //   // APPROVE FOUNDATION
// //   // =======================================================

// //   const approveFoundation = async (
// //     foundationId
// //   ) => {

// //     const confirmed =
// //       window.confirm(
// //         "Are you sure you want to approve this foundation?"
// //       );


// //     if (!confirmed) {
// //       return;
// //     }


// //     try {

// //       setActionLoading(true);

// //       setActionType("approve");

// //       setError("");


// //       const token = getToken();


// //       if (!token) {
// //         throw new Error(
// //           "Authentication token not found."
// //         );
// //       }


// //       const response = await fetch(
// //         `${API_BASE_URL}/api/admin/foundations/${foundationId}/approve`,
// //         {
// //           method: "PUT",

// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             Accept: "application/json",
// //           },
// //         }
// //       );


// //       const result =
// //         await response.json();


// //       if (!response.ok) {

// //         throw new Error(
// //           result?.message ||
// //             "Failed to approve foundation."
// //         );
// //       }


// //       // Remove approved foundation
// //       // from pending list.

// //       setFoundations(
// //         (previous) =>
// //           previous.filter(
// //             (foundation) =>
// //               foundation.id !==
// //               foundationId
// //           )
// //       );


// //       setShowDetailsModal(false);

// //       setSelectedFoundation(null);

// //     } catch (error) {

// //       console.error(
// //         "Failed to approve foundation:",
// //         error
// //       );

// //       setError(
// //         error.message ||
// //           "Unable to approve foundation."
// //       );

// //     } finally {

// //       setActionLoading(false);

// //       setActionType(null);

// //     }
// //   };


// //   // =======================================================
// //   // OPEN REJECT MODAL
// //   // =======================================================

// //   const openRejectModal = (
// //     foundation
// //   ) => {

// //     setSelectedFoundation(
// //       foundation
// //     );

// //     setRejectReason("");

// //     setShowRejectModal(true);

// //   };


// //   // =======================================================
// //   // REJECT FOUNDATION
// //   // =======================================================

// //   const rejectFoundation = async () => {

// //     if (!selectedFoundation) {
// //       return;
// //     }


// //     const reason =
// //       rejectReason.trim();


// //     if (!reason) {

// //       setError(
// //         "Please provide a rejection reason."
// //       );

// //       return;
// //     }


// //     if (reason.length < 5) {

// //       setError(
// //         "Rejection reason must contain at least 5 characters."
// //       );

// //       return;
// //     }


// //     try {

// //       setActionLoading(true);

// //       setActionType("reject");

// //       setError("");


// //       const token = getToken();


// //       if (!token) {
// //         throw new Error(
// //           "Authentication token not found."
// //         );
// //       }


// //       const params =
// //         new URLSearchParams();

// //       params.append(
// //         "reason",
// //         reason
// //       );


// //       const response = await fetch(
// //         `${API_BASE_URL}/api/admin/foundations/${selectedFoundation.id}/reject?${params.toString()}`,
// //         {
// //           method: "PUT",

// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             Accept: "application/json",
// //           },
// //         }
// //       );


// //       const result =
// //         await response.json();


// //       if (!response.ok) {

// //         throw new Error(
// //           result?.message ||
// //             "Failed to reject foundation."
// //         );
// //       }


// //       // Remove rejected foundation
// //       // from pending list.

// //       setFoundations(
// //         (previous) =>
// //           previous.filter(
// //             (foundation) =>
// //               foundation.id !==
// //               selectedFoundation.id
// //           )
// //       );


// //       setShowRejectModal(false);

// //       setShowDetailsModal(false);

// //       setSelectedFoundation(null);

// //       setRejectReason("");

// //     } catch (error) {

// //       console.error(
// //         "Failed to reject foundation:",
// //         error
// //       );

// //       setError(
// //         error.message ||
// //           "Unable to reject foundation."
// //       );

// //     } finally {

// //       setActionLoading(false);

// //       setActionType(null);

// //     }
// //   };


// //   // =======================================================
// //   // FORMAT DATE
// //   // =======================================================

// //   const formatDate = (
// //     value
// //   ) => {

// //     if (!value) {
// //       return "—";
// //     }

// //     return new Date(
// //       value
// //     ).toLocaleString(
// //       "en-IN",
// //       {
// //         dateStyle: "medium",
// //         timeStyle: "short",
// //       }
// //     );
// //   };


// //   // =======================================================
// //   // LOADING STATE
// //   // =======================================================

// //   if (loading) {

// //     return (
// //       <div className="min-h-screen bg-[#050505] px-5 py-8 text-white sm:px-8 lg:px-10">

// //         <PageHeader />

// //         <div className="mt-8 grid gap-4">

// //           {[1, 2, 3].map(
// //             (item) => (
// //               <div
// //                 key={item}
// //                 className="
// //                   h-32
// //                   animate-pulse
// //                   rounded-2xl
// //                   border
// //                   border-white/[0.06]
// //                   bg-white/[0.02]
// //                 "
// //               />
// //             )
// //           )}

// //         </div>

// //       </div>
// //     );
// //   }


// //   // =======================================================
// //   // RENDER
// //   // =======================================================

// //   return (
// //     <div className="min-h-screen bg-[#050505] px-5 py-8 text-white sm:px-8 lg:px-10">


// //       {/* ===================================================
// //           HEADER
// //       =================================================== */}

// //       <PageHeader
// //         refreshing={refreshing}
// //         onRefresh={() =>
// //           loadPendingFoundations(true)
// //         }
// //       />


// //       {/* ===================================================
// //           ERROR
// //       =================================================== */}

// //       {error && (

// //         <div
// //           className="
// //             mt-6
// //             flex
// //             items-start
// //             gap-3
// //             rounded-xl
// //             border
// //             border-red-500/20
// //             bg-red-500/5
// //             p-4
// //             text-sm
// //             text-red-300
// //           "
// //         >

// //           <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

// //           <span className="flex-1">
// //             {error}
// //           </span>

// //           <button
// //             onClick={() =>
// //               setError("")
// //             }
// //             className="text-red-400 hover:text-red-300"
// //           >
// //             <X className="h-4 w-4" />
// //           </button>

// //         </div>

// //       )}


// //       {/* ===================================================
// //           SUMMARY
// //       =================================================== */}

// //       <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

// //         <SummaryCard
// //           icon={Clock}
// //           label="Pending Review"
// //           value={foundations.length}
// //         />

// //         <SummaryCard
// //           icon={Building2}
// //           label="Current Queue"
// //           value={foundations.length}
// //         />

// //         <SummaryCard
// //           icon={FileText}
// //           label="Verification Required"
// //           value={foundations.length}
// //         />

// //       </div>


// //       {/* ===================================================
// //           PENDING FOUNDATIONS
// //       =================================================== */}

// //       <section className="mt-8">

// //         <div className="mb-4">

// //           <h2 className="text-lg font-semibold">
// //             Pending Foundations
// //           </h2>

// //           <p className="mt-1 text-sm text-gray-500">
// //             Review foundation registration requests before approval.
// //           </p>

// //         </div>


// //         {foundations.length === 0 ? (

// //           <EmptyState />

// //         ) : (

// //           <div className="overflow-hidden rounded-2xl border border-white/[0.08]">

// //             {/* =========================================
// //                 DESKTOP TABLE
// //             ========================================= */}

// //             <div className="hidden overflow-x-auto md:block">

// //               <table className="w-full min-w-[900px]">

// //                 <thead className="border-b border-white/[0.08] bg-white/[0.02]">

// //                   <tr>

// //                     <TableHeader>
// //                       Foundation
// //                     </TableHeader>

// //                     <TableHeader>
// //                       Registration
// //                     </TableHeader>

// //                     <TableHeader>
// //                       Location
// //                     </TableHeader>

// //                     <TableHeader>
// //                       Status
// //                     </TableHeader>

// //                     <TableHeader>
// //                       Created
// //                     </TableHeader>

// //                     <TableHeader align="right">
// //                       Actions
// //                     </TableHeader>

// //                   </tr>

// //                 </thead>


// //                 <tbody className="divide-y divide-white/[0.06]">

// //                   {foundations.map(
// //                     (foundation) => (

// //                       <tr
// //                         key={foundation.id}
// //                         className="transition hover:bg-white/[0.02]"
// //                       >

// //                         <td className="px-5 py-5">

// //                           <div>

// //                             <p className="font-medium text-white">
// //                               {foundation.organizationName}
// //                             </p>

// //                             <p className="mt-1 text-xs text-gray-600">
// //                               ID #{foundation.id}
// //                             </p>

// //                           </div>

// //                         </td>


// //                         <td className="px-5 py-5">

// //                           <span className="text-sm text-gray-400">
// //                             {foundation.registrationNumber}
// //                           </span>

// //                         </td>


// //                         <td className="px-5 py-5">

// //                           <div className="flex items-start gap-2">

// //                             <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />

// //                             <div>

// //                               <p className="text-sm text-gray-400">
// //                                 {foundation.city}
// //                               </p>

// //                               <p className="text-xs text-gray-600">
// //                                 {foundation.state}
// //                               </p>

// //                             </div>

// //                           </div>

// //                         </td>


// //                         <td className="px-5 py-5">

// //                           <StatusBadge
// //                             status={
// //                               foundation.verificationStatus
// //                             }
// //                           />

// //                         </td>


// //                         <td className="px-5 py-5">

// //                           <span className="text-sm text-gray-500">
// //                             {formatDate(
// //                               foundation.createdAt
// //                             )}
// //                           </span>

// //                         </td>


// //                         <td className="px-5 py-5">

// //                           <div className="flex justify-end gap-2">

// //                             <ActionButton
// //                               icon={Eye}
// //                               label="View"
// //                               onClick={() =>
// //                                 viewFoundation(
// //                                   foundation.id
// //                                 )
// //                               }
// //                             />

// //                             <ActionButton
// //                               icon={CheckCircle2}
// //                               label="Approve"
// //                               success
// //                               onClick={() =>
// //                                 approveFoundation(
// //                                   foundation.id
// //                                 )
// //                               }
// //                               loading={
// //                                 actionLoading &&
// //                                 actionType ===
// //                                   "approve"
// //                               }
// //                             />

// //                             <ActionButton
// //                               icon={XCircle}
// //                               label="Reject"
// //                               danger
// //                               onClick={() =>
// //                                 openRejectModal(
// //                                   foundation
// //                                 )
// //                               }
// //                             />

// //                           </div>

// //                         </td>

// //                       </tr>
// //                     )
// //                   )}

// //                 </tbody>

// //               </table>

// //             </div>


// //             {/* =========================================
// //                 MOBILE CARDS
// //             ========================================= */}

// //             <div className="divide-y divide-white/[0.06] md:hidden">

// //               {foundations.map(
// //                 (foundation) => (

// //                   <FoundationCard
// //                     key={foundation.id}
// //                     foundation={foundation}
// //                     onView={() =>
// //                       viewFoundation(
// //                         foundation.id
// //                       )
// //                     }
// //                     onApprove={() =>
// //                       approveFoundation(
// //                         foundation.id
// //                       )
// //                     }
// //                     onReject={() =>
// //                       openRejectModal(
// //                         foundation
// //                       )
// //                     }
// //                   />

// //                 )
// //               )}

// //             </div>

// //           </div>
// //         )}

// //       </section>


// //       {/* ===================================================
// //           DETAILS MODAL
// //       =================================================== */}

// //       {showDetailsModal && (

// //         <DetailsModal
// //           foundation={selectedFoundation}
// //           loading={detailsLoading}
// //           onClose={() =>
// //             setShowDetailsModal(false)
// //           }
// //           onApprove={() => {

// //             if (selectedFoundation) {
// //               approveFoundation(
// //                 selectedFoundation.id
// //               );
// //             }

// //           }}
// //           onReject={() => {

// //             if (selectedFoundation) {

// //               setShowDetailsModal(false);

// //               openRejectModal(
// //                 selectedFoundation
// //               );
// //             }

// //           }}
// //           actionLoading={actionLoading}
// //         />

// //       )}


// //       {/* ===================================================
// //           REJECT MODAL
// //       =================================================== */}

// //       {showRejectModal && (

// //         <RejectModal
// //           foundation={selectedFoundation}
// //           reason={rejectReason}
// //           setReason={setRejectReason}
// //           loading={actionLoading}
// //           onClose={() =>
// //             setShowRejectModal(false)
// //           }
// //           onReject={
// //             rejectFoundation
// //           }
// //         />

// //       )}

// //     </div>
// //   );
// // }


// // // =========================================================
// // // PAGE HEADER
// // // =========================================================

// // function PageHeader({
// //   refreshing = false,
// //   onRefresh,
// // }) {

// //   return (
// //     <header>

// //       <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

// //         <div>

// //           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
// //             Administration
// //           </p>

// //           <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
// //             Foundations
// //           </h1>

// //           <p className="mt-2 text-sm text-gray-500">
// //             Review and manage foundation verification requests.
// //           </p>

// //         </div>


// //         <button
// //           onClick={onRefresh}
// //           disabled={refreshing}
// //           className="
// //             inline-flex
// //             items-center
// //             justify-center
// //             gap-2
// //             rounded-xl
// //             border
// //             border-white/[0.1]
// //             bg-white/[0.03]
// //             px-4
// //             py-2.5
// //             text-sm
// //             text-gray-300
// //             transition
// //             hover:bg-white/[0.06]
// //             disabled:cursor-not-allowed
// //             disabled:opacity-50
// //           "
// //         >

// //           <RefreshCw
// //             className={`h-4 w-4 ${
// //               refreshing
// //                 ? "animate-spin"
// //                 : ""
// //             }`}
// //           />

// //           Refresh

// //         </button>

// //       </div>

// //     </header>
// //   );
// // }


// // // =========================================================
// // // SUMMARY CARD
// // // =========================================================

// // function SummaryCard({
// //   icon: Icon,
// //   label,
// //   value,
// // }) {

// //   return (
// //     <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">

// //       <div className="flex items-center justify-between">

// //         <div>

// //           <p className="text-sm text-gray-500">
// //             {label}
// //           </p>

// //           <p className="mt-2 text-2xl font-bold text-white">
// //             {value}
// //           </p>

// //         </div>


// //         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">

// //           <Icon className="h-5 w-5 text-emerald-400" />

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }


// // // =========================================================
// // // TABLE HEADER
// // // =========================================================

// // function TableHeader({
// //   children,
// //   align = "left",
// // }) {

// //   return (
// //     <th
// //       className={`px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600 ${
// //         align === "right"
// //           ? "text-right"
// //           : "text-left"
// //       }`}
// //     >
// //       {children}
// //     </th>
// //   );
// // }


// // // =========================================================
// // // STATUS BADGE
// // // =========================================================

// // function StatusBadge({
// //   status,
// // }) {

// //   const isPending =
// //     status === "PENDING";


// //   return (
// //     <span
// //       className={`
// //         inline-flex
// //         items-center
// //         gap-1.5
// //         rounded-full
// //         border
// //         px-2.5
// //         py-1
// //         text-xs
// //         font-medium
// //         ${
// //           isPending
// //             ? "border-yellow-400/20 bg-yellow-400/5 text-yellow-300"
// //             : "border-white/[0.1] bg-white/[0.03] text-gray-400"
// //         }
// //       `}
// //     >

// //       <span
// //         className={`h-1.5 w-1.5 rounded-full ${
// //           isPending
// //             ? "bg-yellow-400"
// //             : "bg-gray-500"
// //         }`}
// //       />

// //       {status || "UNKNOWN"}

// //     </span>
// //   );
// // }


// // // =========================================================
// // // ACTION BUTTON
// // // =========================================================

// // function ActionButton({
// //   icon: Icon,
// //   label,
// //   onClick,
// //   success = false,
// //   danger = false,
// //   loading = false,
// // }) {

// //   return (
// //     <button
// //       onClick={onClick}
// //       disabled={loading}
// //       title={label}
// //       className={`
// //         inline-flex
// //         items-center
// //         gap-1.5
// //         rounded-lg
// //         border
// //         px-3
// //         py-2
// //         text-xs
// //         font-medium
// //         transition
// //         disabled:cursor-not-allowed
// //         disabled:opacity-50

// //         ${
// //           success
// //             ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-400 hover:bg-emerald-400/10"
// //             : danger
// //             ? "border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
// //             : "border-white/[0.08] bg-white/[0.03] text-gray-400 hover:bg-white/[0.07] hover:text-white"
// //         }
// //       `}
// //     >

// //       {loading ? (
// //         <Loader2 className="h-3.5 w-3.5 animate-spin" />
// //       ) : (
// //         <Icon className="h-3.5 w-3.5" />
// //       )}

// //       <span className="hidden xl:inline">
// //         {label}
// //       </span>

// //     </button>
// //   );
// // }


// // // =========================================================
// // // MOBILE FOUNDATION CARD
// // // =========================================================

// // function FoundationCard({
// //   foundation,
// //   onView,
// //   onApprove,
// //   onReject,
// // }) {

// //   return (
// //     <div className="p-5">

// //       <div className="flex items-start justify-between gap-4">

// //         <div className="min-w-0">

// //           <h3 className="truncate font-medium text-white">
// //             {foundation.organizationName}
// //           </h3>

// //           <p className="mt-1 text-xs text-gray-600">
// //             Registration:{" "}
// //             {foundation.registrationNumber}
// //           </p>

// //         </div>


// //         <StatusBadge
// //           status={
// //             foundation.verificationStatus
// //           }
// //         />

// //       </div>


// //       <div className="mt-4 space-y-2 text-sm text-gray-500">

// //         <div className="flex items-center gap-2">

// //           <MapPin className="h-4 w-4 text-gray-600" />

// //           {foundation.city},{" "}
// //           {foundation.state}

// //         </div>

// //         <div className="flex items-center gap-2">

// //           <Clock className="h-4 w-4 text-gray-600" />

// //           {new Date(
// //             foundation.createdAt
// //           ).toLocaleDateString("en-IN")}

// //         </div>

// //       </div>


// //       <div className="mt-5 flex gap-2">

// //         <ActionButton
// //           icon={Eye}
// //           label="View"
// //           onClick={onView}
// //         />

// //         <ActionButton
// //           icon={CheckCircle2}
// //           label="Approve"
// //           success
// //           onClick={onApprove}
// //         />

// //         <ActionButton
// //           icon={XCircle}
// //           label="Reject"
// //           danger
// //           onClick={onReject}
// //         />

// //       </div>

// //     </div>
// //   );
// // }


// // // =========================================================
// // // EMPTY STATE
// // // =========================================================

// // function EmptyState() {

// //   return (
// //     <div className="rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] px-6 py-16 text-center">

// //       <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10">

// //         <CheckCircle2 className="h-7 w-7 text-emerald-400" />

// //       </div>

// //       <h3 className="mt-5 font-semibold text-white">
// //         All caught up
// //       </h3>

// //       <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
// //         There are currently no foundation registrations waiting for verification.
// //       </p>

// //     </div>
// //   );
// // }


// // // =========================================================
// // // DETAILS MODAL
// // // =========================================================

// // function DetailsModal({
// //   foundation,
// //   loading,
// //   onClose,
// //   onApprove,
// //   onReject,
// //   actionLoading,
// // }) {

// //   return (
// //     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

// //       <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/[0.1] bg-[#0a0a0a]">

// //         {/* Header */}

// //         <div className="sticky top-0 flex items-center justify-between border-b border-white/[0.08] bg-[#0a0a0a] px-6 py-5">

// //           <div>

// //             <p className="text-xs uppercase tracking-wider text-emerald-400">
// //               Foundation Review
// //             </p>

// //             <h2 className="mt-1 text-lg font-semibold">
// //               Foundation Details
// //             </h2>

// //           </div>


// //           <button
// //             onClick={onClose}
// //             className="rounded-lg p-2 text-gray-500 hover:bg-white/[0.05] hover:text-white"
// //           >
// //             <X className="h-5 w-5" />
// //           </button>

// //         </div>


// //         {loading ? (

// //           <div className="flex min-h-80 items-center justify-center">

// //             <Loader2 className="h-7 w-7 animate-spin text-emerald-400" />

// //           </div>

// //         ) : foundation ? (

// //           <>

// //             <div className="grid gap-6 p-6 sm:grid-cols-2">

// //               <DetailItem
// //                 label="Organization Name"
// //                 value={
// //                   foundation.organizationName
// //                 }
// //               />

// //               <DetailItem
// //                 label="Registration Number"
// //                 value={
// //                   foundation.registrationNumber
// //                 }
// //               />

// //               <DetailItem
// //                 label="Address"
// //                 value={
// //                   foundation.address
// //                 }
// //               />

// //               <DetailItem
// //                 label="City"
// //                 value={
// //                   foundation.city
// //                 }
// //               />

// //               <DetailItem
// //                 label="State"
// //                 value={
// //                   foundation.state
// //                 }
// //               />

// //               <DetailItem
// //                 label="Pincode"
// //                 value={
// //                   foundation.pincode
// //                 }
// //               />

// //               <DetailItem
// //                 label="Latitude"
// //                 value={
// //                   foundation.latitude
// //                 }
// //               />

// //               <DetailItem
// //                 label="Longitude"
// //                 value={
// //                   foundation.longitude
// //                 }
// //               />

// //               <DetailItem
// //                 label="Verification Status"
// //                 value={
// //                   foundation.verificationStatus
// //                 }
// //               />

// //               <DetailItem
// //                 label="Created At"
// //                 value={
// //                   foundation.createdAt
// //                     ? new Date(
// //                         foundation.createdAt
// //                       ).toLocaleString(
// //                         "en-IN"
// //                       )
// //                     : "—"
// //                 }
// //               />

// //             </div>


// //             {foundation.rejectionReason && (

// //               <div className="mx-6 mb-6 rounded-xl border border-red-400/20 bg-red-400/5 p-4">

// //                 <p className="text-xs uppercase tracking-wider text-red-400">
// //                   Rejection Reason
// //                 </p>

// //                 <p className="mt-2 text-sm text-red-200">
// //                   {foundation.rejectionReason}
// //                 </p>

// //               </div>

// //             )}


// //             {/* Actions */}

// //             {foundation.verificationStatus ===
// //               "PENDING" && (

// //               <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] p-6 sm:flex-row sm:justify-end">

// //                 <button
// //                   onClick={onReject}
// //                   disabled={actionLoading}
// //                   className="
// //                     rounded-xl
// //                     border
// //                     border-red-400/20
// //                     bg-red-400/5
// //                     px-5
// //                     py-2.5
// //                     text-sm
// //                     font-medium
// //                     text-red-400
// //                     hover:bg-red-400/10
// //                     disabled:opacity-50
// //                   "
// //                 >
// //                   Reject
// //                 </button>


// //                 <button
// //                   onClick={onApprove}
// //                   disabled={actionLoading}
// //                   className="
// //                     rounded-xl
// //                     bg-emerald-400
// //                     px-5
// //                     py-2.5
// //                     text-sm
// //                     font-semibold
// //                     text-black
// //                     hover:bg-emerald-300
// //                     disabled:opacity-50
// //                   "
// //                 >
// //                   {actionLoading
// //                     ? "Processing..."
// //                     : "Approve Foundation"}
// //                 </button>

// //               </div>
// //             )}

// //           </>

// //         ) : null}

// //       </div>

// //     </div>
// //   );
// // }


// // // =========================================================
// // // DETAIL ITEM
// // // =========================================================

// // function DetailItem({
// //   label,
// //   value,
// // }) {

// //   return (
// //     <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">

// //       <p className="text-xs uppercase tracking-wider text-gray-600">
// //         {label}
// //       </p>

// //       <p className="mt-2 break-words text-sm text-gray-300">
// //         {value ?? "—"}
// //       </p>

// //     </div>
// //   );
// // }


// // // =========================================================
// // // REJECT MODAL
// // // =========================================================

// // function RejectModal({
// //   foundation,
// //   reason,
// //   setReason,
// //   loading,
// //   onClose,
// //   onReject,
// // }) {

// //   return (
// //     <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

// //       <div className="w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#0a0a0a]">

// //         <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">

// //           <div>

// //             <p className="text-xs uppercase tracking-wider text-red-400">
// //               Verification Action
// //             </p>

// //             <h2 className="mt-1 font-semibold text-white">
// //               Reject Foundation
// //             </h2>

// //           </div>


// //           <button
// //             onClick={onClose}
// //             disabled={loading}
// //             className="rounded-lg p-2 text-gray-500 hover:bg-white/[0.05] hover:text-white"
// //           >
// //             <X className="h-5 w-5" />
// //           </button>

// //         </div>


// //         <div className="p-6">

// //           <p className="text-sm text-gray-400">

// //             You are rejecting{" "}

// //             <span className="font-medium text-white">
// //               {foundation?.organizationName}
// //             </span>
// //             .

// //           </p>


// //           <label className="mt-5 block">

// //             <span className="text-sm font-medium text-gray-300">
// //               Rejection reason
// //             </span>


// //             <textarea
// //               value={reason}
// //               onChange={(event) =>
// //                 setReason(
// //                   event.target.value
// //                 )
// //               }
// //               disabled={loading}
// //               rows={5}
// //               maxLength={500}
// //               placeholder="Explain why this foundation registration is being rejected..."
// //               className="
// //                 mt-2
// //                 w-full
// //                 resize-none
// //                 rounded-xl
// //                 border
// //                 border-white/[0.1]
// //                 bg-white/[0.03]
// //                 px-4
// //                 py-3
// //                 text-sm
// //                 text-white
// //                 outline-none
// //                 placeholder:text-gray-700
// //                 focus:border-red-400/40
// //               "
// //             />

// //           </label>


// //           <div className="mt-2 flex justify-end">

// //             <span className="text-xs text-gray-600">
// //               {reason.length}/500
// //             </span>

// //           </div>


// //           <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

// //             <button
// //               onClick={onClose}
// //               disabled={loading}
// //               className="
// //                 rounded-xl
// //                 border
// //                 border-white/[0.1]
// //                 px-5
// //                 py-2.5
// //                 text-sm
// //                 text-gray-400
// //                 hover:bg-white/[0.05]
// //               "
// //             >
// //               Cancel
// //             </button>


// //             <button
// //               onClick={onReject}
// //               disabled={
// //                 loading ||
// //                 !reason.trim()
// //               }
// //               className="
// //                 inline-flex
// //                 items-center
// //                 justify-center
// //                 gap-2
// //                 rounded-xl
// //                 bg-red-500
// //                 px-5
// //                 py-2.5
// //                 text-sm
// //                 font-semibold
// //                 text-white
// //                 hover:bg-red-400
// //                 disabled:cursor-not-allowed
// //                 disabled:opacity-50
// //               "
// //             >

// //               {loading && (
// //                 <Loader2 className="h-4 w-4 animate-spin" />
// //               )}

// //               {loading
// //                 ? "Rejecting..."
// //                 : "Reject Foundation"}

// //             </button>

// //           </div>

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }


// // export default Foundations;


// import { useCallback, useEffect, useState } from "react";

// import {
//   Building2,
//   CheckCircle2,
//   XCircle,
//   Eye,
//   RefreshCw,
//   MapPin,
//   FileText,
//   Clock,
//   AlertCircle,
//   X,
//   Loader2,
// } from "lucide-react";

// import toast from "react-hot-toast";


// // =========================================================
// // API
// // =========================================================

// const API_BASE_URL = "http://localhost:8080";


// // =========================================================
// // FOUNDATIONS PAGE
// // =========================================================

// function Foundations() {

//   const [foundations, setFoundations] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [refreshing, setRefreshing] = useState(false);

//   const [error, setError] = useState("");

//   const [selectedFoundation, setSelectedFoundation] =
//     useState(null);

//   const [detailsLoading, setDetailsLoading] =
//     useState(false);

//   const [actionLoading, setActionLoading] =
//     useState(false);

//   const [actionType, setActionType] =
//     useState(null);

//   const [rejectReason, setRejectReason] =
//     useState("");

//   const [showRejectModal, setShowRejectModal] =
//     useState(false);

//   const [showDetailsModal, setShowDetailsModal] =
//     useState(false);


//   // =======================================================
//   // GET TOKEN
//   // =======================================================

//   const getToken = () => {

//     return localStorage.getItem("token");

//   };


//   // =======================================================
//   // LOAD PENDING FOUNDATIONS
//   // =======================================================

//   const loadPendingFoundations = useCallback(
//     async (isRefresh = false) => {

//       try {

//         if (isRefresh) {
//           setRefreshing(true);
//         } else {
//           setLoading(true);
//         }

//         setError("");


//         const token = getToken();


//         if (!token) {
//           throw new Error(
//             "Authentication token not found."
//           );
//         }


//         const response = await fetch(
//           `${API_BASE_URL}/api/admin/foundations/pending`,
//           {
//             method: "GET",

//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//             },
//           }
//         );


//         const result = await response.json();


//         if (!response.ok) {

//           throw new Error(
//             result?.message ||
//               "Failed to load pending foundations."
//           );
//         }


//         setFoundations(
//           result?.data || []
//         );

//       } catch (error) {

//         console.error(
//           "Failed to load foundations:",
//           error
//         );

//         setError(
//           error.message ||
//             "Unable to load foundations."
//         );

//       } finally {

//         setLoading(false);
//         setRefreshing(false);

//       }

//     },
//     []
//   );


//   // =======================================================
//   // INITIAL LOAD
//   // =======================================================

//   useEffect(() => {

//     loadPendingFoundations();

//   }, [loadPendingFoundations]);


//   // =======================================================
//   // VIEW FOUNDATION DETAILS
//   // =======================================================

//   const viewFoundation = async (foundationId) => {

//     try {

//       setDetailsLoading(true);

//       setShowDetailsModal(true);

//       setSelectedFoundation(null);


//       const token = getToken();


//       if (!token) {
//         throw new Error(
//           "Authentication token not found."
//         );
//       }


//       const response = await fetch(
//         `${API_BASE_URL}/api/admin/foundations/${foundationId}`,
//         {
//           method: "GET",

//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );


//       const result = await response.json();


//       if (!response.ok) {

//         throw new Error(
//           result?.message ||
//             "Failed to load foundation."
//         );
//       }


//       setSelectedFoundation(
//         result?.data
//       );

//     } catch (error) {

//       console.error(
//         "Failed to load foundation:",
//         error
//       );

//       setError(
//         error.message ||
//           "Unable to load foundation details."
//       );

//       setShowDetailsModal(false);

//     } finally {

//       setDetailsLoading(false);

//     }
//   };


//   // =======================================================
//   // APPROVE FOUNDATION
//   // =======================================================

//   const approveFoundation = async (
//     foundationId
//   ) => {

//     const confirmed =
//       window.confirm(
//         "Are you sure you want to approve this foundation?"
//       );


//     if (!confirmed) {
//       return;
//     }


//     try {

//       setActionLoading(true);

//       setActionType("approve");

//       setError("");


//       const token = getToken();


//       if (!token) {
//         throw new Error(
//           "Authentication token not found."
//         );
//       }


//       const response = await fetch(
//         `${API_BASE_URL}/api/admin/foundations/${foundationId}/approve`,
//         {
//           method: "PUT",

//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );


//       const result =
//         await response.json();


//       if (!response.ok) {

//         throw new Error(
//           result?.message ||
//             "Failed to approve foundation."
//         );
//       }


//       // Remove approved foundation
//       // from pending list.

//       setFoundations(
//         (previous) =>
//           previous.filter(
//             (foundation) =>
//               foundation.id !==
//               foundationId
//           )
//       );


//       setShowDetailsModal(false);

//       setSelectedFoundation(null);

//       toast.success(
//         "Foundation approved successfully.",
//         {
//           duration: 3500,
//         }
//       );

//     } catch (error) {

//       console.error(
//         "Failed to approve foundation:",
//         error
//       );

//       const message =
//         error.message ||
//         "Unable to approve foundation.";

//       setError(message);
//       toast.error(message);

//     } finally {

//       setActionLoading(false);

//       setActionType(null);

//     }
//   };


//   // =======================================================
//   // OPEN REJECT MODAL
//   // =======================================================

//   const openRejectModal = (
//     foundation
//   ) => {

//     setSelectedFoundation(
//       foundation
//     );

//     setRejectReason("");

//     setShowRejectModal(true);

//   };


//   // =======================================================
//   // REJECT FOUNDATION
//   // =======================================================

//   const rejectFoundation = async () => {

//     if (!selectedFoundation) {
//       return;
//     }


//     const reason =
//       rejectReason.trim();


//     if (!reason) {

//       setError(
//         "Please provide a rejection reason."
//       );

//       return;
//     }


//     if (reason.length < 5) {

//       setError(
//         "Rejection reason must contain at least 5 characters."
//       );

//       return;
//     }


//     try {

//       setActionLoading(true);

//       setActionType("reject");

//       setError("");


//       const token = getToken();


//       if (!token) {
//         throw new Error(
//           "Authentication token not found."
//         );
//       }


//       const params =
//         new URLSearchParams();

//       params.append(
//         "reason",
//         reason
//       );


//       const response = await fetch(
//         `${API_BASE_URL}/api/admin/foundations/${selectedFoundation.id}/reject?${params.toString()}`,
//         {
//           method: "PUT",

//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );


//       const result =
//         await response.json();


//       if (!response.ok) {

//         throw new Error(
//           result?.message ||
//             "Failed to reject foundation."
//         );
//       }


//       // Remove rejected foundation
//       // from pending list.

//       setFoundations(
//         (previous) =>
//           previous.filter(
//             (foundation) =>
//               foundation.id !==
//               selectedFoundation.id
//           )
//       );


//       setShowRejectModal(false);

//       setShowDetailsModal(false);

//       setSelectedFoundation(null);

//       setRejectReason("");

//       toast.success(
//         "Foundation rejected successfully.",
//         {
//           duration: 3500,
//         }
//       );

//     } catch (error) {

//       console.error(
//         "Failed to reject foundation:",
//         error
//       );

//       const message =
//         error.message ||
//         "Unable to reject foundation.";

//       setError(message);
//       toast.error(message);

//     } finally {

//       setActionLoading(false);

//       setActionType(null);

//     }
//   };


//   // =======================================================
//   // FORMAT DATE
//   // =======================================================

//   const formatDate = (
//     value
//   ) => {

//     if (!value) {
//       return "—";
//     }

//     return new Date(
//       value
//     ).toLocaleString(
//       "en-IN",
//       {
//         dateStyle: "medium",
//         timeStyle: "short",
//       }
//     );
//   };


//   // =======================================================
//   // LOADING STATE
//   // =======================================================

//   if (loading) {

//     return (
//       <div className="min-h-screen bg-[#050505] px-5 py-8 text-white sm:px-8 lg:px-10">

//         <PageHeader />

//         <div className="mt-8 grid gap-4">

//           {[1, 2, 3].map(
//             (item) => (
//               <div
//                 key={item}
//                 className="
//                   h-32
//                   animate-pulse
//                   rounded-2xl
//                   border
//                   border-white/[0.06]
//                   bg-white/[0.02]
//                 "
//               />
//             )
//           )}

//         </div>

//       </div>
//     );
//   }


//   // =======================================================
//   // RENDER
//   // =======================================================

//   return (
//     <div className="min-h-screen bg-[#050505] px-5 py-8 text-white sm:px-8 lg:px-10">


//       {/* ===================================================
//           HEADER
//       =================================================== */}

//       <PageHeader
//         refreshing={refreshing}
//         onRefresh={() =>
//           loadPendingFoundations(true)
//         }
//       />


//       {/* ===================================================
//           ERROR
//       =================================================== */}

//       {error && (

//         <div
//           className="
//             mt-6
//             flex
//             items-start
//             gap-3
//             rounded-xl
//             border
//             border-red-500/20
//             bg-red-500/5
//             p-4
//             text-sm
//             text-red-300
//           "
//         >

//           <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

//           <span className="flex-1">
//             {error}
//           </span>

//           <button
//             onClick={() =>
//               setError("")
//             }
//             className="text-red-400 hover:text-red-300"
//           >
//             <X className="h-4 w-4" />
//           </button>

//         </div>

//       )}


//       {/* ===================================================
//           SUMMARY
//       =================================================== */}

//       <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

//         <SummaryCard
//           icon={Clock}
//           label="Pending Review"
//           value={foundations.length}
//         />

//         <SummaryCard
//           icon={Building2}
//           label="Current Queue"
//           value={foundations.length}
//         />

//         <SummaryCard
//           icon={FileText}
//           label="Verification Required"
//           value={foundations.length}
//         />

//       </div>


//       {/* ===================================================
//           PENDING FOUNDATIONS
//       =================================================== */}

//       <section className="mt-8">

//         <div className="mb-4">

//           <h2 className="text-lg font-semibold">
//             Pending Foundations
//           </h2>

//           <p className="mt-1 text-sm text-gray-500">
//             Review foundation registration requests before approval.
//           </p>

//         </div>


//         {foundations.length === 0 ? (

//           <EmptyState />

//         ) : (

//           <div className="overflow-hidden rounded-2xl border border-white/[0.08]">

//             {/* =========================================
//                 DESKTOP TABLE
//             ========================================= */}

//             <div className="hidden overflow-x-auto md:block">

//               <table className="w-full min-w-[900px]">

//                 <thead className="border-b border-white/[0.08] bg-white/[0.02]">

//                   <tr>

//                     <TableHeader>
//                       Foundation
//                     </TableHeader>

//                     <TableHeader>
//                       Registration
//                     </TableHeader>

//                     <TableHeader>
//                       Location
//                     </TableHeader>

//                     <TableHeader>
//                       Status
//                     </TableHeader>

//                     <TableHeader>
//                       Created
//                     </TableHeader>

//                     <TableHeader align="right">
//                       Actions
//                     </TableHeader>

//                   </tr>

//                 </thead>


//                 <tbody className="divide-y divide-white/[0.06]">

//                   {foundations.map(
//                     (foundation) => (

//                       <tr
//                         key={foundation.id}
//                         className="transition hover:bg-white/[0.02]"
//                       >

//                         <td className="px-5 py-5">

//                           <div>

//                             <p className="font-medium text-white">
//                               {foundation.organizationName}
//                             </p>

//                             <p className="mt-1 text-xs text-gray-600">
//                               ID #{foundation.id}
//                             </p>

//                           </div>

//                         </td>


//                         <td className="px-5 py-5">

//                           <span className="text-sm text-gray-400">
//                             {foundation.registrationNumber}
//                           </span>

//                         </td>


//                         <td className="px-5 py-5">

//                           <div className="flex items-start gap-2">

//                             <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />

//                             <div>

//                               <p className="text-sm text-gray-400">
//                                 {foundation.city}
//                               </p>

//                               <p className="text-xs text-gray-600">
//                                 {foundation.state}
//                               </p>

//                             </div>

//                           </div>

//                         </td>


//                         <td className="px-5 py-5">

//                           <StatusBadge
//                             status={
//                               foundation.verificationStatus
//                             }
//                           />

//                         </td>


//                         <td className="px-5 py-5">

//                           <span className="text-sm text-gray-500">
//                             {formatDate(
//                               foundation.createdAt
//                             )}
//                           </span>

//                         </td>


//                         <td className="px-5 py-5">

//                           <div className="flex justify-end gap-2">

//                             <ActionButton
//                               icon={Eye}
//                               label="View"
//                               onClick={() =>
//                                 viewFoundation(
//                                   foundation.id
//                                 )
//                               }
//                             />

//                             <ActionButton
//                               icon={CheckCircle2}
//                               label="Approve"
//                               success
//                               onClick={() =>
//                                 approveFoundation(
//                                   foundation.id
//                                 )
//                               }
//                               loading={
//                                 actionLoading &&
//                                 actionType ===
//                                   "approve"
//                               }
//                             />

//                             <ActionButton
//                               icon={XCircle}
//                               label="Reject"
//                               danger
//                               onClick={() =>
//                                 openRejectModal(
//                                   foundation
//                                 )
//                               }
//                             />

//                           </div>

//                         </td>

//                       </tr>
//                     )
//                   )}

//                 </tbody>

//               </table>

//             </div>


//             {/* =========================================
//                 MOBILE CARDS
//             ========================================= */}

//             <div className="divide-y divide-white/[0.06] md:hidden">

//               {foundations.map(
//                 (foundation) => (

//                   <FoundationCard
//                     key={foundation.id}
//                     foundation={foundation}
//                     onView={() =>
//                       viewFoundation(
//                         foundation.id
//                       )
//                     }
//                     onApprove={() =>
//                       approveFoundation(
//                         foundation.id
//                       )
//                     }
//                     onReject={() =>
//                       openRejectModal(
//                         foundation
//                       )
//                     }
//                   />

//                 )
//               )}

//             </div>

//           </div>
//         )}

//       </section>


//       {/* ===================================================
//           DETAILS MODAL
//       =================================================== */}

//       {showDetailsModal && (

//         <DetailsModal
//           foundation={selectedFoundation}
//           loading={detailsLoading}
//           onClose={() =>
//             setShowDetailsModal(false)
//           }
//           onApprove={() => {

//             if (selectedFoundation) {
//               approveFoundation(
//                 selectedFoundation.id
//               );
//             }

//           }}
//           onReject={() => {

//             if (selectedFoundation) {

//               setShowDetailsModal(false);

//               openRejectModal(
//                 selectedFoundation
//               );
//             }

//           }}
//           actionLoading={actionLoading}
//         />

//       )}


//       {/* ===================================================
//           REJECT MODAL
//       =================================================== */}

//       {showRejectModal && (

//         <RejectModal
//           foundation={selectedFoundation}
//           reason={rejectReason}
//           setReason={setRejectReason}
//           loading={actionLoading}
//           onClose={() =>
//             setShowRejectModal(false)
//           }
//           onReject={
//             rejectFoundation
//           }
//         />

//       )}

//     </div>
//   );
// }


// // =========================================================
// // PAGE HEADER
// // =========================================================

// function PageHeader({
//   refreshing = false,
//   onRefresh,
// }) {

//   return (
//     <header>

//       <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

//         <div>

//           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
//             Administration
//           </p>

//           <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
//             Foundations
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             Review and manage foundation verification requests.
//           </p>

//         </div>


//         <button
//           onClick={onRefresh}
//           disabled={refreshing}
//           className="
//             inline-flex
//             items-center
//             justify-center
//             gap-2
//             rounded-xl
//             border
//             border-white/[0.1]
//             bg-white/[0.03]
//             px-4
//             py-2.5
//             text-sm
//             text-gray-300
//             transition
//             hover:bg-white/[0.06]
//             disabled:cursor-not-allowed
//             disabled:opacity-50
//           "
//         >

//           <RefreshCw
//             className={`h-4 w-4 ${
//               refreshing
//                 ? "animate-spin"
//                 : ""
//             }`}
//           />

//           Refresh

//         </button>

//       </div>

//     </header>
//   );
// }


// // =========================================================
// // SUMMARY CARD
// // =========================================================

// function SummaryCard({
//   icon: Icon,
//   label,
//   value,
// }) {

//   return (
//     <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">

//       <div className="flex items-center justify-between">

//         <div>

//           <p className="text-sm text-gray-500">
//             {label}
//           </p>

//           <p className="mt-2 text-2xl font-bold text-white">
//             {value}
//           </p>

//         </div>


//         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">

//           <Icon className="h-5 w-5 text-emerald-400" />

//         </div>

//       </div>

//     </div>
//   );
// }


// // =========================================================
// // TABLE HEADER
// // =========================================================

// function TableHeader({
//   children,
//   align = "left",
// }) {

//   return (
//     <th
//       className={`px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600 ${
//         align === "right"
//           ? "text-right"
//           : "text-left"
//       }`}
//     >
//       {children}
//     </th>
//   );
// }


// // =========================================================
// // STATUS BADGE
// // =========================================================

// function StatusBadge({
//   status,
// }) {

//   const isPending =
//     status === "PENDING";


//   return (
//     <span
//       className={`
//         inline-flex
//         items-center
//         gap-1.5
//         rounded-full
//         border
//         px-2.5
//         py-1
//         text-xs
//         font-medium
//         ${
//           isPending
//             ? "border-yellow-400/20 bg-yellow-400/5 text-yellow-300"
//             : "border-white/[0.1] bg-white/[0.03] text-gray-400"
//         }
//       `}
//     >

//       <span
//         className={`h-1.5 w-1.5 rounded-full ${
//           isPending
//             ? "bg-yellow-400"
//             : "bg-gray-500"
//         }`}
//       />

//       {status || "UNKNOWN"}

//     </span>
//   );
// }


// // =========================================================
// // ACTION BUTTON
// // =========================================================

// function ActionButton({
//   icon: Icon,
//   label,
//   onClick,
//   success = false,
//   danger = false,
//   loading = false,
// }) {

//   return (
//     <button
//       onClick={onClick}
//       disabled={loading}
//       title={label}
//       className={`
//         inline-flex
//         items-center
//         gap-1.5
//         rounded-lg
//         border
//         px-3
//         py-2
//         text-xs
//         font-medium
//         transition
//         disabled:cursor-not-allowed
//         disabled:opacity-50

//         ${
//           success
//             ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-400 hover:bg-emerald-400/10"
//             : danger
//             ? "border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
//             : "border-white/[0.08] bg-white/[0.03] text-gray-400 hover:bg-white/[0.07] hover:text-white"
//         }
//       `}
//     >

//       {loading ? (
//         <Loader2 className="h-3.5 w-3.5 animate-spin" />
//       ) : (
//         <Icon className="h-3.5 w-3.5" />
//       )}

//       <span className="hidden xl:inline">
//         {label}
//       </span>

//     </button>
//   );
// }


// // =========================================================
// // MOBILE FOUNDATION CARD
// // =========================================================

// function FoundationCard({
//   foundation,
//   onView,
//   onApprove,
//   onReject,
// }) {

//   return (
//     <div className="p-5">

//       <div className="flex items-start justify-between gap-4">

//         <div className="min-w-0">

//           <h3 className="truncate font-medium text-white">
//             {foundation.organizationName}
//           </h3>

//           <p className="mt-1 text-xs text-gray-600">
//             Registration:{" "}
//             {foundation.registrationNumber}
//           </p>

//         </div>


//         <StatusBadge
//           status={
//             foundation.verificationStatus
//           }
//         />

//       </div>


//       <div className="mt-4 space-y-2 text-sm text-gray-500">

//         <div className="flex items-center gap-2">

//           <MapPin className="h-4 w-4 text-gray-600" />

//           {foundation.city},{" "}
//           {foundation.state}

//         </div>

//         <div className="flex items-center gap-2">

//           <Clock className="h-4 w-4 text-gray-600" />

//           {new Date(
//             foundation.createdAt
//           ).toLocaleDateString("en-IN")}

//         </div>

//       </div>


//       <div className="mt-5 flex gap-2">

//         <ActionButton
//           icon={Eye}
//           label="View"
//           onClick={onView}
//         />

//         <ActionButton
//           icon={CheckCircle2}
//           label="Approve"
//           success
//           onClick={onApprove}
//         />

//         <ActionButton
//           icon={XCircle}
//           label="Reject"
//           danger
//           onClick={onReject}
//         />

//       </div>

//     </div>
//   );
// }


// // =========================================================
// // EMPTY STATE
// // =========================================================

// function EmptyState() {

//   return (
//     <div className="rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] px-6 py-16 text-center">

//       <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10">

//         <CheckCircle2 className="h-7 w-7 text-emerald-400" />

//       </div>

//       <h3 className="mt-5 font-semibold text-white">
//         All caught up
//       </h3>

//       <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
//         There are currently no foundation registrations waiting for verification.
//       </p>

//     </div>
//   );
// }


// // =========================================================
// // DETAILS MODAL
// // =========================================================

// function DetailsModal({
//   foundation,
//   loading,
//   onClose,
//   onApprove,
//   onReject,
//   actionLoading,
// }) {

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

//       <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/[0.1] bg-[#0a0a0a]">

//         {/* Header */}

//         <div className="sticky top-0 flex items-center justify-between border-b border-white/[0.08] bg-[#0a0a0a] px-6 py-5">

//           <div>

//             <p className="text-xs uppercase tracking-wider text-emerald-400">
//               Foundation Review
//             </p>

//             <h2 className="mt-1 text-lg font-semibold">
//               Foundation Details
//             </h2>

//           </div>


//           <button
//             onClick={onClose}
//             className="rounded-lg p-2 text-gray-500 hover:bg-white/[0.05] hover:text-white"
//           >
//             <X className="h-5 w-5" />
//           </button>

//         </div>


//         {loading ? (

//           <div className="flex min-h-80 items-center justify-center">

//             <Loader2 className="h-7 w-7 animate-spin text-emerald-400" />

//           </div>

//         ) : foundation ? (

//           <>

//             <div className="grid gap-6 p-6 sm:grid-cols-2">

//               <DetailItem
//                 label="Organization Name"
//                 value={
//                   foundation.organizationName
//                 }
//               />

//               <DetailItem
//                 label="Registration Number"
//                 value={
//                   foundation.registrationNumber
//                 }
//               />

//               <DetailItem
//                 label="Address"
//                 value={
//                   foundation.address
//                 }
//               />

//               <DetailItem
//                 label="City"
//                 value={
//                   foundation.city
//                 }
//               />

//               <DetailItem
//                 label="State"
//                 value={
//                   foundation.state
//                 }
//               />

//               <DetailItem
//                 label="Pincode"
//                 value={
//                   foundation.pincode
//                 }
//               />

//               <DetailItem
//                 label="Latitude"
//                 value={
//                   foundation.latitude
//                 }
//               />

//               <DetailItem
//                 label="Longitude"
//                 value={
//                   foundation.longitude
//                 }
//               />

//               <DetailItem
//                 label="Verification Status"
//                 value={
//                   foundation.verificationStatus
//                 }
//               />

//               <DetailItem
//                 label="Created At"
//                 value={
//                   foundation.createdAt
//                     ? new Date(
//                         foundation.createdAt
//                       ).toLocaleString(
//                         "en-IN"
//                       )
//                     : "—"
//                 }
//               />

//             </div>


//             {foundation.rejectionReason && (

//               <div className="mx-6 mb-6 rounded-xl border border-red-400/20 bg-red-400/5 p-4">

//                 <p className="text-xs uppercase tracking-wider text-red-400">
//                   Rejection Reason
//                 </p>

//                 <p className="mt-2 text-sm text-red-200">
//                   {foundation.rejectionReason}
//                 </p>

//               </div>

//             )}


//             {/* Actions */}

//             {foundation.verificationStatus ===
//               "PENDING" && (

//               <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] p-6 sm:flex-row sm:justify-end">

//                 <button
//                   onClick={onReject}
//                   disabled={actionLoading}
//                   className="
//                     rounded-xl
//                     border
//                     border-red-400/20
//                     bg-red-400/5
//                     px-5
//                     py-2.5
//                     text-sm
//                     font-medium
//                     text-red-400
//                     hover:bg-red-400/10
//                     disabled:opacity-50
//                   "
//                 >
//                   Reject
//                 </button>


//                 <button
//                   onClick={onApprove}
//                   disabled={actionLoading}
//                   className="
//                     rounded-xl
//                     bg-emerald-400
//                     px-5
//                     py-2.5
//                     text-sm
//                     font-semibold
//                     text-black
//                     hover:bg-emerald-300
//                     disabled:opacity-50
//                   "
//                 >
//                   {actionLoading
//                     ? "Processing..."
//                     : "Approve Foundation"}
//                 </button>

//               </div>
//             )}

//           </>

//         ) : null}

//       </div>

//     </div>
//   );
// }


// // =========================================================
// // DETAIL ITEM
// // =========================================================

// function DetailItem({
//   label,
//   value,
// }) {

//   return (
//     <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">

//       <p className="text-xs uppercase tracking-wider text-gray-600">
//         {label}
//       </p>

//       <p className="mt-2 break-words text-sm text-gray-300">
//         {value ?? "—"}
//       </p>

//     </div>
//   );
// }


// // =========================================================
// // REJECT MODAL
// // =========================================================

// function RejectModal({
//   foundation,
//   reason,
//   setReason,
//   loading,
//   onClose,
//   onReject,
// }) {

//   return (
//     <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

//       <div className="w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#0a0a0a]">

//         <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">

//           <div>

//             <p className="text-xs uppercase tracking-wider text-red-400">
//               Verification Action
//             </p>

//             <h2 className="mt-1 font-semibold text-white">
//               Reject Foundation
//             </h2>

//           </div>


//           <button
//             onClick={onClose}
//             disabled={loading}
//             className="rounded-lg p-2 text-gray-500 hover:bg-white/[0.05] hover:text-white"
//           >
//             <X className="h-5 w-5" />
//           </button>

//         </div>


//         <div className="p-6">

//           <p className="text-sm text-gray-400">

//             You are rejecting{" "}

//             <span className="font-medium text-white">
//               {foundation?.organizationName}
//             </span>
//             .

//           </p>


//           <label className="mt-5 block">

//             <span className="text-sm font-medium text-gray-300">
//               Rejection reason
//             </span>


//             <textarea
//               value={reason}
//               onChange={(event) =>
//                 setReason(
//                   event.target.value
//                 )
//               }
//               disabled={loading}
//               rows={5}
//               maxLength={500}
//               placeholder="Explain why this foundation registration is being rejected..."
//               className="
//                 mt-2
//                 w-full
//                 resize-none
//                 rounded-xl
//                 border
//                 border-white/[0.1]
//                 bg-white/[0.03]
//                 px-4
//                 py-3
//                 text-sm
//                 text-white
//                 outline-none
//                 placeholder:text-gray-700
//                 focus:border-red-400/40
//               "
//             />

//           </label>


//           <div className="mt-2 flex justify-end">

//             <span className="text-xs text-gray-600">
//               {reason.length}/500
//             </span>

//           </div>


//           <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

//             <button
//               onClick={onClose}
//               disabled={loading}
//               className="
//                 rounded-xl
//                 border
//                 border-white/[0.1]
//                 px-5
//                 py-2.5
//                 text-sm
//                 text-gray-400
//                 hover:bg-white/[0.05]
//               "
//             >
//               Cancel
//             </button>


//             <button
//               onClick={onReject}
//               disabled={
//                 loading ||
//                 !reason.trim()
//               }
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-xl
//                 bg-red-500
//                 px-5
//                 py-2.5
//                 text-sm
//                 font-semibold
//                 text-white
//                 hover:bg-red-400
//                 disabled:cursor-not-allowed
//                 disabled:opacity-50
//               "
//             >

//               {loading && (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               )}

//               {loading
//                 ? "Rejecting..."
//                 : "Reject Foundation"}

//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }


// export default Foundations;

import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

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
  // FETCH DONATIONS
  // =======================================================

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError("");

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

      const response =
        await axiosInstance.get(
          `/admin/donations?${params.toString()}`
        );

      const result = response.data;

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
        err.response?.data?.message ||
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

      const response =
        await axiosInstance.get(
          `/admin/donations/${donationId}`
        );

      const result = response.data;

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
        err.response?.data?.message ||
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
                setSearch(
                  event.target.value
                )
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
                    : formatStatus(
                        option
                      )}
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
            onClick={() =>
              setError("")
            }
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