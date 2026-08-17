import {
    HeartHandshake,
    MapPinned,
    ShieldCheck,
    Target,
    Users,
    Zap,
} from "lucide-react";
function About() {

    const principles = [
        {
            icon: Target,
            title: "Purpose first",
            description:
                "The platform is designed around one clear objective: make surplus food easier to redirect toward people who need it.",
        },
        {
            icon: ShieldCheck,
            title: "Trust matters",
            description:
                "Verified foundations create a more reliable environment for organizations participating in redistribution.",
        },
        {
            icon: MapPinned,
            title: "Local connections",
            description:
                "Location-aware discovery helps connect food with foundations operating nearby.",
        },
        {
            icon: Zap,
            title: "Simple workflows",
            description:
                "Donors and foundations should be able to understand what happens next without unnecessary complexity.",
        },
    ];


    return (

        <div className="min-h-screen bg-[#050505] text-white">

            <main>


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="
                    relative
                    overflow-hidden
                ">

                    <div className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[-250px]
                        h-[500px]
                        w-[700px]
                        -translate-x-1/2
                        rounded-full
                        bg-[#1557D6]/[0.08]
                        blur-[120px]
                    " />


                    <div className="
                        relative
                        mx-auto
                        max-w-7xl
                        px-5
                        pb-24
                        pt-20
                        sm:px-6
                        sm:pt-28
                        lg:px-8
                    ">

                        <div className="max-w-4xl">

                            <div className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-[#1557D6]/20
                                bg-[#1557D6]/[0.05]
                                px-4
                                py-2
                                text-xs
                                font-medium
                                text-[#1557D6]
                            ">

                                <HeartHandshake
                                    size={14}
                                />

                                ABOUT FOODBRIDGE

                            </div>


                            <h1 className="
                                mt-7
                                text-5xl
                                font-bold
                                leading-[1.05]
                                tracking-tight
                                sm:text-6xl
                                lg:text-7xl
                            ">

                                Building a bridge

                                <span className="
                                    block
                                    text-[#1557D6]
                                ">

                                    between surplus and need.

                                </span>

                            </h1>


                            <p className="
                                mt-7
                                max-w-2xl
                                text-base
                                leading-8
                                text-gray-400
                                sm:text-lg
                            ">

                                FoodBridge is a food redistribution platform
                                designed to connect surplus food donors with
                                verified foundations through a structured,
                                location-aware workflow.

                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    STORY
                ================================================= */}

                <section className="
                    border-y
                    border-white/[0.07]
                    bg-white/[0.015]
                ">

                    <div className="
                        mx-auto
                        max-w-7xl
                        px-5
                        py-24
                        sm:px-6
                        lg:px-8
                    ">

                        <div className="
                            grid
                            gap-14
                            lg:grid-cols-2
                            lg:items-center
                        ">


                            <div>

                                <p className="
                                    text-sm
                                    font-medium
                                    text-[#1557D6]
                                ">

                                    The idea

                                </p>


                                <h2 className="
                                    mt-3
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    sm:text-4xl
                                ">

                                    Good food should have
                                    another destination.

                                </h2>

                            </div>


                            <div className="
                                space-y-5
                                text-sm
                                leading-8
                                text-gray-500
                            ">

                                <p>

                                    Food prepared for events,
                                    functions and other occasions
                                    can sometimes remain unused.
                                    FoodBridge provides a structured
                                    way to make that surplus visible
                                    to organizations that can use it.

                                </p>


                                <p>

                                    The platform brings together
                                    donors, verified foundations,
                                    location-based discovery,
                                    notifications and donation
                                    tracking into one connected
                                    experience.

                                </p>


                                <p>

                                    Instead of treating food donation
                                    as a one-time transaction,
                                    FoodBridge treats it as a journey
                                    that can be followed from donation
                                    to delivery.

                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    WHO PARTICIPATES
                ================================================= */}

                <section className="
                    mx-auto
                    max-w-7xl
                    px-5
                    py-24
                    sm:px-6
                    lg:px-8
                ">

                    <div className="max-w-2xl">

                        <p className="
                            text-sm
                            font-medium
                            text-[#1557D6]
                        ">

                            One ecosystem

                        </p>


                        <h2 className="
                            mt-3
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        ">

                            Different roles. One purpose.

                        </h2>

                    </div>


                    <div className="
                        mt-14
                        grid
                        gap-5
                        md:grid-cols-3
                    ">


                        {/* DONOR */}

                        <div className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.025]
                            p-8
                            transition
                            duration-300
                            hover:-translate-y-1
                            hover:border-[#1557D6]/20
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#1557D6]/[0.08]
                                text-[#1557D6]
                            ">

                                <Users
                                    size={23}
                                />

                            </div>


                            <h3 className="
                                mt-7
                                text-xl
                                font-semibold
                            ">

                                Donors

                            </h3>


                            <p className="
                                mt-3
                                text-sm
                                leading-7
                                text-gray-500
                            ">

                                People and organizations with
                                safe surplus food can publish
                                donation details and make them
                                available for redistribution.

                            </p>

                        </div>


                        {/* FOUNDATION */}

                        <div className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.025]
                            p-8
                            transition
                            duration-300
                            hover:-translate-y-1
                            hover:border-[#1557D6]/20
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#1557D6]/[0.08]
                                text-[#1557D6]
                            ">

                                <ShieldCheck
                                    size={23}
                                />

                            </div>


                            <h3 className="
                                mt-7
                                text-xl
                                font-semibold
                            ">

                                Foundations

                            </h3>


                            <p className="
                                mt-3
                                text-sm
                                leading-7
                                text-gray-500
                            ">

                                Verified foundations can discover
                                suitable nearby donations and
                                participate in the redistribution
                                workflow.

                            </p>

                        </div>


                        {/* COMMUNITY */}

                        <div className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.025]
                            p-8
                            transition
                            duration-300
                            hover:-translate-y-1
                            hover:border-[#1557D6]/20
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#1557D6]/[0.08]
                                text-[#1557D6]
                            ">

                                <HeartHandshake
                                    size={23}
                                />

                            </div>


                            <h3 className="
                                mt-7
                                text-xl
                                font-semibold
                            ">

                                Communities

                            </h3>


                            <p className="
                                mt-3
                                text-sm
                                leading-7
                                text-gray-500
                            ">

                                The ultimate purpose is to move
                                usable food toward communities
                                where it can make a difference.

                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    PRINCIPLES
                ================================================= */}

                <section className="
                    border-y
                    border-white/[0.07]
                    bg-white/[0.015]
                ">

                    <div className="
                        mx-auto
                        max-w-7xl
                        px-5
                        py-24
                        sm:px-6
                        lg:px-8
                    ">

                        <div className="max-w-2xl">

                            <p className="
                                text-sm
                                font-medium
                                text-[#1557D6]
                            ">

                                What guides us

                            </p>


                            <h2 className="
                                mt-3
                                text-3xl
                                font-bold
                                tracking-tight
                                sm:text-4xl
                            ">

                                Designed around trust and simplicity.

                            </h2>

                        </div>


                        <div className="
                            mt-14
                            grid
                            gap-px
                            overflow-hidden
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/10
                            sm:grid-cols-2
                        ">

                            {principles.map(
                                (principle) => {

                                    const Icon =
                                        principle.icon;

                                    return (

                                        <div
                                            key={
                                                principle.title
                                            }
                                            className="
                                                bg-[#070707]
                                                p-8
                                                transition
                                                hover:bg-white/[0.025]
                                            "
                                        >

                                            <div className="
                                                flex
                                                h-11
                                                w-11
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-[#1557D6]/[0.07]
                                                text-[#1557D6]
                                            ">

                                                <Icon
                                                    size={21}
                                                />

                                            </div>


                                            <h3 className="
                                                mt-6
                                                text-lg
                                                font-semibold
                                            ">

                                                {
                                                    principle.title
                                                }

                                            </h3>


                                            <p className="
                                                mt-3
                                                text-sm
                                                leading-7
                                                text-gray-500
                                            ">

                                                {
                                                    principle.description
                                                }

                                            </p>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    </div>

                </section>


                {/* =================================================
                    FINAL MESSAGE
                ================================================= */}

                <section className="
                    px-5
                    py-24
                    sm:px-6
                    lg:px-8
                ">

                    <div className="
                        relative
                        mx-auto
                        max-w-5xl
                        overflow-hidden
                        rounded-3xl
                        border
                        border-[#1557D6]/10
                        bg-[#1557D6]/[0.04]
                        px-6
                        py-16
                        text-center
                        sm:px-12
                    ">

                        <div className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-[-200px]
                            h-[400px]
                            w-[600px]
                            -translate-x-1/2
                            rounded-full
                            bg-[#1557D6]/[0.08]
                            blur-[100px]
                        " />


                        <div className="relative">

                            <HeartHandshake
                                size={32}
                                className="
                                    mx-auto
                                    text-[#1557D6]
                                "
                            />


                            <h2 className="
                                mt-6
                                text-3xl
                                font-bold
                                tracking-tight
                                sm:text-4xl
                            ">

                                Share. Connect. Impact.

                            </h2>


                            <p className="
                                mx-auto
                                mt-4
                                max-w-xl
                                text-sm
                                leading-7
                                text-gray-500
                            ">

                                FoodBridge exists to make the path
                                from surplus food to meaningful impact
                                clearer and more connected.

                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </div>

    );
}


export default About;