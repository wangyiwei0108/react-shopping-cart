import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_SIZE, SEARCH_PRODUCTS_BY_NAME } from "../types";
  
export const productsReducer = (state = {}, action) => {
    switch (action.type) {

        case FETCH_PRODUCTS:
            return {
                ...state,
                items: action.payload, 
                filteredItems: action.payload,
            }

        case SEARCH_PRODUCTS_BY_NAME:
            return {
                ...state,
                name: action.payload.name,
                filteredItems: action.payload.items,
            }

        case FILTER_PRODUCTS_BY_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items,
            }

        case ORDER_PRODUCTS_BY_PRICE:
            return {
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items,
            }

        default:
            return state;
    }
}