import HeroCarousel from "../components/HeroCarousel";
import NewArrivalCarousel from "../components/NewArrivalCarousel";
import React from "react";
export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <NewArrivalCarousel />
    </div>
  );
}
