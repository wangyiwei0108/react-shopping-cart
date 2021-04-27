import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_SIZE, SEARCH_PRODUCTS_BY_NAME } from "../types";
 
export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    });
}; 

export const searchProducts = (searchproducts, name) => (dispatch) => {
    dispatch ({
        type: SEARCH_PRODUCTS_BY_NAME,
        payload: {
            name: name,
            items: searchproducts.filter(searchproduct => {
                return searchproduct.title.toLowerCase().includes(name.toLowerCase());
            })
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

