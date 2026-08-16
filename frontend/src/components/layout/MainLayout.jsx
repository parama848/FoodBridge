import { Outlet } from "react-router-dom";

function MainLayout() {

    return (
        <div className="min-h-screen bg-black text-white">

            <header className="border-b border-white/10 px-6 py-4">

                <h1 className="text-xl font-bold">
                    FoodBridge
                </h1>

            </header>


            <main className="p-6">

                <Outlet />

            </main>

        </div>
    );
}

export default MainLayout;