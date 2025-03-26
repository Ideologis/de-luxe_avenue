import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  backgroundColor: string;
}

export default function FeaturedProducts() {
  const products: Product[] = [
    {
      id: "1",
      name: "Black Sweatshirt with...",
      brand: "Jimmy's Brand",
      price: 123.0,
      image: "/lime-01.jpg",
      backgroundColor: "#e5e5e5",
    },
    {
      id: "2",
      name: "Line Pattern Black H...",
      brand: "A5's Brand",
      price: 37.0,
      image: "/lime-02.jpg",
      backgroundColor: "#e9b8b8",
    },
    {
      id: "3",
      name: "Black Shorts",
      brand: "MK's Brand",
      price: 37.0,
      image: "/lime-03.jpg",
      backgroundColor: "#ff6b35",
    },
    {
      id: "4",
      name: "Lavender Hoodie with...",
      brand: "Nike's Brand",
      price: 119.0,
      image: "/lime-04.jpg",
      backgroundColor: "#e9b8d0",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-purple-600 pl-3">
          In The Limelight
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="relative h-80 w-full overflow-hidden">
              <button
                className="absolute top-3 right-3 z-10 rounded-full p-1.5 bg-white/80 hover:bg-white transition-colors"
                aria-label="Add to favorites"
              >
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
              </button>

              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-3 bg-white">
              <Link href={`/products/${product.id}`} className="block">
                <h3 className="text-sm font-medium text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                <p className="text-sm font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
