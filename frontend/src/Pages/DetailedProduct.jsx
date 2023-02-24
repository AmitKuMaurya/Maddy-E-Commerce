import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./DetailedProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProductDetails } from "../Redux/product/Actions/product.action";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../components/ReviewCard";
import Loading from "../components/Loading skeleton/Loading";
import { addItemsToCart } from "../Redux/cart/action";
// import {useAlert} from "react-alert"
function DetailedProduct() {
  const dispatch = useDispatch();
  const params = useParams();
  // const alert = useAlert()
  const { id } = useParams();
  // console.log(id);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  // console.log();

  // const {user} = useSelector((state)=> state.user);
  // console.log(user._id);

  useEffect(() => {

    // if(error){
    //   return alert.error(error);
    // }
    dispatch(getProductDetails(id));
  }, [dispatch,id,error]);

  const options = {
    edit : false,
    color : "rgba(20,20,20,0.1)",
    activeColor : "tomato",
    size : window.innerWidth < 600 ? 20 : 25,
    value : product.ratings,
    ishalf : true
  }

  const [quantity, setQuantity] = useState(1);
  console.log(quantity);
  const increaseQuantity = () =>  {
    if(product.stock <= quantity) return
    const qty = quantity + 1;
    setQuantity(qty);
  }
  const decreaseQuantity = () =>  {
    if(1 >= quantity) return
    const qty = quantity - 1;
    setQuantity(qty);
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id,quantity))
    alert("Item added to Cart");
  }

  return (
    <>
    { loading  ? <Loading/> : (<>
      <div className="ProductDetails">
        <div >
          <Carousel>
            {product.images &&
              product.images.map((ele, i) => (
                <img style={{marginLeft: "11rem"}}

                  className="CarouselImage"
                  src={ele.url}
                  key={ele.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars key={product._id} {...options} />
            <span>({product.numOfReviews} Reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{product.price}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
            </div>
            <p>
              Status :
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>
          <button className="submitReview">Submit Review</button>
        </div>
      </div>

      <h3  className="reviewsHeading">Reviews</h3>

      { product.reviews && product.reviews[0] ? (
        <div className="reviews">
          { product.reviews && 
          product.reviews.map((review) => <ReviewCard review={review} />)}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </>)}
    </>
  );
}

export default DetailedProduct;
