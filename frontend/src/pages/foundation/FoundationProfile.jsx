// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//     Building2,
//     MapPin,
//     Pencil,
//     Save,
//     X,
//     Loader2,
//     Navigation,
//     CheckCircle2,
//     AlertCircle,
//     Clock3,
//     XCircle,
//     Phone,
//     Hash
// } from "lucide-react";

// import axiosInstance from "../../api/axiosInstance";


// function FoundationProfile() {

//     const navigate = useNavigate();


//     // =========================================================
//     // STATE
//     // =========================================================

//     const [profile, setProfile] = useState(null);

//     const [loading, setLoading] = useState(true);

//     const [saving, setSaving] = useState(false);

//     const [editing, setEditing] = useState(false);

//     const [locationLoading, setLocationLoading] = useState(false);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");


//     // =========================================================
//     // FORM
//     // =========================================================

//     const [form, setForm] = useState({

//         organizationName: "",

//         registrationNumber: "",

//         phone: "",

//         address: "",

//         city: "",

//         state: "",

//         pincode: "",

//         latitude: "",

//         longitude: ""

//     });


//     // =========================================================
//     // LOAD FOUNDATION PROFILE
//     //
//     // GET /api/foundations/me
//     //
//     // 200 -> Existing profile
//     //
//     // 404 -> Foundation user has not created
//     //        foundation profile yet.
//     // =========================================================

//     useEffect(() => {

//         loadProfile();

//     }, []);


//     const loadProfile = async () => {

//         try {

//             setLoading(true);

//             setError("");

//             setSuccess("");


//             const response =
//                 await axiosInstance.get(
//                     "/foundations/me"
//                 );


//             const apiResponse =
//                 response.data;


//             if (!apiResponse.success) {

//                 throw new Error(
//                     apiResponse.message ||
//                     "Failed to load foundation profile"
//                 );

//             }


//             const data =
//                 apiResponse.data;


//             // -------------------------------------------------
//             // Existing foundation profile
//             // -------------------------------------------------

//             setProfile(data);

//             setEditing(false);


//             setForm({

//                 organizationName:
//                     data.organizationName || "",

//                 registrationNumber:
//                     data.registrationNumber || "",

//                 phone:
//                     data.phone || "",

//                 address:
//                     data.address || "",

//                 city:
//                     data.city || "",

//                 state:
//                     data.state || "",

//                 pincode:
//                     data.pincode || "",

//                 latitude:
//                     data.latitude ?? "",

//                 longitude:
//                     data.longitude ?? ""

//             });


//         } catch (err) {

//             console.error(
//                 "Load foundation profile error:",
//                 err
//             );


//             // =================================================
//             // NEW FOUNDATION USER
//             //
//             // 404 means:
//             //
//             // User exists
//             // BUT foundation profile doesn't exist yet.
//             //
//             // This is normal.
//             // =================================================

//             if (err.response?.status === 404) {

//                 setProfile(null);

//                 setEditing(true);

//                 setError("");

//                 setSuccess("");


//                 setForm({

//                     organizationName: "",

//                     registrationNumber: "",

//                     phone: "",

//                     address: "",

//                     city: "",

//                     state: "",

//                     pincode: "",

//                     latitude: "",

//                     longitude: ""

//                 });


//                 return;

//             }


//             const message =
//                 err.response?.data?.message ||
//                 err.message ||
//                 "Unable to load foundation profile";


//             setError(message);

//         } finally {

//             setLoading(false);

//         }

//     };


//     // =========================================================
//     // INPUT CHANGE
//     // =========================================================

//     const handleChange = (event) => {

//         const {
//             name,
//             value
//         } = event.target;


//         setForm((previous) => ({

//             ...previous,

//             [name]: value

//         }));


//         setError("");

//         setSuccess("");

//     };


//     // =========================================================
//     // PHONE CHANGE
//     // =========================================================

//     const handlePhoneChange = (event) => {

//         const value =
//             event.target.value
//                 .replace(/\D/g, "")
//                 .slice(0, 10);


//         setForm((previous) => ({

//             ...previous,

//             phone: value

//         }));


//         setError("");

//         setSuccess("");

//     };


//     // =========================================================
//     // PINCODE CHANGE
//     // =========================================================

//     const handlePincodeChange = (event) => {

//         const value =
//             event.target.value
//                 .replace(/\D/g, "")
//                 .slice(0, 6);


//         setForm((previous) => ({

//             ...previous,

//             pincode: value

//         }));


//         setError("");

//         setSuccess("");

//     };


//     // =========================================================
//     // REGISTRATION NUMBER CHANGE
//     // =========================================================

//     const handleRegistrationNumberChange = (event) => {

//         const value =
//             event.target.value
//                 .slice(0, 100);


//         setForm((previous) => ({

//             ...previous,

//             registrationNumber: value

//         }));


//         setError("");

//         setSuccess("");

//     };


//     // =========================================================
//     // GET CURRENT LOCATION
//     // =========================================================

//     const detectLocation = () => {

//         if (!navigator.geolocation) {

//             setError(
//                 "Location detection is not supported by your browser."
//             );

//             return;

//         }


//         setLocationLoading(true);

//         setError("");

//         setSuccess("");


//         navigator.geolocation.getCurrentPosition(

//             (position) => {

//                 const latitude =
//                     position.coords.latitude;

//                 const longitude =
//                     position.coords.longitude;


//                 setForm((previous) => ({

//                     ...previous,

//                     latitude:
//                         latitude.toFixed(6),

//                     longitude:
//                         longitude.toFixed(6)

//                 }));


//                 setLocationLoading(false);


//                 setSuccess(
//                     "Current location detected successfully."
//                 );

//             },


//             (locationError) => {

//                 console.error(
//                     "Location error:",
//                     locationError
//                 );


//                 let message =
//                     "Unable to detect your current location.";


//                 if (
//                     locationError.code ===
//                     locationError.PERMISSION_DENIED
//                 ) {

//                     message =
//                         "Location permission was denied. Please allow location access in your browser.";

//                 } else if (
//                     locationError.code ===
//                     locationError.POSITION_UNAVAILABLE
//                 ) {

//                     message =
//                         "Your current location is unavailable.";

//                 } else if (
//                     locationError.code ===
//                     locationError.TIMEOUT
//                 ) {

//                     message =
//                         "Location detection timed out. Please try again.";

//                 }


//                 setError(message);

//                 setLocationLoading(false);

//             },

//             {

//                 enableHighAccuracy: true,

//                 timeout: 15000,

//                 maximumAge: 0

//             }

//         );

//     };


//     // =========================================================
//     // VALIDATION
//     // =========================================================

//     const validateForm = () => {


//         // -----------------------------------------------------
//         // ORGANIZATION NAME
//         // -----------------------------------------------------

//         if (!form.organizationName.trim()) {

//             setError(
//                 "Organization name is required."
//             );

//             return false;

//         }


//         if (
//             form.organizationName.trim().length > 150
//         ) {

//             setError(
//                 "Organization name cannot exceed 150 characters."
//             );

//             return false;

//         }


//         // -----------------------------------------------------
//         // REGISTRATION NUMBER
//         // -----------------------------------------------------

//         if (!form.registrationNumber.trim()) {

//             setError(
//                 "Registration number is required."
//             );

//             return false;

//         }


//         if (
//             form.registrationNumber.trim().length > 100
//         ) {

//             setError(
//                 "Registration number cannot exceed 100 characters."
//             );

//             return false;

//         }


//         // -----------------------------------------------------
//         // PHONE
//         // -----------------------------------------------------

//         if (
//             !/^[6-9][0-9]{9}$/.test(
//                 form.phone.trim()
//             )
//         ) {

//             setError(
//                 "Phone number must contain exactly 10 digits and start with 6-9."
//             );

//             return false;

//         }


//         // -----------------------------------------------------
//         // ADDRESS
//         // -----------------------------------------------------

//         if (!form.address.trim()) {

//             setError(
//                 "Address is required."
//             );

//             return false;

//         }


//         if (
//             form.address.trim().length > 255
//         ) {

//             setError(
//                 "Address cannot exceed 255 characters."
//             );

//             return false;

//         }


//         // -----------------------------------------------------
//         // CITY
//         // -----------------------------------------------------

//         if (!form.city.trim()) {

//             setError(
//                 "City is required."
//             );

//             return false;

//         }


//         if (
//             form.city.trim().length > 100
//         ) {

//             setError(
//                 "City cannot exceed 100 characters."
//             );

//             return false;

//         }


//         // -----------------------------------------------------
//         // STATE
//         // -----------------------------------------------------

//         if (!form.state.trim()) {

//             setError(
//                 "State is required."
//             );

//             return false;

//         }


//         if (
//             form.state.trim().length > 100
//         ) {

//             setError(
//                 "State cannot exceed 100 characters."
//             );

//             return false;

//         }


//         // -----------------------------------------------------
//         // PINCODE
//         // -----------------------------------------------------

//         if (
//             !/^[0-9]{6}$/.test(
//                 form.pincode
//             )
//         ) {

//             setError(
//                 "Pincode must contain exactly 6 digits."
//             );

//             return false;

//         }


//         // -----------------------------------------------------
//         // LATITUDE / LONGITUDE
//         // -----------------------------------------------------

//         if (
//             form.latitude === "" ||
//             form.longitude === ""
//         ) {

//             setError(
//                 "Please detect your current location."
//             );

//             return false;

//         }


//         const latitude =
//             Number(form.latitude);

//         const longitude =
//             Number(form.longitude);


//         if (
//             Number.isNaN(latitude) ||
//             latitude < -90 ||
//             latitude > 90
//         ) {

//             setError(
//                 "Invalid latitude."
//             );

//             return false;

//         }


//         if (
//             Number.isNaN(longitude) ||
//             longitude < -180 ||
//             longitude > 180
//         ) {

//             setError(
//                 "Invalid longitude."
//             );

//             return false;

//         }


//         return true;

//     };


//     // =========================================================
//     // CREATE / UPDATE FOUNDATION
//     // =========================================================

//     const handleSubmit = async (event) => {

//         event.preventDefault();


//         if (!validateForm()) {

//             return;

//         }


//         try {

//             setSaving(true);

//             setError("");

//             setSuccess("");


//             // =================================================
//             // CREATE FOUNDATION
//             //
//             // POST /api/foundations
//             //
//             // Phone is NOT sent here because the backend
//             // CreateFoundationRequest doesn't contain phone.
//             //
//             // Phone already belongs to User.
//             // =================================================

//             if (!profile) {

//                 const createPayload = {

//                     organizationName:
//                         form.organizationName.trim(),

//                     registrationNumber:
//                         form.registrationNumber.trim(),

//                     address:
//                         form.address.trim(),

//                     city:
//                         form.city.trim(),

//                     state:
//                         form.state.trim(),

//                     pincode:
//                         form.pincode.trim(),

//                     latitude:
//                         Number(form.latitude),

//                     longitude:
//                         Number(form.longitude)

//                 };


//                 const response =
//                     await axiosInstance.post(
//                         "/foundations",
//                         createPayload
//                     );


//                 const apiResponse =
//                     response.data;


//                 if (!apiResponse.success) {

//                     throw new Error(
//                         apiResponse.message ||
//                         "Failed to create foundation profile"
//                     );

//                 }


//                 const createdFoundation =
//                     apiResponse.data;


//                 // =============================================
//                 // UPDATE LOCAL STATE
//                 // =============================================

//                 setProfile(
//                     createdFoundation
//                 );


//                 setForm({

//                     organizationName:
//                         createdFoundation.organizationName || "",

//                     registrationNumber:
//                         createdFoundation.registrationNumber || "",

//                     phone:
//                         createdFoundation.phone ||
//                         form.phone ||
//                         "",

//                     address:
//                         createdFoundation.address || "",

//                     city:
//                         createdFoundation.city || "",

//                     state:
//                         createdFoundation.state || "",

//                     pincode:
//                         createdFoundation.pincode || "",

//                     latitude:
//                         createdFoundation.latitude ?? "",

//                     longitude:
//                         createdFoundation.longitude ?? ""

//                 });


//                 setEditing(false);


//                 setSuccess(
//                     "Foundation profile submitted successfully. Your profile is now pending admin verification."
//                 );


//                 return;

//             }


//             // =================================================
//             // UPDATE EXISTING FOUNDATION
//             //
//             // PUT /api/foundations/me
//             // =================================================

//             const updatePayload = {

//                 organizationName:
//                     form.organizationName.trim(),

//                 registrationNumber:
//                     form.registrationNumber.trim(),

//                 phone:
//                     form.phone.trim(),

//                 address:
//                     form.address.trim(),

//                 city:
//                     form.city.trim(),

//                 state:
//                     form.state.trim(),

//                 pincode:
//                     form.pincode.trim(),

//                 latitude:
//                     Number(form.latitude),

//                 longitude:
//                     Number(form.longitude)

//             };


//             const response =
//                 await axiosInstance.put(
//                     "/foundations/me",
//                     updatePayload
//                 );


//             const apiResponse =
//                 response.data;


//             if (!apiResponse.success) {

//                 throw new Error(
//                     apiResponse.message ||
//                     "Failed to update foundation profile"
//                 );

//             }


//             const updatedFoundation =
//                 apiResponse.data;


//             setProfile(
//                 updatedFoundation
//             );


//             setForm({

//                 organizationName:
//                     updatedFoundation.organizationName || "",

//                 registrationNumber:
//                     updatedFoundation.registrationNumber || "",

//                 phone:
//                     updatedFoundation.phone ||
//                     form.phone ||
//                     "",

//                 address:
//                     updatedFoundation.address || "",

//                 city:
//                     updatedFoundation.city || "",

//                 state:
//                     updatedFoundation.state || "",

//                 pincode:
//                     updatedFoundation.pincode || "",

//                 latitude:
//                     updatedFoundation.latitude ?? "",

//                 longitude:
//                     updatedFoundation.longitude ?? ""

//             });


//             setEditing(false);


//             // -------------------------------------------------
//             // Backend re-verification rule
//             // -------------------------------------------------
//             //
//             // VERIFIED -> update -> PENDING
//             // REJECTED -> update -> PENDING
//             // -------------------------------------------------

//             if (
//                 updatedFoundation.verificationStatus ===
//                 "PENDING"
//             ) {

//                 setSuccess(
//                     "Foundation profile updated successfully. Your profile is pending admin verification."
//                 );

//             } else {

//                 setSuccess(
//                     "Foundation profile updated successfully."
//                 );

//             }


//         } catch (err) {

//             console.error(
//                 "Foundation profile save error:",
//                 err
//             );


//             // =================================================
//             // BACKEND VALIDATION ERRORS
//             // =================================================

//             const backendErrors =
//                 err.response?.data?.errors;


//             if (backendErrors) {

//                 const firstError =
//                     Object.values(
//                         backendErrors
//                     )[0];


//                 if (firstError) {

//                     setError(
//                         String(firstError)
//                     );

//                 } else {

//                     setError(
//                         err.response?.data?.message ||
//                         "Invalid foundation information."
//                     );

//                 }

//             } else {

//                 setError(
//                     err.response?.data?.message ||
//                     err.message ||
//                     "Failed to save foundation profile."
//                 );

//             }

//         } finally {

//             setSaving(false);

//         }

//     };


//     // =========================================================
//     // CANCEL EDIT
//     // =========================================================

//     const handleCancel = () => {

//         // -----------------------------------------------------
//         // New profile
//         // -----------------------------------------------------

//         if (!profile) {

//             navigate(
//                 "/foundation/dashboard"
//             );

//             return;

//         }


//         // -----------------------------------------------------
//         // Existing profile
//         // Restore original values.
//         // -----------------------------------------------------

//         setForm({

//             organizationName:
//                 profile.organizationName || "",

//             registrationNumber:
//                 profile.registrationNumber || "",

//             phone:
//                 profile.phone || "",

//             address:
//                 profile.address || "",

//             city:
//                 profile.city || "",

//             state:
//                 profile.state || "",

//             pincode:
//                 profile.pincode || "",

//             latitude:
//                 profile.latitude ?? "",

//             longitude:
//                 profile.longitude ?? ""

//         });


//         setEditing(false);

//         setError("");

//         setSuccess("");

//     };


//     // =========================================================
//     // VERIFICATION STATUS CONFIG
//     // =========================================================

//     const getVerificationConfig = () => {

//         const status =
//             profile?.verificationStatus;


//         if (status === "VERIFIED") {

//             return {

//                 label: "VERIFIED",

//                 icon: CheckCircle2,

//                 container:
//                     "border-emerald-400/20 bg-emerald-400/5",

//                 badge:
//                     "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",

//                 iconColor:
//                     "text-emerald-400",

//                 message:
//                     "Your foundation has been verified by the FoodBridge administration."

//             };

//         }


//         if (status === "REJECTED") {

//             return {

//                 label: "REJECTED",

//                 icon: XCircle,

//                 container:
//                     "border-red-400/20 bg-red-400/5",

//                 badge:
//                     "border-red-400/20 bg-red-400/10 text-red-400",

//                 iconColor:
//                     "text-red-400",

//                 message:
//                     profile?.rejectionReason
//                         ? profile.rejectionReason
//                         : "Your foundation verification was rejected. Please update your profile and submit it again."

//             };

//         }


//         return {

//             label: "PENDING",

//             icon: Clock3,

//             container:
//                 "border-yellow-400/20 bg-yellow-400/5",

//             badge:
//                 "border-yellow-400/20 bg-yellow-400/10 text-yellow-400",

//             iconColor:
//                 "text-yellow-400",

//             message:
//                 "Your foundation profile has been submitted and is waiting for admin verification."

//         };

//     };


//     // =========================================================
//     // LOADING
//     // =========================================================

//     if (loading) {

//         return (

//             <div className="min-h-screen bg-[#050505] text-white">

//                 <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6">

//                     <div className="text-center">

//                         <Loader2
//                             className="mx-auto h-8 w-8 animate-spin text-emerald-400"
//                         />

//                         <p className="mt-4 text-sm text-gray-500">
//                             Loading foundation profile...
//                         </p>

//                     </div>

//                 </div>

//             </div>

//         );

//     }


//     // =========================================================
//     // VERIFICATION CONFIG
//     // =========================================================

//     const verification =
//         getVerificationConfig();

//     const VerificationIcon =
//         verification.icon;


//     // =========================================================
//     // MAIN UI
//     // =========================================================

//     return (

//         <div className="min-h-screen bg-[#050505] text-white">

//             <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-10">


//                 {/* =================================================
//                     PAGE HEADER
//                 ================================================= */}

//                 <section className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

//                     <div className="flex items-start gap-4">

//                         <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/10 bg-emerald-400/10">

//                             <Building2
//                                 className="h-7 w-7 text-emerald-400"
//                             />

//                         </div>


//                         <div>

//                             <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
//                                 Foundation
//                             </p>


//                             <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">

//                                 {profile?.organizationName ||
//                                     "Create Foundation Profile"}

//                             </h1>


//                             <p className="mt-2 text-sm text-gray-500">

//                                 {profile
//                                     ? "Manage your organization profile"
//                                     : "Complete your foundation profile to submit it for verification"}

//                             </p>

//                         </div>

//                     </div>


//                     {/* =================================================
//                         EDIT BUTTON
//                     ================================================= */}

//                     {profile && !editing && (

//                         <button
//                             type="button"
//                             onClick={() => {

//                                 setEditing(true);

//                                 setError("");

//                                 setSuccess("");

//                             }}
//                             className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
//                         >

//                             <Pencil className="h-4 w-4" />

//                             Edit Profile

//                         </button>

//                     )}

//                 </section>


//                 {/* =================================================
//                     SUCCESS
//                 ================================================= */}

//                 {success && (

//                     <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-5 py-4">

//                         <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

//                         <p className="text-sm leading-6 text-emerald-300">

//                             {success}

//                         </p>

//                     </div>

//                 )}


//                 {/* =================================================
//                     ERROR
//                 ================================================= */}

//                 {error && (

//                     <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/5 px-5 py-4">

//                         <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

//                         <p className="text-sm leading-6 text-red-300">

//                             {error}

//                         </p>

//                     </div>

//                 )}


//                 {/* =================================================
//                     VERIFICATION
//                 ================================================= */}

//                 {profile && (

//                     <section
//                         className={
//                             `mb-6 rounded-3xl border p-6 sm:p-8 ${verification.container}`
//                         }
//                     >

//                         <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

//                             <div className="flex items-center gap-4">

//                                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05]">

//                                     <VerificationIcon
//                                         className={
//                                             `h-6 w-6 ${verification.iconColor}`
//                                         }
//                                     />

//                                 </div>


//                                 <div>

//                                     <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
//                                         Verification Status
//                                     </p>


//                                     <div className="mt-2">

//                                         <span
//                                             className={
//                                                 `inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${verification.badge}`
//                                             }
//                                         >

//                                             <span className="h-2 w-2 rounded-full bg-current" />

//                                             {verification.label}

//                                         </span>

//                                     </div>

//                                 </div>

//                             </div>


//                             <p className="max-w-md text-sm leading-6 text-gray-500">

//                                 {verification.message}

//                             </p>

//                         </div>


//                         {/* =================================================
//                             REJECTION REASON
//                         ================================================= */}

//                         {profile.verificationStatus ===
//                             "REJECTED" &&
//                             profile.rejectionReason && (

//                                 <div className="mt-6 rounded-2xl border border-red-400/10 bg-red-400/5 p-4">

//                                     <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
//                                         Rejection reason
//                                     </p>

//                                     <p className="mt-2 text-sm leading-6 text-gray-400">

//                                         {profile.rejectionReason}

//                                     </p>

//                                 </div>

//                             )}

//                     </section>

//                 )}


//                 {/* =================================================
//                     NEW PROFILE INFORMATION
//                 ================================================= */}

//                 {!profile && (

//                     <section className="mb-6 rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6 sm:p-8">

//                         <div className="flex items-start gap-4">

//                             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10">

//                                 <Clock3 className="h-5 w-5 text-yellow-400" />

//                             </div>


//                             <div>

//                                 <h2 className="font-semibold text-white">
//                                     Complete your foundation profile
//                                 </h2>


//                                 <p className="mt-2 text-sm leading-6 text-gray-500">

//                                     Your foundation account has been created,
//                                     but your foundation profile has not been
//                                     submitted yet. Complete all required
//                                     information below to submit your profile
//                                     for admin verification.

//                                 </p>

//                             </div>

//                         </div>

//                     </section>

//                 )}


//                 {/* =================================================
//                     FORM
//                 ================================================= */}

//                 <form
//                     onSubmit={handleSubmit}
//                     className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]"
//                 >


//                     {/* =================================================
//                         ORGANIZATION
//                     ================================================= */}

//                     <div className="border-b border-white/10 px-6 py-6 sm:px-8">

//                         <div className="flex items-center gap-4">

//                             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06]">

//                                 <Building2 className="h-5 w-5 text-gray-400" />

//                             </div>


//                             <div>

//                                 <h2 className="font-semibold text-white">
//                                     Organization information
//                                 </h2>

//                                 <p className="mt-1 text-sm text-gray-500">
//                                     Basic details about your foundation.
//                                 </p>

//                             </div>

//                         </div>

//                     </div>


//                     <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">


//                         {/* =================================================
//                             ORGANIZATION NAME
//                         ================================================= */}

//                         <div className="sm:col-span-2">

//                             <label
//                                 htmlFor="organizationName"
//                                 className="mb-2 block text-sm font-medium text-gray-300"
//                             >
//                                 Organization name
//                             </label>


//                             <input
//                                 id="organizationName"
//                                 name="organizationName"
//                                 type="text"
//                                 value={form.organizationName}
//                                 onChange={handleChange}
//                                 disabled={!editing}
//                                 maxLength={150}
//                                 placeholder="Enter foundation organization name"
//                                 className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
//                             />

//                         </div>


//                         {/* =================================================
//                             REGISTRATION NUMBER
//                         ================================================= */}

//                         <div>

//                             <label
//                                 htmlFor="registrationNumber"
//                                 className="mb-2 block text-sm font-medium text-gray-300"
//                             >
//                                 Registration number
//                             </label>


//                             <div className="relative">

//                                 <Hash
//                                     className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
//                                 />

//                                 <input
//                                     id="registrationNumber"
//                                     name="registrationNumber"
//                                     type="text"
//                                     value={form.registrationNumber}
//                                     onChange={handleRegistrationNumberChange}
//                                     disabled={!editing}
//                                     maxLength={100}
//                                     placeholder="Enter official registration number"
//                                     className="w-full rounded-xl border border-white/10 bg-black/30 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
//                                 />

//                             </div>


//                             <p className="mt-2 text-xs text-gray-600">

//                                 Official registration number of your foundation.

//                             </p>

//                         </div>


//                         {/* =================================================
//                             PHONE
//                         ================================================= */}

//                         <div>

//                             <label
//                                 htmlFor="phone"
//                                 className="mb-2 block text-sm font-medium text-gray-300"
//                             >
//                                 Contact phone number
//                             </label>


//                             <div className="relative">

//                                 <Phone
//                                     className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
//                                 />

//                                 <input
//                                     id="phone"
//                                     name="phone"
//                                     type="tel"
//                                     inputMode="numeric"
//                                     value={form.phone}
//                                     onChange={handlePhoneChange}
//                                     disabled={!editing}
//                                     maxLength={10}
//                                     placeholder="9876543210"
//                                     className="w-full rounded-xl border border-white/10 bg-black/30 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
//                                 />

//                             </div>


//                             <p className="mt-2 text-xs text-gray-600">

//                                 This number will be used as the foundation contact number.

//                             </p>

//                         </div>


//                         {/* =================================================
//                             ADDRESS
//                         ================================================= */}

//                         <div className="sm:col-span-2">

//                             <label
//                                 htmlFor="address"
//                                 className="mb-2 block text-sm font-medium text-gray-300"
//                             >
//                                 Address
//                             </label>


//                             <input
//                                 id="address"
//                                 name="address"
//                                 type="text"
//                                 value={form.address}
//                                 onChange={handleChange}
//                                 disabled={!editing}
//                                 maxLength={255}
//                                 placeholder="Foundation street address"
//                                 className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
//                             />

//                         </div>


//                         {/* =================================================
//                             CITY
//                         ================================================= */}

//                         <div>

//                             <label
//                                 htmlFor="city"
//                                 className="mb-2 block text-sm font-medium text-gray-300"
//                             >
//                                 City
//                             </label>


//                             <input
//                                 id="city"
//                                 name="city"
//                                 type="text"
//                                 value={form.city}
//                                 onChange={handleChange}
//                                 disabled={!editing}
//                                 maxLength={100}
//                                 placeholder="Chennai"
//                                 className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
//                             />

//                         </div>


//                         {/* =================================================
//                             STATE
//                         ================================================= */}

//                         <div>

//                             <label
//                                 htmlFor="state"
//                                 className="mb-2 block text-sm font-medium text-gray-300"
//                             >
//                                 State
//                             </label>


//                             <input
//                                 id="state"
//                                 name="state"
//                                 type="text"
//                                 value={form.state}
//                                 onChange={handleChange}
//                                 disabled={!editing}
//                                 maxLength={100}
//                                 placeholder="Tamil Nadu"
//                                 className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
//                             />

//                         </div>


//                         {/* =================================================
//                             PINCODE
//                         ================================================= */}

//                         <div>

//                             <label
//                                 htmlFor="pincode"
//                                 className="mb-2 block text-sm font-medium text-gray-300"
//                             >
//                                 Pincode
//                             </label>


//                             <input
//                                 id="pincode"
//                                 name="pincode"
//                                 type="text"
//                                 inputMode="numeric"
//                                 value={form.pincode}
//                                 onChange={handlePincodeChange}
//                                 disabled={!editing}
//                                 placeholder="600042"
//                                 maxLength={6}
//                                 className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
//                             />

//                         </div>


//                     </div>


//                     {/* =================================================
//                         LOCATION
//                     ================================================= */}

//                     <div className="border-t border-white/10 px-6 py-6 sm:px-8">

//                         <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

//                             <div className="flex items-start gap-4">

//                                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">

//                                     <MapPin className="h-5 w-5 text-emerald-400" />

//                                 </div>


//                                 <div>

//                                     <h2 className="font-semibold text-white">
//                                         Foundation location
//                                     </h2>


//                                     <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">

//                                         Your location is used to find food
//                                         donations within the configured
//                                         service radius.

//                                     </p>

//                                 </div>

//                             </div>


//                             {editing && (

//                                 <button
//                                     type="button"
//                                     onClick={detectLocation}
//                                     disabled={locationLoading}
//                                     className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
//                                 >

//                                     {locationLoading ? (

//                                         <Loader2 className="h-4 w-4 animate-spin" />

//                                     ) : (

//                                         <Navigation className="h-4 w-4" />

//                                     )}


//                                     {locationLoading
//                                         ? "Detecting..."
//                                         : "Use Current Location"}

//                                 </button>

//                             )}

//                         </div>


//                         {/* =================================================
//                             COORDINATES
//                         ================================================= */}

//                         <div className="mt-6 grid gap-5 sm:grid-cols-2">


//                             {/* =================================================
//                                 LATITUDE
//                             ================================================= */}

//                             <div>

//                                 <label
//                                     htmlFor="latitude"
//                                     className="mb-2 block text-sm font-medium text-gray-300"
//                                 >
//                                     Latitude
//                                 </label>


//                                 <input
//                                     id="latitude"
//                                     name="latitude"
//                                     type="number"
//                                     step="any"
//                                     value={form.latitude}
//                                     onChange={handleChange}
//                                     disabled={!editing}
//                                     placeholder="13.082680"
//                                     className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
//                                 />

//                             </div>


//                             {/* =================================================
//                                 LONGITUDE
//                             ================================================= */}

//                             <div>

//                                 <label
//                                     htmlFor="longitude"
//                                     className="mb-2 block text-sm font-medium text-gray-300"
//                                 >
//                                     Longitude
//                                 </label>


//                                 <input
//                                     id="longitude"
//                                     name="longitude"
//                                     type="number"
//                                     step="any"
//                                     value={form.longitude}
//                                     onChange={handleChange}
//                                     disabled={!editing}
//                                     placeholder="80.270718"
//                                     className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
//                                 />

//                             </div>

//                         </div>


//                         {/* =================================================
//                             LOCATION PRIVACY
//                         ================================================= */}

//                         <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">

//                             <p className="text-xs leading-5 text-gray-500">

//                                 <span className="font-semibold text-gray-400">
//                                     Privacy:
//                                 </span>{" "}

//                                 Your coordinates are used only for
//                                 location-based donation matching.

//                             </p>

//                         </div>

//                     </div>


//                     {/* =================================================
//                         ACTIONS
//                     ================================================= */}

//                     {editing && (

//                         <div className="flex flex-col-reverse gap-3 border-t border-white/10 p-6 sm:flex-row sm:justify-end sm:px-8">


//                             {/* =================================================
//                                 CANCEL
//                             ================================================= */}

//                             <button
//                                 type="button"
//                                 onClick={handleCancel}
//                                 disabled={saving}
//                                 className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-6 py-3.5 text-sm font-semibold text-gray-300 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
//                             >

//                                 <X className="h-4 w-4" />

//                                 {profile
//                                     ? "Cancel"
//                                     : "Back"}

//                             </button>


//                             {/* =================================================
//                                 SUBMIT
//                             ================================================= */}

//                             <button
//                                 type="submit"
//                                 disabled={saving}
//                                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-7 py-3.5 text-sm font-bold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
//                             >

//                                 {saving ? (

//                                     <Loader2 className="h-4 w-4 animate-spin" />

//                                 ) : (

//                                     <Save className="h-4 w-4" />

//                                 )}


//                                 {saving

//                                     ? "Submitting..."

//                                     : profile
//                                         ? "Save Changes"
//                                         : "Submit for Verification"}

//                             </button>

//                         </div>

//                     )}

//                 </form>


//                 {/* =================================================
//                     BACK
//                 ================================================= */}

//                 <button
//                     type="button"
//                     onClick={() =>
//                         navigate(
//                             "/foundation/dashboard"
//                         )
//                     }
//                     className="mt-6 text-sm text-gray-500 transition hover:text-white"
//                 >

//                     ← Back to Dashboard

//                 </button>


//             </main>

//         </div>

//     );

// }


// export default FoundationProfile;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Building2,
    MapPin,
    Pencil,
    Save,
    X,
    Loader2,
    Navigation,
    CheckCircle2,
    AlertCircle,
    Clock3,
    XCircle,
    Phone,
    Hash
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";


function FoundationProfile() {

    const navigate = useNavigate();


    // =========================================================
    // STATE
    // =========================================================

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [editing, setEditing] = useState(false);

    const [locationLoading, setLocationLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =========================================================
    // FORM
    // =========================================================

    const [form, setForm] = useState({

        organizationName: "",

        registrationNumber: "",

        phone: "",

        address: "",

        city: "",

        state: "",

        pincode: "",

        latitude: "",

        longitude: ""

    });


    // =========================================================
    // LOAD FOUNDATION PROFILE
    //
    // GET /api/foundations/me
    //
    // 200 -> Existing profile
    //
    // 404 -> Foundation user has not created
    //        foundation profile yet.
    // =========================================================

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            setLoading(true);

            setError("");

            setSuccess("");


            const response =
                await axiosInstance.get(
                    "/foundations/me"
                );


            const apiResponse =
                response.data;


            if (!apiResponse.success) {

                throw new Error(
                    apiResponse.message ||
                    "Failed to load foundation profile"
                );

            }


            const data =
                apiResponse.data;


            // -------------------------------------------------
            // Existing foundation profile
            // -------------------------------------------------

            setProfile(data);

            setEditing(false);


            setForm({

                organizationName:
                    data.organizationName || "",

                registrationNumber:
                    data.registrationNumber || "",

                phone:
                    data.phone || "",

                address:
                    data.address || "",

                city:
                    data.city || "",

                state:
                    data.state || "",

                pincode:
                    data.pincode || "",

                latitude:
                    data.latitude ?? "",

                longitude:
                    data.longitude ?? ""

            });


        } catch (err) {

            console.error(
                "Load foundation profile error:",
                err
            );


            // =================================================
            // NEW FOUNDATION USER
            //
            // 404 means:
            //
            // User exists
            // BUT foundation profile doesn't exist yet.
            //
            // This is normal.
            // =================================================

            if (err.response?.status === 404) {

                setProfile(null);

                setEditing(true);

                setError("");

                setSuccess("");


                setForm({

                    organizationName: "",

                    registrationNumber: "",

                    phone: "",

                    address: "",

                    city: "",

                    state: "",

                    pincode: "",

                    latitude: "",

                    longitude: ""

                });


                return;

            }


            const message =
                err.response?.data?.message ||
                err.message ||
                "Unable to load foundation profile";


            setError(message);

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // INPUT CHANGE
    // =========================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setForm((previous) => ({

            ...previous,

            [name]: value

        }));


        setError("");

        setSuccess("");

    };


    // =========================================================
    // PHONE CHANGE
    // =========================================================

    const handlePhoneChange = (event) => {

        const value =
            event.target.value
                .replace(/\D/g, "")
                .slice(0, 10);


        setForm((previous) => ({

            ...previous,

            phone: value

        }));


        setError("");

        setSuccess("");

    };


    // =========================================================
    // PINCODE CHANGE
    // =========================================================

    const handlePincodeChange = (event) => {

        const value =
            event.target.value
                .replace(/\D/g, "")
                .slice(0, 6);


        setForm((previous) => ({

            ...previous,

            pincode: value

        }));


        setError("");

        setSuccess("");

    };


    // =========================================================
    // REGISTRATION NUMBER CHANGE
    // =========================================================

    const handleRegistrationNumberChange = (event) => {

        const value =
            event.target.value
                .slice(0, 100);


        setForm((previous) => ({

            ...previous,

            registrationNumber: value

        }));


        setError("");

        setSuccess("");

    };


    // =========================================================
    // GET CURRENT LOCATION
    // =========================================================

    const detectLocation = () => {

        if (!navigator.geolocation) {

            setError(
                "Location detection is not supported by your browser."
            );

            return;

        }


        setLocationLoading(true);

        setError("");

        setSuccess("");


        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                setForm((previous) => ({

                    ...previous,

                    latitude:
                        latitude.toFixed(6),

                    longitude:
                        longitude.toFixed(6)

                }));


                setLocationLoading(false);


                setSuccess(
                    "Current location detected successfully."
                );

            },


            (locationError) => {

                console.error(
                    "Location error:",
                    locationError
                );


                let message =
                    "Unable to detect your current location.";


                if (
                    locationError.code ===
                    locationError.PERMISSION_DENIED
                ) {

                    message =
                        "Location permission was denied. Please allow location access in your browser.";

                } else if (
                    locationError.code ===
                    locationError.POSITION_UNAVAILABLE
                ) {

                    message =
                        "Your current location is unavailable.";

                } else if (
                    locationError.code ===
                    locationError.TIMEOUT
                ) {

                    message =
                        "Location detection timed out. Please try again.";

                }


                setError(message);

                setLocationLoading(false);

            },

            {

                enableHighAccuracy: true,

                timeout: 15000,

                maximumAge: 0

            }

        );

    };


    // =========================================================
    // VALIDATION
    // =========================================================

    const validateForm = () => {


        // -----------------------------------------------------
        // ORGANIZATION NAME
        // -----------------------------------------------------

        if (!form.organizationName.trim()) {

            setError(
                "Organization name is required."
            );

            return false;

        }


        if (
            form.organizationName.trim().length > 150
        ) {

            setError(
                "Organization name cannot exceed 150 characters."
            );

            return false;

        }


        // -----------------------------------------------------
        // REGISTRATION NUMBER
        // -----------------------------------------------------

        if (!form.registrationNumber.trim()) {

            setError(
                "Registration number is required."
            );

            return false;

        }


        if (
            form.registrationNumber.trim().length > 100
        ) {

            setError(
                "Registration number cannot exceed 100 characters."
            );

            return false;

        }


        // -----------------------------------------------------
        // PHONE
        // -----------------------------------------------------

        if (
            !/^[6-9][0-9]{9}$/.test(
                form.phone.trim()
            )
        ) {

            setError(
                "Phone number must contain exactly 10 digits and start with 6-9."
            );

            return false;

        }


        // -----------------------------------------------------
        // ADDRESS
        // -----------------------------------------------------

        if (!form.address.trim()) {

            setError(
                "Address is required."
            );

            return false;

        }


        if (
            form.address.trim().length > 255
        ) {

            setError(
                "Address cannot exceed 255 characters."
            );

            return false;

        }


        // -----------------------------------------------------
        // CITY
        // -----------------------------------------------------

        if (!form.city.trim()) {

            setError(
                "City is required."
            );

            return false;

        }


        if (
            form.city.trim().length > 100
        ) {

            setError(
                "City cannot exceed 100 characters."
            );

            return false;

        }


        // -----------------------------------------------------
        // STATE
        // -----------------------------------------------------

        if (!form.state.trim()) {

            setError(
                "State is required."
            );

            return false;

        }


        if (
            form.state.trim().length > 100
        ) {

            setError(
                "State cannot exceed 100 characters."
            );

            return false;

        }


        // -----------------------------------------------------
        // PINCODE
        // -----------------------------------------------------

        if (
            !/^[0-9]{6}$/.test(
                form.pincode
            )
        ) {

            setError(
                "Pincode must contain exactly 6 digits."
            );

            return false;

        }


        // -----------------------------------------------------
        // LATITUDE / LONGITUDE
        // -----------------------------------------------------

        if (
            form.latitude === "" ||
            form.longitude === ""
        ) {

            setError(
                "Please detect your current location."
            );

            return false;

        }


        const latitude =
            Number(form.latitude);

        const longitude =
            Number(form.longitude);


        if (
            Number.isNaN(latitude) ||
            latitude < -90 ||
            latitude > 90
        ) {

            setError(
                "Invalid latitude."
            );

            return false;

        }


        if (
            Number.isNaN(longitude) ||
            longitude < -180 ||
            longitude > 180
        ) {

            setError(
                "Invalid longitude."
            );

            return false;

        }


        return true;

    };


    // =========================================================
    // CREATE / UPDATE FOUNDATION
    // =========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!validateForm()) {

            return;

        }


        try {

            setSaving(true);

            setError("");

            setSuccess("");


            // =================================================
            // CREATE FOUNDATION
            //
            // POST /api/foundations
            //
            // Phone is NOT sent here because the backend
            // CreateFoundationRequest doesn't contain phone.
            //
            // Phone already belongs to User.
            // =================================================

            if (!profile) {

                const createPayload = {

                    organizationName:
                        form.organizationName.trim(),

                    registrationNumber:
                        form.registrationNumber.trim(),

                    address:
                        form.address.trim(),

                    city:
                        form.city.trim(),

                    state:
                        form.state.trim(),

                    pincode:
                        form.pincode.trim(),

                    latitude:
                        Number(form.latitude),

                    longitude:
                        Number(form.longitude)

                };


                const response =
                    await axiosInstance.post(
                        "/foundations",
                        createPayload
                    );


                const apiResponse =
                    response.data;


                if (!apiResponse.success) {

                    throw new Error(
                        apiResponse.message ||
                        "Failed to create foundation profile"
                    );

                }


                const createdFoundation =
                    apiResponse.data;


                // =============================================
                // UPDATE LOCAL STATE
                // =============================================

                setProfile(
                    createdFoundation
                );


                setForm({

                    organizationName:
                        createdFoundation.organizationName || "",

                    registrationNumber:
                        createdFoundation.registrationNumber || "",

                    phone:
                        createdFoundation.phone ||
                        form.phone ||
                        "",

                    address:
                        createdFoundation.address || "",

                    city:
                        createdFoundation.city || "",

                    state:
                        createdFoundation.state || "",

                    pincode:
                        createdFoundation.pincode || "",

                    latitude:
                        createdFoundation.latitude ?? "",

                    longitude:
                        createdFoundation.longitude ?? ""

                });


                setEditing(false);


                setSuccess(
                    "Foundation profile submitted successfully. Your profile is now pending admin verification."
                );

                toast.success(
                    "Foundation profile submitted successfully. It is now pending admin verification.",
                    {
                        duration: 4500,
                    }
                );

                return;

            }


            // =================================================
            // UPDATE EXISTING FOUNDATION
            //
            // PUT /api/foundations/me
            // =================================================

            const updatePayload = {

                organizationName:
                    form.organizationName.trim(),

                registrationNumber:
                    form.registrationNumber.trim(),

                phone:
                    form.phone.trim(),

                address:
                    form.address.trim(),

                city:
                    form.city.trim(),

                state:
                    form.state.trim(),

                pincode:
                    form.pincode.trim(),

                latitude:
                    Number(form.latitude),

                longitude:
                    Number(form.longitude)

            };


            const response =
                await axiosInstance.put(
                    "/foundations/me",
                    updatePayload
                );


            const apiResponse =
                response.data;


            if (!apiResponse.success) {

                throw new Error(
                    apiResponse.message ||
                    "Failed to update foundation profile"
                );

            }


            const updatedFoundation =
                apiResponse.data;


            setProfile(
                updatedFoundation
            );


            setForm({

                organizationName:
                    updatedFoundation.organizationName || "",

                registrationNumber:
                    updatedFoundation.registrationNumber || "",

                phone:
                    updatedFoundation.phone ||
                    form.phone ||
                    "",

                address:
                    updatedFoundation.address || "",

                city:
                    updatedFoundation.city || "",

                state:
                    updatedFoundation.state || "",

                pincode:
                    updatedFoundation.pincode || "",

                latitude:
                    updatedFoundation.latitude ?? "",

                longitude:
                    updatedFoundation.longitude ?? ""

            });


            setEditing(false);


            // -------------------------------------------------
            // Backend re-verification rule
            // -------------------------------------------------
            //
            // VERIFIED -> update -> PENDING
            // REJECTED -> update -> PENDING
            // -------------------------------------------------

            if (
                updatedFoundation.verificationStatus ===
                "PENDING"
            ) {

                setSuccess(
                    "Foundation profile updated successfully. Your profile is pending admin verification."
                );

                toast.success(
                    "Foundation profile updated successfully. It is pending admin verification.",
                    {
                        duration: 4500,
                    }
                );

            } else {

                setSuccess(
                    "Foundation profile updated successfully."
                );

                toast.success(
                    "Foundation profile updated successfully.",
                    {
                        duration: 3500,
                    }
                );

            }


        } catch (err) {

            console.error(
                "Foundation profile save error:",
                err
            );


            // =================================================
            // BACKEND VALIDATION ERRORS
            // =================================================

            const backendErrors =
                err.response?.data?.errors;


            if (backendErrors) {

                const firstError =
                    Object.values(
                        backendErrors
                    )[0];


                if (firstError) {

                    setError(
                        String(firstError)
                    );

                    toast.error(
                        String(firstError)
                    );

                } else {

                    const message =
                        err.response?.data?.message ||
                        "Invalid foundation information.";

                    setError(message);
                    toast.error(message);

                }

            } else {

                const message =
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to save foundation profile.";

                setError(message);
                toast.error(message);

            }

        } finally {

            setSaving(false);

        }

    };


    // =========================================================
    // CANCEL EDIT
    // =========================================================

    const handleCancel = () => {

        // -----------------------------------------------------
        // New profile
        // -----------------------------------------------------

        if (!profile) {

            navigate(
                "/foundation/dashboard"
            );

            return;

        }


        // -----------------------------------------------------
        // Existing profile
        // Restore original values.
        // -----------------------------------------------------

        setForm({

            organizationName:
                profile.organizationName || "",

            registrationNumber:
                profile.registrationNumber || "",

            phone:
                profile.phone || "",

            address:
                profile.address || "",

            city:
                profile.city || "",

            state:
                profile.state || "",

            pincode:
                profile.pincode || "",

            latitude:
                profile.latitude ?? "",

            longitude:
                profile.longitude ?? ""

        });


        setEditing(false);

        setError("");

        setSuccess("");

    };


    // =========================================================
    // VERIFICATION STATUS CONFIG
    // =========================================================

    const getVerificationConfig = () => {

        const status =
            profile?.verificationStatus;


        if (status === "VERIFIED") {

            return {

                label: "VERIFIED",

                icon: CheckCircle2,

                container:
                    "border-emerald-400/20 bg-emerald-400/5",

                badge:
                    "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",

                iconColor:
                    "text-emerald-400",

                message:
                    "Your foundation has been verified by the FoodBridge administration."

            };

        }


        if (status === "REJECTED") {

            return {

                label: "REJECTED",

                icon: XCircle,

                container:
                    "border-red-400/20 bg-red-400/5",

                badge:
                    "border-red-400/20 bg-red-400/10 text-red-400",

                iconColor:
                    "text-red-400",

                message:
                    profile?.rejectionReason
                        ? profile.rejectionReason
                        : "Your foundation verification was rejected. Please update your profile and submit it again."

            };

        }


        return {

            label: "PENDING",

            icon: Clock3,

            container:
                "border-yellow-400/20 bg-yellow-400/5",

            badge:
                "border-yellow-400/20 bg-yellow-400/10 text-yellow-400",

            iconColor:
                "text-yellow-400",

            message:
                "Your foundation profile has been submitted and is waiting for admin verification."

        };

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-[#050505] text-white">

                <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6">

                    <div className="text-center">

                        <Loader2
                            className="mx-auto h-8 w-8 animate-spin text-emerald-400"
                        />

                        <p className="mt-4 text-sm text-gray-500">
                            Loading foundation profile...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // =========================================================
    // VERIFICATION CONFIG
    // =========================================================

    const verification =
        getVerificationConfig();

    const VerificationIcon =
        verification.icon;


    // =========================================================
    // MAIN UI
    // =========================================================

    return (

        <div className="min-h-screen bg-[#050505] text-white">

            <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-10">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                    <div className="flex items-start gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/10 bg-emerald-400/10">

                            <Building2
                                className="h-7 w-7 text-emerald-400"
                            />

                        </div>


                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                                Foundation
                            </p>


                            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">

                                {profile?.organizationName ||
                                    "Create Foundation Profile"}

                            </h1>


                            <p className="mt-2 text-sm text-gray-500">

                                {profile
                                    ? "Manage your organization profile"
                                    : "Complete your foundation profile to submit it for verification"}

                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        EDIT BUTTON
                    ================================================= */}

                    {profile && !editing && (

                        <button
                            type="button"
                            onClick={() => {

                                setEditing(true);

                                setError("");

                                setSuccess("");

                            }}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                        >

                            <Pencil className="h-4 w-4" />

                            Edit Profile

                        </button>

                    )}

                </section>


                {/* =================================================
                    SUCCESS
                ================================================= */}

                {success && (

                    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-5 py-4">

                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

                        <p className="text-sm leading-6 text-emerald-300">

                            {success}

                        </p>

                    </div>

                )}


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/5 px-5 py-4">

                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

                        <p className="text-sm leading-6 text-red-300">

                            {error}

                        </p>

                    </div>

                )}


                {/* =================================================
                    VERIFICATION
                ================================================= */}

                {profile && (

                    <section
                        className={
                            `mb-6 rounded-3xl border p-6 sm:p-8 ${verification.container}`
                        }
                    >

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05]">

                                    <VerificationIcon
                                        className={
                                            `h-6 w-6 ${verification.iconColor}`
                                        }
                                    />

                                </div>


                                <div>

                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                                        Verification Status
                                    </p>


                                    <div className="mt-2">

                                        <span
                                            className={
                                                `inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${verification.badge}`
                                            }
                                        >

                                            <span className="h-2 w-2 rounded-full bg-current" />

                                            {verification.label}

                                        </span>

                                    </div>

                                </div>

                            </div>


                            <p className="max-w-md text-sm leading-6 text-gray-500">

                                {verification.message}

                            </p>

                        </div>


                        {/* =================================================
                            REJECTION REASON
                        ================================================= */}

                        {profile.verificationStatus ===
                            "REJECTED" &&
                            profile.rejectionReason && (

                                <div className="mt-6 rounded-2xl border border-red-400/10 bg-red-400/5 p-4">

                                    <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                                        Rejection reason
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-gray-400">

                                        {profile.rejectionReason}

                                    </p>

                                </div>

                            )}

                    </section>

                )}


                {/* =================================================
                    NEW PROFILE INFORMATION
                ================================================= */}

                {!profile && (

                    <section className="mb-6 rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6 sm:p-8">

                        <div className="flex items-start gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10">

                                <Clock3 className="h-5 w-5 text-yellow-400" />

                            </div>


                            <div>

                                <h2 className="font-semibold text-white">
                                    Complete your foundation profile
                                </h2>


                                <p className="mt-2 text-sm leading-6 text-gray-500">

                                    Your foundation account has been created,
                                    but your foundation profile has not been
                                    submitted yet. Complete all required
                                    information below to submit your profile
                                    for admin verification.

                                </p>

                            </div>

                        </div>

                    </section>

                )}


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]"
                >


                    {/* =================================================
                        ORGANIZATION
                    ================================================= */}

                    <div className="border-b border-white/10 px-6 py-6 sm:px-8">

                        <div className="flex items-center gap-4">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06]">

                                <Building2 className="h-5 w-5 text-gray-400" />

                            </div>


                            <div>

                                <h2 className="font-semibold text-white">
                                    Organization information
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Basic details about your foundation.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">


                        {/* =================================================
                            ORGANIZATION NAME
                        ================================================= */}

                        <div className="sm:col-span-2">

                            <label
                                htmlFor="organizationName"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Organization name
                            </label>


                            <input
                                id="organizationName"
                                name="organizationName"
                                type="text"
                                value={form.organizationName}
                                onChange={handleChange}
                                disabled={!editing}
                                maxLength={150}
                                placeholder="Enter foundation organization name"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                            />

                        </div>


                        {/* =================================================
                            REGISTRATION NUMBER
                        ================================================= */}

                        <div>

                            <label
                                htmlFor="registrationNumber"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Registration number
                            </label>


                            <div className="relative">

                                <Hash
                                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
                                />

                                <input
                                    id="registrationNumber"
                                    name="registrationNumber"
                                    type="text"
                                    value={form.registrationNumber}
                                    onChange={handleRegistrationNumberChange}
                                    disabled={!editing}
                                    maxLength={100}
                                    placeholder="Enter official registration number"
                                    className="w-full rounded-xl border border-white/10 bg-black/30 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                                />

                            </div>


                            <p className="mt-2 text-xs text-gray-600">

                                Official registration number of your foundation.

                            </p>

                        </div>


                        {/* =================================================
                            PHONE
                        ================================================= */}

                        <div>

                            <label
                                htmlFor="phone"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Contact phone number
                            </label>


                            <div className="relative">

                                <Phone
                                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
                                />

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    value={form.phone}
                                    onChange={handlePhoneChange}
                                    disabled={!editing}
                                    maxLength={10}
                                    placeholder="9876543210"
                                    className="w-full rounded-xl border border-white/10 bg-black/30 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                                />

                            </div>


                            <p className="mt-2 text-xs text-gray-600">

                                This number will be used as the foundation contact number.

                            </p>

                        </div>


                        {/* =================================================
                            ADDRESS
                        ================================================= */}

                        <div className="sm:col-span-2">

                            <label
                                htmlFor="address"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Address
                            </label>


                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={form.address}
                                onChange={handleChange}
                                disabled={!editing}
                                maxLength={255}
                                placeholder="Foundation street address"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                            />

                        </div>


                        {/* =================================================
                            CITY
                        ================================================= */}

                        <div>

                            <label
                                htmlFor="city"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                City
                            </label>


                            <input
                                id="city"
                                name="city"
                                type="text"
                                value={form.city}
                                onChange={handleChange}
                                disabled={!editing}
                                maxLength={100}
                                placeholder="Chennai"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                            />

                        </div>


                        {/* =================================================
                            STATE
                        ================================================= */}

                        <div>

                            <label
                                htmlFor="state"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                State
                            </label>


                            <input
                                id="state"
                                name="state"
                                type="text"
                                value={form.state}
                                onChange={handleChange}
                                disabled={!editing}
                                maxLength={100}
                                placeholder="Tamil Nadu"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                            />

                        </div>


                        {/* =================================================
                            PINCODE
                        ================================================= */}

                        <div>

                            <label
                                htmlFor="pincode"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Pincode
                            </label>


                            <input
                                id="pincode"
                                name="pincode"
                                type="text"
                                inputMode="numeric"
                                value={form.pincode}
                                onChange={handlePincodeChange}
                                disabled={!editing}
                                placeholder="600042"
                                maxLength={6}
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                            />

                        </div>


                    </div>


                    {/* =================================================
                        LOCATION
                    ================================================= */}

                    <div className="border-t border-white/10 px-6 py-6 sm:px-8">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">

                                    <MapPin className="h-5 w-5 text-emerald-400" />

                                </div>


                                <div>

                                    <h2 className="font-semibold text-white">
                                        Foundation location
                                    </h2>


                                    <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">

                                        Your location is used to find food
                                        donations within the configured
                                        service radius.

                                    </p>

                                </div>

                            </div>


                            {editing && (

                                <button
                                    type="button"
                                    onClick={detectLocation}
                                    disabled={locationLoading}
                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    {locationLoading ? (

                                        <Loader2 className="h-4 w-4 animate-spin" />

                                    ) : (

                                        <Navigation className="h-4 w-4" />

                                    )}


                                    {locationLoading
                                        ? "Detecting..."
                                        : "Use Current Location"}

                                </button>

                            )}

                        </div>


                        {/* =================================================
                            COORDINATES
                        ================================================= */}

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">


                            {/* =================================================
                                LATITUDE
                            ================================================= */}

                            <div>

                                <label
                                    htmlFor="latitude"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Latitude
                                </label>


                                <input
                                    id="latitude"
                                    name="latitude"
                                    type="number"
                                    step="any"
                                    value={form.latitude}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    placeholder="13.082680"
                                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                                />

                            </div>


                            {/* =================================================
                                LONGITUDE
                            ================================================= */}

                            <div>

                                <label
                                    htmlFor="longitude"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Longitude
                                </label>


                                <input
                                    id="longitude"
                                    name="longitude"
                                    type="number"
                                    step="any"
                                    value={form.longitude}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    placeholder="80.270718"
                                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                                />

                            </div>

                        </div>


                        {/* =================================================
                            LOCATION PRIVACY
                        ================================================= */}

                        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">

                            <p className="text-xs leading-5 text-gray-500">

                                <span className="font-semibold text-gray-400">
                                    Privacy:
                                </span>{" "}

                                Your coordinates are used only for
                                location-based donation matching.

                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    {editing && (

                        <div className="flex flex-col-reverse gap-3 border-t border-white/10 p-6 sm:flex-row sm:justify-end sm:px-8">


                            {/* =================================================
                                CANCEL
                            ================================================= */}

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-6 py-3.5 text-sm font-semibold text-gray-300 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                <X className="h-4 w-4" />

                                {profile
                                    ? "Cancel"
                                    : "Back"}

                            </button>


                            {/* =================================================
                                SUBMIT
                            ================================================= */}

                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-7 py-3.5 text-sm font-bold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {saving ? (

                                    <Loader2 className="h-4 w-4 animate-spin" />

                                ) : (

                                    <Save className="h-4 w-4" />

                                )}


                                {saving

                                    ? "Submitting..."

                                    : profile
                                        ? "Save Changes"
                                        : "Submit for Verification"}

                            </button>

                        </div>

                    )}

                </form>


                {/* =================================================
                    BACK
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/foundation/dashboard"
                        )
                    }
                    className="mt-6 text-sm text-gray-500 transition hover:text-white"
                >

                    ← Back to Dashboard

                </button>


            </main>

        </div>

    );

}


export default FoundationProfile;