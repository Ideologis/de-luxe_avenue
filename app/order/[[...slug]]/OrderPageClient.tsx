"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hook";
import { selectGrandTotal } from "@/store/features/cartSlice";
import { generateWhatsAppCheckoutLink } from "@/lib/checkout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import { CartItem } from "@/store/features/cartSlice";

interface OrderData {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  grandTotal: number;
  currency: string;
}
interface OrderPageProps {
  slug: string[];
}
const useOrderData = (orderSlug?: string) => {
  const cartItems = useAppSelector(
    (state: { cart: { items: { [key: string]: CartItem } } }) =>
      Object.values(state.cart.items)
  );
  const reduxGrandTotal = useAppSelector(selectGrandTotal);

  if (!orderSlug) {
    const subtotal = cartItems.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );
    const shipping = cartItems.reduce(
      (sum: number, item: CartItem) => sum + (item.quantity === 1 ? 5 : 0),
      0
    );

    return {
      items: cartItems,
      subtotal,
      shipping,
      grandTotal: reduxGrandTotal,
      currency: "₦",
      isConfirmationView: false,
    };
  }

  try {
    const decoded: OrderData = JSON.parse(decodeURIComponent(orderSlug));
    return {
      items: decoded.items || cartItems,
      subtotal: decoded.subtotal || 0,
      shipping: decoded.shipping || 0,
      grandTotal: decoded.grandTotal || reduxGrandTotal,
      currency: decoded.currency || "₦",
      isConfirmationView: true,
    };
  } catch (error) {
    console.error("Invalid order data:", error);
    return {
      items: cartItems,
      subtotal: 0,
      shipping: 0,
      grandTotal: reduxGrandTotal,
      currency: "₦",
      isConfirmationView: false,
    };
  }
};

const OrderPage = ({ slug }: OrderPageProps) => {
  const [copied, setCopied] = useState(false);
  const {
    items,
    subtotal,
    shipping,
    grandTotal,
    currency,
    isConfirmationView,
  } = useOrderData(slug[0]);

  const whatsappLink = generateWhatsAppCheckoutLink(
    items,
    subtotal,
    shipping,
    grandTotal,
    "+2349013428561",
    currency
  );

  const handleOpenWhatsApp = () => {
    window.open(whatsappLink, "_blank");
  };
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(whatsappLink)
      .then(() => {
        setCopied(true);
        toast.success("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast.error("Failed to copy link"));
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/cart" passHref>
            <Button variant="secondary" size="icon" aria-label="Go back">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {isConfirmationView ? "Order Confirmation" : "Your Order"}
          </h1>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>
              {isConfirmationView
                ? "Thank you for your purchase! Your order has been received."
                : "Review your items before proceeding to checkout"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-4">
              {items.map((item: CartItem) => (
                <div key={item.productKey} className="flex items-start gap-4">
                  {item.image && (
                    <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {currency}
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p>
                  {currency}
                  {subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Shipping</p>
                <p>
                  {currency}
                  {shipping.toFixed(2)}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p className="text-primary">
                  {currency}
                  {grandTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            {!isConfirmationView && (
              <>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  onClick={handleOpenWhatsApp}
                  className="w-full"
                >
                  <Button className="w-full" size="lg">
                    Proceed to WhatsApp Checkout
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="w-full"
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? "Copied!" : "Copy Checkout Link"}
                </Button>
              </>
            )}
            {isConfirmationView && (
              <Link href="/" className="w-full">
                <Button className="w-full" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrderPage;
