import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder } from "../actions/orderActions";

class Cart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false
        }
    }

    handleInput = (e) => {
        // name 指的是 <input> 裡的 name 分別有 name、email、address
        this.setState({[e.target.name]: e.target.value});
    }

    createOrder = (e) => {
        e.preventDefault();
        const oorder = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            // cartItems 從 reducer 叫進來的
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
        };
        this.props.createOrder(oorder);
        // 這個 createOrder 跟上面的 createOrder = (e) => ... 是不一樣的哦！
        // 這個 createOrder 是從 action 叫進來的
    }

    closeModal = () => {this.props.clearOrder()}

    render() {
        const {cartItems, order} = this.props;
        // 這裡的 order 是 createOrder 動作完成後，更新之後的 order 狀態
        return (
            <div>

                {cartItems.length === 0
                ?  
                <div className="cart cart-header">Cart is empty</div>
                :
                <div className="cart cart-header">You have {cartItems.length} in the cart</div>}
                

                {
                    order && 
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>
                                x
                            </button>
                            <div className="order-details">
                                <h3 className="success-message">Your order has been placed.</h3>
                                <h2>Order - {order._id}</h2>
                                <ul>
                                    <li key={order._id}>
                                        <div>Name:</div>
                                        <div>{order.name}</div>
                                    </li>
                                    <li key={order._id}>
                                        <div>Email:</div>
                                        <div>{order.email}</div>
                                    </li>
                                    <li key={order._id}>
                                        <div>Address:</div>
                                        <div>{order.address}</div>
                                    </li>
                                    <li key={order._id}>
                                        <div>Date:</div>
                                        <div>{order.createdAt}</div>
                                    </li>
                                    <li key={order._id}>
                                        <div>Total:</div>
                                        <div>{formatCurrency(order.total)}</div>
                                    </li>
                                    <li key={order._id}>
                                        <div>Cart Items:</div>
                                        <div>
                                            {order.cartItems.map((x) =>(
                                                <div>
                                                    {x.count}{" x "}{x.title}
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Zoom>
                    </Modal>
                }


                <div className="cart">
                <Fade right cascade>
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}></img>
                                </div>                                    
                                <div>
                                    <div>
                                        {item.title}
                                    </div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x {item.count} {" "}
                                        <button 
                                        onClick={ () => this.props.removeFromCart(item)}>
                                        Remove
                                        </button>
                                    </div>            
                                </div>
                            </li>
                        ))}
                    </ul>
                    </Fade>
                </div>

               
                    {cartItems.length !== 0 && (
                        <div>

                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total: {" "}
                                        {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                                    </div>
                                    <button 
                                    className="button-primary"
                                    onClick={ () => {this.setState({showCheckout: true})}}>
                                        Proceed
                                    </button>
                                </div>
                            </div>

                            {this.state.showCheckout && (
                                <Fade clear >
                                <div className="cart">
                                    <form onSubmit={this.createOrder}>                                   
                                        <ul className="form-container">
                                            <li>
                                                <label>Email</label>
                                                <input type="email" name="email" required onChange={this.handleInput}></input>
                                            </li>
                                            <li>
                                                <label>Name</label>
                                                <input type="text" name="name" required onChange={this.handleInput}></input>
                                            </li>
                                            <li>
                                                <label>Address</label>
                                                <input type="text" name="address" required onChange={this.handleInput}></input>
                                            </li>
                                            <li>
                                                <button className="button-primary" type="submit">Checkout</button>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                                </Fade>
                            )}

                        </div>
                    )}
                
                


            </div>
        )
    }
}

export default connect((state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order
}),
{removeFromCart, createOrder, clearOrder}
)(Cart)
