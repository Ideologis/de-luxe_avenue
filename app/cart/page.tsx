"use client";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import {
  updateQuantity,
  removeFromCart,
  selectGrandTotal,
} from "@/store/features/cartSlice";

import { addFeedback } from "@/store/features/feedbackSlice";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CartItem {
  productKey: string;
  image: string;
  title: string;
  price: number;
  quantity: number; // Added quantity property to CartItem interface
  feedback: string; // Added feedback property to CartItem interface
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useAppSelector(
    (state: { cart: { items: { [key: string]: CartItem } } }) =>
      Object.values(state.cart.items)
  );

  const grandTotal = useAppSelector(selectGrandTotal);

  const handleCheckout = () => {
    setIsLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      setIsLoading(false);
      router.push("/order"); // Changed "/Order" to "/order" to match the correct route
    }, 5000);
  };

  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();

    if (feedbackName.trim() && feedbackMessage.trim()) {
      // Assuming you want to add feedback to the first item in the cart
      const firstItemKey = cartItems[0]?.productKey; // Get the first item's key
      if (firstItemKey) {
        dispatch(
          addFeedback({
            name: feedbackName,
            message: feedbackMessage,
          })
        );
        dispatch(
          updateQuantity({
            productKey: firstItemKey,
            quantity: 1,
            // feedback: feedbackMessage,
          })
        ); // Update feedback
        // Clear the form after submission
        setFeedbackName("");
        setFeedbackMessage("");
      }
    }
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

  const handleQuantityChange = (productKey: string, quantity: number) => {
    // Ensure quantity is at least 1
    const newQuantity = Math.max(1, quantity);
    dispatch(updateQuantity({ productKey, quantity: newQuantity }));
  };

  const handleRemoveItem = (productKey: string) => {
    dispatch(removeFromCart(productKey));
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden max-w-full mx-auto px-6 py-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center py-10">
              <p className="text-center text-gray-500 mb-6 text-lg">
                Your cart is empty.
              </p>
              <button
                onClick={handleContinueShopping}
                className="w-full px-6 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-md text-lg font-medium"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productKey}
                className="flex flex-col p-5 mb-5 border-b last:border-b-0"
              >
                <div className="flex items-start space-x-5 mb-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => handleRemoveItem(item.productKey)}
                        className="text-gray-400 hover:text-red-500 transition-colors text-xl"
                      >
                        🗑️
                      </button>
                    </div>
                    <p className="text-gray-900 font-medium mb-3 text-base">
                      ₦{item.price.toFixed(2)}
                    </p>
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-1 border rounded-xl overflow-hidden w-fit">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productKey,
                              item.quantity > 1 ? item.quantity - 1 : 1
                            )
                          }
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-lg font-medium"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productKey,
                              item.quantity + 1
                            )
                          }
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-lg font-medium"
                        >
                          +
                        </button>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">
                          Shipping: {item.quantity > 1 ? "FREE" : "₦5.00"}
                        </p>
                        <p className="font-medium text-lg">
                          ₦
                          {(
                            item.price * item.quantity +
                            (item.quantity === 1 ? 5.0 : 0)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <>
              <div className="bg-white p-6 rounded-2xl shadow mb-6 mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Share Your Feedback
                </h3>
                <p className="text-base text-gray-500 mb-4">
                  We value your opinion! Let us know what you think
                </p>
                <form
                  onSubmit={handleSubmitFeedback}
                  className="flex flex-col space-y-4"
                >
                  <input
                    type="text"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    className="p-4 border border-gray-300 rounded-xl w-full text-base"
                    placeholder="Your Name"
                    required
                  />
                  <textarea
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    className="p-4 border border-gray-300 rounded-xl w-full text-base min-h-[100px]"
                    placeholder="Your Message"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-md text-lg font-medium"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow mb-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-base">
                    <p className="text-gray-600">Sub Total:</p>
                    <p className="text-gray-900 font-medium">
                      ₦{subtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between text-base">
                    <p className="text-gray-600">Shipping:</p>
                    <p className="text-gray-900 font-medium">
                      ₦{shipping.toFixed(2)}
                    </p>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <p className="text-gray-900 font-semibold text-lg">
                        Grand Total:
                      </p>
                      <p className="text-gray-900 font-semibold text-xl">
                        ₦{grandTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href="order" className="block w-full">
                    <Button
                      onClick={handleCheckout}
                      className="w-full py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-md text-lg font-medium"
                    >
                      <span className="flex items-center justify-center">
                        {isLoading ? (
                          <span className="animate-pulse-gentle">
                            Processing...
                          </span>
                        ) : (
                          <>
                            Checkout
                            <ArrowRight
                              size={16}
                              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                            />
                          </>
                        )}
                      </span>
                    </Button>
                  </Link>

                  <button
                    onClick={handleContinueShopping}
                    className="w-full py-4 border border-gray-300 rounded-xl hover:bg-gray-100 text-gray-900 transition-colors text-lg font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block max-w-5xl mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
          Shopping Cart
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700 border-b pb-4 mb-4">
            <div className="col-span-5">Product Details</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-1 text-center">Shipping</div>
            <div className="col-span-1 text-right">Subtotal</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center py-12">
              <p className="text-center text-gray-600 mb-6 text-lg font-medium">
                Your cart is empty. Lets fill it up!
              </p>
              <button
                onClick={handleContinueShopping}
                className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl hover:from-purple-600 hover:to-purple-800 transition-all duration-300 shadow-lg text-lg font-semibold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productKey}
                className="grid grid-cols-12 gap-4 items-center p-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="col-span-5 flex items-center space-x-4">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="col-span-2 text-center font-medium text-gray-800">
                  ₦{item.price.toFixed(2)}
                </div>
                <div className="col-span-2 text-center">
                  <div className="inline-flex items-center space-x-1 border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.productKey,
                          item.quantity > 1 ? item.quantity - 1 : 1
                        )
                      }
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-lg font-medium"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-base font-medium text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productKey, item.quantity + 1)
                      }
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-lg font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-span-1 text-center text-sm text-gray-600">
                  {item.quantity > 1 ? "FREE" : "₦5.00"}
                </div>
                <div className="col-span-1 text-right font-semibold text-gray-900">
                  ₦
                  {(
                    item.price * item.quantity +
                    (item.quantity === 1 ? 5.0 : 0)
                  ).toFixed(2)}
                </div>
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => handleRemoveItem(item.productKey)}
                    className="text-gray-500 hover:text-red-600 transition-colors duration-200 text-xl"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-2 gap-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Share Your Feedback
            </h3>
            <p className="text-base text-gray-600 mb-4">
              We value your opinion! Let us know what you think
            </p>
            <form
              onSubmit={handleSubmitFeedback}
              className="flex flex-col space-y-4 col-span-2"
            >
              <input
                type="text"
                value={feedbackName}
                onChange={(e) => setFeedbackName(e.target.value)}
                className="p-4 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                placeholder="Your Name"
                required
              />
              <textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                className="p-4 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 min-h-[120px]"
                placeholder="Your Message"
                required
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl hover:from-purple-600 hover:to-purple-800 transition duration-300 shadow-lg text-lg font-semibold"
              >
                Submit Feedback
              </button>
            </form>
            <button
              onClick={handleContinueShopping}
              className="w-full mt-4 py-4 border border-gray-300 rounded-xl hover:bg-gray-100 text-gray-800 transition duration-200 text-lg font-semibold col-span-2"
            >
              Continue Shopping
            </button>
            <div className="space-y-4 mb-6 mt-6 col-span-2">
              <div className="flex justify-between text-lg">
                <p className="text-gray-600 font-medium">Sub Total:</p>
                <p className="text-gray-900 font-semibold">
                  ₦{subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between text-lg">
                <p className="text-gray-600 font-medium">Shipping:</p>
                <p className="text-gray-900 font-semibold">
                  ₦{shipping.toFixed(2)}
                </p>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between">
                  <p className="text-gray-900 font-bold text-xl">
                    Grand Total:
                  </p>
                  <p className="text-purple-600 font-bold text-2xl">
                    ₦{grandTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <Link href="order" className="block w-full col-span-2">
              <Button
                onClick={handleCheckout}
                // disabled={items.length === 0 || isLoading}
                className="w-full py-6 mt-2 shadow-sm group"
              >
                <span className="flex items-center">
                  {isLoading ? (
                    <span className="animate-pulse-gentle">Processing...</span>
                  ) : (
                    <>
                      Checkout
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </>
                  )}
                </span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
