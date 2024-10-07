import React, {Fragment, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../layout/Loader'
import {Carousel} from 'react-bootstrap'

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import ListReviews from '../review/ListReviews'
import { getProductDetails,newReview, clearErrors } from '../../actions/productActions'


const ProductDetails = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    
    const params = useParams()

    const {loading, error, product} = useSelector(state => state.productDetails);
    const {user} = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)

  

    useEffect(() => {

        dispatch(getProductDetails(params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Reivew posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
        }
    }, [dispatch, error, alert, params.id]);


    


    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        
        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const reviewHandler = async() => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', params.id);

        await dispatch(newReview(formData));
        dispatch(getProductDetails(params.id));
    }


  return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`${product.name}`} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image._id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-12 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">{product._id}</p>

                            <p id="product_price">${product.price}</p>

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                            <p id="product_seller mb-3">Contact Seller: <strong>{product.contact}</strong></p>
                        </div>

                    </div>
                    
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails

