"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    category: "Sneakers",
    title: "Urban Explorer",
    description: "comfortable / stylish / versatile",
    buttonText: "Shop Now",
    image: "/shoe.jpg", // Keeping the original image
  },
  {
    category: "Boots",
    title: "Winter Collection",
    description: "warm / durable / trendy",
    buttonText: "Discover",
    image: "/shoe2.jpg", // Keeping the original image
  },
];

const HeroCarousel = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="relative transition-transform duration-700 ease-in-out"
        effect="fade"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
              {/* Base Image Layer - Always at bottom */}
              <div className="absolute inset-0 z-10 md:hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Mobile-only dark gradient overlay */}
              <div className="absolute inset-0 z-20 md:hidden bg-gradient-to-b from-gray-900/60 via-gray-800/70 to-gray-900/80" />

              {/* Desktop-only background color */}
              <div className="absolute inset-0 z-15 hidden md:block bg-gray-800" />
              <div className="container relative z-30 mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-8">
                {/* Text Content */}
                <div className="text-white max-w-lg text-center md:text-left md:mr-8">
                  <h3 className="text-lg font-semibold mb-2">
                    {slide.category}
                  </h3>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg mb-6">{slide.description}</p>
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium shadow-md hover:bg-gray-100 transition-colors">
                    {slide.buttonText}
                  </button>
                </div>

                {/* Image for Desktop */}
                <div className="hidden md:block p-4 rounded-lg shadow-xl relative z-30 bg-white/5 backdrop-blur-sm">
                  <div className="relative">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={400}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 rounded-lg shadow-inner pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="swiper-pagination absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40" />
    </div>
  );
};

export default HeroCarousel;
