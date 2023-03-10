import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";


function ProductCard({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    ishalf: true
  }

  return (
    <>
      <Link className='productCard' to={`product/${product._id}`}>
        <Fragment>
          <img src={product.images[0].url} alt={product.name} />
          <p>{product.name}</p>
          <div>
            <ReactStars {...options} /> <span>{product.numOfReviews} reviews</span>
          </div>
          <span>{`₹${product.price}`}</span>
        </Fragment>
      </Link>

    </>
  )
}

export default ProductCard