import { CLEAR_CART, CLEAR_ORDER, CREATE_ORDER } from "../types"


// 從前端傳送 ajax request 到 server 來建立 order

export const createOrder = (order) => (dispatch) => {
    // 先把資料以 json 格式傳進 server 處理，在 server 以 bodyParser 處理後，儲存在 db
    fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
    // 把資料還原成 js object 格式
    .then((res) => res.json())
    .then((data) => {
        dispatch({ type: CREATE_ORDER, payload: data });
        localStorage.clear("cartItems");
        dispatch({ type: CLEAR_CART });
    });
};

export const clearOrder = () => (dispatch) => {
    dispatch({ type: CLEAR_ORDER });
}