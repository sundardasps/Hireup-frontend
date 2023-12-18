import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button, Card, CardBody, Chip, Dialog, Typography } from "@material-tailwind/react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

        const { paymentIntent, error } = await stripe.confirmPayment({
          elements,
          confirmParams: {},
          redirect: "if_required",
        });
    
        if(paymentIntent){
            alert()
          }
          
        if (error) {
          if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
          } else {
            console.error("Stripe Confirm Payment Error:", error);
            setMessage("An unexpected error occurred. Please try again.");
          }
        } else if (paymentIntent.status === "succeeded") {
          setMessage("Payment succeeded!");

          window.location.href = "/success"; // Change the URL accordingly
        } else {
          setMessage(`Payment status: ${paymentIntent.status}`);
        }
     

      
    

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
    <Card className="mx-auto w-auto  bg-blue-800">
    <form id="payment-form" onSubmit={handleSubmit}>
    <CardBody className="flex flex-col gap-4">
            <Typography  variant="h2" color="white">
             Stripe
            </Typography>

      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <button disabled={isLoading || !stripe || !elements} id="submit" className="text-white">
        <Button className="mt-3" id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> :"Pay now"}
        </Button>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="text-xs text-red-600">{message}</div>}
    </CardBody>
    </form>
    </Card>
    </>
  );
}