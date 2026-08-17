// // import { useEffect, useMemo, useState } from "react";

// // // =========================================================
// // // API
// // // =========================================================

// // const USERS_API =
// //   "http://localhost:8080/api/admin/users";

// // const FOUNDATIONS_API =
// //   "http://localhost:8080/api/admin/foundations";

// // const DONATIONS_API =
// //   "http://localhost:8080/api/admin/donations";


// // // =========================================================
// // // DONATION STATUS CONFIG
// // // =========================================================

// // const STATUS_CONFIG = {
// //   AVAILABLE: {
// //     label: "Available",
// //     icon: "🟢",
// //   },

// //   ACCEPTED: {
// //     label: "Accepted",
// //     icon: "🔵",
// //   },

// //   PICKED_UP: {
// //     label: "Picked Up",
// //     icon: "🟡",
// //   },

// //   DELIVERED: {
// //     label: "Delivered",
// //     icon: "🟣",
// //   },

// //   EXPIRED: {
// //     label: "Expired",
// //     icon: "🔴",
// //   },
// // };


// // // =========================================================
// // // FORMAT STATUS
// // // =========================================================

// // const formatStatus = (status) => {
// //   if (!status) {
// //     return "-";
// //   }

// //   return status
// //     .replaceAll("_", " ")
// //     .toLowerCase()
// //     .replace(/\b\w/g, (char) => char.toUpperCase());
// // };


// // // =========================================================
// // // STATUS COLORS
// // // =========================================================

// // const getStatusClasses = (status) => {
// //   switch (status) {
// //     case "AVAILABLE":
// //       return "bg-emerald-50 text-emerald-700 border-emerald-200";

// //     case "ACCEPTED":
// //       return "bg-blue-50 text-blue-700 border-blue-200";

// //     case "PICKED_UP":
// //       return "bg-amber-50 text-amber-700 border-amber-200";

// //     case "DELIVERED":
// //       return "bg-purple-50 text-purple-700 border-purple-200";

// //     case "EXPIRED":
// //       return "bg-red-50 text-red-700 border-red-200";

// //     default:
// //       return "bg-gray-50 text-gray-700 border-gray-200";
// //   }
// // };


// // // =========================================================
// // // DATE FORMATTER
// // // =========================================================

// // const formatDate = (date) => {
// //   if (!date) {
// //     return "-";
// //   }

// //   return new Date(date).toLocaleString("en-IN", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //     hour: "2-digit",
// //     minute: "2-digit",
// //   });
// // };


// // // =========================================================
// // // ADMIN DASHBOARD
// // // =========================================================

// // function AdminDashboard() {

// //   // =======================================================
// //   // STATE
// //   // =======================================================

// //   const [users, setUsers] = useState([]);

// //   const [pendingFoundations, setPendingFoundations] =
// //     useState([]);

// //   const [donations, setDonations] = useState([]);

// //   const [loading, setLoading] = useState(true);

// //   const [error, setError] = useState("");

// //   const [lastRefreshed, setLastRefreshed] =
// //     useState(null);


// //   // =======================================================
// //   // GET TOKEN
// //   // =======================================================

// //   const getToken = () => {
// //     return localStorage.getItem("token");
// //   };


// //   // =======================================================
// //   // GENERIC API REQUEST
// //   // =======================================================

// //   const fetchApi = async (url) => {

// //     const token = getToken();

// //     if (!token) {
// //       throw new Error(
// //         "Authentication token not found. Please login again."
// //       );
// //     }


// //     const response = await fetch(
// //       url,
// //       {
// //         method: "GET",

// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           Accept: "application/json",
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );


// //     if (!response.ok) {

// //       let message =
// //         `Request failed with status ${response.status}`;

// //       try {
// //         const errorData =
// //           await response.json();

// //         if (errorData?.message) {
// //           message = errorData.message;
// //         }
// //       } catch {
// //         // Ignore invalid error response
// //       }

// //       throw new Error(message);
// //     }


// //     const result =
// //       await response.json();


// //     if (!result.success) {
// //       throw new Error(
// //         result.message ||
// //           "Request failed."
// //       );
// //     }


// //     return result.data;
// //   };


// //   // =======================================================
// //   // LOAD DASHBOARD DATA
// //   // =======================================================

// //   const loadDashboard = async () => {

// //     try {

// //       setLoading(true);

// //       setError("");


// //       // ---------------------------------------------------
// //       // EXISTING BACKEND ENDPOINTS
// //       // ---------------------------------------------------
// //       //
// //       // Users:
// //       // GET /api/admin/users
// //       //
// //       // Pending foundations:
// //       // GET /api/admin/foundations/pending
// //       //
// //       // Donations:
// //       // GET /api/admin/donations
// //       //
// //       // ---------------------------------------------------

// //       const [
// //         usersData,
// //         pendingFoundationsData,
// //         donationsData,
// //       ] = await Promise.all([

// //         fetchApi(
// //           `${USERS_API}?page=0&size=100`
// //         ),

// //         fetchApi(
// //           `${FOUNDATIONS_API}/pending`
// //         ),

// //         fetchApi(
// //           `${DONATIONS_API}?page=0&size=100`
// //         ),

// //       ]);


// //       // ===================================================
// //       // USERS
// //       // ===================================================

// //       const usersList =
// //         Array.isArray(usersData)
// //           ? usersData
// //           : usersData?.content || [];

// //       setUsers(usersList);


// //       // ===================================================
// //       // PENDING FOUNDATIONS
// //       // ===================================================

// //       const foundationList =
// //         Array.isArray(
// //           pendingFoundationsData
// //         )
// //           ? pendingFoundationsData
// //           : pendingFoundationsData?.content || [];

// //       setPendingFoundations(
// //         foundationList
// //       );


// //       // ===================================================
// //       // DONATIONS
// //       // ===================================================

// //       const donationsList =
// //         Array.isArray(donationsData)
// //           ? donationsData
// //           : donationsData?.content || [];

// //       setDonations(
// //         donationsList
// //       );


// //       // ===================================================
// //       // REFRESH TIME
// //       // ===================================================

// //       setLastRefreshed(
// //         new Date()
// //       );

// //     } catch (err) {

// //       console.error(
// //         "Admin dashboard error:",
// //         err
// //       );

// //       setError(
// //         err.message ||
// //           "Failed to load admin dashboard."
// //       );

// //     } finally {

// //       setLoading(false);
// //     }
// //   };


// //   // =======================================================
// //   // INITIAL LOAD
// //   // =======================================================

// //   useEffect(() => {

// //     loadDashboard();

// //   }, []);


// //   // =======================================================
// //   // USER STATISTICS
// //   // =======================================================

// //   const userStats = useMemo(() => {

// //     return {

// //       total: users.length,

// //       donors:
// //         users.filter(
// //           (user) =>
// //             user.role === "DONOR"
// //         ).length,

// //       foundations:
// //         users.filter(
// //           (user) =>
// //             user.role === "FOUNDATION"
// //         ).length,

// //       admins:
// //         users.filter(
// //           (user) =>
// //             user.role === "ADMIN"
// //         ).length,

// //       active:
// //         users.filter(
// //           (user) =>
// //             user.status === "ACTIVE"
// //         ).length,

// //       inactive:
// //         users.filter(
// //           (user) =>
// //             user.status !== "ACTIVE"
// //         ).length,
// //     };

// //   }, [users]);


// //   // =======================================================
// //   // DONATION STATISTICS
// //   // =======================================================

// //   const donationStats = useMemo(() => {

// //     const stats = {
// //       AVAILABLE: 0,
// //       ACCEPTED: 0,
// //       PICKED_UP: 0,
// //       DELIVERED: 0,
// //       EXPIRED: 0,
// //     };


// //     donations.forEach(
// //       (donation) => {

// //         if (
// //           stats[
// //             donation.status
// //           ] !== undefined
// //         ) {

// //           stats[
// //             donation.status
// //           ]++;
// //         }

// //       }
// //     );


// //     return stats;

// //   }, [donations]);


// //   // =======================================================
// //   // TOTAL FOOD QUANTITY
// //   // =======================================================

// //   const totalFoodQuantity =
// //     useMemo(() => {

// //       return donations.reduce(
// //         (total, donation) => {

// //           const quantity =
// //             Number(
// //               donation.quantity
// //             ) || 0;

// //           return total + quantity;

// //         },
// //         0
// //       );

// //     }, [donations]);


// //   // =======================================================
// //   // FOUNDATION STATISTICS
// //   // =======================================================

// //   const foundationStats =
// //     useMemo(() => {

// //       return {

// //         totalUsers:
// //           userStats.foundations,

// //         pending:
// //           pendingFoundations.length,

// //       };

// //     }, [
// //       userStats.foundations,
// //       pendingFoundations,
// //     ]);


// //   // =======================================================
// //   // RECENT DONATIONS
// //   // =======================================================

// //   const recentDonations =
// //     useMemo(() => {

// //       return [...donations]
// //         .sort(
// //           (a, b) =>
// //             new Date(
// //               b.createdAt
// //             ) -
// //             new Date(
// //               a.createdAt
// //             )
// //         )
// //         .slice(0, 5);

// //     }, [donations]);


// //   // =======================================================
// //   // REFRESH
// //   // =======================================================

// //   const handleRefresh = () => {

// //     loadDashboard();

// //   };


// //   // =======================================================
// //   // LOADING SCREEN
// //   // =======================================================

// //   if (loading) {

// //     return (
// //       <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

// //         <div className="flex min-h-[500px] items-center justify-center">

// //           <div className="text-center">

// //             <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

// //             <p className="text-sm text-gray-500">
// //               Loading admin dashboard...
// //             </p>

// //           </div>

// //         </div>

// //       </div>
// //     );
// //   }


// //   // =======================================================
// //   // MAIN DASHBOARD
// //   // =======================================================

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">


// //       {/* =================================================
// //           HEADER
// //       ================================================= */}

// //       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

// //         <div>

// //           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
// //             Admin Dashboard
// //           </h1>

// //           <p className="mt-1 text-sm text-gray-500">
// //             FoodBridge platform overview and operational insights.
// //           </p>

// //         </div>


// //         <div className="flex items-center gap-3">

// //           {lastRefreshed && (

// //             <span className="hidden text-xs text-gray-400 sm:block">
// //               Updated{" "}
// //               {lastRefreshed.toLocaleTimeString(
// //                 "en-IN"
// //               )}
// //             </span>

// //           )}


// //           <button
// //             type="button"
// //             onClick={handleRefresh}
// //             disabled={loading}
// //             className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
// //           >
// //             ↻ Refresh
// //           </button>

// //         </div>

// //       </div>


// //       {/* =================================================
// //           ERROR
// //       ================================================= */}

// //       {error && (

// //         <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4">

// //           <div>

// //             <p className="text-sm font-semibold text-red-800">
// //               Dashboard Error
// //             </p>

// //             <p className="mt-1 text-sm text-red-700">
// //               {error}
// //             </p>

// //           </div>


// //           <button
// //             type="button"
// //             onClick={() =>
// //               setError("")
// //             }
// //             className="text-lg font-bold text-red-500 hover:text-red-700"
// //           >
// //             ×
// //           </button>

// //         </div>

// //       )}


// //       {/* =================================================
// //           MAIN STAT CARDS
// //       ================================================= */}

// //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">


// //         {/* TOTAL USERS */}

// //         <StatCard
// //           title="Total Users"
// //           value={userStats.total}
// //           subtitle={`${userStats.active} active accounts`}
// //           icon="👥"
// //         />


// //         {/* FOUNDATION USERS */}

// //         <StatCard
// //           title="Foundation Users"
// //           value={userStats.foundations}
// //           subtitle={`${foundationStats.pending} pending profiles`}
// //           icon="🏢"
// //         />


// //         {/* DONATIONS */}

// //         <StatCard
// //           title="Total Donations"
// //           value={donations.length}
// //           subtitle={`${donationStats.DELIVERED} delivered`}
// //           icon="🍱"
// //         />


// //         {/* FOOD */}

// //         <StatCard
// //           title="Food Quantity"
// //           value={`${totalFoodQuantity.toFixed(2)} KG`}
// //           subtitle="Across loaded donations"
// //           icon="⚖️"
// //         />

// //       </div>


// //       {/* =================================================
// //           SECONDARY STATISTICS
// //       ================================================= */}

// //       <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

// //         <MiniStat
// //           title="Donors"
// //           value={userStats.donors}
// //         />

// //         <MiniStat
// //           title="Admins"
// //           value={userStats.admins}
// //         />

// //         <MiniStat
// //           title="Pending Foundations"
// //           value={foundationStats.pending}
// //         />

// //         <MiniStat
// //           title="Expired Donations"
// //           value={donationStats.EXPIRED}
// //         />

// //       </div>


// //       {/* =================================================
// //           MAIN CONTENT
// //       ================================================= */}

// //       <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">


// //         {/* =================================================
// //             DONATION STATUS
// //         ================================================= */}

// //         <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-1">

// //           <div className="mb-5">

// //             <h2 className="text-lg font-bold text-gray-900">
// //               Donation Status
// //             </h2>

// //             <p className="mt-1 text-sm text-gray-500">
// //               Current donation lifecycle.
// //             </p>

// //           </div>


// //           <div className="space-y-5">

// //             {Object.entries(
// //               STATUS_CONFIG
// //             ).map(
// //               ([status, config]) => {

// //                 const count =
// //                   donationStats[
// //                     status
// //                   ] || 0;


// //                 const percentage =
// //                   donations.length > 0
// //                     ? Math.round(
// //                         (count /
// //                           donations.length) *
// //                           100
// //                       )
// //                     : 0;


// //                 return (
// //                   <div
// //                     key={status}
// //                   >

// //                     <div className="mb-2 flex items-center justify-between">

// //                       <div className="flex items-center gap-2">

// //                         <span>
// //                           {config.icon}
// //                         </span>

// //                         <span className="text-sm font-medium text-gray-700">
// //                           {config.label}
// //                         </span>

// //                       </div>


// //                       <div className="flex items-center gap-2">

// //                         <span className="text-sm font-bold text-gray-900">
// //                           {count}
// //                         </span>

// //                         <span className="text-xs text-gray-400">
// //                           ({percentage}%)
// //                         </span>

// //                       </div>

// //                     </div>


// //                     <div className="h-2 overflow-hidden rounded-full bg-gray-100">

// //                       <div
// //                         className="h-full rounded-full bg-gray-900 transition-all duration-500"
// //                         style={{
// //                           width: `${percentage}%`,
// //                         }}
// //                       />

// //                     </div>

// //                   </div>
// //                 );
// //               }
// //             )}

// //           </div>

// //         </div>


// //         {/* =================================================
// //             RECENT DONATIONS
// //         ================================================= */}

// //         <div className="rounded-xl border border-gray-200 bg-white shadow-sm xl:col-span-2">

// //           <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

// //             <div>

// //               <h2 className="text-lg font-bold text-gray-900">
// //                 Recent Donations
// //               </h2>

// //               <p className="mt-1 text-sm text-gray-500">
// //                 Latest donation activity.
// //               </p>

// //             </div>


// //             <a
// //               href="/admin/donations"
// //               className="text-sm font-semibold text-gray-700 transition hover:text-gray-900"
// //             >
// //               View all →
// //             </a>

// //           </div>


// //           {recentDonations.length === 0 ? (

// //             <div className="flex min-h-[300px] items-center justify-center p-6">

// //               <p className="text-sm text-gray-500">
// //                 No donations available.
// //               </p>

// //             </div>

// //           ) : (

// //             <div className="divide-y divide-gray-100">

// //               {recentDonations.map(
// //                 (donation) => (

// //                   <div
// //                     key={donation.id}
// //                     className="flex flex-col gap-4 px-5 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
// //                   >

// //                     <div className="min-w-0">

// //                       <div className="flex items-center gap-2">

// //                         <h3 className="truncate text-sm font-semibold text-gray-900">
// //                           {donation.foodName}
// //                         </h3>

// //                         <span className="text-xs text-gray-400">
// //                           #{donation.id}
// //                         </span>

// //                       </div>


// //                       <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">

// //                         <span>
// //                           {donation.donorName}
// //                         </span>

// //                         <span>
// //                           •
// //                         </span>

// //                         <span>
// //                           {donation.quantity}{" "}
// //                           {donation.quantityUnit}
// //                         </span>

// //                         <span>
// //                           •
// //                         </span>

// //                         <span>
// //                           {formatDate(
// //                             donation.createdAt
// //                           )}
// //                         </span>

// //                       </div>


// //                       <p className="mt-1 truncate text-xs text-gray-400">
// //                         {donation.foundationName ||
// //                           "No foundation assigned"}
// //                       </p>

// //                     </div>


// //                     <span
// //                       className={`w-fit shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
// //                         donation.status
// //                       )}`}
// //                     >
// //                       {formatStatus(
// //                         donation.status
// //                       )}
// //                     </span>

// //                   </div>

// //                 )
// //               )}

// //             </div>

// //           )}

// //         </div>

// //       </div>


// //       {/* =================================================
// //           FOUNDATION VERIFICATION
// //       ================================================= */}

// //       <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

// //         <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

// //           <div>

// //             <h2 className="text-lg font-bold text-gray-900">
// //               Foundation Verification
// //             </h2>

// //             <p className="mt-1 text-sm text-gray-500">
// //               Foundations currently awaiting admin verification.
// //             </p>

// //           </div>


// //           <a
// //             href="/admin/foundations"
// //             className="text-sm font-semibold text-gray-700 hover:text-gray-900"
// //           >
// //             Manage foundations →
// //           </a>

// //         </div>


// //         {pendingFoundations.length === 0 ? (

// //           <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">

// //             <div className="mb-3 text-2xl">
// //               ✓
// //             </div>

// //             <p className="text-sm font-semibold text-gray-900">
// //               No pending foundations
// //             </p>

// //             <p className="mt-1 text-xs text-gray-500">
// //               All currently loaded foundation profiles have been processed.
// //             </p>

// //           </div>

// //         ) : (

// //           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

// //             {pendingFoundations
// //               .slice(0, 6)
// //               .map(
// //                 (foundation) => (

// //                   <div
// //                     key={
// //                       foundation.id
// //                     }
// //                     className="rounded-xl border border-gray-200 p-4 transition hover:border-gray-300 hover:shadow-sm"
// //                   >

// //                     <div className="flex items-start justify-between gap-3">

// //                       <div className="min-w-0">

// //                         <h3 className="truncate text-sm font-bold text-gray-900">
// //                           {
// //                             foundation.organizationName
// //                           }
// //                         </h3>

// //                         <p className="mt-1 text-xs text-gray-500">
// //                           ID #{foundation.id}
// //                         </p>

// //                       </div>


// //                       <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
// //                         Pending
// //                       </span>

// //                     </div>


// //                     <div className="mt-4 space-y-2">

// //                       <InfoRow
// //                         label="Registration"
// //                         value={
// //                           foundation.registrationNumber
// //                         }
// //                       />

// //                       <InfoRow
// //                         label="City"
// //                         value={
// //                           foundation.city
// //                         }
// //                       />

// //                       <InfoRow
// //                         label="State"
// //                         value={
// //                           foundation.state
// //                         }
// //                       />

// //                     </div>


// //                     <a
// //                       href={`/admin/foundations/${foundation.id}`}
// //                       className="mt-4 block w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-xs font-semibold text-gray-700 transition hover:bg-gray-900 hover:text-white"
// //                     >
// //                       Review Foundation
// //                     </a>

// //                   </div>

// //                 )
// //               )}

// //           </div>

// //         )}

// //       </div>


// //       {/* =================================================
// //           USER OVERVIEW
// //       ================================================= */}

// //       <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

// //         <div className="mb-5">

// //           <h2 className="text-lg font-bold text-gray-900">
// //             User Overview
// //           </h2>

// //           <p className="mt-1 text-sm text-gray-500">
// //             Current platform user distribution.
// //           </p>

// //         </div>


// //         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

// //           <OverviewBox
// //             title="Donors"
// //             value={userStats.donors}
// //             description="Registered donor accounts"
// //           />

// //           <OverviewBox
// //             title="Foundations"
// //             value={userStats.foundations}
// //             description="Registered foundation accounts"
// //           />

// //           <OverviewBox
// //             title="Admins"
// //             value={userStats.admins}
// //             description="Administrator accounts"
// //           />

// //           <OverviewBox
// //             title="Active"
// //             value={userStats.active}
// //             description="Active user accounts"
// //           />

// //         </div>

// //       </div>


// //       {/* =================================================
// //           FOOTER
// //       ================================================= */}

// //       <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">

// //         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

// //           <div>

// //             <p className="text-sm font-semibold text-gray-900">
// //               FoodBridge Administration
// //             </p>

// //             <p className="mt-1 text-xs text-gray-500">
// //               Monitor food redistribution activity across the platform.
// //             </p>

// //           </div>


// //           {lastRefreshed && (

// //             <p className="text-xs text-gray-400">
// //               Last refreshed:{" "}
// //               {lastRefreshed.toLocaleString(
// //                 "en-IN"
// //               )}
// //             </p>

// //           )}

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }


// // // =========================================================
// // // STAT CARD
// // // =========================================================

// // function StatCard({
// //   title,
// //   value,
// //   subtitle,
// //   icon,
// // }) {

// //   return (
// //     <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

// //       <div className="flex items-start justify-between">

// //         <div className="min-w-0">

// //           <p className="text-sm font-medium text-gray-500">
// //             {title}
// //           </p>

// //           <p className="mt-2 truncate text-2xl font-bold text-gray-900">
// //             {value}
// //           </p>

// //           <p className="mt-1 text-xs text-gray-400">
// //             {subtitle}
// //           </p>

// //         </div>


// //         <div className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl">
// //           {icon}
// //         </div>

// //       </div>

// //     </div>
// //   );
// // }


// // // =========================================================
// // // MINI STAT
// // // =========================================================

// // function MiniStat({
// //   title,
// //   value,
// // }) {

// //   return (
// //     <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

// //       <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
// //         {title}
// //       </p>

// //       <p className="mt-2 text-xl font-bold text-gray-900">
// //         {value}
// //       </p>

// //     </div>
// //   );
// // }


// // // =========================================================
// // // OVERVIEW BOX
// // // =========================================================

// // function OverviewBox({
// //   title,
// //   value,
// //   description,
// // }) {

// //   return (
// //     <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

// //       <p className="text-sm font-semibold text-gray-700">
// //         {title}
// //       </p>

// //       <p className="mt-2 text-3xl font-bold text-gray-900">
// //         {value}
// //       </p>

// //       <p className="mt-1 text-xs text-gray-400">
// //         {description}
// //       </p>

// //     </div>
// //   );
// // }


// // // =========================================================
// // // INFO ROW
// // // =========================================================

// // function InfoRow({
// //   label,
// //   value,
// // }) {

// //   return (
// //     <div className="flex items-center justify-between gap-3 text-xs">

// //       <span className="text-gray-400">
// //         {label}
// //       </span>

// //       <span className="max-w-[60%] truncate text-right font-medium text-gray-700">
// //         {value || "-"}
// //       </span>

// //     </div>
// //   );
// // }


// // export default AdminDashboard;

// import { useEffect, useMemo, useState } from "react";

// // =========================================================
// // API CONFIGURATION
// // =========================================================

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// if (!API_BASE_URL) {
//   console.error(
//     "VITE_API_BASE_URL is not configured."
//   );
// }

// // =========================================================
// // ADMIN API ENDPOINTS
// // =========================================================

// const USERS_API =
//   `${API_BASE_URL}/admin/users`;

// const FOUNDATIONS_API =
//   `${API_BASE_URL}/admin/foundations`;

// const DONATIONS_API =
//   `${API_BASE_URL}/admin/donations`;

// // =========================================================
// // DONATION STATUS CONFIG
// // =========================================================

// const STATUS_CONFIG = {
//   AVAILABLE: {
//     label: "Available",
//     icon: "🟢",
//   },

//   ACCEPTED: {
//     label: "Accepted",
//     icon: "🔵",
//   },

//   PICKED_UP: {
//     label: "Picked Up",
//     icon: "🟡",
//   },

//   DELIVERED: {
//     label: "Delivered",
//     icon: "🟣",
//   },

//   EXPIRED: {
//     label: "Expired",
//     icon: "🔴",
//   },
// };

// // =========================================================
// // FORMAT STATUS
// // =========================================================

// const formatStatus = (status) => {
//   if (!status) {
//     return "-";
//   }

//   return status
//     .replaceAll("_", " ")
//     .toLowerCase()
//     .replace(/\b\w/g, (char) => char.toUpperCase());
// };

// // =========================================================
// // STATUS COLORS
// // =========================================================

// const getStatusClasses = (status) => {
//   switch (status) {
//     case "AVAILABLE":
//       return "bg-emerald-50 text-emerald-700 border-emerald-200";

//     case "ACCEPTED":
//       return "bg-blue-50 text-blue-700 border-blue-200";

//     case "PICKED_UP":
//       return "bg-amber-50 text-amber-700 border-amber-200";

//     case "DELIVERED":
//       return "bg-purple-50 text-purple-700 border-purple-200";

//     case "EXPIRED":
//       return "bg-red-50 text-red-700 border-red-200";

//     default:
//       return "bg-gray-50 text-gray-700 border-gray-200";
//   }
// };

// // =========================================================
// // DATE FORMATTER
// // =========================================================

// const formatDate = (date) => {
//   if (!date) {
//     return "-";
//   }

//   return new Date(date).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// // =========================================================
// // ADMIN DASHBOARD
// // =========================================================

// function AdminDashboard() {
//   // =======================================================
//   // STATE
//   // =======================================================

//   const [users, setUsers] = useState([]);

//   const [pendingFoundations, setPendingFoundations] =
//     useState([]);

//   const [donations, setDonations] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState("");

//   const [lastRefreshed, setLastRefreshed] =
//     useState(null);

//   // =======================================================
//   // GET TOKEN
//   // =======================================================

//   const getToken = () => {
//     return localStorage.getItem("token");
//   };

//   // =======================================================
//   // GENERIC API REQUEST
//   // =======================================================

//   const fetchApi = async (url) => {
//     const token = getToken();

//     if (!token) {
//       throw new Error(
//         "Authentication token not found. Please login again."
//       );
//     }

//     const response = await fetch(url, {
//       method: "GET",

//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       let message =
//         `Request failed with status ${response.status}`;

//       try {
//         const errorData = await response.json();

//         if (errorData?.message) {
//           message = errorData.message;
//         }
//       } catch {
//         // Ignore invalid error response
//       }

//       throw new Error(message);
//     }

//     const result = await response.json();

//     if (!result.success) {
//       throw new Error(
//         result.message ||
//           "Request failed."
//       );
//     }

//     return result.data;
//   };

//   // =======================================================
//   // LOAD DASHBOARD DATA
//   // =======================================================

//   const loadDashboard = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       // ---------------------------------------------------
//       // BACKEND ENDPOINTS
//       // ---------------------------------------------------
//       //
//       // GET /api/admin/users
//       //
//       // GET /api/admin/foundations/pending
//       //
//       // GET /api/admin/donations
//       //
//       // ---------------------------------------------------

//       const [
//         usersData,
//         pendingFoundationsData,
//         donationsData,
//       ] = await Promise.all([
//         fetchApi(
//           `${USERS_API}?page=0&size=100`
//         ),

//         fetchApi(
//           `${FOUNDATIONS_API}/pending`
//         ),

//         fetchApi(
//           `${DONATIONS_API}?page=0&size=100`
//         ),
//       ]);

//       // ===================================================
//       // USERS
//       // ===================================================

//       const usersList =
//         Array.isArray(usersData)
//           ? usersData
//           : usersData?.content || [];

//       setUsers(usersList);

//       // ===================================================
//       // PENDING FOUNDATIONS
//       // ===================================================

//       const foundationList =
//         Array.isArray(
//           pendingFoundationsData
//         )
//           ? pendingFoundationsData
//           : pendingFoundationsData?.content || [];

//       setPendingFoundations(
//         foundationList
//       );

//       // ===================================================
//       // DONATIONS
//       // ===================================================

//       const donationsList =
//         Array.isArray(donationsData)
//           ? donationsData
//           : donationsData?.content || [];

//       setDonations(
//         donationsList
//       );

//       // ===================================================
//       // REFRESH TIME
//       // ===================================================

//       setLastRefreshed(
//         new Date()
//       );

//     } catch (err) {
//       console.error(
//         "Admin dashboard error:",
//         err
//       );

//       setError(
//         err.message ||
//           "Failed to load admin dashboard."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =======================================================
//   // INITIAL LOAD
//   // =======================================================

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   // =======================================================
//   // USER STATISTICS
//   // =======================================================

//   const userStats = useMemo(() => {
//     return {
//       total: users.length,

//       donors:
//         users.filter(
//           (user) =>
//             user.role === "DONOR"
//         ).length,

//       foundations:
//         users.filter(
//           (user) =>
//             user.role === "FOUNDATION"
//         ).length,

//       admins:
//         users.filter(
//           (user) =>
//             user.role === "ADMIN"
//         ).length,

//       active:
//         users.filter(
//           (user) =>
//             user.status === "ACTIVE"
//         ).length,

//       inactive:
//         users.filter(
//           (user) =>
//             user.status !== "ACTIVE"
//         ).length,
//     };
//   }, [users]);

//   // =======================================================
//   // DONATION STATISTICS
//   // =======================================================

//   const donationStats = useMemo(() => {
//     const stats = {
//       AVAILABLE: 0,
//       ACCEPTED: 0,
//       PICKED_UP: 0,
//       DELIVERED: 0,
//       EXPIRED: 0,
//     };

//     donations.forEach(
//       (donation) => {
//         if (
//           stats[donation.status] !==
//           undefined
//         ) {
//           stats[donation.status]++;
//         }
//       }
//     );

//     return stats;
//   }, [donations]);

//   // =======================================================
//   // TOTAL FOOD QUANTITY
//   // =======================================================

//   const totalFoodQuantity =
//     useMemo(() => {
//       return donations.reduce(
//         (total, donation) => {
//           const quantity =
//             Number(
//               donation.quantity
//             ) || 0;

//           return total + quantity;
//         },
//         0
//       );
//     }, [donations]);

//   // =======================================================
//   // FOUNDATION STATISTICS
//   // =======================================================

//   const foundationStats =
//     useMemo(() => {
//       return {
//         totalUsers:
//           userStats.foundations,

//         pending:
//           pendingFoundations.length,
//       };
//     }, [
//       userStats.foundations,
//       pendingFoundations,
//     ]);

//   // =======================================================
//   // RECENT DONATIONS
//   // =======================================================

//   const recentDonations =
//     useMemo(() => {
//       return [...donations]
//         .sort(
//           (a, b) =>
//             new Date(
//               b.createdAt
//             ) -
//             new Date(
//               a.createdAt
//             )
//         )
//         .slice(0, 5);
//     }, [donations]);

//   // =======================================================
//   // REFRESH
//   // =======================================================

//   const handleRefresh = () => {
//     loadDashboard();
//   };

//   // =======================================================
//   // LOADING SCREEN
//   // =======================================================

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//         <div className="flex min-h-[500px] items-center justify-center">
//           <div className="text-center">
//             <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

//             <p className="text-sm text-gray-500">
//               Loading admin dashboard...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // =======================================================
//   // MAIN DASHBOARD
//   // =======================================================

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//             Admin Dashboard
//           </h1>

//           <p className="mt-1 text-sm text-gray-500">
//             FoodBridge platform overview and operational insights.
//           </p>
//         </div>

//         <div className="flex items-center gap-3">

//           {lastRefreshed && (
//             <span className="hidden text-xs text-gray-400 sm:block">
//               Updated{" "}
//               {lastRefreshed.toLocaleTimeString(
//                 "en-IN"
//               )}
//             </span>
//           )}

//           <button
//             type="button"
//             onClick={handleRefresh}
//             disabled={loading}
//             className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             ↻ Refresh
//           </button>

//         </div>
//       </div>

//       {/* =================================================
//           ERROR
//       ================================================= */}

//       {error && (
//         <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4">

//           <div>
//             <p className="text-sm font-semibold text-red-800">
//               Dashboard Error
//             </p>

//             <p className="mt-1 text-sm text-red-700">
//               {error}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() =>
//               setError("")
//             }
//             className="text-lg font-bold text-red-500 hover:text-red-700"
//           >
//             ×
//           </button>

//         </div>
//       )}

//       {/* =================================================
//           MAIN STAT CARDS
//       ================================================= */}

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

//         <StatCard
//           title="Total Users"
//           value={userStats.total}
//           subtitle={`${userStats.active} active accounts`}
//           icon="👥"
//         />

//         <StatCard
//           title="Foundation Users"
//           value={userStats.foundations}
//           subtitle={`${foundationStats.pending} pending profiles`}
//           icon="🏢"
//         />

//         <StatCard
//           title="Total Donations"
//           value={donations.length}
//           subtitle={`${donationStats.DELIVERED} delivered`}
//           icon="🍱"
//         />

//         <StatCard
//           title="Food Quantity"
//           value={`${totalFoodQuantity.toFixed(2)} KG`}
//           subtitle="Across loaded donations"
//           icon="⚖️"
//         />

//       </div>

//       {/* =================================================
//           SECONDARY STATISTICS
//       ================================================= */}

//       <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

//         <MiniStat
//           title="Donors"
//           value={userStats.donors}
//         />

//         <MiniStat
//           title="Admins"
//           value={userStats.admins}
//         />

//         <MiniStat
//           title="Pending Foundations"
//           value={foundationStats.pending}
//         />

//         <MiniStat
//           title="Expired Donations"
//           value={donationStats.EXPIRED}
//         />

//       </div>

//       {/* =================================================
//           MAIN CONTENT
//       ================================================= */}

//       <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

//         {/* =================================================
//             DONATION STATUS
//         ================================================= */}

//         <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-1">

//           <div className="mb-5">
//             <h2 className="text-lg font-bold text-gray-900">
//               Donation Status
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Current donation lifecycle.
//             </p>
//           </div>

//           <div className="space-y-5">

//             {Object.entries(
//               STATUS_CONFIG
//             ).map(
//               ([status, config]) => {

//                 const count =
//                   donationStats[
//                     status
//                   ] || 0;

//                 const percentage =
//                   donations.length > 0
//                     ? Math.round(
//                         (count /
//                           donations.length) *
//                           100
//                       )
//                     : 0;

//                 return (
//                   <div
//                     key={status}
//                   >

//                     <div className="mb-2 flex items-center justify-between">

//                       <div className="flex items-center gap-2">
//                         <span>
//                           {config.icon}
//                         </span>

//                         <span className="text-sm font-medium text-gray-700">
//                           {config.label}
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <span className="text-sm font-bold text-gray-900">
//                           {count}
//                         </span>

//                         <span className="text-xs text-gray-400">
//                           ({percentage}%)
//                         </span>
//                       </div>

//                     </div>

//                     <div className="h-2 overflow-hidden rounded-full bg-gray-100">
//                       <div
//                         className="h-full rounded-full bg-gray-900 transition-all duration-500"
//                         style={{
//                           width: `${percentage}%`,
//                         }}
//                       />
//                     </div>

//                   </div>
//                 );
//               }
//             )}

//           </div>
//         </div>

//         {/* =================================================
//             RECENT DONATIONS
//         ================================================= */}

//         <div className="rounded-xl border border-gray-200 bg-white shadow-sm xl:col-span-2">

//           <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

//             <div>
//               <h2 className="text-lg font-bold text-gray-900">
//                 Recent Donations
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 Latest donation activity.
//               </p>
//             </div>

//             <a
//               href="/admin/donations"
//               className="text-sm font-semibold text-gray-700 transition hover:text-gray-900"
//             >
//               View all →
//             </a>

//           </div>

//           {recentDonations.length === 0 ? (

//             <div className="flex min-h-[300px] items-center justify-center p-6">
//               <p className="text-sm text-gray-500">
//                 No donations available.
//               </p>
//             </div>

//           ) : (

//             <div className="divide-y divide-gray-100">

//               {recentDonations.map(
//                 (donation) => (

//                   <div
//                     key={donation.id}
//                     className="flex flex-col gap-4 px-5 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
//                   >

//                     <div className="min-w-0">

//                       <div className="flex items-center gap-2">

//                         <h3 className="truncate text-sm font-semibold text-gray-900">
//                           {donation.foodName}
//                         </h3>

//                         <span className="text-xs text-gray-400">
//                           #{donation.id}
//                         </span>

//                       </div>

//                       <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">

//                         <span>
//                           {donation.donorName}
//                         </span>

//                         <span>
//                           •
//                         </span>

//                         <span>
//                           {donation.quantity}{" "}
//                           {donation.quantityUnit}
//                         </span>

//                         <span>
//                           •
//                         </span>

//                         <span>
//                           {formatDate(
//                             donation.createdAt
//                           )}
//                         </span>

//                       </div>

//                       <p className="mt-1 truncate text-xs text-gray-400">
//                         {donation.foundationName ||
//                           "No foundation assigned"}
//                       </p>

//                     </div>

//                     <span
//                       className={`w-fit shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                         donation.status
//                       )}`}
//                     >
//                       {formatStatus(
//                         donation.status
//                       )}
//                     </span>

//                   </div>
//                 )
//               )}

//             </div>

//           )}

//         </div>
//       </div>

//       {/* =================================================
//           FOUNDATION VERIFICATION
//       ================================================= */}

//       <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

//         <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//           <div>
//             <h2 className="text-lg font-bold text-gray-900">
//               Foundation Verification
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Foundations currently awaiting admin verification.
//             </p>
//           </div>

//           <a
//             href="/admin/foundations"
//             className="text-sm font-semibold text-gray-700 hover:text-gray-900"
//           >
//             Manage foundations →
//           </a>

//         </div>

//         {pendingFoundations.length === 0 ? (

//           <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">

//             <div className="mb-3 text-2xl">
//               ✓
//             </div>

//             <p className="text-sm font-semibold text-gray-900">
//               No pending foundations
//             </p>

//             <p className="mt-1 text-xs text-gray-500">
//               All currently loaded foundation profiles have been processed.
//             </p>

//           </div>

//         ) : (

//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

//             {pendingFoundations
//               .slice(0, 6)
//               .map(
//                 (foundation) => (

//                   <div
//                     key={foundation.id}
//                     className="rounded-xl border border-gray-200 p-4 transition hover:border-gray-300 hover:shadow-sm"
//                   >

//                     <div className="flex items-start justify-between gap-3">

//                       <div className="min-w-0">

//                         <h3 className="truncate text-sm font-bold text-gray-900">
//                           {foundation.organizationName}
//                         </h3>

//                         <p className="mt-1 text-xs text-gray-500">
//                           ID #{foundation.id}
//                         </p>

//                       </div>

//                       <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
//                         Pending
//                       </span>

//                     </div>

//                     <div className="mt-4 space-y-2">

//                       <InfoRow
//                         label="Registration"
//                         value={
//                           foundation.registrationNumber
//                         }
//                       />

//                       <InfoRow
//                         label="City"
//                         value={
//                           foundation.city
//                         }
//                       />

//                       <InfoRow
//                         label="State"
//                         value={
//                           foundation.state
//                         }
//                       />

//                     </div>

//                     <a
//                       href={`/admin/foundations/${foundation.id}`}
//                       className="mt-4 block w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-xs font-semibold text-gray-700 transition hover:bg-gray-900 hover:text-white"
//                     >
//                       Review Foundation
//                     </a>

//                   </div>
//                 )
//               )}

//           </div>
//         )}

//       </div>

//       {/* =================================================
//           USER OVERVIEW
//       ================================================= */}

//       <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

//         <div className="mb-5">

//           <h2 className="text-lg font-bold text-gray-900">
//             User Overview
//           </h2>

//           <p className="mt-1 text-sm text-gray-500">
//             Current platform user distribution.
//           </p>

//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

//           <OverviewBox
//             title="Donors"
//             value={userStats.donors}
//             description="Registered donor accounts"
//           />

//           <OverviewBox
//             title="Foundations"
//             value={userStats.foundations}
//             description="Registered foundation accounts"
//           />

//           <OverviewBox
//             title="Admins"
//             value={userStats.admins}
//             description="Administrator accounts"
//           />

//           <OverviewBox
//             title="Active"
//             value={userStats.active}
//             description="Active user accounts"
//           />

//         </div>

//       </div>

//       {/* =================================================
//           FOOTER
//       ================================================= */}

//       <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">

//         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

//           <div>

//             <p className="text-sm font-semibold text-gray-900">
//               FoodBridge Administration
//             </p>

//             <p className="mt-1 text-xs text-gray-500">
//               Monitor food redistribution activity across the platform.
//             </p>

//           </div>

//           {lastRefreshed && (
//             <p className="text-xs text-gray-400">
//               Last refreshed:{" "}
//               {lastRefreshed.toLocaleString(
//                 "en-IN"
//               )}
//             </p>
//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// // =========================================================
// // STAT CARD
// // =========================================================

// function StatCard({
//   title,
//   value,
//   subtitle,
//   icon,
// }) {
//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

//       <div className="flex items-start justify-between">

//         <div className="min-w-0">

//           <p className="text-sm font-medium text-gray-500">
//             {title}
//           </p>

//           <p className="mt-2 truncate text-2xl font-bold text-gray-900">
//             {value}
//           </p>

//           <p className="mt-1 text-xs text-gray-400">
//             {subtitle}
//           </p>

//         </div>

//         <div className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl">
//           {icon}
//         </div>

//       </div>

//     </div>
//   );
// }

// // =========================================================
// // MINI STAT
// // =========================================================

// function MiniStat({
//   title,
//   value,
// }) {
//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

//       <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
//         {title}
//       </p>

//       <p className="mt-2 text-xl font-bold text-gray-900">
//         {value}
//       </p>

//     </div>
//   );
// }

// // =========================================================
// // OVERVIEW BOX
// // =========================================================

// function OverviewBox({
//   title,
//   value,
//   description,
// }) {
//   return (
//     <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

//       <p className="text-sm font-semibold text-gray-700">
//         {title}
//       </p>

//       <p className="mt-2 text-3xl font-bold text-gray-900">
//         {value}
//       </p>

//       <p className="mt-1 text-xs text-gray-400">
//         {description}
//       </p>

//     </div>
//   );
// }

// // =========================================================
// // INFO ROW
// // =========================================================

// function InfoRow({
//   label,
//   value,
// }) {
//   return (
//     <div className="flex items-center justify-between gap-3 text-xs">

//       <span className="text-gray-400">
//         {label}
//       </span>

//       <span className="max-w-[60%] truncate text-right font-medium text-gray-700">
//         {value || "-"}
//       </span>

//     </div>
//   );
// }

// export default AdminDashboard;


import { useEffect, useMemo, useState } from "react";


// =========================================================
// API CONFIGURATION
// =========================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    console.error(
        "VITE_API_BASE_URL is not configured."
    );
}


// =========================================================
// ADMIN API ENDPOINTS
// =========================================================

const USERS_API =
    `${API_BASE_URL}/admin/users`;

const FOUNDATIONS_API =
    `${API_BASE_URL}/admin/foundations`;

const DONATIONS_API =
    `${API_BASE_URL}/admin/donations`;


// =========================================================
// THEME
// =========================================================

const COLORS = {
    primary: "#1557D6",
    primaryDark: "#0F46B5",
    primarySoft: "#F2F6FF",

    navy: "#17233D",
    text: "#53627A",
    muted: "#8A96A8",

    border: "#E6EAF0",
    background: "#F8FAFD",
    white: "#FFFFFF",
};


// =========================================================
// DONATION STATUS CONFIG
// =========================================================

const STATUS_CONFIG = {

    AVAILABLE: {
        label: "Available",
        dot: "bg-blue-500",
        bar: "bg-blue-500",
        badge:
            "border-blue-200 bg-blue-50 text-blue-700",
    },

    ACCEPTED: {
        label: "Accepted",
        dot: "bg-indigo-500",
        bar: "bg-indigo-500",
        badge:
            "border-indigo-200 bg-indigo-50 text-indigo-700",
    },

    PICKED_UP: {
        label: "Picked Up",
        dot: "bg-amber-500",
        bar: "bg-amber-500",
        badge:
            "border-amber-200 bg-amber-50 text-amber-700",
    },

    DELIVERED: {
        label: "Delivered",
        dot: "bg-violet-500",
        bar: "bg-violet-500",
        badge:
            "border-violet-200 bg-violet-50 text-violet-700",
    },

    EXPIRED: {
        label: "Expired",
        dot: "bg-red-500",
        bar: "bg-red-500",
        badge:
            "border-red-200 bg-red-50 text-red-700",
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
        .replace(
            /\b\w/g,
            (char) => char.toUpperCase()
        );
};


// =========================================================
// STATUS CLASSES
// =========================================================

const getStatusClasses = (status) => {

    return (
        STATUS_CONFIG[status]?.badge ||
        "border-gray-200 bg-gray-50 text-gray-600"
    );
};


// =========================================================
// DATE FORMATTER
// =========================================================

const formatDate = (date) => {

    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
};


// =========================================================
// SMALL ICON
// =========================================================

function Icon({
    type,
    size = 20,
}) {

    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };

    switch (type) {

        case "users":
            return (
                <svg {...common}>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            );

        case "building":
            return (
                <svg {...common}>
                    <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                    />
                    <path d="M8 7h2" />
                    <path d="M14 7h2" />
                    <path d="M8 11h2" />
                    <path d="M14 11h2" />
                    <path d="M8 15h2" />
                    <path d="M14 15h2" />
                    <path d="M10 21v-3h4v3" />
                </svg>
            );

        case "box":
            return (
                <svg {...common}>
                    <path d="m21 8-9-5-9 5 9 5 9-5Z" />
                    <path d="M3 8v8l9 5 9-5V8" />
                    <path d="M12 13v8" />
                </svg>
            );

        case "scale":
            return (
                <svg {...common}>
                    <path d="M12 3v18" />
                    <path d="M5 7h14" />
                    <path d="M5 7 2 14h6L5 7Z" />
                    <path d="m19 7-3 7h6l-3-7Z" />
                    <path d="M8 21h8" />
                </svg>
            );

        case "refresh":
            return (
                <svg {...common}>
                    <path d="M20 11a8.1 8.1 0 0 0-14.8-3L3 11" />
                    <path d="M3 5v6h6" />
                    <path d="M4 13a8.1 8.1 0 0 0 14.8 3L21 13" />
                    <path d="M21 19v-6h-6" />
                </svg>
            );

        case "arrow":
            return (
                <svg {...common}>
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                </svg>
            );

        case "check":
            return (
                <svg {...common}>
                    <path d="m5 12 4 4L19 6" />
                </svg>
            );

        case "clock":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                </svg>
            );

        case "truck":
            return (
                <svg {...common}>
                    <path d="M3 7h11v10H3z" />
                    <path d="M14 10h4l3 3v4h-7z" />
                    <circle cx="7" cy="19" r="2" />
                    <circle cx="18" cy="19" r="2" />
                </svg>
            );

        case "alert":
            return (
                <svg {...common}>
                    <path d="M10.3 3.7 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                </svg>
            );

        default:
            return null;
    }
}


// =========================================================
// ADMIN DASHBOARD
// =========================================================

function AdminDashboard() {

    // =======================================================
    // STATE
    // =======================================================

    const [users, setUsers] = useState([]);

    const [
        pendingFoundations,
        setPendingFoundations,
    ] = useState([]);

    const [
        donations,
        setDonations,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    const [
        lastRefreshed,
        setLastRefreshed,
    ] = useState(null);


    // =======================================================
    // GET TOKEN
    // =======================================================

    const getToken = () => {

        return localStorage.getItem(
            "token"
        );

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
                    Authorization:
                        `Bearer ${token}`,

                    Accept:
                        "application/json",

                    "Content-Type":
                        "application/json",
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
                    message =
                        errorData.message;
                }

            } catch {

                // Ignore invalid error response

            }


            throw new Error(
                message
            );

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
    // LOAD DASHBOARD
    // =======================================================

    const loadDashboard = async () => {

        try {

            setLoading(true);

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
                    `${FOUNDATIONS_API}/pending`
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


            setUsers(
                usersList
            );


            // =================================================
            // FOUNDATIONS
            // =================================================

            const foundationList =
                Array.isArray(
                    pendingFoundationsData
                )
                    ? pendingFoundationsData
                    : pendingFoundationsData?.content || [];


            setPendingFoundations(
                foundationList
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


            // =================================================
            // REFRESH TIME
            // =================================================

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

    const userStats =
        useMemo(() => {

            return {

                total:
                    users.length,

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

    const donationStats =
        useMemo(() => {

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
    // TOTAL FOOD
    // =======================================================

    const totalFoodQuantity =
        useMemo(() => {

            return donations.reduce(
                (
                    total,
                    donation
                ) => {

                    const quantity =
                        Number(
                            donation.quantity
                        ) || 0;


                    return (
                        total +
                        quantity
                    );

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

                .slice(
                    0,
                    5
                );

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

            <div
                className="
                    min-h-screen
                    bg-[#F8FAFD]
                    p-4
                    sm:p-6
                    lg:p-8
                "
            >

                <div
                    className="
                        flex
                        min-h-[500px]
                        items-center
                        justify-center
                    "
                >

                    <div
                        className="
                            text-center
                        "
                    >

                        <div
                            className="
                                mx-auto
                                mb-4
                                h-9
                                w-9
                                animate-spin
                                rounded-full
                                border-4
                                border-[#DCE5F4]
                                border-t-[#1557D6]
                            "
                        />


                        <p
                            className="
                                text-sm
                                font-medium
                                text-[#66748A]
                            "
                        >
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

        <div
            className="
                min-h-screen
                bg-[#F8FAFD]
                p-4
                sm:p-6
                lg:p-8
            "
        >

            <div
                className="
                    mx-auto
                    max-w-[1500px]
                "
            >


                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                    className="
                        mb-7
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>

                        <div
                            className="
                                mb-2
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-[#1557D6]
                                "
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#1557D6]
                                "
                            >
                                Administration
                            </span>

                        </div>


                        <h1
                            className="
                                text-2xl
                                font-extrabold
                                tracking-tight
                                text-[#17233D]
                                sm:text-3xl
                            "
                        >
                            Admin Dashboard
                        </h1>


                        <p
                            className="
                                mt-1
                                text-sm
                                text-[#7B879A]
                            "
                        >
                            FoodBridge platform overview and
                            operational insights.
                        </p>

                    </div>


                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        {lastRefreshed && (

                            <span
                                className="
                                    hidden
                                    text-xs
                                    text-[#8A96A8]
                                    sm:block
                                "
                            >
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
                                font-semibold
                                text-[#53627A]
                                shadow-[0_2px_8px_rgba(23,35,61,0.04)]
                                transition
                                hover:border-[#1557D6]
                                hover:bg-[#F5F8FF]
                                hover:text-[#1557D6]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            <Icon
                                type="refresh"
                                size={16}
                            />

                            Refresh

                        </button>

                    </div>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div
                        className="
                            mb-6
                            flex
                            items-start
                            justify-between
                            gap-4
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                            p-4
                        "
                    >

                        <div
                            className="
                                flex
                                items-start
                                gap-3
                            "
                        >

                            <div
                                className="
                                    mt-0.5
                                    text-red-600
                                "
                            >
                                <Icon
                                    type="alert"
                                    size={18}
                                />
                            </div>


                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-red-800
                                    "
                                >
                                    Dashboard Error
                                </p>


                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-red-700
                                    "
                                >
                                    {error}
                                </p>

                            </div>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                setError("")
                            }
                            className="
                                text-lg
                                font-bold
                                text-red-400
                                transition
                                hover:text-red-700
                            "
                        >
                            ×
                        </button>

                    </div>

                )}


                {/* =================================================
                    MAIN STAT CARDS
                ================================================= */}

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                        xl:grid-cols-4
                    "
                >

                    <StatCard
                        title="Total Users"
                        value={userStats.total}
                        subtitle={`${userStats.active} active accounts`}
                        icon="users"
                        iconClass="
                            bg-[#F2F6FF]
                            text-[#1557D6]
                        "
                    />


                    <StatCard
                        title="Foundation Users"
                        value={userStats.foundations}
                        subtitle={`${foundationStats.pending} pending profiles`}
                        icon="building"
                        iconClass="
                            bg-[#F5F3FF]
                            text-[#7055D6]
                        "
                    />


                    <StatCard
                        title="Total Donations"
                        value={donations.length}
                        subtitle={`${donationStats.DELIVERED} delivered`}
                        icon="box"
                        iconClass="
                            bg-[#EEF8F5]
                            text-[#159570]
                        "
                    />


                    <StatCard
                        title="Food Quantity"
                        value={`${totalFoodQuantity.toFixed(2)} KG`}
                        subtitle="Across loaded donations"
                        icon="scale"
                        iconClass="
                            bg-[#FFF8EC]
                            text-[#D88A00]
                        "
                    />

                </div>


                {/* =================================================
                    SECONDARY STATISTICS
                ================================================= */}

                <div
                    className="
                        mt-4
                        grid
                        grid-cols-2
                        gap-4
                        lg:grid-cols-4
                    "
                >

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
                    DONATION STATUS + RECENT DONATIONS
                ================================================= */}

                <div
                    className="
                        mt-6
                        grid
                        grid-cols-1
                        gap-6
                        xl:grid-cols-3
                    "
                >


                    {/* =================================================
                        DONATION STATUS
                    ================================================= */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[#E6EAF0]
                            bg-white
                            p-5
                            shadow-[0_3px_14px_rgba(23,35,61,0.035)]
                        "
                    >

                        <div
                            className="
                                mb-6
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <h2
                                    className="
                                        text-base
                                        font-bold
                                        text-[#17233D]
                                    "
                                >
                                    Donation Status
                                </h2>


                                <div
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-[#F2F6FF]
                                        text-[#1557D6]
                                    "
                                >
                                    <Icon
                                        type="box"
                                        size={16}
                                    />
                                </div>

                            </div>


                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-[#8A96A8]
                                "
                            >
                                Current donation lifecycle.
                            </p>

                        </div>


                        <div
                            className="
                                space-y-5
                            "
                        >

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
                                                (
                                                    count /
                                                    donations.length
                                                ) * 100
                                            )
                                            : 0;


                                    return (

                                        <div
                                            key={status}
                                        >

                                            <div
                                                className="
                                                    mb-2
                                                    flex
                                                    items-center
                                                    justify-between
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2.5
                                                    "
                                                >

                                                    <span
                                                        className={`
                                                            h-2
                                                            w-2
                                                            rounded-full
                                                            ${config.dot}
                                                        `}
                                                    />


                                                    <span
                                                        className="
                                                            text-sm
                                                            font-medium
                                                            text-[#53627A]
                                                        "
                                                    >
                                                        {config.label}
                                                    </span>

                                                </div>


                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            text-sm
                                                            font-bold
                                                            text-[#17233D]
                                                        "
                                                    >
                                                        {count}
                                                    </span>


                                                    <span
                                                        className="
                                                            text-[11px]
                                                            font-medium
                                                            text-[#A0A9B8]
                                                        "
                                                    >
                                                        {percentage}%
                                                    </span>

                                                </div>

                                            </div>


                                            <div
                                                className="
                                                    h-2
                                                    overflow-hidden
                                                    rounded-full
                                                    bg-[#F0F3F7]
                                                "
                                            >

                                                <div
                                                    className={`
                                                        h-full
                                                        rounded-full
                                                        transition-all
                                                        duration-500
                                                        ${config.bar}
                                                    `}
                                                    style={{
                                                        width:
                                                            `${percentage}%`,
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

                    <div
                        className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[#E6EAF0]
                            bg-white
                            shadow-[0_3px_14px_rgba(23,35,61,0.035)]
                            xl:col-span-2
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-[#EDF0F4]
                                px-5
                                py-4
                            "
                        >

                            <div>

                                <h2
                                    className="
                                        text-base
                                        font-bold
                                        text-[#17233D]
                                    "
                                >
                                    Recent Donations
                                </h2>


                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-[#8A96A8]
                                    "
                                >
                                    Latest donation activity.
                                </p>

                            </div>


                            <a
                                href="/admin/donations"
                                className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    text-xs
                                    font-bold
                                    text-[#1557D6]
                                    transition
                                    hover:text-[#0F46B5]
                                "
                            >
                                View all

                                <Icon
                                    type="arrow"
                                    size={13}
                                />

                            </a>

                        </div>


                        {recentDonations.length === 0 ? (

                            <div
                                className="
                                    flex
                                    min-h-[280px]
                                    items-center
                                    justify-center
                                    p-6
                                "
                            >

                                <div
                                    className="
                                        text-center
                                    "
                                >

                                    <div
                                        className="
                                            mx-auto
                                            mb-3
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-[#F2F6FF]
                                            text-[#1557D6]
                                        "
                                    >
                                        <Icon
                                            type="box"
                                            size={18}
                                        />
                                    </div>


                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-[#53627A]
                                        "
                                    >
                                        No donations available
                                    </p>

                                </div>

                            </div>

                        ) : (

                            <div
                                className="
                                    divide-y
                                    divide-[#F0F2F5]
                                "
                            >

                                {recentDonations.map(
                                    (donation) => (

                                        <div
                                            key={
                                                donation.id
                                            }
                                            className="
                                                flex
                                                flex-col
                                                gap-3
                                                px-5
                                                py-4
                                                transition
                                                hover:bg-[#FAFBFE]
                                                sm:flex-row
                                                sm:items-center
                                                sm:justify-between
                                            "
                                        >

                                            <div
                                                className="
                                                    min-w-0
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        min-w-0
                                                        items-center
                                                        gap-2
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            h-8
                                                            w-8
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            bg-[#F2F6FF]
                                                            text-[#1557D6]
                                                        "
                                                    >
                                                        <Icon
                                                            type="box"
                                                            size={15}
                                                        />
                                                    </div>


                                                    <div
                                                        className="
                                                            min-w-0
                                                        "
                                                    >

                                                        <h3
                                                            className="
                                                                truncate
                                                                text-sm
                                                                font-bold
                                                                text-[#17233D]
                                                            "
                                                        >
                                                            {
                                                                donation.foodName
                                                            }
                                                        </h3>


                                                        <span
                                                            className="
                                                                text-[10px]
                                                                text-[#A0A9B8]
                                                            "
                                                        >
                                                            #
                                                            {
                                                                donation.id
                                                            }
                                                        </span>

                                                    </div>

                                                </div>


                                                <div
                                                    className="
                                                        mt-2
                                                        flex
                                                        flex-wrap
                                                        gap-x-2
                                                        gap-y-1
                                                        pl-10
                                                        text-[11px]
                                                        text-[#7B879A]
                                                    "
                                                >

                                                    <span>
                                                        {
                                                            donation.donorName
                                                        }
                                                    </span>


                                                    <span>
                                                        •
                                                    </span>


                                                    <span>
                                                        {
                                                            donation.quantity
                                                        }{" "}
                                                        {
                                                            donation.quantityUnit
                                                        }
                                                    </span>


                                                    <span>
                                                        •
                                                    </span>


                                                    <span>
                                                        {
                                                            formatDate(
                                                                donation.createdAt
                                                            )
                                                        }
                                                    </span>

                                                </div>


                                                <p
                                                    className="
                                                        mt-1
                                                        truncate
                                                        pl-10
                                                        text-[11px]
                                                        text-[#A0A9B8]
                                                    "
                                                >
                                                    {
                                                        donation.foundationName ||
                                                        "No foundation assigned"
                                                    }
                                                </p>

                                            </div>


                                            <span
                                                className={`
                                                    w-fit
                                                    shrink-0
                                                    rounded-full
                                                    border
                                                    px-2.5
                                                    py-1
                                                    text-[10px]
                                                    font-bold
                                                    ${getStatusClasses(
                                                        donation.status
                                                    )}
                                                `}
                                            >
                                                {
                                                    formatStatus(
                                                        donation.status
                                                    )
                                                }
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

                <div
                    className="
                        mt-6
                        rounded-2xl
                        border
                        border-[#E6EAF0]
                        bg-white
                        p-5
                        shadow-[0_3px_14px_rgba(23,35,61,0.035)]
                    "
                >

                    <div
                        className="
                            mb-5
                            flex
                            flex-col
                            gap-3
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-[#F2F6FF]
                                        text-[#1557D6]
                                    "
                                >
                                    <Icon
                                        type="building"
                                        size={15}
                                    />
                                </div>


                                <h2
                                    className="
                                        text-base
                                        font-bold
                                        text-[#17233D]
                                    "
                                >
                                    Foundation Verification
                                </h2>

                            </div>


                            <p
                                className="
                                    mt-2
                                    text-xs
                                    text-[#8A96A8]
                                "
                            >
                                Foundations currently awaiting
                                admin verification.
                            </p>

                        </div>


                        <a
                            href="/admin/foundations"
                            className="
                                inline-flex
                                items-center
                                gap-1
                                text-xs
                                font-bold
                                text-[#1557D6]
                                hover:text-[#0F46B5]
                            "
                        >
                            Manage foundations

                            <Icon
                                type="arrow"
                                size={13}
                            />

                        </a>

                    </div>


                    {pendingFoundations.length === 0 ? (

                        <div
                            className="
                                rounded-2xl
                                border
                                border-dashed
                                border-[#D9E1ED]
                                bg-[#FAFBFD]
                                p-9
                                text-center
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    mb-3
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#EEF8F5]
                                    text-[#159570]
                                "
                            >
                                <Icon
                                    type="check"
                                    size={20}
                                />
                            </div>


                            <p
                                className="
                                    text-sm
                                    font-bold
                                    text-[#17233D]
                                "
                            >
                                No pending foundations
                            </p>


                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-[#8A96A8]
                                "
                            >
                                All currently loaded foundation
                                profiles have been processed.
                            </p>

                        </div>

                    ) : (

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-4
                                md:grid-cols-2
                                xl:grid-cols-3
                            "
                        >

                            {pendingFoundations
                                .slice(0, 6)
                                .map(
                                    (foundation) => (

                                        <div
                                            key={
                                                foundation.id
                                            }
                                            className="
                                                rounded-2xl
                                                border
                                                border-[#E6EAF0]
                                                bg-[#FCFDFE]
                                                p-4
                                                transition
                                                hover:border-[#C9D7EE]
                                                hover:shadow-[0_4px_16px_rgba(23,35,61,0.05)]
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    justify-between
                                                    gap-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        min-w-0
                                                    "
                                                >

                                                    <h3
                                                        className="
                                                            truncate
                                                            text-sm
                                                            font-bold
                                                            text-[#17233D]
                                                        "
                                                    >
                                                        {
                                                            foundation.organizationName
                                                        }
                                                    </h3>


                                                    <p
                                                        className="
                                                            mt-1
                                                            text-[11px]
                                                            text-[#8A96A8]
                                                        "
                                                    >
                                                        ID #
                                                        {
                                                            foundation.id
                                                        }
                                                    </p>

                                                </div>


                                                <span
                                                    className="
                                                        shrink-0
                                                        rounded-full
                                                        border
                                                        border-amber-200
                                                        bg-amber-50
                                                        px-2.5
                                                        py-1
                                                        text-[10px]
                                                        font-bold
                                                        text-amber-700
                                                    "
                                                >
                                                    Pending
                                                </span>

                                            </div>


                                            <div
                                                className="
                                                    mt-4
                                                    space-y-2.5
                                                "
                                            >

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
                                                href={
                                                    `/admin/foundations/${foundation.id}`
                                                }
                                                className="
                                                    mt-4
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    rounded-xl
                                                    bg-[#1557D6]
                                                    px-4
                                                    py-2.5
                                                    text-xs
                                                    font-bold
                                                    text-white
                                                    transition
                                                    hover:bg-[#0F46B5]
                                                    active:scale-[0.99]
                                                "
                                            >
                                                Review Foundation

                                                <Icon
                                                    type="arrow"
                                                    size={13}
                                                />

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

                <div
                    className="
                        mt-6
                        rounded-2xl
                        border
                        border-[#E6EAF0]
                        bg-white
                        p-5
                        shadow-[0_3px_14px_rgba(23,35,61,0.035)]
                    "
                >

                    <div
                        className="
                            mb-5
                        "
                    >

                        <h2
                            className="
                                text-base
                                font-bold
                                text-[#17233D]
                            "
                        >
                            User Overview
                        </h2>


                        <p
                            className="
                                mt-1
                                text-xs
                                text-[#8A96A8]
                            "
                        >
                            Current platform user distribution.
                        </p>

                    </div>


                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-2
                            lg:grid-cols-4
                        "
                    >

                        <OverviewBox
                            title="Donors"
                            value={
                                userStats.donors
                            }
                            description="Registered donor accounts"
                        />


                        <OverviewBox
                            title="Foundations"
                            value={
                                userStats.foundations
                            }
                            description="Registered foundation accounts"
                        />


                        <OverviewBox
                            title="Admins"
                            value={
                                userStats.admins
                            }
                            description="Administrator accounts"
                        />


                        <OverviewBox
                            title="Active"
                            value={
                                userStats.active
                            }
                            description="Active user accounts"
                        />

                    </div>

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div
                    className="
                        mt-6
                        rounded-2xl
                        border
                        border-[#E6EAF0]
                        bg-white
                        px-5
                        py-4
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-2
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-bold
                                    text-[#17233D]
                                "
                            >
                                FoodBridge Administration
                            </p>


                            <p
                                className="
                                    mt-1
                                    text-[11px]
                                    text-[#8A96A8]
                                "
                            >
                                Monitor food redistribution activity
                                across the platform.
                            </p>

                        </div>


                        {lastRefreshed && (

                            <p
                                className="
                                    text-[11px]
                                    text-[#A0A9B8]
                                "
                            >
                                Last refreshed:{" "}
                                {lastRefreshed.toLocaleString(
                                    "en-IN"
                                )}
                            </p>

                        )}

                    </div>

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
    iconClass,
}) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-[#E6EAF0]
                bg-white
                p-5
                shadow-[0_3px_14px_rgba(23,35,61,0.035)]
                transition
                duration-200
                hover:-translate-y-[1px]
                hover:shadow-[0_6px_20px_rgba(23,35,61,0.06)]
            "
        >

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-4
                "
            >

                <div
                    className="
                        min-w-0
                    "
                >

                    <p
                        className="
                            text-xs
                            font-semibold
                            text-[#7B879A]
                        "
                    >
                        {title}
                    </p>


                    <p
                        className="
                            mt-2
                            truncate
                            text-2xl
                            font-extrabold
                            tracking-tight
                            text-[#17233D]
                        "
                    >
                        {value}
                    </p>


                    <p
                        className="
                            mt-1
                            truncate
                            text-[11px]
                            text-[#9AA4B3]
                        "
                    >
                        {subtitle}
                    </p>

                </div>


                <div
                    className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${iconClass}
                    `}
                >

                    <Icon
                        type={icon}
                        size={20}
                    />

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

        <div
            className="
                rounded-2xl
                border
                border-[#E6EAF0]
                bg-white
                px-4
                py-4
                shadow-[0_2px_10px_rgba(23,35,61,0.025)]
            "
        >

            <p
                className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-[#9AA4B3]
                "
            >
                {title}
            </p>


            <p
                className="
                    mt-1.5
                    text-xl
                    font-extrabold
                    text-[#17233D]
                "
            >
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

        <div
            className="
                rounded-2xl
                border
                border-[#E6EAF0]
                bg-[#FAFBFD]
                p-5
                transition
                hover:border-[#D4DDEB]
            "
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <p
                    className="
                        text-sm
                        font-bold
                        text-[#53627A]
                    "
                >
                    {title}
                </p>


                <span
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-[#1557D6]
                    "
                />

            </div>


            <p
                className="
                    mt-2
                    text-3xl
                    font-extrabold
                    tracking-tight
                    text-[#17233D]
                "
            >
                {value}
            </p>


            <p
                className="
                    mt-1
                    text-[11px]
                    text-[#9AA4B3]
                "
            >
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

        <div
            className="
                flex
                items-center
                justify-between
                gap-3
                text-xs
            "
        >

            <span
                className="
                    text-[#9AA4B3]
                "
            >
                {label}
            </span>


            <span
                className="
                    max-w-[60%]
                    truncate
                    text-right
                    font-semibold
                    text-[#53627A]
                "
            >
                {value || "-"}
            </span>

        </div>

    );

}


export default AdminDashboard;