import React, { useEffect, useState } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import PaymentProcess from "./PaymentProcess"
import { loadStripe } from "@stripe/stripe-js";
const Payment = () => {

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/stripeapikey").then(async (r) => {
      const { secretApiKey } = await r.json();
      setStripePromise(loadStripe(secretApiKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
   <>
    {/* <div>Payment</div> */}
    { stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <PaymentProcess/>
        </Elements>
    )}
   </>
  )
}

export default Payment