import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom"

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
    }

    openModal = (product) => {
        this.setState({ product });
    }

    closeModal = () => {
        this.setState({ product: null});
    }

    render() {
        return (
            <div>
                <Fade bottom cascade>
                    <ul className="products">
                        {this.props.productsss.map((product) => { return (
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
