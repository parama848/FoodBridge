import Hero from "./Hero";
import ImpactSection from "./ImpactSection";
import HowItWorks from "./HowItWorks";
import CTASection from "./About";


function Home() {

    return (

        <div className="min-h-screen overflow-x-hidden bg-[#050505] text-white">

            <main>

                <Hero />

                <ImpactSection />

                <HowItWorks />

                <CTASection />

            </main>

        </div>
    );
}

export default Home;