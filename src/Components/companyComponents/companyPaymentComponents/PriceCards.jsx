import { CheckIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { stripePayment } from "../../../Api/companyApi";

//publishable API

export function PriceCards() {
  const location = useLocation();
  const { price, type } = location.state;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {}, [price]);

  const appearance = {
    theme: "stripe",
    variables: {
      fontFamily: "Sohne, system-ui, sans-serif",
      fontWeightNormal: "500",
      borderRadius: "8px",
      colorBackground: "#0A2540",
      colorPrimary: "#EFC078",
      accessibleColorOnColorPrimary: "#1A1B25",
      colorText: "black",
      colorTextSecondary: "white",
      colorTextPlaceholder: "#727F96",
      tabIconColor: "white",
      logoColor: "dark",
    },
    rules: {
      ".Input, .Block": {
        backgroundColor: "transparent",
        border: "1.5px solid var(--colorPrimary)",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="flex justify-center gap-10 p-5">
      <div className="">
        <Card className="rounded-none border shadow-lg w-[30rem] ">
          <CardBody>
            <Typography variant="h4" className="font-semibold m-5">
              Selected payment
            </Typography>
            <Card
              color="blue"
              variant="gradient"
              className="w-full max-w-full h-[24rem] p-5 border "
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0  rounded-none border-b border-white/10 pb-4 text-center"
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal uppercase"
                >
                  {type}
                </Typography>
                <Typography
                  variant="h1"
                  color="white"
                  className="mt-1 flex justify-center gap-1 text-7xl font-normal"
                >
                  <span className="mt-1 text-lg">₹</span>
                  {price}{" "}
                  <span className="self-end text-xl">
                    {(type == "Basic" && "1/m") ||
                      (type == "Standerd" && "6/m") ||
                      (type == "Premium" && "1/y")}
                  </span>
                </Typography>
              </CardHeader>
              <CardBody className="p-0">
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-4">
                    <span className="rounded-full border border-white/20 bg-white/20 p-1">
                      <CheckIcon />
                    </span>
                    <Typography className="font-normal">
                      5 team members
                    </Typography>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="rounded-full border border-white/20 bg-white/20 p-1">
                      <CheckIcon />
                    </span>
                    <Typography className="font-normal">
                      200+ components
                    </Typography>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="rounded-full border border-white/20 bg-white/20 p-1">
                      <CheckIcon />
                    </span>
                    <Typography className="font-normal">
                      40+ built-in pages
                    </Typography>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="rounded-full border border-white/20 bg-white/20 p-1">
                      <CheckIcon />
                    </span>
                    <Typography className="font-normal">
                      1 year free updates
                    </Typography>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="rounded-full border border-white/20 bg-white/20 p-1">
                      <CheckIcon />
                    </span>
                    <Typography className="font-normal">
                      Life time technical support
                    </Typography>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
   
    </div>
  );
}
