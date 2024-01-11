import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dialog,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { paymentsuccess } from "../../../Api/companyApi";

export default function Payment({ Secret, selected }) {
  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    console.log(error, "iiiiiiiiiiiiiiiiiiiiiiiiiiiii");

    if (paymentIntent) {
      let subscriptionStatus = {
        paymentstatus: paymentIntent.status,
        amount: selected.amount,
        type: selected.type,
      };
      console.log(paymentIntent, "payment intent");
      const response = await paymentsuccess(subscriptionStatus);
      console.log(response, "out");
      if (response.data.created) {
        console.log(response, "inside");
        navigate("/company/success",{state:{amount:selected.amount}})
      }
    }
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <Chip
        value="continue"
        className="text-center bg-[#023E8A]"
        size="sm"
        onClick={handleOpen}
      />
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none rounded-none"
      >
        <Card className="w-full max-w-[30rem] rounded-none">
          <CardBody>
            <div className="flex justify-between">
              <Typography>Cunsultation Fee</Typography>
              <Typography>
                ₹{selected.amount} {selected.type}
              </Typography>
            </div>
            <Tabs value="card" className="overflow-visible">
              <TabsHeader className="relative z-0 "></TabsHeader>
              <TabsBody className="!overflow-x-hidden !overflow-y-visible">
                <TabPanel value="card" className="p-0">
                  <main className="flex-grow flex items-center justify-center shadow-none">
                    <form
                      id="payment-form"
                      onSubmit={handleSubmit}
                      className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md mx-auto"
                    >
                      <LinkAuthenticationElement
                        id="link-authentication-element"
                        onChange={(e) => setEmail(e.target.value)}
                        class="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                      <PaymentElement
                        id="payment-element"
                        options={paymentElementOptions}
                        class="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                      <button
                        disabled={isLoading || !stripe || !elements}
                        id="submit"
                        className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 my-1 rounded-md shadow-md hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring focus:ring-teal-300"
                      >
                        <span id="button-text">
                          {isLoading ? (
                            <div className="spinner" id="spinner"></div>
                          ) : (
                            "Pay now"
                          )}
                        </span>
                      </button>
                      {message && (
                        <div id="payment-message" className="mt-4 text-red-500">
                          {message}
                        </div>
                      )}
                    </form>
                  </main>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                    secure and encrypted
                  </Typography>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
        <Card className="w-full max-w-[30rem] rounded-none">
          
        </Card>
      </Dialog>
    </>
  );
}
