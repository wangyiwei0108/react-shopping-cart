import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";


export const addToCart = (product) => (dispatch, getState) => {
    // 用 getState() 來取得 current 購物車的 items（也就是 cartReducer 的 state）
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExists = false;
    cartItems.forEach(x => { if (x._id === product._id){
        alreadyExists = true;
        x.count ++;
    }});
    if(!alreadyExists) {
        cartItems.push({...product, count: 1});
    }
    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems }
        // 為什麼要用 {}？是 Object 用法。因為會有 push 這個行為，會增加 array 裡面的 Object，因此用 {} 收攏。
        // {  cartItems : [  {product1}, {product2}, {product3}  ]  }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const removeFromCart = (product) => (dispatch, getState) => {
    
    const cartItems = getState().cart.cartItems.slice().filter((x) => x._id !== product._id);
    
    dispatch({
        type: REMOVE_FROM_CART,
        payload: { cartItems }
        // 為什麼要用 {}？
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}