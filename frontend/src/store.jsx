import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from'redux-devtools-extension';
import { productDetailsReducer, productsReducer, newProductReducer, productReviewsReducer, reviewReducer, newReviewReducer, productReducer } from './reducers/productReducers';
import { allUsersReducer,userReducer, authReducer, changePasswordReducer, registerUserReducer, userDetailsReducer} from './reducers/userReducers';



const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    auth: authReducer,
    registerUser: registerUserReducer,
    changePassword: changePasswordReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
    allUsers: allUsersReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    product: productReducer
    
})

let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;