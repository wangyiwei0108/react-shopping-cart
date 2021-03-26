import { connect } from 'react-redux';
import React, { Component } from 'react';
import { fetchOrders } from '../actions/orderActions';
import formatCurrency from './Util';
 
class Orders extends Component {
    
    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        const { orders } = this.props;
        return ! orders ? <p className="loading">Loading...</p> :
            <div className="orders">
                <h3>Orders</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADDRESS</th>
                            <th>ITEMS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>{formatCurrency(order.total)}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.address}</td>
                            <td>
                             {order.cartItems.map((item) => (
                                    <div>
                                        {item.count} {" x "} {item.title} {" x "} {item.size}
                                    </div>
                                ))}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
    }
}

export default connect(
    (state) => ({
       orders: state.order.orders,
}),
{
    fetchOrders
}
)(Orders)
