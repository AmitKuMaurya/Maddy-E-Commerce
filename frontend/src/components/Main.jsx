import React, { useEffect } from 'react'
import "./Main.css";
// import Product from "./Product";
import TopTitle from "./TopTitle";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../Redux/product/Actions/product.action';
import Loading from './Loading skeleton/Loading'
// import { useAlert } from "react-alert";
import ProductCard from './ProductCard';

function Main() {
    const dispatch = useDispatch();
    // const alert = useAlert();
    const { loading, error, products } = useSelector((state) => state.products)

    useEffect(() => {
        // if (error) {
        //     return alert.error(error);
        //   }
        dispatch(getProducts());
    }, [dispatch, error]);

    // console.log(products);

    return (
        <>
            {loading ? <Loading /> : <>

                <TopTitle title={"Landing Page"} />

                <div className='banner'>

                    <a href="#container">

                    </a>
                </div>

                <h2 className='homeHeading'>Best Products oF Year</h2>

                <div className='container' id='container'>
                    {products && products.map(product => <ProductCard key={product.name.toString()} product={product} />)}

                </div>
            </>}
        </>
    )
}

export default Main