// import {
//     ArrowDown,
//     Building2,
//     Route,
//     Utensils
// } from "lucide-react";

// function ImpactSection() {

//     const impactItems = [
//         {
//             number: "01",
//             icon: Utensils,
//             title: "Reduce food waste",
//             description:
//                 "Give surplus food a second purpose instead of allowing perfectly usable meals to become waste."
//         },
//         {
//             number: "02",
//             icon: Building2,
//             title: "Support communities",
//             description:
//                 "Connect donors with verified foundations that can distribute food responsibly to people who need it."
//         },
//         {
//             number: "03",
//             icon: Route,
//             title: "Track every donation",
//             description:
//                 "Follow food from donation to acceptance, pickup and delivery with clear status updates."
//         }
//     ];


//     return (

//         <section
//             id="impact"
//             className="border-b border-white/[0.06] bg-white/[0.015]"
//         >

//             <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">


//                 {/* Header */}

//                 <div className="grid gap-10 lg:grid-cols-2 lg:items-end">

//                     <div>

//                         <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
//                             Why FoodBridge?
//                         </p>

//                         <h2 className="mt-4 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">

//                             One platform.

//                             <span className="block text-gray-500">
//                                 Real community impact.
//                             </span>

//                         </h2>

//                     </div>


//                     <div className="lg:pl-10">

//                         <p className="max-w-xl text-sm leading-7 text-gray-500 sm:text-base">

//                             FoodBridge creates a reliable bridge
//                             between people with surplus food and
//                             verified organizations that can put that
//                             food to good use.

//                         </p>

//                     </div>

//                 </div>


//                 {/* Cards */}

//                 <div className="mt-16 grid overflow-hidden rounded-3xl border border-white/10 md:grid-cols-3">

//                     {impactItems.map((item, index) => {

//                         const Icon = item.icon;

//                         return (

//                             <div
//                                 key={item.number}
//                                 className={`group relative min-h-[300px] bg-[#070707] p-8 transition-all duration-300 hover:bg-white/[0.025] sm:p-10 ${
//                                     index > 0
//                                         ? "border-t border-white/10 md:border-l md:border-t-0"
//                                         : ""
//                                 }`}
//                             >

//                                 {/* Number */}

//                                 <div className="flex items-center justify-between">

//                                     <span className="text-sm font-bold text-emerald-400">
//                                         {item.number}
//                                     </span>

//                                     <Icon
//                                         size={20}
//                                         className="text-gray-700 transition-colors duration-300 group-hover:text-emerald-400"
//                                     />

//                                 </div>


//                                 {/* Content */}

//                                 <div className="mt-20">

//                                     <h3 className="text-xl font-bold text-white">
//                                         {item.title}
//                                     </h3>

//                                     <p className="mt-4 text-sm leading-7 text-gray-500">
//                                         {item.description}
//                                     </p>

//                                 </div>


//                                 {/* Bottom arrow */}

//                                 <div className="absolute bottom-8 right-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

//                                     <ArrowDown
//                                         size={16}
//                                         className="-rotate-45 text-emerald-400"
//                                     />

//                                 </div>

//                             </div>

//                         );

//                     })}

//                 </div>

//             </div>

//         </section>
//     );
// }

// export default ImpactSection;

import {
    ArrowUpRight,
    CheckCircle2,
    HandHeart,
    MapPin,
    PackageCheck,
    ShieldCheck,
    Truck,
    Users,
} from "lucide-react";

function ImpactSection() {

    const pillars = [
        {
            icon: HandHeart,
            number: "01",
            title: "Reduce food waste",
            description:
                "Surplus food can be redirected toward people and communities instead of being left unused.",
        },
        {
            icon: Users,
            number: "02",
            title: "Connect communities",
            description:
                "FoodBridge creates a direct digital bridge between donors and verified foundations.",
        },
        {
            icon: MapPin,
            number: "03",
            title: "Make proximity matter",
            description:
                "Location-aware discovery helps foundations find suitable donations in their nearby area.",
        },
        {
            icon: ShieldCheck,
            number: "04",
            title: "Build trust",
            description:
                "Foundation verification helps create a safer environment for food redistribution.",
        },
        {
            icon: Truck,
            number: "05",
            title: "Improve delivery visibility",
            description:
                "Accepted donations can progress through pickup and delivery while their status is tracked.",
        },
        {
            icon: PackageCheck,
            number: "06",
            title: "Create measurable progress",
            description:
                "A structured donation lifecycle makes the journey easier to understand and report.",
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
                    border-b
                    border-white/[0.07]
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
                        bg-emerald-500/[0.08]
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
                                border-emerald-400/20
                                bg-emerald-400/[0.05]
                                px-4
                                py-2
                                text-xs
                                font-medium
                                text-emerald-300
                            ">

                                <span className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-emerald-400
                                " />

                                OUR IMPACT

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

                                One platform.

                                <span className="
                                    block
                                    text-emerald-400
                                ">

                                    Real community impact.

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

                                FoodBridge is built around a simple idea:
                                make surplus food easier to redirect,
                                easier to discover and easier to track.

                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    IMPACT STATEMENT
                ================================================= */}

                <section className="
                    mx-auto
                    max-w-7xl
                    px-5
                    py-24
                    sm:px-6
                    lg:px-8
                ">

                    <div className="
                        grid
                        gap-12
                        lg:grid-cols-2
                        lg:items-end
                    ">

                        <div>

                            <p className="
                                text-sm
                                font-medium
                                text-emerald-400
                            ">

                                Why FoodBridge?

                            </p>


                            <h2 className="
                                mt-3
                                text-3xl
                                font-bold
                                tracking-tight
                                sm:text-4xl
                            ">

                                Turning excess into opportunity.

                            </h2>

                        </div>


                        <p className="
                            text-sm
                            leading-7
                            text-gray-500
                        ">

                            The goal is not simply to list food.
                            It is to create a dependable bridge that
                            helps surplus food move from a donor to
                            an organization that can distribute it
                            responsibly.

                        </p>

                    </div>


                    {/* =================================================
                        IMPACT CARDS
                    ================================================= */}

                    <div className="
                        mt-14
                        grid
                        gap-px
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/10
                        md:grid-cols-2
                        lg:grid-cols-3
                    ">

                        {pillars.map(
                            (pillar) => {

                                const Icon =
                                    pillar.icon;

                                return (

                                    <div
                                        key={
                                            pillar.number
                                        }
                                        className="
                                            group
                                            bg-[#070707]
                                            p-7
                                            transition
                                            duration-300
                                            hover:bg-white/[0.025]
                                        "
                                    >

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                        ">

                                            <span className="
                                                text-3xl
                                                font-bold
                                                text-white
                                            ">

                                                {pillar.number}

                                            </span>


                                            <div className="
                                                flex
                                                h-10
                                                w-10
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-emerald-400/[0.07]
                                                text-emerald-400
                                            ">

                                                <Icon
                                                    size={19}
                                                />

                                            </div>

                                        </div>


                                        <h3 className="
                                            mt-7
                                            text-lg
                                            font-semibold
                                        ">

                                            {pillar.title}

                                        </h3>


                                        <p className="
                                            mt-3
                                            text-sm
                                            leading-7
                                            text-gray-500
                                        ">

                                            {
                                                pillar.description
                                            }

                                        </p>

                                    </div>

                                );

                            }
                        )}

                    </div>

                </section>


                {/* =================================================
                    LIFECYCLE
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
                                text-emerald-400
                            ">

                                Impact through the journey

                            </p>


                            <h2 className="
                                mt-3
                                text-3xl
                                font-bold
                                tracking-tight
                                sm:text-4xl
                            ">

                                Every successful delivery matters.

                            </h2>

                        </div>


                        <div className="
                            mt-14
                            grid
                            gap-4
                            sm:grid-cols-2
                            lg:grid-cols-4
                        ">


                            {[
                                [
                                    "01",
                                    "Food donated",
                                ],
                                [
                                    "02",
                                    "Foundation connected",
                                ],
                                [
                                    "03",
                                    "Pickup completed",
                                ],
                                [
                                    "04",
                                    "Food delivered",
                                ],
                            ].map(
                                ([number, title]) => (

                                    <div
                                        key={number}
                                        className="
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-[#080808]
                                            p-6
                                        "
                                    >

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                        ">

                                            <span className="
                                                text-sm
                                                font-semibold
                                                text-emerald-400
                                            ">

                                                {number}

                                            </span>


                                            <CheckCircle2
                                                size={18}
                                                className="
                                                    text-gray-700
                                                "
                                            />

                                        </div>


                                        <p className="
                                            mt-8
                                            font-semibold
                                        ">

                                            {title}

                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </section>


                {/* =================================================
                    PRINCIPLE
                ================================================= */}

                <section className="
                    px-5
                    py-24
                    sm:px-6
                    lg:px-8
                ">

                    <div className="
                        mx-auto
                        max-w-7xl
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.025]
                        p-8
                        sm:p-12
                    ">

                        <div className="
                            flex
                            flex-col
                            gap-8
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        ">

                            <div className="max-w-2xl">

                                <p className="
                                    text-sm
                                    font-medium
                                    text-emerald-400
                                ">

                                    Our principle

                                </p>


                                <h2 className="
                                    mt-3
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    sm:text-4xl
                                ">

                                    Food should reach people,
                                    not landfills.

                                </h2>


                                <p className="
                                    mt-5
                                    text-sm
                                    leading-7
                                    text-gray-500
                                ">

                                    FoodBridge focuses on making
                                    redistribution practical,
                                    transparent and community-driven.

                                </p>

                            </div>


                            <div className="
                                flex
                                h-16
                                w-16
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                bg-emerald-400/[0.08]
                                text-emerald-400
                            ">

                                <ArrowUpRight
                                    size={28}
                                />

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>

    );
}


export default ImpactSection;