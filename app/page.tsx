import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Gallery } from "@/components/sections/Gallery";
import { Location } from "@/components/sections/Location";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Experience />
      <Gallery />
      <Location />
      <BookingCTA />
      <Contact />
    </>
  );
}
