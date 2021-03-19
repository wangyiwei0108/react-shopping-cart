import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";


export const addToCart = (product) => (dispatch, getState) => {
    // 用 getState() 來取得 current 購物車的 items（也就是 cartReducer 的 state）
    const cartItems = getState().cart.cartItems.slice();
    // 最一開始會是 const cartItems = []
    // 接著 push 後，會變成 const cartItems = [{product1},  {product2}, {product3}....]
    let alreadyExists = false;
    cartItems.forEach(x => { if (x._id === product._id){
        alreadyExists = true;
        x.count ++;
    }});
    // alreadyExists = false（「有存在」是錯的）。!alreadyExists = true（「沒有存在」是對的）
    if(!alreadyExists) {
    // push 一個 product 物件，其中多新增一個 property「count」，其值是 1。
        cartItems.push({...product, count: 1});
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
    
    const cartItems = getState().cart.cartItems.slice().filter((x) => x._id !== product._id);
    
    dispatch({
        type: REMOVE_FROM_CART,
        payload: { cartItems: cartItems }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
} 