import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchProducts, filterProducts, sortProducts } from "../redux/actions/productActions";
  
class Filter extends Component {

    render() {
        const { filterProducts, searchProducts, sortProducts, products, filteredProducts, size, sort, name} = this.props;

        return (
            !filteredProducts?
            (<div></div>)
            :
            (
            <div className="filter">
                <div className="filter__result">
                     <h3>{filteredProducts.length} Products</h3>
                </div>

                <div className="filter__search">
                    <svg className="filter__search--svg">
                        <use xlinkHref="images/sprite.svg#icon-magnifying-glass"></use>
                    </svg>

                    <input
                        className="filter__form"
                        value={name} type="search"
                        placeholder="Search"
                        onChange={(e) => searchProducts(products, e.target.value)}
                    />
                </div>
                
                <div className="filter__size">
                    <svg className="filter__size--svg">
                        <use xlinkHref="images/sprite.svg#icon-funnel"></use>
                    </svg>

                    <select
                        className="filter__form"
                        value={size}
                        onChange={(e) => filterProducts(products, e.target.value)}>
                            <option value="">All</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                    </select>
                </div>

                <div className="filter__sort">
                    <svg className="filter__sort--svg">
                        <use xlinkHref="images/sprite.svg#icon-align-bottom"></use>
                    </svg> 

                    <select
                        className="filter__form"
                        value={sort}
                        onChange={(e) => sortProducts(filteredProducts, e.target.value)}>
                            <option value="latest">Latest</option>
                            <option value="lowest">Lowest</option>
                            <option value="highest">Highest</option>
                    </select>
                </div>
            </div>
            )
        )
    }
}

const stateMapToProps = (state) => {
    return {
        name: state.products.name,
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredProducts: state.products.filteredItems
    }
}

export default connect(stateMapToProps, { searchProducts, filterProducts, sortProducts })(Filter)