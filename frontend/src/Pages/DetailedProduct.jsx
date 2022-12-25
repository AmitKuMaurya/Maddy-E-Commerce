import React from "react";
import Carousel from "react-material-ui-carousel";
import "./DetailedProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProductDetails } from "../Redux/Actions/product.action";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../components/ReviewCard";
import Loading from "../components/Loading skeleton/Loading";
import {useAlert} from "react-alert"
function DetailedProduct() {
  const dispatch = useDispatch();
  const alert = useAlert()
  const { id } = useParams();
  console.log(id);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {

    if(error){
      return alert.error(error);
    }
    dispatch(getProductDetails(id));
  }, [dispatch,id,error,alert]);

  const options = {
    edit : false,
    color : "rgba(20,20,20,0.1)",
    activeColor : "tomato",
    size : window.innerWidth < 600 ? 20 : 25,
    value : product.ratings,
    ishalf : true
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
            <ReactStars {...options} />
            <span>({product.numOfReviews} Reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{product.price}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input type="number" value="1" />
                <button>+</button>
              </div>
              <button>Addd to Cart</button>
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
