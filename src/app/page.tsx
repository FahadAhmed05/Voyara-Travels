import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BookingSearch } from "@/components/sections/BookingSearch";
import { HassleStrip } from "@/components/sections/HassleStrip";
import { Hero } from "@/components/sections/Hero";

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
      </main>
      <Footer />
    </>
  );
}
