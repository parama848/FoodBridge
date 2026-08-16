// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// import Home from "../pages/home/Home";

// import ProtectedRoute from "./ProtectedRoute";
// import DonorDashboard from "../pages/donor/DonorDashboard";
// import Navbar from "../components/layout/Navbar";
// import Footer from "../components/layout/Footer";

// // donation
// import CreateDonation from "../pages/donor/CreateDonation";
// import MyDonations from "../pages/donor/MyDonations";
// import DonationDetails from "../pages/donor/DonationDetails";

// //foundation
// import FoundationProfile from "../pages/foundation/FoundationProfile";
// import CreateFoundation from "../pages/foundation/CreateFoundation";
// import FoundationDashboard from "../pages/foundation/FoundationDashboard";
// import DonationDetails from "../pages/foundation/DonationDetails";

// function AppRoutes() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* =====================================================
//                 PUBLIC ROUTES
//             ===================================================== */}

//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         {/* =====================================================
//                 PROTECTED ROUTES
//             ===================================================== */}

//         <Route element={<ProtectedRoute />}>
//           <Route path="/home" element={<Home />} />
//           //donations
//           <Route path="/donor/dashboard" element={<DonorDashboard />} />
//           <Route path="/donations/create" element={<CreateDonation />} />
//           <Route path="/donations" element={<MyDonations />} />
//           <Route path="/donations/:donationId" element={<DonationDetails />} />
//           // foundations
//           <Route path="/foundation/profile" element={<FoundationProfile />} />
//           <Route path="/foundation/profile" element={<CreateFoundation />} />
//           <Route
//             path="/foundation/dashboard"
//             element={<FoundationDashboard />}
//           />
//           <Route
//             path="/foundation/donations/:donationId"
//             element={<DonationDetails />}
//           />
//         </Route>

//         {/* =====================================================
//                 ROOT
//                 ===================================================== */}

//         <Route path="/" element={<Navigate to="/home" replace />} />

//         {/* =====================================================
//                 UNKNOWN ROUTES
//                 ===================================================== */}

//         <Route path="*" element={<Navigate to="/home" replace />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default AppRoutes;

import { Routes, Route, Navigate } from "react-router-dom";

// =========================================================
// AUTH
// =========================================================

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// =========================================================
// HOME
// =========================================================

import Home from "../pages/home/Home";

// =========================================================
// DONOR
// =========================================================

import DonorDashboard from "../pages/donor/DonorDashboard";

import CreateDonation from "../pages/donor/CreateDonation";

import MyDonations from "../pages/donor/MyDonations";

import DonorDonationDetails from "../pages/donor/DonationDetails";

// =========================================================
// FOUNDATION
// =========================================================

import CreateFoundation from "../pages/foundation/CreateFoundation";

import FoundationDashboard from "../pages/foundation/FoundationDashboard";

import FoundationDonationDetails from "../pages/foundation/FoundationDonationDetails";

import FoundationProfile from "../pages/foundation/FoundationProfile";

import AvailableFood from "../pages/foundation/AvailableFood";

import MyFoundationDonations from "../pages/foundation/MyDonations";

import Notifications from "../pages/notifications/Notifications";

// admin

import Foundations from "../pages/admin/Foundations";
import Users from "../pages/admin/Users";
import Donations from "../pages/admin/Donations";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Reports from "../pages/admin/Reports";

// =========================================================
// PROTECTED ROUTE
// =========================================================

import ProtectedRoute from "./ProtectedRoute";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HowItWorks from "../pages/home/HowItWorks";
import ImpactSection from "../pages/home/ImpactSection";
import About from "../pages/home/About";

function AppRoutes() {
  return (
    <main>
      <Navbar />
      <Routes>
        {/* =====================================================
                PUBLIC ROUTES
            ===================================================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/impact" element={<ImpactSection />} />
        <Route path="/about-us" element={<About />} />

        {/* =====================================================
                PROTECTED ROUTES
            ===================================================== */}
        <Route element={<ProtectedRoute />}>
          {/* =================================================
                    DONOR
                ================================================= */}

          <Route path="/donor/dashboard" element={<DonorDashboard />} />

          <Route path="/donor/donations/create" element={<CreateDonation />} />

          <Route path="/donor/donations" element={<MyDonations />} />

          <Route
            path="/donor/donations/:donationId"
            element={<DonorDonationDetails />}
          />

          {/* =================================================
                    admin
                ================================================= */}

          <Route path="/admin/foundations" element={<Foundations />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/donations" element={<Donations />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<Reports />} />

          {/* =================================================
                    FOUNDATION
                ================================================= */}

          <Route path="/foundation/create" element={<CreateFoundation />} />

          <Route
            path="/foundation/available-food"
            element={<AvailableFood />}
          />

          <Route
            path="/foundation/dashboard"
            element={<FoundationDashboard />}
          />

          <Route
            path="/foundation/donations/:donationId"
            element={<FoundationDonationDetails />}
          />

          <Route path="/foundation/profile" element={<FoundationProfile />} />

          <Route
            path="/foundation/donations"
            element={<MyFoundationDonations />}
          />

          <Route path="/notifications" element={<Notifications />} />

          
        </Route>

        
        {/* =====================================================
                DEFAULT ROUTE
            ===================================================== */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        {/* =====================================================
                UNKNOWN ROUTES
            ===================================================== */}
        {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
      </Routes>

      <Footer />
    </main>
  );
}

export default AppRoutes;
