import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { LivePromptDemo } from "@/components/sections/live-prompt-demo";
import { WhyFail } from "@/components/sections/why-fail";
import { PromptLibrary } from "@/components/sections/prompt-library";
import { Pricing } from "@/components/sections/pricing";
import { BeforeAfter } from "@/components/sections/before-after";
import { HowItWorks } from "@/components/sections/how-it-works";
import { SocialProof } from "@/components/sections/social-proof";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Page() {
  return (
    <div className="relative">
      <Navbar />
      <main id="main">
        <Hero />
        <LivePromptDemo />
        <WhyFail />
        <PromptLibrary />
        <Pricing />
        <BeforeAfter />
        <HowItWorks />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
