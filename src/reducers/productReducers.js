import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_SIZE } from "../types";

export const productsReducer = (state = {}, action) => {
    switch (action.type) {

        case FETCH_PRODUCTS:
            return { 
                // items 跟 filteredItems 是同樣的值。items 給篩選 size 使用（項目增減改變）
                // 而 filteredItems 是 items 的 copy，用來給下面的 price 做 state 的更新（項目排序改變）
                items: action.payload, 
                filteredItems: action.payload,
            }

            // FILTER_PRODUCTS_BY_SIZE 跟 ORDER_PRODUCTS_BY_PRICE 的 filteredItems 的值是不一樣的
            // 兩者的 action 會分別做出篩選以及排序的功能，各影響 items 的值，然後兩者會因為同樣收納於 filteredItems
            // 而更新 filteredItems 裡面的值

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