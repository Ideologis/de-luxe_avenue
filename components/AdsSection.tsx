'use-client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
export default function AdsSection () {
  return (
    <section className='w-full overflow-hidden my-8 py-6 flex justify-center items-center'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className="LeftSection flex flex-col justify-center items-start p-8 text-white bg-[url('/forestBackground.png')] bg-cover bg-center rounded-l-lg">
          <div className='relative max-w-md'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 tracking-tight leading-tight'>
              WE MADE YOUR EVERYDAY FASHION BETTER!
            </h1>
            <p className='text-sm md:text-base opacity-90 mb-8 leading-relaxed'>
              In our journey to improve everyday fashion, euphoria presents
              EVERYDAY wear range - Comfortable & Affordable fashion 24/7
            </p>
            <Button className='bg-white text-black hover:bg-gray-100 hover:text-black border-white rounded-md px-6 py-2 h-10 font-medium transition-transform transform hover:scale-105'>
              <Link href='/shop'>Shop Now</Link>
            </Button>
          </div>
        </div>
        <div className='rightSection'>
          <Image
            src='/shoe2.10.jpg'
            width={500}
            height={300}
            alt='fashion'
            className='object-cover object-center rounded-r-lg'
          />
        </div>
      </div>
    </section>
  )
}
