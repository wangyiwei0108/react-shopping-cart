import React, { Component } from 'react';
import * as storesData from "../data-stores.json";
import { Link } from "react-router-dom";

export default class Store extends Component {
    render() {
        return (
            <div className="store">
                <img className="store__img" alt="store" src="/images/gallery1.jpg" />

                <ul className="store__list">
                    {storesData.stores.map((store) => (
                        <li className="store__info">
                            <h4 className="store__name">{store.name}</h4>

                            <svg className="store__address--svg">
                                <use xlinkHref="images/sprite.svg#icon-location"></use>
                            </svg>
                            
                            <p className="store__address">{store.address}</p>
                            
                            <svg className="store__tel--svg">
                                <use xlinkHref="images/sprite.svg#icon-old-phone"></use>
                            </svg>
                            
                            <p className="store__tel">{store.tel}</p>
                        </li>
                    ))}
                    <li>
                        <Link to="/products">
                            <button className="store__online-btn btn-1">
                                Online Store
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

