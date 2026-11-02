import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BookingSearch } from "@/components/sections/BookingSearch";
import { Destinations } from "@/components/sections/Destinations";
import { HassleStrip } from "@/components/sections/HassleStrip";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        {/* The booking card overlaps the hero's bottom edge. */}
        <div data-hero="card" className="relative z-10 -mt-16 md:-mt-20">
          <BookingSearch />
        </div>
        <HassleStrip />
        <Services />
        <Destinations />
      </main>
      <Footer />
    </>
  );
}
