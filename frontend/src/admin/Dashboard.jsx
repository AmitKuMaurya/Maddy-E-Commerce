import React, { useEffect } from "react";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../Redux/product/Actions/product.action";
import TopTitle from "../components/TopTitle.jsx";
import SideBarComp from "./SideBarComp.jsx";
import { getAllOrders } from "../Redux/order/action.order";
import { getAllUsers } from "../Redux/user/user.action";

import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS,CategoryScale, LinearScale,PointElement,LineElement,ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, CategoryScale, LinearScale,PointElement,LineElement,Tooltip, Legend);


const Dashboard = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const { products } = useSelector((state) => state.products);
console.log("products :",products)
  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

    // console.log(outOfStock);
    // console.log(products.length)

  useEffect(() => {
    dispatch(getAdminProduct(token));
    dispatch(getAllOrders(token));
    dispatch(getAllUsers(token));
  }, [dispatch,token]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        borderColor: 'rgb(255, 99, 132)',
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
      labels: ["Out of Stock", "In Stock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          // borderWidth: 1,
          data: [outOfStock, products.length - outOfStock],
        },
      ],
  };

  return (
    <div className="dashboard">
      <TopTitle title="Dashboard - Admin Panel" />
      <SideBarComp />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState}  />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;