import { ChapterProgress } from "@/components/layout/ChapterProgress";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BookingSearch } from "@/components/sections/BookingSearch";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Destinations } from "@/components/sections/Destinations";
import { HassleStrip } from "@/components/sections/HassleStrip";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { ThePlan } from "@/components/sections/ThePlan";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <ChapterProgress />
      <main id="main" className="flex-1">
        <Hero>
          <BookingSearch />
        </Hero>
        <HassleStrip />
        <Services />
        <Destinations />
        <ThePlan />
        <Stats />
        <Testimonials />
        <CtaBanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
