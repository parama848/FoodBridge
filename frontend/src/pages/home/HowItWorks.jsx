import { useEffect, useState } from "react";
import {
    ArrowDown,
    ArrowRight,
    CheckCircle2,
    Clock3,
    HandHeart,
    MapPin,
    Package,
    Radio,
    ShieldCheck,
    Truck,
    UtensilsCrossed,
    Users,
} from "lucide-react";



// =========================================================
// FLOW DATA
// =========================================================

const steps = [
    {
        number: "01",
        title: "Donate surplus food",
        description:
            "A donor creates a food donation with details such as quantity, preparation time, expiry and pickup location.",
        icon: UtensilsCrossed,
        label: "DONOR",
    },
    {
        number: "02",
        title: "Location is checked",
        description:
            "FoodBridge uses the donation location to determine which verified foundations are nearby.",
        icon: MapPin,
        label: "LOCATION",
    },
    {
        number: "03",
        title: "Foundations discover it",
        description:
            "Eligible nearby verified foundations can discover suitable available food donations.",
        icon: ShieldCheck,
        label: "FOUNDATIONS",
    },
    {
        number: "04",
        title: "A foundation accepts",
        description:
            "A verified foundation accepts the donation and the food moves into the delivery workflow.",
        icon: CheckCircle2,
        label: "ACCEPTED",
    },
    {
        number: "05",
        title: "Pickup begins",
        description:
            "The accepted donation moves toward pickup from the donor location.",
        icon: Truck,
        label: "PICKUP",
    },
    {
        number: "06",
        title: "Food reaches people",
        description:
            "The donation progresses through delivery so surplus food can become meaningful meals.",
        icon: HandHeart,
        label: "IMPACT",
    },
];


// =========================================================
// COMPONENT
// =========================================================

function HowItWorks() {

    const [activeStep, setActiveStep] = useState(0);

    const [visibleSteps, setVisibleSteps] =
        useState(new Set());


    // =========================================================
    // AUTO FLOW ANIMATION
    // =========================================================

    useEffect(() => {

        const interval = setInterval(() => {

            setActiveStep((previous) =>
                previous === steps.length - 1
                    ? 0
                    : previous + 1
            );

        }, 2400);

        return () => clearInterval(interval);

    }, []);


    // =========================================================
    // SCROLL REVEAL
    // =========================================================

    useEffect(() => {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            const index =
                                Number(
                                    entry.target.dataset.step
                                );

                            setVisibleSteps(
                                (previous) =>
                                    new Set([
                                        ...previous,
                                        index,
                                    ])
                            );

                        }

                    });

                },
                {
                    threshold: 0.2,
                }
            );


        const elements =
            document.querySelectorAll(
                "[data-working-step]"
            );


        elements.forEach((element) =>
            observer.observe(element)
        );


        return () => observer.disconnect();

    }, []);


    return (

        <div className="min-h-screen bg-[#050505] text-white">
            {/* =====================================================
                PAGE STYLES
            ===================================================== */}

            <style>{`

                @keyframes pulseNode {

                    0% {
                        transform: scale(1);
                        opacity: .6;
                    }

                    50% {
                        transform: scale(1.35);
                        opacity: 1;
                    }

                    100% {
                        transform: scale(1);
                        opacity: .6;
                    }

                }


                @keyframes flowMove {

                    0% {
                        transform: translateX(-10px);
                        opacity: .25;
                    }

                    50% {
                        transform: translateX(0);
                        opacity: 1;
                    }

                    100% {
                        transform: translateX(10px);
                        opacity: .25;
                    }

                }


                @keyframes lineGlow {

                    0% {
                        background-position: 0% 50%;
                    }

                    100% {
                        background-position: 200% 50%;
                    }

                }


                @keyframes floatCard {

                    0% {
                        transform: translateY(0px);
                    }

                    50% {
                        transform: translateY(-8px);
                    }

                    100% {
                        transform: translateY(0px);
                    }

                }


                .working-node {
                    animation: pulseNode 2s ease-in-out infinite;
                }


                .working-flow {
                    animation: flowMove 2s ease-in-out infinite;
                }


                .working-line {
                    background-size: 200% 100%;
                    animation: lineGlow 3s linear infinite;
                }


                .working-card {
                    animation: floatCard 5s ease-in-out infinite;
                }

            `}</style>


            <main>


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="relative overflow-hidden">

                    <div className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[-250px]
                        h-[550px]
                        w-[750px]
                        -translate-x-1/2
                        rounded-full
                        bg-[#1557D6]/[0.08]
                        blur-[130px]
                    " />


                    <div className="
                        pointer-events-none
                        absolute
                        right-[-200px]
                        top-[300px]
                        h-[400px]
                        w-[400px]
                        rounded-full
                        bg-cyan-500/[0.05]
                        blur-[120px]
                    " />


                    <div className="
                        relative
                        mx-auto
                        max-w-7xl
                        px-5
                        pb-20
                        pt-20
                        sm:px-6
                        sm:pt-28
                        lg:px-8
                        lg:pb-28
                    ">


                        <div className="text-center">

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

                                <Radio
                                    size={14}
                                    className="animate-pulse"
                                />

                                Food redistribution, connected

                            </div>


                            <h1 className="
                                mx-auto
                                mt-7
                                max-w-5xl
                                text-5xl
                                font-bold
                                leading-[1.05]
                                tracking-tight
                                sm:text-6xl
                                lg:text-7xl
                            ">

                                From surplus food

                                <span className="
                                    block
                                    text-[#1557D6]
                                ">
                                    to meaningful meals.
                                </span>

                            </h1>


                            <p className="
                                mx-auto
                                mt-7
                                max-w-2xl
                                text-base
                                leading-8
                                text-gray-400
                                sm:text-lg
                            ">

                                FoodBridge creates a transparent bridge
                                between people with surplus food and
                                verified foundations that can put it
                                to meaningful use.

                            </p>

                        </div>


                        {/* =================================================
                            ANIMATED FLOW
                        ================================================= */}

                        <div className="mt-20">


                            <div className="
                                relative
                                mx-auto
                                hidden
                                max-w-6xl
                                lg:block
                            ">


                                {/* Horizontal line */}

                                <div className="
                                    absolute
                                    left-[8%]
                                    right-[8%]
                                    top-10
                                    h-px
                                    overflow-hidden
                                    bg-white/10
                                ">

                                    <div className="
                                        working-line
                                        h-full
                                        w-full
                                        bg-gradient-to-r
                                        from-transparent
                                        via-[#1557D6]/70
                                        to-transparent
                                    " />

                                </div>


                                <div className="
                                    relative
                                    grid
                                    grid-cols-6
                                    gap-4
                                ">

                                    {steps.map(
                                        (step, index) => {

                                            const Icon =
                                                step.icon;

                                            const active =
                                                index ===
                                                activeStep;


                                            return (

                                                <button
                                                    key={
                                                        step.number
                                                    }
                                                    onClick={() =>
                                                        setActiveStep(
                                                            index
                                                        )
                                                    }
                                                    className="
                                                        group
                                                        text-center
                                                        focus:outline-none
                                                    "
                                                >

                                                    <div className="
                                                        relative
                                                        mx-auto
                                                        flex
                                                        h-20
                                                        w-20
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        border
                                                        border-white/10
                                                        bg-[#090909]
                                                        transition-all
                                                        duration-500
                                                    "
                                                    style={{
                                                        boxShadow:
                                                            active
                                                                ? "0 0 45px rgba(21,87,214,.18)"
                                                                : "none",
                                                    }}
                                                    >

                                                        {active && (

                                                            <div className="
                                                                working-node
                                                                absolute
                                                                inset-0
                                                                rounded-full
                                                                border
                                                                border-[#1557D6]/40
                                                            " />

                                                        )}


                                                        <Icon
                                                            size={27}
                                                            className={
                                                                active
                                                                    ? "text-[#1557D6]"
                                                                    : "text-gray-500 group-hover:text-gray-300"
                                                            }
                                                        />

                                                    </div>


                                                    <p className="
                                                        mt-5
                                                        text-[10px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-gray-600
                                                    ">

                                                        {step.label}

                                                    </p>


                                                    <p className={`
                                                        mt-2
                                                        text-sm
                                                        font-medium
                                                        transition
                                                        ${
                                                            active
                                                                ? "text-white"
                                                                : "text-gray-500"
                                                        }
                                                    `}>

                                                        {step.title}

                                                    </p>

                                                </button>

                                            );

                                        }
                                    )}

                                </div>

                            </div>


                            {/* Mobile flow */}

                            <div className="
                                space-y-3
                                lg:hidden
                            ">

                                {steps.map(
                                    (step, index) => {

                                        const Icon =
                                            step.icon;

                                        return (

                                            <div
                                                key={
                                                    step.number
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-4
                                                    rounded-2xl
                                                    border
                                                    border-white/10
                                                    bg-white/[0.025]
                                                    p-4
                                                "
                                            >

                                                <div className="
                                                    flex
                                                    h-12
                                                    w-12
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-[#1557D6]/[0.08]
                                                    text-[#1557D6]
                                                ">

                                                    <Icon
                                                        size={21}
                                                    />

                                                </div>


                                                <div>

                                                    <p className="
                                                        text-[10px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-[#1557D6]
                                                    ">

                                                        {step.number}

                                                    </p>

                                                    <p className="
                                                        mt-1
                                                        font-semibold
                                                    ">

                                                        {step.title}

                                                    </p>

                                                </div>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    ACTIVE STEP DETAIL
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
                        py-20
                        sm:px-6
                        lg:px-8
                    ">


                        <div className="
                            grid
                            gap-12
                            lg:grid-cols-2
                            lg:items-center
                        ">


                            <div>

                                <p className="
                                    text-sm
                                    font-medium
                                    text-[#1557D6]
                                ">

                                    The FoodBridge journey

                                </p>


                                <h2 className="
                                    mt-3
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    sm:text-4xl
                                ">

                                    Every step has a purpose.

                                </h2>


                                <p className="
                                    mt-5
                                    max-w-xl
                                    text-sm
                                    leading-7
                                    text-gray-500
                                ">

                                    FoodBridge is designed to make
                                    food redistribution simple for
                                    donors and dependable for verified
                                    foundations.

                                </p>


                                <div className="mt-8 flex flex-wrap gap-3">

                                    {steps.map(
                                        (step, index) => (

                                            <button
                                                key={
                                                    step.number
                                                }
                                                onClick={() =>
                                                    setActiveStep(
                                                        index
                                                    )
                                                }
                                                className={`
                                                    rounded-xl
                                                    border
                                                    px-4
                                                    py-2
                                                    text-xs
                                                    font-medium
                                                    transition
                                                    ${
                                                        index ===
                                                        activeStep
                                                            ? "border-[#1557D6]/30 bg-[#1557D6]/10 text-[#1557D6]"
                                                            : "border-white/10 text-gray-500 hover:text-white"
                                                    }
                                                `}
                                            >

                                                {step.number}

                                            </button>

                                        )
                                    )}

                                </div>

                            </div>


                            <div className="
                                working-card
                                rounded-3xl
                                border
                                border-white/10
                                bg-[#090909]
                                p-7
                                shadow-2xl
                                shadow-black/40
                                sm:p-9
                            ">


                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <span className="
                                        rounded-full
                                        border
                                        border-[#1557D6]/20
                                        bg-[#1557D6]/[0.06]
                                        px-3
                                        py-1
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.18em]
                                        text-[#1557D6]
                                    ">

                                        Step{" "}
                                        {
                                            steps[
                                                activeStep
                                            ].number
                                        }

                                    </span>


                                    <Clock3
                                        size={18}
                                        className="text-gray-600"
                                    />

                                </div>


                                <div className="
                                    mt-8
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-white/[0.05]
                                ">

                                    {(() => {

                                        const Icon =
                                            steps[
                                                activeStep
                                            ].icon;

                                        return (
                                            <Icon
                                                size={30}
                                                className="text-[#1557D6]"
                                            />
                                        );

                                    })()}

                                </div>


                                <h3 className="
                                    mt-7
                                    text-2xl
                                    font-semibold
                                ">

                                    {
                                        steps[
                                            activeStep
                                        ].title
                                    }

                                </h3>


                                <p className="
                                    mt-4
                                    text-sm
                                    leading-7
                                    text-gray-500
                                ">

                                    {
                                        steps[
                                            activeStep
                                        ].description
                                    }

                                </p>


                                <div className="
                                    mt-8
                                    h-px
                                    bg-white/10
                                " />


                                <div className="
                                    mt-5
                                    flex
                                    items-center
                                    gap-3
                                    text-xs
                                    text-gray-500
                                ">

                                    <CheckCircle2
                                        size={16}
                                        className="text-[#1557D6]"
                                    />

                                    Connected through FoodBridge

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    FULL PROCESS
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

                            Complete workflow

                        </p>


                        <h2 className="
                            mt-3
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        ">

                            A bridge, not just a listing.

                        </h2>


                        <p className="
                            mt-4
                            text-sm
                            leading-7
                            text-gray-500
                        ">

                            The platform connects the important pieces
                            of redistribution into one traceable journey.

                        </p>

                    </div>


                    <div className="
                        mt-14
                        grid
                        gap-4
                        md:grid-cols-2
                        lg:grid-cols-3
                    ">

                        {steps.map(
                            (step, index) => {

                                const Icon =
                                    step.icon;

                                const visible =
                                    visibleSteps.has(
                                        index
                                    );

                                return (

                                    <div
                                        key={
                                            step.number
                                        }
                                        data-working-step
                                        data-step={
                                            index
                                        }
                                        className={`
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-white/[0.025]
                                            p-7
                                            transition-all
                                            duration-700
                                            hover:-translate-y-1
                                            hover:border-[#1557D6]/20
                                            ${
                                                visible
                                                    ? "translate-y-0 opacity-100"
                                                    : "translate-y-8 opacity-0"
                                            }
                                        `}
                                        style={{
                                            transitionDelay:
                                                `${index * 80}ms`,
                                        }}
                                    >

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                        ">

                                            <span className="
                                                text-sm
                                                font-semibold
                                                text-[#1557D6]
                                            ">

                                                {step.number}

                                            </span>


                                            <Icon
                                                size={20}
                                                className="text-gray-600"
                                            />

                                        </div>


                                        <h3 className="
                                            mt-7
                                            text-xl
                                            font-semibold
                                        ">

                                            {step.title}

                                        </h3>


                                        <p className="
                                            mt-3
                                            text-sm
                                            leading-7
                                            text-gray-500
                                        ">

                                            {step.description}

                                        </p>


                                        {index <
                                            steps.length - 1 && (

                                            <div className="
                                                mt-7
                                                flex
                                                items-center
                                                gap-2
                                                text-xs
                                                text-gray-700
                                            ">

                                                Next

                                                <ArrowRight
                                                    size={14}
                                                />

                                            </div>

                                        )}

                                    </div>

                                );

                            }
                        )}

                    </div>

                </section>


                {/* =================================================
                    FINAL CTA
                ================================================= */}

                <section className="
                    px-5
                    pb-24
                    sm:px-6
                    lg:px-8
                ">

                    <div className="
                        relative
                        mx-auto
                        max-w-7xl
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

                        <Package
                            size={30}
                            className="
                                mx-auto
                                text-[#1557D6]
                            "
                        />


                        <h2 className="
                            mt-5
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        ">

                            Surplus should have a destination.

                        </h2>


                        <p className="
                            mx-auto
                            mt-4
                            max-w-xl
                            text-sm
                            leading-7
                            text-gray-500
                        ">

                            FoodBridge helps turn that destination
                            into a connected, accountable journey.

                        </p>

                    </div>

                </section>

            </main>

        </div>

    );
}


export default HowItWorks;