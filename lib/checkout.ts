import { CartItem } from "@/store/features/cartSlice";

export function generateWhatsAppCheckoutLink(
  cartItems: CartItem[],
  subtotal: number,
  shipping: number,
  grandTotal: number,
  whatsappNumber: string = "+2349013428561",
  currency: string = "₦",
  orderId?: string
): string {
  // Format individual items
  const formattedItems = cartItems
    .map((item) => {
      return `*${item.title}*  
- Quantity: ${item.quantity}  
- Price: ${currency}${item.price.toFixed(2)}  
- Total: ${currency}${(item.price * item.quantity).toFixed(2)}\n`;
    })
    .join("\n");

  // Format order summary
  const orderSummary = `🛒 *Order Summary* ${
    orderId ? `(Order #${orderId})` : ""
  }

${formattedItems}
*Subtotal:* ${currency}${subtotal.toFixed(2)}
*Shipping:* ${currency}${shipping.toFixed(2)}
*Grand Total:* ${currency}${grandTotal.toFixed(2)}

Please confirm this order and provide payment details.`;

  // Encode order data for slug
  const orderSlug = encodeURIComponent(
    JSON.stringify({
      items: cartItems,
      subtotal,
      shipping,
      grandTotal,
      orderId,
      currency,
    })
  );

  // Use slug-based URL instead of query param
  const orderConfirmationUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/order/${orderSlug}`;

  // Full message with view details link
  const fullMessage = `${orderSummary}

📋 *View Full Order Details:*
${orderConfirmationUrl}`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(fullMessage);

  // Generate WhatsApp link
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}
