import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts, sortProducts } from "../actions/productActions";
 
class Filter extends Component {
    render() {
        return (
            !this.props.filteredProducts?
            (<div></div>) 
            :
            (
            <div className="filter">
                <div className="filer-result"> {/*篩選後總共有 ？ 個 product*/} {this.props.filteredProducts.length} Products</div>
                <div className="filter-sort"> {/*排序（總數不變）*/}
                    Order {" "}
                    {/* 先看 onChange 的部分，點擊選擇時，會發生事件（e）並作為 sortProducts 這個 action 的參數。
                     接著，將「this.props.filteredProducts」帶入，「this.props.filteredProducts」是已經經過篩選後的 products，並以此來排序。
                     所以並不是將「this.props.products」帶入！另一方面，「e.target.value」同樣也帶入。這兩個參數將被傳入 productActions.js 去執行。 */}
                    <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size"> {/*篩選（總數會變）*/}
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
    sort: state.products.sort,
    filteredProducts: state.products.filteredItems,
    size: state.products.size,
    products: state.products.items,
    }),
    {
        filterProducts,
        sortProducts,
    }
)(Filter)