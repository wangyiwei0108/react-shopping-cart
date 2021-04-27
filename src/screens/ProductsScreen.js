import React, { Component } from 'react';
import Cart from '../components/Cart';
import Filter from '../components/Filter';
import Products from '../components/Products';
 
export default class HomeScreen extends Component {
    render() {
        return (
            <div className="products">
                <div className="products__filter">
                    <Filter/>
                </div>
                <div className="products__list">
                    <Products/>
                </div>
                <div className="products__cart">
                    <Cart/>
                </div>
            </div>
        )
    }
}
