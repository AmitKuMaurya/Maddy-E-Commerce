import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getProducts } from '../Redux/product/Actions/product.action';
import Loading from './Loading skeleton/Loading';
import ProductCard from './ProductCard';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider/Slider"
import Typography from "@material-ui/core/Typography/Typography";
import "./AllProduct.css";
// import {useAlert} from "react-alert"

const categories = [
  "Laptop",
  "grocery",
  "cloths",
  "Tops",
  "Camera",
  "SmartPhones",
  "Suit",
  "Book",
  "Electronics",
  "Shoes",
  "Furniture",
  "Music",
];


function AllProduct(){

  const dispatch = useDispatch();
  // const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { products, loading, error, productsCount, resultPerPage,filteredProductsCount } = useSelector(
    (state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  useEffect(() => {
    // if(error){
    //   alert.error(error);
    // }
    dispatch(getProducts(currentPage,price,category,ratings));
  }, [dispatch,currentPage,price,category,ratings,error]);
  console.log(category);
  let count = filteredProductsCount;

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          <>
      
            <h2 className='productsHeading'>Products</h2>

            <div className="products" >
              {
                products && products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              }
            </div>

            <div className="filterBox">

              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={10000}
              />

              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>


              <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

            </div>
           
            {resultPerPage < count &&  <div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>}

          </>
        )}
    </>
  )
}

export default AllProduct