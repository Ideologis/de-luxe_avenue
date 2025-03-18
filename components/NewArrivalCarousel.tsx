'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addToCart, generateProductKey } from '@/store/features/cartSlice'
import { toast } from 'react-toastify'
import 'swiper/css'
import 'swiper/css/navigation'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'

type NewArrivalItem = {
  image: string
  title: string
  price: number
}

interface NewArrivalCarouselProps {
  newArrivals: NewArrivalItem[]
}

const NewArrivalCarousel: React.FC<NewArrivalCarouselProps> = ({
  newArrivals
}) => {
  const dispatch = useAppDispatch()

  const cartItems = useAppSelector(state => state.cart.items)

  const handleAddToCart = (item: NewArrivalItem) => {
    const productKey = generateProductKey(item)
    if (cartItems[productKey]) {
      toast.info(`${item.title} is already in your cart!`)
    } else {
      dispatch(
        addToCart({
          image: item.image,
          title: item.title,
          price: item.price,
          quantity: 1,
          feedback: ''
        })
      )
      toast.success(`${item.title} added to cart!`)
    }
  }

  return (
    <div className="px-8 py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl font-bold text-left m-8 px-4"
      >
        New Arrival
      </motion.h2>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="w-full"
      >
        {newArrivals.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="flex flex-col space-y-3">
                <motion.div
                  className="relative w-full h-64 overflow-hidden" // Adjusted for proper fitting
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={640} // Added width for proper fitting
                    height={300} // Added height for proper fitting
                    layout="intrinsic" // Changed to fill for proper fitting
                    objectFit="cover" // Ensures the image covers the container
                    unoptimized={true}
                    className="rounded-lg"
                  />
                </motion.div>
              </div>
              <div className="p-2 flex justify-between gap-4 items-center">
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-lg font-semibold"
                >
                  {item.title}
                </motion.h3>
                <p className="text-bold-600">
                  ₦{item.price !== undefined ? item.price.toFixed(2) : "N/A"}
                </p>
              </div>

              <Button
                onClick={() => handleAddToCart(item)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full border-white rounded-md px-6 py-2 h-10 font-medium transition-transform transform hover:scale-105"
              >
                Add to Cart
              </Button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default NewArrivalCarousel
