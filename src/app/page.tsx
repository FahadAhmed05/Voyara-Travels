import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BookingSearch } from "@/components/sections/BookingSearch";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section
          id="home"
          className="flex min-h-screen items-center bg-gradient-to-br from-ink via-teal-dark to-teal pt-28 pb-16"
        >
          <Container>
            <h1 className="max-w-3xl text-hero text-white">
              Your journey begins the moment you decide to go.
            </h1>
            <div aria-hidden="true" className="mt-12 h-72 md:h-56" />
          </Container>
        </section>
        <BookingSearch />
      </main>
      <Footer />
    </>
  );
}
