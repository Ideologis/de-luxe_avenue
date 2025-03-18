"use client";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { updateQuantity, removeFromCart } from "@/store/features/cartSlice";
import { setLoading } from "@/store/features/loadingSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// // Define the type for cart items
// interface CartItem {
//   productKey: string;
//   image: string;
//   title: string;
//   color?: string;
//   size?: string;
//   price: number;
//   quantity: number;
//   feedback?: string;
// }

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => Object.values(state.cart.items));
  useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  const [discountCode, setDiscountCode] = useState("");

  const handleContinueShopping = () => {
    dispatch(setLoading(true));
    router.push("/");
  };

  // Calculate totals based on cart state
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.reduce(
    (sum, item) => sum + (item.quantity === 1 ? 5.0 : 0),
    0
  );
  const grandTotal = subtotal + shipping;

  const handleQuantityChange = (productKey: string, quantity: number) => {
    // Ensure quantity is at least 1
    const newQuantity = Math.max(1, quantity);
    dispatch(updateQuantity({ productKey, quantity: newQuantity }));
  };

  const handleRemoveItem = (productKey: string) => {
    dispatch(removeFromCart(productKey));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-7 gap-4 font-semibold text-gray-700 border-b pb-2 mb-4 text-sm uppercase tracking-wide">
          <div className="col-span-2">Product Details</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Shipping</div>
          <div>Subtotal</div>
          <div>Action</div>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-4">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productKey}
              className="grid grid-cols-7 gap-4 items-center py-4 border-b"
            >
              <div className="col-span-2 flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                </div>
              </div>
              <div className="text-gray-900">₦{item.price.toFixed(2)}</div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.productKey, item.quantity - 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.productKey, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <div className="text-gray-900">
                {item.quantity > 1 ? "FREE" : "₦5.00"}
              </div>
              <div className="text-gray-900">
                ₦
                {(
                  item.price * item.quantity +
                  (item.quantity === 1 ? 5.0 : 0)
                ).toFixed(2)}
              </div>
              <div>
                <button
                  onClick={() => handleRemoveItem(item.productKey)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between mt-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Discount Codes
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            Enter your coupon code if you have one
          </p>
          <div className="flex space-x-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-1/2"
              placeholder="Enter coupon code"
            />
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Apply Coupon
            </button>
          </div>
          <button
            onClick={handleContinueShopping}
            className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-900"
          >
            Continue Shopping
          </button>
        </div>
        <div className="text-right">
          <p className="text-gray-900">Sub Total: ₦{subtotal.toFixed(2)}</p>
          <p className="text-gray-900">Shipping: ₦{shipping.toFixed(2)}</p>
          <p className="font-semibold text-lg text-gray-900 mt-2">
            Grand Total: ₦{grandTotal.toFixed(2)}
          </p>
          <Link href="/checkout">
            <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
