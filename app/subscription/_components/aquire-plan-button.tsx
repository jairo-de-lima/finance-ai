"use client";
import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

type AquirePlanButtonProps = {
  planType: "basic" | "premium";
};

const AquirePlanButton = ({ planType }: AquirePlanButtonProps) => {
  const { user } = useUser();
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
      return;
    }

    await stripe.redirectToCheckout({ sessionId });
  };
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  if (planType === "basic" && hasPremiumPlan === true) {
    return null;
  }
  const buttonText =
    planType === "premium"
      ? hasPremiumPlan
        ? "Gerenciar Plano"
        : "Adquirir Plano"
      : "Fazer Upgrade";

  const buttonVariant =
    planType === "premium" ? (hasPremiumPlan ? "link" : "default") : "outline";

  if (hasPremiumPlan) {
    return (
      <Button
        className="w-full rounded-full border border-solid border-[#55b02d] font-bold"
        variant={buttonVariant}
        asChild
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          {buttonText}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="w-full rounded-full border border-solid border-[#55b02d] font-bold"
    >
      {buttonText}
    </Button>
  );
};

export default AquirePlanButton;
