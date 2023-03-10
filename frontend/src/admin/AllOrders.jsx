import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProductsAdmin.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deleteOrder,
  getAllOrders,
} from "../Redux/order/action.order";
import * as Types from "../Redux/order/actionTypes.order";
import TopTitle from "../components/TopTitle";
import SideBarComp from "./SideBarComp";

const AllOrders = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"));

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.modifyOrder);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id,token));
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (deleteError) {
      alert(deleteError);
    }

    if (isDeleted) {
      alert("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: Types.DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders(token));
  }, [dispatch, error ,deleteError, isDeleted,token,navigate]);
// deleteError, isDeleted
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <TopTitle title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBarComp />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AllOrders;