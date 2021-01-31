import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts, sortProducts } from "../actions/productActions";

class Filter extends Component {
    render() {
        return (
            ! this.props.filteredProducts?
            (<div>Loading...</div>) 
            :
            (
            <div className="filter">
                <div className="filer-result">{this.props.filteredProducts.length} Products</div>
                <div className="filter-sort">
                    Order {" "}
                    <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
                        <option valie="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size">
                    Filter {" "}
                    <select value={this.props.size} onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}>
                        <option value="">All</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
            )
        )
    }
}


// filteredProducts: 因為是完整的名單，所以給 sort 使用（因為只影響排序）。
// products：因為要做篩選，所以給 size 使用（因為影響項目的增減）

export default connect (
    (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    filteredProducts: state.products.filteredItems,
    products: state.products.items,
    }),
    {
        filterProducts,
        sortProducts,
    }
)(Filter)