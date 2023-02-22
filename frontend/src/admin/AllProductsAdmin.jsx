import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProductsAdmin.css";
import { useSelector, useDispatch } from "react-redux";
import {getAdminProduct,deleteProduct} from "../Redux/product/Actions/product.action";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TopTitle from "../components/TopTitle";
import SideBarComp from "./SideBarComp";
import * as Types from "../Redux/product/ActionTypes/product.action.types";

const AllProductsAdmin = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
//   const alert = useAlert();

const token = JSON.parse(localStorage.getItem("token"));
// console.log(token);
  const { error, products } = useSelector((state) => state.products);
  // console.log(success)
    // console.log(products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.modifyProduct
  );
  console.log(isDeleted);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id,token));
  };
  
  useEffect(() => {
    if (error) {
      alert(error);
    //   dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
    //   dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Product Deleted Successfully");
      // navigate("/admin/dashboard");
      dispatch({ type: Types.DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct(token));
  }, [dispatch, error, navigate]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>deleteProductHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <TopTitle title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBarComp />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default AllProductsAdmin;