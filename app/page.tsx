"use client";

import HeroCarousel from "@/components/HeroCarousel";
import LimeLight from "@/components/LimeLight";
import Footer from "@/components/Footer";
import ProductCarousel from "@/components/NewArrivalCarousel";
import AdsSection from "@/components/AdsSection";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import { newArrivals, formalShoes, casualShoes } from "@/utils/mockData";

const HomePage = () => {
  return (
    <div>
      <HeroCarousel />

      <section id="new-arrivals">
        <ProductCarousel items={newArrivals} title="New Arrival" />
      </section>
      <AdsSection />

      <section id="formal">
        <ProductCarousel items={formalShoes} title="Formal Shoes" />
      </section>

      <LimeLight />


      <section id="casual">
        <ProductCarousel items={casualShoes} title="Casual Shoes" />
      </section>
      <FeedbackDisplay />
      <Footer />
    </div>
  );
};

export default HomePage;
