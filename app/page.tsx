"use client";

import { useState, useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import NewArrivalCarousel from "@/components/NewArrivalCarousel";
import AdsSection from "@/components/AdsSection";
import { useAppDispatch } from "@/store/hook";
import { setLoading } from "@/store/features/loadingSlice";
import { fetchData } from "@/utils/fetchData";

// Custom hook for fetching new arrivals
const useNewArrivals = () => {
  const dispatch = useAppDispatch();
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  const loadData = async () => {
    try {
      const data = await fetchData("media");
      const arrivals =
        data?.docs?.map(
          (item: { url: string; alt?: string; price?: number }) => ({
            image: item.url,
            title: item.alt || "New Arrival",
            price: item.price ?? 0,
          })
        ) || [];
      setNewArrivals(arrivals);
    } catch (err) {
      console.error("Error fetching media data:", err);
      setNewArrivals([]); // Fallback to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  // Call loadData immediately when the hook is used
  if (isLoading) {
    loadData();
  }

  return { newArrivals, isLoading };
};

const HomePage = () => {
  const { newArrivals } = useNewArrivals();

  return (
    <div>
      <HeroCarousel />
      <NewArrivalCarousel newArrivals={newArrivals} />
      <AdsSection />
    </div>
  );
};

export default HomePage;
