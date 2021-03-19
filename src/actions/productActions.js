import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_SIZE } from "../types";

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products"); // ?????
    const data = await res.json();
    console.log(data);
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    });
};

// sortProducts 這個 action 有 2 個參數，filteredProducts 以及 sort
// 是以 sort 的款式來改變 個參數，filteredProducts 裡頭的排序
// 最後，將這個 action 的基本資料打包（dispatch）傳去給 reducer
// 資料內容為： 1. action 的 type 名稱（ORDER_PRODUCTS_BY_PRICE）
//            2. action 的資料內容（payload），分別有 sort: sort 以及 items: sortedProducts

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice();
    if (sort === "latest") {
        sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
    } else {
        sortedProducts.sort((a, b) => 
            sort === "lowest"
            ? a.price > b.price
                ? 1
                : -1
            : a.price < b.price
                ? 1
                : -1
        );
    }
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts
        }
    })
}

export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items:
                size === ""
                ? products
                : products.filter((product) => product.availableSizes.indexOf(size) >= 0),
        },
    })
} 

