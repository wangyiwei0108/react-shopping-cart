import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom"
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions'

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    openModal = (product) => {
        this.setState({ product });
    }

    closeModal = () => {
        this.setState({ product: null });
    }

    render() {
        return (
            <div>
                <Fade bottom cascade>
                    {
                        !this.props.pProducts
                        ? 
                        ( <div>Loading...</div>)
                        :
                        <ul className="products">
                        {this.props.pProducts.map((product) => { return (
                            <li key={product._id}>
                                <div className="product">
                                    <a onClick={ () => this.openModal(product)}  href={"#" + product._id}>
                                        <img src={product.image} alt={product.title}></img>
                                        <p>
                                            {product.title}
                                        </p>
                                    </a>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button 
                                        className="button-primary"
                                        onClick={() => this.props.addToCart(product)}>
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )})}
                    </ul>
                    }



                    
                </Fade>
                {
                    this.state.product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>
                                    x
                                </button>
                                <div className="product-details">
                                    <img src={this.state.product.image} alt={this.state.product.title}></img>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{this.state.product.title}</strong>
                                        </p>
                                        <p>
                                            {this.state.product.description}
                                        </p>
                                        <p>
                                            Available Sizes:{" "}
                                            {this.state.product.availableSizes.map((size) => 
                                            <span>
                                                {" "}
                                                <button className="button">{size}</button>
                                            </span>)}
                                        </p>
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(this.state.product.price)}
                                                <button 
                                                    className="button-primary" 
                                                    onClick= { () => {
                                                        this.props.addToCart(this.state.product);
                                                        this.closeModal();}}>
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>
        )
    }
}

// 傳進 state 以及 action。state 為 pProducts(可任意取名）值是 filteredItems，
// 而不是 items，因為要給 filter、sort 這兩個動作所帶來的整體的 state 的連動更新
export default connect(
                        (state) => ({pProducts: state.products.filteredItems}), 
                        {fetchProducts}
                        )
                        (Products)