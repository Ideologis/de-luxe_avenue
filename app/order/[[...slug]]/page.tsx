import OrderPageClient from "./OrderPageClient";
import { NextPage } from "next"; // Import NextPage from Next.js
import { use } from "react";

type Params = Promise<{ slug: string[] }>; // Adjusted to match your slug type

// Use NextPage to type the props of the OrderPage component
const OrderPage: NextPage<{ params: Params }> = ({ params }) => {
  const resolvedParams = use(params);

  const slug = resolvedParams.slug || [];

  return <OrderPageClient slug={slug} />;
};

export default OrderPage;
