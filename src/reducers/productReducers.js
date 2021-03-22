import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_SIZE, SEARCH_PRODUCTS_BY_NAME } from "../types";
  
export const productsReducer = (state = {}, action) => {
    switch (action.type) {
        
        case FETCH_PRODUCTS:
            return { 
                // items 跟 filteredItems 是同樣的值。items 給篩選 size 使用（項目增減改變）
                // 而 filteredItems 是 items 的 copy，用來給下面的 price 做 state 的更新（項目排序改變）
                items: action.payload, 
                filteredItems: action.payload,
            }

        case SEARCH_PRODUCTS_BY_NAME:
            return {
                ...state,
                name: action.payload.name,
                filteredItems: action.payload.items,
            }

        case ORDER_PRODUCTS_BY_PRICE:
            return {
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items,
            }

        case FILTER_PRODUCTS_BY_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items,
            }

        default:
            return state;
    }
}

// 將 productActions.js 裡面 3 個 action 所產出的 payload 結果全帶進來 productReducers.js 來處理。
// 因為 3 者的 payload 結果是互相有關係的。
// 最初始的 filteredItems 的值，來自於 FETCH_PRODUCTS 這個 action 從後端撈出來。而
// FILTER_PRODUCTS_BY_SIZE 跟 ORDER_PRODUCTS_BY_PRICE 這兩個 action 的 filteredItems 的值是不一樣的，
// 兩者的 action 會分別做出篩選以及排序的功能，各影響其值，然後兩者會因為同樣收納於命名為 filteredItems 的物件，
// 而進一步疊加、更新 filteredItems 的值。其實，這邊就是將 action 行為所產生的資料變動，統一在這裡集中管理
// ，隨之在此將 initial state 更新，並提供給需要的 component 作使用（此處為 Products.js、Filter.js）