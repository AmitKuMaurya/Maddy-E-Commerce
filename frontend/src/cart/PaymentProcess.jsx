import "./PaymentProcess.css";
import React, { useEffect, useRef } from "react";
import CheckoutStepper from "../cart/CheckoutStepper";
import { useSelector, useDispatch } from "react-redux";
import TopTitle from "../components/TopTitle"
import axios from "axios";
import { Typography } from "@material-ui/core";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import { createNewOrder } from "../Redux/order/action.order"
const PaymentProcess = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(false);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
      const { error,order } = useSelector((state) => state.newOrder);
        // console.log(order);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const orderObj = {
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

            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
              const { data } = await axios.post(
                "http://localhost:8080/create-payment-intent",
                paymentData,
                config
              );
                console.log(data.clientSecret);


            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(`${data.clientSecret}`, {
                payment_method: {
                    type : 'card',
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
            // console.log(result);
            if (result.error) {
                payBtn.current.disabled = false;
                alert(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    orderObj.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    // console.log(orderObj);
                    dispatch(createNewOrder(orderObj,token));
                    navigate("/success");
                } else {
                    alert("There might be some issues while processing payment");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            console.log(error);
            alert(error);
        }
    };

    useEffect(() => {
        if (error) {
          alert(error);
        }
    }, [error,navigate,dispatch]);


    return (
        <>
            < TopTitle title="Payment" />
            <CheckoutStepper activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e)=>submitHandler(e)} >
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
                        className="paymentFormBtn"/>
                    </form>
            </div>
        </>
    );
};

export default PaymentProcess;


