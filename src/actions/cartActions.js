import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";


export const addToCart = (product) => (dispatch, getState) => {
  
    const cartItems = getState().cart.cartItems.slice();
   
    let alreadyExists = false;
   
    cartItems.forEach(x => { if (x._id === product._id && x.size === product.size){
        alreadyExists = true;
    }});

    if(!alreadyExists) {

        cartItems.push({...product, count: product.quantity});
    }
    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems: cartItems } // 可省略成：{ cartItems }
        // payload 的值是一個物件，包住 cartItems，cartItems 是一個 array，包住 {product1}, {product2}, {product3}....
        // payload: {
        //    cartItems : [  {product1}, {product2}, {product3}....持續 push 增加...  ]  
        //             }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
 
export const removeFromCart = (product) => (dispatch, getState) => {
    
    const cartItems = getState().cart.cartItems.slice()
    .filter((x) => x._id !== product._id || x.size !== product.size);
    
    dispatch({
        type: REMOVE_FROM_CART,
        payload: { cartItems: cartItems }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
} 