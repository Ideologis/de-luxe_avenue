"use client";


import HeroCarousel from "@/components/HeroCarousel";
import NewArrivalCarousel from "@/components/NewArrivalCarousel";
import AdsSection from "@/components/AdsSection";





const HomePage = () => {
  

  return (
    <div>
      <HeroCarousel />
      <NewArrivalCarousel  />
      <AdsSection />
    </div>
  );
};

export default HomePage;
