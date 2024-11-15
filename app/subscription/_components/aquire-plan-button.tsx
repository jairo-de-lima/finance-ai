"use client";
import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      console.error("Stripe publishable key is not found");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
    );
    if (!stripe) {
      console.error("Stripe not found");
    }
    await stripe.redirectToCheckout({ sessionId });
  };
  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="w-full rounded-full font-bold"
    >
      Adquirir Plano
    </Button>
  );
};

export default AquirePlanButton;
