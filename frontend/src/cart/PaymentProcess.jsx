import React, { useEffect, useRef, useState } from "react";
import CheckoutStepper from "../cart/CheckoutStepper";
import { useSelector, useDispatch } from "react-redux";
import TopTitle from "../components/TopTitle"
import { Typography } from "@material-ui/core";
// import { useAlert } from "react-alert";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./PaymentProcess.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
// import { createOrder } from "../Redux/order/action.order";

const PaymentProcess = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(false);
    const [clientSecret, setClientSecret] = useState("");

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    //   console.log("shippingInfo :",shippingInfo);
    //   console.log("cartItems :",cartItems);
    const { user } = useSelector((state) => state.user);
    //   const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    // Stripe logic is goinig to be there 

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {

            fetch("http://localhost:8080/create-payment-intent", {
                method: "POST",
                body: JSON.stringify({}),
            }).then(async (result) => {
                const { clientSecret } = await result.json();
                setClientSecret(clientSecret);
            });
            const client_secret = clientSecret;
            console.log("Frontend : ", client_secret);


            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    // elements,
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                // setIsLoading(false);
                payBtn.current.disabled = false;
                alert(result.error.message);

            } else {

                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    // dispatch(createOrder(order));
                    navigate("/success");
                } else {
                    alert("There might be some issues while processing payment");
                }
            }
        } catch (error) {
            // setIsLoading(false);
            payBtn.current.disabled = false;
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        // if (error) {
        //   alert(error);
        // dispatch(clearErrors());
        // }



    }, []);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!stripe || !elements) {
    //         // Stripe.js has not yet loaded.
    //         // Make sure to disable form submission until Stripe.js has loaded.
    //         return;
    //     }

    //     setIsLoading(true);

    //     const { error } = await stripe.confirmPayment({
    //         elements,
    //         confirmParams: {
    //             // Make sure to change this to your payment completion page
    //             return_url: "http://localhost:3000",
    //         },
    //     });

    //     // This point will only be reached if there is an immediate error when
    //     // confirming the payment. Otherwise, your customer will be redirected to
    //     // your `return_url`. For some payment methods like iDEAL, your customer will
    //     // be redirected to an intermediate site first to authorize the payment, then
    //     // redirected to the `return_url`.
    //     if (error.type === "card_error" || error.type === "validation_error") {
    //         setMessage(error.message);
    //     } else {
    //         setMessage("An unexpected error occurred.");
    //     }

    //     setIsLoading(false);
    // };

    const paymentElementOptions = {
        layout: "tabs"
    }


    return (
        <>
            < TopTitle title="Payment" />
            <CheckoutStepper activeStep={2} />
            <div className="paymentContainer">
                {/* <form className="payment-form" onSubmit={submitHandler}> */}
                    {/* <LinkAuthenticationElement
                        className="link-authentication-element"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PaymentElement className="payment-element" options={paymentElementOptions} />
                    <button disabled={!stripe || !elements} className="submit">
                        <span className="button-text">
                            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                        </span>
                    </button> */}
                    {/* Show any error or success messages */}
                    {/* {message && <div className="payment-message">{message}</div>} */}
                {/* </form> */}

                <form className="paymentForm" onSubmit={submitHandler} >
                    {/* <PaymentElement/> */}
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    /></form>
            </div>
        </>
    );
};

export default PaymentProcess;



// import { useState } from "react";
// import { useStripe, useElements, CardCvcElement, CardNumberElement, CardExpiryElement } from "@stripe/react-stripe-js";
// import { PaymentElement } from "@stripe/react-stripe-js";

// export default function PaymentProcess() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsProcessing(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: `${window.location.origin}/completion`,
//       },
//     });

//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occured.");
//     }

//     setIsProcessing(false);
//   };

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <PaymentElement id="payment-element" options={paymentElementOptions} />
//       <button disabled={isProcessing || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isProcessing ? "Processing ... " : "Pay now"}
//         </span>
//       </button>
//       {/* Show any error or success messages */}
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// }
