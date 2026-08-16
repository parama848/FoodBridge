import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

import { Toaster } from "react-hot-toast";

import "./index.css";


ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <AuthProvider>

            <NotificationProvider>

                <App />

            </NotificationProvider>

        </AuthProvider>


        {/* =====================================================
            GLOBAL TOAST SYSTEM
        ===================================================== */}

        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={12}

            containerStyle={{
                zIndex: 999999
            }}

            toastOptions={{

                duration: 3500,

                style: {
                    background: "white",
                    color: "black",
                    border:
                        "1px solid green",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    boxShadow:
                        "0 20px 50px rgba(0,0,0,0.45)",
                    fontSize: "14px",
                    fontWeight: "500"
                },

                success: {

                    iconTheme: {
                        primary: "#34d399",
                        secondary: "#050505"
                    }
                },

                error: {

                    iconTheme: {
                        primary: "#f87171",
                        secondary: "#050505"
                    }
                }
            }}
        />

    </React.StrictMode>
);